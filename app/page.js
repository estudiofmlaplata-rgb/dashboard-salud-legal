'use client';

import { useState } from "react";

const ACCENT = "#1B4F72";
const GREEN = "#27AE60";
const YELLOW = "#F39C12";
const RED = "#E74C3C";
const DARK = "#1C2833";
const GRAY = "#95A5A6";

const EJES = [
  {
    id: "procesos", name: "Procesos operativos", icon: "⚙️",
    desc: "Documentación, flujos de trabajo, onboarding y estructura organizacional",
    risk: 2400000,
    items: [
      { label: "Organigrama y roles documentados", status: "green", detail: "Entregado el 15/03. Documento en carpeta compartida.", risk: 0 },
      { label: "Proceso de onboarding formalizado", status: "yellow", detail: "Borrador entregado. Pendiente aprobación del CTO para implementar antes de la incorporación de julio.", risk: 0 },
      { label: "Flujos de entrega de proyectos", status: "yellow", detail: "En relevamiento. 3 flujos principales sin documentar. Riesgo de pérdida de know-how ante salida de líder técnico.", risk: 0 },
      { label: "Protocolos de comunicación interna", status: "red", detail: "No existen. Decisiones comunicadas solo por Slack sin respaldo. Ante conflicto contractual, no hay trazabilidad documental.", risk: 800000 },
      { label: "Manual de procedimientos operativos", status: "red", detail: "Sin manual, la empresa depende de personas clave, no de procesos. Costo estimado de reemplazo de un dev senior sin documentación: 3-4 meses de productividad perdida.", risk: 1600000 },
    ]
  },
  {
    id: "contratos", name: "Marco legal y contratos", icon: "📄",
    desc: "Contratos con clientes, proveedores, colaboradores y propiedad intelectual",
    risk: 8520000,
    items: [
      { label: "Contratos con clientes estandarizados", status: "green", detail: "Template v2 vigente. Cláusula de PI, limitación de responsabilidad y jurisdicción definida.", risk: 0 },
      { label: "Cláusulas de propiedad intelectual", status: "green", detail: "Cesión de derechos patrimoniales documentada en contratos de clientes y colaboradores.", risk: 0 },
      { label: "NDAs con colaboradores y terceros", status: "yellow", detail: "Template listo. Faltan firmas de 3 freelancers. Sin NDA, un ex-colaborador puede compartir código fuente sin consecuencia legal.", risk: 0 },
      { label: "Encuadre laboral de freelancers", status: "red", detail: "2 de 5 freelancers con indicios de relación de dependencia: exclusividad, horario fijo, herramientas de la empresa. Cálculo: 2 devs × $1.500.000/mes × 2 años + multas arts. 8, 9, 10 Ley 24.013 y art. 1 Ley 25.323.", risk: 7200000 },
      { label: "Contratos internacionales", status: "yellow", detail: "Contrato con cliente de Uruguay sin cláusulas de jurisdicción ni ley aplicable. Un conflicto se litiga donde el cliente elija.", risk: 1320000 },
    ]
  },
  {
    id: "seguros", name: "Seguros y cobertura", icon: "🛡️",
    desc: "ART, seguro de vida obligatorio, seguro de responsabilidad civil y cobertura patrimonial",
    risk: 6200000,
    items: [
      { label: "ART contratada para empleados registrados", status: "green", detail: "Póliza vigente con Provincia ART. 4 empleados cubiertos. Vencimiento noviembre 2026.", risk: 0 },
      { label: "Seguro de vida obligatorio (Dto. 1567/74)", status: "red", detail: "No contratado. Obligatorio por ley. Ante fallecimiento, el empleador responde con patrimonio propio. Compensaciones Ley 24.557: entre $38.946.415 y $58.419.605 según incapacidad (Res. SRT 37/2025).", risk: 3500000 },
      { label: "Cobertura de freelancers ante accidentes", status: "red", detail: "5 freelancers sin ART. Si trabajan en oficina y sufren accidente, la empresa responde como empleador de hecho. Art. 28 Ley 24.557.", risk: 2200000 },
      { label: "Seguro de responsabilidad civil profesional", status: "yellow", detail: "En evaluación. Un bug crítico que cause daños al cliente se paga del patrimonio de los socios.", risk: 500000 },
      { label: "Seguro de ciberriesgo", status: "red", detail: "No contratado. Ransomware o filtración: $500.000-$2.000.000 en recuperación + daño reputacional + multas AAIP.", risk: 0 },
    ]
  },
  {
    id: "cargas", name: "Cargas sociales y registros", icon: "🧾",
    desc: "Aportes y contribuciones, libros laborales, registros ante ARCA y cumplimiento previsional",
    risk: 10650000,
    items: [
      { label: "Declaraciones juradas F.931 al día", status: "green", detail: "Presentadas en tiempo y forma hasta abril 2026. Contador externo a cargo.", risk: 0 },
      { label: "Aportes y contribuciones sin deuda", status: "yellow", detail: "Diferencias detectadas en aportes de febrero por $380.000. Sin regularizar antes de inspección ARCA, multa del 65% (RG 1566/10 art. 3).", risk: 247000 },
      { label: "Registración deficiente de remuneraciones", status: "red", detail: "3 empleados con parte del sueldo en efectivo sin registrar. Aunque la Ley Bases (27.742) derogó las multas de los arts. 8, 9 y 10 de la Ley 24.013, la registración deficiente sigue siendo ilegal. El trabajador puede reclamar daños por vía del derecho común (arts. 1716/1717 CCCN): diferencias salariales retroactivas, aportes previsionales no realizados, impacto en jubilación futura e indemnización por daño moral. Además, la Ley 27.802 (marzo 2026, art. 7° ter) obliga al trabajador a denunciar ante ARCA la irregularidad. ARCA puede sancionar con multa del 65% de la deuda de aportes y contribuciones omitidos (RG 1566/10). Cálculo: 3 empleados × $500.000/mes en negro × 24 meses de diferencia salarial + aportes omitidos + daños.", risk: 5850000 },
      { label: "Libro de sueldos digital actualizado", status: "red", detail: "Atraso de 2 meses. Multa: 5% del total de remuneraciones imponibles del período.", risk: 750000 },
      { label: "Registración correcta de categorías CCT", status: "red", detail: "2 empleados en categoría inferior. Diferencias salariales retroactivas por 2 años: $150.000/mes × 2 empleados × 24 meses.", risk: 3600000 },
      { label: "REPSAL: registro sin sanciones", status: "green", detail: "Sin sanciones registradas al 01/05/2026.", risk: 0 },
      { label: "Constancia de CUIL actualizada", status: "yellow", detail: "Pendiente actualización de 1 empleado. Menor riesgo pero necesario para inspección.", risk: 0 },
    ]
  },
  {
    id: "datos", name: "Protección de datos", icon: "🔒",
    desc: "Ley 25.326, políticas de privacidad, bases de datos y manejo de información",
    risk: 3800000,
    items: [
      { label: "Política de privacidad publicada", status: "green", detail: "Versión 1.2 en sitio web. Revisión anual septiembre 2026.", risk: 0 },
      { label: "Términos y condiciones actualizados", status: "green", detail: "Alineados con política de privacidad. Última actualización: abril 2026.", risk: 0 },
      { label: "Registro de bases de datos ante AAIP", status: "yellow", detail: "En preparación. Ley 25.326 obliga a inscribir toda base con datos personales.", risk: 0 },
      { label: "Protocolo de manejo de datos sensibles", status: "red", detail: "App procesa datos de salud sin protocolo ni consentimiento reforzado. AAIP: multas acumulables hasta $15.000.000 (Res. 244/2022). Art. 32 Ley 25.326: sanciones penales.", risk: 2500000 },
      { label: "Evaluación de impacto en privacidad", status: "red", detail: "Sin EIPD, no hay responsabilidad proactiva demostrable. Agrava cualquier sanción futura.", risk: 1300000 },
    ]
  },
  {
    id: "compliance", name: "Compliance y gobierno", icon: "🤖",
    desc: "IA responsable, programa de integridad (Ley 27.401), gestión de riesgos y estructura societaria",
    risk: 5500000,
    items: [
      { label: "Política de uso responsable de IA", status: "red", detail: "IA en producción sin política. Sesgo algorítmico expone a socios personalmente. EU AI Act y Convenio 108+ anticipan obligaciones formales.", risk: 1500000 },
      { label: "Programa de integridad (Ley 27.401)", status: "red", detail: "No implementado. Responsabilidad penal de personas jurídicas por cohecho y tráfico de influencias. El programa de integridad es atenuante obligatorio.", risk: 1500000 },
      { label: "Acuerdo de socios formalizado", status: "yellow", detail: "Borrador en revisión. Sin cláusula de salida ni mecanismo de resolución de conflictos.", risk: 0 },
      { label: "Marco de decisiones documentado", status: "red", detail: "Decisiones verbales sin actas. Litigar disputa societaria: $1.500.000-$3.000.000 en honorarios y costas.", risk: 1500000 },
      { label: "Gestión de riesgos tecnológicos", status: "red", detail: "Sin matriz de riesgos ni plan de contingencia. Ransomware sin plan: $500.000-$2.000.000 en recuperación.", risk: 1000000 },
      { label: "Adecuación regulatoria emergente", status: "yellow", detail: "Monitoring activo. 2 regulaciones en trámite parlamentario impactarían al producto.", risk: 0 },
    ]
  },
];

