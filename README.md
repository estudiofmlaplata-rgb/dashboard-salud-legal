[README.md](https://github.com/user-attachments/files/27780106/README.md)
# Dashboard de Salud Legal v3
## Estudio Jurídico Monteagudo & Fiorentino

Panel de control legal y operativo multi-cliente con catálogo central de riesgos y ajuste por inflación.

---

## ¿Qué hace esta app?

- **Login de clientes**: cada cliente entra con su código y contraseña.
- **Dashboard personalizado**: cada cliente ve solo sus propios datos.
- **Panel admin**: vos ves el resumen de todos los clientes, ingresos, exposición gestionada.
- **Catálogo central de riesgos**: editás un solo lugar y se actualiza en todos los clientes.
- **Multiplicador de inflación**: aplicás un factor (ej: ×1.20) y todos los montos se ajustan automáticamente.

---

## 🆕 Lo nuevo en v3: catálogo de riesgos

### Estructura

Hay dos archivos clave:

**`data/catalogo-riesgos.js`** — el catálogo central:
- Cada tipo de riesgo tiene un **monto base** (ej: encuadre laboral = $3.600.000)
- Hay un **multiplicador de inflación** que se aplica a TODO el catálogo
- Cuando lo editás, se actualiza automáticamente en todos los clientes

**`data/clientes.js`** — los clientes:
- Cada item de un cliente referencia al catálogo con `riskId`
- Cuando aplica, multiplica por una `cantidad` (ej: 2 freelancers)

### Ejemplo

En `data/clientes.js`:
```js
{
  label: "Encuadre laboral de freelancers",
  status: "red",
  riskId: "encuadre_freelancer",   // ← referencia al catálogo
  cantidad: 2                        // ← multiplica por 2
}
```

En `data/catalogo-riesgos.js`:
```js
encuadre_freelancer: { base: 3600000, ... }
```

Resultado mostrado al cliente: $3.600.000 × 2 × INFLATION_MULTIPLIER

---

## Cómo actualizar montos cuando hay inflación

### Opción 1: Desde el panel admin (recomendada)

1. Entrá a `tu-app.vercel.app/admin` con tu contraseña
2. Hacé click en la pestaña **"Catálogo de riesgos"**
3. Cambiá el multiplicador de inflación (ej: de 1.00 a 1.20 para +20%)
4. Opcionalmente, ajustá montos base individuales si cambió una ley específica
5. Click en **"Copiar código actualizado"**
6. Pegalo en `data/catalogo-riesgos.js` en GitHub
7. Vercel actualiza solo en 30 segundos

### Opción 2: Editando el archivo directo

Editá `data/catalogo-riesgos.js` y cambiá:
```js
export const INFLATION_MULTIPLIER = 1.20;  // +20%
export const LAST_INFLATION_UPDATE = "Junio 2026";
```

---

## Cómo agregar un cliente nuevo

1. Abrí `data/clientes.js`
2. Copiá el bloque completo de un cliente existente
3. Cambiá el **slug**, **password**, **nombre**, **plan**, y los items
4. Para cada item con riesgo, usá `riskId` referenciando al catálogo
5. Si necesitás un riesgo que no está en el catálogo, agregalo en `data/catalogo-riesgos.js`
6. Push a GitHub → Vercel actualiza solo

---

## ⚠️ Antes de subir: configurar contraseñas

En `data/clientes.js`:
```js
export const ADMIN_PASSWORD = "TU_CLAVE_FUERTE_AQUI";  // ← cambiá esta
```

Y la `password` de cada cliente individual.

---

## Estructura del proyecto

```
dashboard-legal-v3/
├── app/
│   ├── globals.css
│   ├── layout.js
│   ├── page.js                    # Login cliente
│   ├── admin/page.js              # Panel admin con catálogo editable
│   └── cliente/[slug]/page.js     # Dashboard cliente
├── data/
│   ├── catalogo-riesgos.js        # ⭐ Catálogo central + inflación
│   └── clientes.js                # ⭐ Datos por cliente
├── public/ (íconos PWA + manifest + sw)
├── next.config.js
├── package.json
└── README.md
```

---

## Deploy

Si ya tenés un proyecto Vercel:
1. Reemplazá los archivos en GitHub con los de esta carpeta
2. Vercel detecta el push y actualiza solo en 30-60 segundos

Si es la primera vez:
1. Subí todo a un repositorio de GitHub respetando carpetas
2. En vercel.com → Add New Project → seleccioná el repo → Deploy
