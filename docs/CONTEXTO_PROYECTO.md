# Contexto del Proyecto - FisioAnalaura

## 📋 Descripción General

**FisioAnalaura** es un sitio web profesional para la fisioterapeuta **Lic. Analaura Reyes Priego**. Es una aplicación web moderna y responsive diseñada para presentar sus servicios, credenciales, precios y facilitar el contacto con pacientes potenciales.

### Propósito
El sitio web sirve como plataforma de presentación profesional que permite a los pacientes:
- Conocer los servicios de fisioterapia ofrecidos
- Ver credenciales y experiencia profesional
- Consultar precios y planes de tratamiento
- Contactar y agendar citas de manera fácil

---

## 🛠️ Stack Tecnológico

### Frontend Framework
- **React 18.3.1** - Biblioteca de UI
- **TypeScript 5.8.3** - Tipado estático
- **Vite 5.4.19** - Build tool y dev server (puerto 8080)

### Routing
- **React Router DOM 6.30.1** - Navegación SPA

### UI Components
- **shadcn/ui** - Sistema de componentes basado en Radix UI
- **Radix UI** - Componentes primitivos accesibles
- **Lucide React** - Iconos

### Estilos
- **Tailwind CSS 3.4.17** - Framework CSS utility-first
- **tailwindcss-animate** - Animaciones
- **@tailwindcss/typography** - Estilos tipográficos
- **PostCSS** - Procesamiento de CSS

### Fuentes
- **Playfair Display** (serif) - Títulos y encabezados
- **Work Sans** (sans-serif) - Texto del cuerpo

### Estado y Datos
- **TanStack Query 5.83.0** - Gestión de estado del servidor
- **React Hook Form 7.61.1** - Manejo de formularios
- **Zod 3.25.76** - Validación de esquemas

### Utilidades
- **class-variance-authority** - Variantes de componentes
- **clsx** - Utilidad para clases condicionales
- **tailwind-merge** - Merge de clases de Tailwind
- **date-fns** - Manipulación de fechas

---

## 📁 Estructura del Proyecto

