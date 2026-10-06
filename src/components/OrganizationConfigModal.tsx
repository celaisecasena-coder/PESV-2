import React, { useState } from 'react';
import { X, Building2, Truck, Users, Shield, Check, Info } from 'lucide-react';
import { Organizacion, Misionalidad } from '../types/pesv';
import { calcularNivelPesv } from '../data/pesvStepsData';

interface OrganizationConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizacion: Organizacion;
  onGuardar: (orgActualizada: Organizacion) => void;
}

export const OrganizationConfigModal: React.FC<OrganizationConfigModalProps> = ({
  isOpen,
  onClose,
  organizacion,
  onGuardar
}) => {
  const [formData, setFormData] = useState<Organizacion>({ ...organizacion });

  if (!isOpen) return null;

  const nivelCalculado = calcularNivelPesv(
    formData.misionalidad,
    formData.vehiculosAutomotores,
    formData.conductoresContratados
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar({
      ...formData,
      nivelCalculado
    });
    onClose();
  };

  const getPasoCount = (nivel: string) => {
    switch (nivel) {
      case 'AVANZADO': return 24;
      case 'ESTANDAR': return 20;
      default: return 8;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 text-slate-900 dark:text-slate-100 relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-200 dark:border-blue-500/30">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Clasificación & Datos de la Organización</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Criterios de clasificación según el Capítulo II de la Resolución 40595 de 2022
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

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          {/* Company identity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Razón Social / Nombre Comercial
              </label>
              <input
                type="text"
                required
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.razonSocial}
                onChange={e => setFormData({ ...formData, razonSocial: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                NIT (Número de Identificación Tributaria)
              </label>
              <input
                type="text"
                required
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.nit}
                onChange={e => setFormData({ ...formData, nit: e.target.value })}
              />
            </div>
          </div>

          {/* Misionalidad Selection */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3">
            <label className="block text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              Misionalidad de la Empresa (Resolución 40595)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex flex-col p-3 rounded-lg border cursor-pointer transition ${
                  formData.misionalidad === 'TRANSPORTE'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">Empresa de Transporte</span>
                  <input
                    type="radio"
                    name="misionalidad"
                    value="TRANSPORTE"
                    checked={formData.misionalidad === 'TRANSPORTE'}
                    onChange={() => setFormData({ ...formData, misionalidad: 'TRANSPORTE' })}
                    className="accent-blue-500 cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Dedicada a la prestación del servicio público de transporte terrestre de carga o pasajeros.
                </p>
              </label>

              <label
                className={`flex flex-col p-3 rounded-lg border cursor-pointer transition ${
                  formData.misionalidad === 'NO_TRANSPORTE'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">Actividad Diferente a Transporte</span>
                  <input
                    type="radio"
                    name="misionalidad"
                    value="NO_TRANSPORTE"
                    checked={formData.misionalidad === 'NO_TRANSPORTE'}
                    onChange={() => setFormData({ ...formData, misionalidad: 'NO_TRANSPORTE' })}
                    className="accent-blue-500 cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Comercial, industrial, servicios o construcción que administra flotas o conductores propios/terceros.
                </p>
              </label>
            </div>
          </div>

          {/* Fleet & Driver numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <Truck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Vehículos Automotores</span>
              </label>
              <input
                type="number"
                min="0"
                required
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.vehiculosAutomotores}
                onChange={e => setFormData({ ...formData, vehiculosAutomotores: parseInt(e.target.value) || 0 })}
              />
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Buses, camiones, autos, camionetas</span>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <Truck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Vehículos No Automotores / Motos</span>
              </label>
              <input
                type="number"
                min="0"
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.vehiculosNoAutomotores}
                onChange={e => setFormData({ ...formData, vehiculosNoAutomotores: parseInt(e.target.value) || 0 })}
              />
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Motos, bicicletas o remolques</span>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Conductores Vinculados</span>
              </label>
              <input
                type="number"
                min="0"
                required
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.conductoresContratados}
                onChange={e => setFormData({ ...formData, conductoresContratados: parseInt(e.target.value) || 0 })}
              />
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Directos, temporales o tercerizados</span>
            </div>
          </div>

          {/* Level calculation outcome display */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-850 border border-blue-200 dark:border-blue-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  Nivel Obligatorio Resultante:
                </span>
                <div className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">NIVEL {nivelCalculado}</span>
                  <span className="text-xs font-normal text-slate-600 dark:text-slate-300">
                    ({getPasoCount(nivelCalculado)} de 24 pasos exigibles)
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded border border-blue-200 dark:border-blue-400/30">
                Art. 2 Res. 40595
              </span>
            </div>
          </div>

          {/* Responsible individuals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Representante Legal
              </label>
              <input
                type="text"
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.representanteLegal}
                onChange={e => setFormData({ ...formData, representanteLegal: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Líder del PESV Designado (Paso 1)
              </label>
              <input
                type="text"
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.liderPesv}
                onChange={e => setFormData({ ...formData, liderPesv: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ARL Vinculada
              </label>
              <input
                type="text"
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.arl}
                onChange={e => setFormData({ ...formData, arl: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Ciudad y Domicilio Principal
              </label>
              <input
                type="text"
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.ciudad}
                onChange={e => setFormData({ ...formData, ciudad: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
            <Info className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              Al guardar, el sistema ajustará automáticamente los filtros del ciclo PHVA para destacar los pasos que su empresa debe implementar obligatoriamente.
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 transition cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Aplicar Clasificación y Guardar</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
