/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PhvaBoard } from './components/PhvaBoard';
import { StatsDashboard } from './components/StatsDashboard';
import { AlertsManager } from './components/AlertsManager';
import { OfficialReportModal } from './components/OfficialReportModal';
import { OrganizationConfigModal } from './components/OrganizationConfigModal';
import { StepDetailModal } from './components/StepDetailModal';
import { EvidenceUploadModal } from './components/EvidenceUploadModal';
import { ThemeToggle, ThemeMode } from './components/ThemeToggle';

import { 
  Organizacion, 
  PesvPaso, 
  AlertaPesv, 
  IndicadoresSiniestralidad,
  Evidencia 
} from './types/pesv';
import { PASOS_PESV_INICIALES, ALERTAS_INICIALES, calcularNivelPesv } from './data/pesvStepsData';
import { ORGANIZACIONES_DEMO } from './data/demoOrganizations';

export default function App() {
  // Theme state: 'light' | 'dark' | 'system'
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('pesv_theme') as ThemeMode;
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      return saved;
    }
    return 'dark';
  });

  // Theme application effect
  useEffect(() => {
    localStorage.setItem('pesv_theme', theme);
    const applyTheme = () => {
      const isDark =
        theme === 'dark' ||
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    };

    applyTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  // Current organization state
  const [organizacion, setOrganizacion] = useState<Organizacion>(() => {
    const saved = localStorage.getItem('pesv_organizacion');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return ORGANIZACIONES_DEMO[0].org;
  });

  // Steps state with evidences and criteria
  const [pasos, setPasos] = useState<PesvPaso[]>(() => {
    const saved = localStorage.getItem('pesv_pasos');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return PASOS_PESV_INICIALES;
  });

  // Alerts state
  const [alertas, setAlertas] = useState<AlertaPesv[]>(() => {
    const saved = localStorage.getItem('pesv_alertas');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return ALERTAS_INICIALES;
  });

  // Current indicators
  const [indicadores, setIndicadores] = useState<IndicadoresSiniestralidad>(() => {
    const match = ORGANIZACIONES_DEMO.find(d => d.org.razonSocial === organizacion.razonSocial);
    return match ? match.indicadores : ORGANIZACIONES_DEMO[0].indicadores;
  });

  // Navigation tab
  const [pestanaActiva, setPestanaActiva] = useState<'PHVA' | 'ESTADISTICAS' | 'ALERTAS' | 'INFORME'>('PHVA');

  // Modals state
  const [pasoDetalleSeleccionado, setPasoDetalleSeleccionado] = useState<PesvPaso | null>(null);
  const [modalConfiguracionAbierto, setModalConfiguracionAbierto] = useState(false);
  const [modalSubirEvidenciaAbierto, setModalSubirEvidenciaAbierto] = useState(false);
  const [pasoPreseleccionadoSubida, setPasoPreseleccionadoSubida] = useState<number | undefined>(undefined);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('pesv_organizacion', JSON.stringify(organizacion));
  }, [organizacion]);

  useEffect(() => {
    localStorage.setItem('pesv_pasos', JSON.stringify(pasos));
  }, [pasos]);

  useEffect(() => {
    localStorage.setItem('pesv_alertas', JSON.stringify(alertas));
  }, [alertas]);

  // If company changes from demo selector, update indicators
  const handleCambiarOrganizacion = (nuevaOrg: Organizacion) => {
    setOrganizacion(nuevaOrg);
    const demo = ORGANIZACIONES_DEMO.find(d => d.org.razonSocial === nuevaOrg.razonSocial);
    if (demo) {
      setIndicadores(demo.indicadores);
    }
  };

  // Recalculate level if organization params change
  const handleGuardarConfiguracion = (orgActualizada: Organizacion) => {
    const nivelRecalculado = calcularNivelPesv(
      orgActualizada.misionalidad,
      orgActualizada.vehiculosAutomotores,
      orgActualizada.conductoresContratados
    );
    setOrganizacion({
      ...orgActualizada,
      nivelCalculado: nivelRecalculado
    });
  };

  // Step update handler
  const handleActualizarPaso = (pasoActualizado: PesvPaso) => {
    const nuevosPasos = pasos.map(p => p.id === pasoActualizado.id ? pasoActualizado : p);
    setPasos(nuevosPasos);
    if (pasoDetalleSeleccionado?.id === pasoActualizado.id) {
      setPasoDetalleSeleccionado(pasoActualizado);
    }
  };

  // Upload evidence handler
  const handleSubirEvidencia = (pasoId: number, nuevaEvidencia: Evidencia) => {
    const nuevosPasos = pasos.map(p => {
      if (p.id === pasoId) {
        return {
          ...p,
          evidencias: [nuevaEvidencia, ...p.evidencias]
        };
      }
      return p;
    });
    setPasos(nuevosPasos);
    if (pasoDetalleSeleccionado?.id === pasoId) {
      setPasoDetalleSeleccionado({
        ...pasoDetalleSeleccionado,
        evidencias: [nuevaEvidencia, ...pasoDetalleSeleccionado.evidencias]
      });
    }
  };

  // Toggle alert resolved
  const handleToggleResolverAlerta = (alertaId: string) => {
    const nuevasAlertas = alertas.map(a => 
      a.id === alertaId ? { ...a, resuelto: !a.resuelto } : a
    );
    setAlertas(nuevasAlertas);
  };

  // Create alert
  const handleCrearAlerta = (nuevaAlerta: AlertaPesv) => {
    setAlertas([nuevaAlerta, ...alertas]);
  };

  // Jump from alert to step
  const handleIrAPaso = (pasoId: number) => {
    const pasoTarget = pasos.find(p => p.id === pasoId);
    if (pasoTarget) {
      setPestanaActiva('PHVA');
      setPasoDetalleSeleccionado(pasoTarget);
    }
  };

  // Open direct upload modal
  const handleAbrirSubirEvidencia = (pasoId: number) => {
    setPasoPreseleccionadoSubida(pasoId);
    setModalSubirEvidenciaAbierto(true);
  };

  // Calculate metrics
  const pasosExigibles = pasos.filter(p => p.aplicaA.includes(organizacion.nivelCalculado));
  const pasosCumplidos = pasosExigibles.filter(p => p.estado === 'IMPLEMENTADO').length;
  const porcentajeCumplimiento = pasosExigibles.length > 0 
    ? Math.round((pasosCumplidos / pasosExigibles.length) * 100) 
    : 0;
  const totalAlertasCriticas = alertas.filter(a => !a.resuelto && a.severidad === 'CRITICA').length;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white transition-colors duration-200">
      
      {/* App Header with Theme Toggle Botonera */}
      <Header
        organizacion={organizacion}
        onCambiarOrganizacion={handleCambiarOrganizacion}
        onAbrirConfiguracion={() => setModalConfiguracionAbierto(true)}
        pestanaActiva={pestanaActiva}
        onCambiarPestana={setPestanaActiva}
        totalAlertasCriticas={totalAlertasCriticas}
        porcentajeCumplimiento={porcentajeCumplimiento}
        pasosExigiblesCount={pasosExigibles.length}
        pasosCumplidosCount={pasosCumplidos}
        theme={theme}
        onThemeChange={setTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {pestanaActiva === 'PHVA' && (
          <PhvaBoard
            pasos={pasos}
            nivelOrganizacion={organizacion.nivelCalculado}
            onAbrirDetallePaso={(p) => setPasoDetalleSeleccionado(p)}
            onAbrirSubirEvidencia={handleAbrirSubirEvidencia}
          />
        )}

        {pestanaActiva === 'ESTADISTICAS' && (
          <StatsDashboard
            organizacion={organizacion}
            pasos={pasos}
            indicadores={indicadores}
          />
        )}

        {pestanaActiva === 'ALERTAS' && (
          <AlertsManager
            alertas={alertas}
            pasos={pasos}
            onToggleResolverAlerta={handleToggleResolverAlerta}
            onCrearAlerta={handleCrearAlerta}
            onIrAPaso={handleIrAPaso}
          />
        )}

        {pestanaActiva === 'INFORME' && (
          <OfficialReportModal
            organizacion={organizacion}
            pasos={pasos}
            indicadores={indicadores}
          />
        )}

      </main>

      {/* Floating Theme Keypad (Botonera flotante de acceso rápido) */}
      <ThemeToggle
        theme={theme}
        onThemeChange={setTheme}
        variant="floating"
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950/80 py-4 text-center text-xs text-slate-500 dark:text-slate-400 print:hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            PESV Manager Colombia • Metodología Oficial Resolución 40595 de 2022 (Ministerio de Transporte)
          </span>
          <span className="text-slate-500 dark:text-slate-400">
            Ciclo PHVA: Planear • Hacer • Verificar • Actuar
          </span>
        </div>
      </footer>

      {/* Organization Configuration Modal */}
      <OrganizationConfigModal
        isOpen={modalConfiguracionAbierto}
        onClose={() => setModalConfiguracionAbierto(false)}
        organizacion={organizacion}
        onGuardar={handleGuardarConfiguracion}
      />

      {/* Step Audit & Details Modal */}
      {pasoDetalleSeleccionado && (
        <StepDetailModal
          paso={pasoDetalleSeleccionado}
          nivelOrganizacion={organizacion.nivelCalculado}
          onClose={() => setPasoDetalleSeleccionado(null)}
          onActualizarPaso={handleActualizarPaso}
          onAbrirSubirEvidencia={handleAbrirSubirEvidencia}
          onSeleccionarPasoId={(id) => {
            const encontrado = pasos.find(p => p.id === id);
            if (encontrado) setPasoDetalleSeleccionado(encontrado);
          }}
          totalPasos={pasos.length}
        />
      )}

      {/* Evidence Upload Modal */}
      <EvidenceUploadModal
        isOpen={modalSubirEvidenciaAbierto}
        onClose={() => {
          setModalSubirEvidenciaAbierto(false);
          setPasoPreseleccionadoSubida(undefined);
        }}
        pasos={pasos}
        pasoPreseleccionadoId={pasoPreseleccionadoSubida}
        onSubirEvidencia={handleSubirEvidencia}
      />

    </div>
  );
}
