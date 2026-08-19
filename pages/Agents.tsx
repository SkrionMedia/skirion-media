
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import SEO from '../components/SEO';
import { 
  MessageSquare, 
  Phone, 
  RefreshCw, 
  UserCircle, 
  CheckCircle2, 
  ArrowRight,
  Building2,
  Stethoscope,
  ShoppingCart,
  Factory,
  Search,
  LayoutDashboard,
  Zap,
  Clock,
  Sparkles,
  GraduationCap,
  Dumbbell,
  HeartPulse,
  Hammer,
  Car,
  ShieldCheck
} from 'lucide-react';
import BackgroundGrid from '../components/BackgroundGrid';
import CTA from '../components/CTA';
import logoImg from '../src/assets/images/logo.png';

const Agents: React.FC = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const typesIcons: Record<string, React.ReactNode> = {
    text: <MessageSquare className="w-8 h-8 text-brand-primary" />,
    voice: <Phone className="w-8 h-8 text-brand-primary" />,
    followup: <RefreshCw className="w-8 h-8 text-brand-primary" />,
    avatar: <UserCircle className="w-8 h-8 text-brand-primary" />
  };

  const sectorIcons: Record<number, React.ReactNode> = {
    0: <Sparkles className="w-6 h-6 text-brand-primary" />,
    1: <Stethoscope className="w-6 h-6 text-brand-primary" />,
    2: <Building2 className="w-6 h-6 text-brand-primary" />,
    3: <GraduationCap className="w-6 h-6 text-brand-primary" />,
    4: <Dumbbell className="w-6 h-6 text-brand-primary" />,
    5: <HeartPulse className="w-6 h-6 text-brand-primary" />,
    6: <Hammer className="w-6 h-6 text-brand-primary" />,
    7: <ShieldCheck className="w-6 h-6 text-brand-primary" />,
    8: <Car className="w-6 h-6 text-brand-primary" />,
    9: <ShoppingCart className="w-6 h-6 text-brand-primary" />
  };

  const sectorImages: Record<number, string> = {
    0: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop", // Estètica
    1: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop", // Dentistes
    2: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop", // Immobiliària
    3: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop", // Formació
    4: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop", // Gimnàsos
    5: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop", // Salut
    6: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop", // Reformes
    7: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop", // Assegurances
    8: "https://images.unsplash.com/photo-1562426509-5044a121aa49?q=80&w=800&auto=format&fit=crop", // Automoció
    9: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop"  // Ecommerce
  };

  const processIcons: Record<number, React.ReactNode> = {
    0: <Search className="w-6 h-6" />,
    1: <LayoutDashboard className="w-6 h-6" />,
    2: <Zap className="w-6 h-6" />,
    3: <Clock className="w-6 h-6" />
  };

  const agentVideos: Record<string, string> = {
    text: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-1662-large.mp4",
    voice: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-at-night-40340-large.mp4",
    followup: "https://assets.mixkit.co/videos/preview/mixkit-digital-connection-lines-and-dots-background-27351-large.mp4",
    avatar: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-1662-large.mp4"
  };

  const agentPosters: Record<string, string> = {
    text: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop",
    voice: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    followup: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
    avatar: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop"
  };

  return (
    <div className="relative text-white pt-4 pb-8 md:pt-8 md:pb-12">
      <SEO 
        title="Agentes Digitales de IA y Automatización Comercial 24/7"
        description="Servicio de agencia digital especializado en agentes digitales de voz y texto 24/7 y servicios de automatización de procesos para clínicas, inmobiliarias, hoteles, e-commerce y empresas."
        keywords="agentes digitales, servicio de agencia digital, servicios automatización, agentes de voz IA, asistentes virtuales, automatización comercial, agentes IA WhatsApp, SKIRION"
        path="/agentes-digitales"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Agentes Digitales Autónomos y Servicios de Automatización",
          "provider": {
            "@type": "ProfessionalService",
            "name": "SKIRION Media Group",
            "url": "https://skirionmedia.com"
          },
          "serviceType": "Intelligent Digital Agents and Business Automation",
          "description": "Implementación de agentes digitales de voz y texto 24/7 para filtrado, calificación y captación de clientes de forma automatizada."
        }}
      />
      <BackgroundGrid />
      
      {/* Background elements for technological feel */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-0">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-brand-primary/5 blur-[150px] rounded-full" />
        <div className="absolute top-[40%] right-[5%] w-[600px] h-[600px] bg-brand-primary/10 blur-[200px] rounded-full" />
        <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-brand-primary/5 blur-[120px] rounded-full" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-10 md:mb-16"
        >
          <motion.h1 
            variants={itemVariants} 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 uppercase tracking-tight leading-[1.1] text-white relative inline-block break-words max-w-5xl mx-auto text-center"
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
            <span className="relative z-10">{t('agents_page.hero.title')}</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 md:mb-12 whitespace-pre-line leading-relaxed tracking-tight font-light text-center">
            {t('agents_page.hero.subtitle')}
          </motion.p>
          <motion.div variants={itemVariants}>
            <a 
              href="#diagnostico"
              className="inline-flex items-center space-x-4 px-10 py-5 bg-white text-black rounded-full font-black text-sm uppercase tracking-[0.3em] hover:scale-105 transition-all duration-500 group shadow-xl shadow-white/5"
            >
              <span>{t('agents_page.hero.cta')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>
        </motion.div>

        {/* Problem Section - A QUI AJUDEM */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-14 md:mb-20 grid lg:grid-cols-2 gap-10 items-center"
        >
          <motion.div variants={itemVariants} className="text-center lg:text-left w-full relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.04] pointer-events-none">
              <img 
                src={logoImg || "/logo.png"} 
                alt="" 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = '/logo.png'; }}
              />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 uppercase tracking-tight leading-tight text-white relative z-10 break-words w-full">
              {t('agents_page.sectors.title')}
            </h2>
            <div className="text-base sm:text-lg text-gray-300 italic mb-6 font-light tracking-normal leading-relaxed">
              {t('agents_page.problem.card_text')}
            </div>
            <div className="space-y-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                  {t('agents_page.problem.title')}
                </p>
              </div>
              <div className="text-sm sm:text-base text-gray-400 whitespace-pre-line leading-relaxed font-light tracking-normal">
                {t('agents_page.problem.text')}
              </div>
            </div>
            <div className="mt-6 pt-6 md:mt-8 md:pt-8 border-t border-white/5 w-full">
              <p className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight text-brand-primary break-words">
                {t('agents_page.problem.reflection')}
              </p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 bg-brand-primary/5 blur-[120px]" />
            <div className="relative glass-card rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 flex flex-col justify-center border border-white/5 bg-white/[0.02]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 md:p-6 bg-white/5 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center">
                  <div className="text-3xl md:text-4xl font-black text-brand-primary mb-1">{t('agents_page.problem.stats.decision.value')}</div>
                  <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400">{t('agents_page.problem.stats.decision.label')}</div>
                </div>
                <div className="p-5 md:p-6 bg-brand-primary rounded-2xl border border-brand-primary shadow-xl shadow-brand-primary/20 text-center flex flex-col items-center justify-center">
                  <div className="text-3xl md:text-4xl font-black text-black mb-1">{t('agents_page.problem.stats.response.value')}</div>
                  <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-black/70">{t('agents_page.problem.stats.response.label')}</div>
                </div>
                <div className="p-5 md:p-6 bg-white/5 rounded-2xl border border-white/10 sm:col-span-2 text-center flex flex-col items-center justify-center">
                  <div className="text-3xl md:text-4xl font-black text-white mb-1">{t('agents_page.problem.stats.margin.value')}</div>
                  <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400">{t('agents_page.problem.stats.margin.label')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Types Section - COM ET PODEM AJUDAR */}
        <div className="mb-14 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-8 md:mb-12 uppercase tracking-tight text-center leading-tight text-white relative break-words w-full"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] opacity-[0.04] pointer-events-none">
              <img 
                src={logoImg || "/logo.png"} 
                alt="" 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = '/logo.png'; }}
              />
            </div>
            <span className="relative z-10">{t('agents_page.types.title')}</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {(t('agents_page.types.items', { returnObjects: true }) as any[] || []).map((item) => (
              <motion.div 
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                className="glass-card rounded-[2.5rem] p-6 md:p-8 border border-white/5 hover:border-brand-primary/30 transition-all duration-700 bg-white/[0.01]"
              >
                <div className="flex flex-col gap-4 text-center items-center">
                  <div className="space-y-4 flex flex-col items-center">
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-400 font-light tracking-normal leading-relaxed">{item.how_it_works}</p>
                    <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-white font-bold tracking-tight text-sm sm:text-base">
                      <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                      <span>{item.result}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connectors to other Services & Resources */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
            <Link 
              to="/servicios"
              className="p-6 md:p-8 bg-white/[0.02] border border-white/10 hover:border-brand-primary/40 rounded-3xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <span className="text-brand-primary text-[10px] font-black uppercase tracking-widest block mb-2">Servicios Integrales</span>
                <h4 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors">Servicios de Automatización y Web</h4>
                <p className="text-gray-400 text-xs sm:text-sm mt-2 font-light leading-relaxed">Explora el catálogo completo de ingeniería web, tours 3D Matterport y automatización de procesos.</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-primary">
                <span>Ver todos los servicios</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link 
              to="/planes"
              className="p-6 md:p-8 bg-white/[0.02] border border-white/10 hover:border-brand-primary/40 rounded-3xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <span className="text-brand-primary text-[10px] font-black uppercase tracking-widest block mb-2">Activación en 30 Días</span>
                <h4 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors">Planes y Método de Implementación</h4>
                <p className="text-gray-400 text-xs sm:text-sm mt-2 font-light leading-relaxed">Conoce cómo estructuramos el acompañamiento continuo y la integración técnica de tu agente digital.</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-primary">
                <span>Ver método</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link 
              to="/recursos/guia-automatizacion"
              className="p-6 md:p-8 bg-white/[0.02] border border-white/10 hover:border-brand-primary/40 rounded-3xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <span className="text-brand-primary text-[10px] font-black uppercase tracking-widest block mb-2">Recursos Gratuitos</span>
                <h4 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors">Guía de Automatización con IA</h4>
                <p className="text-gray-400 text-xs sm:text-sm mt-2 font-light leading-relaxed">Aprende los fundamentos para eliminar tareas repetitivas y configurar flujos comerciales automáticos.</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-primary">
                <span>Leer guía</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        {/* Final CTA Section */}
        <motion.div 
          id="diagnostico"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 md:mb-8 uppercase tracking-tight leading-tight text-white break-words">
            {t('agents_page.final_cta.title')}
          </motion.h2>
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 md:mb-14">
            <Link 
              to="/checklist"
              className="w-full md:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-brand-primary text-black rounded-full font-black text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:scale-105 transition-all duration-500 shadow-xl shadow-brand-primary/20 cursor-pointer"
            >
              {t('agents_page.final_cta.button1')}
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants} className="pt-8 md:pt-12 border-t border-white/5">
            <p className="text-gray-500 font-black text-xs uppercase tracking-[0.3em] mb-4">
              {t('agents_page.final_cta.direct_title')}
            </p>
            <a 
              href="mailto:info@skirionmedia.com"
              className="inline-flex w-full sm:w-auto items-center justify-center space-x-3 text-white hover:text-brand-primary transition-colors group px-6 py-3.5 border border-white/10 rounded-full hover:border-brand-primary/50 text-center text-xs uppercase tracking-[0.2em] font-black"
            >
              <span>{t('agents_page.final_cta.button2')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Agents;
