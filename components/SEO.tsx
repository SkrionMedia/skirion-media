import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
  image?: string;
  type?: string;
  schema?: Record<string, any> | Array<Record<string, any>>;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  path = '',
  image = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
  type = 'website',
  schema
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'es';

  useEffect(() => {
    // 1. Update HTML lang attribute
    document.documentElement.lang = lang;

    // 2. Page Title
    const siteName = 'SKIRION.MEDIA';
    const defaultTaglines: Record<string, string> = {
      es: 'Servicio de Agencia Digital, Agentes Digitales y Servicios de Automatización',
      ca: "Enginyeria de l'Atenció, Agents Digitals i Serveis d'Automatització",
      en: 'AI Digital Agency, AI Agents & Automation Services'
    };
    const tagline = defaultTaglines[lang] || defaultTaglines.es;
    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | ${tagline}`;
    document.title = fullTitle;

    // Helper function to set or create meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Primary Meta Tags
    const defaultDescriptions: Record<string, string> = {
      es: "SKIRION es una agencia digital especializada en agentes digitales autónomos 24/7, servicios de automatización de procesos y CRM, diseño web de alta conversión y optimización GEO para empresas.",
      ca: "A SKIRION activem sistemes d'Intel·ligència Artificial, webs d'alta conversió, agents digitals de veu/text i serveis d'automatització que generen beneficis des del primer dia.",
      en: "SKIRION is a digital agency specialized in 24/7 autonomous AI agents, business automation services, high-conversion web development, and GEO search optimization."
    };
    const metaDesc = description || defaultDescriptions[lang] || defaultDescriptions.es;
    setMetaTag('name', 'description', metaDesc);
    setMetaTag('name', 'title', fullTitle);

    const defaultKeywords: Record<string, string> = {
      es: "servicio de agencia digital, agentes digitales, servicios automatización, agencia digital IA, automatización procesos, agentes virtuales, optimización GEO, generative engine optimization, webs alta conversión, digitalización 3D Matterport, SKIRION",
      ca: "servei d'agència digital, agents digitals, serveis d'automatització, agència digital IA, automatització comercial, optimització GEO, generative engine optimization, webs alta conversió, digitalització 3D, SKIRION",
      en: "digital agency service, AI agents, automation services, generative engine optimization, GEO, conversational AI, Matterport 3D, high conversion web design, SKIRION"
    };
    const metaKeywords = keywords ? `${keywords}, ${defaultKeywords[lang] || defaultKeywords.es}` : (defaultKeywords[lang] || defaultKeywords.es);
    setMetaTag('name', 'keywords', metaKeywords);

    // 4. Canonical Link
    const fullUrl = `https://skirionmedia.com${path.startsWith('/') ? path : `/${path}`}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // 5. Open Graph / Social Tags
    const localeMap: Record<string, string> = {
      es: 'es_ES',
      ca: 'ca_ES',
      en: 'en_US'
    };
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', metaDesc);
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:locale', localeMap[lang] || 'es_ES');
    setMetaTag('property', 'og:site_name', 'SKIRION Media Group');

    // 6. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', metaDesc);
    setMetaTag('name', 'twitter:image', image);

    // 7. Structured Data (JSON-LD)
    if (schema) {
      const scriptId = 'dynamic-jsonld-schema';
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schema);
    }

  }, [title, description, keywords, path, image, type, schema, lang]);

  return null;
};

export default SEO;

