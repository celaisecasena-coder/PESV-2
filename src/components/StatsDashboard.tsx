import React from 'react';
import { 
  BarChart3, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Users, 
  Activity, 
  FileCheck,
  Calendar,
  Layers
} from 'lucide-react';
import { PesvPaso, Organizacion, IndicadoresSiniestralidad } from '../types/pesv';

interface StatsDashboardProps {
  organizacion: Organizacion;
  pasos: PesvPaso[];
  indicadores: IndicadoresSiniestralidad;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  organizacion,
  pasos,
  indicadores
}) => {
  // Calculate compliance for steps applicable to organization
  const pasosExigibles = pasos.filter(p => p.aplicaA.includes(organizacion.nivelCalculado));
  const pasosImplementados = pasosExigibles.filter(p => p.estado === 'IMPLEMENTADO').length;
  const porcentajeGlobal = pasosExigibles.length > 0 
    ? Math.round((pasosImplementados / pasosExigibles.length) * 100) 
    : 0;

  // Breakdown by PHVA
  const getFaseData = (fase: 'PLANEAR' | 'HACER' | 'VERIFICAR' | 'ACTUAR') => {
    const exigiblesFase = pasosExigibles.filter(p => p.fase === fase);
    const imp = exigiblesFase.filter(p => p.estado === 'IMPLEMENTADO').length;
    const pct = exigiblesFase.length > 0 ? Math.round((imp / exigiblesFase.length) * 100) : 100;
    return { total: exigiblesFase.length, implementados: imp, porcentaje: pct };
  };

  const planear = getFaseData('PLANEAR');
  const hacer = getFaseData('HACER');
  const verificar = getFaseData('VERIFICAR');
  const actuar = getFaseData('ACTUAR');

  const totalEvidencias = pasos.reduce((acc, p) => acc + p.evidencias.length, 0);

  // Evaluation status
  const getCategoriaCalificacion = (score: number) => {
    if (score >= 85) {
      return {
        label: 'SOBRESALIENTE / CONFORME',
        sub: 'Cumple con el estándar riguroso de la Resolución 40595 de 2022.',
        color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40'
      };
    } else if (score >= 60) {
      return {
        label: 'ACEPTABLE EN PROCESO DE MEJORA',
        sub: 'Requiere cerrar brechas de verificación y auditoría interna.',
        color: 'text-amber-400 bg-amber-950/40 border-amber-500/40'
      };
    } else {
      return {
        label: 'CRÍTICO / ALTO RIESGO SANCIONATORIO',
        sub: 'Vulnerable a medidas preventivas de Superintendencia de Transporte y Mintrabajo.',
        color: 'text-rose-400 bg-rose-950/40 border-rose-500/40'
      };
    }
  };

  const calificacion = getCategoriaCalificacion(porcentajeGlobal);

  return (
    <div className="space-y-6">
      
      {/* Top Maturity & Score Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl relative overflow-hidden transition-colors">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-0 pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Auditoría Técnica del PESV • Res. 40595 / 2022
              </span>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Nivel {organizacion.nivelCalculado} ({pasosExigibles.length} Requisitos)
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Tablero de Desempeño y Siniestralidad Vial
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Medición de efectividad del Plan Estratégico de Seguridad Vial para {organizacion.razonSocial}.
              Indicadores alineados a la Guía Metodológica del Ministerio de Transporte.
            </p>
          </div>

          <div className="flex items-center gap-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {porcentajeGlobal}%
              </div>
              <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                Índice Global PHVA
              </span>
            </div>
            <div className="h-10 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="space-y-1">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${calificacion.color}`}>
                {calificacion.label}
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 max-w-[200px]">
                {calificacion.sub}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Siniestros Totales */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Siniestros Totales</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {indicadores.siniestrosTotales}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">eventos registrados</span>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Fatalidades: <strong className="text-emerald-600 dark:text-emerald-400">{indicadores.fatales} (Meta: 0)</strong></span>
            <span>Lesionados: <strong className="text-amber-600 dark:text-amber-400">{indicadores.conLesionados}</strong></span>
          </div>
        </div>

        {/* Inspecciones Preoperacionales */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Preoperacionales Diarias</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {indicadores.inspeccionesPreoperacionalesPorcentaje}%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">cumplimiento diario</span>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Flota Activa: {organizacion.vehiculosAutomotores} veh.</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">Meta: &gt;95%</span>
          </div>
        </div>

        {/* Capacitación de Conductores */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Formación Vial (Paso 10)</span>
            <Users className="w-4 h-4 text-blue-500 dark:text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              {indicadores.conductoresCapacitadosPorcentaje}%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">conductores formados</span>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Censo: {organizacion.conductoresContratados} cond.</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Meta: 80% anual</span>
          </div>
        </div>

        {/* Mantenimiento Preventivo */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Mantenimiento Preventivo</span>
            <Truck className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {indicadores.mantenimientosEjecutadosPorcentaje}%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">rutinas ejecutadas</span>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Hojas de vida al día</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">Paso 17</span>
          </div>
        </div>

      </div>

      {/* PHVA Execution Progress & Technical Rates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PHVA Bar Breakdown */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Estado de Cumplimiento por Ciclo PHVA
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">Requisitos aplicables</span>
          </div>

          <div className="space-y-4">
            
            {/* Planear */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-blue-600 dark:text-blue-300">Fase 1: Planear (P1 - P8)</span>
                <span className="text-slate-900 dark:text-white font-bold">{planear.implementados}/{planear.total} ({planear.porcentaje}%)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${planear.porcentaje}%` }} />
              </div>
            </div>

            {/* Hacer */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-emerald-600 dark:text-emerald-300">Fase 2: Hacer (P9 - P19)</span>
                <span className="text-slate-900 dark:text-white font-bold">{hacer.implementados}/{hacer.total} ({hacer.porcentaje}%)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${hacer.porcentaje}%` }} />
              </div>
            </div>

            {/* Verificar */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-amber-600 dark:text-amber-300">Fase 3: Verificar (P20 - P22)</span>
                <span className="text-slate-900 dark:text-white font-bold">{verificar.implementados}/{verificar.total} ({verificar.porcentaje}%)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${verificar.porcentaje}%` }} />
              </div>
            </div>

            {/* Actuar */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-purple-600 dark:text-purple-300">Fase 4: Actuar (P23 - P24)</span>
                <span className="text-slate-900 dark:text-white font-bold">{actuar.implementados}/{actuar.total} ({actuar.porcentaje}%)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: `${actuar.porcentaje}%` }} />
              </div>
            </div>

          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span>Total Evidencias y Documentos Indexados:</span>
            <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{totalEvidencias} archivos verificados</strong>
          </div>
        </div>

        {/* Road Safety Technical Rates (Tasas Oficiales Res. 40595) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-500" />
              Tasas Técnicas de Siniestralidad (Paso 20 & 21)
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">Normalizadas por Km</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                Tasa de Frecuencia (TFs)
              </span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {indicadores.tasaFrecuencia}
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Siniestros por cada 1'000.000 de km recorridos
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                Tasa de Severidad (TSs)
              </span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {indicadores.tasaSeveridad}
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Días de incapacidad por millón de km
              </p>
            </div>
          </div>

          {/* Breakdown of events */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-300">Daños Materiales Únicamente (Choques Simples):</span>
              <span className="font-bold text-slate-900 dark:text-white">{indicadores.danosMateriales}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-300">Eventos con Lesionados (Incapacidad Laboral):</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">{indicadores.conLesionados}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-300">Fatalidades (Pérdida de Vidas Humanas):</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{indicadores.fatales} (CERO)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-300">Kilometraje Acumulado de la Flota:</span>
              <span className="font-mono text-slate-700 dark:text-slate-200">{(indicadores.kmRecorridosFlota).toLocaleString('es-CO')} km</span>
            </div>
          </div>

        </div>

      </div>

      {/* Official Audit Scale Guide */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm dark:shadow-none">
        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Escala de Evaluación y Valoración del PESV (Entidades de Control)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200 space-y-1">
            <strong className="block text-rose-600 dark:text-rose-400">Menor al 60% — Crítico</strong>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Incumplimiento de la Resolución 40595. Aplica inicio de investigación sancionatoria y medidas correctivas inmediatas.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 space-y-1">
            <strong className="block text-amber-600 dark:text-amber-400">De 60% a 84% — Aceptable</strong>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Plan en ejecución con brechas en auditoría, indicadores o contratistas. Requiere plan de mejora a 60 días.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200 space-y-1">
            <strong className="block text-emerald-600 dark:text-emerald-400">85% o superior — Sobresaliente</strong>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Cumplimiento riguroso de los requisitos exigibles. Evidencias verificadas y cultura de prevención consolidada.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
