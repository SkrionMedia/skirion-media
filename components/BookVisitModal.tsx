
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Loader2, Send, Calendar, Phone, User, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { submitToFormspree } from '../src/services/formService';

interface BookVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookVisitModal: React.FC<BookVisitModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitToFormspree({
        _subject: t('forms.subject_visit'),
        ...formData
      });
      setIsSent(true);
      setTimeout(() => {
        onClose();
        setIsSent(false);
        setFormData({ name: '', email: '', phone: '', company: '' });
      }, 3000);
    } catch (error: any) {
      alert(error.message || t('common.error_generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-brand-surface border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[85vh] my-auto scrollbar-thin z-10"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-brand-primary/5 blur-[100px] pointer-events-none"></div>
            <button 
              onClick={onClose}
              className="absolute top-5 right-5 sm:top-7 sm:right-7 text-gray-400 hover:text-white transition-colors z-20 p-2 rounded-full bg-white/5 hover:bg-white/10"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            
            <div className="relative z-10 text-center space-y-6 sm:space-y-8">
              {!isSent ? (
                <>
                  <div className="w-14 h-14 sm:w-18 sm:h-18 bg-brand-primary/10 rounded-2xl sm:rounded-[2rem] flex items-center justify-center text-brand-primary mx-auto">
                    <Calendar className="w-7 h-7 sm:w-9 sm:h-9" />
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-mono font-bold tracking-wider">
                      <span>🚀</span>
                      <span>{t('launch.phase_title', "Primera fase d'implementació")}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter text-white leading-[1.3] py-1">
                      {t('contact.calendar_title')}
                    </h3>
                    <p className="text-gray-300 font-light tracking-tight text-xs sm:text-sm bg-white/[0.03] p-3.5 sm:p-4 rounded-2xl border border-white/10 leading-relaxed">
                      {t('launch.phase_text', "Estem seleccionant les empreses amb les quals treballarem. Si reserves ara la teva plaça, formaràs part del grup d'implementacions de SKIRION.")}
                    </p>
                    <p className="text-gray-500 font-light tracking-tight text-[11px] sm:text-xs uppercase tracking-wider pt-0.5">
                      {t('contact.calendar_subtitle')}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-left pt-1">
                    <div className="space-y-2">
                      <label className="text-[11px] sm:text-[12px] uppercase tracking-[0.3em] text-gray-400 font-black ml-2">
                        {t('contact.form.name')}
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input 
                          required 
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl pl-12 sm:pl-14 pr-4 py-3.5 sm:py-4 text-sm sm:text-base focus:outline-none focus:border-brand-primary transition-colors text-white" 
                          placeholder={t('contact.form.name_placeholder')} 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] sm:text-[12px] uppercase tracking-[0.3em] text-gray-400 font-black ml-2">
                        {t('contact.form.email')}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input 
                          required 
                          type="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl pl-12 sm:pl-14 pr-4 py-3.5 sm:py-4 text-sm sm:text-base focus:outline-none focus:border-brand-primary transition-colors text-white" 
                          placeholder={t('contact.form.email_placeholder')} 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] sm:text-[12px] uppercase tracking-[0.3em] text-gray-400 font-black ml-2">
                        {t('contact.form.phone_label')}
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input 
                          required 
                          type="tel" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl pl-12 sm:pl-14 pr-4 py-3.5 sm:py-4 text-sm sm:text-base focus:outline-none focus:border-brand-primary transition-colors text-white" 
                          placeholder={t('contact.form.phone_placeholder')} 
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-4 sm:py-5 bg-brand-primary text-black rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-[12px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-98 transition-all duration-300 shadow-xl shadow-brand-primary/20 disabled:opacity-50 mt-6 cursor-pointer"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <>{t('contact.form.send')} <Send size={18} /></>}
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-8 sm:py-12 space-y-6">
                  <div className="w-18 h-18 sm:w-24 sm:h-24 bg-brand-primary/10 rounded-2xl sm:rounded-[2.5rem] flex items-center justify-center text-brand-primary mx-auto">
                    <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter leading-[1.3] py-1">
                      {t('contact.success_title')}
                    </h3>
                    <p className="text-sm sm:text-lg text-gray-400 font-light tracking-tight">
                      {t('contact.success_subtitle')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookVisitModal;
