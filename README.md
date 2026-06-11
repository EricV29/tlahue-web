<div align="center">
    <img width="80" src="./public/logo.svg" alt="TlahueWeb"/>

# Tlahuelilpan - Portal Web

Portal digital del municipio de Tlahuelilpan, Hidalgo.

  <img width="1200" height="475" alt="HeroTlahuelilpan" src="./src/assets/tlahuelilpanHero.png" />
</div>

#

<p align="center" >
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=vite,react,tailwind,typescript,supabase,threejs,pnpm" />
    <img src="https://skills.syvixor.com/api/icons?i=mapbox,gsap,opencode,cloudinary" />
  </a>
  <br />
  <img src="https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=000" />
  <img src="https://img.shields.io/badge/Vite_7-646CFF?logo=vite&logoColor=fff" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_3-06B6D4?logo=tailwindcss&logoColor=fff" />
  <img src="https://img.shields.io/badge/TypeScript_5.9-3178C6?logo=typescript&logoColor=fff" />
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=fff" />
  <img src="https://img.shields.io/badge/pnpm_11-F69220?logo=pnpm&logoColor=fff" />
</p>

## 📋 Tabla de contenidos

- [Tlahuelilpan - Portal Web](#tlahuelilpan---portal-web)
- [](#)
  - [📋 Tabla de contenidos](#-tabla-de-contenidos)
  - [📖 Descripción](#-descripción)
  - [🛠️ Tecnologías](#️-tecnologías)
  - [✅ Requisitos previos](#-requisitos-previos)
  - [🚀 Instalación](#-instalación)
  - [⚙️ Configuración](#️-configuración)
  - [💻 Uso](#-uso)
  - [📁 Estructura del Proyecto](#-estructura-del-proyecto)
  - [📄 Licencia](#-licencia)

---

## 📖 Descripción

**TlahueWeb** es el portal digital del municipio de Tlahuelilpan, Hidalgo. Una plataforma web moderna e interactiva que centraliza información municipal, eventos, galería multimedia, mapas 3D y directorio gubernamental, ofreciendo a la ciudadanía y visitantes una experiencia de navegación inmersiva y accesible.

- **Mapa Interactivo 3D**: Visualización del municipio con **Mapbox GL** y **Three.js**, incluyendo modelos GLTF de 7 monumentos históricos, límites territoriales y ciclos dinámicos de día/noche.
- **Galería Multimedia**: Exploración de imágenes con búsqueda por texto, filtrado por categorías, scroll infinito y lightbox con navegación por teclado.
- **Calendario de Eventos**: Visualización mensual de eventos cívicos y culturales con datos obtenidos en tiempo real desde la API.
- **Directorio Gubernamental**: Presentación interactiva del gabinete municipal con selector circular, datos de contacto y enlaces oficiales.
- **Línea de Tiempo Histórica**: Recorrido por la historia de Tlahuelilpan desde la época otomí hasta la actualidad, con animaciones _scroll-driven_ en desktop y carrusel táctil en móvil.
- **Diseño Responsivo**: Interfaz mobile-first construida con **Tailwind CSS 4**, accesible y optimizada para todos los dispositivos.
- **Optimización de Medios**: Entrega de imágenes optimizadas mediante **Cloudinary** en formato `.webp`.
- **Componentes Accesibles**: Navegación por teclado, _skip-to-content_, _focus trap_ en modales y atributos ARIA.
-

---

## 🛠️ Tecnologías

| Tecnología             | Propósito                                                      |
| ---------------------- | -------------------------------------------------------------- |
| **React 19**           | Biblioteca de interfaz de usuario                              |
| **TypeScript ~5.7**    | Tipado estático y seguridad en el código                       |
| **Vite 6**             | Build tool y dev server con HMR                                |
| **Tailwind CSS 4**     | Framework de estilos utilitario (configuración vía CSS)        |
| **React Router DOM 7** | Enrutamiento cliente (SPA)                                     |
| **Mapbox GL JS ~3.24** | Motor de mapas con estilo personalizado                        |
| **react-map-gl ~8.1**  | Bindings de Mapbox para React                                  |
| **Three.js ~0.184**    | Renderizado 3D con WebGL sobre el mapa                         |
| **GSAP ~3.15**         | Animaciones de alta performance (scroll-triggered)             |
| **Cloudinary**         | Alojamiento y optimización de imágenes                         |
| **ESLint 9**           | Linter con reglas para TypeScript, React Hooks y React Refresh |

---

## ✅ Requisitos previos

- Node.js
- pnpm
- Una cuenta en [Supabase](https://www.supabase.com)
- Una cuenta en [Cloudinary](https://www.cloudinary.com)
- Una cuenta en [Mapbox](https://www.mapbox.com)

---

## 🚀 Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/EricV29/tlahue-web.git
cd tlahue-web

# 2. Instalar dependencias
pnpm install
```

---

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto con tus credenciales:

```env
VITE_MAPBOX_TOKEN="pk.tu_token_aqui"
VITE_MAPBOX_STYLE="mapbox://styles/tu_usuario/tu_estilo"
VITE_API_URL="http://localhost:3000/api"
VITE_CLOUDINARY_CLOUD_NAME="tu_cloud_name"
```

---

## 💻 Uso

```bash
# Desarrollo
pnpm dev

# Typecheck + build
pnpm build

# Vista previa del build
pnpm preview
```

Accede a la app en `http://localhost:5173`.

---

## 📁 Estructura del Proyecto

```
src/
├── main.tsx                    # Punto de entrada (BrowserRouter + fuentes)
├── App.tsx                     # Componente raíz (rutas / y /galeria)
├── index.css                   # Tailwind 4 (@import + @theme)
│
├── assets/                     # Imágenes, SVGs y recursos estáticos
├── components/
│   ├── Navbar.tsx              # Barra de navegación responsiva
│   ├── Hero.tsx                # Hero section full-viewport
│   ├── Events.tsx              # Calendario de eventos mensual
│   ├── MapTlahue.tsx           # Mapa 3D interactivo (Mapbox + Three.js)
│   ├── Government.tsx          # Directorio de funcionarios
│   ├── History.tsx             # Línea de tiempo histórica
│   ├── GalleryPage.tsx         # Galería completa con búsqueda y filtros
│   ├── GalleryCard.tsx         # Tarjeta individual de galería
│   ├── GalleryLightbox.tsx     # Lightbox con navegación
│   ├── Footer.tsx              # Pie de página
│   ├── FloatingSocial.tsx      # Botón flotante de redes sociales
│   ├── FloatingEmergency.tsx   # Botón flotante de emergencias
│   ├── ScrollToTop.tsx         # Scroll-to-top en cambio de ruta
│   └── icons/                  # Componentes SVG (21 iconos)
│
├── data/
│   └── modelos3D.json          # Configuración de modelos 3D (7 puntos)
├── hooks/
│   └── useFocusTrap.ts         # Hook de focus trap para modales
├── services/
│   ├── api.ts                  # Wrapper base de fetch
│   ├── events.service.ts       # API de eventos
│   ├── government.service.ts   # API de gobierno
│   ├── gallery.service.ts      # API de galería (paginada)
│   └── categories.service.ts   # API de categorías
└── utils/
    └── cloudinary.ts           # Constructor de URLs de Cloudinary
```

## 📄 Licencia

Este proyecto es de código abierto. Consulta el archivo `LICENSE` para más detalles.
