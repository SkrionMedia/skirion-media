
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const testimonials = t('testimonials.items', { returnObjects: true }) as any[];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter uppercase mb-6 leading-[1.2] py-4 break-normal"
          >
            {t('testimonials.title')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-[2rem] flex flex-col h-full group"
            >
              <div className="mb-8">
                <div className="flex items-center space-x-2 text-red-400/80 mb-4 text-[12px] uppercase tracking-widest font-bold">
                  <AlertCircle size={14} />
                  <span>{t('testimonials.problem_label')}</span>
                </div>
                <p className="text-gray-400 italic text-lg leading-relaxed">
                  "{item.problem}"
                </p>
              </div>

              <div className="mt-auto pt-8 border-t border-white/5">
                <div className="flex items-center space-x-2 text-blue-400 mb-4 text-[12px] uppercase tracking-widest font-bold">
                  <CheckCircle2 size={14} />
                  <span>{t('testimonials.solution_label')}</span>
                </div>
                <p className="text-white font-medium text-lg leading-relaxed mb-8">
                  {item.solution}
                </p>
                
                <div className="flex flex-col">
                  <span className="text-white font-black uppercase tracking-tighter">{item.author}</span>
                  <span className="text-blue-400/60 text-[12px] uppercase tracking-widest font-bold">{item.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
