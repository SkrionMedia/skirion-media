
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { Search, Zap, Video, CheckCircle2, ArrowRight, BarChart3, Activity, Layout, Box } from 'lucide-react';

const Services: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Servicio de Agencia Digital, Agentes Digitales y Automatización de Procesos - SKIRION",
    "description": "Servicios integrales de agencia digital con IA: agentes digitales de voz y texto 24/7, automatización de procesos y CRM, diseño web de alta conversión y optimización GEO.",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Servicios de Automatización de Procesos y CRM",
        "description": "Automatización integral de flujos de trabajo comerciales, eliminación de tareas repetitivas y conexión bidireccional de CRM con IA."
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Agentes Digitales Autónomos de Voz y Texto (24/7)",
        "description": "Atención al cliente instantánea, filtrado y calificación de leads y gestión de citas 24/7 con agentes inteligentes."
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Webs de Alta Conversión & Optimización GEO (AI Visibility)",
        "description": "Ingeniería web y optimización semántica para que motores de IA generativos como ChatGPT, Claude, Perplexity y Gemini recomienden tu empresa."
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Producciones en 3D y Gemelos Digitales",
        "description": "Digitalización de espacios físicos, hoteles, clínicas y showrooms interactivos 3D con tecnología Matterport."
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Motor de Contenidos Masivos con IA",
        "description": "Sistemas automatizados de producción masiva de contenido audiovisual para capturar atención en redes sociales."
      }
    ]
  };
  
  const services = [
    {
      id: "productions3d",
      title: t('services.items.productions3d.title'),
      icon: <Box size={32} />,
      desc: t('services.items.productions3d.desc'),
      features: t('services.items.productions3d.features', { returnObjects: true }) as string[],
      color: "brand-primary",
      cta: t('services.items.productions3d.cta')
    },
    {
      id: "web",
      title: t('services.items.web.title'),
      icon: <Layout size={32} />,
      desc: t('services.items.web.desc'),
      features: t('services.items.web.features', { returnObjects: true }) as string[],
      color: "brand-primary",
      cta: t('services.items.web.cta')
    },
    {
      id: "geo",
      title: t('services.items.geo.title', 'GEO / AI Visibility'),
      icon: <Search size={32} />,
      desc: t('services.items.geo.desc', 'Optimitzem la teva semàntica, dades estructurades Schema i referències Markdown perquè les IA generatives com ChatGPT, Claude o Perplexity et recomanin com a referent.'),
      features: t('services.items.geo.features', { returnObjects: true }) as string[] || [
        "Auditoria GEO i anàlisi de mencions en IA",
        "Optimització semàntica per a motors de cerca generatius",
        "Implementació de llms.txt i dades Schema",
        "FAQ adaptades per a LLMs"
      ],
      color: "brand-primary",
      cta: t('services.items.geo.cta', 'Optimitzar per a IA')
    },
    {
      id: "audit",
      title: t('services.items.audit.title'),
      icon: <BarChart3 size={32} />,
      desc: t('services.items.audit.desc'),
      features: t('services.items.audit.features', { returnObjects: true }) as string[],
      color: "brand-primary",
      cta: t('services.items.audit.cta')
    },
    {
      id: "automation",
      title: t('services.items.automation.title'),
      icon: <Zap size={32} />,
      desc: t('services.items.automation.desc'),
      features: t('services.items.automation.features', { returnObjects: true }) as string[],
      color: "brand-secondary",
      cta: t('services.items.automation.cta')
    },
    {
      id: "content",
      title: t('services.items.content.title'),
      icon: <Video size={32} />,
      desc: t('services.items.content.desc'),
      features: t('services.items.content.features', { returnObjects: true }) as string[],
      color: "brand-accent",
      cta: t('services.items.content.cta')
    }
  ];

  const servicePosters: Record<string, string> = {
    productions3d: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    web: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    geo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    audit: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    automation: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    content: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=800&auto=format&fit=crop"
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-0"
    >
      <SEO 
        title="Serveis d'IA, Webs d'Alta Conversió i GEO"
        description="Descobreix les nostres solucions: produccions 3D, webs d'alta conversió, visibilitat GEO en IA generatives (ChatGPT, Claude, Perplexity), agents digitals de veu i motor de contingut."
        keywords="serveis IA, webs alta conversió, optimització GEO, agents de veu, produccions 3D Matterport, automatització CRM, SKIRION"
        path="/servicios"
        schema={servicesSchema}
      />
      {/* Header Section (DARK) */}
      <section className="pt-4 md:pt-8 pb-8 md:pb-12 px-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,82,255,0.1)_0%,transparent_50%)]"></div>
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
                  src="/logo.png" 
                  alt="" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="relative z-10">{t('services.title')}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light tracking-tight leading-relaxed text-center px-4"
            >
              {t('services.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services List (DARK) */}
      <section className="py-10 md:py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          {services.map((service, i) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card-light rounded-[4rem] overflow-hidden group border border-white/5 shadow-sm hover:shadow-2xl transition-all duration-700"
            >
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center space-y-6 md:space-y-8">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(service.icon as React.ReactElement, { size: 28 })}
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight py-1 break-words">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light leading-relaxed tracking-normal">
                    {service.desc}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-gray-300 font-medium tracking-tight">
                        <CheckCircle2 size={18} className="text-brand-primary shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => navigate('/contacto')}
                    className="w-full sm:w-fit px-6 sm:px-8 py-3.5 sm:py-4 bg-brand-primary text-black rounded-full font-black text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] flex items-center justify-center gap-3 hover:scale-105 transition-all duration-500 shadow-xl shadow-brand-primary/20 cursor-pointer"
                  >
                    <span>{service.cta}</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
                <div className="bg-brand-surface relative overflow-hidden border-l border-white/5 h-full min-h-[350px]">
                  <img 
                    src={servicePosters[service.id]} 
                    alt={service.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-brand-surface/80 via-transparent to-transparent md:hidden"></div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Quick Connectors to Other Pages for SEO & Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div 
              onClick={() => navigate('/agentes-digitales')}
              className="p-6 md:p-8 bg-white/[0.02] border border-white/10 hover:border-brand-primary/40 rounded-3xl cursor-pointer transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <span className="text-brand-primary text-[10px] font-black uppercase tracking-widest block mb-2">Casos y Sectores</span>
                <h4 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors">Agentes Digitales por Sector</h4>
                <p className="text-gray-400 text-xs sm:text-sm mt-2 font-light leading-relaxed">Descubre cómo implementamos agentes de voz y texto en clínicas, inmobiliarias, e-commerce y servicios.</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-primary">
                <span>Ver sectores</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div 
              onClick={() => navigate('/planes')}
              className="p-6 md:p-8 bg-white/[0.02] border border-white/10 hover:border-brand-primary/40 rounded-3xl cursor-pointer transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <span className="text-brand-primary text-[10px] font-black uppercase tracking-widest block mb-2">Método de Trabajo</span>
                <h4 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors">Planes y Proceso de Activación</h4>
                <p className="text-gray-400 text-xs sm:text-sm mt-2 font-light leading-relaxed">Conoce cómo activamos y sincronizamos tus sistemas de automatización en un plazo de 30 días.</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-primary">
                <span>Ver método</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div 
              onClick={() => navigate('/checklist')}
              className="p-6 md:p-8 bg-white/[0.02] border border-white/10 hover:border-brand-primary/40 rounded-3xl cursor-pointer transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <span className="text-brand-primary text-[10px] font-black uppercase tracking-widest block mb-2">Diagnóstico Gratuito</span>
                <h4 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors">Checklist de Fugas de Conversión</h4>
                <p className="text-gray-400 text-xs sm:text-sm mt-2 font-light leading-relaxed">Evalúa los 25 puntos críticos donde tu negocio está perdiendo margen y oportunidades comerciales.</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-primary">
                <span>Hacer test</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Contact for Price Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-14 rounded-[3rem] text-center space-y-6 md:space-y-8 border border-brand-primary/20"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              {t('services.contact_price')}
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <button 
                onClick={() => window.location.href = 'mailto:info@skirionmedia.com'}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black rounded-full font-black text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.25em] hover:bg-brand-primary hover:text-white transition-all duration-500 text-center flex items-center justify-center cursor-pointer"
              >
                {t('services.cta_email')}
              </button>
              <button 
                onClick={() => window.open('https://wa.me/34644869615', '_blank')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#25D366] text-white rounded-full font-black text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.25em] hover:scale-105 transition-all duration-500 text-center flex items-center justify-center cursor-pointer"
              >
                {t('services.cta_whatsapp')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Services;

