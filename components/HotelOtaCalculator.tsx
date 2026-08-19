import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Calculator, 
  HelpCircle, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Euro, 
  Percent, 
  ArrowRight, 
  Sparkles,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

const HotelOtaCalculator: React.FC = () => {
  const { t } = useTranslation();

  // State
  const [annualRevenue, setAnnualRevenue] = useState<number>(1000000);
  const [otaShare, setOtaShare] = useState<number>(60);
  const [otaCommission, setOtaCommission] = useState<number>(17);
  const [recaptureRate, setRecaptureRate] = useState<number>(5);

  // Calculations
  const calculations = useMemo(() => {
    const otaVolume = annualRevenue * (otaShare / 100);
    const totalOtaCommission = otaVolume * (otaCommission / 100);
    
    // Shifted revenue from OTAs to Direct
    const recoveredRevenue = annualRevenue * (recaptureRate / 100);
    
    // Total savings in commissions
    const commissionSavings = recoveredRevenue * (otaCommission / 100);

    return {
      otaVolume,
      totalOtaCommission,
      recoveredRevenue,
      commissionSavings
    };
  }, [annualRevenue, otaShare, otaCommission, recaptureRate]);

  return (
    <div className="w-full relative mt-16 mb-24 font-sans">
      
      {/* Provocative Question Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto my-12 p-8 md:p-10 rounded-[3rem] bg-gradient-to-r from-red-500/[0.04] via-red-500/[0.08] to-red-500/[0.04] border border-red-500/20 text-center relative overflow-hidden shadow-2xl"
      >
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-red-500/5 blur-[60px] rounded-full" />
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-brand-primary/5 blur-[60px] rounded-full" />
        
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <HelpCircle className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.4em] text-red-400 font-black mb-3">
          {t('verticals.hotels.roi_question_title', 'LA GRAN REFLEXIÓ PER A QUALSEVOL HOTEL O CÀMPING')}
        </p>
        <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight text-white mb-4 leading-tight">
          {t('verticals.hotels.roi_question_text', '«Si Booking desaparegués demà del mapa, quantes reserves de veritat seguiria rebent el seu establiment?»')}
        </h3>
        <p className="text-sm text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          {t('verticals.hotels.roi_question_subtext', 'La gran majoria dels hotels i càmpings depenen d’entre un 40% i un 80% de les OTAs per captar les seves reserves totals, cedint un peatge de marge inestimable.')}
        </p>
      </motion.div>

      {/* Main positioning header */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <span className="text-[10px] uppercase font-black tracking-[0.4em] text-brand-primary mb-2 block">
          🎯 {t('verticals.hotels.roi_positioning_title', 'ESTRATÈGIA DE NEGOCI SKIRION')}
        </span>
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">
          {t('verticals.hotels.roi_title', 'Més Marge: Recuperació Activa de Reserves Directes')}
        </h2>
        <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
          {t('verticals.hotels.roi_positioning_text', 'No venem tecnologia complexa, tours 3D ni avatars decoratius. El nostre objectiu és vital: ajudar-lo a reduir la dependència de les OTAs (Booking, Expedia) i reconcertar les visites de la seva pròpia web en reserves directes, lliures de comissions.')}
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Sliders Area (Left) */}
        <div className="lg:col-span-7 bg-black/40 border border-white/5 p-6 md:p-8 rounded-[3.5rem] flex flex-col justify-between space-y-8 relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary/40 to-transparent" />
          
          <div className="flex items-center gap-3 pb-4 border-b border-white/5">
            <Calculator className="w-5 h-5 text-brand-primary" />
            <span className="text-xs uppercase font-black tracking-widest text-white">
              {t('verticals.hotels.roi_inputs_header', 'Paràmetres del seu Establiment')}
            </span>
          </div>

          <div className="space-y-6">
            
            {/* Slider 1: Annual Revenue */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-[11px] uppercase tracking-wider text-gray-400 font-extrabold">
                  {t('verticals.hotels.roi_slider_rev', 'Facturació anual estimada')}
                </label>
                <span className="text-lg md:text-xl font-black text-white font-mono">
                  {annualRevenue.toLocaleString('es-ES')} €
                </span>
              </div>
              <input 
                type="range" 
                min="100000" 
                max="10000000" 
                step="50000"
                value={annualRevenue} 
                onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                <span>100K €</span>
                <span>5M €</span>
                <span>10M €</span>
              </div>
            </div>

            {/* Slider 2: OTA Share */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-[11px] uppercase tracking-wider text-gray-400 font-extrabold">
                  {t('verticals.hotels.roi_slider_share', "Reservas provinents d'OTAs (Booking, Expedia...)")}
                </label>
                <span className="text-lg md:text-xl font-black text-brand-primary font-mono">
                  {otaShare} %
                </span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="95" 
                step="1"
                value={otaShare} 
                onChange={(e) => setOtaShare(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                <span>{t('verticals.hotels.roi_slider_share_low', '10% (Baja dependencia)')}</span>
                <span>{t('verticals.hotels.roi_slider_share_mid', '60% (Media sector)')}</span>
                <span>{t('verticals.hotels.roi_slider_share_high', '95% (Dependencia extrema)')}</span>
              </div>
            </div>

            {/* Slider 3: OTA Commission */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-extrabold">
                    {t('verticals.hotels.roi_slider_comm', "Comisión media de OTAs")}
                  </label>
                </div>
                <span className="text-lg md:text-xl font-black text-red-400 font-mono">
                  {otaCommission} %
                </span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="30" 
                step="1"
                value={otaCommission} 
                onChange={(e) => setOtaCommission(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              
              {/* Dynamic commission contextual label/badge */}
              <div className="pt-1 flex flex-wrap gap-1.5">
                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider transition-all ${
                  otaCommission >= 15 && otaCommission <= 18 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                    : 'bg-white/5 text-gray-500'
                }`}>
                  {t('verticals.hotels.roi_tier_normal', '🎫 Booking Normal (15% - 18%)')}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider transition-all ${
                  otaCommission > 18 && otaCommission <= 25 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                    : 'bg-white/5 text-gray-500'
                }`}>
                  {t('verticals.hotels.roi_tier_premium', '⭐ Booking Premium / Genius (20% - 25%)')}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider transition-all ${
                  otaCommission > 25 
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                    : 'bg-white/5 text-gray-500'
                }`}>
                  {t('verticals.hotels.roi_tier_expedia', '💎 Expedia Premium (hasta 30%)')}
                </span>
              </div>
            </div>

            {/* Slider 4: Recapture Rate */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-[11px] uppercase tracking-wider text-gray-400 font-extrabold">
                  {t('verticals.hotels.roi_slider_recapture', 'Métrica de reservas recuperadas (SKIRION)')}
                </label>
                <span className="text-lg md:text-xl font-black text-emerald-400 font-mono">
                  {recaptureRate} %
                </span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="20" 
                step="1"
                value={recaptureRate} 
                onChange={(e) => setRecaptureRate(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                <span>{t('verticals.hotels.roi_slider_recapture_low', '1% (Conservador)')}</span>
                <span>{t('verticals.hotels.roi_slider_recapture_mid', '5% (Muy viable)')}</span>
                <span>{t('verticals.hotels.roi_slider_recapture_high', '20% (Éxito consolidado)')}</span>
              </div>
            </div>

          </div>

          {/* Single booking real comparison banner */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-5 space-y-3">
            <h4 className="text-xs uppercase font-black tracking-widest text-brand-primary flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-primary" />
              {t('verticals.hotels.roi_ex_title', "EJEMPLO REAL SOBRE LA ESTANCIA DE UN HUÉSPED")}
            </h4>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 p-3 bg-black/40 rounded-xl border border-white/5">
                <p className="text-gray-500 text-[9px] uppercase tracking-wider">{t('verticals.hotels.roi_ex_night_price', 'Habitación')}</p>
                <p className="font-extrabold text-white text-xs">{t('verticals.hotels.roi_ex_night_val', '150 € / NOCHE')}</p>
                <p className="text-gray-500 text-[9px] uppercase tracking-wider pt-1">{t('verticals.hotels.roi_ex_stay', 'Estancia media')}</p>
                <p className="font-extrabold text-white text-xs">{t('verticals.hotels.roi_ex_stay_val', '5 noches (750 € total)')}</p>
              </div>

              <div className="space-y-2 p-3 bg-red-500/[0.03] rounded-xl border border-red-500/10">
                <p className="text-red-400 text-[9px] uppercase tracking-wider font-bold">
                  {t('verticals.hotels.roi_ex_ota_cost', "Comisión de la OTA")}</p>
                <p className="font-mono text-red-400 text-xs font-black">
                  -127,50 € ({otaCommission}%)
                </p>
                <p className="text-gray-400 text-[90%] leading-snug">
                  {t('verticals.hotels.roi_ex_recieved', "El hotel solo recibe 622,50 € antes de gastos.")}
                </p>
              </div>
            </div>

            <div className="p-3 bg-emerald-500/[0.05] border border-emerald-500/10 rounded-xl flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">✓</div>
              <p className="text-[11px] text-emerald-400 font-extrabold leading-tight">
                {t('verticals.hotels.roi_ex_skirion_cost_val', "Con SKIRION, esos 127,50 € se quedan íntegramente en tu bolsillo.")}
              </p>
            </div>
          </div>

        </div>

        {/* Results / ROI Panel Area (Right) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-brand-primary/[0.04] to-black/80 border border-brand-primary/20 p-6 md:p-8 rounded-[3.5rem] flex flex-col justify-between relative overflow-hidden shadow-xl shadow-brand-primary/5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-[50px] rounded-full" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-emerald-500/5 blur-[80px] rounded-full" />
          
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-white/5">
              <TrendingUp className="w-5 h-5 text-brand-primary" />
              <span className="text-xs uppercase font-black tracking-widest text-brand-primary">
                {t('verticals.hotels.roi_results_header', "PROYECCIÓN DE AHORRO DE MARGEN")}
              </span>
            </div>

            {/* Metric 1: OTA commission absorption leak */}
            <div className="p-5 bg-red-500/[0.03] border border-red-500/15 rounded-[2rem] relative group hover:bg-red-500/[0.05] transition-all">
              <div className="absolute top-4 right-4 text-red-500">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-red-400 font-black mb-1">
                {t('verticals.hotels.roi_card_commission_leak', "Margen absorbido por las comisiones de OTAs")}
              </p>
              <div className="text-2xl md:text-3xl font-black text-red-400 font-mono tracking-tight">
                {calculations.totalOtaCommission.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €
              </div>
              <p className="text-[10px] text-gray-500/80 font-mono mt-1">
                {t('verticals.hotels.roi_card_commission_calc', { share: otaShare, volume: calculations.otaVolume.toLocaleString('es-ES', { maximumFractionDigits: 0 }), defaultValue: `Calculado sobre el ${otaShare}% de tu volumen total (${calculations.otaVolume.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €)` })}
              </p>
            </div>

            {/* Metric 2: Shipped Direct billing (recovered) */}
            <div className="p-5 bg-white/5 border border-white/5 rounded-[2rem] relative group hover:bg-white/[0.08] transition-all">
              <div className="absolute top-4 right-4 text-gray-500">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-black mb-1">
                {t('verticals.hotels.roi_card_recovered_revenue', "Facturación directa recuperada (Desviada)")}
              </p>
              <div className="text-2xl md:text-3xl font-black text-white font-mono tracking-tight">
                +{calculations.recoveredRevenue.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €
              </div>
              <p className="text-[10px] text-gray-500 font-mono mt-1">
                {t('verticals.hotels.roi_card_recovered_calc', { rate: recaptureRate, defaultValue: `Representa desviar solo el ${recaptureRate}% de reservas de OTAs a tu canal directo` })}
              </p>
            </div>

            {/* Metric 3: Clean Profit Recaptured (Savings) */}
            <div className="p-6 bg-emerald-500/[0.05] border border-emerald-500/25 rounded-[2.5rem] relative group overflow-hidden">
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/5 blur-2xl rounded-full" />
              <div className="absolute top-4 right-4 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              
              <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-black mb-1">
                💸 {t('verticals.hotels.roi_card_recovered_savings', "Ahorro neto de comisiones anual")}
              </p>
              <div className="text-4xl md:text-5xl font-black text-emerald-400 font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(16,185,129,0.3)] select-none animate-pulse">
                {calculations.commissionSavings.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €
              </div>
              <p className="text-[11px] text-emerald-300/80 font-medium leading-relaxed mt-2">
                {t('verticals.hotels.roi_card_recovered_savings_desc', "Este ahorro neto de margen supera habitualmente x5 el retorno de inversión en el sistema recurrente de SKIRION.")}
              </p>
            </div>

          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col gap-3">
            <div className="flex gap-2 items-center text-xs text-brand-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
              <p className="font-extrabold uppercase tracking-wider">
                {t('verticals.hotels.roi_claim', "DIAGNÓSTICO COMERCIAL DIRECTO")}</p>
            </div>
            
            <p className="text-[11px] text-gray-400 font-light leading-relaxed">
              {t('verticals.hotels.roi_claim_desc', "* Los establecimientos hoteleros suelen cambiar radicalmente de estrategia tras ver estos datos. ¿Quieres que el equipo de SKIRION te prepare un estudio de viabilidad de venta directa a medida?")}
            </p>

            <Link 
              to="/contacto"
              className="mt-2 py-4 bg-white text-black font-black text-[11px] uppercase tracking-[0.25em] rounded-2xl flex items-center justify-center gap-2 group hover:bg-brand-primary hover:text-white transition-all duration-300"
            >
              <span>{t('verticals.hotels.roi_cta', 'Reclamar análisis de comisiones')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default HotelOtaCalculator;
