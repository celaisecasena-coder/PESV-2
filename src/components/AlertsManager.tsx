import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ShieldAlert, 
  ExternalLink, 
  X,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { AlertaPesv, AlertSeverity, PesvPaso } from '../types/pesv';

interface AlertsManagerProps {
  alertas: AlertaPesv[];
  pasos: PesvPaso[];
  onToggleResolverAlerta: (alertaId: string) => void;
  onCrearAlerta: (nuevaAlerta: AlertaPesv) => void;
  onIrAPaso: (pasoId: number) => void;
}

export const AlertsManager: React.FC<AlertsManagerProps> = ({
  alertas,
  pasos,
  onToggleResolverAlerta,
  onCrearAlerta,
  onIrAPaso
}) => {
  const [filtroEstado, setFiltroEstado] = useState<'PENDIENTES' | 'RESUELTAS' | 'TODAS'>('PENDIENTES');
  const [filtroSeveridad, setFiltroSeveridad] = useState<'TODAS' | AlertSeverity>('TODAS');
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);

  // Form state for creating a new alert
  const [nuevoPasoId, setNuevoPasoId] = useState<number>(pasos[0]?.id || 1);
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [nuevaSeveridad, setNuevaSeveridad] = useState<AlertSeverity>('CRITICA');
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [nuevoRiesgo, setNuevoRiesgo] = useState('');

  const alertasFiltradas = alertas.filter(a => {
    if (filtroEstado === 'PENDIENTES' && a.resuelto) return false;
    if (filtroEstado === 'RESUELTAS' && !a.resuelto) return false;
    if (filtroSeveridad !== 'TODAS' && a.severidad !== filtroSeveridad) return false;
    return true;
  });

  const totalCriticas = alertas.filter(a => !a.resuelto && a.severidad === 'CRITICA').length;
  const totalMedias = alertas.filter(a => !a.resuelto && a.severidad === 'MEDIA').length;
  const totalBajas = alertas.filter(a => !a.resuelto && a.severidad === 'BAJA').length;

  const handleCrearAlertaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoTitulo.trim()) return;

    const alerta: AlertaPesv = {
      id: `alt-${Date.now()}`,
      pasoId: nuevoPasoId,
      titulo: nuevoTitulo.trim(),
      descripcion: nuevaDescripcion.trim(),
      severidad: nuevaSeveridad,
      fechaLimite: nuevaFecha || new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      resuelto: false,
      riesgoLegal: nuevoRiesgo.trim() || 'Incumplimiento normativo de la Resolución 40595 de 2022.'
    };

    onCrearAlerta(alerta);
    setMostrarModalNuevo(false);
    setNuevoTitulo('');
    setNuevaDescripcion('');
    setNuevoRiesgo('');
  };

  const getSeveridadBadge = (sev: AlertSeverity) => {
    switch (sev) {
      case 'CRITICA':
        return {
          bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          label: 'Severidad Crítica (Riesgo Sancionatorio)'
        };
      case 'MEDIA':
        return {
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          label: 'Severidad Media (Observación Operativa)'
        };
      case 'BAJA':
        return {
          bg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
          label: 'Severidad Baja (Mejora Oportuna)'
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner and Quick Counters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl transition-colors">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Centro de Alertas de Incumplimiento & Hallazgos
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
              Monitoreo continuo de vencimientos legales, desvíos de metas, brechas de capacitación y riesgos de sanción ante la Superintendencia de Transporte y Ministerio del Trabajo.
            </p>
          </div>

          <button
            onClick={() => setMostrarModalNuevo(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Alerta / Hallazgo</span>
          </button>
        </div>

        {/* Severity Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-rose-800 dark:text-rose-300 uppercase">Alertas Críticas Activas</span>
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400">{totalCriticas}</div>
            </div>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 uppercase">Alertas Medias Activas</span>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{totalMedias}</div>
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="p-3.5 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-blue-800 dark:text-blue-300 uppercase">Oportunidades de Mejora</span>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">{totalBajas}</div>
            </div>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm dark:shadow-none">
        
        {/* Status Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
          <button
            onClick={() => setFiltroEstado('PENDIENTES')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              filtroEstado === 'PENDIENTES'
                ? 'bg-rose-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Pendientes ({alertas.filter(a => !a.resuelto).length})
          </button>
          <button
            onClick={() => setFiltroEstado('RESUELTAS')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              filtroEstado === 'RESUELTAS'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Subsanadas ({alertas.filter(a => a.resuelto).length})
          </button>
          <button
            onClick={() => setFiltroEstado('TODAS')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              filtroEstado === 'TODAS'
                ? 'bg-slate-700 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Todas ({alertas.length})
          </button>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400">Filtrar por severidad:</span>
          <select
            value={filtroSeveridad}
            onChange={e => setFiltroSeveridad(e.target.value as any)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="TODAS">Todas las severidades</option>
            <option value="CRITICA">Severidad Crítica</option>
            <option value="MEDIA">Severidad Media</option>
            <option value="BAJA">Severidad Baja</option>
          </select>
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="space-y-3">
        {alertasFiltradas.map((alerta) => {
          const pasoRelacionado = pasos.find(p => p.id === alerta.pasoId);
          const badge = getSeveridadBadge(alerta.severidad);

          return (
            <div
              key={alerta.id}
              className={`p-5 rounded-2xl border transition-all ${
                alerta.resuelto
                  ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60'
                  : alerta.severidad === 'CRITICA'
                  ? 'bg-rose-50/70 dark:bg-rose-950/15 border-rose-200 dark:border-rose-900/50 hover:border-rose-300 dark:hover:border-rose-700/80 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${badge.bg}`}>
                      {badge.label}
                    </span>
                    {pasoRelacionado && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                        Paso {pasoRelacionado.numero}: {pasoRelacionado.titulo}
                      </span>
                    )}
                    {alerta.resuelto && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                        Subsanada / Cerrada
                      </span>
                    )}
                  </div>

                  <h3 className={`text-base font-bold text-slate-900 dark:text-white ${alerta.resuelto ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                    {alerta.titulo}
                  </h3>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {alerta.descripcion}
                  </p>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs text-rose-700 dark:text-rose-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-rose-600 dark:text-rose-400 text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Riesgo Normativo y Legal:</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      {alerta.riesgoLegal}
                    </p>
                  </div>
                </div>

                {/* Actions & Due Date */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>Fecha Límite: <strong className="text-slate-800 dark:text-slate-200">{alerta.fechaLimite}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    {pasoRelacionado && (
                      <button
                        onClick={() => onIrAPaso(pasoRelacionado.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3 text-blue-500" />
                        <span>Ir al Paso</span>
                      </button>
                    )}

                    <button
                      onClick={() => onToggleResolverAlerta(alerta.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        alerta.resuelto
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{alerta.resuelto ? 'Reabrir Hallazgo' : 'Subsanar Hallazgo'}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}

        {alertasFiltradas.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 space-y-2 shadow-sm">
            <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500" />
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">¡Sin alertas pendientes en esta categoría!</p>
            <p className="text-xs">Los requisitos y metas del PESV están operando dentro de los márgenes de cumplimiento normativo.</p>
          </div>
        )}
      </div>

      {/* Modal to register new alert */}
      {mostrarModalNuevo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 text-slate-900 dark:text-slate-100 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Registrar Alerta / Hallazgo PESV</h3>
              </div>
              <button
                onClick={() => setMostrarModalNuevo(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCrearAlertaSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Paso del PESV Afectado
                </label>
                <select
                  value={nuevoPasoId}
                  onChange={e => setNuevoPasoId(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {pasos.map(p => (
                    <option key={p.id} value={p.id}>
                      Paso {p.numero}: {p.titulo}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Título de la Alerta / Hallazgo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Póliza SOAT próxima a vencer en 3 vehículos"
                  value={nuevoTitulo}
                  onChange={e => setNuevoTitulo(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Severidad
                  </label>
                  <select
                    value={nuevaSeveridad}
                    onChange={e => setNuevaSeveridad(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="CRITICA">Crítica (Riesgo Sancionatorio)</option>
                    <option value="MEDIA">Media (Incumplimiento Operativo)</option>
                    <option value="BAJA">Baja (Oportunidad de Mejora)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Fecha Límite para Subsanar
                  </label>
                  <input
                    type="date"
                    required
                    value={nuevaFecha}
                    onChange={e => setNuevaFecha(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Descripción Detallada de la No Conformidad
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Explica qué desviación o falta de evidencia se detectó..."
                  value={nuevaDescripcion}
                  onChange={e => setNuevaDescripcion(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Riesgo Normativo / Legal (Res. 40595 / Mintrabajo)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Sanción tipo B según Decreto 1079 de 2015"
                  value={nuevoRiesgo}
                  onChange={e => setNuevoRiesgo(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setMostrarModalNuevo(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20"
                >
                  Crear Alerta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
