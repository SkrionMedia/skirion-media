
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Roadmap: React.FC = () => {
  const { t } = useTranslation();
  
  const colors = [
    'bg-green-500',
    'bg-brand-primary',
    'bg-yellow-500',
    'bg-purple-500'
  ];

  const regions = (t('roadmap.items', { returnObjects: true }) as any[]).map((item, index) => ({
    ...item,
    color: colors[index]
  }));

  return (
    <section id="roadmap" className="py-16 md:py-24 px-6 md:px-12 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-32 text-left">
          <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[80px] font-black tracking-tighter uppercase leading-[1.2] py-6 text-white break-words">{t('roadmap.title')}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {regions.map((region, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 md:p-16 border border-white/5 flex flex-col justify-between min-h-[400px] hover:bg-white/5 transition-all rounded-[3rem] group"
            >
              <div>
                <div className="flex items-center space-x-3 mb-10">
                  <div className={`w-2 h-2 rounded-full ${region.color} shadow-lg shadow-current`}></div>
                  <span className="text-[12px] uppercase tracking-[0.4em] text-gray-500 font-black">{region.status}</span>
                </div>
                <h4 className="text-4xl font-black mb-12 text-white uppercase tracking-tighter leading-[1.3] py-1">{region.region}</h4>
              </div>
              
              <ul className="space-y-4">
                {region.hubs.map((hub, i) => (
                  <li key={i} className="text-lg text-gray-500 flex items-center space-x-3 font-light tracking-tight">
                    <span className="w-1.5 h-1.5 bg-brand-primary/30 rounded-full"></span>
                    <span>{hub}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
