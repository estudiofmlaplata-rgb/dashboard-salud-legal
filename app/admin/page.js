'use client';

import { useState, useEffect } from "react";
import { CLIENTES, ADMIN_PASSWORD } from "../../data/clientes";
import { RIESGOS, INFLATION_MULTIPLIER, LAST_INFLATION_UPDATE, resolveItemRisk } from "../../data/catalogo-riesgos";

const ACCENT = "#1B4F72";
const GREEN = "#27AE60";
const YELLOW = "#F39C12";
const RED = "#E74C3C";
const DARK = "#1C2833";
const GRAY = "#95A5A6";

function getScore(items) {
  const v = { green: 100, yellow: 50, red: 0 };
  return Math.round(items.reduce((s, i) => s + v[i.status], 0) / items.length);
}
function fmt(n) { return "$" + n.toLocaleString("es-AR"); }
function getColor(s) { return s >= 70 ? GREEN : s >= 40 ? YELLOW : RED; }

function getEjeRisk(eje) {
  return eje.items.reduce((sum, item) => sum + resolveItemRisk(item), 0);
}

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [section, setSection] = useState("clientes");

  // Estado local para simular edición del catálogo
  const [editedRiesgos, setEditedRiesgos] = useState(RIESGOS);
  const [editedMultiplier, setEditedMultiplier] = useState(INFLATION_MULTIPLIER);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("admin_auth");
      if (auth === "ok") setAuthorized(true);
    }
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "ok");
      setAuthorized(true);
    } else {
      setError("Contraseña incorrecta.");
    }
  }

  function logout() {
    sessionStorage.removeItem("admin_auth");
    setAuthorized(false);
    setPassword("");
  }

  function updateRisk(id, newValue) {
    setEditedRiesgos({ ...editedRiesgos, [id]: { ...editedRiesgos[id], base: parseInt(newValue) || 0 } });
  }

  function generateCode() {
    const lines = [
      `// COPIÁ Y PEGÁ ESTE CONTENIDO EN data/catalogo-riesgos.js`,
      ``,
      `export const INFLATION_MULTIPLIER = ${editedMultiplier};`,
      `export const LAST_INFLATION_UPDATE = "${new Date().toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })}";`,
      ``,
      `export const RIESGOS = {`,
    ];
    Object.entries(editedRiesgos).forEach(([id, r]) => {
      lines.push(`  ${id}: {`);
      lines.push(`    label: ${JSON.stringify(r.label)},`);
      lines.push(`    base: ${r.base},`);
      lines.push(`    categoria: ${JSON.stringify(r.categoria)},`);
      lines.push(`    basis: ${JSON.stringify(r.basis)},`);
      lines.push(`  },`);
    });
    lines.push(`};`);
    lines.push(``);
    lines.push(`export function getRiskAmount(riskId, cantidad = 1) {`);
    lines.push(`  const r = RIESGOS[riskId];`);
    lines.push(`  if (!r) return 0;`);
    lines.push(`  return Math.round(r.base * cantidad * INFLATION_MULTIPLIER);`);
    lines.push(`}`);
    lines.push(``);
    lines.push(`export function resolveItemRisk(item) {`);
    lines.push(`  if (item.riskId) return getRiskAmount(item.riskId, item.cantidad || 1);`);
    lines.push(`  return item.risk || 0;`);
    lines.push(`}`);
    return lines.join("\n");
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(generateCode());
    alert("✓ Código copiado al portapapeles. Ahora pegalo en data/catalogo-riesgos.js");
  }

  if (!authorized) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1B4F72 0%, #2E86C1 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'DM Sans', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <div style={{ background: "#fff", borderRadius: 16, padding: "36px 28px", maxWidth: 380, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ width: 60, height: 60, borderRadius: 14, background: "#1B4F72", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, margin: "0 auto 14px" }}>🔐</div>
            <h1 style={{ fontSize: 18, fontWeight: 800, color: "#1C2833", marginBottom: 4 }}>Panel Administrador</h1>
            <p style={{ fontSize: 12, color: "#95A5A6" }}>Acceso restringido</p>
          </div>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#1C2833", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Contraseña de administrador</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #E8ECF1", borderRadius: 10, fontSize: 14, outline: "none" }}
                onFocus={(e) => e.target.style.borderColor = "#1B4F72"} onBlur={(e) => e.target.style.borderColor = "#E8ECF1"} required autoFocus />
            </div>
            {error && (<div style={{ padding: "10px 12px", background: "#FDEDEC", color: "#C0392B", borderRadius: 8, fontSize: 12, marginBottom: 14 }}>{error}</div>)}
            <button type="submit" style={{ width: "100%", padding: "12px", background: "#1B4F72", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Ingresar</button>
          </form>
          <div style={{ textAlign: "center", marginTop: 24, paddingTop: 18, borderTop: "1px solid #E8ECF1" }}>
            <a href="/" style={{ fontSize: 11, color: "#95A5A6", textDecoration: "none" }}>← Volver al login de clientes</a>
          </div>
        </div>
      </div>
    );
  }

  const clientesArr = Object.entries(CLIENTES).map(([slug, c]) => {
    const allItems = c.ejes.flatMap(e => e.items);
    const score = getScore(allItems);
    const totalRisk = c.ejes.reduce((s, e) => s + getEjeRisk(e), 0);
    const counts = {
      red: allItems.filter(i => i.status === "red").length,
      yellow: allItems.filter(i => i.status === "yellow").length,
      green: allItems.filter(i => i.status === "green").length,
    };
    return { slug, ...c, score, totalRisk, counts };
  });

  const totalIngresos = clientesArr.reduce((acc, c) => {
    const match = c.plan.match(/\$([\d.]+)/);
    if (!match) return acc;
    return acc + parseInt(match[1].replace(/\./g, ""));
  }, 0);

  const categorias = [...new Set(Object.values(editedRiesgos).map(r => r.categoria))];

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FB", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #2E86C1 100%)`, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", opacity: 0.6, color: "#fff" }}>Panel administrador</div>
          <h1 style={{ margin: "2px 0 0", fontSize: 18, fontWeight: 800, color: "#fff" }}>MF Legales · {clientesArr.length} clientes activos</h1>
        </div>
        <button onClick={logout} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", padding: "6px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Salir</button>
      </div>

      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E8ECF1", padding: "0 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 0 }}>
          {[
            { id: "clientes", label: "📊 Clientes" },
            { id: "catalogo", label: "💰 Catálogo de riesgos" },
          ].map(t => (
            <button key={t.id} onClick={() => setSection(t.id)}
              style={{ padding: "14px 18px", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", color: section === t.id ? ACCENT : GRAY, borderBottom: section === t.id ? `2px solid ${ACCENT}` : "2px solid transparent", fontWeight: section === t.id ? 700 : 500, background: "none", border: "none", borderBottomStyle: "solid", fontFamily: "inherit" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px 40px" }}>
        {section === "clientes" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
              <div style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", border: "1px solid #E8ECF1" }}>
                <div style={{ fontSize: 10, color: GRAY, textTransform: "uppercase", letterSpacing: 0.5 }}>Clientes activos</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: DARK, marginTop: 4 }}>{clientesArr.length}</div>
              </div>
              <div style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", border: "1px solid #E8ECF1" }}>
                <div style={{ fontSize: 10, color: GRAY, textTransform: "uppercase", letterSpacing: 0.5 }}>Ingresos mensuales</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: GREEN, marginTop: 4 }}>{fmt(totalIngresos)}</div>
              </div>
              <div style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", border: "1px solid #E8ECF1" }}>
                <div style={{ fontSize: 10, color: GRAY, textTransform: "uppercase", letterSpacing: 0.5 }}>Exposición gestionada</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: RED, marginTop: 4 }}>{fmt(clientesArr.reduce((s, c) => s + c.totalRisk, 0))}</div>
              </div>
            </div>

            <h2 style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 14 }}>Clientes</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {clientesArr.map(c => (
                <div key={c.slug} style={{ background: "#fff", borderRadius: 12, padding: "16px 18px", border: "1px solid #E8ECF1" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: DARK }}>{c.nombre}</div>
                      <div style={{ fontSize: 11, color: GRAY, marginTop: 2 }}>{c.plan} · {c.mes}</div>
                    </div>
                    <a href={`/cliente/${c.slug}`} onClick={(e) => { e.preventDefault(); sessionStorage.setItem(`auth_${c.slug}`, "ok"); window.location.href = `/cliente/${c.slug}`; }}
                      style={{ background: ACCENT, color: "#fff", padding: "6px 14px", borderRadius: 8, fontSize: 11, fontWeight: 600, textDecoration: "none" }}>
                      Ver dashboard →
                    </a>
                  </div>
                  <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontSize: 9, color: GRAY, textTransform: "uppercase", letterSpacing: 0.5 }}>Score</div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: getColor(c.score) }}>{c.score}/100</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 9, color: GRAY, textTransform: "uppercase", letterSpacing: 0.5 }}>Exposición</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: RED }}>{fmt(c.totalRisk)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 9, color: GRAY, textTransform: "uppercase", letterSpacing: 0.5 }}>Estado items</div>
                      <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>
                        <span style={{ color: GREEN }}>✓ {c.counts.green}</span>
                        <span style={{ color: YELLOW, marginLeft: 8 }}>◐ {c.counts.yellow}</span>
                        <span style={{ color: RED, marginLeft: 8 }}>✕ {c.counts.red}</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 9, color: GRAY, textTransform: "uppercase", letterSpacing: 0.5 }}>Código acceso</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: ACCENT, marginTop: 2, fontFamily: "monospace" }}>{c.slug}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {section === "catalogo" && (
          <>
            {/* Banner inflación */}
            <div style={{ background: "#fff", borderRadius: 12, padding: "20px 24px", marginBottom: 20, border: "1px solid #E8ECF1" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                <span style={{ fontSize: 28 }}>📈</span>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: DARK }}>Multiplicador de inflación</div>
                  <div style={{ fontSize: 11, color: GRAY, marginTop: 2 }}>Se aplica a TODOS los riesgos del catálogo automáticamente</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: DARK }}>Multiplicador:</label>
                  <input type="number" step="0.05" min="0.5" max="5" value={editedMultiplier}
                    onChange={(e) => setEditedMultiplier(parseFloat(e.target.value) || 1)}
                    style={{ width: 90, padding: "8px 10px", border: "1.5px solid #E8ECF1", borderRadius: 8, fontSize: 14, fontWeight: 700, color: ACCENT, outline: "none", textAlign: "center" }} />
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {[1.0, 1.1, 1.2, 1.3, 1.5].map(v => (
                    <button key={v} onClick={() => setEditedMultiplier(v)}
                      style={{ padding: "6px 10px", background: editedMultiplier === v ? ACCENT : "#fff", color: editedMultiplier === v ? "#fff" : GRAY, border: `1px solid ${editedMultiplier === v ? ACCENT : "#E8ECF1"}`, borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                      ×{v.toFixed(2)}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: GRAY }}>
                  {editedMultiplier > 1 ? `+${Math.round((editedMultiplier - 1) * 100)}% sobre valores base` : editedMultiplier < 1 ? `-${Math.round((1 - editedMultiplier) * 100)}% sobre valores base` : "Sin ajuste"}
                </div>
              </div>
            </div>

            {/* Catálogo por categoría */}
            <h2 style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 12 }}>💰 Catálogo de riesgos (montos base)</h2>
            <p style={{ fontSize: 11, color: GRAY, marginBottom: 18 }}>Editá los montos cuando cambien leyes, jurisprudencia o valores de referencia. El multiplicador de inflación se aplica automáticamente.</p>

            {categorias.map(cat => (
              <div key={cat} style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 12, fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>{cat}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {Object.entries(editedRiesgos).filter(([_, r]) => r.categoria === cat).map(([id, r]) => (
                    <div key={id} style={{ background: "#fff", borderRadius: 10, padding: "12px 16px", border: "1px solid #E8ECF1", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: DARK }}>{r.label}</div>
                        <div style={{ fontSize: 10, color: GRAY, marginTop: 2, fontFamily: "monospace" }}>{id}</div>
                        {r.basis && <div style={{ fontSize: 10, color: GRAY, marginTop: 2 }}>{r.basis}</div>}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ fontSize: 11, color: GRAY }}>$</span>
                          <input type="number" value={r.base} onChange={(e) => updateRisk(id, e.target.value)}
                            style={{ width: 130, padding: "6px 8px", border: "1px solid #E8ECF1", borderRadius: 6, fontSize: 13, fontWeight: 600, color: DARK, outline: "none", textAlign: "right" }} />
                        </div>
                        {editedMultiplier !== 1 && (
                          <div style={{ fontSize: 10, color: RED, fontWeight: 600 }}>
                            = {fmt(Math.round(r.base * editedMultiplier))} con inflación
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Botón generar código */}
            <div style={{ background: "#fff", borderRadius: 12, padding: "20px 24px", marginTop: 24, border: "2px solid #1B4F72" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 8 }}>📤 Aplicar cambios</h3>
              <p style={{ fontSize: 11, color: GRAY, marginBottom: 14, lineHeight: 1.6 }}>
                Los cambios que hagas acá son temporales en tu navegador. Para que se apliquen permanentemente a todos los clientes, hacé click en el botón, copiá el código generado, y pegalo en el archivo <code style={{ background: "#F8F9FB", padding: "1px 5px", borderRadius: 3, fontFamily: "monospace" }}>data/catalogo-riesgos.js</code> en GitHub. Vercel actualiza automáticamente en 30 segundos.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={copyToClipboard}
                  style={{ background: ACCENT, color: "#fff", border: "none", padding: "10px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  📋 Copiar código actualizado
                </button>
                <button onClick={() => setShowInstructions(!showInstructions)}
                  style={{ background: "#fff", color: ACCENT, border: `1px solid ${ACCENT}`, padding: "10px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  {showInstructions ? "Ocultar" : "Ver"} código
                </button>
              </div>
              {showInstructions && (
                <pre style={{ background: "#1C2833", color: "#A3E4C1", padding: 16, borderRadius: 8, marginTop: 14, fontSize: 10, overflow: "auto", maxHeight: 400, fontFamily: "Monaco, monospace", lineHeight: 1.5 }}>
                  {generateCode()}
                </pre>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