const STATUS = {
  green: { color: GREEN, label: "Resuelto", bg: "#E8F8F0", text: "#1E8449" },
  yellow: { color: YELLOW, label: "En proceso", bg: "#FEF5E7", text: "#B7770A" },
  red: { color: RED, label: "Pendiente", bg: "#FDEDEC", text: "#C0392B" },
};

function getScore(items) {
  const v = { green: 100, yellow: 50, red: 0 };
  return Math.round(items.reduce((s, i) => s + v[i.status], 0) / items.length);
}
function fmt(n) { return "$" + n.toLocaleString("es-AR"); }
function getColor(s) { return s >= 70 ? GREEN : s >= 40 ? YELLOW : RED; }
function getLabel(s) { return s >= 80 ? "Excelente" : s >= 60 ? "Bueno" : s >= 40 ? "En desarrollo" : s >= 20 ? "Requiere atención" : "Crítico"; }

function Ring({ score }) {
  const size = 130, r = 55, c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto 10px" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={65} cy={65} r={r} stroke="#E8ECF1" strokeWidth={10} fill="none" />
        <circle cx={65} cy={65} r={r} stroke={getColor(score)} strokeWidth={10} fill="none"
          strokeDasharray={c} strokeDashoffset={c - (score / 100) * c} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 34, fontWeight: 800 }}>{score}</span>
        <span style={{ fontSize: 10, color: GRAY, letterSpacing: 1, textTransform: "uppercase" }}>de 100</span>
      </div>
    </div>
  );
}

