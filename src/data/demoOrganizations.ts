import { Organizacion, IndicadoresSiniestralidad } from '../types/pesv';

export const ORGANIZACIONES_DEMO: { org: Organizacion; indicadores: IndicadoresSiniestralidad }[] = [
  {
    org: {
      razonSocial: 'TransExpreso Andino S.A.S.',
      nit: '900.584.219-4',
      misionalidad: 'TRANSPORTE',
      vehiculosAutomotores: 75,
      vehiculosNoAutomotores: 8,
      conductoresContratados: 110,
      nivelCalculado: 'AVANZADO',
      representanteLegal: 'Carlos Eduardo Restrepo Gómez',
      liderPesv: 'Ing. Sandra Milena Benítez (Lic. SST 4821)',
      email: 'seguridad.vial@transexpreso.com.co',
      telefono: '(+57) 310 845 2291',
      arl: 'ARL Positiva Compañía de Seguros',
      ciudad: 'Bogotá D.C., Colombia'
    },
    indicadores: {
      siniestrosTotales: 4,
      danosMateriales: 3,
      conLesionados: 1,
      fatales: 0,
      kmRecorridosFlota: 1420000,
      tasaFrecuencia: 2.81,
      tasaSeveridad: 1.2,
      conductoresCapacitadosPorcentaje: 82,
      inspeccionesPreoperacionalesPorcentaje: 96.5,
      mantenimientosEjecutadosPorcentaje: 94
    }
  },
  {
    org: {
      razonSocial: 'Logística & Distribución Urbana S.A.S.',
      nit: '830.124.956-1',
      misionalidad: 'NO_TRANSPORTE',
      vehiculosAutomotores: 58,
      vehiculosNoAutomotores: 12,
      conductoresContratados: 62,
      nivelCalculado: 'ESTANDAR',
      representanteLegal: 'María Fernanda Cárdenas',
      liderPesv: 'Esp. Jorge Alejandro Mora (Lic. SST 1184)',
      email: 'pesv@distribucionurbana.co',
      telefono: '(+57) 315 442 8810',
      arl: 'Seguros Bolívar ARL',
      ciudad: 'Medellín, Antioquia'
    },
    indicadores: {
      siniestrosTotales: 2,
      danosMateriales: 2,
      conLesionados: 0,
      fatales: 0,
      kmRecorridosFlota: 850000,
      tasaFrecuencia: 2.35,
      tasaSeveridad: 0.0,
      conductoresCapacitadosPorcentaje: 88,
      inspeccionesPreoperacionalesPorcentaje: 94.0,
      mantenimientosEjecutadosPorcentaje: 92
    }
  },
  {
    org: {
      razonSocial: 'Distribuciones del Oriente PyME',
      nit: '901.325.874-8',
      misionalidad: 'NO_TRANSPORTE',
      vehiculosAutomotores: 16,
      vehiculosNoAutomotores: 4,
      conductoresContratados: 19,
      nivelCalculado: 'BASICO',
      representanteLegal: 'Hernando Rojas Peña',
      liderPesv: 'Téc. Andrea Paola Ortiz',
      email: 'administracion@distoriente.com',
      telefono: '(+57) 320 671 4455',
      arl: 'ARL Sura',
      ciudad: 'Bucaramanga, Santander'
    },
    indicadores: {
      siniestrosTotales: 1,
      danosMateriales: 1,
      conLesionados: 0,
      fatales: 0,
      kmRecorridosFlota: 220000,
      tasaFrecuencia: 4.54,
      tasaSeveridad: 0.0,
      conductoresCapacitadosPorcentaje: 90,
      inspeccionesPreoperacionalesPorcentaje: 98.0,
      mantenimientosEjecutadosPorcentaje: 95
    }
  }
];
