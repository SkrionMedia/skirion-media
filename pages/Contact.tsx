
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { 
  Mail, MessageSquare, Calendar, Send, ArrowRight, Phone, 
  CheckCircle2, X, Loader2, HelpCircle, ChevronDown, Sparkles, Bot 
} from 'lucide-react';
import { submitToFormspree } from '../src/services/formService';
import BookVisitModal from '../components/BookVisitModal';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contacta amb SKIRION Media Group",
    "description": "Reserva una sessió de diagnòstic o contacta amb l'equip d'enginyers de SKIRION.",
    "url": "https://skirionmedia.com/contacto"
  };

  const faqItems = t('contact.faq_items', { returnObjects: true }) as Array<{ question: string; answer: string }> || [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": Array.isArray(faqItems) ? faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    })) : []
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  useEffect(() => {
    if (location.state?.fromCareers) {
      const formElement = document.getElementById('contact-form');
      if (formElement) {
        setTimeout(() => {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitToFormspree({
        _subject: t('forms.subject_contact'),
        ...formData
      });
      setShowSuccess(true);
      setFormData({ name: '', company: '', email: '', message: '' });
    } catch (error: any) {
      alert(error.message || t('common.error_generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-0 text-white"
    >
      <SEO 
        title="Contacto y Diagnóstico de Automatización con IA"
        description="Solicita información sobre nuestro servicio de agencia digital, agentes digitales y servicios de automatización de procesos. Contacta directamente con el equipo de SKIRION."
        keywords="contacto SKIRION, servicio de agencia digital, agentes digitales, servicios automatización, consultoría IA, diagnóstico comercial empresas"
        path="/contacto"
        schema={[contactSchema, faqSchema]}
      />
      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-12 max-w-xl w-full border border-white/10 relative overflow-hidden max-h-[85vh] overflow-y-auto my-auto"
            >
              <div className="absolute top-0 right-0 w-full h-full bg-brand-primary/5 blur-[100px] pointer-events-none"></div>
              <button 
                onClick={() => setShowSuccess(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-white/5"
              >
                <X size={20} />
              </button>
              
              <div className="relative z-10 text-center space-y-6 sm:space-y-8">
                <div className="w-18 h-18 sm:w-24 sm:h-24 bg-brand-primary/10 rounded-2xl sm:rounded-[2.5rem] flex items-center justify-center text-brand-primary mx-auto">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-[1.3] py-1 break-words">
                    {t('contact.success_title')}
                  </h3>
                  <p className="text-base sm:text-xl text-gray-400 font-light tracking-tight">
                    {t('contact.success_subtitle')}
                  </p>
                </div>
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-4 sm:py-6 bg-brand-primary text-black rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm uppercase tracking-[0.3em] hover:scale-105 transition-all duration-500 shadow-2xl shadow-brand-primary/20 cursor-pointer"
                >
                  {t('contact.success_button')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section (DARK) */}
      <section className="pt-4 md:pt-8 pb-12 md:pb-16 px-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(112,0,255,0.1)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="space-y-4 md:space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.1] mb-4 md:mb-6 text-gradient relative inline-block break-words max-w-4xl mx-auto text-center"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[140%] opacity-[0.06] pointer-events-none">
                <img 
                  src="/logo.png" 
                  alt="" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="relative z-10">{t('contact.title')}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light tracking-tight leading-relaxed text-center px-4"
            >
              {t('contact.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Content (DARK) */}
      <section className="py-12 md:py-24 px-6 bg-brand-surface section-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-32">
            <div className="space-y-12 md:space-y-16">
              <div className="space-y-6 md:space-y-8">
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[1.3] py-2 break-words text-gradient">{t('contact.intro_title')}</h2>
                <p className="text-xl sm:text-3xl text-gray-400 font-light leading-relaxed tracking-tight">
                  {t('contact.intro_text')}
                </p>
              </div>

              <div className="space-y-6 md:space-y-8">
                <button 
                  onClick={() => setIsBookModalOpen(true)}
                  className="w-full flex items-center gap-6 md:gap-8 p-8 md:p-12 glass-card-light rounded-[3rem] border border-white/5 hover:border-brand-primary/30 transition-all duration-500 group shadow-sm hover:shadow-xl text-left cursor-pointer"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-primary/5 rounded-[2rem] flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform duration-500">
                    <Calendar size={28} />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <div className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">{t('contact.calendar_title')}</div>
                    <div className="text-sm md:text-base text-gray-500 font-black uppercase tracking-widest">{t('contact.calendar_subtitle')}</div>
                  </div>
                  <ArrowRight className="ml-auto text-gray-300 group-hover:text-brand-primary group-hover:translate-x-2 transition-all" />
                </button>

                <a href={`https://wa.me/34644869615?text=${encodeURIComponent(t('contact.whatsapp_message'))}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 md:gap-8 p-8 md:p-12 glass-card-light rounded-[3rem] border border-white/5 hover:border-brand-secondary/30 transition-all duration-500 group shadow-sm hover:shadow-xl">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-secondary/5 rounded-[2rem] flex items-center justify-center text-brand-secondary group-hover:scale-110 transition-transform duration-500">
                    <MessageSquare size={28} />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <div className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">{t('contact.whatsapp_title')}</div>
                    <div className="text-sm md:text-base text-gray-500 font-black uppercase tracking-widest">{t('contact.whatsapp_subtitle')}</div>
                  </div>
                  <ArrowRight className="ml-auto text-gray-300 group-hover:text-brand-secondary group-hover:translate-x-2 transition-all" />
                </a>

                <a href="mailto:info@skirionmedia.com" className="flex items-center gap-6 md:gap-8 p-8 md:p-12 glass-card-light rounded-[3rem] border border-white/5 hover:border-brand-primary/30 transition-all duration-500 group shadow-sm hover:shadow-xl">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-500">
                    <Mail size={28} />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <div className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter text-gradient break-words">info@skirionmedia.com</div>
                    <div className="text-sm md:text-base text-gray-500 font-black uppercase tracking-widest">{t('contact.email_subtitle')}</div>
                  </div>
                  <ArrowRight className="ml-auto text-gray-300 group-hover:text-brand-primary group-hover:translate-x-2 transition-all" />
                </a>
              </div>
            </div>

            <div id="contact-form" className="glass-card-light p-6 sm:p-10 md:p-16 rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] border border-white/5 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-full h-full bg-brand-primary/[0.02] blur-[100px] pointer-events-none"></div>
              <div className="relative z-10 space-y-6 md:space-y-10">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-[1.3] py-2 break-words text-gradient">{t('contact.form_title')}</h3>
                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-8">
                  <div className="grid md:grid-cols-2 gap-5 md:gap-8">
                    <div className="space-y-2.5">
                      <label className="text-xs uppercase tracking-[0.3em] text-gray-400 font-black ml-2 sm:ml-4">{t('contact.form.name')}</label>
                      <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-3.5 sm:px-6 sm:py-5 text-base sm:text-lg focus:outline-none focus:border-brand-primary transition-colors font-medium tracking-tight text-white" placeholder={t('contact.form.name_placeholder')} />
                    </div>
                    <div className="space-y-2.5">
                      <label className="text-xs uppercase tracking-[0.3em] text-gray-400 font-black ml-2 sm:ml-4">{t('contact.form.company')}</label>
                      <input required type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-3.5 sm:px-6 sm:py-5 text-base sm:text-lg focus:outline-none focus:border-brand-primary transition-colors font-medium tracking-tight text-white" placeholder={t('contact.form.company_placeholder')} />
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-xs uppercase tracking-[0.3em] text-gray-400 font-black ml-2 sm:ml-4">{t('contact.form.email')}</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-3.5 sm:px-6 sm:py-5 text-base sm:text-lg focus:outline-none focus:border-brand-primary transition-colors font-medium tracking-tight text-white" placeholder={t('contact.form.email_placeholder')} />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-xs uppercase tracking-[0.3em] text-gray-400 font-black ml-2 sm:ml-4">{t('contact.form.message')}</label>
                    <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-3.5 sm:px-6 sm:py-5 text-base sm:text-lg focus:outline-none focus:border-brand-primary transition-colors resize-none font-medium tracking-tight text-white" placeholder={t('contact.form.message_placeholder')}></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full py-5 sm:py-7 bg-brand-primary text-black rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-98 transition-all duration-300 shadow-xl shadow-brand-primary/20 disabled:opacity-50 cursor-pointer">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <>{t('contact.form.send')} <Send size={20} /></>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (Preguntes Freqüents a sota de tot) */}
      <section id="contact-faq" className="py-16 md:py-28 px-6 bg-[#0a0a0e] relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-primary/[0.03] rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 space-y-12 md:space-y-16">
          {/* FAQ Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-black tracking-widest uppercase">
              <HelpCircle size={14} />
              <span>{t('contact.faq_badge', 'PREGUNTES FREQÜENTS')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[1.2] text-gradient">
              {t('contact.faq_title', 'Dubtes habituals abans de començar')}
            </h2>
            <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
              {t('contact.faq_subtitle', "Tot el que necessites saber sobre la implementació dels agents digitals i solucions d'enginyeria de SKIRION.")}
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4">
            {Array.isArray(faqItems) && faqItems.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'bg-white/[0.05] border-brand-primary/40 shadow-xl shadow-brand-primary/5' 
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full p-6 sm:p-8 flex items-center justify-between gap-6 text-left cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 ${
                        isOpen 
                          ? 'bg-brand-primary text-black font-black' 
                          : 'bg-white/5 text-gray-400 border border-white/10'
                      }`}>
                        <span className="text-xs sm:text-sm font-black">0{index + 1}</span>
                      </div>
                      <span className={`text-base sm:text-xl font-bold tracking-tight leading-snug transition-colors ${
                        isOpen ? 'text-white' : 'text-gray-200'
                      }`}>
                        {faq.question}
                      </span>
                    </div>

                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-brand-primary/20 text-brand-primary rotate-180' : 'bg-white/5 text-gray-400'
                    }`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 pl-14 sm:pl-23">
                          <div className="pt-4 border-t border-white/10 text-sm sm:text-base text-gray-300 font-light leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Consultation Callout Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-brand-primary/10 via-white/[0.02] to-brand-secondary/10 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center sm:text-left">
              <div className="text-lg sm:text-xl font-black text-white uppercase tracking-tight flex items-center justify-center sm:justify-start gap-2">
                <Sparkles size={18} className="text-brand-primary" />
                <span>Tens un cas d'ús o dubte concret?</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xl">
                El nostre equip d'enginyeria analitza el teu flux de feina sense cost i et recomana l'arquitectura exacta per al teu sector.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setIsBookModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 bg-brand-primary text-black rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Demanar Diagnòstic</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <BookVisitModal 
        isOpen={isBookModalOpen} 
        onClose={() => setIsBookModalOpen(false)} 
      />
    </motion.div>
  );
};

export default Contact;


