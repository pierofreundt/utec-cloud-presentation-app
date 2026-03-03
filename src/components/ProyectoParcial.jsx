// src/components/ProyectoParcial.jsx
// Presentación interactiva tipo carrusel — Boletealo · UTEC Posgrado
// Datos extraídos 100% desde README.md, handler.py y código real del repo.
import { useState, useEffect, useCallback, useRef } from "react"

// ── Paleta UTEC Posgrado (extraída de indicaciones.JPG) ────────────────────
const C = {
  orange: "#00B3B3",
  orangeDeep: "#EA6C08",
  orangeLight: "#FFF7ED",
  white: "#FFFFFF",
  bg: "#F8F9FA",
  dark: "#111827",
  gray: "#6B7280",
  grayLight: "#E5E7EB",
  grayCard: "#F3F4F6",
  cyan: "#0EA5E9",
  green: "#10B981",
  red: "#EF4444",
  amber: "#F59E0B",
  purple: "#8B5CF6",
  border: "#D1D5DB",
  shadow: "0 2px 12px rgba(0,0,0,0.08)",
  shadowLg: "0 8px 32px rgba(0,0,0,0.12)",
}

const FONT = "'Inter', 'Poppins', system-ui, sans-serif"
const TOTAL_TIME = 30 * 60 // 30 minutos en segundos