```
fisiolaura-reyes-clone-enhance/
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── clinic-hero.jpg
│   │   ├── therapist-portrait.jpg
│   │   └── therapist-portrait_2.jpg
│   ├── components/
│   │   ├── ui/              # Componentes shadcn/ui
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── NavLink.tsx
│   │   ├── PricingSection.tsx
│   │   ├── ServicesSection.tsx
│   │   └── TestimonialsSection.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── components.json          # Configuración shadcn/ui
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

---

## 🎨 Diseño y Estilo

### Paleta de Colores
El proyecto utiliza un sistema de colores basado en variables CSS con soporte para modo claro y oscuro:

**Modo Claro:**
- **Primary**: `hsl(187 78% 42%)` - Turquesa/azul verdoso
- **Accent**: `hsl(35 90% 55%)` - Naranja/amarillo
- **Background**: `hsl(195 30% 98%)` - Blanco azulado muy claro
- **Foreground**: `hsl(200 25% 15%)` - Azul oscuro

**Gradientes Personalizados:**
- `gradient-hero`: Gradiente principal para secciones hero
- `gradient-card`: Gradiente sutil para tarjetas
- `gradient-cta`: Gradiente para botones de llamada a la acción

### Tipografía
- **Display Font**: Playfair Display (serif) - Para títulos y encabezados
- **Body Font**: Work Sans (sans-serif) - Para texto del cuerpo

### Animaciones
- `fade-up`: Entrada desde abajo con fade
- `fade-in`: Fade simple
- `slide-in`: Deslizamiento desde la izquierda
- `float`: Flotación suave para elementos decorativos
- `pulse-soft`: Pulso suave

---

## 📄 Secciones del Sitio

### 1. **Navbar** (`Navbar.tsx`)
- Navegación fija con efecto de scroll
- Menú responsive (hamburguesa en móvil)
- Enlaces de navegación: Inicio, Sobre mí, Servicios, Precios, Opiniones, Contacto
- Botón CTA "Reservar Cita"
- Teléfono visible: +52 55 6505 3202

### 2. **Hero Section** (`HeroSection.tsx`)
- Sección principal con información destacada
- Presentación de la fisioterapeuta: **Lic. Analaura Reyes Priego**
- Credenciales: Doble titulación México & España
- Estadísticas: 10+ años, 5.0 calificación, 500+ pacientes
- Ubicaciones: Iztapalapa (CDMX), Metepec (México), Consulta Online
- Imagen profesional de la terapeuta
- Cédula Profesional: No. 10909109

### 3. **About Section** (`AboutSection.tsx`)
- Información sobre la profesional
- Enfoque: Fisioterapia humana y de calidad
- Valores:
  - Atención Personalizada
  - Doble Titulación
  - Basado en Evidencia
- Credenciales Académicas:
  - Universidad Europea de Madrid (España, 2015)
  - Universidad del Valle de México (México, 2017)
  - Instituto Nacional de Neurología - Diplomado en Abordaje Integral del Dolor

### 4. **Services Section** (`ServicesSection.tsx`)
**Especialidades:**
1. Traumatológica
2. Electroterapia
3. Terapias Manuales
4. Readaptación Deportiva
5. Tratamiento ATM
6. Hipopresivos
7. Manejo del Dolor
8. Adulto Mayor

**Condiciones Tratadas:**
- Ciática, Lesiones deportivas, Tendinitis, Dolor muscular
- Contractura cervical, Manguito rotador, Pinzamiento de hombro
- Radiculopatía lumbar, Dolor de cuello/espalda
- Cefalea cervical, Prótesis de cadera/rodilla
- Bruxismo (ATM), Dolor crónico, Parálisis facial
- Reeducación postural

### 5. **Pricing Section** (`PricingSection.tsx`)
**Planes Principales:**
- **Consulta en Línea**: $400 MXN
  - Videollamada 45 min, Evaluación, Plan de ejercicios, Seguimiento WhatsApp
  
- **Primera Visita**: $550 MXN (Más Popular)
  - Evaluación integral 60 min, Diagnóstico, Plan de tratamiento, Primera sesión
  
- **Sesión de Fisioterapia**: $500 MXN
  - Sesión 45-60 min, Terapia manual, Electroterapia, Ejercicios terapéuticos

**Servicios Adicionales:**
- Ejercicios Hipopresivos: $500 MXN
- Fisioterapia ATM: $500 MXN
- Fisioterapia para Dolor: $500 MXN
- Fisioterapia Ortopédica: $500 MXN
- Fisioterapia Post-Quirúrgica: $500 MXN
- Masaje de Descarga Muscular: $800 MXN

### 6. **Testimonials Section** (`TestimonialsSection.tsx`)
- Sección para testimonios de pacientes (implementación pendiente de revisar)

### 7. **Contact Section** (`ContactSection.tsx`)
**Métodos de Contacto:**
- **Teléfono**: +52 55 6505 3202
- **WhatsApp**: +52 55 6505 3202
- **Doctoralia**: Enlace para reservar en línea

**Ubicaciones:**
1. **Consultorio Iztapalapa**
   - Dirección: Andres Tutino 25c, 09360 Iztapalapa, CDMX
   - Horario: Lun - Vie: 9:00 AM - 7:00 PM

2. **Consultorio Metepec**
   - Dirección: Priv. 5 de Mayo 5, San Jerónimo Chicahualco, 52179 Metepec, México
   - Horario: Lun - Vie: 9:00 AM - 7:00 PM

**Consulta Online:**
- Opción de consulta virtual por videollamada
- Enlace directo a WhatsApp para agendar

### 8. **Footer** (`Footer.tsx`)
- Información adicional y enlaces (implementación pendiente de revisar)

---

## ⚙️ Configuración Técnica

### Vite Configuration
- **Puerto**: 8080
- **Host**: `::` (todas las interfaces)
- **Alias**: `@` apunta a `./src`
- **Plugin**: React SWC para compilación rápida
- **Lovable Tagger**: Activado en modo desarrollo

### TypeScript Configuration
- **Base URL**: `.`
- **Path Mapping**: `@/*` → `./src/*`
- **Strict Mode**: Deshabilitado (configuración relajada)
- **Skip Lib Check**: Habilitado

### Tailwind Configuration
- **Dark Mode**: Basado en clase `dark`
- **Content**: Escanea todos los archivos `.tsx` y `.ts`
- **Container**: Centrado con padding de 2rem
- **Breakpoint 2xl**: 1400px

---

## 📦 Dependencias Principales

### Producción
- React & React DOM
- React Router DOM
- TanStack Query
- React Hook Form + Zod
- Radix UI (múltiples componentes)
- Lucide React (iconos)
- Tailwind CSS + plugins

### Desarrollo
- Vite + plugins
- TypeScript + ESLint
- PostCSS + Autoprefixer
- Lovable Tagger (para desarrollo)

---

## 🚀 Scripts Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo (puerto 8080)
npm run build        # Build de producción
npm run build:dev    # Build en modo desarrollo
npm run lint         # Ejecuta ESLint
npm run preview      # Preview del build de producción
```

---

## 🎯 Características Principales

1. **Responsive Design**: Adaptado para móvil, tablet y desktop
2. **Navegación Suave**: Scroll suave entre secciones
3. **Animaciones**: Transiciones y animaciones sutiles
4. **Accesibilidad**: Componentes basados en Radix UI (accesibles)
5. **SEO Friendly**: Estructura semántica HTML
6. **Performance**: Optimizado con Vite y React SWC
7. **Modo Oscuro**: Soporte para tema oscuro (configurado pero no implementado en UI)

---

## 📱 Información de Contacto

- **Nombre**: Lic. Analaura Reyes Priego
- **Profesión**: Fisioterapeuta
- **Cédula Profesional**: No. 10909109
- **Teléfono**: +52 55 6505 3202
- **WhatsApp**: +52 55 6505 3202
- **Doctoralia**: https://www.doctoralia.com.mx/analaura-reyes-priego/fisioterapeuta/metepec

---

## 🏥 Ubicaciones

1. **Iztapalapa, CDMX**
   - Andres Tutino 25c, 09360 Iztapalapa, CDMX
   - Coordenadas: 19.3540592, -99.0791321

2. **Metepec, México**
   - Priv. 5 de Mayo 5, San Jerónimo Chicahualco, 52179 Metepec, México
   - Coordenadas: 19.2797222, -99.5938110

---

## 📝 Notas de Desarrollo

- El proyecto utiliza **shadcn/ui** como sistema de componentes
- Los componentes UI están en `src/components/ui/`
- Se utiliza el patrón de **path aliases** (`@/`) para imports
- El proyecto está configurado para trabajar con **Lovable** (plataforma de desarrollo)
- Las imágenes están en `src/assets/`
- El diseño es completamente responsive y mobile-first

---

## 🔄 Estado del Proyecto

El proyecto está en estado funcional con todas las secciones principales implementadas. Es una Single Page Application (SPA) que presenta información profesional de manera clara y accesible.

---

## 📄 Licencia

Proyecto privado - Todos los derechos reservados

---

*Última actualización: Generado automáticamente mediante análisis del código fuente*

