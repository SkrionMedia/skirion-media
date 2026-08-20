import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Volume2, VolumeX, Play, Pause, Info } from 'lucide-react';

const LanguageHoverVideo: React.FC = () => {
  const { i18n } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default to muted for reliable autoplay
  const [hasError, setHasError] = useState(false);

  // Intersection Observer to handle autoplay when visible and pause when out of view
  useEffect(() => {
    if (!i18n.language?.startsWith('ca')) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              // Attempt to autoplay
              // We start muted to ensure the browser doesn't block the autoplay
              videoRef.current.muted = isMuted;
              videoRef.current.play()
                .then(() => {
                  setIsPlaying(true);
                })
                .catch((err) => {
                  console.warn("Autoplay was prevented, retrying strictly muted:", err);
                  if (videoRef.current) {
                    videoRef.current.muted = true;
                    setIsMuted(true);
                    videoRef.current.play()
                      .then(() => setIsPlaying(true))
                      .catch(e => console.error("Strictly muted play failed:", e));
                  }
                });
            } else {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: 0.15, // Trigger when 15% of the video is in viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isMuted]);

  const handleMuteToggle = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (videoRef.current) {
      const newMuteState = !videoRef.current.muted;
      videoRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
      
      // Ensure it's playing if user unmuted
      if (!newMuteState && !isPlaying) {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.error("Failed to play on unmute:", err));
      }
    }
  };

  const handlePlayPauseToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Failed to play, forcing muted:", err);
            videoRef.current!.muted = true;
            setIsMuted(true);
            videoRef.current!.play().then(() => setIsPlaying(true));
          });
      }
    }
  };

  // Render ONLY for Catalan language ('ca') as requested
  if (!i18n.language?.startsWith('ca')) {
    return null;
  }

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="text-center mb-6">
        <span className="text-[10px] uppercase font-black tracking-[0.4em] text-brand-primary mb-2 block">
          🎬 VÍDEO EXPLICATIU
        </span>
        <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight">
          Descobriu SKIRION en Acció
        </h3>
        <p className="text-xs text-gray-400 mt-1 font-light">
          Es reprodueix automàticament quan és visible. Feu clic per activar o desactivar el so.
        </p>
      </div>

      <div 
        className="relative group rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/60 shadow-2xl aspect-video cursor-pointer"
        onClick={handleMuteToggle}
      >
        {!hasError ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            playsInline
            preload="auto"
            loop
            muted={isMuted}
            onError={() => {
              setHasError(true);
            }}
          >
            <source src="https://raw.githubusercontent.com/SkrionMedia/skirion/main/skirion%20cat%20vdeoweb.mp4" type="video/mp4" />
            <source src="https://media.githubusercontent.com/media/SkrionMedia/skirion/main/skirion%20cat%20vdeoweb.mp4" type="video/mp4" />
            El vostre navegador no admet la reproducció d'aquest vídeo.
          </video>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white/[0.02] text-center">
            <Info className="w-12 h-12 text-gray-500 mb-3" />
            <p className="text-sm text-gray-400 font-medium">El vídeo de demostració s'està carregant o no s'ha pogut trobar al repositori.</p>
          </div>
        )}

        {/* Hover Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 transition-opacity duration-300 pointer-events-none ${isPlaying ? 'opacity-30 group-hover:opacity-60' : 'opacity-80'}`} />

        {/* Play / Sound status badges */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none z-10">
          <div 
            className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              handlePlayPauseToggle();
            }}
          >
            {isPlaying ? (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            ) : (
              <Play className="w-3 h-3 text-brand-primary fill-brand-primary" />
            )}
            <span className="text-[10px] font-black uppercase tracking-wider text-white">
              {isPlaying ? 'Reproduint' : 'Aturat'}
            </span>
          </div>

          <button 
            className="bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/10 text-white pointer-events-auto hover:bg-white/10 transition-colors"
            onClick={handleMuteToggle}
            title={isMuted ? "Activa el so" : "Silencia"}
          >
            {isMuted ? (
              <div className="flex items-center gap-1.5 px-1">
                <VolumeX className="w-4 h-4 text-red-400" />
                <span className="text-[9px] font-black uppercase tracking-wider text-red-400">Activa el so</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-1">
                <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-wider text-emerald-400">So Actiu</span>
              </div>
            )}
          </button>
        </div>

        {/* Big centered play/pause indicator only if paused manually */}
        {!isPlaying && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-transform duration-300 group-hover:scale-110">
            <div className="w-16 h-16 rounded-full bg-brand-primary text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,82,255,0.4)] border border-brand-primary/30">
              <Play className="w-6 h-6 fill-black ml-1" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageHoverVideo;
