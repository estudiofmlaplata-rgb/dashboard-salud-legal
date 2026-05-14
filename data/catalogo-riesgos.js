// ════════════════════════════════════════════════════════════════════════════
// CATÁLOGO CENTRAL DE RIESGOS
// ════════════════════════════════════════════════════════════════════════════
//
// Acá están todos los TIPOS de riesgo que usás en los dashboards.
// Cada tipo tiene un monto BASE (sin inflación) y un multiplicador de inflación
// que se aplica a TODOS los riesgos automáticamente.
//
// Para usar un riesgo del catálogo en un cliente, usá su "id" en clientes.js
// con el formato: { riskId: "encuadre_freelancer" } en lugar de { risk: 7200000 }
//
// ════════════════════════════════════════════════════════════════════════════

// Multiplicador de inflación que se aplica a TODOS los riesgos del catálogo.
// 1.0 = sin ajuste / 1.20 = +20% / 1.50 = +50%
// Subilo cuando hay inflación significativa.
export const INFLATION_MULTIPLIER = 1.0;
export const LAST_INFLATION_UPDATE = "Mayo 2026";

// Catálogo de riesgos. Editá los montos base cuando cambien leyes o jurisprudencia.
export const RIESGOS = {
  // ─── LABORAL ─────────────────────────────────────────────────────────────
  encuadre_freelancer: {
    label: "Encuadre laboral freelancer (por trabajador, 2 años antigüedad)",
    base: 3600000,
    categoria: "Laboral",
    basis: "Arts. 1716/1717 CCCN + RG 1566/10",
  },
  registracion_deficiente_sueldo: {
    label: "Registración deficiente de remuneraciones (por trabajador)",
    base: 1950000,
    categoria: "Laboral",
    basis: "Arts. 1716/1717 CCCN + Ley 27.802",
  },
  categoria_cct_incorrecta: {
    label: "Categoría de CCT incorrecta (por trabajador, 2 años retroactivos)",
    base: 1800000,
    categoria: "Laboral",
    basis: "LCT art. 245 + CCT aplicable",
  },
  libro_sueldos_atrasado: {
    label: "Libro de sueldos digital atrasado",
    base: 750000,
    categoria: "Laboral",
    basis: "Multa 5% de remuneraciones del período",
  },
  aportes_con_deuda: {
    label: "Deuda de aportes (multa 65%)",
    base: 247000,
    categoria: "Laboral",
    basis: "RG 1566/10 art. 3",
  },

  // ─── SEGUROS ──────────────────────────────────────────────────────────────
  seguro_vida_obligatorio: {
    label: "Falta de seguro de vida obligatorio (por empleado)",
    base: 3500000,
    categoria: "Seguros",
    basis: "Dto. 1567/74 + Ley 24.557 (Res. SRT 37/2025)",
  },
  freelancer_sin_art: {
    label: "Freelancer sin ART (por trabajador)",
    base: 440000,
    categoria: "Seguros",
    basis: "Art. 28 Ley 24.557",
  },
  rc_profesional: {
    label: "Falta de RC profesional",
    base: 500000,
    categoria: "Seguros",
    basis: "Daños a clientes por errores u omisiones",
  },
  ciberriesgo: {
    label: "Falta de seguro de ciberriesgo",
    base: 1500000,
    categoria: "Seguros",
    basis: "Costos de recuperación ante incidente",
  },

  // ─── PROTECCIÓN DE DATOS ──────────────────────────────────────────────────
  datos_sensibles_sin_protocolo: {
    label: "Manejo de datos sensibles sin protocolo",
    base: 2500000,
    categoria: "Datos personales",
    basis: "Ley 25.326 arts. 7, 31, 32 + Res. AAIP 244/2022",
  },
  sin_eipd: {
    label: "Falta de Evaluación de Impacto en Privacidad",
    base: 1300000,
    categoria: "Datos personales",
    basis: "Res. AAIP 47/2018",
  },
  base_datos_sin_registrar: {
    label: "Base de datos sin registrar en AAIP",
    base: 800000,
    categoria: "Datos personales",
    basis: "Ley 25.326 art. 21",
  },

  // ─── CONTRATOS ────────────────────────────────────────────────────────────
  contrato_internacional_sin_jurisdiccion: {
    label: "Contrato internacional sin cláusula de jurisdicción",
    base: 1320000,
    categoria: "Contractual",
    basis: "Riesgo de litigar en jurisdicción desfavorable",
  },
  contrato_cliente_sin_pi: {
    label: "Contrato sin cláusula de propiedad intelectual",
    base: 2000000,
    categoria: "Contractual",
    basis: "Pérdida de derechos sobre desarrollos",
  },
  contrato_comision_sin_exclusividad: {
    label: "Contrato de comisión sin exclusividad",
    base: 3500000,
    categoria: "Contractual",
    basis: "Ley 25.028 corredores",
  },
  contrato_locacion_desactualizado: {
    label: "Modelo de contrato de locación desactualizado",
    base: 3000000,
    categoria: "Contractual",
    basis: "Código Civil y Comercial + Ley de Alquileres",
  },

  // ─── COMPLIANCE Y GOBIERNO ────────────────────────────────────────────────
  sin_programa_integridad: {
    label: "Sin programa de integridad (Ley 27.401)",
    base: 1500000,
    categoria: "Compliance",
    basis: "Ley 27.401 arts. 22-23",
  },
  sin_politica_ia: {
    label: "Sin política de uso responsable de IA",
    base: 1500000,
    categoria: "Compliance",
    basis: "Convenio 108+ · Proyecto ley IA Argentina 2026",
  },
  sin_actas_decisiones: {
    label: "Decisiones societarias sin actas",
    base: 1500000,
    categoria: "Compliance",
    basis: "Costos litigio disputa societaria",
  },
  sin_matriz_riesgos: {
    label: "Sin matriz de riesgos tecnológicos",
    base: 1000000,
    categoria: "Compliance",
    basis: "Costos recuperación ante incidente",
  },

  // ─── PROCESOS ─────────────────────────────────────────────────────────────
  sin_protocolo_comunicacion: {
    label: "Sin protocolo de comunicación interna",
    base: 800000,
    categoria: "Procesos",
    basis: "Falta de trazabilidad documental",
  },
  sin_manual_procedimientos: {
    label: "Sin manual de procedimientos operativos",
    base: 1600000,
    categoria: "Procesos",
    basis: "Dependencia de personas clave",
  },
  sin_protocolo_atencion: {
    label: "Sin protocolo de atención a clientes",
    base: 1200000,
    categoria: "Procesos",
    basis: "Operaciones de alto valor sin proceso",
  },
};

// Función para obtener el monto ajustado por inflación.
export function getRiskAmount(riskId, cantidad = 1) {
  const r = RIESGOS[riskId];
  if (!r) return 0;
  return Math.round(r.base * cantidad * INFLATION_MULTIPLIER);
}

// Función para resolver el riesgo de un item (usa riskId si existe, sino risk fijo)
export function resolveItemRisk(item) {
  if (item.riskId) {
    return getRiskAmount(item.riskId, item.cantidad || 1);
  }
  return item.risk || 0;
}