// ── DATOS DE SLIDES (extraídos del repo real) ──────────────────────────────
const SLIDES = [
  // ── 1. PORTADA ────────────────────────────────────────────────────────────
  {
    id: 1, type: "cover",
    title: "Portada",
    data: {
      product: "Boletealo 🎟️",
      tagline: "Plataforma de Venta de Tickets Online",
      maestria: "Maestría en Ciencia de Datos e IA",
      curso: "Cloud Computing",
      docente: "Geraldo Colchado | Enero 2026",
      badge: "MVP en AWS · 100% Serverless",
      integrantes: ["Armando Canales | Piero Freundt | Diego Trujillo | Joshi López | Renato Miranda "],
      url: "http://boletealo-frontend-dev.s3-website-us-east-1.amazonaws.com",
      repo: "https://github.com/joshilopeze-hub/proyecto-cloud-c-p",
    },
    notes: [
      "Presentar el equipo y el producto brevemente.",
      "Boletealo: venta y gestión de tickets para eventos (conciertos, deportes, teatro, festivales).",
      "100% Serverless en AWS — región us-east-1.",
      "Stack: React 18 + Vite | Python 3.10 en Lambda | DynamoDB.",
      "Duración estimada de exposición: 30 minutos.",
    ],
  },

  // ── 2. INSTRUCCIONES ──────────────────────────────────────────────────────
  {
    id: 2, type: "instructions",
    title: "Elección",
    data: {
      grupos: [
        "Boletealo es una plataforma 100% digital para la gestión y venta de entradas en línea, diseñada para eventos y experiencias en tiempo real.",
        "El proyecto desarrolla una arquitectura cloud escalable y segura que permite el registro de usuarios, compra de tickets y administración de eventos."
      ],
      partes: [
        { label: "Parte A · Análisis", icon: "🔍", desc: "Nombre del producto, benchmark, historias de usuario, criterios de aceptación, MVP." },
        { label: "Parte B · Diseño", icon: "🎨", desc: "Frontend (prototipo), Backend (microservicios + DB), Arquitectura AWS + costos mensuales." },
        { label: "Parte C · Implementación", icon: "🚀", desc: "Backend en Lambda/ECS con catálogo de APIs, evidencias Postman. Frontend conectado (opcional +pts)." },
      ],
    },
    notes: [
      "El proyecto se evalúa en 3 partes: Análisis, Diseño e Implementación.",
      "Boletealo es una startup ficticia 100% digital.",
      "Se usaron herramientas de IA (GitHub Copilot) como apoyo en el desarrollo.",
      "El MVP fue desplegado íntegramente en AWS usando Serverless Framework v4.",
    ],
  },

  // ── 3. PARTE A: ANÁLISIS ─────────────────────────────────────────────────
  {
    id: 3, type: "analysis",
    title: "Parte A: Análisis (QUÉ)",
    data: {
      product: "Boletealo",
      desc: "Plataforma web serverless para la compra y gestión de tickets de eventos (conciertos, deportes, teatro, festivales) con roles comprador/vendedor, pago integrado y gestión de incidentes.",
      clientes: [
        { tipo: "🎫 Comprador", desc: "Persona que busca y compra entradas para eventos de ocio y cultura." },
        { tipo: "🏪 Vendedor / Organizador", desc: "Empresa o persona que crea eventos, define zonas y precios." },
      ],
      propuesta: [
        "Disponibilidad en tiempo real por zona (verde ≥50 / ámbar <50 / rojo agotado)",
        "QR único por ticket generado al confirmar la compra",
        "Reporte de incidentes con evidencia fotográfica (S3)",
        "Dashboard de gestión para organizadores con toggle activo/inactivo",
      ],
      mvp: [
        "Registro / Login con roles (comprador | vendedor)",
        "Catálogo con filtros por categoría y ciudad",
        "Flujo de compra 4 pasos: Evento → Zona → Pago → QR",
        "Cancelación de tickets con restauración de disponibles",
        "Dashboard vendedor: crear eventos + zonas dinámicas + toggle",
      ],
      categorias: ["concierto", "deporte", "teatro", "festival", "conferencia", "otro"],
    },
    notes: [
      "Producto: Boletealo — startup 100% digital elegida para el proyecto.",
      "Dos roles distintos con flujos y rutas completamente diferentes.",
      "La propuesta de valor clave: disponibilidad en tiempo real + QR instantáneo.",
      "El MVP cubre el ciclo completo: descubrir → comprar → cancelar → reportar.",
      "Pagos simulados (Tarjeta / Yape) — extensible a Culqi/Stripe en producción.",
    ],
  },

  // ── 4. BENCHMARK ──────────────────────────────────────────────────────────
  {
    id: 4, type: "benchmark",
    title: "Benchmark",
    data: {
      rows: [
        { nombre: "Teleticket", segmento: "Masivo / Perú", funcionalidades: "Venta de tickets, PDF", diferenciador: "Marca líder local", precio: "~15% comisión", obs: "Sin disponibilidad por zona en tiempo real" },
        { nombre: "Joinnus", segmento: "Cultural / Perú", funcionalidades: "Tickets, QR, app móvil", diferenciador: "Interfaz moderna, app nativa", precio: "Variable", obs: "Foco en eventos culturales/corporativos" },
        { nombre: "Eventbrite", segmento: "Global / B2B", funcionalidades: "Gestión de eventos, analytics", diferenciador: "Plataforma global, multicurrencia", precio: "3.5% + $0.79/ticket", obs: "Complejo para pequeños organizadores" },
        { nombre: "Boletealo ⭐", segmento: "Perú / Startup", funcionalidades: "Tickets, zonas, QR, incidentes, roles", diferenciador: "Serverless, tiempo real, reporte incidentes", precio: "(Pendiente: modelo)", obs: "Arquitectura AWS escalable" },
      ],
    },
    notes: [
      "Principales competidores en Perú: Teleticket y Joinnus.",
      "Diferenciador clave de Boletealo: disponibilidad por zona + arquitectura serverless.",
      "Eventbrite domina globalmente pero es demasiado complejo para pequeños organizadores.",
      "El modelo de monetización de Boletealo está pendiente de definir.",
      "Tabla con datos del mercado peruano y global aproximados.",
    ],
  },

  // ── 5. HISTORIAS DE USUARIO ───────────────────────────────────────────────
  {
    id: 5, type: "userStories",
    title: "Historias de Usuario",
    data: {
      stories: [
        { id: "HU-01", rol: "Comprador", accion: "registrarme con email y elegir mi rol", beneficio: "acceder con las funcionalidades correctas según tipo de usuario", fuente: "Registro.jsx · POST /auth/register" },
        { id: "HU-02", rol: "Comprador", accion: "ver el catálogo con filtros por categoría y ciudad", beneficio: "encontrar rápidamente el evento que me interesa", fuente: "Eventos.jsx · GET /events?categoria=&ciudad=" },
        { id: "HU-03", rol: "Comprador", accion: "comprar tickets en flujo de 4 pasos (Evento→Zona→Pago→QR)", beneficio: "tener mi entrada confirmada con QR único", fuente: "ComprarTicket.jsx · POST /tickets · POST /pagos/procesar" },
        { id: "HU-04", rol: "Comprador", accion: "cancelar un ticket activo", beneficio: "recuperar mi inversión y liberar el inventario", fuente: "MisTickets.jsx · DELETE /tickets/{ticketId}" },
        { id: "HU-05", rol: "Comprador", accion: "reportar incidente con evidencia fotográfica", beneficio: "notificar un problema y tener registro del mismo", fuente: "ReportarIncidente.jsx · POST /incidentes/upload-url → POST /incidentes" },
        { id: "HU-06", rol: "Vendedor", accion: "crear un evento con zonas y precios dinámicos", beneficio: "publicar mi evento y gestionar el inventario de entradas", fuente: "CrearEvento.jsx · POST /events" },
        { id: "HU-07", rol: "Vendedor", accion: "activar o desactivar mis eventos publicados", beneficio: "controlar la visibilidad y venta de mis eventos", fuente: "MisEventos.jsx · PATCH /events/{eventoId}/toggle" },
        { id: "HU-08", rol: "Comprador", accion: "ver mi historial de tickets con QR", beneficio: "acceder a mis entradas en cualquier momento", fuente: "MisTickets.jsx · GET /tickets" },
      ],
    },
    notes: [
      "8 historias de usuario, todas derivadas de código real del repo.",
      "HU-03 es la más compleja: integra 2 microservicios (ms-tickets + ms-pagos).",
      "HU-05 usa Presigned URL de S3 para subida directa de imagen (sin pasar por Lambda).",
      "HU-06 y HU-07 están protegidas por VendedorRoute en el frontend.",
      "Fuentes indicadas por archivo y endpoint real del README.",
    ],
  },

  // ── 6. CRITERIOS DE ACEPTACIÓN ───────────────────────────────────────────
  {
    id: 6, type: "acceptance",
    title: "Criterios de Aceptación",
    data: {
      criteria: [
        {
          huId: "HU-01", titulo: "Registro de usuario",
          bullets: [
            "✅ Debe: aceptar nombre, apellidos, email, password, rol (comprador|vendedor).",
            "✅ Debe: rechazar password < 6 caracteres (validación en React + Lambda).",
            "✅ Debe: rechazar email duplicado → HTTP 409.",
            "🚫 No debe: guardar contraseña en texto plano (SHA-256 + salt 16 bytes).",
            "✔️ Validación: registro exitoso devuelve JWT 24h + redirige según rol.",
          ],
          gherkin: `Given un usuario no registrado en /registro
When envía nombre, apellidos, email válido, password ≥ 6 chars y rol
Then recibe HTTP 201 con token JWT y user object
And es redirigido a /eventos (comprador) o /mis-eventos (vendedor)`,
        },
        {
          huId: "HU-03", titulo: "Compra de ticket",
          bullets: [
            "✅ Debe: requerir autenticación (JWT en Authorization: Bearer).",
            "✅ Debe: decrementar disponibles de la zona en DynamoDB al confirmar.",
            "✅ Debe: generar QR único por ticket en confirmación.",
            "🚫 No debe: permitir compra si disponibles = 0.",
            "✔️ Validación: POST /tickets retorna ticketId + código QR.",
          ],
          gherkin: `Given un comprador autenticado selecciona zona con disponibles > 0
When confirma el pago (Tarjeta o Yape simulado)
Then se crea ticket en DynamoDB y se descuentan los disponibles
And se muestra pantalla de confirmación con código QR único`,
        },
        {
          huId: "HU-05", titulo: "Reporte de incidente",
          bullets: [
            "✅ Debe: requerir auth + referencia a ticketId válido.",
            "✅ Debe: permitir adjuntar imagen vía Presigned URL → S3 directo.",
            "✅ Debe: crear registro en DynamoDB de ms-incidentes.",
            "🚫 No debe: permitir subida sin Presigned URL.",
            "✔️ Validación: evidencia accesible vía URL S3 en el objeto incidente.",
          ],
          gherkin: `Given un comprador autenticado con ticket activo
When reporta un incidente adjuntando una imagen
Then la imagen sube directamente a S3 vía Presigned URL (sin pasar por Lambda)
And se crea el registro del incidente con ticketId y s3Key en DynamoDB`,
        },
        {
          huId: "HU-07", titulo: "Toggle de evento (vendedor)",
          bullets: [
            "✅ Debe: requerir JWT con rol='vendedor'.",
            "✅ Debe: solo el creador puede activar/desactivar su evento.",
            "✅ Debe: actualizar campo activo en DynamoDB.",
            "🚫 No debe: permitir toggle con rol='comprador' → HTTP 403.",
            "✔️ Validación: estado reflejado en dashboard vendedor inmediatamente.",
          ],
          gherkin: `Given un vendedor autenticado en su dashboard /mis-eventos
When hace clic en activar/desactivar sobre un evento propio
Then PATCH /events/{eventoId}/toggle actualiza el estado activo en DynamoDB
And el botón refleja el nuevo estado inmediatamente en la UI`,
        },
      ],
    },
    notes: [
      "Criterios basados en validaciones reales del código (handler.py + frontend).",
      "HU-01: validación en dos capas — React (frontend) + Lambda (backend).",
      "HU-03: lógica transaccional — pago + decremento de disponibles en 2 servicios.",
      "HU-05: Presigned URL evita que la imagen pase por Lambda (patrón S3 directo).",
      "HU-07: verificación de rol local en cada Lambda — sin acoplar a ms-auth.",
    ],
  },

  // ── 7. FRONTEND ───────────────────────────────────────────────────────────
  {
    id: 7, type: "frontend",
    title: "Parte B: Frontend (Diseño del MVP)",
    data: {
      stack: "React 18 + Vite · React Router v6",
      hosting: "AWS S3 Static Website Hosting",
      url: "http://boletealo-frontend-dev.s3-website-us-east-1.amazonaws.com",
      rutas: [
        { path: "/", comp: "Landing.jsx", guard: "Público", desc: "Hero + categorías + features" },
        { path: "/registro", comp: "Registro.jsx", guard: "Público", desc: "Selector visual de rol (Comprador / Vendedor)" },
        { path: "/login", comp: "Login.jsx", guard: "Público", desc: "Autenticación → JWT en localStorage" },
        { path: "/eventos", comp: "Eventos.jsx", guard: "Público", desc: "Grid + filtros + contador disponibles por zona" },
        { path: "/comprar/:eventoId", comp: "ComprarTicket.jsx", guard: "PrivateRoute", desc: "Flujo 4 pasos: Evento→Zona→Pago→QR" },
        { path: "/mis-tickets", comp: "MisTickets.jsx", guard: "PrivateRoute", desc: "Historial + cancelar" },
        { path: "/reportar/:ticketId", comp: "ReportarIncidente.jsx", guard: "PrivateRoute", desc: "Reporte con evidencia S3" },
        { path: "/mis-incidentes", comp: "MisIncidentes.jsx", guard: "PrivateRoute", desc: "Historial de incidentes" },
        { path: "/crear-evento", comp: "CrearEvento.jsx", guard: "VendedorRoute", desc: "Formulario con zonas dinámicas" },
        { path: "/mis-eventos", comp: "MisEventos.jsx", guard: "VendedorRoute", desc: "Dashboard con stats + toggle activo/inactivo" },
      ],
    },
    notes: [
      "Frontend hosteado en S3 Static Website — sin servidor.",
      "React Router v6 con Guards: PrivateRoute y VendedorRoute.",
      "JWT almacenado en localStorage (boletealo_token + boletealo_user).",
      "config/api.js centraliza llamadas a los 5 microservicios con safeFetch.",
      "Build: npm run build → aws s3 sync dist/ s3://boletealo-frontend-dev/ --delete",
    ],
  },

  // ── 8. BACKEND ────────────────────────────────────────────────────────────
  {
    id: 8, type: "backend",
    title: "Parte B: Backend (Microservicios)",
    data: {
      ms: [
        {
          nombre: "ms-auth", color: C.cyan,
          url: "v3mcdp3bea.execute-api.us-east-1.amazonaws.com",
          resp: "Autenticación y gestión de usuarios",
          db: "DynamoDB · tabla Users (email-index GSI)",
          endpoints: [
            { m: "POST", p: "/auth/register", auth: "❌", desc: "Registro — body: nombre, apellidos, email, password, rol" },
            { m: "POST", p: "/auth/login", auth: "❌", desc: "Login → JWT HS256 · 24h con campo rol" },
            { m: "GET", p: "/auth/me", auth: "✅", desc: "Perfil del usuario autenticado" },
          ],
        },
        {
          nombre: "ms-eventos", color: C.orange,
          url: "kkuok1iccg.execute-api.us-east-1.amazonaws.com",
          resp: "Catálogo y gestión de eventos",
          db: "DynamoDB · tabla Eventos",
          endpoints: [
            { m: "GET", p: "/events", auth: "❌", desc: "Listar eventos activos (?categoria=&ciudad=)" },
            { m: "GET", p: "/events/{eventoId}", auth: "❌", desc: "Detalle + zonas con disponibles" },
            { m: "POST", p: "/events", auth: "✅", desc: "Crear evento [rol: vendedor]" },
            { m: "GET", p: "/events/mis-eventos", auth: "✅", desc: "Eventos del vendedor autenticado" },
            { m: "PATCH", p: "/events/{eventoId}/toggle", auth: "✅", desc: "Activar/desactivar [solo dueño]" },
          ],
        },
        {
          nombre: "ms-tickets", color: C.green,
          url: "s5fqc1t2j0.execute-api.us-east-1.amazonaws.com",
          resp: "Compra y cancelación de tickets",
          db: "DynamoDB · tabla Tickets",
          endpoints: [
            { m: "POST", p: "/tickets", auth: "✅", desc: "Comprar ticket — descuenta disponibles [comprador]" },
            { m: "GET", p: "/tickets", auth: "✅", desc: "Mis tickets" },
            { m: "GET", p: "/tickets/{ticketId}", auth: "✅", desc: "Detalle + QR" },
            { m: "DELETE", p: "/tickets/{ticketId}", auth: "✅", desc: "Cancelar — restaura disponibles" },
          ],
        },
        {
          nombre: "ms-pagos", color: C.purple,
          url: "qpbrdqcex3.execute-api.us-east-1.amazonaws.com",
          resp: "Procesamiento de pagos (simulado)",
          db: "DynamoDB · tabla Pagos",
          endpoints: [
            { m: "POST", p: "/pagos/procesar", auth: "✅", desc: "Procesar pago (Tarjeta 16 dígitos / Yape 9 dígitos) [simulado]" },
            { m: "GET", p: "/pagos/{pagoId}", auth: "✅", desc: "Detalle de pago" },
          ],
        },
        {
          nombre: "ms-incidentes", color: C.red,
          url: "7a8ssnyqof.execute-api.us-east-1.amazonaws.com",
          resp: "Gestión de reportes e incidentes",
          db: "DynamoDB · tabla Incidentes + S3 (evidencias)",
          endpoints: [
            { m: "POST", p: "/incidentes", auth: "✅", desc: "Crear incidente con referencia a ticketId" },
            { m: "GET", p: "/incidentes", auth: "✅", desc: "Mis incidentes" },
            { m: "GET", p: "/incidentes/{incidenteId}", auth: "✅", desc: "Detalle de incidente" },
            { m: "POST", p: "/incidentes/upload-url", auth: "✅", desc: "Presigned URL para subir evidencia a S3" },
          ],
        },
      ],
    },
    notes: [
      "5 microservicios independientes: API Gateway + Lambda + DynamoDB cada uno.",
      "Python 3.10 en Lambda — sin frameworks pesados, solo boto3.",
      "JWT verificado localmente en cada Lambda — sin acoplar a ms-auth.",
      "DynamoDB PAY_PER_REQUEST — sin provisionar capacidad.",
      "ms-pagos: pagos simulados — extensible a Stripe/Culqi en producción.",
    ],
  },

  // ── 9. ARQUITECTURA AWS ───────────────────────────────────────────────────
  {
    id: 9, type: "architecture",
    title: "Arquitectura AWS",
    data: {
      region: "us-east-1 · N. Virginia",
      justificacion: "Mayor cobertura de servicios, menor latencia desde Perú, soporte completo de Serverless Framework.",
      flujo: [
        { label: "Usuario (Navegador)", icon: "🌐" },
        { label: "S3 Static Website (React 18)", icon: "📦" },
        { label: "API Gateway HTTP API (HTTPS + JWT)", icon: "🔗" },
        { label: "Lambda Python 3.10", icon: "λ" },
        { label: "DynamoDB / S3 / SSM", icon: "🗄️" },
      ],
      servicios: [
        { s: "S3 Static Website", uso: "Hosting React 18 + Vite", badge: "Frontend" },
        { s: "API Gateway (HTTP)", uso: "5 APIs con CORS habilitado", badge: "Routing" },
        { s: "AWS Lambda", uso: "Lógica de negocio · Python 3.10", badge: "Compute" },
        { s: "DynamoDB", uso: "5 tablas · PAY_PER_REQUEST", badge: "Database" },
        { s: "S3 (Evidencias)", uso: "Fotos incidentes con Presigned URLs", badge: "Storage" },
        { s: "SSM Parameter Store", uso: "JWT_SECRET + URLs inter-servicios", badge: "Config" },
        { s: "IAM LabRole", uso: "Rol asumido por todas las Lambdas", badge: "Security" },
        { s: "CloudFormation", uso: "IaC — gestiona 5 stacks (Serverless Framework v4)", badge: "IaC" },
        { s: "EC2 t2.micro", uso: "Terminal de deploy (solo serverless deploy)", badge: "Deploy" },
      ],
    },
    notes: [
      "Arquitectura 100% Serverless — sin servidores que administrar en runtime.",
      "EC2 solo se usa para deploy — NO es parte del flujo de producción.",
      "CloudFormation gestiona 5 stacks independientes (uno por microservicio).",
      "SSM Parameter Store almacena secretos — nunca hardcodeados en código.",
      "Diagrama completo: boletealo-architecture.drawio (abrir en app.diagrams.net).",
    ],
  },

  // ── 10. COSTOS AWS ────────────────────────────────────────────────────────
  {
    id: 10, type: "costs",
    title: "Costos AWS",
    data: {
      tabla: [
        { s: "AWS Lambda", uso: "5 funciones · ~50k invocaciones/mes", costo: "$0.00", nota: "Free Tier: 1M req/mes" },
        { s: "API Gateway (HTTP)", uso: "5 APIs · ~50k requests/mes", costo: "~$0.05", nota: "$1/millón de requests" },
        { s: "DynamoDB", uso: "5 tablas · PAY_PER_REQUEST · <1GB", costo: "$0.00", nota: "Free Tier: 25GB + 25 WCU/RCU" },
        { s: "S3 (Frontend)", uso: "Static website · ~50MB", costo: "$0.00", nota: "Free Tier: 5GB" },
        { s: "S3 (Evidencias)", uso: "Fotos de incidentes · ~1GB/mes", costo: "~$0.02", nota: "$0.023/GB almacenado" },
        { s: "SSM Parameter Store", uso: "3 parámetros standard", costo: "$0.00", nota: "Standard tier gratis" },
        { s: "EC2 t2.micro", uso: "Terminal de deploy (esporádico)", costo: "$0.00", nota: "Free Tier: 750h/mes" },
        { s: "CloudFormation", uso: "5 stacks", costo: "$0.00", nota: "Sin costo adicional" },
      ],
      total: "~$0.07 / mes (MVP con carga baja)",
      nota: "Estimación vía AWS Pricing Calculator: calculator.aws · Escala automáticamente con el uso.",
    },
    notes: [
      "El MVP corre prácticamente GRATIS dentro del Free Tier de AWS.",
      "DynamoDB PAY_PER_REQUEST elimina costos de capacidad aprovisionada.",
      "Lambda cobra solo por invocación — ideal para tráfico bajo inicial.",
      "Con 10k usuarios activos: estimado ~$15-30/mes vs $100+ en servidor dedicado.",
      "Para costos reales: https://calculator.aws",
    ],
  },

  // ── 11. IMPLEMENTACIÓN ────────────────────────────────────────────────────
  {
    id: 11, type: "implementation",
    title: "Parte C: Implementación MVP en AWS",
    data: {
      backend: [
        "5 microservicios con Serverless Framework v4 (Python 3.10 · Lambda)",
        "Deploy desde EC2: serverless deploy (orden: auth → eventos → tickets → pagos → incidentes)",
        "SSM pre-configurado: /boletealo/jwt_secret, /boletealo/ms_eventos_url, /boletealo/ms_tickets_url",
        "Credenciales Vocareum (~4h TTL) — flujo de re-deploy documentado en README",
      ],
      frontend: [
        "React 18 + Vite · npm run build → aws s3 sync dist/ s3://boletealo-frontend-dev/ --delete",
        "Conectado a los 5 microservicios vía config/api.js con safeFetch helper",
        "URL publicada: boletealo-frontend-dev.s3-website-us-east-1.amazonaws.com",
      ],
      evidencias: [
        { e: "POST /auth/register", ok: true, det: "Hash SHA-256 + salt · HTTP 201" },
        { e: "POST /auth/login → JWT", ok: true, det: "JWT HS256 · 24h · campo rol" },
        { e: "GET /events (público)", ok: true, det: "Filtros categoría + ciudad" },
        { e: "POST /tickets (compra)", ok: true, det: "Decrementa disponibles en DynamoDB" },
        { e: "DELETE /tickets (cancelar)", ok: true, det: "Restaura disponibles" },
        { e: "POST /incidentes/upload-url", ok: true, det: "Presigned URL S3 directo" },
        { e: "PATCH /events/toggle", ok: true, det: "Solo dueño del evento · rol verificado" },
        { e: "POST /pagos/procesar", ok: true, det: "Tarjeta 16 dígitos + Yape 9 dígitos [simulado]" },
        { e: "Evidencias Postman", ok: false, det: "(Pendiente: adjuntar capturas de Postman)" },
      ],
      repo: "https://github.com/joshilopeze-hub/proyecto-cloud-c-p",
    },
    notes: [
      "Todo el backend está implementado y desplegado en AWS us-east-1.",
      "Frontend conectado a al menos ms-auth y ms-eventos.",
      "Evidencias Postman pendientes de adjuntar en la presentación final.",
      "Repo público disponible en GitHub para revisión del docente.",
    ],
  },

  // ── 12. DEMO FLOW ─────────────────────────────────────────────────────────
  {
    id: 12, type: "demo",
    title: "Demo Flow",
    data: {
      steps: [
        { n: 1, titulo: "Abrir frontend en AWS S3", detalle: "boletealo-frontend-dev.s3-website-us-east-1.amazonaws.com", ep: null },
        { n: 2, titulo: "Registrar usuario Comprador", detalle: "/registro → completar datos → seleccionar Comprador → crear cuenta", ep: "POST /auth/register" },
        { n: 3, titulo: "Explorar catálogo de eventos", detalle: "/eventos → filtrar por categoría 'concierto' → ver disponibles por zona (verde/ámbar/rojo)", ep: "GET /events?categoria=concierto" },
        { n: 4, titulo: "Comprar ticket (4 pasos)", detalle: "Evento → Zona → ingresar tarjeta ficticia → ver QR de confirmación", ep: "POST /pagos/procesar → POST /tickets" },
        { n: 5, titulo: "Ver historial y cancelar", detalle: "/mis-tickets → ver QR → cancelar → confirmar restauración de disponibles", ep: "GET /tickets · DELETE /tickets/{ticketId}" },
        { n: 6, titulo: "Reportar incidente", detalle: "/reportar/:ticketId → adjuntar imagen → enviar → ver en /mis-incidentes", ep: "POST /incidentes/upload-url → POST /incidentes" },
        { n: 7, titulo: "Registrar usuario Vendedor", detalle: "Nueva sesión → /registro → rol Vendedor → crea cuenta → redirige a /mis-eventos", ep: "POST /auth/register (rol: vendedor)" },
        { n: 8, titulo: "Crear y gestionar evento", detalle: "/crear-evento → datos + zonas dinámicas → publicar → toggle activo/inactivo", ep: "POST /events → PATCH /events/{id}/toggle" },
      ],
    },
    notes: [
      "Demo guiada: ~8 minutos para cubrir los 8 pasos.",
      "Tener cuentas de comprador y vendedor pre-creadas como backup.",
      "Mostrar Postman en paralelo para evidenciar las llamadas API.",
      "El QR generado es escaneable con cualquier lector de QR.",
      "Si hay problemas de conexión: verificar si las credenciales Vocareum expiraron.",
    ],
  },

  // ── 13. CIERRE ────────────────────────────────────────────────────────────
  {
    id: 13, type: "closing",
    title: "Cierre",
    data: {
      aprendizajes: [
        "Arquitectura Serverless en AWS como stack production-ready real.",
        "Gestión segura de secretos con SSM Parameter Store.",
        "JWT HS256 implementado sin librerías externas — comprensión profunda del estándar.",
        "Serverless Framework v4 como herramienta de IaC para deploy reproducible.",
        "Presigned URLs de S3 para uploads directos sin sobrecargar Lambda.",
        "Diseño de microservicios con verificación de roles local (sin acoplamiento).",
      ],
      proximos: [
        "Migrar SHA-256 a bcrypt/Argon2 para mayor seguridad.",
        "Agregar CloudFront como CDN delante de S3 (HTTPS, caché global).",
        "Integrar pasarela de pagos real (Culqi para Perú / Stripe global).",
        "Notificaciones por email con Amazon SES al comprar/cancelar.",
        "Dashboard de analytics para vendedores (ventas, ingresos, tendencias).",
        "App móvil React Native conectada a los mismos microservicios.",
      ],
      repo: "https://github.com/joshilopeze-hub/proyecto-cloud-c-p",
      equipo: "(Pendiente: completar nombres del equipo)",
    },
    notes: [
      "Destacar: el proyecto está 100% en producción en AWS.",
      "La arquitectura serverless escala automáticamente — cero gestión de servidores.",
      "Código open source disponible para revisión del docente.",
      "Tiempo objetivo: 25-28 min — dejar 2-3 min para Q&A.",
    ],
  },
]

