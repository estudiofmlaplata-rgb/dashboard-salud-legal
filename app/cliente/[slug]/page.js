'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { CLIENTES } from "../../../data/clientes";
import { resolveItemRisk, INFLATION_MULTIPLIER, LAST_INFLATION_UPDATE } from "../../../data/catalogo-riesgos";

const ACCENT = "#1B4F72";
const GREEN = "#27AE60";
const YELLOW = "#F39C12";
const RED = "#E74C3C";
const DARK = "#1C2833";
const GRAY = "#95A5A6";

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

function getEjeRisk(eje) {
  return eje.items.reduce((sum, item) => sum + resolveItemRisk(item), 0);
}

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

export default function ClienteDashboard() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;
  const cliente = CLIENTES[slug];
  const [authorized, setAuthorized] = useState(false);
  const [tab, setTab] = useState(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem(`auth_${slug}`);
      if (auth === "ok") setAuthorized(true);
      else router.push("/");
    }
  }, [slug, router]);

  useEffect(() => {
    if (cliente && !tab) setTab(cliente.ejes[0].id);
  }, [cliente, tab]);

  if (!authorized || !cliente || !tab) {
    return <div style={{ padding: 40, textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>Cargando...</div>;
  }

  const allItems = cliente.ejes.flatMap(e => e.items);
  const globalScore = getScore(allItems);
  const totalRisk = cliente.ejes.reduce((s, e) => s + getEjeRisk(e), 0);
  const counts = {
    green: allItems.filter(i => i.status === "green").length,
    yellow: allItems.filter(i => i.status === "yellow").length,
    red: allItems.filter(i => i.status === "red").length
  };
  const activeEje = cliente.ejes.find(e => e.id === tab);

  const TABS = [
    ...cliente.ejes.map(e => ({ id: e.id, label: e.name.split(" ").slice(0, 2).join(" "), icon: e.icon })),
    { id: "prio", label: "Prioridades", icon: "🎯" },
    { id: "hist", label: "Historial", icon: "🕐" },
  ];

  function logout() {
    sessionStorage.removeItem(`auth_${slug}`);
    router.push("/");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FB", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #2E86C1 100%)`, padding: "env(safe-area-inset-top, 12px) 20px 16px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", opacity: 0.6, color: "#fff" }}>Dashboard de salud legal</div>
            <h1 style={{ margin: "2px 0 0", fontSize: 17, fontWeight: 800, color: "#fff" }}>{cliente.nombre}</h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: "rgba(255,255,255,0.15)", fontSize: 10, color: "#fff" }}>{cliente.plan}</span>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", marginTop: 3 }}>{cliente.actualizado} · {cliente.mes}</div>
            <button onClick={logout} style={{ background: "none", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "3px 10px", borderRadius: 12, fontSize: 10, cursor: "pointer", marginTop: 6 }}>Salir</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 16px 40px" }}>
        <div style={{ background: "#fff", borderRadius: 14, padding: "24px 20px", textAlign: "center", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <Ring score={globalScore} />
          <div style={{ fontSize: 14, fontWeight: 700, color: getColor(globalScore) }}>{getLabel(globalScore)}</div>
          <p style={{ fontSize: 11, color: GRAY, margin: "4px auto 14px", maxWidth: 320 }}>Score inicial: {cliente.scoreInicial}/100 · Mejora: +{globalScore - cliente.scoreInicial} puntos</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
            {[["green", "Resueltos"], ["yellow", "En proceso"], ["red", "Pendientes"]].map(([k, l]) => (
              <div key={k}><div style={{ fontSize: 20, fontWeight: 800, color: STATUS[k].color }}>{counts[k]}</div><div style={{ fontSize: 9, color: GRAY, textTransform: "uppercase" }}>{l}</div></div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 12, marginBottom: 16, background: "#fff", border: "1.5px solid #F1948A", boxShadow: "0 1px 4px rgba(231,76,60,0.1)" }}>
          <span style={{ fontSize: 22 }}>⚠️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1, color: GRAY }}>Exposición económica total estimada</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: RED }}>{fmt(totalRisk)}</div>
            <div style={{ fontSize: 10, color: GRAY, marginTop: 2 }}>
              {INFLATION_MULTIPLIER !== 1 && <>Valores ajustados ×{INFLATION_MULTIPLIER} · </>}
              Actualizado: {LAST_INFLATION_UPDATE}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #E8ECF1", marginBottom: 18, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setExpanded(null); }}
              style={{ padding: "9px 10px", fontSize: 11, cursor: "pointer", whiteSpace: "nowrap", color: tab === t.id ? ACCENT : GRAY, borderBottom: tab === t.id ? `2px solid ${ACCENT}` : "2px solid transparent", fontWeight: tab === t.id ? 700 : 400, background: "none", border: "none", borderBottomStyle: "solid", transition: "all 0.2s" }}>
              <span style={{ marginRight: 3 }}>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {activeEje && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 20 }}>{activeEje.icon}</span>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: DARK, flex: 1 }}>{activeEje.name}</h3>
              <span style={{ fontSize: 17, fontWeight: 800, color: getColor(getScore(activeEje.items)) }}>{getScore(activeEje.items)}%</span>
            </div>
            <p style={{ fontSize: 11, color: GRAY, margin: "0 0 8px" }}>{activeEje.desc}</p>

            {getEjeRisk(activeEje) > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 8, marginBottom: 12, background: "#FDEDEC", border: "1px solid #F1948A" }}>
                <span>⚠️</span>
                <span style={{ fontSize: 10, color: "#7B241C", flex: 1 }}>Exposición en este eje</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: RED }}>{fmt(getEjeRisk(activeEje))}</span>
              </div>
            )}

            <div style={{ width: "100%", height: 5, borderRadius: 3, background: "#E8ECF1", marginBottom: 14, overflow: "hidden" }}>
              <div style={{ width: `${getScore(activeEje.items)}%`, height: "100%", borderRadius: 3, background: getColor(getScore(activeEje.items)), transition: "width 0.8s ease" }} />
            </div>

            {activeEje.items.map((item, i) => {
              const itemRisk = resolveItemRisk(item);
              return (
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
                    {itemRisk > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: RED }}>{fmt(itemRisk)}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "prio" && cliente.prioridades && (
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: DARK, margin: "0 0 14px" }}>🎯 Prioridades del mes</h3>
            {cliente.prioridades.map((p, i) => {
              const pRisk = resolveItemRisk(p);
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", borderRadius: 10, marginBottom: 8, background: "#fff", border: "1px solid #E8ECF1" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, background: STATUS[p.u].bg, color: STATUS[p.u].text }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: DARK }}>{p.title}</div>
                    <div style={{ fontSize: 11, color: GRAY, marginTop: 3, lineHeight: 1.5 }}>{p.desc}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
                      {pRisk > 0 && <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 4, fontWeight: 600, background: STATUS[p.u].bg, color: STATUS[p.u].text }}>Exposición: {fmt(pRisk)}</span>}
                      {p.basis && <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 4, fontWeight: 600, background: "#EBF5FB", color: "#1A5276" }}>{p.basis}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "hist" && cliente.historial && (
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: DARK, margin: "0 0 14px" }}>🕐 Historial de avances</h3>
            {cliente.historial.map((h, i) => (
              <div key={i} style={{ display: "flex", gap: 12, position: "relative", paddingBottom: 14 }}>
                {i < cliente.historial.length - 1 && <div style={{ position: "absolute", left: 11, top: 24, bottom: 0, width: 1, background: "#E8ECF1" }} />}
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

        <div style={{ textAlign: "center", paddingTop: 20, marginTop: 16, borderTop: "1px solid #E8ECF1" }}>
          <div style={{ fontSize: 12, color: GRAY, fontWeight: 600 }}>Estudio Jurídico Monteagudo & Fiorentino</div>
          <div style={{ fontSize: 10, color: "#BDC3C7", marginTop: 2 }}>oscarmonteagudodominguez@gmail.com · 0221-3041490</div>
        </div>
      </div>
    </div>
  );
}
