
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Activity,
  Zap,
  TrendingUp,
  ShieldCheck,
  Package
} from 'lucide-react';
import logoImg from '../src/assets/images/logo.png';

const Plans: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const plans = [
    {
      id: 'free',
      key: 'free',
      popular: false,
    },
    {
      id: 'pro',
      key: 'pro',
      popular: true,
    },
    {
      id: 'premium',
      key: 'premium',
      popular: false,
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-4 md:pt-8 pb-12 md:pb-24 px-6 relative"
    >
      <SEO 
        title="Planes de Activación, Agentes Digitales y Servicios de Automatización"
        description="Conoce nuestro método de implementación en 30 días: activamos agentes digitales con IA, automatización de procesos y acompañamiento continuo por consultores de crecimiento."
        keywords="planes activación IA, servicio de agencia digital, agentes digitales, servicios automatización, consultoría IA empresas, implementación 30 días, SKIRION"
        path="/planes"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Planes de Activación e Implementación de Agentes Digitales",
          "provider": {
            "@type": "ProfessionalService",
            "name": "SKIRION Media Group",
            "url": "https://skirionmedia.com"
          },
          "description": "Proceso de implementación y activación progresiva de agentes digitales y flujos de automatización comercial en 30 días."
        }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 uppercase tracking-tight leading-[1.1] text-white relative inline-block break-words max-w-4xl mx-auto text-center"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[140%] opacity-[0.06] pointer-events-none">
              <img 
                src={logoImg || "/logo.png"} 
                alt="" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = '/logo.png'; }}
              />
            </div>
            <span className="relative z-10">{t('plans_page.title')}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-brand-primary font-black uppercase tracking-[0.2em] mb-4 text-center"
          >
            {t('plans_page.subtitle')}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto tracking-tight leading-relaxed text-center"
          >
            {t('plans_page.intro')}
          </motion.p>
        </div>

        <div className="mb-12 md:mb-20 relative z-10 text-center relative inline-block w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] opacity-[0.04] pointer-events-none">
            <img 
              src={logoImg || "/logo.png"} 
              alt="" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => { e.currentTarget.src = '/logo.png'; }}
            />
          </div>
          <h2 className="text-4xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white mb-4 md:mb-8 silver-text relative z-10 break-words">
            {t('plans_page.activation_title')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto italic text-lg">
            {t('plans_page.activation_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 md:mb-32 relative z-10">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 md:p-10 glass-card-light rounded-[2.5rem] border border-white/5 flex flex-col h-full relative group transition-all duration-500 hover:bg-white/10 ${plan.popular ? 'border-brand-primary/40 bg-brand-primary/[0.03] ring-1 ring-brand-primary/20 scale-105 z-10' : 'opacity-90'}`}
            >
              <div className="mb-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-white group-hover:text-brand-primary transition-colors">
                    {t(`plans_page.${plan.key}.name`)}
                  </h3>
                  <span className="text-xs font-black uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-4 py-1.5 rounded-full">
                    {t(`plans_page.${plan.key}.price`)}
                  </span>
                </div>
                <p className="text-lg text-gray-400 font-light leading-relaxed min-h-[60px]">
                  {t(`plans_page.${plan.key}.desc`)}
                </p>
              </div>

              <div className="flex-grow space-y-5 mb-12">
                <div className="h-px w-full bg-white/5 mb-8" />
                {(t(`plans_page.${plan.key}.features`, { returnObjects: true }) as string[]).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <CheckCircle2 size={24} className="text-brand-primary mt-0.5 shrink-0" />
                    <span className="text-lg font-medium text-gray-300 tracking-tight leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate('/contacto')}
                className={`w-full py-6 rounded-full font-black text-sm uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-2 ${plan.popular ? 'bg-brand-primary text-black hover:scale-105 shadow-[0_0_30px_rgba(0,82,255,0.2)]' : 'bg-white/5 text-white hover:bg-white/20'}`}
              >
                {t('plans_page.cta_text')} <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Main Transition Banner */}
          <div className="text-center mb-16 md:mb-24 pt-12 border-t border-white/5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl text-white font-black italic uppercase tracking-tighter mb-8 max-w-4xl mx-auto leading-tight"
            >
              {t('plans_page.transition')}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto italic leading-relaxed mb-6 font-light"
            >
              {t('plans_page.evolution_desc')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
            >
              {t('plans_page.membership_intro_3')}
            </motion.p>
          </div>

          {/* Recurrence value points */}
          <div className="mb-20 md:mb-32">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-brand-primary mb-8 text-center">
              {t('plans_page.recurrence_title')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(t('plans_page.recurrence_items', { returnObjects: true }) as string[] || []).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4 hover:border-brand-primary/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <TrendingUp size={18} className="text-brand-primary" />
                  </div>
                  <div>
                    <span className="text-lg font-medium text-gray-300 leading-snug">
                      {item}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Why are they active + What's included block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 md:mb-32">
            <div className="md:col-span-4 flex flex-col justify-center">
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">
                {t('plans_page.why_active_title')}
              </h3>
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                {t('plans_page.why_active_subtitle')}
              </p>
            </div>

            <div className="md:col-span-8 p-8 md:p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none" />
              
              <h4 className="text-xl font-bold text-brand-primary uppercase tracking-wider mb-8">
                {t('plans_page.what_includes_title')}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {(t('plans_page.what_includes_items', { returnObjects: true }) as string[] || []).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                    <span className="text-gray-300 font-medium tracking-tight xl:text-lg">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-500 italic mt-6 border-t border-white/5 pt-6 leading-relaxed">
                {t('plans_page.what_includes_footer')}
              </p>
            </div>
          </div>

          {/* Membership levels */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
              {t('plans_page.membership_levels_title')}
            </h3>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto italic font-light">
              {t('plans_page.membership_levels_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {(t('plans_page.membership_plans', { returnObjects: true }) as any[] || []).map((mPlan, index) => {
              // Different visual accents for different levels
              const designAccents = [
                { border: 'hover:border-blue-500/20', text: 'text-blue-400', bg: 'hover:bg-blue-500/[0.02]', iconColor: 'text-blue-400' },
                { border: 'hover:border-purple-500/30 border-purple-500/10 bg-purple-500/[0.01]', text: 'text-purple-400', bg: 'hover:bg-purple-500/[0.03]', iconColor: 'text-purple-400' },
                { border: 'hover:border-yellow-500/30 border-yellow-500/10 bg-yellow-500/[0.01]', text: 'text-yellow-400', bg: 'hover:bg-yellow-500/[0.03]', iconColor: 'text-yellow-400' }
              ];
              const accent = designAccents[index] || designAccents[0];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-10 glass-card-light rounded-[2rem] border border-white/5 flex flex-col h-full transition-all duration-500 ${accent.border} ${accent.bg}`}
                >
                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white mb-2 leading-tight">
                      {mPlan.name}
                    </h3>
                    <p className={`text-xs ${accent.text} font-black uppercase tracking-widest italic mb-6 border-b border-white/5 pb-2 inline-block`}>
                      {mPlan.positioning}
                    </p>
                    <p className="text-lg text-gray-400 font-light leading-relaxed min-h-[90px]">
                      {mPlan.desc}
                    </p>
                  </div>
                  
                  <div className="flex-grow space-y-4">
                    <div className="h-px w-full bg-white/10 mb-6" />
                    {mPlan.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Zap size={16} className={`${accent.iconColor} mt-1 shrink-0`} />
                        <span className="text-base font-medium text-gray-300 tracking-tight leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="text-center text-gray-400 text-lg max-w-3xl mx-auto mb-20 italic">
            {t('plans_page.membership_footer_text')}
          </p>

          <div className="text-center pb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-tight max-w-4xl mx-auto silver-text">
                {t('plans_page.final_thought')}
              </p>
              <div className="h-px w-32 bg-brand-primary mx-auto" />
              <p className="text-xl md:text-2xl text-brand-primary font-black uppercase tracking-[0.3em]">
                SKIRION
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative background components */}
      <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-brand-primary/5 blur-[200px] -z-10 rounded-full" />
      <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] bg-brand-primary/5 blur-[250px] -z-10 rounded-full" />
    </motion.div>
  );
};

export default Plans;
