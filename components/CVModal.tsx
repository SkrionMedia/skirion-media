import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Briefcase, Upload, FileText, CheckCircle2, Loader2, Send } from 'lucide-react';
import { submitToFormspree } from '../src/services/formService';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        setErrorMsg(t('cv_modal.error_too_large', 'El archivo es demasiado grande. El límite es 10MB.'));
        return;
      }
      setErrorMsg('');
      setFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        setErrorMsg(t('cv_modal.error_too_large', 'El archivo es demasiado grande. El límite es 10MB.'));
        return;
      }
      setErrorMsg('');
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg(t('cv_modal.error_required', 'Por favor rellena tu nombre y correo electrónico.'));
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const fd = new FormData();
      fd.append('_subject', `CV - ${formData.name}`);
      fd.append('_replyto', formData.email);
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      fd.append('phone', formData.phone || 'No especificado');
      fd.append('message', formData.message || 'Sin mensaje adicional');
      
      if (file) {
        fd.append('attachment', file);
      }

      await submitToFormspree(fd);
      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(t('cv_modal.error_generic', 'Ocurrió un error al enviar el formulario. También puedes enviar tu CV directamente a info@skirionmedia.com'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setFile(null);
    setIsSuccess(false);
    setErrorMsg('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl p-6 sm:p-8 md:p-10 rounded-3xl bg-neutral-900 border border-white/10 shadow-2xl text-white my-auto overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer z-10"
            aria-label={t('common.close', 'Cerrar')}
          >
            <X size={20} />
          </button>

          {isSuccess ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center mx-auto border border-green-500/30">
                <CheckCircle2 size={36} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                  {t('cv_modal.success_title', '¡CV Recibido con Éxito!')}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto">
                  {t('cv_modal.success_desc', 'Hemos enviado tu candidatura con el asunto CV directamente a nuestro equipo.')}
                </p>
                <p className="text-gray-400 text-xs pt-2">
                  {t('cv_modal.success_note', 'Si tu perfil encaja con las vacantes actuales o futuras, nos pondremos en contacto contigo lo antes posible.')}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="px-8 py-3.5 bg-brand-primary text-black font-black text-xs uppercase tracking-widest rounded-full hover:bg-white transition-all cursor-pointer"
              >
                {t('common.close', 'Cerrar')}
              </button>
            </div>
          ) : (
            <div className="space-y-6 text-center sm:text-left">
              <div className="space-y-2">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-brand-primary text-xs font-mono font-bold uppercase tracking-widest">
                  <Briefcase size={16} />
                  <span>{t('footer.careers.badge', 'Únete a nuestro equipo')}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                  {t('footer.careers.button', 'DÉJANOS TU CV')}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {t('cv_modal.instructions', 'Adjunta tu currículum en PDF o Word. Se enviará directamente a nuestro correo info@skirionmedia.com con el asunto CV.')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                      {t('cv_modal.name_label', 'Nombre completo *')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('cv_modal.name_placeholder', 'Tu nombre y apellidos')}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary/50 placeholder:text-gray-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                      {t('cv_modal.email_label', 'Correo electrónico *')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tuemail@ejemplo.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary/50 placeholder:text-gray-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                    {t('cv_modal.phone_label', 'Teléfono (opcional)')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+34 600 000 000"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary/50 placeholder:text-gray-600 transition-colors"
                  />
                </div>

                {/* File Upload Box */}
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                    {t('cv_modal.file_label', 'Archivo de CV (PDF, DOC, DOCX)')}
                  </label>
                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={handleDrop}
                    className="relative border-2 border-dashed border-white/15 hover:border-brand-primary/50 rounded-2xl p-4 sm:p-6 text-center bg-white/[0.02] hover:bg-white/[0.04] transition-all group cursor-pointer"
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    />
                    {file ? (
                      <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-brand-primary/30 text-left">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText size={24} className="text-brand-primary shrink-0" />
                          <div className="truncate">
                            <p className="text-xs font-bold text-white truncate">{file.name}</p>
                            <p className="text-[10px] text-gray-400 font-mono">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            setFile(null);
                          }}
                          className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 z-20"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2 pointer-events-none">
                        <Upload size={28} className="mx-auto text-brand-primary group-hover:scale-110 transition-transform" />
                        <p className="text-xs font-semibold text-gray-300">
                          {t('cv_modal.upload_hint', 'Haz clic para seleccionar tu CV o arrastra el archivo aquí')}
                        </p>
                        <p className="text-[10px] text-gray-500 font-mono">
                          {t('cv_modal.upload_formats', 'Formatos aceptados: PDF, Word (Máx 10MB)')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                    {t('cv_modal.message_label', 'Mensaje o nota breve (opcional)')}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('cv_modal.message_placeholder', 'Cuéntanos brevemente sobre ti...')}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary/50 placeholder:text-gray-600 transition-colors resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brand-primary text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>{t('cv_modal.sending', 'Enviando CV...')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('cv_modal.send_button', 'Enviar CV')}</span>
                      <Send size={16} />
                    </>
                  )}
                </button>

                <div className="text-center pt-1">
                  <p className="text-[10px] text-gray-500">
                    {t('cv_modal.direct_email_hint', 'O si prefieres enviar directamente desde tu email:')}{' '}
                    <a
                      href="mailto:info@skirionmedia.com?subject=CV"
                      className="text-brand-primary hover:underline font-mono"
                    >
                      info@skirionmedia.com
                    </a>
                  </p>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CVModal;
