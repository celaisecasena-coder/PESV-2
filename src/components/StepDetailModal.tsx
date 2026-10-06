import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  Download, 
  Copy, 
  Trash2, 
  Upload, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building,
  Check
} from 'lucide-react';
import { PesvPaso, StepStatus, Evidencia, PesvNivel } from '../types/pesv';

interface StepDetailModalProps {
  paso: PesvPaso | null;
  nivelOrganizacion: PesvNivel;
  onClose: () => void;
  onActualizarPaso: (pasoActualizado: PesvPaso) => void;
  onAbrirSubirEvidencia: (pasoId: number) => void;
  onSeleccionarPasoId: (pasoId: number) => void;
  totalPasos: number;
}

export const StepDetailModal: React.FC<StepDetailModalProps> = ({
  paso,
  nivelOrganizacion,
  onClose,
  onActualizarPaso,
  onAbrirSubirEvidencia,
  onSeleccionarPasoId,
  totalPasos
}) => {
  const [copiado, setCopiado] = useState(false);
  const [observaciones, setObservaciones] = useState(paso?.observacionesAuditoria || '');
  const [mostrarPlantilla, setMostrarPlantilla] = useState(false);

  if (!paso) return null;

  const esExigible = paso.aplicaA.includes(nivelOrganizacion);

  const handleToggleCriterio = (criterioId: string) => {
    const nuevosCriterios = paso.criterios.map(c => 
      c.id === criterioId ? { ...c, cumple: !c.cumple } : c
    );
    const cumplidos = nuevosCriterios.filter(c => c.cumple).length;
    const nuevoPorcentaje = Math.round((cumplidos / nuevosCriterios.length) * 100);
    
    let nuevoEstado: StepStatus = paso.estado;
    if (nuevoPorcentaje === 100) nuevoEstado = 'IMPLEMENTADO';
    else if (nuevoPorcentaje > 0) nuevoEstado = 'EN_PROCESO';
    else nuevoEstado = 'NO_INICIADO';

    onActualizarPaso({
      ...paso,
      criterios: nuevosCriterios,
      porcentajeAvance: nuevoPorcentaje,
      estado: nuevoEstado
    });
  };

  const handleCambiarEstado = (nuevoEstado: StepStatus) => {
    let nuevoPorcentaje = paso.porcentajeAvance;
    if (nuevoEstado === 'IMPLEMENTADO') nuevoPorcentaje = 100;
    else if (nuevoEstado === 'NO_INICIADO') nuevoPorcentaje = 0;

    onActualizarPaso({
      ...paso,
      estado: nuevoEstado,
      porcentajeAvance: nuevoPorcentaje
    });
  };

  const handleEliminarEvidencia = (evidenciaId: string) => {
    const nuevasEvidencias = paso.evidencias.filter(e => e.id !== evidenciaId);
    onActualizarPaso({
      ...paso,
      evidencias: nuevasEvidencias
    });
  };

  const handleGuardarObservaciones = () => {
    onActualizarPaso({
      ...paso,
      observacionesAuditoria: observaciones
    });
  };

  const handleCopiarPlantilla = () => {
    navigator.clipboard.writeText(paso.plantillaSugerida.contenido);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const handleDescargarPlantilla = () => {
    const element = document.createElement("a");
    const file = new Blob([paso.plantillaSugerida.contenido], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = paso.plantillaSugerida.nombre.replace('.docx', '.txt');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getFaseColor = (fase: string) => {
    switch (fase) {
      case 'PLANEAR': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'HACER': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'VERIFICAR': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'ACTUAR': return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 dark:bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full p-5 sm:p-7 text-slate-900 dark:text-slate-100 relative my-6 max-h-[90vh] overflow-y-auto">
        
        {/* Navigation & Close */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              disabled={paso.numero <= 1}
              onClick={() => onSeleccionarPasoId(paso.id - 1)}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-100 text-slate-700 dark:text-slate-300 transition cursor-pointer"
              title="Paso Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Paso {paso.numero} de {totalPasos}
            </span>
            <button
              disabled={paso.numero >= totalPasos}
              onClick={() => onSeleccionarPasoId(paso.id + 1)}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-100 text-slate-700 dark:text-slate-300 transition cursor-pointer"
              title="Paso Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${getFaseColor(paso.fase)}`}>
              Ciclo {paso.fase}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Header */}
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Resolución 40595 de 2022
            </span>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            {esExigible ? (
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Requisito exigible para su nivel ({nivelOrganizacion})
              </span>
            ) : (
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Building className="w-3.5 h-3.5" /> Opcional / Sugerido para su nivel ({nivelOrganizacion})
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Paso {paso.numero}. {paso.titulo}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            {paso.subtitulo}
          </p>
        </div>

        {/* Normative description box */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300 space-y-2">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white">Alcance y Mandato Legal: </strong>
              {paso.descripcion}
            </div>
          </div>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span><strong>Referencia: </strong>{paso.requisitoNormativo}</span>
            <span><strong>Frecuencia de Actualización: </strong>{paso.frecuenciaActualizacion}</span>
            <span><strong>Responsable Sugerido: </strong>{paso.responsableSugerido}</span>
          </div>
        </div>

        {/* Status and Progress Selector */}
        <div className="mt-5 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-1/2 space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-500 dark:text-slate-400">Nivel de Implementación del Requisito:</span>
              <span className="font-bold text-slate-900 dark:text-white">{paso.porcentajeAvance}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  paso.porcentajeAvance === 100 ? 'bg-emerald-500' :
                  paso.porcentajeAvance > 0 ? 'bg-amber-500' : 'bg-slate-400 dark:bg-slate-500'
                }`}
                style={{ width: `${paso.porcentajeAvance}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => handleCambiarEstado('NO_INICIADO')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                paso.estado === 'NO_INICIADO'
                  ? 'bg-slate-700 text-white ring-1 ring-slate-500'
                  : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              No Iniciado
            </button>
            <button
              onClick={() => handleCambiarEstado('EN_PROCESO')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                paso.estado === 'EN_PROCESO'
                  ? 'bg-amber-50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40'
                  : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              En Proceso
            </button>
            <button
              onClick={() => handleCambiarEstado('IMPLEMENTADO')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                paso.estado === 'IMPLEMENTADO'
                  ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40'
                  : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Implementado
            </button>
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="mt-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between mb-3">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              Criterios de Verificación para Auditoría (Lista de Chequeo Res. 40595)
            </span>
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
              {paso.criterios.filter(c => c.cumple).length} de {paso.criterios.length} verificados
            </span>
          </h3>

          <div className="space-y-2">
            {paso.criterios.map((criterio) => (
              <label
                key={criterio.id}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  criterio.cumple
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-600/40 text-emerald-900 dark:text-emerald-100'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70'
                }`}
              >
                <input
                  type="checkbox"
                  checked={criterio.cumple}
                  onChange={() => handleToggleCriterio(criterio.id)}
                  className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-500 cursor-pointer"
                />
                <span className="text-xs leading-relaxed select-none">
                  {criterio.descripcion}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Evidence Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Evidencias Documentales y Soportes ({paso.evidencias.length})
            </h3>
            <button
              onClick={() => onAbrirSubirEvidencia(paso.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Subir Evidencia</span>
            </button>
          </div>

          {paso.evidencias.length === 0 ? (
            <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/20">
              <p>No se han adjuntado evidencias para este paso todavía.</p>
              <p className="mt-1 text-slate-400 dark:text-slate-500">
                Haz clic en "Subir Evidencia" para adjuntar actas, checklists, informes o resoluciones de soporte.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {paso.evidencias.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{ev.nombreArchivo}</span>
                        <span className="px-1.5 py-0.2 bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 rounded text-[10px] font-mono">
                          {ev.tipo}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {ev.comentario}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                        <span>Subido por: <strong className="text-slate-700 dark:text-slate-300">{ev.subidoPor}</strong></span>
                        <span>•</span>
                        <span>Fecha: {ev.fechaSubida}</span>
                        <span>•</span>
                        <span>Tamaño: {ev.tamano}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 rounded text-[10px] font-medium border border-emerald-200 dark:border-emerald-500/30">
                      Verificado
                    </span>
                    <button
                      onClick={() => handleEliminarEvidencia(ev.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-slate-200 dark:hover:bg-slate-700/60 rounded-lg transition cursor-pointer"
                      title="Eliminar evidencia"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Suggested Official Template Section */}
        <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Plantilla Modelo Oficial (Resolución 40595)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Formato base listo para adaptar e implementar en la empresa
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMostrarPlantilla(!mostrarPlantilla)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              >
                {mostrarPlantilla ? 'Ocultar Plantilla' : 'Previsualizar Plantilla'}
              </button>
              <button
                onClick={handleDescargarPlantilla}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar Formato</span>
              </button>
            </div>
          </div>

          {mostrarPlantilla && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 relative space-y-2">
              <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 pb-2">
                <span className="font-semibold text-indigo-300">{paso.plantillaSugerida.nombre}</span>
                <button
                  onClick={handleCopiarPlantilla}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiado ? '¡Copiado!' : 'Copiar texto'}</span>
                </button>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-200">
                {paso.plantillaSugerida.contenido}
              </pre>
            </div>
          )}
        </div>

        {/* Auditor Observations */}
        <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-5 space-y-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Observaciones de Auditoría Interna / Recomendaciones de Mejora
          </label>
          <div className="flex gap-2">
            <textarea
              rows={2}
              value={observaciones}
              onChange={e => setObservaciones(e.target.value)}
              placeholder="Registra aquí observaciones del Comité de Seguridad Vial, hallazgos de ARL o pendientes de cierre..."
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <button
              onClick={handleGuardarObservaciones}
              className="px-4 py-2 self-stretch rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition shrink-0 cursor-pointer"
            >
              Guardar Nota
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
