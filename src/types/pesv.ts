export type Misionalidad = 'TRANSPORTE' | 'NO_TRANSPORTE';
export type PesvNivel = 'BASICO' | 'ESTANDAR' | 'AVANZADO';
export type PhvaFase = 'PLANEAR' | 'HACER' | 'VERIFICAR' | 'ACTUAR';
export type StepStatus = 'NO_INICIADO' | 'EN_PROCESO' | 'IMPLEMENTADO' | 'VENCIDO';
export type AlertSeverity = 'CRITICA' | 'MEDIA' | 'BAJA';

export interface Evidencia {
  id: string;
  pasoId: number;
  nombreArchivo: string;
  tamano: string;
  fechaSubida: string;
  subidoPor: string;
  comentario: string;
  estado: 'VALIDADO' | 'PENDIENTE_REVISION';
  tipo: 'PDF' | 'EXCEL' | 'IMAGEN' | 'ACTA' | 'INFORME';
}

export interface CriterioVerificacion {
  id: string;
  descripcion: string;
  cumple: boolean;
}

export interface PesvPaso {
  id: number;
  numero: number;
  fase: PhvaFase;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  requisitoNormativo: string;
  aplicaA: PesvNivel[];
  criterios: CriterioVerificacion[];
  estado: StepStatus;
  porcentajeAvance: number;
  responsableSugerido: string;
  frecuenciaActualizacion: string;
  plantillaSugerida: {
    nombre: string;
    contenido: string;
  };
  evidencias: Evidencia[];
  observacionesAuditoria?: string;
}

export interface AlertaPesv {
  id: string;
  pasoId: number;
  titulo: string;
  descripcion: string;
  severidad: AlertSeverity;
  fechaLimite: string;
  resuelto: boolean;
  riesgoLegal: string;
}

export interface Organizacion {
  razonSocial: string;
  nit: string;
  misionalidad: Misionalidad;
  vehiculosAutomotores: number;
  vehiculosNoAutomotores: number; // Motocicletas, bicicletas, etc.
  conductoresContratados: number;
  nivelCalculado: PesvNivel;
  representanteLegal: string;
  liderPesv: string;
  email: string;
  telefono: string;
  arl: string;
  ciudad: string;
}

export interface IndicadoresSiniestralidad {
  siniestrosTotales: number;
  danosMateriales: number;
  conLesionados: number;
  fatales: number;
  kmRecorridosFlota: number;
  tasaFrecuencia: number; // siniestros por millón de km
  tasaSeveridad: number;
  conductoresCapacitadosPorcentaje: number;
  inspeccionesPreoperacionalesPorcentaje: number;
  mantenimientosEjecutadosPorcentaje: number;
}
