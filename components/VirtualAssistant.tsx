import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, MessageSquare, Send, Loader2, User, Bot, Sparkles, 
  Volume2, VolumeX, Mic, MicOff, ArrowRight, RotateCcw,
  CheckCircle2, HelpCircle, Calendar, FileText, Layers
} from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: string;
  }>;
}

export const VirtualAssistant: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const recognitionRef = useRef<any>(null);

  // Quick suggestions based on active language
  const getSuggestions = () => {
    const lang = i18n.language;
    if (lang === 'es') {
      return [
        { label: "🚀 ¿Qué hacéis en SKIRION?", text: "¿Qué servicios y sistemas ofrecéis exactamente en SKIRION?" },
        { label: "🤖 Agentes de voz y texto", text: "¿Cómo funciona un agente digital de voz y texto 24/7?" },
        { label: "🌐 Visibilidad GEO / IA", text: "¿Qué es la visibilidad GEO y optimización para ChatGPT y Claude?" },
        { label: "💎 Planes y Activación", text: "¿Cuáles son los niveles de activación y membresías disponibles?" },
        { label: "📅 Reservar plaza", text: "Quiero reservar mi plaza para un diagnóstico con vuestro equipo." }
      ];
    }
    if (lang === 'en') {
      return [
        { label: "🚀 What is SKIRION?", text: "What services and systems does SKIRION provide?" },
        { label: "🤖 Digital Voice Agents", text: "How do 24/7 autonomous voice and text agents work?" },
        { label: "🌐 GEO AI Visibility", text: "What is GEO optimization for ChatGPT, Claude, and Perplexity?" },
        { label: "💎 Plans & Activation", text: "What are the activation levels and memberships?" },
        { label: "📅 Reserve Spot", text: "I would like to reserve a spot for a diagnostic review." }
      ];
    }
    // Catalan default
    return [
      { label: "🚀 Què feu a SKIRION?", text: "Quins serveis i sistemes oferiu exactament a SKIRION?" },
      { label: "🤖 Agents de veu i text", text: "Com funciona un agent digital de veu i text 24/7?" },
      { label: "🌐 Visibilitat GEO / IA", text: "Què és la visibilitat GEO i l'optimització per a ChatGPT i Claude?" },
      { label: "💎 Plans i Activació", text: "Quins són els nivells d'activació i membresies disponibles?" },
      { label: "📅 Reservar plaça", text: "Vull reservar la meva plaça per a un diagnòstic amb el vostre equip." }
    ];
  };

  // Smart local fallback responses when API is unreachable or offline
  const getSmartFallbackResponse = (query: string): { text: string; actions?: Array<{ label: string; action: string }> } => {
    const q = query.toLowerCase();
    const lang = i18n.language;

    // Spot reservation / Contact
    if (q.includes('reserva') || q.includes('plaça') || q.includes('plaza') || q.includes('spot') || q.includes('contact') || q.includes('cita') || q.includes('trucar')) {
      if (lang === 'es') {
        return {
          text: "¡Excelente decisión! En SKIRION seleccionamos empresas para una activación progresiva y personalizada. Te recomendamos reservar tu plaza ahora para asegurar que nuestro equipo de ingeniería evalúe tu caso sin coste.",
          actions: [
            { label: "📅 Reservar mi Plaza", action: "/contacto" },
            { label: "💬 Contactar por WhatsApp", action: "https://wa.me/34644869615" }
          ]
        };
      }
      if (lang === 'en') {
        return {
          text: "Great choice! At SKIRION, we onboard companies in progressive cohorts to ensure tailored engineering attention. We invite you to reserve your spot so our team can assess your workflow.",
          actions: [
            { label: "📅 Reserve Spot", action: "/contacto" },
            { label: "💬 Chat on WhatsApp", action: "https://wa.me/34644869615" }
          ]
        };
      }
      return {
        text: "Molt bona decisió! A SKIRION seleccionem empreses per a una activació progressiva i acompanyament dedicat. Et convidem a reservar la teva plaça perquè el nostre equip d'enginyeria auditi el teu cas sense compromís.",
        actions: [
          { label: "📅 Reservar la meva Plaça", action: "/contacto" },
          { label: "💬 Parlar per WhatsApp", action: "https://wa.me/34644869615" }
        ]
      };
    }

    // Voice & Digital Agents
    if (q.includes('agent') || q.includes('veu') || q.includes('voz') || q.includes('voice') || q.includes('bot') || q.includes('telefon') || q.includes('trucada')) {
      if (lang === 'es') {
        return {
          text: "Nuestros agentes digitales autónomos de voz y texto operan 24/7 con IA de última generación: responden llamadas y mensajes en menos de 5 segundos, filtran clientes potenciales, agendan citas en tu calendario y actualizan tu CRM automáticamente.",
          actions: [
            { label: "🤖 Ver Agentes Digitales", action: "/agentes-digitales" },
            { label: "🏨 Ver caso Hoteles / Clínicas", action: "/sectors/hotels" }
          ]
        };
      }
      if (lang === 'en') {
        return {
          text: "Our autonomous 24/7 voice and text agents respond in under 5 seconds, qualify inbound leads, schedule calendar appointments, and synchronize data with your CRM in real time.",
          actions: [
            { label: "🤖 Explore Digital Agents", action: "/agentes-digitales" },
            { label: "🏨 View Sector Demos", action: "/sectors/hotels" }
          ]
        };
      }
      return {
        text: "Els nostres agents digitals autònoms de veu i text funcionen 24/7: atenen trucades i missatges en menys de 5 segons, qualifiquen compradors o pacients, agenden cites al teu calendari i sincronitzen el teu CRM automàticament.",
        actions: [
          { label: "🤖 Veure Agents Digitals", action: "/agentes-digitales" },
          { label: "🏨 Explorar Demos per Sectors", action: "/sectors/hotels" }
        ]
      };
    }

    // GEO / AI Search Visibility
    if (q.includes('geo') || q.includes('chatgpt') || q.includes('claude') || q.includes('perplexity') || q.includes('llm') || q.includes('cerca') || q.includes('busqueda')) {
      if (lang === 'es') {
        return {
          text: "La optimización GEO (Generative Engine Optimization) adapta la arquitectura semántica de tu web, datos estructurados Schema y archivos llms.txt para que las IAs como ChatGPT, Perplexity y Claude recomienden tu empresa cuando los usuarios busquen soluciones en tu sector.",
          actions: [
            { label: "🌐 Conocer Servicio GEO", action: "/servicios" },
            { label: "📊 Auditoría de Fugas", action: "/checklist" }
          ]
        };
      }
      if (lang === 'en') {
        return {
          text: "GEO (Generative Engine Optimization) structures your website semantics and Schema metadata so generative engines like ChatGPT, Claude, and Perplexity recommend your business as the leading authority.",
          actions: [
            { label: "🌐 GEO Services", action: "/servicios" },
            { label: "📊 Leak Audit", action: "/checklist" }
          ]
        };
      }
      return {
        text: "L'optimització GEO (Generative Engine Optimization) adapta la semàntica del teu web, dades estructurades Schema i fitxers llms.txt perquè models com ChatGPT, Claude i Perplexity et citin com a referent quan usuaris busquin serveis del teu sector.",
        actions: [
          { label: "🌐 Conèixer Servei GEO", action: "/servicios" },
          { label: "📊 Fer Auditoria de Fuites", action: "/checklist" }
        ]
      };
    }

    // Plans & Pricing
    if (q.includes('preu') || q.includes('precio') || q.includes('price') || q.includes('pla') || q.includes('plan') || q.includes('cost') || q.includes('membresia') || q.includes('activacio')) {
      if (lang === 'es') {
        return {
          text: "Trabajamos con 3 niveles de Activación del Sistema (Nivel Básico, Nivel Pro y Nivel Premium) acompañados de Membresías Activas (Pro, Premium, Gold) para asegurar que el sistema se sincronice y evolucione con tu facturación.",
          actions: [
            { label: "💎 Ver Planes y Activación", action: "/planes" },
            { label: "📅 Solicitar Presupuesto", action: "/contacto" }
          ]
        };
      }
      if (lang === 'en') {
        return {
          text: "We offer 3 System Activation tiers (Basic, Pro, Premium) coupled with Active Memberships (Pro, Premium, Gold) to ensure long-term ROI and constant evolution.",
          actions: [
            { label: "💎 View Plans & Activation", action: "/planes" },
            { label: "📅 Request Proposal", action: "/contacto" }
          ]
        };
      }
      return {
        text: "Treballem amb 3 nivells d'Activació del Sistema (Nivell Bàsic, Nivell Pro i Nivell Premium) combinats amb Membresies Actives (Pro, Premium, Gold) per assegurar que el sistema evolucioni i aporti rendibilitat des del primer mes.",
        actions: [
          { label: "💎 Veure Plans i Activació", action: "/planes" },
          { label: "📅 Demanar Proposta", action: "/contacto" }
        ]
      };
    }

    // 3D / Matterport / Spaces
    if (q.includes('3d') || q.includes('matterport') || q.includes('tour') || q.includes('espai') || q.includes('espacio') || q.includes('virtual') || q.includes('bessó') || q.includes('gemelo')) {
      if (lang === 'es') {
        return {
          text: "Creamos producciones 3D inmersivas y gemelos digitales con tecnología LiDAR/Matterport para hoteles, clínicas, inmobiliarias y showrooms, integrando puntos interactivos de reserva y agentes de atención.",
          actions: [
            { label: "🏢 Ver Producciones 3D", action: "/servicios" },
            { label: "🏨 Ver Demo Hotel 3D", action: "/sectors/hotels" }
          ]
        };
      }
      if (lang === 'en') {
        return {
          text: "We produce immersive 3D virtual tours and digital twins with LiDAR/Matterport tech for hotels, clinics, and real estate, embedded with live booking points and AI agents.",
          actions: [
            { label: "🏢 Explore 3D Services", action: "/servicios" },
            { label: "🏨 View 3D Hotel Demo", action: "/sectors/hotels" }
          ]
        };
      }
      return {
        text: "Creem produccions 3D immersives i bessons digitals amb tecnologia LiDAR/Matterport per a hotels, clíniques, immobiliàries i instal·lacions, integrant punts interactius de reserva i agents intel·ligents.",
        actions: [
          { label: "🏢 Veure Produccions 3D", action: "/servicios" },
          { label: "🏨 Veure Demo Hotel 3D", action: "/sectors/hotels" }
        ]
      };
    }

    // Default overview response
    if (lang === 'es') {
      return {
        text: "En SKIRION diseñamos la infraestructura integral de Inteligencia Artificial que tu empresa necesita: agentes de voz y texto 24/7, webs de alta conversión, visibilidad GEO en ChatGPT/Perplexity, producciones 3D y automatizaciones de CRM. ¿Te gustaría que analicemos tu caso?",
        actions: [
          { label: "📅 Reservar plaza de análisis", action: "/contacto" },
          { label: "📊 Hacer checklist de fugas", action: "/checklist" }
        ]
      };
    }
    if (lang === 'en') {
      return {
        text: "At SKIRION, we engineer AI systems for businesses: 24/7 voice/text agents, high-conversion websites, GEO search visibility in ChatGPT/Claude, 3D digital twins, and CRM workflows. Would you like a personalized evaluation?",
        actions: [
          { label: "📅 Reserve Diagnostic Spot", action: "/contacto" },
          { label: "📊 Take Conversion Audit", action: "/checklist" }
        ]
      };
    }
    return {
      text: "A SKIRION dissenyem la infraestructura d'Intel·ligència Artificial que el teu negoci necessita: agents de veu i text 24/7, webs d'alta conversió, visibilitat GEO a ChatGPT/Perplexity, produccions 3D i automatitzacions de CRM. T'agradaria analitzar el teu cas?",
      actions: [
        { label: "📅 Reservar plaça d'anàlisi", action: "/contacto" },
        { label: "📊 Fer checklist de fuites", action: "/checklist" }
      ]
    };
  };

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = i18n.language === 'ca' ? 'ca-ES' : i18n.language === 'es' ? 'es-ES' : 'en-US';

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setTimeout(() => handleVoiceSend(transcript), 400);
      };
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };
      recognitionRef.current = recognition;
    }
  }, [i18n.language]);

  // Initialize Audio Context for Neural TTS
  useEffect(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx({ sampleRate: 24000 });
      }
    } catch (e) {
      console.warn("AudioContext not supported");
    }
    return () => {
      audioContextRef.current?.close().catch(() => {});
    };
  }, []);

  const playPCM = async (base64Data: string) => {
    if (!audioContextRef.current || isMuted) return;

    try {
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Int16Array(len / 2);
      for (let i = 0; i < len; i += 2) {
        bytes[i / 2] = binaryString.charCodeAt(i) | (binaryString.charCodeAt(i + 1) << 8);
      }

      const float32Data = new Float32Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) {
        float32Data[i] = bytes[i] / 32768.0;
      }

      const audioBuffer = audioContextRef.current.createBuffer(1, float32Data.length, 24000);
      audioBuffer.getChannelData(0).set(float32Data);

      const source = audioContextRef.current.createBufferSource();
      currentSourceRef.current = source;
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      
      setIsSpeaking(true);
      source.onended = () => {
        if (currentSourceRef.current === source) {
          currentSourceRef.current = null;
          processAudioQueue();
        }
      };
      source.start();
    } catch (e) {
      console.error("Audio playback error:", e);
      setIsSpeaking(false);
      processAudioQueue();
    }
  };

  const processAudioQueue = async () => {
    if (audioQueueRef.current.length === 0) {
      isPlayingRef.current = false;
      setIsSpeaking(false);
      return;
    }

    isPlayingRef.current = true;
    const nextAudio = audioQueueRef.current.shift();
    if (nextAudio) {
      await playPCM(nextAudio);
    }
  };

  const speak = async (text: string, cancelPrevious = false) => {
    if (isMuted) return;
    
    if (cancelPrevious) {
      if (currentSourceRef.current) {
        try { currentSourceRef.current.stop(); } catch (e) {}
        currentSourceRef.current = null;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      audioQueueRef.current = [];
      isPlayingRef.current = false;
      setIsSpeaking(false);
    }

    const cleanText = text
      .replace(/[*_#`~]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();

    if (!cleanText) return;

    // Try Gemini TTS if key is present
    const apiKey = process.env.GEMINI_API_KEY || '';
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const voiceName = i18n.language === 'en' ? 'Zephyr' : 'Kore';
        
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [{ parts: [{ text: cleanText }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName },
              },
            },
          },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          audioQueueRef.current.push(base64Audio);
          if (!isPlayingRef.current) {
            processAudioQueue();
          }
          return;
        }
      } catch (error) {
        console.warn("Neural TTS unavailable, falling back to Web Speech API");
      }
    }

    // Fallback: Browser Web Speech API
    if ('speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = i18n.language === 'ca' ? 'ca-ES' : i18n.language === 'es' ? 'es-ES' : 'en-US';
        utterance.rate = 1.05;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn("Web Speech API error", e);
      }
    }
  };

  // Initial message reset on language change
  useEffect(() => {
    const initialText = t('chatbot.initial_message', "“La majoria d'empreses perd una gran quantitat de temps i diners en tasques que podrien automatitzar-se.” Hola! Sóc l'assistent oficial de SKIRION. Com puc ajudar-te avui?");
    setMessages([{
      id: '1',
      text: initialText,
      sender: 'bot',
      timestamp: new Date(),
      actions: [
        { label: "🚀 Què feu?", action: "Quins serveis oferiu a SKIRION?" },
        { label: "🤖 Agents 24/7", action: "Com funcionen els agents digitals?" },
        { label: "📅 Reservar plaça", action: "/contacto" }
      ]
    }]);
  }, [t, i18n.language]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const toggleRecording = () => {
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume().catch(() => {});
    }
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.warn("Speech recognition already active or unavailable", e);
      }
    }
  };

  const handleVoiceSend = (text: string) => {
    if (!text.trim() || isProcessing) return;
    sendMessage(text, true);
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume().catch(() => {});
    }
    if (!input.trim() || isProcessing) return;
    const text = input.trim();
    setInput('');
    sendMessage(text, false);
  };

  const handleActionClick = (action: string) => {
    if (action.startsWith('http')) {
      window.open(action, '_blank');
    } else if (action.startsWith('/')) {
      setIsOpen(false);
      navigate(action);
    } else {
      // It's a text prompt query
      sendMessage(action, false);
    }
  };

  const resetChat = () => {
    if (currentSourceRef.current) {
      try { currentSourceRef.current.stop(); } catch (e) {}
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    const initialText = t('chatbot.initial_message', "Hola! Sóc l'assistent oficial de SKIRION. Com puc ajudar-te avui?");
    setMessages([{
      id: Date.now().toString(),
      text: initialText,
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  const sendMessage = async (text: string, isVoice: boolean = false) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    // Stop current speech
    if (currentSourceRef.current) {
      try { currentSourceRef.current.stop(); } catch (e) {}
      currentSourceRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    audioQueueRef.current = [];
    isPlayingRef.current = false;
    setIsSpeaking(false);

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        
        const stream = await ai.models.generateContentStream({
          model: "gemini-2.5-flash",
          contents: [{ role: 'user', parts: [{ text }] }],
          config: {
            systemInstruction: t('chatbot.system_instruction')
          }
        });
        
        let fullText = '';
        let spokenText = '';
        const botMessageId = (Date.now() + 1).toString();

        setMessages(prev => [...prev, {
          id: botMessageId,
          text: '',
          sender: 'bot',
          timestamp: new Date()
        }]);

        for await (const chunk of stream) {
          const chunkText = chunk.text || '';
          fullText += chunkText;
          
          setMessages(prev => prev.map(msg => 
            msg.id === botMessageId ? { ...msg, text: fullText } : msg
          ));

          if (isVoice) {
            const sentences = fullText.substring(spokenText.length).match(/[^.!?]+[.!?]+/g);
            if (sentences) {
              for (const sentence of sentences) {
                speak(sentence);
                spokenText += sentence;
              }
            }
          }
        }

        if (isVoice && spokenText.length < fullText.length) {
          speak(fullText.substring(spokenText.length));
        }

        setIsProcessing(false);
        return;
      } catch (error) {
        console.warn("Gemini streaming error, using smart local fallback engine:", error);
      }
    }

    // Instant smart fallback engine
    setTimeout(() => {
      const fallback = getSmartFallbackResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallback.text,
        sender: 'bot',
        timestamp: new Date(),
        actions: fallback.actions
      };
      setMessages(prev => [...prev, botMessage]);
      setIsProcessing(false);
      if (isVoice || !isMuted) {
        speak(fallback.text);
      }
    }, 350);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        id="skirion-assistant-btn"
        aria-label="Obrir assistent virtual SKIRION"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => {
          if (audioContextRef.current?.state === 'suspended') {
            audioContextRef.current.resume().catch(() => {});
          }
          setIsOpen(!isOpen);
        }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[80] w-14 h-14 md:w-16 md:h-16 bg-brand-primary text-black rounded-full shadow-2xl flex items-center justify-center border-2 border-white/20 hover:shadow-brand-primary/40 transition-all cursor-pointer group"
      >
        <div className="relative">
          {isOpen ? <X size={24} className="md:w-7 md:h-7" /> : <MessageSquare size={24} className="md:w-7 md:h-7" />}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-black animate-pulse" />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 md:bottom-28 md:right-8 z-[90] w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[78vh] bg-[#0c0d12]/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/15 flex flex-col overflow-hidden text-white"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-primary/10 border border-brand-primary/30 rounded-xl flex items-center justify-center text-brand-primary">
                  <Sparkles size={18} className="animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                    {t('chatbot.assistant_name', 'SKIRION IA')}
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                    {t('chatbot.role', 'Consultor Estratègic')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button 
                  onClick={resetChat}
                  title="Reiniciar conversa"
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  <RotateCcw size={16} />
                </button>
                <button 
                  onClick={() => {
                    const next = !isMuted;
                    setIsMuted(next);
                    if (next) {
                      if (currentSourceRef.current) {
                        try { currentSourceRef.current.stop(); } catch (e) {}
                      }
                      if ('speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                      }
                      audioQueueRef.current = [];
                      isPlayingRef.current = false;
                      setIsSpeaking(false);
                    }
                  }}
                  title={isMuted ? "Activar veu" : "Silenciar veu"}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-brand-primary" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  title="Tancar"
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2.5 max-w-[88%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black ${
                      msg.sender === 'user' ? 'bg-brand-primary text-black' : 'bg-white/10 text-brand-primary border border-brand-primary/30'
                    }`}>
                      {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>

                    <div className="space-y-2">
                      <div className={`p-3.5 sm:p-4 rounded-2xl leading-relaxed whitespace-pre-line ${
                        msg.sender === 'user' 
                          ? 'bg-brand-primary text-black font-semibold rounded-tr-none' 
                          : 'bg-white/[0.06] text-gray-200 border border-white/10 rounded-tl-none font-light'
                      }`}>
                        {msg.text}
                      </div>

                      {/* Interactive Action Buttons attached to Bot Message */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {msg.actions.map((act, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleActionClick(act.action)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-primary/15 border border-brand-primary/40 text-brand-primary hover:bg-brand-primary hover:text-black font-bold text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm"
                            >
                              <span>{act.label}</span>
                              <ArrowRight size={12} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isProcessing && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-brand-primary flex items-center justify-center">
                      <Bot size={14} />
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 rounded-tl-none flex items-center gap-2 text-gray-400 text-xs">
                      <Loader2 size={14} className="animate-spin text-brand-primary" />
                      <span>Analitzant resposta...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 py-2 bg-black/40 border-t border-white/5 overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-none">
              {getSuggestions().map((sugg, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(sugg.text, false)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-primary/40 text-[10px] text-gray-300 hover:text-white font-medium transition-all flex-shrink-0 cursor-pointer"
                >
                  {sugg.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form 
              onSubmit={handleSend}
              className="p-3 sm:p-4 bg-white/[0.02] border-t border-white/10 flex items-center gap-2"
            >
              <button 
                type="button"
                onClick={toggleRecording}
                title={isRecording ? t('chatbot.stop_recording', 'Detener grabación') : t('chatbot.start_mic', 'Hablar por micrófono')}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
                  isRecording 
                    ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30' 
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-brand-primary hover:bg-white/10'
                }`}
              >
                {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
              </button>

              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isRecording ? t('chatbot.recording', 'Escoltant...') : t('chatbot.placeholder', 'Pregunta el que vulguis...')}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-primary transition-all font-light"
              />

              <button 
                type="submit"
                disabled={!input.trim() || isProcessing}
                className="w-10 h-10 bg-brand-primary text-black rounded-xl flex items-center justify-center disabled:opacity-40 hover:scale-105 transition-all cursor-pointer flex-shrink-0 font-bold"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VirtualAssistant;
