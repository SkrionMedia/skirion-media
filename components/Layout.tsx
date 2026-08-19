
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import BackgroundGrid from './BackgroundGrid';
import VirtualAssistant from './VirtualAssistant';
import LoadingScreen from './LoadingScreen';
import BookVisitModal from './BookVisitModal';
import CVModal from './CVModal';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, ArrowLeft, Briefcase, Send, Sparkles, Copy, Check, ExternalLink, X, MessageSquare } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '../src/assets/images/logo.png';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleOpenBookModal = () => setIsBookModalOpen(true);
    const handleOpenCVModal = () => setIsCVModalOpen(true);
    window.addEventListener('open-book-modal', handleOpenBookModal);
    window.addEventListener('open-cv-modal', handleOpenCVModal);
    return () => {
      window.removeEventListener('open-book-modal', handleOpenBookModal);
      window.removeEventListener('open-cv-modal', handleOpenCVModal);
    };
  }, []);

  const email = t('footer.email', 'info@skirionmedia.com');
  const subject = t('footer.careers.subject', 'VULL TREBALLAR AMB VOSALTRES');
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCVButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCVModalOpen(true);
  };
  
  return (
    <div className="min-h-screen text-white selection:bg-brand-primary/30">
      <LoadingScreen />
      <BackgroundGrid />
      <Navbar />
      <VirtualAssistant />
      <main className="relative z-10 transition-[padding-top] duration-300 ease-in-out" style={{ paddingTop: 'var(--navbar-height, 240px)' }}>{children}</main>
      
      {/* Persistant Global Watermark */}
      <div className="fixed inset-0 flex items-center justify-center opacity-[0.12] pointer-events-none z-0">
        <img 
          src={logoImg || "/logo.png"} 
          alt="" 
          className="w-[80%] max-w-5xl h-auto object-contain drop-shadow-[0_0_80px_rgba(0,82,255,0.4)]"
          referrerPolicy="no-referrer"
          onError={(e) => { e.currentTarget.src = '/logo.png'; }}
        />
      </div>

      {/* Back Button for Mobile */}
      {!isHome && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => {
            if (window.history.length > 2 && window.history.state?.idx > 0) {
              navigate(-1);
            } else {
              navigate('/');
            }
          }}
          className="fixed bottom-6 left-4 z-[99] px-4 py-3 bg-brand-primary text-black rounded-full shadow-[0_10px_30px_rgba(0,82,255,0.5)] lg:hidden flex items-center justify-center gap-2 font-black uppercase text-xs tracking-wider border border-white/20 active:scale-95 transition-transform cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>{t('common.back', 'Tornar')}</span>
        </motion.button>
      )}

      <footer className="py-24 border-t border-white/5 px-6 bg-black relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16 lg:gap-24">
          {/* LEFT: LOGO & PHRASE */}
          <div className="flex flex-col items-start space-y-10 lg:w-1/3">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 md:w-32 md:h-32 bg-white/5 rounded-2xl md:rounded-[2.5rem] flex items-center justify-center overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src={logoImg || "/logo.png"} 
                  alt="SKIRION Logo" 
                  className="w-full h-full object-contain p-1 md:p-2"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                />
              </div>
              <span className="text-xl md:text-3xl font-black tracking-tighter uppercase text-white">
                SKIRION<span className="text-brand-primary">.MEDIA</span>
              </span>
            </div>
            <div className="text-white/80 font-medium text-2xl md:text-3xl tracking-tight leading-[1.2] whitespace-pre-line w-full max-w-md lg:max-w-lg mt-4">
              {t('footer.phrase')}
            </div>
          </div>
          
          {/* RIGHT: MENU GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-24 lg:w-2/3 lg:pt-12">
            {/* SOLUTIONS */}
            <div className="flex flex-col space-y-6">
              <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] border-b border-brand-primary/30 pb-4 inline-block">
                <span>{t('footer.menu.solutions.title')}</span>
              </h4>
              <ul className="flex flex-col space-y-3">
                {(t('footer.menu.solutions.items', { returnObjects: true }) as any[]).map((item, i) => (
                  <li key={i}>
                    <span className="text-gray-500 text-sm font-medium tracking-tight normal-case cursor-default">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* COMPANY */}
            <div className="flex flex-col space-y-6">
              <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] border-b border-brand-primary/30 pb-4 inline-block">
                <span>{t('footer.menu.company.title')}</span>
              </h4>
              <ul className="flex flex-col space-y-3">
                {(t('footer.menu.company.items', { returnObjects: true }) as any[]).map((item, i) => (
                  <li key={i}>
                    <span className="text-gray-500 text-sm font-medium tracking-tight normal-case cursor-default">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT */}
            <div className="flex flex-col space-y-6">
              <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] border-b border-brand-primary/30 pb-4 inline-block">
                <span>{t('footer.menu.contact.title')}</span>
              </h4>
              <ul className="flex flex-col space-y-3">
                {(t('footer.menu.contact.items', { returnObjects: true }) as any[]).map((item, i) => (
                  <li key={i}>
                    <span className="text-gray-500 text-sm font-medium tracking-tight normal-case cursor-default">
                      {item.label}
                    </span>
                  </li>
                ))}
                <li>
                  <div className="pt-4 flex flex-col space-y-2">
                    <span className="text-xs text-gray-600 font-mono tracking-tighter cursor-default">
                      {t('footer.phone')}
                    </span>
                    <span className="text-xs text-gray-600 font-mono tracking-tighter cursor-default">
                      {t('footer.email')}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CAREERS / WORK WITH US BANNER */}
        <div className="max-w-7xl mx-auto mt-16 pt-12 border-t border-white/10">
          <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-brand-primary/10 via-white/[0.03] to-white/[0.01] border border-brand-primary/20 flex flex-col lg:flex-row items-center justify-between gap-8 group hover:border-brand-primary/50 transition-all duration-300 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col space-y-3 max-w-2xl text-center lg:text-left z-10">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-brand-primary text-xs font-mono font-bold uppercase tracking-widest">
                <Sparkles size={14} className="animate-pulse" />
                <span>{t('footer.careers.badge', 'Úneix-te al nostre equip')}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase">
                {t('footer.careers.title', 'VOLS TREBALLAR AMB NOSALTRES?')}
              </h3>
              <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed">
                {t('footer.careers.desc', 'No ens interessa la teva experiència professional, sinó que valorem la teva actitud i coneixements.')}
              </p>
            </div>
            <button
              onClick={handleCVButtonClick}
              className="z-10 px-8 py-4 rounded-full bg-brand-primary text-black font-black text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:scale-[1.03] active:scale-95 transition-all shadow-xl flex items-center gap-3 shrink-0 cursor-pointer"
            >
              <Briefcase size={18} />
              <span>{t('footer.careers.button', "DEIXA'NS EL TEU CV")}</span>
              <Send size={16} />
            </button>
          </div>
        </div>

        {/* BOTTOM NOTE */}
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-700 font-medium text-[10px] tracking-widest uppercase">
            SKIRION.MEDIA · SYSTEM VERSION 3.0.0 · © {new Date().getFullYear()}
          </div>
          <div className="flex gap-6">
            <button className="text-[9px] text-gray-700 hover:text-white transition-colors uppercase tracking-widest font-black">Legal</button>
            <button className="text-[9px] text-gray-700 hover:text-white transition-colors uppercase tracking-widest font-black">Privacy</button>
            <button className="text-[9px] text-gray-700 hover:text-white transition-colors uppercase tracking-widest font-black">Cookies</button>
          </div>
        </div>
      </footer>

      {/* CV / CAREERS SUBMISSION MODAL */}
      <CVModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)} 
      />

      <BookVisitModal 
        isOpen={isBookModalOpen} 
        onClose={() => setIsBookModalOpen(false)} 
      />
    </div>
  );
};

export default Layout;
