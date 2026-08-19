import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { 
  Building2, 
  Stethoscope, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight, 
  ChevronDown, 
  AlertTriangle, 
  CheckCircle2, 
  Play, 
  MessageSquare,
  Sparkle,
  Layers,
  Activity,
  ShieldAlert,
  Sliders,
  Calendar,
  Send,
  Download,
  ShoppingBag,
  Eye,
  Search,
  HelpCircle,
  FileText,
  Box,
  ExternalLink
} from 'lucide-react';
import BackgroundGrid from '../components/BackgroundGrid';
import HotelOtaCalculator from '../components/HotelOtaCalculator';

type SectorKey = 'hotels' | 'real_estate' | 'clinics' | 'ecommerce' | 'geo_visibility';

const SectorsDetail: React.FC = () => {
  const { sectorId } = useParams<{ sectorId: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  // Resolve key gracefully across languages
  const getSectorKey = (slug?: string): SectorKey => {
    if (!slug) return 'hotels';
    const s = slug.toLowerCase();
    if (s.includes('hotel') || s.includes('resort') || s.includes('camp') || s.includes('camping')) return 'hotels';
    if (s.includes('immob') || s.includes('inmob') || s.includes('real') || s.includes('prop')) return 'real_estate';
    if (s.includes('clinic') || s.includes('salut') || s.includes('salud') || s.includes('dent') || s.includes('estet')) return 'clinics';
    if (s.includes('ecom') || s.includes('shop') || s.includes('venda') || s.includes('comerc') || s.includes('retail')) return 'ecommerce';
    if (s.includes('geo') || s.includes('visib') || s.includes('ai-vis') || s.includes('seo')) return 'geo_visibility';
    return 'hotels';
  };

  const sectorKey = getSectorKey(sectorId);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Sector config data for backgrounds and custom assets
  const sectorConfigs: Record<SectorKey, { 
    icon: React.ReactNode; 
    color: string; 
    shadow: string; 
    image: string; 
    path: string; 
  }> = {
    hotels: {
      icon: <Sparkles className="w-6 h-6 text-brand-primary" />,
      color: "from-blue-500/20 to-cyan-500/10",
      shadow: "shadow-blue-500/10",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
      path: "/sectors/hotels"
    },
    real_estate: {
      icon: <Building2 className="w-6 h-6 text-brand-primary" />,
      color: "from-teal-500/20 to-emerald-500/10",
      shadow: "shadow-teal-500/10",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop",
      path: "/sectors/real-estate"
    },
    clinics: {
      icon: <Stethoscope className="w-6 h-6 text-brand-primary" />,
      color: "from-rose-500/20 to-purple-500/10",
      shadow: "shadow-rose-500/10",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
      path: "/sectors/clinics"
    },
    ecommerce: {
      icon: <ShoppingBag className="w-6 h-6 text-brand-primary" />,
      color: "from-amber-500/20 to-orange-500/10",
      shadow: "shadow-amber-500/10",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
      path: "/sectors/ecommerce"
    },
    geo_visibility: {
      icon: <Eye className="w-6 h-6 text-brand-primary" />,
      color: "from-purple-500/20 to-indigo-500/10",
      shadow: "shadow-purple-500/10",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
      path: "/sectors/geo-visibility"
    }
  };

  const currentConfig = sectorConfigs[sectorKey];

  const handleSectorChange = (key: SectorKey) => {
    setDropdownOpen(false);
    navigate(sectorConfigs[key].path);
  };

  // Locale Selector Helper for unified inline content
  const lang = (i18n.language?.substring(0, 2) === 'ca') ? 'ca' : ((i18n.language?.substring(0, 2) === 'en') ? 'en' : 'es');

  // Unified Localized Fallback system to keep translations modular & flawless
  const getTranslation = (key: string, caVal: string, esVal: string, enVal: string): string => {
    if (lang === 'ca') return t(key, caVal);
    if (lang === 'en') return t(key, enVal);
    return t(key, esVal);
  };

  const sectorName = getTranslation(
    `verticals.${sectorKey}.name`,
    sectorKey === 'hotels' ? "Agents Digitals per Hotels i Càmpings" :
    sectorKey === 'real_estate' ? "Tours 3D i Agents per Immobiliàries i Cases Rurals" :
    sectorKey === 'clinics' ? "Agents IA per Clíniques Privades" :
    sectorKey === 'ecommerce' ? "Automatització i IA per Ecommerce" :
    "GEO / AI Visibility per a Empreses",
    sectorKey === 'hotels' ? "Agentes Digitales para Hoteles y Campings" :
    sectorKey === 'real_estate' ? "Tours 3D y Agentes para Inmobiliarias y Casas Rurales" :
    sectorKey === 'clinics' ? "Agentes IA para Clínicas Privadas" :
    sectorKey === 'ecommerce' ? "Automatización e IA para Ecommerce" :
    "GEO / AI Visibility para Empresas",
    sectorKey === 'hotels' ? "Digital Agents for Hotels & Campsites" :
    sectorKey === 'real_estate' ? "3D Tours & Agents for Real Estate & Rural Houses" :
    sectorKey === 'clinics' ? "AI Agents for Private Clinics" :
    sectorKey === 'ecommerce' ? "Automation & AI for E-commerce" :
    "GEO / AI Visibility for Businesses"
  );

  const sectorTitle = getTranslation(
    `verticals.${sectorKey}.title`,
    sectorKey === 'hotels' ? "Més reserves directes, menys comissions de Booking i més vendes." :
    sectorKey === 'real_estate' ? "Converteix visites virtuals en compradors reals de pisos, viles i cases rurals." :
    sectorKey === 'clinics' ? "Fes que el pacient confiï en tu abans d'entrar per la porta." :
    sectorKey === 'ecommerce' ? "Multiplica la conversió de la teva botiga online resolent dubtes al segon." :
    "Apareix i destaca en les recomanacions dels motors de cerca de IA.",
    sectorKey === 'hotels' ? "Más reservas directas, menos comisiones de Booking y más ventas." :
    sectorKey === 'real_estate' ? "Convierte visitas virtuales en compradores reales de pisos, villas y casas rurales." :
    sectorKey === 'clinics' ? "Haz que el paciente confíe en ti antes de entrar por la puerta." :
    sectorKey === 'ecommerce' ? "Multiplica la conversión de tu tienda online resolviendo dudas al segundo." :
    "Aparece y destaca en las recomendaciones de los motores de búsqueda de IA.",
    sectorKey === 'hotels' ? "More direct bookings, fewer Booking commissions, and more sales." :
    sectorKey === 'real_estate' ? "Turn virtual visits into real buyers of apartments, villas, and rural houses." :
    sectorKey === 'clinics' ? "Build solid patient trust before they even step through the door." :
    sectorKey === 'ecommerce' ? "Boost your online store's conversion rate by solving questions instantly." :
    "Appear and stand out in AI generative search engines recommendations."
  );

  const sectorPromise = getTranslation(
    `verticals.${sectorKey}.promise`,
    sectorKey === 'hotels' ? "Reduïm la dependència d'OTAs mitjançant recorreguts 3D i agents autònoms 24/7." :
    sectorKey === 'real_estate' ? "Filtra i pre-qualifica compradors abans d'agendar visites físiques a immobles i cases rurals." :
    sectorKey === 'clinics' ? "Maximitza l'agenda de la teva clínica i redueix l'absència amb recordatoris intel·ligents." :
    sectorKey === 'ecommerce' ? "Recupera carrets abandonats actuant en el moment clau amb mètodes interactius 3D." :
    "Preparem la seva web perquè Google, ChatGPT, Claude i Perplexity l'entenguin i la recomanin.",
    sectorKey === 'hotels' ? "Reducimos la dependencia de OTAs mediante recorridos 3D y agentes autónomos 24/7." :
    sectorKey === 'real_estate' ? "Filtra y precalifica compradores antes de agendar visitas físicas a inmuebles y casas rurales." :
    sectorKey === 'clinics' ? "Maximiza la agenda de tu clínica y reduce el absentismo con recordatorios inteligentes." :
    sectorKey === 'ecommerce' ? "Recupera carritos abandonados actuando en el momento clave con métodos interactivos 3D." :
    "Preparamos su web para que Google, ChatGPT, Claude y Perplexity la entiendan y la recomienden.",
    sectorKey === 'hotels' ? "Reduce OTA dependency using interactive 3D tours and 24/7 autonomous agents." :
    sectorKey === 'real_estate' ? "Filter and pre-qualify buyers before scheduling physical visits to properties and rural houses." :
    sectorKey === 'clinics' ? "Maximize your clinical schedule and reduce no-shows with smart reminders." :
    sectorKey === 'ecommerce' ? "Recover abandoned carts by intervening at key checkout moments with 3D product previews." :
    "We optimize your website so that Google, ChatGPT, Claude, and Perplexity understand and recommend you."
  );

  const sectorPain = getTranslation(
    `verticals.${sectorKey}.pain`,
    sectorKey === 'hotels' ? "Més del 70% de les visites marxen de la teva web sense reservar per dubtes immediats, buscant preus a Booking. Mentrestant, la recepció perd hores responent les mateixes preguntes de sempre." :
    sectorKey === 'real_estate' ? "Els comercials perden el 60% del seu temps ensenyant immobles i cases rurals a curiosos o clients insolvents. Mentrestant, els compradors d'alt valor es perden per manca de respostes immediates." :
    sectorKey === 'clinics' ? "El pacient sent por o desconfiança abans de triar clínica, i qualsevol resposta tardana el llança a la competència. A més, l'absència de darrera hora (no-shows) destrossa la teva facturació." :
    sectorKey === 'ecommerce' ? "El 70% dels compradors abandonen el carret degut a dubtes d'últim minut sobre enviaments, devolucions o talles. Esperar un mail de suport mata el desig immediat de compra." :
    "La gent demana recomanacions d'empreses directament a ChatGPT o Claude en lloc de cercar a Google. Si la teva web no està optimitzada semànticament per a bots de IA, ets 100% invisible.",
    sectorKey === 'hotels' ? "Más del 70% de las visitas se van de tu web sin reservar por dudas inmediatas, buscando precios en Booking. Mientras tanto, la recepción pierde horas respondiendo las mismas preguntas de siempre." :
    sectorKey === 'real_estate' ? "Los comerciales pierden el 60% de su tiempo enseñando inmuebles y casas rurales a curiosos o clientes insolventes. Mientras tanto, los compradores de alto valor se pierden por falta de respuestas inmediatas." :
    sectorKey === 'clinics' ? "El paciente siente miedo o desconfianza antes de elegir clínica, y cualquier respuesta tardía lo lanza a la competencia. Además, el absentismo de última hora (no-shows) destroza tu facturación." :
    sectorKey === 'ecommerce' ? "El 70% de los compradores abandonan el carrito debido a dudas de último minuto sobre envíos, devoluciones o tallas. Esperar un mail de soporte mata el deseo inmediato de compra." :
    "La gente pide recomendaciones de empresas directamente a ChatGPT o Claude en lugar de buscar en Google. Si tu web no está optimizada semánticamente para bots de IA, eres 100% invisible.",
    sectorKey === 'hotels' ? "Over 70% of web visits leave without booking due to simple questions, checking rates on Booking. Meanwhile, your staff spends hours answering the same questions repeatedly." :
    sectorKey === 'real_estate' ? "Real estate agents lose 60% of their weekly hours showing homes and rural houses to unqualified buyers. Meanwhile, premium solvent leads fade away due to lack of immediate answers." :
    sectorKey === 'clinics' ? "Patients feel insecure before booking clinical procedures, and slow support pushes them to competitors. Additionally, late cancellations (no-shows) drain clinical margins." :
    sectorKey === 'ecommerce' ? "70% of online shoppers abandon their carts because of simple doubts on shipping, sizing or returns. Having to wait for an email response completely kills purchase intent." :
    "People are increasingly asking ChatGPT and Claude for local business recommendations. If your website is not semantically optimized for AI scrapers, your company is completely invisible."
  );

  const showcaseTitle = getTranslation(
    `verticals.${sectorKey}.showcase_title`,
    "El que digitalitzem en alta resolució i mostrem en 3D:",
    "Lo que digitalizamos en alta resolución y mostramos en 3D:",
    "What we digitize in high resolution and display in 3D:"
  );

  // Fallback lists
  const showcaseItems: string[] = t(`verticals.${sectorKey}.showcase_items`, { returnObjects: true }) as string[] || 
    (sectorKey === 'hotels' ? ["Habitacions i banys", "Bungalous i viles", "Piscines i comuns", "Restaurants i spas"] :
     sectorKey === 'real_estate' ? (
       lang === 'ca' ? ["Cases rurals i d'encant", "Pisos i cases urbans", "Finques i xalets de luxe", "Obra nova i promocions"] :
       lang === 'en' ? ["Charming rural houses", "Urban apartments & houses", "Luxury estates & villas", "New construction & projects"] :
       ["Casas rurales y con encanto", "Pisos y casas urbanas", "Fincas y chalets de lujo", "Obra nueva y promociones"]
     ) :
     sectorKey === 'clinics' ? ["Gabinet i consultes", "Quiròfans estèrils", "Sales d'espera exclusives"] :
     sectorKey === 'ecommerce' ? ["Models 3D interactius", "Productes destacats", "Showrooms de retail"] :
     ["Metadades Schema", "Fitxer llms.txt actiu", "Contingut optimitzat GEO"]);

  const agentsList = (t(`verticals.${sectorKey}.agents`, { returnObjects: true }) as Array<{ name: string; desc: string }> || []).length > 0
    ? (t(`verticals.${sectorKey}.agents`, { returnObjects: true }) as Array<{ name: string; desc: string }>)
    : (sectorKey === 'hotels' ? [
        { name: lang === 'ca' ? "Agent de Reserves 24/7" : lang === 'en' ? "24/7 Booking Agent" : "Agente de Reservas 24/7", desc: lang === 'ca' ? "Guia l'hoste a la passarel·la directa de reserves sense comissions." : lang === 'en' ? "Guides guests to direct booking gateways with zero commissions." : "Guía al huésped a la pasarela directa de reservas sin comisiones." },
        { name: lang === 'ca' ? "Agent de FAQs del Resort" : lang === 'en' ? "Resort FAQ Agent" : "Agente de FAQs del Resort", desc: lang === 'ca' ? "Respon instantàniament sobre check-in, gats/gossos, spas i pàrquing." : lang === 'en' ? "Instantly answers questions regarding check-in, pet policy, spas, and parking." : "Responde instantáneamente sobre check-in, perros, spas y parking." }
      ] : sectorKey === 'real_estate' ? [
        { name: lang === 'ca' ? "Pre-Qualificador de Leads" : lang === 'en' ? "Lead Pre-Qualifier" : "Precalificador de Leads", desc: lang === 'ca' ? "Avalua el pressupost, urgència i solvència del client abans de connectar-lo." : lang === 'en' ? "Evaluates buyer budget, timeline, and solvency before booking physical visits." : "Evalúa el presupuesto, urgencia y solvencia del cliente antes de conectarlo." },
        { name: lang === 'ca' ? "Agent de Turisme i Cases Rurals" : lang === 'en' ? "Rural Property Specialist" : "Agente de Turismo y Casas Rurales", desc: lang === 'ca' ? "Assessora sobre llicències turístiques, terrenys rústics i accés a serveis." : lang === 'en' ? "Advises on tourism licenses, rural lands, and utility connections." : "Asesora sobre licencias turísticas, terrenos rústicos y acceso a servicios." }
      ] : sectorKey === 'clinics' ? [
        { name: lang === 'ca' ? "Recordatori Proactiu WhatsApp" : lang === 'en' ? "Proactive WhatsApp Reminders" : "Recordatorio Proactivo WhatsApp", desc: lang === 'ca' ? "Gestiona confirmacions de cita automàtiques per evitar buits d'agenda." : lang === 'en' ? "Manages automatic appointment confirmations to prevent empty slots." : "Gestiona confirmaciones de cita automáticas para evitar huecos en agenda." },
        { name: lang === 'ca' ? "Assistent Virtual de Reserves Spa" : lang === 'en' ? "Virtual Spa Booking Assistant" : "Asistente Virtual de Reservas Spa", desc: lang === 'ca' ? "Guia els usuaris a triar el seu massatge, triar especialista i reservar el seu torn de forma directa i instantània." : lang === 'en' ? "Guides users to choose their ideal massage, select specialists, and book their sessions instantly." : "Guía a los usuarios a elegir su masaje ideal, seleccionar especialistas y reservar sus sesiones al instante." }
      ] : sectorKey === 'ecommerce' ? [
        { name: lang === 'ca' ? "Recomanador de Venda Activa" : lang === 'en' ? "Active AI Upsell Agent" : "Recomendador de Venta Activa", desc: lang === 'ca' ? "Ajuda el comprador a trobar el producte perfecte segons preferències." : lang === 'en' ? "Assists buyers in finding their perfect product based on style and utility." : "Ayuda al comprador a encontrar el producto perfecto según preferencias." },
        { name: lang === 'ca' ? "Agent de Recuperació" : lang === 'en' ? "Checkout Recoverer" : "Agente de Recuperación", desc: lang === 'ca' ? "Ofereix mètodes ràpids i respostes d'últim minut sobre transports o mides." : lang === 'en' ? "Provides quick sizing or shipping calculations directly on checkout hesitation." : "Ofrece métodos rápidos y respuestas de último minuto sobre transporte o medidas." }
      ] : [
        { name: lang === 'ca' ? "Rastrejador semàntic" : lang === 'en' ? "Semantic Markup Engine" : "Rastreador semántico", desc: lang === 'ca' ? "Insereix microdades que ChatGPT utilitza per citar marques en respostes directes." : lang === 'en' ? "Injects structured microdata that ChatGPT reads to cite your brand." : "Inserta microdatos que ChatGPT utiliza para citar marcas en respuestas directas." },
        { name: lang === 'ca' ? "Generador d'llms.txt" : lang === 'en' ? "llms.txt Compiler" : "Generador de llms.txt", desc: lang === 'ca' ? "Sintetitza la teva web en Markdown ràpid llegible per a scrapers d'intel·ligència artificial." : lang === 'en' ? "Summarizes your company bio in rapid-scraped Markdown optimized for AI agents." : "Sintetiza tu web en Markdown rápido legible para scrapers de inteligencia artificial." }
      ]);

  const resultsItems = (t(`verticals.${sectorKey}.results_items`, { returnObjects: true }) as Array<{ label: string; value: string }> || []).length > 0
    ? (t(`verticals.${sectorKey}.results_items`, { returnObjects: true }) as Array<{ label: string; value: string }>)
    : (sectorKey === 'hotels' ? [
        { label: lang === 'ca' ? "Reserves directes" : "Direct Bookings", value: "+24%" },
        { label: lang === 'ca' ? "Estalvi de comissions" : "Commission Savings", value: "18%" }
      ] : sectorKey === 'real_estate' ? [
        { label: lang === 'ca' ? "Leads de qualitat" : "Qualified Leads", value: "+35%" },
        { label: lang === 'ca' ? "Hores guanyades" : "Hours Saved", value: "15h" }
      ] : sectorKey === 'clinics' ? [
        { label: lang === 'ca' ? "Absentisme clínic" : "No-Show Decrease", value: "-60%" },
        { label: lang === 'ca' ? "Retorn d'agenda" : "Slot Booking", value: "+28%" }
      ] : sectorKey === 'ecommerce' ? [
        { label: lang === 'ca' ? "Conversió ecommerce" : "Ecommerce Conversion", value: "+32%" },
        { label: lang === 'ca' ? "Carrets recuperats" : "Recovered Carts", value: "+18%" }
      ] : [
        { label: lang === 'ca' ? "Mencions de IA guanyades" : "AI Citations Won", value: "5x Més" },
        { label: label => "GEO Visibility", value: "A+ Max" }
      ]);

  // Specific dynamic Questions, Stats, and real FAQs
  const specificQuestion = getTranslation(
    `verticals.${sectorKey}.specific_question`,
    sectorKey === 'hotels' ? "Com pot un hotel reduir la dependència de Booking amb agents de IA?" :
    sectorKey === 'real_estate' ? "Com estalviar el 60% del temps comercial i qualificar clients amb tours 3D?" :
    sectorKey === 'clinics' ? "Com pot una clínica privada reduir un 60% l'absència de pacients i omplir la seva agenda?" :
    sectorKey === 'ecommerce' ? "Com pot un e-commerce augmentar un 32% la taxa de conversió i recuperar carrets abandonats?" :
    "Com aconseguir que ChatGPT, Claude, Gemini i Perplexity recomanin el teu negoci per davant de la competència?",
    sectorKey === 'hotels' ? "¿Cómo puede un hotel reducir su dependencia de Booking con agentes de IA?" :
    sectorKey === 'real_estate' ? "¿Cómo ahorrar el 60% del tiempo comercial y calificar clientes con tours 3D?" :
    sectorKey === 'clinics' ? "¿Cómo puede una clínica privada reducir un 60% el absentismo y llenar su agenda?" :
    sectorKey === 'ecommerce' ? "¿Cómo puede un e-commerce aumentar un 32% la tasa de conversión y recuperar carritos abandonados?" :
    "¿Cómo lograr que ChatGPT, Claude, Gemini y Perplexity recomienden tu negocio por delante de la competencia?",
    sectorKey === 'hotels' ? "How can a hotel reduce Booking dependency with conversational AI agents?" :
    sectorKey === 'real_estate' ? "How to save 60% of sales staff hours and qualify leads using interactive 3D tours?" :
    sectorKey === 'clinics' ? "How can a private clinic decrease client no-shows by 60% and streamline scheduling?" :
    sectorKey === 'ecommerce' ? "How can an e-commerce increase conversion by 32% and capture abandoned checkouts?" :
    "How to get ChatGPT, Claude, Gemini, and Perplexity to recommend your business instead of competitors?"
  );

  const specificQuestionSub = getTranslation(
    `verticals.${sectorKey}.specific_question_sub`,
    "Analitzem el mètode exacte basat en dades i canvis de comportament dels usuaris.",
    "Analizamos el método exacto basado en datos y cambios de comportamiento de los usuarios.",
    "We break down the exact method backed by real industry data and modern user behavior shifts."
  );

  // Real data stats with sources
  const statItems = sectorKey === 'hotels' ? [
    { value: "76%", label: lang === 'ca' ? "de clients busquen preus a Booking abans de demanar" : "of guests check Booking rates before deciding to purchase", source: "Cornell University School of Hotel Administration" },
    { value: "15% - 25%", label: lang === 'ca' ? "comissió mitjana de Booking per habitació reservada" : "average OTA commission fee on every checkout", source: "Hotrec European Hospitality Survey" },
    { value: "+24%", label: lang === 'ca' ? "increment mitjà en reserves directes amb xat actiu" : "increase in direct conversion rates with real-time support", source: "SKIRION Hospitality Data Lab" }
  ] : sectorKey === 'real_estate' ? [
    { value: "300%", label: lang === 'ca' ? "més de temps passen en llistats amb tours 3D" : "more time spent on real estate listings with 3D interactive scans", source: "National Association of Realtors (NAR)" },
    { value: "74%", label: lang === 'ca' ? "reducció de visites de curiosos sense intenció de compra" : "decrease in physical visits by unqualified buyers", source: "Matterport Property Market Analysis" },
    { value: "15h", label: lang === 'ca' ? "estalviades de mitjana setmanal per agent immobiliari" : "saved weekly per commercial agent in useless travel", source: "SKIRION Real Estate Analytics 2025" }
  ] : sectorKey === 'clinics' ? [
    { value: "14%", label: lang === 'ca' ? "de la facturació anual es perd a causa de no-shows" : "of clinic potential margin lost annually to missed visits", source: "Journal of Healthcare Management" },
    { value: "82%", label: lang === 'ca' ? "de pacients demanen reserves fora d'hores de recepció" : "of patients look to book visits outside clinical work hours", source: "Accenture Digital Health Study" },
    { value: "-60%", label: lang === 'ca' ? "de caiguda d'absència mitjançant seguiment intel·ligent" : "reduction in clinical no-shows via automated WhatsApp reminders", source: "SKIRION Practice Automation Index" }
  ] : sectorKey === 'ecommerce' ? [
    { value: "69.57%", label: lang === 'ca' ? "de carrets s'abandonen directament al checkout" : "average e-commerce cart abandonment rate across retail", source: "Baymard Institute E-commerce Usability" },
    { value: "130%", label: lang === 'ca' ? "més de conversió quan es respon el dubte sota el minut" : "sales lift when buyer questions are solved within 45 seconds", source: "Harvard Business Review Lead Study" },
    { value: "+32%", label: lang === 'ca' ? "de pujada en vendes amb visualitzador de producte 3D" : "boost in checkout success with interactive 3D elements", source: "Shopify Immersive Commerce Data" }
  ] : [
    { value: "45%", label: lang === 'ca' ? "d'usuaris premium utilitzen ChatGPT per demanar marques" : "of premium consumers ask ChatGPT/Claude directly for business recommendations", source: "Gartner Search Shift Research" },
    { value: "93%", label: lang === 'ca' ? "de respostes es basen en Schemas i enllaços d'llms.txt" : "of generative search responses reference Schema metadata or llms.txt standard", source: "VentureBeat AI Ecosystem Report" },
    { value: "5x Més", label: lang === 'ca' ? "probabilitats de ser recomanat amb optimització GEO" : "increase in citation frequency with SKIRION advanced GEO framework", source: "SKIRION AI Search Laboratory" }
  ];

  // Real FAQs with Answers
  const faqItems = sectorKey === 'hotels' ? [
    { question: lang === 'ca' ? "Com ajuda exactament SKIRION a desviar visites d'OTAs?" : "How does SKIRION prevent users from jumping to OTAs?", answer: lang === 'ca' ? "Oferim un recorregut 3D interactiu de gran realisme directament a la web combinat amb un assistent de IA que respon al segon qualsevol dubte (gossos, check-in, spa, pàrquing). L'usuari troba la seguretat que busca sense necessitat de marxar de la teva web a buscar fotos o preus a Booking." : "By placing an immersive 3D space twin directly on your website paired with an AI host that answers questions (check-in, parking, pet rules) in 2 seconds. Guests find full clarity on your site and book directly, rather than returning to Booking." },
    { question: lang === 'ca' ? "És compatible amb els motors de reserves existents?" : "Can it integrate with our existing booking engines?", answer: lang === 'ca' ? "Sí, de forma totalment neta. Ens connectem amb qualsevol motor (com Mirai, Neobookings, Cloudbeds o Roiback) per derivar els clients pre-qualificats al mètode de pagament directe." : "Absolutely. We seamlessly link with any market engine (including Mirai, Neobookings, Cloudbeds, or Roiback) to redirect verified clients right to your checkout process." }
  ] : sectorKey === 'real_estate' ? [
    { question: lang === 'ca' ? "Com s'aconsegueix pre-qualificar un comprador online?" : "How does the AI pre-qualify a buyer online?", answer: lang === 'ca' ? "L'agent autònom de xat acompanya la visita 3D. Amb un to natural i consultiu, pregunta quina capacitat financera té, si disposa d'aprovació d'hipoteca i el termini ideal de trasllat. Només agendarà la visita física al calendari comercial quan el lead compleixi els criteris establerts." : "Our autonomous agent guides the viewer inside the 3D tour. Through helpful dialogue, it maps their budget, mortgage approval status, and timeline. It only unlocks the physical showing calendar if the buyer fits your requirements." },
    { question: lang === 'ca' ? "Els tours 3D es poden publicar a Idealista o Fotocasa?" : "Can we embed the 3D tours in Idealista or Fotocasa?", answer: lang === 'ca' ? "Sí. Els nostres tours s'integren de forma compatible amb els principals portals immobiliaris, aconseguint duplicar el trànsit d'interès i qualitat en els teus llistats." : "Yes. All our interactive 3D scans are fully supported and compliant with major real estate portals, generating twice as many views as standard photo listings." }
  ] : sectorKey === 'clinics' ? [
    { question: lang === 'ca' ? "És segur utilitzar intel·ligència artificial per a consultes mèdiques?" : "Is it safe to use AI for clinical patient consultations?", answer: lang === 'ca' ? "Sí. L'agent de IA s'entrena sota un entorn estricte i tancat exclusivament amb els protocols, tractaments i dades de la teva clínica. Respon dubtes logístics i explicatius (ex. com funciona Invisalign), alliberant la recepció de tasques repetitives de forma segura." : "Yes. The AI agent operates in a closed environment trained strictly on your clinic's guides and protocols. It explains procedures (e.g., how Invisalign works) and answers logistics, safely freeing your reception team from endless calls." },
    { question: lang === 'ca' ? "Amb quins sistemes de gestió clínica es connecta?" : "Which clinic management systems are supported?", answer: lang === 'ca' ? "S'integra mitjançant APIs amb els principals programaris de gestió sanitària i dental (com Gesden, Clinic Cloud, Cliniconex o Salesforce) per actualitzar l'agenda en directe." : "We connect via standard APIs with major health and dental CRM platforms (such as Gesden, Clinic Cloud, Cliniconex, or Salesforce) to keep your schedule fully updated in real-time." }
  ] : sectorKey === 'ecommerce' ? [
    { question: lang === 'ca' ? "Com aconsegueix l'agent de IA reduir carrets abandonats?" : "How does the AI recover abandoned checkouts?", answer: lang === 'ca' ? "Intervé quan es detecta dubtes o abandonaments al checkout. Pregunta si té dubtes de talles, enviaments o política de devolucions i els resol immediatament, evitant frens de compra de darrera hora." : "It proactively steps in during checkout hesitation. It solves sizing doubts, shipping fees, or refund terms in real-time, removing checkout friction instantly." },
    { question: lang === 'ca' ? "És compatible amb Shopify, WooCommerce o ERPs?" : "Is it compatible with Shopify, WooCommerce or custom ERPs?", answer: lang === 'ca' ? "Sí. Els nostres agents es connecten amb les teves bases de dades o botigues Shopify i WooCommerce per consultar l'estoc real, preus i seguiment automàtic de comandes." : "Yes, natively. Our agents sync directly with Shopify, WooCommerce, or custom inventory databases to pull real-time stocks, shipping trackers, and pricing." }
  ] : [
    { question: lang === 'ca' ? "Què és exactament el GEO i en què es diferencia del SEO?" : "What is GEO and how is it different from SEO?", answer: lang === 'ca' ? "El SEO tradicional optimitza per a buscadors de text com Google. El GEO (Generative Engine Optimization) optimitza la teva semàntica, dades structured Schema i referències Markdown (llms.txt) perquè les IA generatives com ChatGPT, Claude o Perplexity llegeixin la teva marca de forma fàcil i et recomanin com a referent." : "Traditional SEO optimizes for classic link search engines. GEO (Generative Engine Optimization) structures your website semantic content, Schema metadata, and Markdown files (llms.txt) so that AI bots (ChatGPT, Claude, Perplexity) easily scrape and recommend your company." },
    { question: lang === 'ca' ? "Què és el fitxer skirionmedia.com/llms.txt?" : "What is the purpose of the skirionmedia.com/llms.txt file?", answer: lang === 'ca' ? "És un estàndard web formatat en Markdown dissenyat específicament perquè els robots d'intel·ligència artificial (LLMs) llegeixin i sintentitzin en mil·lisegons tota la informació dels teus serveis, preguntes, verticals i contacte, citant-te directament." : "It is a modern web standard in Markdown specifically compiled for LLMs and AI scrapers to quickly digest your core business bio, services, FAQs, and links, allowing them to recommend and cite your brand with high confidence." }
  ];

  // ----------------------------------------------------
  // INTERACTIVE DEMO SIMULATOR STATE
  // ----------------------------------------------------
  const [is3D, setIs3D] = useState<boolean>(true);
  
  // Hotel Demo State
  const [hotelRoom, setHotelRoom] = useState<'camping' | 'pool' | 'restaurant' | 'mobile_home'>('camping');
  const [hotelChatText, setHotelChatText] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Real Estate Demo State
  const [estateTab, setEstateTab] = useState<'rental_apartment' | 'living' | 'kitchen' | 'terrace'>('rental_apartment');
  const [buyerBudget, setBuyerBudget] = useState<number>(450000);
  const [buyerTimeline, setBuyerTimeline] = useState<string>('now');

  // Clinics Demo State
  const [clinicArea, setClinicArea] = useState<'lobby' | 'dental' | 'surgery'>('lobby');
  const [clinicChatText, setClinicChatText] = useState<string[]>([]);

  // E-commerce Demo State
  const [ecomTab, setEcomTab] = useState<'sofa' | 'chair' | 'showroom'>('sofa');
  const [ecomChatText, setEcomChatText] = useState<string[]>([]);

  // GEO Visibility Console Demo State
  const [activeQuery, setActiveQuery] = useState<'hotel' | 'clinic' | 'kitchen' | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isConsoleSearching, setIsConsoleSearching] = useState<boolean>(false);

  const getPolycamId = (): string => {
    switch (sectorKey) {
      case 'hotels':
        return 'f65c1975-d144-4824-8a4d-027bb309eec8';
      case 'real_estate':
        if (estateTab === 'living') return 'e0d3cbbf-a23f-4273-ba58-3d5f992a5ee1';
        if (estateTab === 'kitchen') return '1eef26ec-840a-4bbf-afba-2f88bebbfb9a';
        return 'fba128f7-7b24-4f6c-8515-be86e30ebdd0';
      case 'clinics':
        if (clinicArea === 'lobby') return 'e0d3cbbf-a23f-4273-ba58-3d5f992a5ee1';
        if (clinicArea === 'dental') return '9df16a75-bde3-49fd-9fce-e0edba4899c7';
        return '1eef26ec-840a-4bbf-afba-2f88bebbfb9a';
      case 'ecommerce':
        if (ecomTab === 'sofa') return 'd67e5cc5-24c6-4b82-bd6a-040fb68fd654';
        if (ecomTab === 'chair') return '0969796f-cf99-4a73-a656-78cbcc7e6be3';
        return 'e0d3cbbf-a23f-4273-ba58-3d5f992a5ee1';
      default:
        return '62d7184a-ab0d-4767-ae8c-b8af1ea4d765';
    }
  };

  // Simulation typing for Chatbots
  useEffect(() => {
    // Reset simulators on change
    setHotelChatText([]);
    setClinicChatText([]);
    setEcomChatText([]);
    setActiveQuery(null);
    setConsoleLogs([]);
  }, [sectorKey]);

  const triggerChatResponse = (userMsg: string, systemMsg: string, type: 'hotel' | 'clinic' | 'ecommerce') => {
    if (type === 'hotel') {
      if (hotelChatText.includes(userMsg)) return;
      setHotelChatText(prev => [...prev, `Client: ${userMsg}`]);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setHotelChatText(prev => [...prev, `SKIRION Agent: ${systemMsg}`]);
      }, 1100);
    } else if (type === 'clinic') {
      if (clinicChatText.includes(userMsg)) return;
      setClinicChatText(prev => [...prev, `Pacient: ${userMsg}`]);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setClinicChatText(prev => [...prev, `SKIRION Med-Agent: ${systemMsg}`]);
      }, 1100);
    } else {
      if (ecomChatText.includes(userMsg)) return;
      setEcomChatText(prev => [...prev, `Client: ${userMsg}`]);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setEcomChatText(prev => [...prev, `SKIRION Shop-Assistant: ${systemMsg}`]);
      }, 1100);
    }
  };

  const handleHotelRoomChange = (room: 'camping' | 'pool' | 'restaurant' | 'mobile_home') => {
    setHotelRoom(room);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let agentMsg = "";
      if (room === 'camping') {
        agentMsg = lang === 'ca' 
          ? "SKIRION Camping-Agent: Has seleccionat la vista general del Càmping 3D interactiu. Pots navegar lliurement per tot l'entorn del recinte."
          : "SKIRION Camping-Agent: Has seleccionado la vista general del Camping 3D interactivo. Puedes navegar libremente por todo el recinto.";
      } else if (room === 'pool') {
        agentMsg = lang === 'ca'
          ? "SKIRION Camping-Agent: Has seleccionat la piscina coberta climatitzada. Té una temperatura de l'aigua excel·lent a 28°C i obre de 09:00h a 21:00h."
          : "SKIRION Camping-Agent: Has seleccionado la piscina cubierta climatizada. Tiene una temperatura de agua excelente a 28°C y abre de 09:00h a 21:00h.";
      } else if (room === 'restaurant') {
        agentMsg = lang === 'ca'
          ? "SKIRION Camping-Agent: Has seleccionat el Restaurant gastronòmic del recinte. Cuina tradicional, menús diaris i terrassa acollidora per a tota la família."
          : "SKIRION Camping-Agent: Has seleccionado el Restaurante gastronómico del recinto. Cocina tradicional, menús diarios y terraza acogedora para toda la familia.";
      } else if (room === 'mobile_home') {
        agentMsg = lang === 'ca'
          ? "SKIRION Camping-Agent: Has seleccionat el Mobile Home premium amb Spa exterior. Allotjaments de disseny exclusiu per a una estada d'alt confort i relax."
          : "SKIRION Camping-Agent: Has seleccionado el Mobile Home premium con Spa exterior. Alojamientos de diseño exclusivo para una estancia de alto confort y relax.";
      }
      setHotelChatText(prev => [...prev, agentMsg]);
    }, 800);
  };

  // GEO Query Simulated search
  const runGeoQuerySearch = (queryType: 'hotel' | 'clinic' | 'kitchen') => {
    if (isConsoleSearching) return;
    setIsConsoleSearching(true);
    setActiveQuery(queryType);
    setConsoleLogs([]);

    const steps = lang === 'ca' ? [
      "> S'està iniciant cerca generativa d'IA...",
      `> Query de l'usuari: "${queryType === 'hotel' ? 'Millor hotel rural pet-friendly a Catalunya' : queryType === 'clinic' ? 'Millor clínica d\'ortodòncia a Barcelona' : 'Comprar cuina de disseny a mida amb pressupost'}"`,
      "> Rastrejant metadades i dades estructurades Schema.org...",
      "> S'ha trobat un marcatge de tipus Service i FAQPage a la web del client...",
      "> S'està analitzant la referència ràpida de skirionmedia.com/llms.txt...",
      "> Arxiu llms.txt llegit amb èxit (100% de claredat en dades de contacte, preus i serveis)...",
      "> Compilant senyals d'autoritat i dades de confiança...",
      "> Generant recomanació de resposta amb màxima confiança..."
    ] : lang === 'en' ? [
      "> Initiating AI generative recommendation search...",
      `> User Prompt: "${queryType === 'hotel' ? 'Best pet-friendly rural hotel in Catalonia' : queryType === 'clinic' ? 'Best orthodontic clinic in Barcelona' : 'Buy custom designer kitchen with budget'}"`,
      "> Scraping structured Schema.org metadata...",
      "> Found verified Service and FAQPage schemas on client's domain...",
      "> Retrieving quick-reference skirionmedia.com/llms.txt map...",
      "> llms.txt file loaded successfully (100% readability of services, pricing, contact details)...",
      "> Compiling authority signals and context references...",
      "> Drafting final AI agent recommendation with high confidence..."
    ] : [
      "> Iniciando búsqueda generativa de IA...",
      `> Query de usuario: "${queryType === 'hotel' ? 'Mejor hotel rural pet-friendly en Cataluña' : queryType === 'clinic' ? 'Mejor clínica de ortodoncia en Barcelona' : 'Comprar cocina de diseño a medida con presupuesto'}"`,
      "> Rastreador buscando metadatos y datos estructurados Schema.org...",
      "> Encontrado marcado Service y FAQPage verificado en la web...",
      "> Accediendo al archivo de referencia rápida skirionmedia.com/llms.txt...",
      "> Archivo llms.txt cargado con éxito (100% de claridad en servicios, precios y contacto)...",
      "> Compilando señales de autoridad y confianza semántica...",
      "> Generando recomendación definitiva con máxima confianza..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setConsoleLogs(prev => [...prev, steps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsConsoleSearching(false);
      }
    }, 450);
  };

  const scoreCalculator = () => {
    let score = 50;
    if (buyerBudget > 300000) score += 20;
    if (buyerBudget > 600000) score += 15;
    if (buyerTimeline === 'now') score += 15;
    return score;
  };

  // Dynamically inject Schema.org JSON-LD to comply with technical SEO / AI scrapers rule
  useEffect(() => {
    const pageUrl = `https://skirionmedia.com/sectors/${sectorKey}`;
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://skirionmedia.com/#organization",
          "name": "SKIRION Media Group",
          "url": "https://skirionmedia.com",
          "logo": "https://skirionmedia.com/logo.png",
          "telephone": "+34644869615",
          "email": "info@skirionmedia.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Carrer d'Aragó",
            "addressLocality": "Barcelona",
            "postalCode": "08007",
            "addressCountry": "ES"
          }
        },
        {
          "@type": "Service",
          "@id": `${pageUrl}/#service`,
          "name": sectorTitle,
          "provider": {
            "@type": "Organization",
            "@id": "https://skirionmedia.com/#organization"
          },
          "serviceType": "AI Automation and 3D Virtualization",
          "description": sectorPromise
        },
        {
          "@type": "FAQPage",
          "@id": `${pageUrl}/#faq`,
          "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}/#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://skirionmedia.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Sectors",
              "item": "https://skirionmedia.com/sectors"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": sectorName,
              "item": pageUrl
            }
          ]
        },
        {
          "@type": "Article",
          "@id": `${pageUrl}/#article`,
          "headline": specificQuestion,
          "description": specificQuestionSub,
          "author": {
            "@type": "Organization",
            "name": "SKIRION Media Group"
          },
          "publisher": {
            "@type": "Organization",
            "name": "SKIRION Media Group"
          },
          "mainEntityOfPage": pageUrl
        },
        {
          "@type": "VideoObject",
          "@id": `${pageUrl}/#video`,
          "name": `${sectorName} Interactive Demo`,
          "description": "Interactive digital twin simulator and conversational AI workflow.",
          "thumbnailUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
          "uploadDate": "2026-01-01T08:00:00Z"
        }
      ]
    };

    let script = document.getElementById('schema-jsonld') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'schema-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(schemaData);

    return () => {
      const existing = document.getElementById('schema-jsonld');
      if (existing) existing.remove();
    };
  }, [sectorKey, lang, sectorTitle, sectorPromise, sectorName, specificQuestion, specificQuestionSub]);

  return (
    <div className="relative text-white pt-4 pb-16 md:pt-8 md:pb-24">
      <SEO 
        title={`${sectorName} | Solucions d'IA & Automatització`}
        description={`${sectorTitle}. ${sectorPromise}`}
        keywords={`SKIRION, ${sectorName}, IA ${sectorName}, agents autònoms, automatització comercial, GEO visibility`}
        path={`/sectors/${sectorId || ''}`}
      />
      <BackgroundGrid />

      {/* Futuristic Background Blur */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-0">
        <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] bg-brand-primary/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute top-[50%] left-[5%] w-[450px] h-[450px] bg-brand-primary/5 blur-[180px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Top Back Navigation */}
        <div className="mb-6 flex justify-start">
          <button
            onClick={() => {
              if (window.history.length > 2 && window.history.state?.idx > 0) {
                navigate(-1);
              } else {
                navigate('/agentes-digitales');
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-brand-primary/40 text-gray-300 hover:text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            <ArrowLeft size={14} className="text-brand-primary" />
            <span>{t('common.back', 'Tornar')}</span>
          </button>
        </div>

        {/* 1. SECTOR SELECTOR DROPDOWN & TABS */}
        <div className="flex flex-col items-center mb-10">
          <label className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-gray-500 mb-3 block text-center">
            {t('verticals.select_sector', 'Selecciona el sector per veure la solució dedicada:')}
          </label>
          
          <div className="relative inline-block w-full max-w-md">
            <button
              id="sector-dropdown"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between px-6 py-4 rounded-full bg-white/5 border border-white/10 hover:border-brand-primary/40 backdrop-blur-md text-white font-black uppercase tracking-wider text-sm transition-all shadow-lg"
            >
              <span className="flex items-center gap-3">
                {currentConfig.icon}
                {sectorName}
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute z-50 left-0 right-0 mt-3 bg-black/95 border border-white/10 rounded-[2.5rem] p-4 shadow-2xl backdrop-blur-2xl"
                >
                  {(['hotels', 'real_estate', 'clinics'] as SectorKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => handleSectorChange(key)}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-[1.5rem] text-left uppercase tracking-wider text-xs font-bold transition-all ${
                        sectorKey === key ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/30' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {sectorConfigs[key].icon}
                        {key === 'hotels' ? t('verticals.hotels.name', 'Hotels i Càmpings') :
                         key === 'real_estate' ? t('verticals.real_estate.name', 'Immobiliària') :
                         key === 'clinics' ? t('verticals.clinics.name', 'Clíniques Privades') :
                         key === 'ecommerce' ? t('verticals.ecommerce.name', 'E-commerce i Retail') :
                         t('verticals.geo_visibility.name', 'GEO / AI Visibility')}
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 2. STRATEGIC PHRASE BLOCKQUOTE */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto my-8 p-6 md:p-8 rounded-[2rem] bg-gradient-to-r from-brand-primary/5 via-brand-primary/[0.08] to-brand-primary/5 border border-brand-primary/10 text-center relative overflow-hidden"
        >
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-primary/10 blur-[40px] rounded-full" />
          <p className="text-sm md:text-base italic text-gray-400 font-light leading-relaxed tracking-wide px-4 relative z-10">
            "{t('verticals.strategic_phrase', 'A SKIRION muntem el sistema integral que fa que el teu negoci sigui més ràpid, més eficient i més rendible.')}"
          </p>
        </motion.div>

        {/* 3. HERO SECTION */}
        <div className="text-center mt-8 md:mt-12 mb-12 md:mb-16 max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.1] mb-4 md:mb-6 whitespace-pre-line max-w-5xl mx-auto">
            {sectorTitle}
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed tracking-normal py-1">
            🚀 {sectorPromise}
          </p>
        </div>

        {/* 4. PAIN VS SOLUTION GRID */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* PAIN AREA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="rounded-[2.5rem] p-8 md:p-12 border border-red-500/10 bg-gradient-to-b from-red-500/[0.02] to-transparent relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -top-12 -left-12 w-36 h-36 bg-red-500/5 blur-[50px] rounded-full" />
            <div>
              <div className="flex items-center gap-3 text-red-500 text-xs font-black uppercase tracking-[0.2em] mb-6">
                <ShieldAlert className="w-5 h-5" />
                <span>{t('verticals.pain_title', 'El dolor real del sector')}</span>
              </div>
              <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed tracking-wide whitespace-pre-line mb-8">
                {sectorPain}
              </p>
            </div>

            <div className="pt-6 border-t border-white/5 flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-mono font-bold text-sm">!</div>
              <span className="text-[11px] md:text-xs uppercase tracking-widest text-red-400/80 font-black">
                {sectorKey === 'hotels' && "OTAs capture up to 30% of your earnings."}
                {sectorKey === 'real_estate' && "60% of agent time is wasted on window shoppers."}
                {sectorKey === 'clinics' && "Clinics lose 18% of margin due to empty appointment slots."}
                {sectorKey === 'ecommerce' && "70% of potential buyers abandon in-cart."}
                {sectorKey === 'geo_visibility' && "AI assistants steer clients only to verified schema partners."}
              </span>
            </div>
          </motion.div>

          {/* SOLUTION AREA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-[2.5rem] p-8 md:p-12 border border-brand-primary/10 bg-gradient-to-b from-brand-primary/[0.02] to-transparent relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-brand-primary/5 blur-[50px] rounded-full" />
            <div>
              <div className="flex items-center gap-3 text-brand-primary text-xs font-black uppercase tracking-[0.2em] mb-6">
                <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                <span>{t('verticals.solution_title', 'La Solució SKIRION')}</span>
              </div>
              
              <h3 className="text-sm font-black uppercase text-gray-500 tracking-[0.2em] mb-4">
                {showcaseTitle}
              </h3>
              
              <ul className="space-y-3 mb-8">
                {showcaseItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-white text-sm font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-white/5 flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[11px] md:text-xs uppercase tracking-widest text-brand-primary font-black">
                Immersive 3D Space Twin + Conversational Autonomous Flow
              </span>
            </div>
          </motion.div>

        </div>

        {/* HOTEL ONLY: COMMISSIONS RECAPTURE CALCULATOR */}
        {sectorKey === 'hotels' && (
          <HotelOtaCalculator />
        )}

        {/* 5. INTERACTIVE TECH DEMO SIMULATOR */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-brand-primary mb-2 block">
              💻 DEMO CENTER
            </span>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white mb-2 py-1">
              {sectorKey === 'hotels' ? 'CAMPING INTERACTIU' : t('verticals.demo_title', 'Demo Interactiva del Sistema')}
            </h2>
          </div>

          <div className="glass-card rounded-[3.5rem] p-1 md:p-4 border border-white/10 bg-black/60 shadow-2xl relative overflow-hidden">
            
            {/* Upper console bar */}
            <div className="flex justify-between items-center px-6 md:px-8 py-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase ml-4 hidden sm:inline-block">
                  SKIRION SEC-OS v3.5 // STATUS: SIMULATOR_ACTIVE
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-brand-primary">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>LATENCY: 12ms</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-0">
              
              {/* HOTELS */}
              {sectorKey === 'hotels' && (
                <>
                  <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-white/10 relative h-[350px] md:h-[450px]">
                    <div className="absolute inset-0 z-0">
                      <iframe 
                        src="https://my.matterport.com/show/?m=XXS3iH2Bdgo" 
                        className="w-full h-full border-0 absolute inset-0 rounded-[2rem] overflow-hidden" 
                        allowFullScreen 
                        allow="xr-spatial-tracking"
                        referrerPolicy="no-referrer" 
                      />
                    </div>


                  </div>

                  <div className="lg:col-span-5 p-6 md:p-8 bg-white/[0.01] flex flex-col justify-between h-[350px] md:h-[450px]">
                    <div>
                      <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                        <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
                          <Calendar className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-widest text-white leading-tight">CAMPING CO-NAVIGATOR</p>
                          <p className="text-[9px] text-emerald-400 font-mono">● LIVE CAMPING AGENT ACTIVE</p>
                        </div>
                      </div>

                      <div className="space-y-4 py-4 h-[180px] md:h-[230px] overflow-y-auto font-sans">
                        <div className="p-3 bg-white/5 rounded-2xl max-w-[85%] text-xs font-light tracking-wide leading-relaxed">
                          {lang === 'ca' 
                            ? "Hola! Sóc l'agent de reserves del càmping. Explora la nostra piscina coberta, el restaurant o els bungalows des de l'espai 3D i pregunta'm qualsevol dubte que tinguis!"
                            : lang === 'en'
                            ? "Hello! I am the campsite booking agent. Explore our indoor pool, restaurant, or bungalows in 3D and ask me any questions!"
                            : "¡Hola! Soy el agente de reservas del camping. ¡Explora nuestra piscina cubierta, el restaurante o los bungalows desde el espacio 3D y pregúntame cualquier duda!"}
                        </div>
                        
                        {hotelChatText.map((msg, i) => {
                          const isAgent = msg.startsWith('SKIRION');
                          return (
                            <div key={i} className={`p-3 rounded-2xl max-w-[85%] text-xs font-semibold leading-relaxed ${isAgent ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20 ml-auto' : 'bg-white/5 text-gray-200'}`}>
                              {msg.includes(':') ? msg.substring(msg.indexOf(':') + 1) : msg}
                            </div>
                          );
                        })}

                        {isTyping && <div className="p-3 bg-brand-primary/5 border border-brand-primary/10 rounded-2xl text-[9px] text-gray-400 font-mono tracking-widest ml-auto animate-pulse max-w-max">{t('verticals.simulator.agent_compiling', 'L\'agent està preparant la resposta...')}</div>}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4">
                      <p className="text-[9px] uppercase font-black tracking-widest text-gray-500 mb-2">
                        {lang === 'ca' ? 'PREGUNTES FREQÜENTS DEL CÀMPING:' : lang === 'en' ? 'CAMPSITE FAQS:' : 'PREGUNTAS FRECUENTES DEL CAMPING:'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => triggerChatResponse(
                            lang === 'ca' ? "S'admeten gossos als bungalows?" : lang === 'en' ? "Are pets allowed in bungalows?" : "¿Se admiten perros en los bungalows?", 
                            lang === 'ca' ? "Sí, totalment! Som pet-friendly tant a les parcel·les de càmping com als nostres bungalows d'alta gamma per a tota la família." : lang === 'en' ? "Yes, absolutely! We are pet-friendly across camping pitches and premium family bungalows." : "¡Sí, totalmente! Somos pet-friendly tanto en las parcelas de camping como en nuestros bungalows de alta gama para toda la familia.", 
                            'hotel'
                          )} 
                          className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-brand-primary/10 hover:text-brand-primary text-[10px] font-bold text-gray-400 border border-white/10 transition-all"
                        >
                          {lang === 'ca' ? "Admeteu gossos?" : lang === 'en' ? "Pets allowed?" : "¿Admitís perros?"}
                        </button>
                        <button 
                          onClick={() => triggerChatResponse(
                            lang === 'ca' ? "Quin és l'horari de la piscina coberta?" : lang === 'en' ? "What are the heated pool hours?" : "¿Cuál es el horario de la piscina cubierta?", 
                            lang === 'ca' ? "La piscina coberta climatitzada està oberta cada dia de 09:00h a 21:00h. L'accés està completament inclòs en la vostra estada." : lang === 'en' ? "The heated indoor pool is open daily from 9:00 AM to 9:00 PM, fully included in your stay." : "La piscina cubierta climatizada está abierta cada día de 09:00h a 21:00h. El acceso está completamente incluido en vuestra estancia.", 
                            'hotel'
                          )} 
                          className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-brand-primary/10 hover:text-brand-primary text-[10px] font-bold text-gray-400 border border-white/10 transition-all"
                        >
                          {lang === 'ca' ? "Horari piscina" : lang === 'en' ? "Pool hours" : "Horario piscina"}
                        </button>
                        <button 
                          onClick={() => triggerChatResponse(
                            lang === 'ca' ? "Com funciona la reserva directa?" : lang === 'en' ? "How does direct booking work?" : "¿Cómo funciona la reserva directa?", 
                            lang === 'ca' ? "En reservar directament a la nostra web t'estalvies les comissions de plataformes externes (com Booking), tenint el millor preu garantit i prioritat de check-in." : lang === 'en' ? "By booking directly through our site, you skip OTA commissions (like Booking), getting the best guaranteed rate and priority check-in." : "Al reservar directamente en nuestra web te ahorras las comisiones de plataformas externas (como Booking), teniendo el mejor precio garantizado y prioridad de check-in.", 
                            'hotel'
                          )} 
                          className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-brand-primary/10 hover:text-brand-primary text-[10px] font-bold text-gray-400 border border-white/10 transition-all"
                        >
                          {lang === 'ca' ? "Reserva directa" : lang === 'en' ? "Direct booking" : "Reserva directa"}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* REAL ESTATE */}
              {sectorKey === 'real_estate' && (
                <>
                  <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-white/10 relative h-[350px] md:h-[450px]">
                    <div className="absolute inset-0 z-0">
                      <iframe 
                        src="https://my.matterport.com/show/?m=me135nNpsDF" 
                        className="w-full h-full border-0 absolute inset-0 rounded-[2rem] overflow-hidden" 
                        allowFullScreen 
                        allow="xr-spatial-tracking"
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 md:p-8 bg-white/[0.01] flex flex-col justify-between h-[350px] md:h-[450px] font-sans">
                    <div>
                      <div className="pb-4 border-b border-white/5">
                        <p className="text-[11px] font-black uppercase tracking-widest text-white leading-tight">QUALIFICATION BOT</p>
                        <p className="text-[9px] text-teal-400 font-mono">● LEAD GRADER ENGAGED</p>
                      </div>

                      <div className="py-6 space-y-6">
                        <div>
                          <div className="flex justify-between text-xs text-gray-400 mb-2 font-bold uppercase">
                            <span>{t('verticals.simulator.buyer_budget', 'Pressupost del comprador:')}</span>
                            <span className="text-brand-primary font-mono font-black">{buyerBudget.toLocaleString()} €</span>
                          </div>
                          <input type="range" min="150000" max="1200000" step="50000" value={buyerBudget} onChange={(e) => setBuyerBudget(Number(e.target.value))} className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary" />
                        </div>

                        <div>
                          <p className="text-xs text-gray-400 mb-2 font-bold uppercase">{t('verticals.simulator.timeline_prompt', 'Termini estimat de compra:')}</p>
                          <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setBuyerTimeline('now')} className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider border transition-all ${buyerTimeline === 'now' ? 'bg-brand-primary/10 text-brand-primary border-brand-primary' : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'}`}>{t('verticals.simulator.timeline_now', 'Immediat (1 mes)')}</button>
                            <button onClick={() => setBuyerTimeline('later')} className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider border transition-all ${buyerTimeline === 'later' ? 'bg-brand-primary/10 text-brand-primary border-brand-primary' : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'}`}>{t('verticals.simulator.timeline_later', 'Explorant (3-6 mesos)')}</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-3xl border border-white/5 text-xs">
                      <p className="text-[9px] uppercase font-black tracking-widest text-gray-500 mb-1">{t('verticals.simulator.compatibility_score', 'PUNTUACIÓ DE COMPATIBILITAT')}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-mono font-black text-brand-primary">{scoreCalculator()}%</span>
                        <p className="text-[10px] leading-relaxed text-gray-300 font-semibold">{scoreCalculator() >= 75 ? t('verticals.simulator.score_high', '✅ Lead d\'alt valor agendat.') : t('verticals.simulator.score_low', '⚠️ Enviant catàleg digital.')}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* CLINICS */}
              {sectorKey === 'clinics' && (
                <>
                  <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-white/10 relative h-[350px] md:h-[450px]">
                    <div className="absolute inset-0 z-0">
                      <iframe 
                        src="https://my.matterport.com/show/?m=QhLi1HH9JPJ" 
                        className="w-full h-full border-0 absolute inset-0 rounded-[2rem] overflow-hidden" 
                        allowFullScreen 
                        allow="xr-spatial-tracking"
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 md:p-8 bg-white/[0.01] flex flex-col justify-between h-[350px] md:h-[450px]">
                    <div>
                      <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                        <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
                          <Sparkles className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-widest text-white leading-tight">CLÍNICA SPA CO-NAVIGATOR</p>
                          <p className="text-[9px] text-emerald-400 font-mono">● SPA AGENT LIVE</p>
                        </div>
                      </div>

                      <div className="space-y-4 py-4 h-[180px] md:h-[230px] overflow-y-auto font-sans">
                        <div className="p-3 bg-white/5 rounded-2xl max-w-[85%] text-xs font-light tracking-wide leading-relaxed">
                          {lang === 'ca' 
                            ? "Benvingut! Sóc l'agent virtual de la nostra Clínica Spa & Wellness. Explora el nostre tour 3D immersiu per les instal·lacions termals i pregunta'm sobre els nostres massatges, tractaments de bellesa o reserves de circuits."
                            : lang === 'en'
                            ? "Welcome! I am the virtual agent for our Spa & Wellness Clinic. Explore our immersive 3D tour through the thermal facilities and ask me about our massages, beauty treatments, or circuit reservations."
                            : "¡Bienvenido! Soy el agente virtual de nuestra Clínica Spa & Wellness. Explora nuestro tour 3D inmersivo por las instalaciones termales y pregúntame sobre nuestros masajes, tratamientos de belleza o reservas de circuitos."}
                        </div>
                        
                        {clinicChatText.map((msg, i) => {
                          const isAgent = msg.startsWith('SKIRION');
                          return (
                            <div key={i} className={`p-3 rounded-2xl max-w-[85%] text-xs font-semibold leading-relaxed ${isAgent ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20 ml-auto' : 'bg-white/5 text-gray-200'}`}>
                              {msg.includes(':') ? msg.substring(msg.indexOf(':') + 1) : msg}
                            </div>
                          );
                        })}

                        {isTyping && <div className="p-3 bg-brand-primary/5 border border-brand-primary/10 rounded-2xl text-[9px] text-gray-400 font-mono tracking-widest ml-auto animate-pulse max-w-max">{t('verticals.simulator.agent_compiling')}</div>}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4">
                      <p className="text-[9px] uppercase font-black tracking-widest text-gray-500 mb-2">
                        {lang === 'ca' ? 'PREGUNTES DE VISITANTS:' : lang === 'en' ? 'VISITOR QUESTIONS:' : 'PREGUNTAS DE VISITANTES:'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => triggerChatResponse(
                            lang === 'ca' ? "Quins tractaments de benestar oferiu?" : lang === 'en' ? "What wellness treatments do you offer?" : "¿Qué tratamientos de bienestar ofrecéis?", 
                            lang === 'ca' ? "Oferim massatges terapèutics, facials d'alta gamma, tractaments amb pedres calentes i circuits d'aigües termals personalitzats per al teu total relax." : lang === 'en' ? "We offer therapeutic massages, high-end facials, hot stone treatments, and customized thermal water circuits for your ultimate relaxation." : "Ofrecemos masajes terapéuticos, faciales de alta gama, tratamientos con piedras calientes y circuitos de aguas termales personalizados para tu total relax.", 
                            'clinic'
                          )} 
                          className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-brand-primary/10 hover:text-brand-primary text-[10px] font-bold text-gray-400 border border-white/10 transition-all"
                        >
                          {lang === 'ca' ? "Tractaments i massatges" : lang === 'en' ? "Treatments & Massages" : "Tratamientos y masajes"}
                        </button>
                        <button 
                          onClick={() => triggerChatResponse(
                            lang === 'ca' ? "Com puc reservar el circuit d'aigües?" : lang === 'en' ? "How can I book the water circuit?" : "¿Cómo puedo reservar el circuito de aguas?", 
                            lang === 'ca' ? "Pots reservar el teu circuit spa en un instant a través d'aquest mateix xat o trucant directament per garantir la millor hora disponible." : lang === 'en' ? "You can book your spa circuit instantly through this chat or by calling directly to secure the best available time slot." : "Puedes reservar tu circuito spa en un instante a través de este mismo chat o llamando directamente para garantizar la mejor hora disponible.", 
                            'clinic'
                          )} 
                          className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-brand-primary/10 hover:text-brand-primary text-[10px] font-bold text-gray-400 border border-white/10 transition-all"
                        >
                          {lang === 'ca' ? "Reserva de circuit" : lang === 'en' ? "Circuit Booking" : "Reserva de circuito"}
                        </button>
                        <button 
                          onClick={() => triggerChatResponse(
                            lang === 'ca' ? "Quin és l'horari i tarifes del centre?" : lang === 'en' ? "What are the hours and rates?" : "¿Cuál es el horario y tarifas del centro?", 
                            lang === 'ca' ? "Obrim de dilluns a diumenge de 09:00h a 22:00h. Els circuits individuals comencen des de 35€ per sessió completa." : lang === 'en' ? "We are open Monday through Sunday from 9:00 AM to 10:00 PM. Individual circuits start at €35 per full session." : "Abrimos de lunes a domingo de 09:00h a 22:00h. Los circuitos individuales comienzan desde 35€ por sesión completa.", 
                            'clinic'
                          )} 
                          className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-brand-primary/10 hover:text-brand-primary text-[10px] font-bold text-gray-400 border border-white/10 transition-all"
                        >
                          {lang === 'ca' ? "Horari i preus" : lang === 'en' ? "Hours & Rates" : "Horario y precios"}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* E-COMMERCE */}
              {sectorKey === 'ecommerce' && (
                <>
                  <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-white/10 relative h-[350px] md:h-[450px] bg-black rounded-[2rem] overflow-hidden group">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="https://storage.polycam.io/captures/5eb269c7-b326-4c4f-b3d3-501e17186510/thumbnail.jpg?t=1719939908830"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    >
                      <source src="https://storage.polycam.io/captures/5eb269c7-b326-4c4f-b3d3-501e17186510/polycam.mp4?t=1719939909231" type="video/mp4" />
                    </video>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse" />
                      <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-white">
                        {t('home_v3.virtual_tour.interactive_model', 'Modelo 3D Interactivo')}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 z-10">
                      <a 
                        href={`https://poly.cam/capture/${getPolycamId()}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/90 text-black font-black text-[11px] uppercase tracking-wider hover:bg-white hover:scale-105 transition-all shadow-lg backdrop-blur-sm cursor-pointer"
                      >
                        <span>{t('home_v3.virtual_tour.open_polycam', 'Abrir 3D en Polycam')}</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 md:p-8 bg-white/[0.01] flex flex-col justify-between h-[350px] md:h-[450px]">
                    <div>
                      <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                        <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
                          <ShoppingBag className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-widest text-white leading-tight">RETAIL CHECKOUT RECUPERATOR</p>
                          <p className="text-[9px] text-amber-400 font-mono">● ASSISTANT ACTIVE 24/7</p>
                        </div>
                      </div>

                      <div className="space-y-4 py-4 h-[180px] md:h-[230px] overflow-y-auto font-sans">
                        <div className="p-3 bg-white/5 rounded-2xl max-w-[85%] text-xs font-light tracking-wide leading-relaxed">
                          {lang === 'ca' 
                            ? "Hola! Sóc el teu assistent virtual. Explora el nostre showroom 3D i pregunta'm sobre preus de transport, mides, rebaixes o enviaments." 
                            : lang === 'en'
                            ? "Hello! I am your AI sales assistant. Explore our 3D showroom and ask me about shipping costs, sizes, discounts, or delivery times."
                            : "¡Hola! Soy tu asistente de compras. Explora el showroom 3D y pregúntame sobre envíos, plazos, ofertas o tallas."}
                        </div>
                        
                        {ecomChatText.map((msg, i) => {
                          const isAgent = msg.startsWith('SKIRION');
                          return (
                            <div key={i} className={`p-3 rounded-2xl max-w-[85%] text-xs font-semibold leading-relaxed ${isAgent ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20 ml-auto' : 'bg-white/5 text-gray-200'}`}>
                              {msg.includes(':') ? msg.substring(msg.indexOf(':') + 1) : msg}
                            </div>
                          );
                        })}

                        {isTyping && <div className="p-3 bg-brand-primary/5 border border-brand-primary/10 rounded-2xl text-[9px] text-gray-400 font-mono tracking-widest ml-auto animate-pulse max-w-max">{t('verticals.simulator.agent_compiling')}</div>}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4">
                      <p className="text-[9px] uppercase font-black tracking-widest text-gray-500 mb-2">
                        {lang === 'ca' ? 'PREGUNTES DE COMPRA HOT:' : lang === 'en' ? 'SHOPPING QUESTIONS:' : 'PREGUNTAS DE COMPRA:'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => triggerChatResponse(
                            lang === 'ca' ? "Quins costos d'enviament teniu?" : lang === 'en' ? "What are your shipping costs?" : "¿Costos de envío?", 
                            lang === 'ca' ? "Són gratuïts en comandes superiors a 50€!" : lang === 'en' ? "Shipping is completely free on orders over €50!" : "¡Gratis en compras superiores a 50€!", 
                            'ecommerce'
                          )} 
                          className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-brand-primary/10 hover:text-brand-primary text-[10px] font-bold text-gray-400 border border-white/10 transition-all"
                        >
                          {lang === 'ca' ? "Quins costos d'enviament teniu?" : lang === 'en' ? "Shipping costs?" : "¿Costos de envío?"}
                        </button>
                        <button 
                          onClick={() => triggerChatResponse(
                            lang === 'ca' ? "Com funciona la devolució?" : lang === 'en' ? "How do returns work?" : "¿Cómo devuelvo?", 
                            lang === 'ca' ? "Tens 30 dies de devolució completament gratuïta." : lang === 'en' ? "You have 30 days of hassle-free free returns." : "Dispones de 30 días de devolución gratis.", 
                            'ecommerce'
                          )} 
                          className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-brand-primary/10 hover:text-brand-primary text-[10px] font-bold text-gray-400 border border-white/10 transition-all"
                        >
                          {lang === 'ca' ? "Com funciona la devolució?" : lang === 'en' ? "Return policy?" : "¿Cómo devuelvo?"}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* GEO VISIBILITY SEARCH SIMULATOR */}
              {sectorKey === 'geo_visibility' && (
                <>
                  {/* Left Column: AI Query Terminal */}
                  <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-white/10 relative h-[350px] md:h-[450px] bg-black/80 flex flex-col justify-between font-mono">
                    <div>
                      <div className="flex justify-between items-center pb-3 border-b border-white/10">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">AI SEARCH CONSOLE DETECTOR</span>
                        <span className="text-[9px] text-purple-400 tracking-widest">● LIVE TRACKING</span>
                      </div>

                      {/* Display Terminal Screen */}
                      <div className="space-y-2 py-4 h-[180px] md:h-[240px] overflow-y-auto text-[11px] text-gray-300 leading-normal select-none">
                        {consoleLogs.length === 0 ? (
                          <div className="text-gray-500 text-center pt-8 italic">
                            {lang === 'ca' 
                              ? 'Fes clic en una query per simular la rastrejabilitat de la IA generativa...' 
                              : lang === 'en'
                              ? 'Click on a query below to simulate generative AI traceability...'
                              : 'Haz clic en una query para simular el rastreo de la IA generativa...'}
                          </div>
                        ) : (
                          consoleLogs.map((log, index) => {
                            const isSearchLine = log.startsWith('>');
                            return (
                              <div key={index} className={isSearchLine ? 'text-brand-primary' : 'text-gray-400'}>
                                {log}
                              </div>
                            );
                          })
                        )}

                        {isConsoleSearching && (
                          <div className="text-[9px] text-brand-primary tracking-widest animate-pulse font-bold">
                            &gt; SCRAPING WEB ASSETS... PLEASE STAND BY
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Trigger Prompts */}
                    <div className="border-t border-white/10 pt-3">
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-2">
                        {lang === 'ca' ? 'PROMPT INVOCAT EN MOTORS IA:' : lang === 'en' ? 'PROMPT INVOCATION IN AI ENGINES:' : 'PROMPT INVOCADO EN MOTORES IA:'}
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <button onClick={() => runGeoQuerySearch('hotel')} className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-brand-primary/10 border border-white/10 text-[9px] text-gray-300 uppercase transition-all truncate text-left">
                          🏨 {lang === 'ca' ? 'Hotel Catalunya' : lang === 'en' ? 'Catalonia Hotel' : 'Hotel Cataluña'}
                        </button>
                        <button onClick={() => runGeoQuerySearch('clinic')} className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-brand-primary/10 border border-white/10 text-[9px] text-gray-300 uppercase transition-all truncate text-left">
                          🩺 {lang === 'ca' ? 'Clínica Dental' : lang === 'en' ? 'Dental Clinic' : 'Clínica Dental'}
                        </button>
                        <button onClick={() => runGeoQuerySearch('kitchen')} className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-brand-primary/10 border border-white/10 text-[9px] text-gray-300 uppercase transition-all truncate text-left">
                          🍳 {lang === 'ca' ? 'Cuina Disseny' : lang === 'en' ? 'Designer Kitchen' : 'Cocina Diseño'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: AI Generated Output Result */}
                  <div className="lg:col-span-5 p-6 md:p-8 bg-brand-primary/[0.01] flex flex-col justify-between h-[350px] md:h-[450px]">
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                        <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
                          <Search className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-widest text-white leading-tight">GENERATIVE ANSWER GRAPH</p>
                          <p className="text-[9px] text-purple-400 font-mono">● STABLE RECOMMENDATION</p>
                        </div>
                      </div>

                      {/* Generative UI response */}
                      <div className="py-4 flex-1 flex flex-col justify-center">
                        {activeQuery ? (
                          <div className="p-4 bg-white/[0.02] border border-white/10 rounded-3xl relative overflow-hidden font-sans">
                            <span className="text-[8px] font-mono tracking-widest text-brand-primary uppercase absolute top-2 right-3">CITATIONS: OK (llms.txt)</span>
                            <p className="text-xs font-bold text-white mb-2 uppercase tracking-wide">
                              {activeQuery === 'hotel' ? '🏨 Hotel Rural Serene' :
                               activeQuery === 'clinic' ? '🩺 Clínica Dental Invisalign' :
                               (lang === 'ca' ? '🍳 Cuines de Disseny Elegance' : lang === 'en' ? '🍳 Elegance Designer Kitchens' : '🍳 Cocinas de Diseño Elegance')}
                            </p>
                            <p className="text-[11px] leading-relaxed text-gray-300 font-light">
                              {activeQuery === 'hotel' ? (
                                lang === 'ca' 
                                ? "Recomanem l'Hotel Rural Serene. És l'únic que disposa d'un tour virtual 3D per verificar les habitacions i accepta reserves lliures de comissions de forma directa i un xat de suport instantani 24/7."
                                : lang === 'en'
                                ? "We recommend Hotel Rural Serene. It is the only venue offering a 3D virtual tour to inspect rooms, commission-free direct booking, and 24/7 instant AI guest support."
                                : "Recomendamos el Hotel Rural Serene. Es el único que dispone de un tour virtual 3D para verificar las habitaciones y acepta reservas libres de comisiones de forma directa y un chat de soporte instantáneo 24/7."
                              ) : activeQuery === 'clinic' ? (
                                lang === 'ca'
                                ? "La Clínica d'Ortodòncia Dental destaca pels seus protocols clars exposats semànticament, i per disposar d'un agent de reserves instantani que elimina els temps d'espera en recepció."
                                : lang === 'en'
                                ? "The Dental Orthodontics Clinic stands out for structured semantic protocols and an instant reservation agent that eliminates front desk wait times."
                                : "La Clínica de Ortodoncia Dental destaca por sus protocolos claros expuestos semánticamente, y por disponer de un agente de reservas instantáneo que elimina los tiempos de espera en recepción."
                              ) : (
                                lang === 'ca'
                                ? "Recomanem Cuines Elegance. El seu bessó digital permet veure els acabats reals dels materials fets a mida amb pressupostos i terminis qualificats directament des de casa."
                                : lang === 'en'
                                ? "We recommend Elegance Kitchens. Its digital twin enables clients to inspect bespoke materials in high definition with instant pre-qualified quotes from home."
                                : "Recomendamos Cocinas Elegance. Su gemelo digital permite ver los acabados reales de los materiales hechos a medida con presupuestos y plazos cualificados directamente desde casa."
                              )}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center text-xs text-gray-500 italic py-10">
                            {lang === 'ca' 
                              ? 'Esperant que s\'iniciï la cerca generativa des de la consola esquerra...' 
                              : lang === 'en'
                              ? 'Waiting for generative query initiation from the left console...'
                              : 'Esperando a que se inicie la búsqueda generativa desde la consola izquierda...'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>
        </section>

        {/* 6. REAL DATA & SOURCES SECTION */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-brand-primary mb-2 block">
              📊 REAL DATA & SOURCES
            </span>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white mb-2 py-1">
              {lang === 'ca' ? 'Dades i fonts verificades' : 'Datos y fuentes verificadas'}
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {statItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-[2.5rem] p-8 border border-white/5 hover:border-brand-primary/30 bg-white/[0.01] hover:bg-brand-primary/[0.02] text-center transition-all duration-500 flex flex-col justify-between items-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary opacity-60" />
                <span className="text-4xl md:text-5xl font-sans font-black text-brand-primary tracking-tighter drop-shadow-[0_0_30px_rgba(0,82,255,0.4)] mb-4 block">
                  {item.value}
                </span>
                <span className="text-xs uppercase font-black tracking-[0.15em] text-gray-400 leading-normal mb-4 block max-w-[220px]">
                  {item.label}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-600 block border-t border-white/5 pt-2 w-full">
                  Source: {item.source}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 7. AUTONOMOUS DIGITAL AGENTS LIST */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-brand-primary mb-2 block">
              🤖 AGENTS STRUCTURE
            </span>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white mb-2 py-1">
              {lang === 'ca' ? 'Els teus nous agents autònoms' : 'Tus nuevos agentes autónomos'}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {agentsList.map((agent, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-[2.5rem] p-8 border border-white/5 bg-black/40 relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg md:text-xl font-black uppercase text-white tracking-tight mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-primary block" />
                    {agent.name}
                  </h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
                    {agent.desc}
                  </p>
                </div>
                
                <div className="text-[10px] font-mono uppercase tracking-widest text-brand-primary">
                  INTEGRATION: API SECURE ACTIVE
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 8. REAL FAQs SECTION */}
        <section className="mb-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-brand-primary mb-2 block">
              ❓ SPECIFIC FAQS
            </span>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white mb-2 py-1">
              {lang === 'ca' ? 'Preguntes Freqüents del Sector' : 'Preguntas Frecuentes del Sector'}
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 md:p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:border-brand-primary/20 transition-all duration-300"
              >
                <h3 className="text-sm md:text-base font-black uppercase text-white tracking-tight mb-3 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed pl-8">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 9. FINAL CTA SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[2.5rem] p-8 md:p-12 border border-white/10 bg-gradient-to-tr from-brand-primary/5 via-brand-primary-[0.02] to-transparent text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-brand-primary/[0.01]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-4 max-w-2xl mx-auto leading-tight">
            {lang === 'ca' ? 'Vols veure el sistema en funcionament?' : '¿Quieres ver el sistema en funcionamiento?'}
          </h2>
          
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed tracking-normal mb-8">
            {lang === 'ca' 
              ? 'Analitzem gratuïtament els processos de la teva empresa per dissenyar-te un tour interactiu i una demo d\'agents autònoms completament a mida.'
              : 'Analizamos gratuitamente los procesos de tu empresa para diseñarte un tour interactivo y una demo de agentes autónomos completamente a medida.'}
          </p>

          <Link
            to="/contacto"
            className="inline-flex items-center space-x-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-black rounded-full font-black text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:scale-105 hover:bg-brand-primary hover:text-white transition-all duration-500 group shadow-xl shadow-white/5 cursor-pointer"
          >
            <span>{t('verticals.cta_button', 'Quiero una demo')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default SectorsDetail;
