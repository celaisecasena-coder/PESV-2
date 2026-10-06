import { PesvPaso, PesvNivel, Misionalidad } from '../types/pesv';

export function calcularNivelPesv(
  misionalidad: Misionalidad,
  vehiculosAutomotores: number,
  conductores: number
): PesvNivel {
  if (misionalidad === 'TRANSPORTE') {
    // Empresas de transporte público / de carga / mixto
    if (vehiculosAutomotores > 50 || conductores > 100) {
      return 'AVANZADO';
    } else if (vehiculosAutomotores >= 20 || conductores >= 51) {
      return 'ESTANDAR';
    } else {
      return 'BASICO';
    }
  } else {
    // Organizaciones no dedicadas al transporte
    if (vehiculosAutomotores > 100 || conductores > 100) {
      return 'AVANZADO';
    } else if (vehiculosAutomotores >= 50 || conductores >= 50) {
      return 'ESTANDAR';
    } else {
      return 'BASICO';
    }
  }
}

export const PASOS_PESV_INICIALES: PesvPaso[] = [
  // FASE 1: PLANEAR (Pasos 1 al 8)
  {
    id: 1,
    numero: 1,
    fase: 'PLANEAR',
    titulo: 'Líder del diseño e implementación del PESV',
    subtitulo: 'Designación formal del responsable con idoneidad y recursos',
    descripcion: 'El nivel directivo debe designar formalmente una persona con el perfil, competencia y autoridad requerida para liderar el diseño, implementación, seguimiento y mejora del PESV.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 1. Art. 12 Ley 1503 de 2011.',
    aplicaA: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 100,
    responsableSugerido: 'Alta Dirección / Gerencia General',
    frecuenciaActualizacion: 'Anual o ante cambio de cargo',
    plantillaSugerida: {
      nombre: 'Acta de Designación del Líder del PESV.docx',
      contenido: `ACTA DE DESIGNACIÓN DE LÍDER DEL PESV
En la ciudad de Bogotá D.C., a los [FECHA], la Gerencia General de [EMPRESA] en cumplimiento del Paso 1 de la Resolución 40595 de 2022 del Ministerio de Transporte, procede a designar a [NOMBRE DEL LÍDER], identificado con CC [DOCUMENTO], como Líder Responsable del Diseño e Implementación del Plan Estratégico de Seguridad Vial (PESV).

El Líder contará con la autonomía, autoridad y asignación presupuestal para gestionar los 24 pasos del ciclo PHVA.`
    },
    criterios: [
      { id: '1-1', descripcion: 'Acto formal de designación suscrito por el Representante Legal.', cumple: true },
      { id: '1-2', descripcion: 'Definición de roles, responsabilidades y autoridad asignada.', cumple: true },
      { id: '1-3', descripcion: 'Certificado de idoneidad o formación en Seguridad Vial / SG-SST.', cumple: true }
    ],
    evidencias: [
      {
        id: 'ev-1',
        pasoId: 1,
        nombreArchivo: 'Acta_Designacion_Lider_PESV_2026.pdf',
        tamano: '2.4 MB',
        fechaSubida: '2026-02-10',
        subidoPor: 'Gerencia General',
        comentario: 'Acta firmada con asignación presupuestal y perfil de competencia.',
        estado: 'VALIDADO',
        tipo: 'ACTA'
      }
    ]
  },
  {
    id: 2,
    numero: 2,
    fase: 'PLANEAR',
    titulo: 'Comité de Seguridad Vial',
    subtitulo: 'Conformación y actas de reuniones periódicas',
    descripcion: 'Instancia de coordinación, seguimiento y toma de decisiones estratégicas del PESV, conformada por líderes de áreas clave y directivos.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 2. Guía Técnica Capitulo I.',
    aplicaA: ['ESTANDAR', 'AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 100,
    responsableSugerido: 'Líder PESV / Miembros del Comité',
    frecuenciaActualizacion: 'Reunión ordinaria mínima trimestral',
    plantillaSugerida: {
      nombre: 'Acta_Conformacion_Comite_Seguridad_Vial.docx',
      contenido: `ACTA DE CONSTITUCIÓN DEL COMITÉ DE SEGURIDAD VIAL (CSV)
En concordancia con el Paso 2 de la Res. 40595 de 2022, se reúnen los representantes de Operaciones, Mantenimiento, Gestión Humana y SST para conformar el Comité de Seguridad Vial.
Objetivo: Diseñar, coordinar y verificar las acciones preventivas en las vías.`
    },
    criterios: [
      { id: '2-1', descripcion: 'Acta formal de conformación con miembros principales y suplentes.', cumple: true },
      { id: '2-2', descripcion: 'Reglamento interno de funcionamiento del comité.', cumple: true },
      { id: '2-3', descripcion: 'Actas de reunión periódicas con seguimiento a compromisos viales.', cumple: true }
    ],
    evidencias: [
      {
        id: 'ev-2',
        pasoId: 2,
        nombreArchivo: 'Acta_Comite_SV_Q1_2026.pdf',
        tamano: '1.8 MB',
        fechaSubida: '2026-03-15',
        subidoPor: 'Líder PESV',
        comentario: 'Reunión de seguimiento al plan de intervención de puntos críticos.',
        estado: 'VALIDADO',
        tipo: 'ACTA'
      }
    ]
  },
  {
    id: 3,
    numero: 3,
    fase: 'PLANEAR',
    titulo: 'Política de Seguridad Vial de la Organización',
    subtitulo: 'Compromiso explícito, divulgación y firma de la alta gerencia',
    descripcion: 'Declaración documentada de la alta dirección donde se establece el compromiso con la prevención de siniestros, el cumplimiento legal y la mejora continua.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 3. Directriz ISO 39001.',
    aplicaA: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 100,
    responsableSugerido: 'Representante Legal y Alta Dirección',
    frecuenciaActualizacion: 'Anual o ante cambios estructurales',
    plantillaSugerida: {
      nombre: 'Politica_Seguridad_Vial_Modelo_Res40595.docx',
      contenido: `POLÍTICA DE SEGURIDAD VIAL DE [EMPRESA]
[EMPRESA] se compromete a proteger la vida e integridad de todos los actores viales (conductores, peatones, ciclistas y pasajeros) mediante el estricto cumplimiento de las normas de tránsito colombianas, el no uso de dispositivos distractores al conducir, la tolerancia cero al alcohol/sustancias y la realización de mantenimientos preventivos continuos.`
    },
    criterios: [
      { id: '3-1', descripcion: 'Política fechada y firmada por el Representante Legal vigente.', cumple: true },
      { id: '3-2', descripcion: 'Contiene compromisos claros: velocidad, no alcohol, no distractores, descanso.', cumple: true },
      { id: '3-3', descripcion: 'Evidencia de divulgación a todos los colaboradores y conductores.', cumple: true }
    ],
    evidencias: [
      {
        id: 'ev-3',
        pasoId: 3,
        nombreArchivo: 'Politica_Seguridad_Vial_Firmada_2026.pdf',
        tamano: '1.1 MB',
        fechaSubida: '2026-01-15',
        subidoPor: 'Líder PESV',
        comentario: 'Política firmada por Representante Legal y registros de divulgación.',
        estado: 'VALIDADO',
        tipo: 'PDF'
      }
    ]
  },
  {
    id: 4,
    numero: 4,
    fase: 'PLANEAR',
    titulo: 'Liderazgo, compromiso y corresponsabilidad del nivel directivo',
    subtitulo: 'Asignación de recursos financieros, técnicos y humanos',
    descripcion: 'Demostración tangible de la dirección en el suministro de recursos, revisión por la dirección y participación activa en la cultura vial.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 4.',
    aplicaA: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 100,
    responsableSugerido: 'Gerencia General / Junta Directiva',
    frecuenciaActualizacion: 'Anual',
    plantillaSugerida: {
      nombre: 'Presupuesto_Recursos_PESV_2026.xlsx',
      contenido: `ASIGNACIÓN PRESUPUESTAL Y DE RECURSOS PARA PESV 2026
Rubros: Formación vial, mantenimiento preventivo de flota, inspecciones, elementos de protección vial, tecnología telemática.`
    },
    criterios: [
      { id: '4-1', descripcion: 'Presupuesto anual asignado y aprobado para el PESV.', cumple: true },
      { id: '4-2', descripcion: 'Mecanismo de rendición de cuentas anual de la gerencia.', cumple: true },
      { id: '4-3', descripcion: 'Definición de consecuencias ante infracciones y buenas prácticas.', cumple: true }
    ],
    evidencias: [
      {
        id: 'ev-4',
        pasoId: 4,
        nombreArchivo: 'Presupuesto_Aprobado_PESV_2026.pdf',
        tamano: '3.1 MB',
        fechaSubida: '2026-01-20',
        subidoPor: 'Financiera',
        comentario: 'Aprobación presupuestal por $85.000.000 COP para el programa vial.',
        estado: 'VALIDADO',
        tipo: 'EXCEL'
      }
    ]
  },
  {
    id: 5,
    numero: 5,
    fase: 'PLANEAR',
    titulo: 'Diagnóstico Integral',
    subtitulo: 'Caracterización de flota, conductores, rutas y siniestralidad histórica',
    descripcion: 'Levantamiento de información sobre cantidad de vehículos, tipos de contrato de conductores, desplazamientos misionales e in itinere y antecedentes de siniestros.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 5.',
    aplicaA: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 100,
    responsableSugerido: 'Líder PESV / Operaciones',
    frecuenciaActualizacion: 'Anual o ante variaciones significativas',
    plantillaSugerida: {
      nombre: 'Matriz_Diagnostico_Flota_Conductores.xlsx',
      contenido: `DIAGNÓSTICO BASAL PESV
Censo de conductores, tipo de licencia, vigencia médica, caracterización de flota propia, arrendada y de terceros.`
    },
    criterios: [
      { id: '5-1', descripcion: 'Inventario consolidado de flota (automotores y no automotores).', cumple: true },
      { id: '5-2', descripcion: 'Censo de colaboradores que realizan desplazamientos laborales.', cumple: true },
      { id: '5-3', descripcion: 'Historial de siniestros viales de los últimos 3 años.', cumple: true }
    ],
    evidencias: [
      {
        id: 'ev-5',
        pasoId: 5,
        nombreArchivo: 'Informe_Diagnostico_PESV_Actualizado.pdf',
        tamano: '4.5 MB',
        fechaSubida: '2026-02-01',
        subidoPor: 'Líder PESV',
        comentario: 'Línea base completa con datos de conductores y tipología vehicular.',
        estado: 'VALIDADO',
        tipo: 'INFORME'
      }
    ]
  },
  {
    id: 6,
    numero: 6,
    fase: 'PLANEAR',
    titulo: 'Caracterización, evaluación y control de riesgos viales',
    subtitulo: 'Matriz de identificación y valoración de peligros en la vía',
    descripcion: 'Metodología para identificar peligros viales, evaluar el nivel de probabilidad y consecuencia, y fijar medidas de control en la fuente, medio y persona.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 6. Metodología GTC 45 / Guía Técnica.',
    aplicaA: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 90,
    responsableSugerido: 'Especialista en SST / Líder PESV',
    frecuenciaActualizacion: 'Mínimo una vez al año',
    plantillaSugerida: {
      nombre: 'Matriz_Riesgos_Viales_GTC45_Res40595.xlsx',
      contenido: `MATRIZ DE RIESGOS VIALES
Identificación de riesgos: exceso de velocidad, fatiga y somnolencia, estado de vías, clima, fallas mecánicas, interacción con peatones y motociclistas.`
    },
    criterios: [
      { id: '6-1', descripcion: 'Matriz de riesgos viales con valoración de probabilidad y severidad.', cumple: true },
      { id: '6-2', descripcion: 'Planes de control definidos para los riesgos calificados como no tolerables.', cumple: true },
      { id: '6-3', descripcion: 'Participación documentada de los conductores en la identificación.', cumple: false }
    ],
    evidencias: [
      {
        id: 'ev-6',
        pasoId: 6,
        nombreArchivo: 'Matriz_Riesgos_Viales_V3_2026.xlsx',
        tamano: '2.9 MB',
        fechaSubida: '2026-02-18',
        subidoPor: 'Seguridad y Salud',
        comentario: 'Matriz ajustada según corredores viales nacionales y urbanos.',
        estado: 'VALIDADO',
        tipo: 'EXCEL'
      }
    ]
  },
  {
    id: 7,
    numero: 7,
    fase: 'PLANEAR',
    titulo: 'Objetivos y metas del PESV',
    subtitulo: 'Definición SMART enfocada en reducción de siniestros',
    descripcion: 'Objetivos medibles, coherentes con la política, que buscan disminuir la tasa de siniestralidad, infracciones de tránsito y mejorar la cultura preventiva.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 7.',
    aplicaA: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 100,
    responsableSugerido: 'Comité de Seguridad Vial / Líder PESV',
    frecuenciaActualizacion: 'Anual',
    plantillaSugerida: {
      nombre: 'Ficha_Tecnica_Objetivos_Metas_PESV.docx',
      contenido: `OBJETIVOS Y METAS DEL PESV
1. Reducir en un 25% la tasa de siniestros con daños materiales.
2. Mantener en CERO (0) las fatalidades viales de colaboradores y terceros.
3. Cumplir con el 95% del plan anual de formación en conducción segura.
4. Alcanzar el 98% en inspecciones preoperacionales oportunas.`
    },
    criterios: [
      { id: '7-1', descripcion: 'Objetivos alineados a la política de seguridad vial.', cumple: true },
      { id: '7-2', descripcion: 'Metas cuantificables con indicadores y periodicidad de medición.', cumple: true },
      { id: '7-3', descripcion: 'Plan de acción para el logro de cada objetivo formulado.', cumple: true }
    ],
    evidencias: [
      {
        id: 'ev-7',
        pasoId: 7,
        nombreArchivo: 'Ficha_Objetivos_Metas_2026.pdf',
        tamano: '950 KB',
        fechaSubida: '2026-01-25',
        subidoPor: 'Líder PESV',
        comentario: 'Aprobados por el Comité de Seguridad Vial en sesión inaugural.',
        estado: 'VALIDADO',
        tipo: 'PDF'
      }
    ]
  },
  {
    id: 8,
    numero: 8,
    fase: 'PLANEAR',
    titulo: 'Programas de gestión de riesgos críticos y factores de desempeño',
    subtitulo: 'Velocidad, alcohol, sustancias, fatiga, distractores y EPP vial',
    descripcion: 'Estructuración de programas prioritarios de prevención: regulación de velocidad, prevención de la fatiga, no consumo de alcohol/drogas, no uso de celular y uso de cinturón/casco.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 8.',
    aplicaA: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 100,
    responsableSugerido: 'Líder PESV / Talento Humano',
    frecuenciaActualizacion: 'Semestral',
    plantillaSugerida: {
      nombre: 'Programa_Prevencion_Fatiga_Velocidad.docx',
      contenido: `PROGRAMAS DE GESTIÓN DE RIESGOS CRÍTICOS
- Programa de Control de Velocidad y Telemetría
- Programa de Prevención del Uso de Celular y Distractores
- Programa de Control de Sustancias Psicoactivas y Alcoholimetría
- Programa de Descanso y Prevención de Fatiga (máx 8h de conducción continua)`
    },
    criterios: [
      { id: '8-1', descripcion: 'Protocolo de control de velocidad y límites organizacionales.', cumple: true },
      { id: '8-2', descripcion: 'Protocolo de pruebas de alcoholimetría aleatorias.', cumple: true },
      { id: '8-3', descripcion: 'Protocolo de tiempos de descanso y pausas activas en ruta.', cumple: true }
    ],
    evidencias: [
      {
        id: 'ev-8',
        pasoId: 8,
        nombreArchivo: 'Programas_Riesgos_Criticos_Manual.pdf',
        tamano: '3.7 MB',
        fechaSubida: '2026-02-12',
        subidoPor: 'Líder PESV',
        comentario: 'Contiene los 5 programas mínimos obligatorios según Res 40595.',
        estado: 'VALIDADO',
        tipo: 'PDF'
      }
    ]
  },

  // FASE 2: HACER (Pasos 9 al 19)
  {
    id: 9,
    numero: 9,
    fase: 'HACER',
    titulo: 'Plan Anual de Trabajo',
    subtitulo: 'Cronograma detallado con responsables, fechas y presupuesto',
    descripcion: 'Documento operativo que desglosa todas las actividades del PESV para la vigencia anual, con cronograma, recursos y porcentaje de ejecución.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 9.',
    aplicaA: ['ESTANDAR', 'AVANZADO'],
    estado: 'EN_PROCESO',
    porcentajeAvance: 75,
    responsableSugerido: 'Líder PESV',
    frecuenciaActualizacion: 'Mensual',
    plantillaSugerida: {
      nombre: 'Plan_Anual_Trabajo_PESV_2026.xlsx',
      contenido: `CRONOGRAMA PLAN ANUAL DE TRABAJO PESV
Fases PHVA, fechas de inicio y fin, responsable asignado, presupuesto ejecutado y porcentaje de avance mensual.`
    },
    criterios: [
      { id: '9-1', descripcion: 'Cronograma estructurado con actividades articuladas al PHVA.', cumple: true },
      { id: '9-2', descripcion: 'Asignación de responsables directos por cada actividad.', cumple: true },
      { id: '9-3', descripcion: 'Seguimiento bimensual documentado del porcentaje de cumplimiento.', cumple: false }
    ],
    evidencias: [
      {
        id: 'ev-9',
        pasoId: 9,
        nombreArchivo: 'Plan_Trabajo_PESV_Cronograma_2026.xlsx',
        tamano: '1.4 MB',
        fechaSubida: '2026-01-30',
        subidoPor: 'Líder PESV',
        comentario: 'Cronograma general 2026 con cortes de verificación trimestrales.',
        estado: 'VALIDADO',
        tipo: 'EXCEL'
      }
    ]
  },
  {
    id: 10,
    numero: 10,
    fase: 'HACER',
    titulo: 'Competencia y plan anual de formación',
    subtitulo: 'Perfiles de cargo, selección y capacitaciones técnicas en vía',
    descripcion: 'Definición de perfiles para conductores, pruebas teórico-prácticas en selección, inducción vial y plan de capacitación anual continuo.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 10.',
    aplicaA: ['ESTANDAR', 'AVANZADO'],
    estado: 'EN_PROCESO',
    porcentajeAvance: 65,
    responsableSugerido: 'Gestión Humana / Seguridad Vial',
    frecuenciaActualizacion: 'Trimestral',
    plantillaSugerida: {
      nombre: 'Plan_Capacitacion_Vial_Conductores.xlsx',
      contenido: `PLAN ANUAL DE FORMACIÓN EN SEGURIDAD VIAL
Módulos: Manejo defensivo, primeros auxilios viales, mecánica básica de emergencia, normatividad de tránsito, gestión del estrés vial.`
    },
    criterios: [
      { id: '10-1', descripcion: 'Perfil de cargo de conductor con requisitos de experiencia y licencias.', cumple: true },
      { id: '10-2', descripcion: 'Pruebas teórico-prácticas de ingreso registradas.', cumple: true },
      { id: '10-3', descripcion: 'Plan de capacitación ejecutado con coberturas mayores al 80%.', cumple: false }
    ],
    evidencias: [
      {
        id: 'ev-10',
        pasoId: 10,
        nombreArchivo: 'Matriz_Capacitaciones_Viales_Q1.pdf',
        tamano: '2.8 MB',
        fechaSubida: '2026-03-01',
        subidoPor: 'Talento Humano',
        comentario: 'Registros de asistencia al taller de manejo defensivo.',
        estado: 'VALIDADO',
        tipo: 'PDF'
      }
    ]
  },
  {
    id: 11,
    numero: 11,
    fase: 'HACER',
    titulo: 'Responsabilidad y comportamiento seguro',
    subtitulo: 'Procedimiento de evaluación de hábitos de conducción y comparendos',
    descripcion: 'Mecanismos para monitorear comportamientos en la vía, consulta periódica de comparendos en SIMIT, retroalimentación y reconocimientos a conductores seguros.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 11.',
    aplicaA: ['ESTANDAR', 'AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 85,
    responsableSugerido: 'Jefatura de Operaciones / Tráfico',
    frecuenciaActualizacion: 'Mensual',
    plantillaSugerida: {
      nombre: 'Control_Comparendos_SIMIT_Conductores.xlsx',
      contenido: `VERIFICACIÓN SISTEMA SIMIT Y COMPORTAMIENTO
Registro mensual de consulta de comparendos de la totalidad de conductores vinculados y acuerdos de pago.`
    },
    criterios: [
      { id: '11-1', descripcion: 'Verificación mensual del historial de comparendos en el SIMIT.', cumple: true },
      { id: '11-2', descripcion: 'Procedimiento documentado de incentivos al conductor ejemplar.', cumple: true },
      { id: '11-3', descripcion: 'Medidas pedagógicas ante infracciones reiteradas.', cumple: true }
    ],
    evidencias: [
      {
        id: 'ev-11',
        pasoId: 11,
        nombreArchivo: 'Reporte_SIMIT_Conductores_Febrero_2026.pdf',
        tamano: '890 KB',
        fechaSubida: '2026-02-28',
        subidoPor: 'Jefe de Operaciones',
        comentario: 'Verificación de paz y salvo de la flota de conductores activos.',
        estado: 'VALIDADO',
        tipo: 'PDF'
      }
    ]
  },
  {
    id: 12,
    numero: 12,
    fase: 'HACER',
    titulo: 'Plan de preparación y respuesta ante emergencias viales',
    subtitulo: 'Protocolos PAS (Proteger, Avisar, Socorrer) y simulacros',
    descripcion: 'Procedimientos operativos normalizados ante siniestros viales en ruta, varadas técnicas, atropellamientos, incendios y coordinación con autoridades.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 12.',
    aplicaA: ['ESTANDAR', 'AVANZADO'],
    estado: 'EN_PROCESO',
    porcentajeAvance: 60,
    responsableSugerido: 'Brigada de Emergencia / Líder PESV',
    frecuenciaActualizacion: 'Anual o posterior a simulacro',
    plantillaSugerida: {
      nombre: 'Protocolo_Emergencias_Viales_PAS.docx',
      contenido: `PLAN DE RESPUESTA A EMERGENCIAS VIALES
Protocolo PAS (Proteger la escena, Avisar a líneas 123 y aseguradora, Socorrer a víctimas sin comprometer su estado). Directorio de centros de salud y Policía de Tránsito.`
    },
    criterios: [
      { id: '12-1', descripcion: 'Protocolo de respuesta ante siniestros divulgado a conductores.', cumple: true },
      { id: '12-2', descripcion: 'Directorio telefónico de emergencias actualizado en cada cabina.', cumple: true },
      { id: '12-3', descripcion: 'Simulacro de emergencia vial ejecutado en el último año.', cumple: false }
    ],
    evidencias: [
      {
        id: 'ev-12',
        pasoId: 12,
        nombreArchivo: 'Cartilla_Emergencias_Viales_Conductor.pdf',
        tamano: '3.3 MB',
        fechaSubida: '2026-01-18',
        subidoPor: 'Líder PESV',
        comentario: 'Guía plastificada entregada a conductores para atención de emergencias.',
        estado: 'VALIDADO',
        tipo: 'PDF'
      }
    ]
  },
  {
    id: 13,
    numero: 13,
    fase: 'HACER',
    titulo: 'Investigación interna de siniestros viales',
    subtitulo: 'Metodología causa-raíz y lecciones aprendidas',
    descripcion: 'Procedimiento técnico para investigar todos los siniestros viales leves, graves y fatales ocurridos durante la operación con el fin de determinar causas inmediatas y básicas.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 13.',
    aplicaA: ['ESTANDAR', 'AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 90,
    responsableSugerido: 'Comité de Investigación de Siniestros',
    frecuenciaActualizacion: 'Por evento (máx 15 días posteriores)',
    plantillaSugerida: {
      nombre: 'Formato_Investigacion_Siniestro_Vial.docx',
      contenido: `INFORME TÉCNICO DE INVESTIGACIÓN DE SINIESTRO VIAL
Datos del vehículo, conductor, croquis o levantamiento IPAT, condiciones climáticas, estado de la vía, análisis de árbol de causas y plan de acción preventivo.`
    },
    criterios: [
      { id: '13-1', descripcion: 'Procedimiento de investigación con metodología estandarizada (ej. Árbol de causas).', cumple: true },
      { id: '13-2', descripcion: 'Equipo investigador capacitado con participación de COPASST y líder PESV.', cumple: true },
      { id: '13-3', descripcion: 'Divulgación de lecciones aprendidas a los conductores.', cumple: true }
    ],
    evidencias: [
      {
        id: 'ev-13',
        pasoId: 13,
        nombreArchivo: 'Procedimiento_Investigacion_Siniestros_V2.pdf',
        tamano: '1.9 MB',
        fechaSubida: '2026-02-14',
        subidoPor: 'Comité PESV',
        comentario: 'Metodología adoptada y aplicada en el último incidente menor.',
        estado: 'VALIDADO',
        tipo: 'PDF'
      }
    ]
  },
  {
    id: 14,
    numero: 14,
    fase: 'HACER',
    titulo: 'Vías seguras administradas por la organización',
    subtitulo: 'Mantenimiento y señalización en patios, parqueaderos y vías internas',
    descripcion: 'Estudio y adecuación de la infraestructura vial dentro de las instalaciones de la empresa: demarcación, límites de velocidad interna, pasos peatonales e iluminación.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 14.',
    aplicaA: ['ESTANDAR', 'AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 80,
    responsableSugerido: 'Infraestructura / Servicios Generales',
    frecuenciaActualizacion: 'Semestral',
    plantillaSugerida: {
      nombre: 'Inspeccion_Infraestructura_Vial_Interna.xlsx',
      contenido: `LISTA DE CHEQUEO VÍAS INTERNAS Y PATIOS
Revisión de demarcación horizontal, reductores de velocidad, señalización vertical, bahías de cargue/descargue, iluminación nocturna.`
    },
    criterios: [
      { id: '14-1', descripcion: 'Plano de señalización vial interna y flujos de tráfico vehicular y peatonal.', cumple: true },
      { id: '14-2', descripcion: 'Demarcación de parqueaderos y zonas peatonales visible y mantenida.', cumple: true },
      { id: '14-3', descripcion: 'Límite de velocidad interna reglamentado (máximo 10 km/h).', cumple: true }
    ],
    evidencias: [
      {
        id: 'ev-14',
        pasoId: 14,
        nombreArchivo: 'Plano_Senalizacion_Patios_Operativos.pdf',
        tamano: '4.2 MB',
        fechaSubida: '2026-01-28',
        subidoPor: 'Infraestructura',
        comentario: 'Planos de circulación y señalización vial aprobados.',
        estado: 'VALIDADO',
        tipo: 'PDF'
      }
    ]
  },
  {
    id: 15,
    numero: 15,
    fase: 'HACER',
    titulo: 'Planificación de desplazamientos laborales (Rutas Seguras)',
    subtitulo: 'Ruteo estratégico, control de tiempos de viaje y zonas de alto riesgo',
    descripcion: 'Diseño de rutas seguras para trayectos laborales: identificación de puntos críticos, tiempos estimados de recorrido, horarios de bajo riesgo y alternativas seguras.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 15.',
    aplicaA: ['ESTANDAR', 'AVANZADO'],
    estado: 'EN_PROCESO',
    porcentajeAvance: 70,
    responsableSugerido: 'Jefe de Despachos / Logística',
    frecuenciaActualizacion: 'Bimestral o ante cambio de cliente/ruta',
    plantillaSugerida: {
      nombre: 'Ficha_Rutas_Seguras_Corredores.xlsx',
      contenido: `FICHA TÉCNICA DE RUTAS SEGURAS
Origen - Destino, paradas autorizadas para descanso, estaciones de servicio seguras, zonas con historial de derrumbes o asaltos, límites de velocidad por tramo.`
    },
    criterios: [
      { id: '15-1', descripcion: 'Mapeo de rutas frecuentes con identificación de puntos de conflicto vial.', cumple: true },
      { id: '15-2', descripcion: 'Horarios de viaje planificados para evitar fatiga nocturna.', cumple: true },
      { id: '15-3', descripcion: 'Definición de paradas seguras para alimentación y descanso.', cumple: false }
    ],
    evidencias: [
      {
        id: 'ev-15',
        pasoId: 15,
        nombreArchivo: 'Estudio_Rutas_Seguras_Nacionales.pdf',
        tamano: '3.6 MB',
        fechaSubida: '2026-02-22',
        subidoPor: 'Logística',
        comentario: 'Georreferenciación de paradas y puntos críticos en troncales principales.',
        estado: 'VALIDADO',
        tipo: 'PDF'
      }
    ]
  },
  {
    id: 16,
    numero: 16,
    fase: 'HACER',
    titulo: 'Inspección preoperacional diaria de vehículos',
    subtitulo: 'Checklist digital/físico de frenos, llantas, fluidos y equipo de carretera',
    descripcion: 'Verificación diaria y obligatoria antes de iniciar marcha sobre el estado mecánico y de seguridad activa/pasiva de todos los vehículos (automotores y motos).',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 16. Código Nacional de Tránsito.',
    aplicaA: ['ESTANDAR', 'AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 85,
    responsableSugerido: 'Conductores y Supervisor de Flota',
    frecuenciaActualizacion: 'Diaria por cada turno',
    plantillaSugerida: {
      nombre: 'Lista_Chequeo_Preoperacional_Diario.pdf',
      contenido: `FORMATO DE INSPECCIÓN PREOPERACIONAL DIARIA
Revisión: Luces, estado y labrado de llantas (>2mm), líquido de frenos, nivel de aceite, cinturones, botiquín, extintor vigente, documentación (SOAT, RTM).`
    },
    criterios: [
      { id: '16-1', descripcion: 'Formato estandarizado de inspección diaria para cada tipo de vehículo.', cumple: true },
      { id: '16-2', descripcion: 'Mecanismo para reporte inmediato y bloqueo de vehículo con fallas críticas.', cumple: true },
      { id: '16-3', descripcion: 'Auditorías de campo sobre la veracidad del diligenciamiento del checklist.', cumple: true }
    ],
    evidencias: [
      {
        id: 'ev-16',
        pasoId: 16,
        nombreArchivo: 'Consolidado_Preoperacionales_Digital_2026.pdf',
        tamano: '5.1 MB',
        fechaSubida: '2026-03-10',
        subidoPor: 'Supervisor Flota',
        comentario: 'Registro de 1,240 inspecciones preoperacionales ejecutadas.',
        estado: 'VALIDADO',
        tipo: 'PDF'
      }
    ]
  },
  {
    id: 17,
    numero: 17,
    fase: 'HACER',
    titulo: 'Mantenimiento preventivo y correctivo de vehículos',
    subtitulo: 'Hojas de vida, cronograma de mantenimientos y talleres autorizados',
    descripcion: 'Programa estructurado de mantenimiento basado en especificaciones del fabricante, garantizando que ningún vehículo circule con desperfectos mecánicos.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 17.',
    aplicaA: ['ESTANDAR', 'AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 95,
    responsableSugerido: 'Jefe de Mantenimiento / Taller',
    frecuenciaActualizacion: 'Por kilometraje / mensual',
    plantillaSugerida: {
      nombre: 'Cronograma_Mantenimiento_Flota_2026.xlsx',
      contenido: `PLAN DE MANTENIMIENTO PREVENTIVO DE FLOTA
Hojas de vida por placa, cambio de aceite y filtros, rotación y alineación de llantas, sistema de frenos, vigencia de RTM y SOAT.`
    },
    criterios: [
      { id: '17-1', descripcion: 'Hojas de vida individuales y actualizadas por cada vehículo de la flota.', cumple: true },
      { id: '17-2', descripcion: 'Cronograma preventivo por kilometraje o tiempo según manual del fabricante.', cumple: true },
      { id: '17-3', descripcion: 'Control riguroso de vigencias legales (SOAT, Revisión Técnico Mecánica).', cumple: true }
    ],
    evidencias: [
      {
        id: 'ev-17',
        pasoId: 17,
        nombreArchivo: 'Hojas_Vida_Mantenimiento_Flota_Completa.pdf',
        tamano: '6.4 MB',
        fechaSubida: '2026-03-02',
        subidoPor: 'Jefe Mantenimiento',
        comentario: 'Órdenes de trabajo, facturas de taller y trazabilidad de repuestos.',
        estado: 'VALIDADO',
        tipo: 'PDF'
      }
    ]
  },
  {
    id: 18,
    numero: 18,
    fase: 'HACER',
    titulo: 'Gestión del cambio y gestión de contratistas',
    subtitulo: 'Verificación de requisitos viales a proveedores y conductores tercerizados',
    descripcion: 'Garantizar que todo tercero que suministre transporte o conductores cumpla con las directrices del PESV de la empresa y la normativa colombiana.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 18.',
    aplicaA: ['ESTANDAR', 'AVANZADO'],
    estado: 'EN_PROCESO',
    porcentajeAvance: 50,
    responsableSugerido: 'Compras / Contratos / Líder PESV',
    frecuenciaActualizacion: 'Por cada contratación',
    plantillaSugerida: {
      nombre: 'Manual_Requisitos_Viales_Contratistas.docx',
      contenido: `REQUERIMIENTOS DE SEGURIDAD VIAL PARA CONTRATISTAS Y TERCEROS
Requisitos mínimos: Pólizas vigentes, planilla de seguridad social de conductores, plan de mantenimiento de sus vehículos, inducción en política de seguridad vial.`
    },
    criterios: [
      { id: '18-1', descripcion: 'Criterios de seguridad vial incluidos en pliegos y contratos comerciales.', cumple: true },
      { id: '18-2', descripcion: 'Verificación documental previa al inicio de actividades del contratista.', cumple: true },
      { id: '18-3', descripcion: 'Auditorías de campo y seguimiento a transportadores tercerizados.', cumple: false }
    ],
    evidencias: [
      {
        id: 'ev-18',
        pasoId: 18,
        nombreArchivo: 'Checklist_Auditoria_Terceros_Viales.pdf',
        tamano: '1.2 MB',
        fechaSubida: '2026-02-05',
        subidoPor: 'Compras',
        comentario: 'Revisión técnica a los 4 proveedores de transporte contratados.',
        estado: 'VALIDADO',
        tipo: 'PDF'
      }
    ]
  },
  {
    id: 19,
    numero: 19,
    fase: 'HACER',
    titulo: 'Archivo y retención documental',
    subtitulo: 'Custodia, confidencialidad y retención mínima de 5 años',
    descripcion: 'Sistema de almacenamiento físico o digital para conservar todas las evidencias del PESV garantizando su integridad y disponibilidad para auditorías.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 19. Art. 2.2.4.6.13 Decreto 1072.',
    aplicaA: ['ESTANDAR', 'AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 100,
    responsableSugerido: 'Gestión Documental / Calidad',
    frecuenciaActualizacion: 'Permanente',
    plantillaSugerida: {
      nombre: 'Procedimiento_Retencion_Documental_PESV.docx',
      contenido: `TABLA DE RETENCIÓN DOCUMENTAL DEL PESV
Tiempo de conservación de registros (mínimo 5 años para siniestros, hojas de vida de conductores, preoperacionales y mantenimientos). Políticas de backup y copias de seguridad.`
    },
    criterios: [
      { id: '19-1', descripcion: 'Procedimiento de archivo digital con políticas de backup seguro.', cumple: true },
      { id: '19-2', descripcion: 'Cumplimiento del tiempo legal de retención documental (5 años).', cumple: true },
      { id: '19-3', descripcion: 'Mecanismo de búsqueda y consulta ágil ante requerimientos de autoridades.', cumple: true }
    ],
    evidencias: [
      {
        id: 'ev-19',
        pasoId: 19,
        nombreArchivo: 'Politica_Custodia_Digital_PESV.pdf',
        tamano: '840 KB',
        fechaSubida: '2026-01-10',
        subidoPor: 'Sistemas',
        comentario: 'Servidor cloud seguro con copias de seguridad automáticas diarias.',
        estado: 'VALIDADO',
        tipo: 'PDF'
      }
    ]
  },

  // FASE 3: VERIFICAR (Pasos 20 al 22)
  {
    id: 20,
    numero: 20,
    fase: 'VERIFICAR',
    titulo: 'Indicadores y reporte de autogestión PESV',
    subtitulo: 'Medición periódica de impacto, resultado, actividad y estructura',
    descripcion: 'Cálculo periódico de los indicadores mínimos obligatorios de seguridad vial y presentación del reporte de autogestión ante entidades de control.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 20. Sistema de Información MinTransporte.',
    aplicaA: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 85,
    responsableSugerido: 'Líder PESV / Analista de Datos',
    frecuenciaActualizacion: 'Mensual / Trimestral',
    plantillaSugerida: {
      nombre: 'Ficha_Tablero_Indicadores_PESV.xlsx',
      contenido: `TABLERO DE INDICADORES OFICIALES RESOLUCIÓN 40595
- Tasa de siniestros viales
- Tasa de lesionados y fatalidades
- Porcentaje de ejecución del Plan Anual de Trabajo
- Porcentaje de cumplimiento de inspecciones preoperacionales
- Porcentaje de cumplimiento de mantenimientos preventivos`
    },
    criterios: [
      { id: '20-1', descripcion: 'Fichas técnicas de los indicadores mínimos definidos en la norma.', cumple: true },
      { id: '20-2', descripcion: 'Medición mensual y presentación en el Comité de Seguridad Vial.', cumple: true },
      { id: '20-3', descripcion: 'Cargue anual del reporte de autogestión en la plataforma oficial del MinTransporte/Supertransporte.', cumple: false }
    ],
    evidencias: [
      {
        id: 'ev-20',
        pasoId: 20,
        nombreArchivo: 'Tablero_Indicadores_PESV_Q1_2026.xlsx',
        tamano: '2.1 MB',
        fechaSubida: '2026-03-20',
        subidoPor: 'Líder PESV',
        comentario: 'Dashboard con tasas de frecuencia y severidad acumuladas.',
        estado: 'VALIDADO',
        tipo: 'EXCEL'
      }
    ]
  },
  {
    id: 21,
    numero: 21,
    fase: 'VERIFICAR',
    titulo: 'Registro y análisis estadístico de siniestros viales',
    subtitulo: 'Trazabilidad de eventos, costos asociados y tendencias operativas',
    descripcion: 'Consolidación de la base de datos de siniestros, clasificación por severidad, costos directos e indirectos, y análisis de tendencias para orientar la prevención.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 21.',
    aplicaA: ['ESTANDAR', 'AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 90,
    responsableSugerido: 'Líder PESV / Área Jurídica / Seguros',
    frecuenciaActualizacion: 'Mensual',
    plantillaSugerida: {
      nombre: 'Base_Datos_Estadistica_Siniestralidad.xlsx',
      contenido: `REGISTRO Y ESTADÍSTICA DE SINIESTROS VIALES
Campos: Fecha, hora, placa, conductor, tramo vial, hipótesis preliminar, tipo de daño (material, incapacidad, fatal), costo aseguradora, costo deducible.`
    },
    criterios: [
      { id: '21-1', descripcion: 'Registro histórico consolidado y detallado de cada siniestro vial.', cumple: true },
      { id: '21-2', descripcion: 'Análisis de causalidad y mapas de calor de tramos de mayor riesgo.', cumple: true },
      { id: '21-3', descripcion: 'Estimación y seguimiento a los costos económicos y de incapacidad.', cumple: true }
    ],
    evidencias: [
      {
        id: 'ev-21',
        pasoId: 21,
        nombreArchivo: 'Informe_Estadistico_Siniestralidad_2025_2026.pdf',
        tamano: '3.5 MB',
        fechaSubida: '2026-02-25',
        subidoPor: 'Líder PESV',
        comentario: 'Reducción del 30% en choques simples respecto al año anterior.',
        estado: 'VALIDADO',
        tipo: 'INFORME'
      }
    ]
  },
  {
    id: 22,
    numero: 22,
    fase: 'VERIFICAR',
    titulo: 'Auditoría anual interna del PESV',
    subtitulo: 'Verificación del cumplimiento de los requisitos por auditor competente',
    descripcion: 'Evaluación formal e independiente del grado de implementación, eficacia y madurez de cada uno de los pasos exigibles del PESV.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 22.',
    aplicaA: ['ESTANDAR', 'AVANZADO'],
    estado: 'EN_PROCESO',
    porcentajeAvance: 50,
    responsableSugerido: 'Auditor Interno de Calidad / Auditor Externo',
    frecuenciaActualizacion: 'Mínimo una vez al año',
    plantillaSugerida: {
      nombre: 'Lista_Verificacion_Auditoria_Res40595.xlsx',
      contenido: `LISTA DE CHEQUEO OFICIAL DE AUDITORÍA PESV
Calificación paso a paso (Cumple totalmente, Cumple parcialmente, No cumple). Hallazgos de No Conformidad Mayor, Menor y Oportunidades de Mejora.`
    },
    criterios: [
      { id: '22-1', descripcion: 'Programa y plan de auditoría anual aprobado por la alta dirección.', cumple: true },
      { id: '22-2', descripcion: 'Auditor con competencia demostrada en ISO 39001 o Res. 40595.', cumple: true },
      { id: '22-3', descripcion: 'Informe final de auditoría con hallazgos socializado a la gerencia.', cumple: false }
    ],
    evidencias: [
      {
        id: 'ev-22',
        pasoId: 22,
        nombreArchivo: 'Plan_Auditoria_Interna_PESV_2026.pdf',
        tamano: '1.5 MB',
        fechaSubida: '2026-03-05',
        subidoPor: 'Auditoría Interna',
        comentario: 'Plan de auditoría programado para cierre del mes en curso.',
        estado: 'VALIDADO',
        tipo: 'PDF'
      }
    ]
  },

  // FASE 4: ACTUAR (Pasos 23 al 24)
  {
    id: 23,
    numero: 23,
    fase: 'ACTUAR',
    titulo: 'Mejora continua, acciones preventivas y correctivas',
    subtitulo: 'Planes de cierre de no conformidades derivadas de siniestros y auditorías',
    descripcion: 'Formulación y ejecución de planes de acción para corregir desviaciones identificadas en auditorías, inspecciones, quejas o siniestros viales.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 23.',
    aplicaA: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 80,
    responsableSugerido: 'Líder PESV / Responsables de Procesos',
    frecuenciaActualizacion: 'Trimestral',
    plantillaSugerida: {
      nombre: 'Matriz_Acciones_Correctivas_Preventivas.xlsx',
      contenido: `PLAN DE MEJORA CONTINUA PESV
Registro de No Conformidades, análisis de causa (5 Porqués / Espina de Pescado), plan de acción, fecha límite, responsable y validación de eficacia.`
    },
    criterios: [
      { id: '23-1', descripcion: 'Metodología documentada para el tratamiento de no conformidades.', cumple: true },
      { id: '23-2', descripcion: 'Plan de cierre de brechas con fechas y responsables asignados.', cumple: true },
      { id: '23-3', descripcion: 'Evaluación formal de la eficacia de las acciones implementadas.', cumple: true }
    ],
    evidencias: [
      {
        id: 'ev-23',
        pasoId: 23,
        nombreArchivo: 'Matriz_Seguimiento_Acciones_Mejora_2026.xlsx',
        tamano: '1.8 MB',
        fechaSubida: '2026-02-28',
        subidoPor: 'Calidad',
        comentario: '8 acciones cerradas eficazmente y 2 en seguimiento activo.',
        estado: 'VALIDADO',
        tipo: 'EXCEL'
      }
    ]
  },
  {
    id: 24,
    numero: 24,
    fase: 'ACTUAR',
    titulo: 'Mecanismos de comunicación y rendición de cuentas',
    subtitulo: 'Rendición de cuentas anual y canales de comunicación vial bidireccionales',
    descripcion: 'Divulgación de resultados, logros y lecciones aprendidas a todas las partes interesadas (trabajadores, clientes, comunidad) y rendición de cuentas formal de la dirección.',
    requisitoNormativo: 'Resolución 40595 de 2022 - Paso 24.',
    aplicaA: ['AVANZADO'],
    estado: 'IMPLEMENTADO',
    porcentajeAvance: 90,
    responsableSugerido: 'Comunicaciones / Alta Dirección',
    frecuenciaActualizacion: 'Semestral / Anual',
    plantillaSugerida: {
      nombre: 'Informe_Rendicion_Cuentas_Seguridad_Vial.docx',
      contenido: `INFORME Y ACTA DE RENDICIÓN DE CUENTAS PESV
Presentación de resultados del desempeño en seguridad vial ante la Junta Directiva, colaboradores y comités paritarios. Canales de sugerencias viales para conductores.`
    },
    criterios: [
      { id: '24-1', descripcion: 'Canales de comunicación bidireccional sobre condiciones viales y riesgos en ruta.', cumple: true },
      { id: '24-2', descripcion: 'Sesión anual de rendición de cuentas de la alta dirección sobre resultados del PESV.', cumple: true },
      { id: '24-3', descripcion: 'Campañas de sensibilización y divulgación permanente de buenas prácticas.', cumple: true }
    ],
    evidencias: [
      {
        id: 'ev-24',
        pasoId: 24,
        nombreArchivo: 'Acta_Rendicion_Cuentas_Directiva_2025.pdf',
        tamano: '2.3 MB',
        fechaSubida: '2026-01-22',
        subidoPor: 'Gerencia General',
        comentario: 'Presentación formal de resultados del año anterior ante socios y equipo.',
        estado: 'VALIDADO',
        tipo: 'ACTA'
      }
    ]
  }
];

export const ALERTAS_INICIALES = [
  {
    id: 'alt-1',
    pasoId: 22,
    titulo: 'Auditoría Anual Interna del PESV Pendiente de Cierre',
    descripcion: 'El informe final de la auditoría anual 2026 aún no se ha consolidado ni presentado formalmente a la Gerencia General.',
    severidad: 'CRITICA' as const,
    fechaLimite: '2026-10-30',
    resuelto: false,
    riesgoLegal: 'Posible No Conformidad Mayor en auditorías de Superintendencia de Transporte / Ministerio del Trabajo.'
  },
  {
    id: 'alt-2',
    pasoId: 10,
    titulo: 'Cobertura del Plan Anual de Formación por debajo del 80%',
    descripcion: 'El módulo de "Manejo Defensivo y Gestión de la Fatiga" reporta solo un 65% de conductores certificados en el primer semestre.',
    severidad: 'MEDIA' as const,
    fechaLimite: '2026-11-15',
    resuelto: false,
    riesgoLegal: 'Incumplimiento de la meta de capacitación del Paso 10 y factor de riesgo en siniestros viales.'
  },
  {
    id: 'alt-3',
    pasoId: 12,
    titulo: 'Simulacro de Emergencia Vial Pendiente de Ejecución',
    descripcion: 'No se ha ejecutado el simulacro anual de atención de siniestro vial en ruta estipulado en el Paso 12.',
    severidad: 'MEDIA' as const,
    fechaLimite: '2026-11-20',
    resuelto: false,
    riesgoLegal: 'Observación en auditoría ARL y falta de preparación del personal operativo ante emergencias reales.'
  },
  {
    id: 'alt-4',
    pasoId: 18,
    titulo: 'Revisión Documental a Transportadores Tercerizados Vencida',
    descripcion: '2 empresas contratistas de transporte no han renovado sus certificados de revisión técnico-mecánica ni pólizas extracontractuales.',
    severidad: 'CRITICA' as const,
    fechaLimite: '2026-10-18',
    resuelto: false,
    riesgoLegal: 'Responsabilidad civil solidaria de la organización ante un siniestro vial generado por contratistas.'
  },
  {
    id: 'alt-5',
    pasoId: 15,
    titulo: 'Actualización de Puntos Críticos en Rutas Principales',
    descripcion: 'Se reportaron cierres y obras viales en la vía Bogotá - Girardot que requieren ajustar la ficha de ruta segura.',
    severidad: 'BAJA' as const,
    fechaLimite: '2026-10-25',
    resuelto: false,
    riesgoLegal: 'Retrasos en la operación y exposición a riesgos no evaluados.'
  }
];
