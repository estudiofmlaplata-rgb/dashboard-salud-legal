'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CLIENTES } from "../data/clientes";

export default function HomePage() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    setError("");
    const cliente = CLIENTES[slug.toLowerCase().trim()];
    if (!cliente) {
      setError("Cliente no encontrado. Verificá el código de acceso.");
      return;
    }
    if (cliente.password !== password) {
      setError("Contraseña incorrecta.");
      return;
    }
    sessionStorage.setItem(`auth_${slug}`, "ok");
    router.push(`/cliente/${slug}`);
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1B4F72 0%, #2E86C1 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ background: "#fff", borderRadius: 16, padding: "36px 28px", maxWidth: 380, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 60, height: 60, borderRadius: 14, background: "#1B4F72", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, margin: "0 auto 14px" }}>MF</div>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: "#1C2833", marginBottom: 4 }}>Dashboard de Salud Legal</h1>
          <p style={{ fontSize: 12, color: "#95A5A6" }}>Estudio Monteagudo & Fiorentino</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#1C2833", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Código de acceso</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="ej: techco"
              style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #E8ECF1", borderRadius: 10, fontSize: 14, outline: "none", transition: "border 0.2s" }}
              onFocus={(e) => e.target.style.borderColor = "#1B4F72"}
              onBlur={(e) => e.target.style.borderColor = "#E8ECF1"}
              required
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#1C2833", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #E8ECF1", borderRadius: 10, fontSize: 14, outline: "none", transition: "border 0.2s" }}
              onFocus={(e) => e.target.style.borderColor = "#1B4F72"}
              onBlur={(e) => e.target.style.borderColor = "#E8ECF1"}
              required
            />
          </div>
          {error && (
            <div style={{ padding: "10px 12px", background: "#FDEDEC", color: "#C0392B", borderRadius: 8, fontSize: 12, marginBottom: 14, fontWeight: 500 }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{ width: "100%", padding: "12px", background: "#1B4F72", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "background 0.2s" }}
            onMouseOver={(e) => e.target.style.background = "#154360"}
            onMouseOut={(e) => e.target.style.background = "#1B4F72"}
          >
            Ingresar
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 24, paddingTop: 18, borderTop: "1px solid #E8ECF1" }}>
          <a href="/admin" style={{ fontSize: 11, color: "#95A5A6", textDecoration: "none" }}>Acceso administrador →</a>
        </div>
      </div>
    </div>
  );
}