// ── COMPONENTES AUXILIARES ─────────────────────────────────────────────────

function Badge({ children, color = C.orange, bg }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: 99,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.04em",
      background: bg || color + "20",
      color,
      border: `1px solid ${color}40`,
    }}>
      {children}
    </span>
  )
}

function MethodBadge({ method }) {
  const colors = { GET: C.green, POST: C.cyan, DELETE: C.red, PATCH: C.amber }
  const c = colors[method] || C.gray
  return <Badge color={c}>{method}</Badge>
}

function SectionHeader({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 4, height: 22, background: C.orange, borderRadius: 2 }} />
      <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.dark, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {children}
      </h3>
    </div>
  )
}

// ── RENDER POR TIPO DE SLIDE ───────────────────────────────────────────────

function SlideCover({ data }) {
  return (
    <div style={{ display: "flex", height: "100%", gap: 0 }}>
      {/* Left accent */}
      <div style={{ width: 6, background: `linear-gradient(180deg, ${C.orange}, ${C.orangeDeep})`, flexShrink: 0, borderRadius: "4px 0 0 4px" }} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px 36px" }}>
        {/* Badge */}
        <div style={{ marginBottom: 16 }}>
          <Badge color={C.orange}>{data.badge}</Badge>
        </div>

        {/* Product name */}
        <h1 style={{ margin: "0 0 6px", fontSize: 44, fontWeight: 800, color: C.dark, lineHeight: 1.1, fontFamily: FONT }}>
          {data.product}
        </h1>
        <p style={{ margin: "0 0 24px", fontSize: 18, color: C.gray, fontWeight: 500 }}>
          {data.tagline}
        </p>

        {/* Info grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Programa", val: data.maestria },
            { label: "Curso", val: data.curso },
            { label: "Docente", val: data.docente },
            { label: "Equipo", val: data.integrantes[0] },
          ].map(({ label, val }) => (
            <div key={label} style={{ background: C.grayCard, borderRadius: 8, padding: "10px 14px", border: `1px solid ${C.border}` }}>
              <p style={{ margin: 0, fontSize: 10, color: C.orange, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
              <p style={{ margin: "3px 0 0", fontSize: 13, color: C.dark, fontWeight: 600 }}>{val}</p>
            </div>
          ))}
        </div>

        {/* URL / Repo */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: C.gray, background: C.grayCard, padding: "4px 10px", borderRadius: 6, border: `1px solid ${C.border}` }}>
            🌐 {data.url}
          </span>
          <span style={{ fontSize: 11, color: C.gray, background: C.grayCard, padding: "4px 10px", borderRadius: 6, border: `1px solid ${C.border}` }}>
            📁 {data.repo}
          </span>
        </div>
      </div>
    </div>
  )
}

