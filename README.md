# Dashboard de Salud Legal
## Estudio Jurídico Monteagudo & Fiorentino

Panel de control legal y operativo para clientes retainer.

---

## Cómo subir a Vercel (5 minutos)

### Paso 1: Crear cuenta en GitHub y Vercel
1. Entrá a **github.com** y creá una cuenta (gratis)
2. Entrá a **vercel.com** y registrate con tu cuenta de GitHub

### Paso 2: Subir el proyecto a GitHub
1. En GitHub, hacé click en **"New repository"**
2. Ponele nombre: `dashboard-salud-legal`
3. Dejalo como **privado**
4. Subí todos los archivos de esta carpeta al repositorio

**Opción rápida desde terminal (si tenés Git instalado):**
```bash
cd dashboard-legal
git init
git add .
git commit -m "Dashboard de salud legal v1"
git remote add origin https://github.com/TU-USUARIO/dashboard-salud-legal.git
git push -u origin main
```

### Paso 3: Deploy en Vercel
1. En **vercel.com**, hacé click en **"Add New Project"**
2. Seleccioná el repositorio `dashboard-salud-legal`
3. Vercel detecta automáticamente que es Next.js
4. Hacé click en **"Deploy"**
5. En 60 segundos tenés tu dashboard online con un link tipo: `dashboard-salud-legal.vercel.app`

### Paso 4: Dominio personalizado (opcional)
- En Vercel > Settings > Domains podés agregar un dominio propio
- Ejemplo: `salud.mflegales.com.ar`

---

## Cómo funciona como PWA (app en el celular)

Una vez que el sitio está online:
1. Abrí el link desde Chrome en el celular
2. Chrome muestra un banner "Agregar a pantalla de inicio"
3. El cliente toca "Agregar" y aparece el ícono en su celular
4. Se abre como una app nativa (sin barra de navegador)

---

## Cómo actualizar los datos de un cliente

Editá el archivo `app/page.js`:
- Los datos de cada eje están en el array `EJES`
- Las prioridades están en `PRIORITIES`
- El historial está en `HISTORY`
- El nombre del cliente y plan están en el header del componente `Page`

Cada vez que guardás y hacés push a GitHub, Vercel actualiza automáticamente.

---

## Estructura del proyecto

```
dashboard-legal/
├── app/
│   ├── globals.css          # Estilos globales
│   ├── layout.js            # Layout con metadata PWA
│   └── page.js              # Dashboard completo
├── public/
│   ├── icon-192.png         # Ícono PWA 192x192
│   ├── icon-512.png         # Ícono PWA 512x512
│   ├── manifest.json        # Manifest PWA
│   └── sw.js                # Service Worker (offline)
├── next.config.js           # Configuración Next.js
├── package.json             # Dependencias
└── README.md                # Este archivo
```

---

## Próximos pasos sugeridos

- [ ] Personalizar los íconos con el logo de MF Legales
- [ ] Agregar autenticación para que cada cliente vea solo su dashboard
- [ ] Conectar a una base de datos para actualizar sin tocar código
- [ ] Agregar notificaciones push cuando se resuelve un item

---

*Desarrollado con Next.js 14 + React + PWA*
