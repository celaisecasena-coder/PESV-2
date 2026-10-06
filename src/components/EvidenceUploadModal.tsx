import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, Paperclip } from 'lucide-react';
import { PesvPaso, Evidencia } from '../types/pesv';

interface EvidenceUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  pasos: PesvPaso[];
  pasoPreseleccionadoId?: number;
  onSubirEvidencia: (pasoId: number, nuevaEvidencia: Evidencia) => void;
}

export const EvidenceUploadModal: React.FC<EvidenceUploadModalProps> = ({
  isOpen,
  onClose,
  pasos,
  pasoPreseleccionadoId,
  onSubirEvidencia
}) => {
  const [pasoSeleccionadoId, setPasoSeleccionadoId] = useState<number>(
    pasoPreseleccionadoId || pasos[0]?.id || 1
  );
  const [nombreArchivo, setNombreArchivo] = useState('');
  const [subidoPor, setSubidoPor] = useState('Líder del PESV');
  const [comentario, setComentario] = useState('');
  const [tipo, setTipo] = useState<'PDF' | 'EXCEL' | 'ACTA' | 'INFORME' | 'IMAGEN'>('PDF');
  const [archivoSimulado, setArchivoSimulado] = useState<string | null>(null);
  const [exito, setExito] = useState(false);

  if (!isOpen) return null;

  const handleSimularArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setArchivoSimulado(file.name);
      if (!nombreArchivo) {
        setNombreArchivo(file.name);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreArchivo.trim()) return;

    const nuevaEvidencia: Evidencia = {
      id: `ev-${Date.now()}`,
      pasoId: pasoSeleccionadoId,
      nombreArchivo: nombreArchivo.endsWith('.pdf') || nombreArchivo.endsWith('.xlsx') || nombreArchivo.endsWith('.docx')
        ? nombreArchivo
        : `${nombreArchivo}.${tipo === 'PDF' ? 'pdf' : tipo === 'EXCEL' ? 'xlsx' : 'docx'}`,
      tamano: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
      fechaSubida: new Date().toISOString().split('T')[0],
      subidoPor: subidoPor.trim() || 'Coordinador PESV',
      comentario: comentario.trim() || 'Soporte documental adjunto para cumplimiento normativo Res. 40595',
      estado: 'VALIDADO',
      tipo
    };

    onSubirEvidencia(pasoSeleccionadoId, nuevaEvidencia);
    setExito(true);
    setTimeout(() => {
      setExito(false);
      setNombreArchivo('');
      setComentario('');
      setArchivoSimulado(null);
      onClose();
    }, 1200);
  };

  const pasoActual = pasos.find(p => p.id === pasoSeleccionadoId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 text-slate-900 dark:text-slate-100 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg border border-emerald-200 dark:border-emerald-500/30">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Cargar Evidencia Documental</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Soporte verificable para la Resolución 40595 de 2022
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {exito ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center ring-8 ring-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">¡Evidencia Cargada con Éxito!</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              El soporte documental ha sido indexado y validado en el Paso {pasoActual?.numero}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Step selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Paso del Ciclo PHVA al que corresponde
              </label>
              <select
                value={pasoSeleccionadoId}
                onChange={e => setPasoSeleccionadoId(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {pasos.map(p => (
                  <option key={p.id} value={p.id} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                    Paso {p.numero}: {p.titulo} ({p.fase})
                  </option>
                ))}
              </select>
            </div>

            {/* Dropzone simulator */}
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500/60 rounded-xl p-5 text-center transition bg-slate-50 dark:bg-slate-800/40 relative cursor-pointer">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                onChange={handleSimularArchivo}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              />
              <UploadCloud className="w-8 h-8 mx-auto text-emerald-500 dark:text-emerald-400 mb-2" />
              {archivoSimulado ? (
                <div className="flex items-center justify-center gap-2 text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                  <Paperclip className="w-4 h-4" />
                  <span>{archivoSimulado}</span>
                </div>
              ) : (
                <>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
                    Arrastra aquí tu archivo o <span className="text-emerald-600 dark:text-emerald-400 underline">haz clic para examinar</span>
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Formatos admitidos: PDF, Excel, Word, Imágenes de inspección (hasta 25 MB)
                  </p>
                </>
              )}
            </div>

            {/* Evidence Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nombre descriptivo del documento o registro
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Acta_Reunion_Comite_Q1_2026.pdf"
                value={nombreArchivo}
                onChange={e => setNombreArchivo(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* File type and Uploader */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tipo de Soporte
                </label>
                <select
                  value={tipo}
                  onChange={e => setTipo(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="PDF">Documento PDF</option>
                  <option value="EXCEL">Planilla / Matriz Excel</option>
                  <option value="ACTA">Acta Firmada</option>
                  <option value="INFORME">Informe Técnico</option>
                  <option value="IMAGEN">Registro Fotográfico</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Responsable que Carga
                </label>
                <input
                  type="text"
                  value={subidoPor}
                  onChange={e => setSubidoPor(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Technical comments */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Observaciones y Trazabilidad del Cumplimiento
              </label>
              <textarea
                rows={2}
                placeholder="Indica qué numerales o compromisos subsana esta evidencia..."
                value={comentario}
                onChange={e => setComentario(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition cursor-pointer"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Registrar Evidencia</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
