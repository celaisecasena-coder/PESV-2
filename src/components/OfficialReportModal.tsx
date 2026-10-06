import React from 'react';
import { 
  Printer, 
  Download, 
  FileCheck, 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { Organizacion, PesvPaso, IndicadoresSiniestralidad } from '../types/pesv';

interface OfficialReportModalProps {
  organizacion: Organizacion;
  pasos: PesvPaso[];
  indicadores: IndicadoresSiniestralidad;
}

export const OfficialReportModal: React.FC<OfficialReportModalProps> = ({
  organizacion,
  pasos,
  indicadores
}) => {
  const pasosExigibles = pasos.filter(p => p.aplicaA.includes(organizacion.nivelCalculado));
  const pasosImplementados = pasosExigibles.filter(p => p.estado === 'IMPLEMENTADO').length;
  const porcentajeCumplimiento = pasosExigibles.length > 0 
    ? Math.round((pasosImplementados / pasosExigibles.length) * 100) 
    : 0;

  const fechaActual = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleImprimir = () => {
    window.print();
  };

  const totalEvidencias = pasosExigibles.reduce((sum, p) => sum + p.evidencias.length, 0);

  return (
    <div className="space-y-6">
      
      {/* Top action toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-blue-400" />
            <span>Informe Oficial de Autoevaluación del PESV</span>
          </h2>
          <p className="text-xs text-slate-400">
            Documento técnico generado para presentación ante el Ministerio de Transporte, Superintendencia o ARL.
          </p>
        </div>

        <button
          onClick={handleImprimir}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir / Exportar a PDF</span>
        </button>
      </div>

      {/* Official Printable Document Container */}
      <div className="bg-white text-slate-900 rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-200 max-w-5xl mx-auto print:border-none print:shadow-none print:p-0 print:m-0 font-sans">
        
        {/* Institutional Header */}
        <div className="border-b-2 border-slate-900 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-blue-700 uppercase">
                REPÚBLICA DE COLOMBIA • MINISTERIO DE TRANSPORTE
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 uppercase">
                Informe de Autoevaluación y Verificación del PESV
              </h1>
              <p className="text-xs text-slate-600 font-semibold mt-0.5">
                Metodología de Diseño, Implementación y Verificación — Resolución 40595 de 2022
              </p>
            </div>

            <div className="text-right sm:border-l-2 sm:border-slate-300 sm:pl-4">
              <span className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-extrabold rounded">
                NIVEL {organizacion.nivelCalculado}
              </span>
              <div className="text-[11px] text-slate-500 mt-1">
                Fecha de Emisión: <strong>{fechaActual}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Company Profile */}
        <div className="mb-6">
          <h2 className="text-xs font-bold text-white bg-slate-900 px-3 py-1.5 rounded uppercase tracking-wider mb-3">
            1. Información General de la Organización y Clasificación Legal
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500 block">Razón Social:</span>
              <strong className="text-slate-900">{organizacion.razonSocial}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">NIT:</span>
              <strong className="text-slate-900">{organizacion.nit}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Misionalidad:</span>
              <strong className="text-slate-900">
                {organizacion.misionalidad === 'TRANSPORTE' ? 'Empresa de Transporte' : 'Actividad Diferente a Transporte'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block">Ciudad / Domicilio:</span>
              <strong className="text-slate-900">{organizacion.ciudad}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Vehículos Automotores:</span>
              <strong className="text-slate-900">{organizacion.vehiculosAutomotores} unidades</strong>
            </div>
            <div>
              <span className="text-slate-500 block">No Automotores / Motos:</span>
              <strong className="text-slate-900">{organizacion.vehiculosNoAutomotores} unidades</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Conductores Vinculados:</span>
              <strong className="text-slate-900">{organizacion.conductoresContratados} personas</strong>
            </div>
            <div>
              <span className="text-slate-500 block">ARL Afiliada:</span>
              <strong className="text-slate-900">{organizacion.arl}</strong>
            </div>
          </div>
        </div>

        {/* Section 2: Executive PHVA Summary */}
        <div className="mb-6">
          <h2 className="text-xs font-bold text-white bg-slate-900 px-3 py-1.5 rounded uppercase tracking-wider mb-3">
            2. Resumen Ejecutivo del Ciclo PHVA & Madurez Técnica
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center mb-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <span className="text-[10px] font-bold text-blue-700 uppercase">Cumplimiento Global</span>
              <div className="text-2xl font-black text-blue-900">{porcentajeCumplimiento}%</div>
              <span className="text-[10px] text-slate-500">
                {porcentajeCumplimiento >= 85 ? 'Sobresaliente' : porcentajeCumplimiento >= 60 ? 'Aceptable' : 'Crítico'}
              </span>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="text-[10px] font-bold text-emerald-700 uppercase">Pasos Implementados</span>
              <div className="text-2xl font-black text-emerald-900">{pasosImplementados} de {pasosExigibles.length}</div>
              <span className="text-[10px] text-slate-500">Requisitos cumplidos</span>
            </div>
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl">
              <span className="text-[10px] font-bold text-indigo-700 uppercase">Evidencias Soportadas</span>
              <div className="text-2xl font-black text-indigo-900">{totalEvidencias}</div>
              <span className="text-[10px] text-slate-500">Archivos y actas indexadas</span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <span className="text-[10px] font-bold text-amber-700 uppercase">Fatalidades Viales</span>
              <div className="text-2xl font-black text-amber-900">{indicadores.fatales} (CERO)</div>
              <span className="text-[10px] text-slate-500">Objetivo Visión Cero</span>
            </div>
          </div>
        </div>

        {/* Section 3: Detailed Step Audit Table */}
        <div className="mb-6">
          <h2 className="text-xs font-bold text-white bg-slate-900 px-3 py-1.5 rounded uppercase tracking-wider mb-3">
            3. Matriz de Cumplimiento Requisito por Requisito (Resolución 40595)
          </h2>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-2.5 text-center w-12">Paso</th>
                  <th className="p-2.5 w-24">Fase</th>
                  <th className="p-2.5">Requerimiento Normativo</th>
                  <th className="p-2.5 text-center w-28">Estado</th>
                  <th className="p-2.5 text-center w-20">Avance</th>
                  <th className="p-2.5 text-center w-24">Evidencias</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {pasosExigibles.map((paso) => (
                  <tr key={paso.id} className="hover:bg-slate-50">
                    <td className="p-2.5 text-center font-bold text-slate-900">{paso.numero}</td>
                    <td className="p-2.5 font-medium text-slate-600">{paso.fase}</td>
                    <td className="p-2.5">
                      <div className="font-semibold text-slate-900">{paso.titulo}</div>
                      <div className="text-[11px] text-slate-500">{paso.requisitoNormativo}</div>
                    </td>
                    <td className="p-2.5 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        paso.estado === 'IMPLEMENTADO' 
                          ? 'bg-emerald-100 text-emerald-800'
                          : paso.estado === 'EN_PROCESO'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {paso.estado}
                      </span>
                    </td>
                    <td className="p-2.5 text-center font-bold text-slate-800">{paso.porcentajeAvance}%</td>
                    <td className="p-2.5 text-center font-semibold text-blue-700">
                      {paso.evidencias.length} soporte(s)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: Technical Conclusion & Signatures */}
        <div className="mt-8 pt-6 border-t border-slate-300">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            4. Concepto Técnico de Idoneidad y Declaración de Veracidad
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed mb-8">
            Se certifica que la información consignada en este informe técnico refleja fidedignamente el estado de diseño, implementación y verificación del Plan Estratégico de Seguridad Vial (PESV) de <strong>{organizacion.razonSocial}</strong>, en cabal cumplimiento de la Ley 1503 de 2011, la Ley 2050 de 2020 y la Resolución 40595 de 2022 del Ministerio de Transporte de la República de Colombia.
          </p>

          <div className="grid grid-cols-2 gap-12 pt-10 text-xs">
            <div className="border-t border-slate-900 pt-2 text-center">
              <strong className="block text-slate-900 font-bold">{organizacion.representanteLegal}</strong>
              <span className="text-slate-600">Representante Legal</span>
              <span className="block text-[11px] text-slate-500">C.C. Documento de Identidad</span>
            </div>

            <div className="border-t border-slate-900 pt-2 text-center">
              <strong className="block text-slate-900 font-bold">{organizacion.liderPesv}</strong>
              <span className="text-slate-600">Líder del PESV Designado (Paso 1)</span>
              <span className="block text-[11px] text-slate-500">Licencia SST / Certificado de Idoneidad Vial</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
