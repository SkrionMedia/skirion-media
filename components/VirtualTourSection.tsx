
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Eye, Smartphone, MousePointer2, CheckCircle2, Box, ExternalLink } from 'lucide-react';

const VirtualTourSection: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const defaultBenefits = [
    "Más confianza",
    "Más interés",
    "Más tiempo de atención",
    "Más posibilidades de venta"
  ];

  const defaultHighlights = [
    "Explora antes de llegar",
    "Tu negocio abierto 24/7",
    "El cliente entra antes de decidir"
  ];

  const benefitsList = (t('home_v3.virtual_tour.benefits', { returnObjects: true }) as string[]) || defaultBenefits;
  const highlightsList = (t('home_v3.virtual_tour.highlights', { returnObjects: true }) as string[]) || defaultHighlights;

  return (
    <section ref={containerRef} className="py-12 md:py-24 px-6 bg-black relative overflow-hidden border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* CONTENT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-tight mb-8 break-normal hyphens-none">
              {t('home_v3.virtual_tour.title_l1')} <span className="text-brand-primary">{t('home_v3.virtual_tour.title_l2')}</span> {t('home_v3.virtual_tour.title_l3')}
            </h2>

            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-12 tracking-tight">
              {t('home_v3.virtual_tour.subtitle')}
            </p>

            <div className="p-6 md:p-8 bg-white/[0.03] rounded-[2rem] border border-white/5 mb-12 backdrop-blur-sm">
              <p className="text-base md:text-lg text-gray-300 font-medium leading-relaxed mb-8">
                {t('home_v3.virtual_tour.text')}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                {benefitsList.map((benefit: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="shrink-0"><CheckCircle2 className="w-5 h-5 text-brand-primary" /></div>
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-white/80">{typeof benefit === 'string' ? benefit : benefit?.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4 mb-12">
              {highlightsList.map((h: any, i: number) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-black uppercase tracking-wider text-gray-400">
                  <span className="text-brand-primary">
                    {i === 0 ? <Eye size={16} /> : i === 1 ? <Smartphone size={16} /> : <MousePointer2 size={16} />}
                  </span>
                  {typeof h === 'string' ? h : h?.text}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mb-20">
              <button 
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-book-modal'));
                }}
                className="group px-10 py-6 bg-brand-primary text-black font-black rounded-full hover:bg-white transition-all duration-500 text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgba(0,82,255,0.4)] cursor-pointer"
              >
                {t('launch.banner_button')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </motion.div>

          {/* VISUAL SIDE - INTERACTIVE DEMOS */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
                  {t('home_v3.virtual_tour.demo_title_1', 'Demo')} <span className="text-brand-primary">{t('home_v3.virtual_tour.demo_title_2', 'Interactiva')}</span>
                </h3>
              </div>
              
              <div className="space-y-10">
                {/* Matterport Embed */}
                <div className="space-y-4">
                  <div className="aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl relative group">
                    <iframe 
                      src="https://my.matterport.com/show/?play=1&lang=es&m=6ndYjkp5f7P" 
                      className="w-full h-full border-0"
                      allowFullScreen
                      allow="xr-spatial-tracking"
                      loading="lazy"
                    ></iframe>
                  </div>
                  <div className="px-4">
                    <div className="text-sm font-black uppercase tracking-[0.2em] text-brand-primary mb-1">Matterport</div>
                    <div className="text-base text-gray-500 font-medium uppercase tracking-widest">{t('home_v3.virtual_tour.matterport_desc')}</div>
                  </div>
                </div>

                {/* Polycam 3D Card */}
                <div className="space-y-4">
                  <div className="aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/10 bg-black shadow-2xl relative group">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="https://storage.polycam.io/captures/5eb269c7-b326-4c4f-b3d3-501e17186510/thumbnail.jpg?t=1719939908830"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    >
                      <source src="https://storage.polycam.io/captures/5eb269c7-b326-4c4f-b3d3-501e17186510/polycam.mp4?t=1719939909231" type="video/mp4" />
                    </video>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse" />
                      <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-white">{t('home_v3.virtual_tour.badge_3d', 'Visualización 3D Automática')}</span>
                    </div>

                    {/* Bottom Action */}
                    <div className="absolute bottom-4 right-4 z-10">
                      <a 
                        href="https://poly.cam/capture/5eb269c7-b326-4c4f-b3d3-501e17186510" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/90 text-black font-black text-[11px] uppercase tracking-wider hover:bg-white hover:scale-105 transition-all shadow-lg backdrop-blur-sm cursor-pointer"
                      >
                        <span>{t('home_v3.virtual_tour.open_polycam', 'Abrir 3D en Polycam')}</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                  <div className="px-4">
                    <div className="text-sm font-black uppercase tracking-[0.2em] text-brand-primary mb-1">Polycam</div>
                    <div className="text-base text-gray-500 font-medium uppercase tracking-widest">{t('home_v3.virtual_tour.polycam_desc')}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VirtualTourSection;
