
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Calculator, AlertCircle, TrendingUp, RefreshCcw, Building2, Euro, Clock } from 'lucide-react';

const MarginLeakCalculator: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [revenue, setRevenue] = useState(50000);
  const [timeSpent, setTimeSpent] = useState(15);

  const results = useMemo(() => {
    // Logic: Manual work costs money and opportunity.
    // Assuming each hour of manual work on client ops could be automated or spent on growth.
    // Loss = (Revenue * 0.1) * (timeSpent / 40) * 12 months
    const annualLoss = (revenue * 0.15) * (timeSpent / 20) * 12;
    const monthlyLoss = annualLoss / 12;
    const recoveryPotential = annualLoss * 0.85;

    return {
      annualLoss: Math.round(annualLoss),
      monthlyLoss: Math.round(monthlyLoss),
      recoveryPotential: Math.round(recoveryPotential)
    };
  }, [revenue, timeSpent]);

  const nextStep = () => setStep(s => s + 1);
  const reset = () => {
    setStep(1);
    setCompanyName('');
    setRevenue(50000);
    setTimeSpent(15);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] pointer-events-none"></div>
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 md:space-y-12"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-brand-primary">
                  <Calculator size={24} />
                  <span className="text-[12px] uppercase tracking-[0.4em] font-black">{t('calculator.title')}</span>
                </div>
              </div>
              
              <div className="space-y-6 md:space-y-10">
                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-[0.3em] text-gray-500 font-black flex items-center gap-2 ml-4">
                    <Building2 size={14} /> {t('calculator.company_name')}
                  </label>
                  <input 
                    type="text" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={t('calculator.company_placeholder', 'SKIRION S.L.')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-xl font-black focus:outline-none focus:border-brand-primary transition-all text-white tracking-tight"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-[0.3em] text-gray-500 font-black flex items-center gap-2 ml-4">
                    <Euro size={14} /> {t('calculator.monthly_revenue')}
                  </label>
                  <div className="space-y-6">
                    <input 
                      type="range" 
                      min="5000" 
                      max="500000" 
                      step="5000"
                      value={revenue} 
                      onChange={(e) => setRevenue(Number(e.target.value))}
                      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                    />
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter italic">
                      {revenue.toLocaleString()}€ <span className="text-sm text-gray-500 font-black uppercase tracking-widest ml-2">{t('calculator.per_month')}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-[0.3em] text-gray-500 font-black flex items-center gap-2 ml-4">
                    <Clock size={14} /> {t('calculator.time_spent')}
                  </label>
                  <div className="space-y-6">
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      step="1"
                      value={timeSpent} 
                      onChange={(e) => setTimeSpent(Number(e.target.value))}
                      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-secondary"
                    />
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter italic">
                      {timeSpent} <span className="text-sm text-gray-500 font-black uppercase tracking-widest ml-2">{t('calculator.per_week')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={nextStep}
                disabled={!companyName}
                className="w-full py-8 bg-brand-primary text-black font-black text-[12px] uppercase tracking-[0.4em] rounded-2xl flex items-center justify-center gap-3 hover:scale-105 transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed shadow-2xl shadow-brand-primary/20"
              >
                {t('calculator.calculate')} <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-10 md:space-y-16 text-center"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="text-red-500" size={40} />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-3xl sm:text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[1.3] py-2 break-words">
                  {t('calculator.result_title')}
                </h3>
                <p className="text-gray-500 text-lg sm:text-xl font-light max-w-md mx-auto tracking-tight">
                  {t('calculator.result_desc')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="p-8 md:p-12 bg-red-500/[0.05] border border-red-500/20 rounded-[3rem] group transition-all hover:bg-red-500/[0.08]">
                  <div className="text-3xl sm:text-4xl md:text-6xl font-black text-red-500 tracking-tighter mb-3 italic">
                    {results.monthlyLoss.toLocaleString()}€
                  </div>
                  <div className="text-sm uppercase tracking-[0.5em] text-red-400 font-black">{t('calculator.monthly_loss_label')}</div>
                </div>

                <div className="p-8 md:p-12 bg-red-500/[0.05] border border-red-500/20 rounded-[3rem] group transition-all hover:bg-red-500/[0.08]">
                  <div className="text-3xl sm:text-4xl md:text-6xl font-black text-red-500 tracking-tighter mb-3 italic">
                    {results.annualLoss.toLocaleString()}€
                  </div>
                  <div className="text-sm uppercase tracking-[0.5em] text-red-400 font-black">{t('calculator.lost_revenue_label')}</div>
                </div>
              </div>

              <div className="p-6 md:p-10 bg-emerald-500/[0.05] border border-emerald-500/20 rounded-[3rem] text-center">
                <div className="text-sm text-emerald-500 uppercase tracking-[0.4em] font-black mb-3">{t('calculator.recovery_label')}</div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-emerald-500 tracking-tighter italic">+{results.recoveryPotential.toLocaleString()}€ {t('calculator.per_year')}</div>
              </div>

              <div className="space-y-8 pt-4">
                <button 
                  onClick={() => navigate('/contacto')}
                  className="w-full py-8 bg-brand-primary text-black font-black text-[12px] uppercase tracking-[0.4em] rounded-2xl hover:scale-105 transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl shadow-brand-primary/20"
                >
                  {t('calculator.cta_recover')} <TrendingUp size={18} />
                </button>
                <button 
                  onClick={reset}
                  className="text-[12px] text-gray-500 uppercase tracking-[0.4em] font-black hover:text-white transition-colors flex items-center gap-2 mx-auto"
                >
                  <RefreshCcw size={14} /> {t('calculator.recalculate')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MarginLeakCalculator;
