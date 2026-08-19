
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { 
  ArrowRight, 
  CheckCircle2,
  Zap,
  Activity,
  MessageCircle,
  BarChart3,
  Search,
  Cpu,
  Users,
  Smartphone,
  Box,
  Monitor,
  Video,
  Settings,
  Layout,
  MousePointer2,
  Calendar,
  PieChart,
  Target,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ChevronRight,
  Check
} from 'lucide-react';
import BookVisitModal from '../components/BookVisitModal';
import VirtualTourSection from '../components/VirtualTourSection';
import LanguageHoverVideo from '../components/LanguageHoverVideo';
import logoImg from '../src/assets/images/logo.png';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isBookModalOpen, setIsBookModalOpen] = React.useState(false);

  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué servicios de agencia digital ofrece SKIRION?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SKIRION es una agencia digital especializada en ingeniería de la atención e inteligencia artificial. Ofrecemos desarrollo de agentes digitales de voz y texto 24/7, servicios de automatización de procesos y CRM, diseño web de alta conversión y optimización GEO para posicionar marcas en ChatGPT, Perplexity y motores de IA."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo funcionan los agentes digitales y los servicios de automatización?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Los agentes digitales atienden y cualifican clientes potenciales en menos de 5 segundos a través de WhatsApp, llamadas de voz y web. Los servicios de automatización conectan la información directamente con tu CRM, agendan citas y hacen seguimiento automático sin intervención manual."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es la optimización GEO (Generative Engine Optimization)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GEO es la optimización técnica y semántica para que los motores generativos de IA (como ChatGPT, Claude, Perplexity AI y Google Gemini) recomienden tu empresa de forma prioritaria cuando los usuarios buscan tus servicios."
        }
      }
    ]
  };

  const serviceImages = [
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1200&auto=format&fit=crop", // Modern Web Design
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop", // Response Agents / Office Interface
    "https://images.unsplash.com/photo-1622979135225-d2ba269cf1aa?q=80&w=1200&auto=format&fit=crop", // Brand Avatar
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop", // Automation Process
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop"  // Content Engine / Video Production
  ];

  const sectorImages = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop", // Real Estate
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop", // B2B/Store
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1200&auto=format&fit=crop", // Dentist / Clinic
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop", // Training
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"  // Professional Services
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const serviceIcons = [
    <Monitor className="w-10 h-10 text-brand-primary" />,
    <MessageCircle className="w-10 h-10 text-brand-primary" />,
    <Users className="w-10 h-10 text-brand-primary" />,
    <Settings className="w-10 h-10 text-brand-primary" />,
    <Video className="w-10 h-10 text-brand-primary" />
  ];

  const pieceIcons: Record<string, React.ReactNode> = {
    0: <Monitor className="w-6 h-6" />,
    1: <Video className="w-6 h-6" />,
    2: <MessageCircle className="w-6 h-6" />,
    3: <Users className="w-6 h-6" />,
    4: <Settings className="w-6 h-6" />,
    5: <PieChart className="w-6 h-6" />
  };

  const sectorIcons: Record<string, React.ReactNode> = {
    0: <Users className="w-6 h-6" />,
    1: <Smartphone className="w-6 h-6" />,
    2: <Activity className="w-6 h-6" />,
    3: <Box className="w-6 h-6" />,
    4: <Target className="w-6 h-6" />
  };

  const metricIcons: Record<string, React.ReactNode> = {
    dashboard: <Layout className="w-5 h-5" />,
    leads: <Users className="w-5 h-5" />,
    chats: <MessageCircle className="w-5 h-5" />,
    meetings: <Calendar className="w-5 h-5" />,
    time: <Clock className="w-5 h-5" />,
    improvements: <Zap className="w-5 h-5" />
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black text-white"
    >
      <SEO 
        title="Servicio de Agencia Digital, Agentes Digitales y Servicios Automatización con IA"
        description="Agencia digital especializada en agentes digitales de voz y texto 24/7, servicios de automatización de procesos y CRM, diseño web de alta conversión y posicionamiento GEO para empresas."
        keywords="servicio de agencia digital, agentes digitales, servicios automatización, agencia digital IA, automatización de procesos, agentes virtuales, optimización GEO, generative engine optimization, webs alta conversión, digitalización 3D Matterport, SKIRION"
        path="/"
        schema={homeFaqSchema}
      />
      {/* 1. HERO SECTION */}
      <section className="min-h-[calc(100vh-210px)] flex items-center justify-center pt-4 pb-8 md:pt-8 md:pb-12 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px]" />
          
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-brand-primary/20 blur-[160px] rounded-full z-20" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, 60, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full z-20" 
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              variants={itemVariants} 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mt-4 md:mt-8 mb-6 md:mb-8 uppercase tracking-tight leading-[1.1] text-white break-words relative overflow-visible max-w-5xl mx-auto text-center"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full flex items-center justify-center opacity-[0.08] pointer-events-none z-[-1]">
                <img 
                  src={logoImg || "/logo.png"} 
                  alt="" 
                  className="w-full h-auto object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                />
              </div>
              {typeof t('home_v2.hero.title', { returnObjects: true }) === 'string' ? (
                <span className="block drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  {t('home_v2.hero.title')}
                </span>
              ) : (
                <div className="flex flex-col items-center relative z-10">
                  <span className="block drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">{t('home_v2.hero.title.l1')}</span>
                  <span className="block drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">{t('home_v2.hero.title.l2')}</span>
                  <span className="text-brand-primary block drop-shadow-[0_0_50px_rgba(0,82,255,0.3)]">{t('home_v2.hero.title.l3')}</span>
                  <span className="text-brand-primary block drop-shadow-[0_0_50px_rgba(0,82,255,0.3)]">{t('home_v2.hero.title.l4')}</span>
                  <span className="block mt-2 md:mt-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">{t('home_v2.hero.title.l5')}</span>
                  <span className="block drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">{t('home_v2.hero.title.l6')}</span>
                  <span className="block drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">{t('home_v2.hero.title.l7')}</span>
                  <span className="block drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">{t('home_v2.hero.title.l8')}</span>
                </div>
              )}
            </motion.h1>

            <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-gray-400 font-light mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed tracking-tight px-4 text-center">
              {t('home_v2.hero.subtitle')}
            </motion.p>

            {/* LanguageHoverVideo section removed temporarily as requested */}

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => navigate('/checklist')}
                className="group w-full sm:w-auto px-12 py-7 bg-brand-primary text-black font-black rounded-full hover:bg-white transition-all duration-500 text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-[0_0_50px_-10px_rgba(0,82,255,0.5)] active:scale-95"
              >
                {t('home_v2.hero.cta1')} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/contacto')}
                className="w-full sm:w-auto px-12 py-7 bg-white/5 border border-white/10 text-white font-black rounded-full hover:bg-white/10 transition-all text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95"
              >
                {t('home_v2.hero.cta2')}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3D VIRTUAL TOURS SECTION */}
      <VirtualTourSection />

      {/* 2. SYSTEM VS TOOLS */}
      <section id="how-it-works" className="py-8 md:py-16 px-6 relative border-y border-white/5 bg-gradient-to-b from-black to-blue-950/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 uppercase tracking-tight leading-tight text-white relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-full opacity-[0.05] pointer-events-none">
                <img 
                  src={logoImg || "/logo.png"} 
                  alt="" 
                  className="w-full h-full object-contain" 
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                />
              </div>
              <span className="relative z-10">{t('home_v2.system_vs_tools.title')}</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-gray-400 font-light leading-relaxed whitespace-pre-line text-center max-w-3xl mx-auto">
              {t('home_v2.system_vs_tools.text')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 3. TRIA PER ON VOLS COMENÇAR */}
      <section className="py-10 md:py-16 px-6 bg-black relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3 md:mb-4 relative inline-block max-w-4xl mx-auto text-center"
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
              <span className="relative z-10">{t('home_v2.start_where.title')}</span>
            </motion.h2>
            <p className="text-brand-primary font-black uppercase tracking-[0.3em] text-xs">{t('home_v2.start_where.footer')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {['atraure', 'guiar', 'activar'].map((key, idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-8 md:p-10 bg-white/[0.02] rounded-[2.5rem] md:rounded-[3rem] border border-white/5 hover:border-brand-primary/40 hover:bg-brand-primary/[0.03] transition-all duration-700 h-full flex flex-col justify-between overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 ${
                  idx === 0 ? 'bg-green-500' : 
                  idx === 1 ? 'bg-blue-500' : 'bg-red-500'
                }`} />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-2xl mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${
                    idx === 0 ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                    idx === 1 ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                  }`}>
                    {idx === 0 ? <Zap size={24} /> : idx === 1 ? <Search size={24} /> : <Activity size={24} />}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 text-white group-hover:text-brand-primary transition-colors">
                    {t(`home_v2.start_where.${key}.title`)}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed tracking-tight">
                    {t(`home_v2.start_where.${key}.desc`)}
                  </p>
                </div>
                <div className="mt-10">
                  <div className={`w-full h-1.5 rounded-full bg-white/5 overflow-hidden`}>
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 2, delay: 0.5 }}
                      className={`h-full shadow-[0_0_10px_rgba(255,255,255,0.3)] ${
                      idx === 0 ? 'bg-green-500' : 
                      idx === 1 ? 'bg-blue-500' : 'bg-red-500'
                    }`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TOT CONNECTAT */}
      <section className="py-10 md:py-16 px-6 bg-gradient-to-b from-black via-blue-950/10 to-black border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight max-w-4xl mx-auto text-center">
              {t('home_v2.everything_connected.title')}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 md:gap-10">
            {(t('home_v2.everything_connected.items', { returnObjects: true }) as string[]).map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center group relative"
              >
                 <div className="absolute inset-0 bg-brand-primary/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/[0.03] rounded-[2rem] border border-white/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-brand-primary group-hover:text-black transition-all duration-700 group-hover:scale-105 shadow-xl relative z-10">
                  {pieceIcons[idx]}
                </div>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-center text-gray-500 group-hover:text-white transition-colors px-2 leading-relaxed h-8">
                  {item}
                </span>
                {idx < 5 && (
                  <div className="hidden lg:block absolute top-12 -right-5 z-0 opacity-20">
                    <ArrowRight className="text-brand-primary w-5 h-5" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICE CARDS */}
      <section className="py-10 md:py-16 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6 md:space-y-8">
            {(t('home_v2.services_cards', { returnObjects: true }) as any[]).map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white/[0.01] rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 lg:p-14 border border-white/5 hover:border-brand-primary/20 transition-all duration-700 flex flex-col md:flex-row items-center gap-6 md:gap-12 overflow-hidden"
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src={serviceImages[idx]} 
                    alt={card.title} 
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-1000 scale-105 group-hover:scale-110 transition-transform duration-[3s]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                </div>
                
                <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 shrink-0 bg-brand-primary/10 rounded-[2rem] flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-black transition-all duration-700 shadow-[0_0_40px_-5px_rgba(0,82,255,0.2)] group-hover:shadow-[0_0_60px_-5px_rgba(0,82,255,0.5)]">
                  {React.cloneElement(serviceIcons[idx] as React.ReactElement, { size: 36, className: "w-9 h-9" })}
                </div>
                
                <div className="relative z-10 flex-1 text-center md:text-left">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 text-white group-hover:text-brand-primary transition-colors leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light tracking-normal leading-relaxed max-w-2xl lg:border-l border-white/10 lg:pl-6">
                    {card.desc}
                  </p>
                </div>
                
                <button 
                  onClick={() => navigate('/contacto')}
                  className="relative z-10 w-full md:w-auto px-6 md:px-8 py-3.5 md:py-4 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-brand-primary hover:text-black transition-all shrink-0 shadow-lg text-center flex items-center justify-center cursor-pointer"
                >
                  {card.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. APLICAT AL TEU SECTOR */}
      <section className="py-12 md:py-16 px-6 relative overflow-hidden bg-white/[0.01] border-y border-white/5">
        <div className="absolute inset-0 bg-brand-primary/[0.02]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-10 md:mb-14 text-center">
              <motion.h2 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight text-center max-w-4xl mx-auto relative"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-full opacity-[0.03] pointer-events-none">
                  <img 
                    src={logoImg || "/logo.png"} 
                    alt="" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                  />
                </div>
                <span className="relative z-10">
                  {t('home_v2.sectors.title').split(' ')[0]}{' '}
                  <span className="text-brand-primary drop-shadow-[0_0_30px_rgba(0,82,255,0.4)]">{t('home_v2.sectors.title').split(' ').slice(1).join(' ')}</span>
                </span>
              </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                key: 'hotels',
                title: t('verticals.hotels.name', 'Hotels i Càmpings'),
                benefit: t('verticals.hotels.benefit', 'Converteix visites en reserves directes'),
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
                path: "/sectors/hotels"
              },
              {
                key: 'real_estate',
                title: t('verticals.real_estate.name', 'Immobiliàries'),
                benefit: t('verticals.real_estate.benefit', 'Filtra compradors abans de la visita'),
                image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop",
                path: "/sectors/real-estate"
              },
              {
                key: 'clinics',
                title: t('verticals.clinics.name', 'Clíniques Privades'),
                benefit: t('verticals.clinics.benefit', 'Genera confiança i omple l\'agenda'),
                image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
                path: "/sectors/clinics"
              }
            ].map((sector, idx) => (
              <motion.div
                key={sector.key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => navigate(sector.path)}
                className="relative p-6 md:p-8 bg-black rounded-[2rem] md:rounded-[2.5rem] border border-white/5 hover:border-brand-primary/30 group transition-all duration-700 text-center flex flex-col items-center h-[280px] sm:h-[320px] md:h-[360px] justify-between overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src={sector.image} 
                    alt={sector.title} 
                    className="w-full h-full object-cover opacity-25 group-hover:opacity-60 transition-opacity duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-[4s]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-brand-primary/20 transition-colors duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                
                <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary mb-2 block">
                  {sector.title}
                </span>

                <span className="relative z-10 text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight text-white group-hover:text-brand-primary transition-colors leading-snug px-2 break-words w-full">
                  "{sector.benefit}"
                </span>
                
                <div className="relative z-10 mt-4 px-4 py-2 rounded-full border border-white/10 group-hover:border-brand-primary/30 group-hover:bg-brand-primary/10 transition-all duration-500">
                  <span className="text-[9px] uppercase tracking-widest font-black text-gray-400 group-hover:text-white transition-colors">
                    {t('nav.diagnostic')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MÈTODE / PHASES */}
      <section className="py-12 md:py-20 px-6 bg-black relative">
         <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-primary/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3 md:mb-4 relative inline-block max-w-4xl mx-auto text-center leading-tight">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[140%] opacity-[0.04] pointer-events-none">
                <img 
                  src={logoImg || "/logo.png"} 
                  alt="" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                />
              </div>
              <span className="relative z-10">{t('home_v2.method.title')}</span>
            </h2>
            <div className="block mt-2">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-brand-primary/5 border border-brand-primary/10">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary">{t('home_v2.method.footer')}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-6 relative w-full max-w-4xl mx-auto">
            {(t('home_v2.method.items', { returnObjects: true }) as any[]).map((phase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative z-10 flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left p-6 md:p-8 bg-white/[0.01] rounded-[2rem] border border-white/5 hover:border-brand-primary/25 hover:bg-white/[0.03] transition-all duration-700 group w-full gap-4 sm:gap-6"
              >
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-brand-primary/20 blur-xl rounded-full scale-125 group-hover:scale-150 transition-all duration-500" />
                  <div className="relative w-14 h-14 rounded-full bg-brand-primary text-black flex items-center justify-center font-black text-xl shadow-[0_0_30px_-5px_rgba(0,82,255,0.6)]">
                    {idx + 1}
                  </div>
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-brand-primary transition-colors">
                    {phase.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 font-light tracking-normal leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7.5 SENYORS CONSULTORS RECRUITMENT & PARTNERSHIP */}
      <section className="py-14 md:py-20 px-6 bg-gradient-to-b from-black via-[#060b18] to-black relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-brand-primary/5 blur-[150px] rounded-full" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-brand-primary/5 blur-[150px] rounded-full" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="text-brand-primary text-xs font-black tracking-[0.4em] uppercase mb-3">
              {t('home_v2.consultors_block.badge')}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white max-w-4xl mx-auto leading-tight italic">
              {t('home_v2.consultors_block.title')}
            </h2>
          </motion.div>

          <div className="p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group hover:border-brand-primary/20 transition-all duration-700">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-primary/5 blur-3xl group-hover:scale-125 transition-transform duration-1000 pointer-events-none" />
            
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
                  {t('home_v2.consultors_block.intro')}
                </p>
                <div className="h-px w-20 bg-brand-primary/40" />
                <div className="space-y-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white block">
                    {t('home_v2.consultors_block.concept_title')}
                  </span>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light italic">
                    {t('home_v2.consultors_block.concept_desc')}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="relative p-1 bg-gradient-to-br from-brand-primary/30 to-transparent rounded-[2rem]">
                  <div className="relative bg-[#02040a] rounded-[1.9rem] p-8 flex flex-col items-center text-center max-w-sm">
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4 ring-1 ring-brand-primary/20">
                      <Users size={28} />
                    </div>
                    <span className="text-xs font-black tracking-[0.2em] text-brand-primary uppercase mb-1">
                      SKIRION.MEDIA
                    </span>
                    <span className="text-base font-bold text-white uppercase tracking-wider mb-2 leading-tight">
                      {t('home_v2.consultors_block.concept_title')}
                    </span>
                    <p className="text-[11px] text-gray-500 leading-relaxed uppercase tracking-widest font-medium">
                      {t('home_v2.consultors_block.footer')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CADA 15 DIES */}
      <section className="py-12 md:py-20 px-6 bg-gradient-to-b from-blue-950/20 to-black relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className="text-brand-primary text-xs font-black tracking-[0.4em] uppercase mb-4">{t('home_v2.improvement.badge')}</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight mb-6 md:mb-10 px-2 relative">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200px] md:w-[400px] h-full opacity-[0.04] pointer-events-none -ml-12 md:-ml-24">
                  <img 
                    src={logoImg || "/logo.png"} 
                    alt="" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                  />
                </div>
                <span className="relative z-10">{t('home_v2.improvement.title')}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {(t('home_v2.improvement.metrics', { returnObjects: true }) as any[]).map((metric, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 p-5 md:p-6 bg-white/[0.03] rounded-2xl border border-white/5 hover:bg-white/[0.06] transition-all justify-center lg:justify-start"
                  >
                    <div className="text-brand-primary bg-brand-primary/10 p-2 rounded-xl shrink-0">
                      {metricIcons[metric.id]}
                    </div>
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-gray-400 transition-colors text-left">{metric.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, rotateY: 30 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative perspective-1000"
            >
              <div className="absolute inset-0 bg-brand-primary/20 blur-[160px] rounded-full scale-125" />
              <div className="relative bg-black rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 border border-white/10 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50" />
                
                <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-white/5 pb-4 md:pb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-primary/10 rounded-xl">
                      <BarChart3 className="text-brand-primary w-5 h-5" />
                    </div>
                    <span className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-white">{t('home_v2.improvement.recap_badge')}</span>
                  </div>
                  <div className="px-2.5 py-1 bg-green-500/10 text-green-500 rounded-full text-[8px] font-black tracking-widest uppercase">{t('home_v2.improvement.recap_updated')}</div>
                </div>
                
                <div className="space-y-6 md:space-y-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2 md:space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                         <span>{Object.values(t('home_v2.improvement.recap_metrics', { returnObjects: true }))[i-1] as string}</span>
                         <span className="text-brand-primary">+{15 + i * 8}%</span>
                      </div>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${55 + i * 15}%` }}
                          transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full bg-brand-primary shadow-[0_0_20px_rgba(0,82,255,0.6)]" />
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-8 md:mt-12 p-5 md:p-6 bg-brand-primary/5 rounded-[1.5rem] border border-brand-primary/10 relative overflow-hidden group">
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-brand-primary/5 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                    <div className="relative z-10 flex items-center gap-3 text-green-500 mb-2 md:mb-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                        <Check size={14} />
                      </div>
                      <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">{t('home_v2.improvement.improvements_count')}</span>
                    </div>
                    <p className="relative z-10 text-gray-400 text-xs md:text-sm font-light leading-relaxed text-left">
                      {t('home_v2.improvement.latest_sprint')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 px-6 relative overflow-hidden bg-black flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[800px] bg-brand-primary/10 blur-[300px] rounded-full" />
           <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/5 rounded-full" />
           <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] border border-white/[0.02] rounded-full" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-brand-primary text-xs font-black tracking-[0.5em] uppercase mb-4 md:mb-6 animate-pulse">{t('home_v2.final.badge')}</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight mb-8 md:mb-12 max-w-3xl mx-auto whitespace-pre-line break-words">
              {t('home_v2.final.title').replace('SKIRION', 'SKIRION\n')}
            </h2>
            <button 
              onClick={() => setIsBookModalOpen(true)}
              className="group relative px-10 sm:px-14 py-5 sm:py-6 bg-brand-primary text-black font-black rounded-full hover:bg-white transition-all duration-700 text-xs sm:text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-4 mx-auto shadow-[0_0_60px_-10px_rgba(0,82,255,0.7)] active:scale-95 cursor-pointer"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 blur-xl rounded-full transition-opacity" />
              <span className="relative z-10">{t('home_v2.final.cta')}</span>
              <ArrowRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform duration-700" />
            </button>
          </motion.div>
        </div>
      </section>

      <BookVisitModal 
        isOpen={isBookModalOpen} 
        onClose={() => setIsBookModalOpen(false)} 
      />
    </motion.div>
  );
};

export default Home;


