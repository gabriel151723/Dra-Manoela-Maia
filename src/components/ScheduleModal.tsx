import React, { useState } from 'react';
import { X, Sparkles, Shield, MessageCircle } from 'lucide-react';
import { PROCEDURES_DATA, Procedure } from '../data/procedures';
import { buildWhatsAppUrl, trackEvent, DOCTOR_NAME } from '../utils/analytics';
import { DoctorPhoto } from './DoctorPhoto';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProcedure?: Procedure | null;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  initialProcedure = null
}) => {
  const [selectedProcId, setSelectedProcId] = useState<string>(
    initialProcedure ? initialProcedure.id : PROCEDURES_DATA[0].id
  );
  const [clientName, setClientName] = useState('');
  const [preferredShift, setPreferredShift] = useState<'manha' | 'tarde' | 'qualquer'>('qualquer');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const currentProc = PROCEDURES_DATA.find(p => p.id === selectedProcId) || PROCEDURES_DATA[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const shiftText = preferredShift === 'manha'
      ? 'Preferência de turno: Manhã (08h às 12h)'
      : preferredShift === 'tarde'
        ? 'Preferência de turno: Tarde (13h às 18h)'
        : 'Disponibilidade de horário flexível';

    const greeting = clientName.trim()
      ? `Olá Dra. Manoela Maia! Meu nome é ${clientName.trim()}.`
      : 'Olá Dra. Manoela Maia!';

    const message = `${greeting}
Gostaria de agendar uma avaliação para: *${currentProc.title}* no seu consultório no Odonto-Médico Itaigara.
${shiftText}.${notes.trim() ? `\nObservações: ${notes.trim()}` : ''}
Poderia me informar as datas e horários disponíveis?`;

    trackEvent('lead_conversion_attempt', {
      cta_location: 'schedule_modal_submit',
      procedure_id: currentProc.id,
      procedure_name: currentProc.title,
      client_name_provided: Boolean(clientName.trim()),
      preferred_shift: preferredShift
    });

    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-[#D8BCB2] dark:border-slate-700 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Doctor Avatar */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#FAF2EE] to-[#FAF9F6] dark:from-[#1E293B] dark:to-slate-900 border-b border-[#D8BCB2] dark:border-slate-800 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#BA7A6A]/40 dark:border-[#E8A290]/40 shadow-xs shrink-0">
              <DoctorPhoto variant="avatar" className="w-full h-full" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#965A4B] dark:text-[#E8A290] block mb-0.5">
                CONSULTA COM {DOCTOR_NAME.toUpperCase()}
              </span>
              <h2 className="font-serif-luxury text-xl sm:text-2xl font-semibold text-[#1E293B] dark:text-slate-100">
                Solicitar Avaliação Exclusiva
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#475569] dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5">
          {/* Procedure Selection */}
          <div>
            <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-200 mb-1.5">
              Procedimento de Interesse
            </label>
            <select
              value={selectedProcId}
              onChange={(e) => setSelectedProcId(e.target.value)}
              className="w-full text-xs py-3 px-3.5 rounded-xl border border-[#D8BCB2] dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-800 text-[#1E293B] dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-hidden focus:border-[#BA7A6A] dark:focus:border-[#E8A290] transition-colors"
            >
              {PROCEDURES_DATA.map((p) => (
                <option key={p.id} value={p.id} className="dark:bg-slate-800 dark:text-slate-100">
                  {p.title} ({p.categoryLabel})
                </option>
              ))}
            </select>
          </div>

          {/* Quick procedure summary */}
          <div className="p-3.5 rounded-xl bg-[#FAF6F4] dark:bg-[#1E293B] border border-[#D8BCB2] dark:border-slate-750 text-xs space-y-1">
            <p className="font-bold text-[#1E293B] dark:text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#BA7A6A] dark:text-[#E8A290]" />
              {currentProc.subtitle}
            </p>
            <p className="text-[#475569] dark:text-slate-300 text-[11px]">
              Duração estimada: <strong className="text-[#1E293B] dark:text-slate-100 font-bold">{currentProc.duration}</strong> · Recuperação: <strong className="text-[#1E293B] dark:text-slate-100 font-bold">{currentProc.recovery}</strong>
            </p>
          </div>

          {/* Patient Name */}
          <div>
            <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-200 mb-1.5">
              Seu Nome Completo
            </label>
            <input
              type="text"
              placeholder="Como prefere ser chamado(a)?"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full text-xs py-3 px-3.5 rounded-xl border border-[#D8BCB2] dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-800 text-[#1E293B] dark:text-slate-100 placeholder:text-[#94A3B8] dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-hidden focus:border-[#BA7A6A] dark:focus:border-[#E8A290] transition-colors"
            />
          </div>

          {/* Shift Preference */}
          <div>
            <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-200 mb-1.5">
              Melhor Período para Atendimento
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPreferredShift('manha')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition-colors cursor-pointer ${
                  preferredShift === 'manha'
                    ? 'bg-[#1E293B] dark:bg-[#BA7A6A] text-white border-[#1E293B] dark:border-[#BA7A6A]'
                    : 'bg-white dark:bg-slate-800 text-[#475569] dark:text-slate-200 border-[#D8BCB2] dark:border-slate-700 hover:border-[#BA7A6A] dark:hover:border-[#E8A290]'
                }`}
              >
                Manhã (08h-12h)
              </button>

              <button
                type="button"
                onClick={() => setPreferredShift('tarde')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition-colors cursor-pointer ${
                  preferredShift === 'tarde'
                    ? 'bg-[#1E293B] dark:bg-[#BA7A6A] text-white border-[#1E293B] dark:border-[#BA7A6A]'
                    : 'bg-white dark:bg-slate-800 text-[#475569] dark:text-slate-200 border-[#D8BCB2] dark:border-slate-700 hover:border-[#BA7A6A] dark:hover:border-[#E8A290]'
                }`}
              >
                Tarde (13h-19h)
              </button>

              <button
                type="button"
                onClick={() => setPreferredShift('qualquer')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition-colors cursor-pointer ${
                  preferredShift === 'qualquer'
                    ? 'bg-[#1E293B] dark:bg-[#BA7A6A] text-white border-[#1E293B] dark:border-[#BA7A6A]'
                    : 'bg-white dark:bg-slate-800 text-[#475569] dark:text-slate-200 border-[#D8BCB2] dark:border-slate-700 hover:border-[#BA7A6A] dark:hover:border-[#E8A290]'
                }`}
              >
                Qualquer Horário
              </button>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-200 mb-1.5">
              Observações ou Dúvidas (Opcional)
            </label>
            <textarea
              rows={2}
              placeholder="Ex: Já fiz aplicação de toxina botulínica antes, gostaria de avaliar preenchimento labial, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs py-2.5 px-3.5 rounded-xl border border-[#D8BCB2] dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-800 text-[#1E293B] dark:text-slate-100 placeholder:text-[#94A3B8] dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-hidden focus:border-[#BA7A6A] dark:focus:border-[#E8A290] transition-colors resize-none"
            />
          </div>

          {/* Privacy & Direct WhatsApp Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Enviar Solicitação no WhatsApp da Dra. Manoela</span>
            </button>
            <p className="text-[10px] text-center text-[#475569] dark:text-slate-300 mt-2 flex items-center justify-center gap-1 font-medium">
              <Shield className="w-3 h-3 text-[#10B981]" />
              Atendimento confidencial direto no WhatsApp oficial da clínica.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
