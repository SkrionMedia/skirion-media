
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { FileText, Video, CheckSquare, Download, ArrowRight, Play, FileDown, Activity } from 'lucide-react';
import { submitToFormspree } from '../src/services/formService';
import logoImg from '../src/assets/images/logo.png';

const Resources: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) return;
    setIsSubmitting(true);
    try {
      await submitToFormspree({
        _subject: 'Newsletter Subscription - Resources Page',
        email,
        source: 'Resources Page Newsletter'
      });
      setSubscribed(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getIcon = (type: string) => {
    const tLower = type.toLowerCase();
    if (tLower.includes('pdf') || tLower.includes('guia') || tLower.includes('guide')) return <FileText size={24} />;
    if (tLower.includes('checklist')) return <CheckSquare size={24} />;
    if (tLower.includes('vídeo') || tLower.includes('video')) return <Video size={24} />;
    return <FileText size={24} />;
  };

  const resourceItems = t('resources.items', { returnObjects: true }) as any[];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-0 text-white"
    >
      <SEO 
        title="Recursos i Guies d'Automatització amb IA"
        description="Explora les nostres guies gratuïtes, checklists de diagnòstic i masterclasses sobre producció massiva de contingut i integració d'agents digitals."
        keywords="recursos IA, guia automatització, masterclass content engine, checklist fuites conversió, SKIRION"
        path="/recursos"
      />
      {/* Header Section (DARK) */}
      <section className="pt-4 md:pt-8 pb-6 md:pb-8 px-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(112,0,255,0.1)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="space-y-4 md:space-y-6">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 uppercase tracking-tight leading-[1.1] text-white relative inline-block break-words max-w-4xl mx-auto text-center px-4"
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
              <span className="relative z-10">{t('resources.title')}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light tracking-tight leading-relaxed text-center px-4"
            >
              {t('resources.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Resources Grid (DARK) */}
      <section className="py-8 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {resourceItems.map((res, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-light p-6 md:p-8 rounded-[2.5rem] border border-white/5 flex flex-col hover:border-brand-accent/30 transition-all duration-500 group shadow-sm hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-brand-accent/10 rounded-2xl flex items-center justify-center mb-6 text-brand-accent group-hover:scale-110 transition-transform duration-500">
                  {getIcon(res.type)}
                </div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-brand-primary font-black mb-3">{res.type}</div>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-3 leading-tight break-words">{res.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 font-light mb-8 flex-grow leading-relaxed tracking-normal">{res.desc}</p>
                <button 
                  onClick={() => {
                    const id = res.id;
                    if (id === 'checklist') navigate('/checklist');
                    else if (id === 'guide') navigate('/recursos/guia-automatizacion');
                    else if (id === 'video') navigate('/recursos/masterclass-content-engine');
                  }}
                  className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-black text-white hover:text-brand-accent transition-colors group/btn cursor-pointer"
                >
                  {res.type.toLowerCase().includes('vídeo') || res.type.toLowerCase().includes('video') ? <Play size={18} /> : <Activity size={18} />} 
                  <span>{res.cta || t('resources.download')}</span> 
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 md:mt-24 glass-card-light p-8 md:p-14 rounded-[3rem] border border-white/5 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-brand-primary/[0.02] blur-[100px] pointer-events-none"></div>
            <div className="relative z-10 space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight mb-3 relative inline-block max-w-4xl mx-auto break-words w-full">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] opacity-[0.04] pointer-events-none">
                    <img 
                      src={logoImg || "/logo.png"} 
                      alt="" 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                    />
                  </div>
                  <span className="relative z-10">{t('resources.newsletter.title')}</span>
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-400 font-light max-w-2xl mx-auto tracking-normal leading-relaxed">{t('resources.newsletter.subtitle')}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-2xl mx-auto">
                {!subscribed ? (
                  <>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('resources.newsletter.placeholder')} 
                      className="flex-grow bg-white/5 border border-white/10 rounded-full px-6 py-3.5 text-sm focus:outline-none focus:border-brand-primary transition-colors font-medium tracking-normal text-white placeholder:text-gray-500"
                    />
                    <button 
                      onClick={handleSubscribe}
                      disabled={isSubmitting}
                      className="bg-brand-primary text-black px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all duration-500 shadow-xl shadow-brand-primary/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                    >
                      {isSubmitting ? <Activity size={16} className="animate-spin" /> : t('resources.newsletter.button')}
                    </button>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full p-6 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl text-brand-primary"
                  >
                    <p className="text-base sm:text-lg font-black uppercase tracking-tight">{t('email_capture.success_message')}</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Resources;

