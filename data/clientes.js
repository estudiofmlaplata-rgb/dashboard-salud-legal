// ════════════════════════════════════════════════════════════════════════════
// DATOS DE CLIENTES
// ════════════════════════════════════════════════════════════════════════════
//
// Cada item de un cliente puede usar:
//   - "riskId": "encuadre_freelancer"   → toma el monto del catálogo central
//   - "cantidad": 2                     → multiplica el monto por la cantidad
//   - "risk": 800000                    → monto fijo (NO se ajusta por inflación)
//
// Usá riskId para riesgos típicos (se actualizan automáticamente).
// Usá risk para casos puntuales que no encajan en el catálogo.
//
// ════════════════════════════════════════════════════════════════════════════

export const ADMIN_PASSWORD = "CAMBIAR_ESTA_CLAVE_DE_ADMIN_123";

export const CLIENTES = {
  "techco": {
    password: "techco2026",
    nombre: "TechCo Solutions S.R.L.",
    plan: "Plan estratégico · $500.000/mes",
    mes: "Mes 3 de 12",
    actualizado: "Mayo 2026",
    scoreInicial: 28,
    exposicionInicial: 41190000,
    ejes: [
      {
        id: "procesos", name: "Procesos operativos", icon: "⚙️",
        desc: "Documentación, flujos de trabajo, onboarding y estructura organizacional",
        items: [
          { label: "Organigrama y roles documentados", status: "green", detail: "Entregado el 15/03." },
          { label: "Proceso de onboarding formalizado", status: "yellow", detail: "Borrador entregado. Pendiente aprobación del CTO." },
          { label: "Flujos de entrega de proyectos", status: "yellow", detail: "En relevamiento. 3 flujos sin documentar." },
          { label: "Protocolos de comunicación interna", status: "red", detail: "No existen. Decisiones por Slack sin respaldo.", riskId: "sin_protocolo_comunicacion" },
          { label: "Manual de procedimientos operativos", status: "red", detail: "Sin manual, la empresa depende de personas clave.", riskId: "sin_manual_procedimientos" },
        ]
      },
      {
        id: "contratos", name: "Marco legal y contratos", icon: "📄",
        desc: "Contratos con clientes, proveedores, colaboradores y propiedad intelectual",
        items: [
          { label: "Contratos con clientes estandarizados", status: "green", detail: "Template v2 vigente." },
          { label: "Cláusulas de propiedad intelectual", status: "green", detail: "Cesión de derechos documentada." },
          { label: "NDAs con colaboradores y terceros", status: "yellow", detail: "Faltan firmas de 3 freelancers." },
          { label: "Encuadre laboral de freelancers", status: "red", detail: "2 freelancers con indicios de relación de dependencia.", riskId: "encuadre_freelancer", cantidad: 2 },
          { label: "Contratos internacionales", status: "yellow", detail: "Contrato sin cláusulas de jurisdicción.", riskId: "contrato_internacional_sin_jurisdiccion" },
        ]
      },
      {
        id: "seguros", name: "Seguros y cobertura", icon: "🛡️",
        desc: "ART, seguro de vida obligatorio, RC y cobertura patrimonial",
        items: [
          { label: "ART contratada para empleados", status: "green", detail: "Póliza vigente con Provincia ART." },
          { label: "Seguro de vida obligatorio (Dto. 1567/74)", status: "red", detail: "No contratado. Obligatorio por ley.", riskId: "seguro_vida_obligatorio" },
          { label: "Cobertura de freelancers ante accidentes", status: "red", detail: "5 freelancers sin ART.", riskId: "freelancer_sin_art", cantidad: 5 },
          { label: "Seguro de responsabilidad civil profesional", status: "yellow", detail: "En evaluación.", riskId: "rc_profesional" },
          { label: "Seguro de ciberriesgo", status: "red", detail: "No contratado.", riskId: "ciberriesgo" },
        ]
      },
      {
        id: "cargas", name: "Cargas sociales y registros", icon: "🧾",
        desc: "Aportes, contribuciones y registros laborales",
        items: [
          { label: "Declaraciones juradas F.931 al día", status: "green", detail: "Presentadas hasta abril 2026." },
          { label: "Aportes y contribuciones sin deuda", status: "yellow", detail: "Diferencias por $380.000.", riskId: "aportes_con_deuda" },
          { label: "Registración deficiente de remuneraciones", status: "red", detail: "3 empleados con parte del sueldo en negro.", riskId: "registracion_deficiente_sueldo", cantidad: 3 },
          { label: "Libro de sueldos digital actualizado", status: "red", detail: "Atraso de 2 meses.", riskId: "libro_sueldos_atrasado" },
          { label: "Registración correcta de categorías CCT", status: "red", detail: "2 empleados en categoría inferior.", riskId: "categoria_cct_incorrecta", cantidad: 2 },
          { label: "REPSAL: registro sin sanciones", status: "green", detail: "Sin sanciones al 01/05/2026." },
          { label: "Constancia de CUIL actualizada", status: "yellow", detail: "Pendiente actualización de 1 empleado." },
        ]
      },
      {
        id: "datos", name: "Protección de datos", icon: "🔒",
        desc: "Ley 25.326, políticas de privacidad y manejo de información",
        items: [
          { label: "Política de privacidad publicada", status: "green", detail: "Versión 1.2 en sitio web." },
          { label: "Términos y condiciones actualizados", status: "green", detail: "Última actualización: abril 2026." },
          { label: "Registro de bases de datos ante AAIP", status: "yellow", detail: "En preparación." },
          { label: "Protocolo de manejo de datos sensibles", status: "red", detail: "App procesa datos de salud sin protocolo.", riskId: "datos_sensibles_sin_protocolo" },
          { label: "Evaluación de impacto en privacidad", status: "red", detail: "Sin EIPD.", riskId: "sin_eipd" },
        ]
      },
      {
        id: "compliance", name: "Compliance y gobierno", icon: "🤖",
        desc: "IA responsable, Ley 27.401, gestión de riesgos",
        items: [
          { label: "Política de uso responsable de IA", status: "red", detail: "IA en producción sin política.", riskId: "sin_politica_ia" },
          { label: "Programa de integridad (Ley 27.401)", status: "red", detail: "No implementado.", riskId: "sin_programa_integridad" },
          { label: "Acuerdo de socios formalizado", status: "yellow", detail: "Borrador en revisión." },
          { label: "Marco de decisiones documentado", status: "red", detail: "Sin actas formales.", riskId: "sin_actas_decisiones" },
          { label: "Gestión de riesgos tecnológicos", status: "red", detail: "Sin matriz de riesgos.", riskId: "sin_matriz_riesgos" },
          { label: "Adecuación regulatoria emergente", status: "yellow", detail: "Monitoring activo." },
        ]
      },
    ],
    prioridades: [
      { title: "Regularizar encuadre laboral de freelancers", desc: "2 colaboradores con indicios de relación de dependencia.", riskId: "encuadre_freelancer", cantidad: 2, basis: "Arts. 1716/1717 CCCN", u: "red" },
      { title: "Contratar seguro de vida obligatorio", desc: "Obligatorio por Dto. 1567/74.", riskId: "seguro_vida_obligatorio", basis: "Dto. 1567/74 + Ley 24.557", u: "red" },
      { title: "Corregir categorías de empleados en CCT", desc: "2 empleados en categoría inferior.", riskId: "categoria_cct_incorrecta", cantidad: 2, basis: "LCT art. 245 + CCT", u: "red" },
      { title: "Regularizar registración de remuneraciones", desc: "3 empleados con parte del sueldo en negro.", riskId: "registracion_deficiente_sueldo", cantidad: 3, basis: "Arts. 1716/1717 CCCN + Ley 27.802", u: "red" },
      { title: "Implementar programa de integridad", desc: "Ley 27.401: responsabilidad penal empresaria.", riskId: "sin_programa_integridad", basis: "Ley 27.401 arts. 22-23", u: "yellow" },
      { title: "Documentar política de uso de IA", desc: "IA en producción sin política documentada.", riskId: "sin_politica_ia", basis: "Convenio 108+", u: "yellow" },
    ],
    historial: [
      { date: "12 mayo 2026", action: "T&C actualizados.", s: "green" },
      { date: "5 mayo 2026", action: "Reunión presencial. 3 contratos revisados.", s: "green" },
      { date: "28 abril 2026", action: "Borrador onboarding entregado.", s: "yellow" },
      { date: "15 abril 2026", action: "Contrato template v2 finalizado.", s: "green" },
      { date: "2 abril 2026", action: "Videollamada mensual. Plan Q2 definido.", s: "green" },
      { date: "20 marzo 2026", action: "Política de privacidad v1.2 publicada.", s: "green" },
      { date: "15 marzo 2026", action: "Organigrama y roles entregados.", s: "green" },
      { date: "1 marzo 2026", action: "Diagnóstico inicial. Score: 28/100.", s: "blue" },
    ],
  },

  "inmoplata": {
    password: "inmoplata2026",
    nombre: "Inmobiliaria La Plata S.A.",
    plan: "Plan profesional · $280.000/mes",
    mes: "Mes 1 de 12",
    actualizado: "Mayo 2026",
    scoreInicial: 35,
    exposicionInicial: 15000000,
    ejes: [
      {
        id: "procesos", name: "Procesos operativos", icon: "⚙️",
        desc: "Documentación, flujos de trabajo y estructura organizacional",
        items: [
          { label: "Organigrama documentado", status: "yellow", detail: "En revisión." },
          { label: "Protocolo de atención a clientes", status: "red", detail: "Sin protocolo formalizado.", riskId: "sin_protocolo_atencion" },
        ]
      },
      {
        id: "contratos", name: "Marco legal y contratos", icon: "📄",
        desc: "Boletos, comisiones, contratos de alquiler y representación",
        items: [
          { label: "Boletos de compraventa estandarizados", status: "yellow", detail: "Template en revisión." },
          { label: "Contratos de comisión claros", status: "red", detail: "Sin cláusulas precisas de exclusividad.", riskId: "contrato_comision_sin_exclusividad" },
          { label: "Modelo de contrato de locación actualizado", status: "red", detail: "Modelos previos a la última reforma.", riskId: "contrato_locacion_desactualizado" },
        ]
      },
    ],
    prioridades: [
      { title: "Actualizar modelo de contratos de locación", desc: "Modelos previos a la última reforma legal.", riskId: "contrato_locacion_desactualizado", basis: "CCyC + Ley de Alquileres", u: "red" },
      { title: "Estandarizar contratos de comisión inmobiliaria", desc: "Sin cláusulas precisas de exclusividad.", riskId: "contrato_comision_sin_exclusividad", basis: "Ley 25.028", u: "red" },
    ],
    historial: [
      { date: "10 mayo 2026", action: "Diagnóstico inicial completado. Score: 35/100.", s: "blue" },
    ],
  },
};
