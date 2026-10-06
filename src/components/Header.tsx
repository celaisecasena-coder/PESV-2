import React from 'react';
import { 
  ShieldCheck, 
  Building2, 
  AlertTriangle, 
  BarChart3, 
  FileText, 
  CheckCircle2, 
  SlidersHorizontal,
  FileCheck
} from 'lucide-react';
import { Organizacion, PesvNivel } from '../types/pesv';
import { ORGANIZACIONES_DEMO } from '../data/demoOrganizations';
import { ThemeToggle, ThemeMode } from './ThemeToggle';

interface HeaderProps {
  organizacion: Organizacion;
  onCambiarOrganizacion: (org: Organizacion) => void;
  onAbrirConfiguracion: () => void;
  pestanaActiva: 'PHVA' | 'ESTADISTICAS' | 'ALERTAS' | 'INFORME';
  onCambiarPestana: (pestana: 'PHVA' | 'ESTADISTICAS' | 'ALERTAS' | 'INFORME') => void;
  totalAlertasCriticas: number;
  porcentajeCumplimiento: number;
  pasosExigiblesCount: number;
  pasosCumplidosCount: number;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  organizacion,
  onCambiarOrganizacion,
  onAbrirConfiguracion,
  pestanaActiva,
  onCambiarPestana,
  totalAlertasCriticas,
  porcentajeCumplimiento,
  pasosExigiblesCount,
  pasosCumplidosCount,
  theme,
  onThemeChange
}) => {
  const getNivelBadge = (nivel: PesvNivel) => {
    switch (nivel) {
      case 'AVANZADO':
        return {
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700',
          label: 'Nivel Avanzado (24 Pasos)'
        };
      case 'ESTANDAR':
        return {
          bg: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700',
          label: 'Nivel Estándar (20 Pasos)'
        };
      case 'BASICO':
        return {
          bg: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700',
          label: 'Nivel Básico (8 Pasos)'
        };
    }
  };

  const badgeInfo = getNivelBadge(organizacion.nivelCalculado);

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white sticky top-0 z-40 shadow-sm dark:shadow-xl transition-colors duration-200">
      {/* Top Banner with Colombian Flag Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-blue-600 to-rose-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-3.5 gap-4">
          
          {/* Brand & Legal Badge */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  PESV <span className="text-blue-600 dark:text-blue-400">Manager</span>
                </span>
                <span className="text-xs px-2 py-0.5 rounded font-mono font-semibold bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                  Res. 40595 de 2022
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Planes Estratégicos de Seguridad Vial • Ciclo PHVA Integral Colombia
              </p>
            </div>
          </div>

          {/* Controls: Company Switcher, Classifier, Level Badge & Theme Toggle Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Company selector */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
              <Building2 className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
              <select
                className="bg-transparent text-slate-900 dark:text-white font-medium focus:outline-none cursor-pointer text-xs"
                value={organizacion.razonSocial}
                onChange={(e) => {
                  const encontrada = ORGANIZACIONES_DEMO.find(d => d.org.razonSocial === e.target.value);
                  if (encontrada) onCambiarOrganizacion(encontrada.org);
                }}
              >
                {ORGANIZACIONES_DEMO.map((item, idx) => (
                  <option key={idx} value={item.org.razonSocial} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                    {item.org.razonSocial} ({item.org.nivelCalculado})
                  </option>
                ))}
              </select>
            </div>

            {/* Classification modal trigger */}
            <button
              onClick={onAbrirConfiguracion}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition"
              title="Configurar datos de empresa y recalcular nivel"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Clasificar Empresa</span>
            </button>

            {/* Level badge */}
            <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${badgeInfo.bg}`}>
              {badgeInfo.label}
            </span>

            {/* Botonera de Fondo Claro / Oscuro */}
            <div className="pl-1 border-l border-slate-200 dark:border-slate-700/80">
              <ThemeToggle theme={theme} onThemeChange={onThemeChange} variant="header" />
            </div>

          </div>
        </div>

        {/* Global Progress Bar Strip */}
        <div className="py-2.5 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Cumplimiento Global:</span>
              <div className="flex items-center gap-2">
                <div className="w-24 sm:w-32 bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-300 dark:border-slate-700">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      porcentajeCumplimiento >= 85
                        ? 'bg-emerald-500'
                        : porcentajeCumplimiento >= 60
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${porcentajeCumplimiento}%` }}
                  />
                </div>
                <span className="font-bold text-slate-900 dark:text-white text-xs">{porcentajeCumplimiento}%</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>
                Requisitos: <strong className="text-slate-900 dark:text-white">{pasosCumplidosCount}</strong> de {pasosExigiblesCount} implementados
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <span className="text-[11px]">
              Líder: <span className="text-slate-800 dark:text-slate-200 font-medium">{organizacion.liderPesv.split('(')[0]}</span>
            </span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-[11px]">
              Flota: <span className="text-slate-800 dark:text-slate-200 font-medium">{organizacion.vehiculosAutomotores} automotores</span>
            </span>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 border-t border-slate-200 dark:border-slate-800 pt-1 -mb-px overflow-x-auto scrollbar-none">
          <button
            onClick={() => onCambiarPestana('PHVA')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs sm:text-sm font-medium transition whitespace-nowrap cursor-pointer ${
              pestanaActiva === 'PHVA'
                ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400 font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Ciclo PHVA (Pasos 1 al 24)</span>
          </button>

          <button
            onClick={() => onCambiarPestana('ESTADISTICAS')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs sm:text-sm font-medium transition whitespace-nowrap cursor-pointer ${
              pestanaActiva === 'ESTADISTICAS'
                ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400 font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Estadísticas & Siniestralidad</span>
          </button>

          <button
            onClick={() => onCambiarPestana('ALERTAS')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs sm:text-sm font-medium transition whitespace-nowrap cursor-pointer ${
              pestanaActiva === 'ALERTAS'
                ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400 font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Centro de Alertas</span>
            {totalAlertasCriticas > 0 && (
              <span className="px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-bold rounded-full">
                {totalAlertasCriticas}
              </span>
            )}
          </button>

          <button
            onClick={() => onCambiarPestana('INFORME')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs sm:text-sm font-medium transition whitespace-nowrap cursor-pointer ${
              pestanaActiva === 'INFORME'
                ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400 font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Reporte Oficial Autogestión</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

