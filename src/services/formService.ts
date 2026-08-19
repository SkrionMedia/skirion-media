
/**
 * Service to handle form submissions to Formspree and automated Webhooks (Make/Zapier/WhatsApp)
 */
export const submitToFormspree = async (data: Record<string, any> | FormData) => {
  let formspreeId = import.meta.env.VITE_FORMSPREE_ID;
  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
  
  // Use the provided ID as default if env is not set or placeholder
  if (!formspreeId || formspreeId === 'your_formspree_id_here' || formspreeId === '') {
    formspreeId = 'mvzdlook';
  }

  // Si l'usuari ha posat la URL sencera, n'extraiem només el codi final
  if (formspreeId.includes('formspree.io/f/')) {
    formspreeId = formspreeId.split('/').pop();
  }

  let body: any;
  let headers: Record<string, string> = {
    'Accept': 'application/json'
  };

  if (data instanceof FormData) {
    if (!data.has('_subject')) {
      data.append('_subject', 'CV');
    }
    if (!data.has('_timestamp')) {
      data.append('_timestamp', new Date().toISOString());
    }
    if (!data.has('_source_url')) {
      data.append('_source_url', window.location.href);
    }
    body = data;
  } else {
    headers['Content-Type'] = 'application/json';
    const payload = {
      _subject: data._subject || 'Nou contacte des de la web Skirion',
      _replyto: data.email, // Formspree autoresponder uses _replyto
      ...data,
      _timestamp: new Date().toISOString(),
      _source_url: window.location.href
    };
    body = JSON.stringify(payload);
  }

  const promises: Promise<any>[] = [
    fetch(`https://formspree.io/f/${formspreeId}`, {
      method: 'POST',
      headers,
      body
    })
  ];

  // Optional Make.com / Zapier / WhatsApp Webhook dispatch
  if (webhookUrl && webhookUrl.trim() !== '') {
    // If FormData, convert key-values for json webhook payload if possible
    let webhookPayload: any = body;
    if (data instanceof FormData) {
      const obj: Record<string, any> = {};
      data.forEach((value, key) => {
        if (value instanceof File) {
          obj[key] = `[File: ${value.name} (${(value.size / 1024).toFixed(1)} KB)]`;
        } else {
          obj[key] = value;
        }
      });
      webhookPayload = JSON.stringify(obj);
    }

    promises.push(
      fetch(webhookUrl.trim(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: typeof webhookPayload === 'string' ? webhookPayload : JSON.stringify(webhookPayload)
      }).catch(err => console.warn('Webhook trigger error:', err))
    );
  }

  try {
    const [response] = await Promise.all(promises);

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error en el envío del formulario.');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
};

