
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

const LoadingScreen: React.FC = () => {
  const { t } = useTranslation();
  // Always show on initial page load
  const [isVisible, setIsVisible] = useState(true);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFinish = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    let mounted = true;

    if (!isVisible) return;

    // Start video playback immediately on mount
    const startPlayback = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.defaultMuted = true;
          videoRef.current.muted = true;
          videoRef.current.playsInline = true;
          await videoRef.current.play();
        } catch (err) {
          // If autoplay is prevented by browser policies, show start button or finish
          if (mounted) setNeedsInteraction(true);
        }
      }
    };

    startPlayback();

    // Safety timeout in case playback hangs
    const timer = setTimeout(() => {
      if (mounted) handleFinish();
    }, 4000);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [isVisible]);

  const handleCanPlay = async () => {
    if (videoRef.current && isVisible) {
      try {
        videoRef.current.defaultMuted = true;
        videoRef.current.muted = true;
        await videoRef.current.play();
      } catch (error) {
        // Autoplay policy or playback issue handled gracefully
      }
    }
  };

  const handleVideoError = () => {
    // If the video cannot be loaded or played, finish loading screen seamlessly
    handleFinish();
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden select-none p-0 sm:p-4 md:p-8"
        >
          {/* Framed Video Container for PC & Mobile */}
          <div className="w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center relative">
            <video 
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              onCanPlay={handleCanPlay}
              onEnded={handleFinish}
              onError={handleVideoError}
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_50px_rgba(0,82,255,0.3)]"
            >
              <source src="/hero-video.mp4" type="video/mp4" onError={handleVideoError} />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Controls Overlay Contextual if browser strictly requires a click */}
          {needsInteraction && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            >
              <button 
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = false;
                    videoRef.current.play();
                    setNeedsInteraction(false);
                  }
                }}
                className="px-8 py-4 bg-brand-primary text-black font-black rounded-full uppercase tracking-[0.3em] text-xs hover:scale-105 transition-all shadow-[0_0_50px_rgba(0,82,255,0.6)] cursor-pointer"
              >
                {t('common.loading.click_start', 'COMENÇAR / EMPEZAR')}
              </button>
            </motion.div>
          )}

          {/* Skip button for accessibility/UX */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={handleFinish}
            className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-[11px] uppercase tracking-[0.3em] text-white font-black transition-all z-30 cursor-pointer backdrop-blur-md"
          >
            {t('common.loading.skip', 'SALTAR')}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