function SlideInstructions({ data }) {
  return (
    <div style={{ padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20, height: "100%", boxSizing: "border-box" }}>
      <SectionHeader>👆 Grupos y Elección de Empresa</SectionHeader>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 8 }}>
        {data.grupos.map((g, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ color: C.orange, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>→</span>
            <span style={{ fontSize: 13.5, color: C.dark, lineHeight: 1.5 }}>{g}</span>
          </div>
        ))}
      </div>
      <SectionHeader>Partes del Proyecto</SectionHeader>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, flex: 1 }}>
        {data.partes.map((p) => (
          <div key={p.label} style={{ background: C.grayCard, borderRadius: 10, padding: "16px", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 22 }}>{p.icon}</span>
            <p style={{ margin: 0, fontWeight: 700, color: C.orange, fontSize: 13 }}>{p.label}</p>
            <p style={{ margin: 0, fontSize: 12.5, color: C.gray, lineHeight: 1.5 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideAnalysis({ data }) {
  return (
    <div style={{ padding: "20px 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, height: "100%", boxSizing: "border-box" }}>
      {/* Left column */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ background: C.orangeLight, borderRadius: 10, padding: "14px 16px", border: `1px solid ${C.orange}30` }}>
          <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: C.orange, textTransform: "uppercase" }}>Producto</p>
          <p style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 800, color: C.dark }}>{data.product}</p>
          <p style={{ margin: 0, fontSize: 12.5, color: C.gray, lineHeight: 1.5 }}>{data.desc}</p>
        </div>

        <div>
          <SectionHeader>Tipos de Cliente</SectionHeader>
          {data.clientes.map((c) => (
            <div key={c.tipo} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.dark, flexShrink: 0 }}>{c.tipo}</span>
              <span style={{ fontSize: 12.5, color: C.gray }}>{c.desc}</span>
            </div>
          ))}
        </div>

        <div>
          <SectionHeader>Categorías de Eventos</SectionHeader>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {data.categorias.map((cat) => <Badge key={cat} color={C.cyan}>{cat}</Badge>)}
          </div>
        </div>
      </div>

      {/* Right column */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <SectionHeader>Propuesta de Valor</SectionHeader>
          {data.propuesta.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "flex-start" }}>
              <span style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 13, color: C.dark, lineHeight: 1.4 }}>{p}</span>
            </div>
          ))}
        </div>

        <div>
          <SectionHeader>MVP — Funcionalidades</SectionHeader>
          {data.mvp.map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
              <span style={{ color: C.orange, fontWeight: 700, flexShrink: 0 }}>→</span>
              <span style={{ fontSize: 12.5, color: C.dark, lineHeight: 1.4 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SlideBenchmark({ data }) {
  const cols = ["Competidor", "Segmento", "Funcionalidades", "Diferenciador", "Precio", "Observaciones"]
  return (
    <div style={{ padding: "20px 28px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 14 }}>
      <SectionHeader>👆 Comparativa de Mercado</SectionHeader>
      <div style={{ overflowX: "auto", flex: 1 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: C.dark }}>
              {cols.map((c) => (
                <th key={c} style={{ padding: "8px 12px", color: C.white, fontWeight: 700, textAlign: "left", whiteSpace: "nowrap", fontSize: 11, letterSpacing: "0.04em" }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r, i) => {
              const isBoletealo = r.nombre.includes("Boletealo")
              return (
                <tr key={i} style={{ background: isBoletealo ? C.orangeLight : i % 2 === 0 ? C.white : C.grayCard }}>
                  <td style={{ padding: "8px 12px", fontWeight: isBoletealo ? 700 : 600, color: isBoletealo ? C.orange : C.dark, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{r.nombre}</td>
                  <td style={{ padding: "8px 12px", color: C.gray, borderBottom: `1px solid ${C.border}` }}>{r.segmento}</td>
                  <td style={{ padding: "8px 12px", color: C.dark, borderBottom: `1px solid ${C.border}`, fontSize: 11.5 }}>{r.funcionalidades}</td>
                  <td style={{ padding: "8px 12px", color: C.dark, borderBottom: `1px solid ${C.border}`, fontSize: 11.5 }}>{r.diferenciador}</td>
                  <td style={{ padding: "8px 12px", color: C.dark, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{r.precio}</td>
                  <td style={{ padding: "8px 12px", color: C.gray, borderBottom: `1px solid ${C.border}`, fontSize: 11.5 }}>{r.obs}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SlideUserStories({ data }) {
  const rolColor = { Comprador: C.cyan, Vendedor: C.purple }
  return (
    <div style={{ padding: "18px 26px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 10 }}>
      <SectionHeader>👆 Historias de Usuario (extraídas del repo)</SectionHeader>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, flex: 1, overflowY: "auto" }}>
        {data.stories.map((s) => (
          <div key={s.id} style={{ background: C.grayCard, borderRadius: 8, padding: "12px 14px", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
              <Badge color={C.orange}>{s.id}</Badge>
              <Badge color={rolColor[s.rol] || C.gray}>{s.rol}</Badge>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 12.5, color: C.dark, lineHeight: 1.4 }}>
              <strong>Como</strong> {s.rol.toLowerCase()}, <strong>quiero</strong> {s.accion}, <strong>para</strong> {s.beneficio}.
            </p>
            <p style={{ margin: "4px 0 0", fontSize: 10.5, color: C.gray, fontStyle: "italic" }}>
              📎 Fuente: {s.fuente}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideAcceptance({ data }) {
  return (
    <div style={{ padding: "18px 26px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 10 }}>
      <SectionHeader>👆 Criterios de Aceptación + Gherkin</SectionHeader>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, flex: 1, overflowY: "auto" }}>
        {data.criteria.map((c) => (
          <div key={c.huId} style={{ background: C.grayCard, borderRadius: 8, padding: "12px 14px", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <Badge color={C.orange}>{c.huId}</Badge>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{c.titulo}</span>
            </div>
            <div style={{ fontSize: 11.5, color: C.dark, lineHeight: 1.5 }}>
              {c.bullets.map((b, i) => <div key={i} style={{ marginBottom: 2 }}>{b}</div>)}
            </div>
            <div style={{ background: C.dark, borderRadius: 6, padding: "8px 10px" }}>
              <p style={{ margin: "0 0 4px", fontSize: 10, color: C.orange, fontWeight: 700, letterSpacing: "0.06em" }}>GHERKIN</p>
              <pre style={{ margin: 0, fontSize: 10.5, color: "#A5F3FC", fontFamily: "monospace", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{c.gherkin}</pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideFrontend({ data }) {
  const guardColor = { Público: C.green, PrivateRoute: C.amber, VendedorRoute: C.purple }
  return (
    <div style={{ padding: "18px 26px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <Badge color={C.cyan}>{data.stack}</Badge>
        <Badge color={C.orange}>{data.hosting}</Badge>
        <span style={{ fontSize: 11, color: C.gray }}>🌐 {data.url}</span>
      </div>
      <SectionHeader>Mapa de Navegación (Rutas reales)</SectionHeader>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: C.dark }}>
              {["Ruta", "Componente", "Guard", "Descripción"].map((h) => (
                <th key={h} style={{ padding: "7px 10px", color: C.white, textAlign: "left", fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rutas.map((r, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? C.white : C.grayCard }}>
                <td style={{ padding: "6px 10px", fontFamily: "monospace", color: C.orange, borderBottom: `1px solid ${C.border}`, fontWeight: 600, fontSize: 11.5 }}>{r.path}</td>
                <td style={{ padding: "6px 10px", fontFamily: "monospace", color: C.cyan, borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>{r.comp}</td>
                <td style={{ padding: "6px 10px", borderBottom: `1px solid ${C.border}` }}>
                  <Badge color={guardColor[r.guard] || C.gray}>{r.guard}</Badge>
                </td>
                <td style={{ padding: "6px 10px", color: C.gray, borderBottom: `1px solid ${C.border}`, fontSize: 11.5 }}>{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SlideBackend({ data }) {
  const [sel, setSel] = useState(0)
  const ms = data.ms[sel]
  return (
    <div style={{ padding: "14px 22px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* MS tabs */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {data.ms.map((m, i) => (
          <button key={m.nombre} onClick={() => setSel(i)} style={{
            padding: "5px 12px", borderRadius: 6, border: `2px solid ${sel === i ? m.color : C.border}`,
            background: sel === i ? m.color + "18" : C.white, color: sel === i ? m.color : C.gray,
            fontWeight: sel === i ? 700 : 500, fontSize: 12, cursor: "pointer", fontFamily: FONT, transition: "all 0.15s",
          }}>
            {m.nombre}
          </button>
        ))}
      </div>

      {/* Selected MS detail */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ background: ms.color + "12", border: `1px solid ${ms.color}40`, borderRadius: 8, padding: "10px 14px" }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: ms.color }}>{ms.nombre}</p>
          <p style={{ margin: "3px 0 0", fontSize: 12.5, color: C.dark }}>{ms.resp}</p>
          <p style={{ margin: "3px 0 0", fontSize: 11.5, color: C.gray }}>🗄️ {ms.db}</p>
          <p style={{ margin: "3px 0 0", fontSize: 11, color: C.gray, fontFamily: "monospace" }}>🔗 {ms.url}</p>
        </div>
        <SectionHeader>Endpoints</SectionHeader>
        <div style={{ flex: 1, overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: C.dark }}>
                {["Método", "Endpoint", "Auth", "Descripción"].map((h) => (
                  <th key={h} style={{ padding: "6px 10px", color: C.white, textAlign: "left", fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ms.endpoints.map((ep, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? C.white : C.grayCard }}>
                  <td style={{ padding: "6px 10px", borderBottom: `1px solid ${C.border}` }}><MethodBadge method={ep.m} /></td>
                  <td style={{ padding: "6px 10px", fontFamily: "monospace", color: C.orange, borderBottom: `1px solid ${C.border}`, fontSize: 11.5 }}>{ep.p}</td>
                  <td style={{ padding: "6px 10px", textAlign: "center", borderBottom: `1px solid ${C.border}` }}>{ep.auth}</td>
                  <td style={{ padding: "6px 10px", color: C.gray, borderBottom: `1px solid ${C.border}`, fontSize: 11.5 }}>{ep.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SlideArchitecture({ data }) {
  const badgeColors = { Frontend: C.cyan, Routing: C.purple, Compute: C.amber, Database: C.green, Storage: C.cyan, Config: C.red, Security: C.gray, IaC: C.orange, Deploy: C.green }
  return (
    <div style={{ padding: "18px 26px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <Badge color={C.orange}>Región: {data.region}</Badge>
        <span style={{ fontSize: 12, color: C.gray }}>{data.justificacion}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, flex: 1 }}>
        {/* Flujo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "14px 18px", background: C.dark, borderRadius: 10, minWidth: 160 }}>
          <p style={{ margin: "0 0 10px", fontSize: 10, color: C.orange, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Flujo de Datos</p>
          {data.flujo.map((f, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ background: C.orange + "22", border: `1px solid ${C.orange}50`, borderRadius: 6, padding: "5px 10px" }}>
                <p style={{ margin: 0, fontSize: 10, color: C.white }}>{f.icon} {f.label}</p>
              </div>
              {i < data.flujo.length - 1 && <p style={{ margin: "2px 0", color: C.orange, fontSize: 14 }}>↓</p>}
            </div>
          ))}
        </div>

        {/* Servicios grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, alignContent: "start" }}>
          {data.servicios.map((s) => (
            <div key={s.s} style={{ background: C.grayCard, borderRadius: 8, padding: "10px 12px", border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 4 }}>
                <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: C.dark }}>{s.s}</p>
                <Badge color={badgeColors[s.badge] || C.gray}>{s.badge}</Badge>
              </div>
              <p style={{ margin: "3px 0 0", fontSize: 11.5, color: C.gray }}>{s.uso}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SlideCosts({ data }) {
  return (
    <div style={{ padding: "18px 26px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 12 }}>
      <SectionHeader>💰 Costos Estimados — AWS Pricing Calculator</SectionHeader>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: C.dark }}>
              {["Servicio", "Uso Estimado", "Costo Mensual", "Nota"].map((h) => (
                <th key={h} style={{ padding: "8px 12px", color: C.white, textAlign: "left", fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.tabla.map((r, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? C.white : C.grayCard }}>
                <td style={{ padding: "7px 12px", fontWeight: 600, color: C.dark, borderBottom: `1px solid ${C.border}` }}>{r.s}</td>
                <td style={{ padding: "7px 12px", color: C.gray, borderBottom: `1px solid ${C.border}` }}>{r.uso}</td>
                <td style={{ padding: "7px 12px", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontWeight: 700, color: r.costo === "$0.00" ? C.green : C.orange }}>{r.costo}</span>
                </td>
                <td style={{ padding: "7px 12px", color: C.gray, borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>{r.nota}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ background: C.orangeLight, border: `1px solid ${C.orange}40`, borderRadius: 8, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 700, color: C.dark, fontSize: 14 }}>Total estimado: <span style={{ color: C.orange }}>{data.total}</span></span>
        <span style={{ fontSize: 11, color: C.gray }}>{data.nota}</span>
      </div>
    </div>
  )
}

function SlideImplementation({ data }) {
  return (
    <div style={{ padding: "16px 24px", height: "100%", boxSizing: "border-box", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <SectionHeader>Backend · Despliegue</SectionHeader>
          {data.backend.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
              <span style={{ color: C.orange }}>→</span>
              <span style={{ fontSize: 12, color: C.dark, lineHeight: 1.4 }}>{b}</span>
            </div>
          ))}
        </div>
        <div>
          <SectionHeader>Frontend · Despliegue</SectionHeader>
          {data.frontend.map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
              <span style={{ color: C.cyan }}>→</span>
              <span style={{ fontSize: 12, color: C.dark, lineHeight: 1.4 }}>{f}</span>
            </div>
          ))}
        </div>
        <div style={{ background: C.grayCard, borderRadius: 8, padding: "8px 12px", border: `1px solid ${C.border}` }}>
          <p style={{ margin: 0, fontSize: 11, color: C.gray }}>📁 Repo: <span style={{ color: C.cyan }}>{data.repo}</span></p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SectionHeader>Evidencias por Endpoint</SectionHeader>
        {data.evidencias.map((e, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "5px 8px", background: C.grayCard, borderRadius: 6, border: `1px solid ${C.border}` }}>
            <span style={{ flexShrink: 0 }}>{e.ok ? "✅" : "⚠️"}</span>
            <div>
              <p style={{ margin: 0, fontSize: 11.5, fontWeight: 600, color: C.dark, fontFamily: "monospace" }}>{e.e}</p>
              <p style={{ margin: "1px 0 0", fontSize: 11, color: C.gray }}>{e.det}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideDemo({ data }) {
  return (
    <div style={{ padding: "18px 26px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 10 }}>
      <SectionHeader>🎬 Guión de Demo (8 pasos · ~8 minutos)</SectionHeader>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, flex: 1 }}>
        {data.steps.map((s) => (
          <div key={s.n} style={{ display: "flex", gap: 10, background: C.grayCard, borderRadius: 8, padding: "10px 12px", border: `1px solid ${C.border}`, alignItems: "flex-start" }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: C.orange, color: C.white, fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.n}</div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 12.5, color: C.dark }}>{s.titulo}</p>
              <p style={{ margin: "3px 0", fontSize: 11.5, color: C.gray, lineHeight: 1.4 }}>{s.detalle}</p>
              {s.ep && <Badge color={C.cyan}>{s.ep}</Badge>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideClosing({ data }) {
  return (
    <div style={{ padding: "20px 28px", height: "100%", boxSizing: "border-box", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div>
        <SectionHeader>📚 Aprendizajes</SectionHeader>
        {data.aprendizajes.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
            <span style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 12.5, color: C.dark, lineHeight: 1.5 }}>{a}</span>
          </div>
        ))}
      </div>
      <div>
        <SectionHeader>🚀 Próximos Pasos</SectionHeader>
        {data.proximos.map((p, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
            <span style={{ color: C.orange, fontWeight: 700, flexShrink: 0 }}>→</span>
            <span style={{ fontSize: 12.5, color: C.dark, lineHeight: 1.5 }}>{p}</span>
          </div>
        ))}
        <div style={{ marginTop: 16, background: C.dark, borderRadius: 10, padding: "14px 18px", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.white }}>¿Preguntas? 🙋</p>
          <p style={{ margin: "6px 0 0", fontSize: 12, color: C.gray }}>Repo: {data.repo}</p>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: C.gray }}>Equipo: {data.equipo}</p>
        </div>
      </div>
    </div>
  )
}

// ── RENDER DISPATCHER ──────────────────────────────────────────────────────
function SlideContent({ slide }) {
  const map = {
    cover: SlideCover,
    instructions: SlideInstructions,
    analysis: SlideAnalysis,
    benchmark: SlideBenchmark,
    userStories: SlideUserStories,
    acceptance: SlideAcceptance,
    frontend: SlideFrontend,
    backend: SlideBackend,
    architecture: SlideArchitecture,
    costs: SlideCosts,
    implementation: SlideImplementation,
    demo: SlideDemo,
    closing: SlideClosing,
  }
  const Component = map[slide.type]
  return Component ? <Component data={slide.data} /> : <div style={{ padding: 32, color: C.gray }}>Tipo desconocido: {slide.type}</div>
}

// ── COMPONENTE PRINCIPAL ───────────────────────────────────────────────────
export default function ProyectoParcial() {
  const [current, setCurrent] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const [autoInterval, setAutoInterval] = useState(60) // segundos por slide
  const autoRef = useRef(null)
  const timerRef = useRef(null)
  const n = SLIDES.length

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), [])
  const next = useCallback(() => setCurrent((c) => Math.min(n - 1, c + 1)), [n])

  // Timer
  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => setElapsed((e) => Math.min(e + 1, TOTAL_TIME)), 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [running])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
      if (e.key === " ") { e.preventDefault(); setRunning((r) => !r) }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [prev, next])

  // Auto-play
  useEffect(() => {
    if (autoPlay) {
      autoRef.current = setInterval(() => setCurrent((c) => (c < n - 1 ? c + 1 : c)), autoInterval * 1000)
    } else {
      clearInterval(autoRef.current)
    }
    return () => clearInterval(autoRef.current)
  }, [autoPlay, autoInterval, n])

  const remaining = TOTAL_TIME - elapsed
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`
  const progress = (current / (n - 1)) * 100
  const timeProgress = (elapsed / TOTAL_TIME) * 100
  const slide = SLIDES[current]

  return (
    <div style={{ fontFamily: FONT, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── HEADER FIJO ── */}
      <header style={{
        background: C.white,
        borderBottom: `3px solid ${C.orange}`,
        padding: "0 24px",
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: C.shadow,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        {/* Logo + título */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>

            <span style={{ fontWeight: 800, fontSize: 13, color: C.dark }}>UTEC Posgrado</span>
          </div>
          <div style={{ width: 1, height: 20, background: C.border }} />
          <span style={{ fontSize: 13, color: C.gray }}>Proyecto Parcial · Cloud Computing</span>
        </div>

        {/* Timer + controles */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Timer */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ textAlign: "center", minWidth: 70, background: C.grayCard, borderRadius: 6, padding: "3px 10px", border: `1px solid ${C.border}` }}>
              <p style={{ margin: 0, fontSize: 8, color: C.gray, textTransform: "uppercase", letterSpacing: "0.06em" }}>Transcurrido</p>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: C.dark, fontFamily: "monospace" }}>{fmt(elapsed)}</p>
            </div>
            <div style={{ textAlign: "center", minWidth: 70, background: remaining < 300 ? "#FEF2F2" : C.grayCard, borderRadius: 6, padding: "3px 10px", border: `1px solid ${remaining < 300 ? C.red + "50" : C.border}` }}>
              <p style={{ margin: 0, fontSize: 8, color: remaining < 300 ? C.red : C.gray, textTransform: "uppercase", letterSpacing: "0.06em" }}>Restante</p>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: remaining < 300 ? C.red : C.dark, fontFamily: "monospace" }}>{fmt(remaining)}</p>
            </div>
          </div>

          {/* Timer toggle */}
          <button onClick={() => setRunning((r) => !r)} style={{
            padding: "5px 12px", borderRadius: 6, border: `1px solid ${running ? C.orange : C.border}`,
            background: running ? C.orange : C.white, color: running ? C.white : C.dark,
            fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: FONT,
          }}>
            {running ? "⏸ Pausar" : "▶ Timer"}
          </button>

          {/* Notes toggle */}
          <button onClick={() => setNotesOpen((o) => !o)} style={{
            padding: "5px 12px", borderRadius: 6, border: `1px solid ${notesOpen ? C.cyan : C.border}`,
            background: notesOpen ? C.cyan + "18" : C.white, color: notesOpen ? C.cyan : C.dark,
            fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: FONT,
          }}>
            📝 Notas
          </button>
        </div>
      </header>

      {/* ── BARRA DE PROGRESO TIEMPO ── */}
      <div style={{ height: 3, background: C.grayLight }}>
        <div style={{ height: "100%", width: `${timeProgress}%`, background: timeProgress > 90 ? C.red : C.amber, transition: "width 1s linear" }} />
      </div>

      {/* ── ÁREA PRINCIPAL ── */}
      <main style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Slide card */}
        <div style={{ flex: 1, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12, overflow: "hidden" }}>
          {/* Slide header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ background: C.orange, color: C.white, fontWeight: 800, fontSize: 12, padding: "3px 10px", borderRadius: 4, flexShrink: 0 }}>
              Slide {current + 1} / {n}
            </div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: C.dark }}>{slide.title}</h2>
          </div>

          {/* Main slide card */}
          <div style={{
            flex: 1,
            background: C.white,
            borderRadius: 12,
            border: `1px solid ${C.border}`,
            boxShadow: C.shadowLg,
            overflow: "hidden",
            position: "relative",
          }}>
            <SlideContent slide={slide} />
          </div>
        </div>

        {/* Speaker Notes panel */}
        {notesOpen && (
          <aside style={{
            width: 280,
            background: C.dark,
            borderLeft: `2px solid ${C.orange}`,
            padding: "20px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            overflowY: "auto",
            flexShrink: 0,
          }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: C.orange, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              📝 Speaker Notes
            </p>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: C.white }}>{slide.title}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {slide.notes.map((note, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: C.orange, flexShrink: 0, fontSize: 10, marginTop: 2 }}>▸</span>
                  <p style={{ margin: 0, fontSize: 12, color: "#D1D5DB", lineHeight: 1.55 }}>{note}</p>
                </div>
              ))}
            </div>
          </aside>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        background: C.white,
        borderTop: `1px solid ${C.border}`,
        padding: "10px 24px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        {/* Nav buttons */}
        <button onClick={prev} disabled={current === 0} style={{
          padding: "6px 16px", borderRadius: 6, border: `1px solid ${C.border}`,
          background: current === 0 ? C.grayCard : C.white, color: current === 0 ? C.grayLight : C.dark,
          fontWeight: 700, fontSize: 14, cursor: current === 0 ? "not-allowed" : "pointer", fontFamily: FONT,
          transition: "all 0.15s",
        }}>
          ← Anterior
        </button>

        {/* Progress bar */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ height: 6, background: C.grayLight, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${C.orange}, ${C.orangeDeep})`, borderRadius: 3, transition: "width 0.3s ease" }} />
          </div>
          {/* Slide dots */}
          <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{
                width: i === current ? 18 : 8, height: 8, borderRadius: 4,
                background: i === current ? C.orange : C.grayLight,
                border: "none", cursor: "pointer", padding: 0, transition: "all 0.2s",
              }} />
            ))}
          </div>
        </div>

        {/* Auto-play controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <label style={{ fontSize: 11, color: C.gray }}>Auto cada</label>
          <input
            type="number" min={10} max={300} value={autoInterval}
            onChange={(e) => setAutoInterval(Number(e.target.value))}
            style={{ width: 50, padding: "3px 6px", borderRadius: 4, border: `1px solid ${C.border}`, fontSize: 12, fontFamily: FONT }}
          />
          <label style={{ fontSize: 11, color: C.gray }}>seg</label>
          <button onClick={() => setAutoPlay((a) => !a)} style={{
            padding: "5px 12px", borderRadius: 6, border: `1px solid ${autoPlay ? C.green : C.border}`,
            background: autoPlay ? C.green + "18" : C.white, color: autoPlay ? C.green : C.dark,
            fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: FONT,
          }}>
            {autoPlay ? "⏹ Stop" : "▶ Auto"}
          </button>
        </div>

        <button onClick={next} disabled={current === n - 1} style={{
          padding: "6px 16px", borderRadius: 6, border: `1px solid ${C.border}`,
          background: current === n - 1 ? C.grayCard : C.orange, color: current === n - 1 ? C.grayLight : C.white,
          fontWeight: 700, fontSize: 14, cursor: current === n - 1 ? "not-allowed" : "pointer", fontFamily: FONT,
          transition: "all 0.15s",
        }}>
          Siguiente →
        </button>
      </footer>
    </div>
  )
}
