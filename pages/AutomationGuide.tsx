
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  FileDown, 
  Zap, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  MessageCircle, 
  Calendar, 
  BarChart3,
  Layers,
  Cpu
} from 'lucide-react';
import { jsPDF } from 'jspdf';

const AutomationGuide: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const stepsData = t('automation_guide.steps', { returnObjects: true }) as any[];
  
  const stepIcons = [
    <MessageCircle className="text-brand-primary" />,
    <ShieldCheck className="text-brand-primary" />,
    <Calendar className="text-brand-primary" />,
    <Clock className="text-brand-primary" />,
    <Layers className="text-brand-primary" />,
    <Cpu className="text-brand-primary" />,
    <FileDown className="text-brand-primary" />,
    <Zap className="text-brand-primary" />,
    <CheckCircle2 className="text-brand-primary" />,
    <BarChart3 className="text-brand-primary" />
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(`${t('automation_guide.title')}: ${t('automation_guide.subtitle_pdf')}`, 20, 20);
    doc.setFontSize(12);
    doc.text(t('automation_guide.footer_pdf'), 20, 30);
    
    let y = 50;
    stepsData.forEach((step, i) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.text(`${i + 1}. ${step.title}`, 20, y);
      y += 7;
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(step.desc, 170);
      doc.text(lines, 20, y);
      y += (lines.length * 7) + 5;
    });

    doc.save(`Guia_Automatizacion_Skirion_${i18n.language}.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-4 md:pt-8 pb-10 md:pb-16 px-6"
    >
      <SEO 
        title="Guia d'Automatització i Operacions amb IA"
        description="Descarrega la guia completa de 10 passos per automatitzar la captura, filtratge i atenció de leads en la teva empresa amb sistemes autònoms."
        keywords="guia automatització IA, passos automatització comercial, integració CRM, agents digitals pdf, SKIRION"
        path="/recursos/guia-automatizacion"
        type="article"
      />
      <div className="max-w-4xl mx-auto">
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
            {t('automation_guide.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            {t('automation_guide.subtitle')}
          </p>
        </div>

        <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
          {stepsData.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 md:p-6 glass-card-light rounded-2xl md:rounded-3xl border border-white/5 flex items-start gap-4 md:gap-5 group hover:border-brand-primary/20 transition-colors"
            >
              <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {stepIcons[i]}
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight mb-1 text-white">{step.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-400 font-light leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={downloadPDF}
            className="px-8 sm:px-10 py-4 sm:py-5 bg-brand-primary text-black font-black rounded-full hover:scale-105 transition-all text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] flex items-center gap-3 mx-auto shadow-xl shadow-brand-primary/20 cursor-pointer"
          >
            <span>{t('automation_guide.download_pdf')}</span> 
            <FileDown size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AutomationGuide;
