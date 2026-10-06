import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter, 
  Upload, 
  FileText, 
  Download, 
  ChevronRight,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';
import { PesvPaso, PhvaFase, StepStatus, PesvNivel } from '../types/pesv';

interface PhvaBoardProps {
  pasos: PesvPaso[];
  nivelOrganizacion: PesvNivel;
  onAbrirDetallePaso: (paso: PesvPaso) => void;
  onAbrirSubirEvidencia: (pasoId: number) => void;
}

export const PhvaBoard: React.FC<PhvaBoardProps> = ({
  pasos,
  nivelOrganizacion,
  onAbrirDetallePaso,
  onAbrirSubirEvidencia
}) => {
  const [faseFiltro, setFaseFiltro] = useState<'TODAS' | PhvaFase>('TODAS');
  const [estadoFiltro, setEstadoFiltro] = useState<'TODOS' | StepStatus>('TODOS');
  const [soloExigibles, setSoloExigibles] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  // Statistics per Phase
  const getFaseStats = (fase: PhvaFase) => {
    const pasosFase = pasos.filter(p => p.fase === fase);
    const exigiblesFase = pasosFase.filter(p => p.aplicaA.includes(nivelOrganizacion));
    const implementados = exigiblesFase.filter(p => p.estado === 'IMPLEMENTADO').length;
    const porcentaje = exigiblesFase.length > 0 
      ? Math.round((implementados / exigiblesFase.length) * 100) 
      : 100;

    return {
      total: pasosFase.length,
      exigibles: exigiblesFase.length,
      implementados,
      porcentaje
    };
  };

  const planearStats = getFaseStats('PLANEAR');
  const hacerStats = getFaseStats('HACER');
  const verificarStats = getFaseStats('VERIFICAR');
  const actuarStats = getFaseStats('ACTUAR');

  // Filtered steps list
  const pasosFiltrados = pasos.filter(paso => {
    if (faseFiltro !== 'TODAS' && paso.fase !== faseFiltro) return false;
    if (estadoFiltro !== 'TODOS' && paso.estado !== estadoFiltro) return false;
    if (soloExigibles && !paso.aplicaA.includes(nivelOrganizacion)) return false;
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      const coincide = 
        paso.titulo.toLowerCase().includes(q) ||
        paso.descripcion.toLowerCase().includes(q) ||
        paso.numero.toString() === q ||
        paso.requisitoNormativo.toLowerCase().includes(q);
      if (!coincide) return false;
    }
    return true;
  });

  const getFaseBadge = (fase: PhvaFase) => {
    switch (fase) {
      case 'PLANEAR':
        return {
          bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
          title: 'Fase 1: Planear (P1 - P8)'
        };
      case 'HACER':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          title: 'Fase 2: Hacer (P9 - P19)'
        };
      case 'VERIFICAR':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          title: 'Fase 3: Verificar (P20 - P22)'
        };
      case 'ACTUAR':
        return {
          bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
          title: 'Fase 4: Actuar (P23 - P24)'
        };
    }
  };

  const getEstadoBadge = (estado: StepStatus) => {
    switch (estado) {
      case 'IMPLEMENTADO':
        return {
          bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          label: 'Implementado',
          icon: CheckCircle2
        };
      case 'EN_PROCESO':
        return {
          bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          label: 'En Proceso',
          icon: Clock
        };
      case 'NO_INICIADO':
        return {
          bg: 'bg-slate-700/60 text-slate-300 border-slate-600',
          label: 'No Iniciado',
          icon: AlertCircle
        };
      case 'VENCIDO':
        return {
          bg: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          label: 'Requiere Atención',
          icon: AlertCircle
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* PHVA 4 Phases Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Planear */}
        <div 
          onClick={() => setFaseFiltro(faseFiltro === 'PLANEAR' ? 'TODAS' : 'PLANEAR')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-sm dark:shadow-none ${
            faseFiltro === 'PLANEAR'
              ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20'
              : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              1. PLANEAR
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300">
              {planearStats.porcentaje}%
            </span>
          </div>
          <div className="text-lg font-extrabold text-slate-900 dark:text-white">
            Planificación PESV
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Líder, política, diagnóstico y riesgos
          </p>
          <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full rounded-full transition-all duration-300" 
              style={{ width: `${planearStats.porcentaje}%` }} 
            />
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex justify-between">
            <span>{planearStats.implementados} de {planearStats.exigibles} pasos exigibles</span>
            <span>Pasos 1 - 8</span>
          </div>
        </div>

        {/* Hacer */}
        <div 
          onClick={() => setFaseFiltro(faseFiltro === 'HACER' ? 'TODAS' : 'HACER')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-sm dark:shadow-none ${
            faseFiltro === 'HACER'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20'
              : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              2. HACER
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
              {hacerStats.porcentaje}%
            </span>
          </div>
          <div className="text-lg font-extrabold text-slate-900 dark:text-white">
            Implementación
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Formación, vehículos y rutas seguras
          </p>
          <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-300" 
              style={{ width: `${hacerStats.porcentaje}%` }} 
            />
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex justify-between">
            <span>{hacerStats.implementados} de {hacerStats.exigibles} pasos exigibles</span>
            <span>Pasos 9 - 19</span>
          </div>
        </div>

        {/* Verificar */}
        <div 
          onClick={() => setFaseFiltro(faseFiltro === 'VERIFICAR' ? 'TODAS' : 'VERIFICAR')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-sm dark:shadow-none ${
            faseFiltro === 'VERIFICAR'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/20'
              : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              3. VERIFICAR
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300">
              {verificarStats.porcentaje}%
            </span>
          </div>
          <div className="text-lg font-extrabold text-slate-900 dark:text-white">
            Seguimiento
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Indicadores, auditoría y siniestros
          </p>
          <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-300" 
              style={{ width: `${verificarStats.porcentaje}%` }} 
            />
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex justify-between">
            <span>{verificarStats.implementados} de {verificarStats.exigibles} pasos exigibles</span>
            <span>Pasos 20 - 22</span>
          </div>
        </div>

        {/* Actuar */}
        <div 
          onClick={() => setFaseFiltro(faseFiltro === 'ACTUAR' ? 'TODAS' : 'ACTUAR')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-sm dark:shadow-none ${
            faseFiltro === 'ACTUAR'
              ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/20'
              : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              4. ACTUAR
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300">
              {actuarStats.porcentaje}%
            </span>
          </div>
          <div className="text-lg font-extrabold text-slate-900 dark:text-white">
            Mejora Continua
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Acciones correctivas y rendición
          </p>
          <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-purple-500 h-full rounded-full transition-all duration-300" 
              style={{ width: `${actuarStats.porcentaje}%` }} 
            />
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex justify-between">
            <span>{actuarStats.implementados} de {actuarStats.exigibles} pasos exigibles</span>
            <span>Pasos 23 - 24</span>
          </div>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm dark:shadow-none">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por paso, velocidad, flota, alcohol..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          
          {/* Phase Filter Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={faseFiltro}
              onChange={e => setFaseFiltro(e.target.value as any)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="TODAS">Todas las Fases PHVA</option>
              <option value="PLANEAR">Fase 1: Planear</option>
              <option value="HACER">Fase 2: Hacer</option>
              <option value="VERIFICAR">Fase 3: Verificar</option>
              <option value="ACTUAR">Fase 4: Actuar</option>
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={estadoFiltro}
            onChange={e => setEstadoFiltro(e.target.value as any)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="TODOS">Todos los Estados</option>
            <option value="IMPLEMENTADO">Implementados</option>
            <option value="EN_PROCESO">En Proceso</option>
            <option value="NO_INICIADO">No Iniciados</option>
          </select>

          {/* Toggle for Level Exigibility */}
          <button
            onClick={() => setSoloExigibles(!soloExigibles)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              soloExigibles
                ? 'bg-blue-50 dark:bg-blue-600/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/40'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{soloExigibles ? `Solo Exigibles (${nivelOrganizacion})` : 'Mostrando los 24 Pasos'}</span>
          </button>
        </div>
      </div>

      {/* Steps List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {pasosFiltrados.map((paso) => {
          const faseBadge = getFaseBadge(paso.fase);
          const estadoBadge = getEstadoBadge(paso.estado);
          const EstadoIcon = estadoBadge.icon;
          const esExigible = paso.aplicaA.includes(nivelOrganizacion);

          return (
            <div
              key={paso.id}
              className={`bg-white dark:bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg dark:hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 group ${
                !esExigible 
                  ? 'opacity-70 border-slate-200 dark:border-slate-800/60 bg-slate-50/70 dark:bg-slate-900/60' 
                  : 'border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none'
              }`}
            >
              <div>
                {/* Header of step card */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 group-hover:border-blue-500 transition">
                      {paso.numero}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${faseBadge.bg}`}>
                      {paso.fase}
                    </span>
                  </div>

                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border flex items-center gap-1 ${estadoBadge.bg}`}>
                    <EstadoIcon className="w-3 h-3" />
                    {estadoBadge.label}
                  </span>
                </div>

                {/* Title & description */}
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition line-clamp-1">
                  {paso.titulo}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {paso.subtitulo}
                </p>

                {/* Exigibility tag */}
                <div className="mt-3 flex items-center gap-2 text-[10px]">
                  {esExigible ? (
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
                      Exigible para Nivel {nivelOrganizacion}
                    </span>
                  ) : (
                    <span className="text-slate-500 bg-slate-100 dark:bg-slate-800/60 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                      Opcional para Nivel {nivelOrganizacion}
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Avance Criterios:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {paso.criterios.filter(c => c.cumple).length}/{paso.criterios.length} ({paso.porcentajeAvance}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        paso.porcentajeAvance === 100 ? 'bg-emerald-500' :
                        paso.porcentajeAvance > 0 ? 'bg-amber-500' : 'bg-slate-400 dark:bg-slate-600'
                      }`}
                      style={{ width: `${paso.porcentajeAvance}%` }}
                    />
                  </div>
                </div>

                {/* Evidences count */}
                <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                    <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <strong>{paso.evidencias.length}</strong> {paso.evidencias.length === 1 ? 'evidencia cargada' : 'evidencias cargadas'}
                  </span>
                  <span className="text-slate-500 text-[10px] truncate max-w-[140px]" title={paso.responsableSugerido}>
                    {paso.responsableSugerido}
                  </span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => onAbrirSubirEvidencia(paso.id)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-600/20 border border-emerald-200 dark:border-emerald-500/20 transition cursor-pointer"
                  title="Subir archivo de evidencia para este requerimiento"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Subir</span>
                </button>

                <button
                  onClick={() => onAbrirDetallePaso(paso)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                >
                  <span>Auditar Requisito</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {pasosFiltrados.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 space-y-2 shadow-sm">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">No se encontraron pasos con los filtros actuales</p>
          <p className="text-xs">Prueba borrando el texto de búsqueda o desactivando el filtro de nivel.</p>
        </div>
      )}

    </div>
  );
};