function Badge({ status }) {
  const s = STATUS[status];
  return <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 12, fontWeight: 600, background: s.bg, color: s.text, whiteSpace: "nowrap" }}>{s.label}</span>;
}

const PRIORITIES = [
  { title: "Regularizar encuadre laboral de freelancers", desc: "2 colaboradores con exclusividad, horario fijo y herramientas de la empresa.", risk: 7200000, basis: "Arts. 8-10 Ley 24.013 + art. 1 Ley 25.323", u: "red" },
  { title: "Contratar seguro de vida obligatorio", desc: "Obligatorio por Dto. 1567/74. Sin cobertura, el empleador responde con patrimonio propio.", risk: 3500000, basis: "Dto. 1567/74 + Ley 24.557 (Res. SRT 37/2025)", u: "red" },
  { title: "Corregir categorías de empleados en CCT", desc: "2 empleados en categoría inferior. Diferencias salariales reclamables retroactivamente.", risk: 3600000, basis: "LCT art. 245 + CCT aplicable", u: "red" },
  { title: "Regularizar registración de remuneraciones", desc: "3 empleados con parte del sueldo en negro. La Ley Bases derogó las multas de la Ley 24.013, pero la conducta sigue siendo ilegal. Reclamos por daños vía derecho común + multa ARCA del 65% de aportes omitidos + denuncia obligatoria del trabajador ante ARCA (art. 7° ter Ley 27.802).", risk: 5850000, basis: "Arts. 1716/1717 CCCN + RG 1566/10 + art. 7° ter Ley 27.802", u: "red" },
  { title: "Implementar protocolo de datos sensibles", desc: "App procesa datos de salud sin consentimiento reforzado ni protocolo documentado.", risk: 2500000, basis: "Ley 25.326 arts. 7, 31, 32 + Res. AAIP 244/2022", u: "red" },
  { title: "Implementar programa de integridad", desc: "Ley 27.401: responsabilidad penal empresaria. El programa es atenuante obligatorio.", risk: 1500000, basis: "Ley 27.401 arts. 22-23", u: "yellow" },
  { title: "Documentar política de uso de IA", desc: "IA en producción sin política. Socios responden personalmente ante incidente.", risk: 1500000, basis: "Convenio 108+ · Proyecto ley IA Argentina 2026", u: "yellow" },
];

