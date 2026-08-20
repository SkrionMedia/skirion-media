
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Globe, Cpu, Menu, X, ChevronDown, ChevronRight, ArrowLeft, Home as HomeIcon, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isDismissed, setIsDismissed] = React.useState(false);
  const navRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    let ticking = false;
    const checkScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    checkScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleBack = () => {
    if (window.history.length > 2 && window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const getPageTitle = (path: string) => {
    if (path.startsWith('/servicios') || path.startsWith('/serveis') || path.startsWith('/services')) {
      return t('nav.services', 'Què Fem?');
    }
    if (path.startsWith('/agentes-digitales') || path.startsWith('/agents-digitals')) {
      return t('nav.agents', 'Agents Digitals');
    }
    if (path.startsWith('/sectors/hotels') || path.startsWith('/sectores/hotels')) {
      return t('verticals.hotels.name', 'Hotels i Càmpings');
    }
    if (path.startsWith('/sectors/real-estate') || path.startsWith('/sectores/real-estate')) {
      return t('verticals.real_estate.name', 'Immobiliària');
    }
    if (path.startsWith('/sectors/clinics') || path.startsWith('/sectores/clinics')) {
      return t('verticals.clinics.name', 'Clíniques Privades');
    }
    if (path.startsWith('/planes') || path.startsWith('/plans')) {
      return t('nav.plans', 'Plans');
    }
    if (path === '/recursos/guia-automatizacion') {
      return t('resources.guide_title', 'Guia d\'Automatització');
    }
    if (path === '/recursos/masterclass-content-engine') {
      return 'Masterclass';
    }
    if (path.startsWith('/recursos') || path.startsWith('/resources')) {
      return t('nav.resources', 'Recursos');
    }
    if (path.startsWith('/contacto') || path.startsWith('/contact')) {
      return t('nav.contact', 'Contacte');
    }
    if (path.startsWith('/checklist') || path.startsWith('/diagnostic') || path.startsWith('/diagnostico')) {
      return t('nav.diagnostic', 'Diagnòstic');
    }
    return '';
  };

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  React.useEffect(() => {
    if (!navRef.current) return;
    const updateNavbarHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight;
        if (height > 0) {
          document.documentElement.style.setProperty('--navbar-height', `${height}px`);
        }
      }
    };

    updateNavbarHeight();

    const observer = new ResizeObserver(() => {
      updateNavbarHeight();
    });

    observer.observe(navRef.current);
    const timer = setTimeout(updateNavbarHeight, 320);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [isScrolled, isDismissed, isMenuOpen]);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.services'), path: '/servicios' },
    { name: t('nav.agents'), path: '/agentes-digitales' },
    { name: t('nav.plans'), path: '/planes' },
    { name: t('nav.resources'), path: '/recursos' },
    { name: t('nav.contact'), path: '/contacto' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-transform duration-500",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {/* LAUNCH PHASE BANNER */}
      <div 
        className={cn(
          "w-full bg-neutral-950/95 border-b border-white/10 backdrop-blur-xl px-4 sm:px-8 text-white shadow-lg relative z-[100] transition-all duration-300 ease-in-out overflow-hidden will-change-[max-height,opacity]",
          (isScrolled || isDismissed) 
            ? "max-h-0 opacity-0 py-0 border-none pointer-events-none" 
            : "max-h-[500px] opacity-100 py-2.5 sm:py-3.5"
        )}
      >
        <div className="max-w-[1400px] mx-auto relative flex flex-col xl:flex-row items-center justify-center gap-3 text-center px-6 sm:px-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2.5 sm:gap-3 text-center mx-auto">
            <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/40 text-brand-primary text-xs md:text-sm font-mono font-extrabold tracking-wide shrink-0 shadow-[0_0_15px_rgba(0,82,255,0.3)]">
              <span className="text-sm md:text-base">🚀</span>
              <span>{t('launch.banner_title', 'Apertura de SKIRION')}</span>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-gray-100 font-normal sm:font-medium leading-relaxed max-w-3xl lg:max-w-4xl tracking-tight text-center mx-auto">
              {t('launch.banner_text', 'Estamos seleccionando las empresas que implementarán nuestros sistemas. Cada proyecto incluye una activación y un seguimiento personalizado, por lo que las implementaciones se realizarán de manera progresiva.')}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2.5 shrink-0 mx-auto xl:mx-0">
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-book-modal'));
              }}
              className="shrink-0 px-5 py-2 rounded-full bg-brand-primary text-black font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,82,255,0.5)] flex items-center gap-1.5 cursor-pointer"
            >
              <span>{t('launch.banner_button', 'Reserva tu plaza')}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsDismissed(true);
              setTimeout(() => {
                if (navRef.current) {
                  const h = navRef.current.offsetHeight;
                  document.documentElement.style.setProperty('--navbar-height', `${h}px`);
                }
              }, 310);
            }}
            aria-label="Dismiss banner"
            className="absolute right-1 sm:right-3 top-2 sm:top-1/2 sm:-translate-y-1/2 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-10"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="w-full bg-neutral-950/95 border-b border-white/10 backdrop-blur-2xl px-3 sm:px-6 py-2 sm:py-3 shadow-2xl relative z-[100]">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* LOGO OUTSIDE THE PILL */}
        <div className="flex flex-col items-start gap-1">
          <Link to="/" className="flex items-center space-x-3 md:space-x-5 group shrink-0">
            <div className="w-14 h-14 md:w-24 md:h-24 bg-white/5 backdrop-blur-md rounded-2xl md:rounded-[2rem] flex items-center justify-center overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,82,255,0.25)] group-hover:scale-105 transition-transform duration-500">
              <img 
                src="/logo.png" 
                alt="SKIRION Logo" 
                className="w-full h-full object-contain p-1"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xl md:text-3xl font-black tracking-tighter uppercase text-white hidden sm:block">
              SKIRION<span className="text-brand-primary">.MEDIA</span>
            </span>
          </Link>
          {/* DESKTOP LANGUAGE SWITCHER UNDER LOGO */}
          <div className="hidden md:flex gap-4 md:ml-[116px]">
            {[
              { code: 'ca', label: 'cat' },
              { code: 'es', label: 'cast' },
              { code: 'en', label: 'ang' }
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={cn(
                  "text-[9px] font-black uppercase tracking-[0.2em] transition-all",
                  i18n.language === lang.code ? "text-brand-primary underline underline-offset-4" : "text-gray-500 hover:text-white"
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-1.5 sm:gap-2">
          {/* MOBILE LANGUAGE SWITCHER ON FAR RIGHT */}
          <div className="flex md:hidden gap-3 sm:gap-4 justify-end">
            {[
              { code: 'ca', label: 'cat' },
              { code: 'es', label: 'cast' },
              { code: 'en', label: 'ang' }
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={cn(
                  "text-[9px] font-black uppercase tracking-[0.2em] transition-all",
                  i18n.language === lang.code ? "text-brand-primary underline underline-offset-4" : "text-gray-400 hover:text-white"
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>
          {/* MENU PILL */}
          <div className="flex-1 lg:flex-none flex items-center bg-white/5 backdrop-blur-2xl rounded-full px-4 md:px-10 py-2 md:py-4 border border-white/10 shadow-2xl relative">
            <div className="hidden lg:flex items-center gap-x-6 xl:gap-x-12 text-sm xl:text-base uppercase tracking-widest text-gray-500 font-black mr-10 animate-fade-in">
              {navLinks.map((link) => {
                const isSectors = link.path.includes('agentes-digitales') || link.path.includes('agents-digitals');
                if (isSectors) {
                  return (
                    <div key={link.path} className="relative group/nav-dropdown py-4">
                      <Link
                        to={link.path}
                        className={cn(
                          "hover:text-white transition-colors relative flex items-center gap-1 group/link whitespace-nowrap cursor-pointer",
                          (location.pathname === link.path || location.pathname.startsWith('/sectors/') || location.pathname.startsWith('/sectores/')) && "text-white"
                        )}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className="w-4 h-4 text-gray-500 group-hover/nav-dropdown:text-white transition-colors" />
                      </Link>

                      {/* Desktop Sector Hover Dropdown */}
                      <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-64 bg-black border border-white/10 rounded-[2rem] p-4 shadow-2xl opacity-0 translate-y-3 pointer-events-none group-hover/nav-dropdown:opacity-100 group-hover/nav-dropdown:translate-y-0 group-hover/nav-dropdown:pointer-events-auto transition-all duration-300 flex flex-col gap-1.5 z-50">
                        {[
                          { name: t('verticals.hotels.name', 'Hotels i Càmpings'), path: '/sectors/hotels' },
                          { name: t('verticals.real_estate.name', 'Immobiliària'), path: '/sectors/real-estate' },
                          { name: t('verticals.clinics.name', 'Clíniques Privades'), path: '/sectors/clinics' },
                        ].map((sec) => (
                          <Link
                            key={sec.path}
                            to={sec.path}
                            className={cn(
                              "px-4 py-3 text-[10px] text-gray-400 hover:text-brand-primary hover:bg-white/5 rounded-xl text-left transition-all flex items-center justify-between border border-transparent hover:border-brand-primary/10",
                              location.pathname === sec.path && "text-brand-primary bg-brand-primary/5"
                            )}
                          >
                            <span className="font-black uppercase tracking-wider">{sec.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "hover:text-white transition-colors relative group whitespace-nowrap",
                      location.pathname === link.path && "text-white"
                )}
              >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            
            <div className="flex items-center flex-1 lg:flex-none justify-end lg:justify-start gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-cv-modal'))}
                className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 text-[10px] text-gray-400 hover:text-white bg-white/5 border border-white/10 hover:border-brand-primary/40 rounded-full transition-all uppercase tracking-wider font-mono cursor-pointer shrink-0"
              >
                <Briefcase size={13} className="text-brand-primary" />
                <span>{t('footer.careers.button', "Déjanos tu CV")}</span>
              </button>
              <Link 
                to="/contacto"
                className="px-4 md:px-8 xl:px-10 py-1.5 md:py-3 text-[9px] md:text-sm bg-white text-black font-black rounded-full hover:bg-brand-primary hover:text-white transition-all duration-500 uppercase tracking-widest shadow-xl shadow-white/5 whitespace-nowrap"
              >
                {t('nav.diagnostic')}
              </Link>
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-8 h-8 md:w-10 md:h-10 bg-white/5 rounded-full flex items-center justify-center text-white border border-white/10 ml-2 md:ml-4"
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

            {/* MOBILE MENU */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="absolute top-full right-0 mt-4 w-[min(90vw,320px)] bg-black/95 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/10 shadow-2xl lg:hidden flex flex-col space-y-6"
                >
                  {navLinks.map((link) => {
                    const isSectors = link.path.includes('agentes-digitales') || link.path.includes('agents-digitals');
                    return (
                      <div key={link.path} className="flex flex-col gap-2">
                        <Link
                          to={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={cn(
                            "text-lg font-black uppercase tracking-[0.2em] transition-colors",
                            (location.pathname === link.path || location.pathname.startsWith('/sectors/') || location.pathname.startsWith('/sectores/')) ? "text-brand-primary" : "text-gray-400"
                          )}
                        >
                          {link.name}
                        </Link>
                        
                        {isSectors && (
                          <div className="pl-4 pb-2 border-l border-white/10 flex flex-col gap-2">
                            {[
                              { name: t('verticals.hotels.name', 'Hotels i Càmpings'), path: '/sectors/hotels' },
                              { name: t('verticals.real_estate.name', 'Immobiliària'), path: '/sectors/real-estate' },
                              { name: t('verticals.clinics.name', 'Clíniques Privades'), path: '/sectors/clinics' },
                            ].map((sec) => (
                              <Link
                                key={sec.path}
                                to={sec.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={cn(
                                  "text-[10px] font-black uppercase tracking-widest transition-colors block py-1",
                                  location.pathname === sec.path ? "text-brand-primary" : "text-gray-500"
                                )}
                              >
                                {sec.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div className="pt-6 border-t border-white/10 flex flex-col space-y-4">
                    <Link 
                      to="/contacto"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full text-center py-4 text-sm bg-brand-primary text-white font-black rounded-full uppercase tracking-[0.3em]"
                    >
                      {t('nav.diagnostic')}
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        window.dispatchEvent(new CustomEvent('open-cv-modal'));
                      }}
                      className="w-full py-2.5 text-center text-xs text-gray-400 hover:text-brand-primary uppercase tracking-[0.2em] font-mono flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Briefcase size={14} className="text-brand-primary" />
                      <span>{t('footer.careers.button', "DÉJANOS TU CV")}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      </div>

      {/* MOBILE SUB-HEADER BACK BAR WHEN IN ANY SECTION */}
      {location.pathname !== '/' && (
        <div className="lg:hidden w-full bg-neutral-950/95 border-b border-white/10 px-4 py-2 flex items-center justify-between text-white backdrop-blur-2xl shadow-md relative z-[95]">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-primary text-black font-black text-xs uppercase tracking-wider hover:bg-white transition-all active:scale-95 shadow-[0_0_15px_rgba(0,82,255,0.4)] cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>{t('common.back', 'Tornar')}</span>
          </button>
          
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 truncate max-w-[170px] px-2 text-center">
            {getPageTitle(location.pathname)}
          </span>

          <Link
            to="/"
            className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-gray-400 hover:text-white px-2 py-1 rounded-full bg-white/5 border border-white/10 transition-colors cursor-pointer"
          >
            <HomeIcon size={12} />
            <span>{t('nav.home', 'Inici')}</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
