
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { 
  Play, 
  Clock, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Video,
  Cpu,
  Layers,
  MessageCircle,
  Mail,
  Loader2,
  Sparkles,
  Share2,
  FileText,
  Rocket
} from 'lucide-react';
import { submitToFormspree } from '../src/services/formService';
import socialMediaMasterclassImg from '../src/assets/images/social_media_masterclass_1785304613266.jpg';

const Masterclass: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const masterclassSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Masterclass: Content Engine - 50 peces de contingut en 4 hores",
    "description": "Aprende a producir, editar y automatizar 50 piezas de contenido audiovisual de alto impacto para redes sociales con Inteligencia Artificial.",
    "provider": {
      "@type": "Organization",
      "name": "SKIRION Media Group",
      "sameAs": "https://skirionmedia.com"
    }
  };

  const handleRequestAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await submitToFormspree({
        _subject: 'Masterclass Access Request',
        email,
        source: 'Masterclass Page'
      });
      setSubscribed(true);
      setShowVideo(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const phasesData = t('masterclass.phases', { returnObjects: true }) as any[];
  
  const phaseIcons = [
    <TrendingUp className="text-brand-primary" />,
    <Sparkles className="text-brand-primary" />,
    <Share2 className="text-brand-primary" />,
    <FileText className="text-brand-primary" />,
    <Video className="text-brand-primary" />,
    <Cpu className="text-brand-primary" />,
    <Layers className="text-brand-primary" />,
    <Rocket className="text-brand-primary" />
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-4 md:pt-8 pb-10 md:pb-16 px-6"
    >
      <SEO 
        title="Masterclass Content Engine - 50 peces en 4 hores"
        description="Masterclass exclusiva: Descobreix com produir 50 peces de contingut d'alt impacte per a xarxes socials en menys de 4 hores utilitzant sistemes d'IA."
        keywords="masterclass content engine, contingut IA, xarxes socials automatització, batch recording, edició accelerada IA"
        path="/recursos/masterclass-content-engine"
        image={socialMediaMasterclassImg}
        type="article"
        schema={masterclassSchema}
      />
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex justify-start">
          <button
            onClick={() => {
              if (window.history.length > 2 && window.history.state?.idx > 0) {
                navigate(-1);
              } else {
                navigate('/recursos');
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-brand-primary/40 text-gray-300 hover:text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            <ArrowLeft size={14} className="text-brand-primary" />
            <span>{t('common.back', 'Tornar')}</span>
          </button>
        </div>

        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.1] mb-4 md:mb-6 text-white break-words max-w-4xl mx-auto">
            {t('masterclass.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
            {t('masterclass.subtitle')}
          </p>
        </div>

        {/* Video or Lead Capture */}
        {!showVideo ? (
          <div className="relative aspect-video bg-white/5 rounded-[2.5rem] border border-brand-primary/20 overflow-hidden mb-12 md:mb-16 flex items-center justify-center group">
             <img 
              src={socialMediaMasterclassImg} 
              alt="Social Media Platforms Content Engine Masterclass" 
              className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 w-full max-w-md p-6 md:p-8 glass-card rounded-[2rem] border border-white/10 text-center space-y-4">
              <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mx-auto">
                <Play size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">{t('resources.items.2.cta')}</h3>
              <form onSubmit={handleRequestAccess} className="space-y-3">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('resources.newsletter.placeholder')}
                  className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary transition-colors text-sm text-white placeholder:text-gray-500"
                />
                <button 
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-brand-primary text-black font-black rounded-xl hover:scale-105 transition-all duration-500 text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/20 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <>{t('resources.items.2.cta')} <ArrowRight size={16} /></>}
                </button>
              </form>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">{t('contact.calendar_subtitle')}</p>
            </div>
          </div>
        ) : (
          <div className="relative aspect-video bg-black rounded-[2.5rem] border border-white/10 overflow-hidden mb-12 md:mb-16">
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Masterclass Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-14">
          {phasesData.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 md:p-8 glass-card-light rounded-2xl md:rounded-3xl border border-white/5 space-y-3"
            >
              <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                {phaseIcons[i % phaseIcons.length]}
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight text-white">{phase.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">{phase.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass-card-light p-8 md:p-12 rounded-[2.5rem] border border-brand-primary/20 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-primary/5 blur-[100px] pointer-events-none"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 text-white break-words w-full">{t('masterclass.cta_card_title')}</h2>
          <p className="text-sm sm:text-base text-gray-400 font-light mb-8 max-w-2xl mx-auto tracking-normal leading-relaxed">
            {t('masterclass.cta_card_desc')}
          </p>
          <button 
            onClick={() => navigate('/contacto')}
            className="px-8 sm:px-10 py-4 sm:py-5 bg-brand-primary text-black font-black rounded-full hover:scale-105 transition-all text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] flex items-center gap-3 mx-auto shadow-xl shadow-brand-primary/20 cursor-pointer"
          >
            <span>{t('masterclass.cta_button')}</span> 
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Masterclass;