const HISTORY = [
  { date: "12 mayo 2026", action: "T&C actualizados. Exposición reducida en $320.000.", s: "green" },
  { date: "5 mayo 2026", action: "Reunión presencial. 3 contratos revisados con cláusula de PI.", s: "green" },
  { date: "28 abril 2026", action: "Borrador onboarding entregado. Pendiente aprobación CTO.", s: "yellow" },
  { date: "15 abril 2026", action: "Contrato template v2 finalizado. Exposición reducida en $1.800.000.", s: "green" },
  { date: "2 abril 2026", action: "Videollamada mensual. Plan Q2 definido.", s: "green" },
  { date: "20 marzo 2026", action: "Política de privacidad v1.2 publicada.", s: "green" },
  { date: "15 marzo 2026", action: "Organigrama y roles entregados.", s: "green" },
  { date: "1 marzo 2026", action: "Diagnóstico inicial completado. Score: 28/100. Exposición: $41.190.000.", s: "blue" },
];

const TABS = [
  ...EJES.map(e => ({ id: e.id, label: e.name.split(" ").slice(0, 2).join(" "), icon: e.icon })),
  { id: "prio", label: "Prioridades", icon: "🎯" },
  { id: "hist", label: "Historial", icon: "🕐" },
];

export default function Page() {
  const [tab, setTab] = useState(EJES[0].id);
  const [expanded, setExpanded] = useState(null);
  const allItems = EJES.flatMap(e => e.items);
  const globalScore = getScore(allItems);
  const totalRisk = EJES.reduce((s, e) => s + e.risk, 0);
  const counts = { green: allItems.filter(i => i.status === "green").length, yellow: allItems.filter(i => i.status === "yellow").length, red: allItems.filter(i => i.status === "red").length };
  const activeEje = EJES.find(e => e.id === tab);

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FB" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #2E86C1 100%)`, padding: "env(safe-area-inset-top, 12px) 20px 16px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", opacity: 0.6, color: "#fff" }}>Dashboard de salud legal</div>
            <h1 style={{ margin: "2px 0 0", fontSize: 17, fontWeight: 800, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>TechCo Solutions S.R.L.</h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: "rgba(255,255,255,0.15)", fontSize: 10, color: "#fff" }}>Plan estratégico · $500.000/mes</span>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", marginTop: 3 }}>Actualizado: mayo 2026 · Mes 3</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 16px 40px", fontFamily: "'DM Sans', sans-serif" }}>
        {/* Score */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "24px 20px", textAlign: "center", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <Ring score={globalScore} />
          <div style={{ fontSize: 14, fontWeight: 700, color: getColor(globalScore) }}>{getLabel(globalScore)}</div>
          <p style={{ fontSize: 11, color: GRAY, margin: "4px auto 14px", maxWidth: 320 }}>Tu empresa mejoró 12 puntos desde el diagnóstico inicial</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
            {[["green", "Resueltos"], ["yellow", "En proceso"], ["red", "Pendientes"]].map(([k, l]) => (
              <div key={k}><div style={{ fontSize: 20, fontWeight: 800, color: STATUS[k].color }}>{counts[k]}</div><div style={{ fontSize: 9, color: GRAY, textTransform: "uppercase" }}>{l}</div></div>
            ))}
          </div>
        </div>

        {/* Risk */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 12, marginBottom: 16, background: "#fff", border: "1.5px solid #F1948A", boxShadow: "0 1px 4px rgba(231,76,60,0.1)" }}>
          <span style={{ fontSize: 22 }}>⚠️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1, color: GRAY }}>Exposición económica total estimada</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: RED }}>{fmt(totalRisk)}</div>
            <div style={{ fontSize: 10, color: GRAY, marginTop: 2 }}>Incluye indemnizaciones, multas, costos litigiosos y contingencias por los {counts.red} puntos pendientes.</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #E8ECF1", marginBottom: 18, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setExpanded(null); }}
              style={{ padding: "9px 10px", fontSize: 11, cursor: "pointer", whiteSpace: "nowrap", color: tab === t.id ? ACCENT : GRAY, borderBottom: tab === t.id ? `2px solid ${ACCENT}` : "2px solid transparent", fontWeight: tab === t.id ? 700 : 400, background: "none", border: "none", borderBottomStyle: "solid", fontFamily: "inherit", transition: "all 0.2s" }}>
              <span style={{ marginRight: 3 }}>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Eje panel */}
        {activeEje && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 20 }}>{activeEje.icon}</span>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: DARK, flex: 1 }}>{activeEje.name}</h3>
              <span style={{ fontSize: 17, fontWeight: 800, color: getColor(getScore(activeEje.items)) }}>{getScore(activeEje.items)}%</span>
            </div>
            <p style={{ fontSize: 11, color: GRAY, margin: "0 0 8px" }}>{activeEje.desc}</p>

            {activeEje.risk > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 8, marginBottom: 12, background: "#FDEDEC", border: "1px solid #F1948A" }}>
                <span>⚠️</span>
                <span style={{ fontSize: 10, color: "#7B241C", flex: 1 }}>Exposición en este eje</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: RED }}>{fmt(activeEje.risk)}</span>
              </div>
            )}

            {/* Mini bar */}
            <div style={{ width: "100%", height: 5, borderRadius: 3, background: "#E8ECF1", marginBottom: 14, overflow: "hidden" }}>
              <div style={{ width: `${getScore(activeEje.items)}%`, height: "100%", borderRadius: 3, background: getColor(getScore(activeEje.items)), transition: "width 0.8s ease" }} />
            </div>

            {activeEje.items.map((item, i) => (
              <div key={i} onClick={() => setExpanded(expanded === `${tab}-${i}` ? null : `${tab}-${i}`)}
                style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", borderRadius: 10, marginBottom: 6, background: "#fff", border: "1px solid #E8ECF1", cursor: "pointer", transition: "box-shadow 0.2s", boxShadow: expanded === `${tab}-${i}` ? "0 2px 12px rgba(27,79,114,0.1)" : "none" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: STATUS[item.status].color, flexShrink: 0, marginTop: 5 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: DARK }}>{item.label}</div>
                  {expanded === `${tab}-${i}` && (
                    <div style={{ fontSize: 11, color: GRAY, marginTop: 4, lineHeight: 1.6, borderTop: "1px solid #F0F2F5", paddingTop: 6 }}>{item.detail}</div>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, flexShrink: 0 }}>
                  <Badge status={item.status} />
                  {item.risk > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: RED }}>{fmt(item.risk)}</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Prioridades */}
        {tab === "prio" && (
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: DARK, margin: "0 0 14px" }}>🎯 Prioridades del mes — junio 2026</h3>
            {PRIORITIES.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", borderRadius: 10, marginBottom: 8, background: "#fff", border: "1px solid #E8ECF1" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, background: STATUS[p.u].bg, color: STATUS[p.u].text }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: DARK }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: GRAY, marginTop: 3, lineHeight: 1.5 }}>{p.desc}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
                    <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 4, fontWeight: 600, background: STATUS[p.u].bg, color: STATUS[p.u].text }}>Exposición: {fmt(p.risk)}</span>
                    <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 4, fontWeight: 600, background: "#EBF5FB", color: "#1A5276" }}>{p.basis}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Historial */}
        {tab === "hist" && (
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: DARK, margin: "0 0 14px" }}>🕐 Historial de avances</h3>
            {HISTORY.map((h, i) => (
              <div key={i} style={{ display: "flex", gap: 12, position: "relative", paddingBottom: 14 }}>
                {i < HISTORY.length - 1 && <div style={{ position: "absolute", left: 11, top: 24, bottom: 0, width: 1, background: "#E8ECF1" }} />}
                <div style={{ width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 10, background: h.s === "blue" ? "#EBF5FB" : STATUS[h.s]?.bg || "#EBF5FB", color: h.s === "blue" ? "#1A5276" : STATUS[h.s]?.text || "#1A5276" }}>
                  {h.s === "green" ? "✓" : h.s === "yellow" ? "→" : "⚑"}
                </div>
                <div>
                  <div style={{ fontSize: 9, color: GRAY, textTransform: "uppercase", letterSpacing: 0.5 }}>{h.date}</div>
                  <div style={{ fontSize: 12, color: DARK, marginTop: 1 }}>{h.action}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", paddingTop: 20, marginTop: 16, borderTop: "1px solid #E8ECF1" }}>
          <div style={{ fontSize: 12, color: GRAY, fontWeight: 600 }}>Estudio Jurídico Monteagudo & Fiorentino</div>
          <div style={{ fontSize: 10, color: "#BDC3C7", marginTop: 2 }}>oscarmonteagudodominguez@gmail.com · 0221-3041490</div>
        </div>
      </div>
    </div>
  );
}
