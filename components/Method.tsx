
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BarChart3, Settings, Share2, TrendingUp } from 'lucide-react';

const Method: React.FC = () => {
  const { t } = useTranslation();
  
  const icons = [
    <BarChart3 className="text-brand-primary" size={24} />,
    <Settings className="text-brand-primary" size={24} />,
    <Share2 className="text-brand-primary" size={24} />,
    <TrendingUp className="text-brand-primary" size={24} />
  ];

  const steps = (t('method.items', { returnObjects: true }) as any[]).map((item, index) => ({
    ...item,
    icon: icons[index]
  }));

  return (
    <section id="method" className="py-16 md:py-24 px-6 md:px-12 bg-transparent relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-32 space-y-8 text-center md:text-left">
          <div className="max-w-xl mx-auto md:mx-0">
            <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[80px] font-black tracking-tighter uppercase leading-[1.2] py-6 text-white break-words">{t('method.title')}</h3>
          </div>
          <p className="text-xl sm:text-2xl text-gray-500 max-w-sm mx-auto md:mx-0 font-light tracking-tight leading-tight">
            {t('method.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 md:p-12 group hover:border-brand-primary/30 transition-all duration-700 relative overflow-hidden rounded-[3rem] border-white/5 text-center md:text-left"
            >
              <div className="absolute -right-8 -top-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                {React.cloneElement(step.icon as React.ReactElement, { size: 160 })}
              </div>
              <div className="flex items-center justify-between mb-10">
                <div className="text-brand-primary font-black text-2xl group-hover:translate-x-2 transition-transform italic">{step.id}</div>
                <div className="opacity-50 group-hover:opacity-100 transition-opacity text-brand-primary">{step.icon}</div>
              </div>
              <h4 className="text-2xl font-black mb-6 text-white uppercase tracking-tighter leading-[1.3] py-1">{step.title}</h4>
              <p className="text-gray-500 text-lg leading-relaxed font-light tracking-tight">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Method;
