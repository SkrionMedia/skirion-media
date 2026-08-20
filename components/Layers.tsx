
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Layers: React.FC = () => {
  const { t } = useTranslation();
  
  const images = [
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
  ];

  const layers = (t('layers.items', { returnObjects: true }) as any[]).map((item, index) => ({
    ...item,
    image: images[index]
  }));

  return (
    <section id="layers" className="py-24 px-6 md:px-12 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-32 text-center md:text-left">
          <h3 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[1.3] py-4 text-white">{t('layers.title')}</h3>
        </div>

        <div className="space-y-12">
          {layers.map((layer, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col md:flex-row glass-card rounded-[3rem] overflow-hidden group relative border-white/5 hover:border-brand-primary/20 transition-all duration-700"
            >
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                <img 
                  src={layer.image} 
                  alt={layer.title} 
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:w-1/3 bg-white/5 p-8 md:p-16 flex flex-col justify-center items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-white/5 relative z-10">
                <span className="text-brand-primary font-black tracking-[0.4em] text-[12px] uppercase mb-4">{layer.label}</span>
                <h4 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter leading-[1.3] py-1">{layer.title}</h4>
              </div>
              <div className="md:w-2/3 p-8 md:p-16 relative z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                <p className="text-xl sm:text-2xl text-gray-500 font-light leading-relaxed mb-10 max-w-2xl tracking-tight">
                  {layer.desc}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4">
                  {layer.features.map((f, i) => (
                    <span key={i} className="text-[11px] uppercase tracking-[0.4em] text-gray-400 font-black flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/40"></span>
                       {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Layers;
