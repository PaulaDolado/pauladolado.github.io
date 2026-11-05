// Modal "Más información" de las tarjetas de proyecto.
//
// Cada botón .carta-btn-info lleva un data-abrir-modal con la clave del
// proyecto en PROYECTOS (más abajo). Al pulsarlo se rellena el <dialog>
// #proyecto-modal con esos datos y se abre con showModal(), que ya trae
// gestión de foco y cierre con Esc integrada en el navegador.
//
// Para añadir/editar un proyecto: solo hay que tocar este objeto (y su
// versión en inglés, PROYECTOS_EN) y, en index.html, poner el mismo
// data-abrir-modal en el botón de esa tarjeta.
document.addEventListener('DOMContentLoaded', function () {
    const PROYECTOS = {
        'company-stock': {
            kicker: 'Proyecto 01',
            titulo: 'Company Stock',
            descripcion: [
                'Dashboard de gestión de stock construido con React 19, Vite y TanStack Query. Cada solicitud de material o reposición interna recorre una máquina de estados propia (Pendiente → Aprobada → Derivada a compra → Enviado → En tránsito → Entregado, con Rechazado y Cancelado como salidas alternativas), repartiéndose entre varios proveedores y generando sus pedidos automáticamente al derivarse a compra.',
                'Los permisos están segmentados por rol: quien solicita solo ve sus propias solicitudes, mientras que gestión y administración gestionan el stock, los proveedores y el histórico completo de solicitudes, con avisos en la app ante cada solicitud nueva y un correo automático al responsable de compras en cuanto una se deriva.',
                'Toda la capa de datos pasa por una API cliente: en el proyecto original corre sobre un servidor Ubuntu con Docker y PostgreSQL, pero esta demo la sustituye por localStorage para poder distribuirse como una prueba autocontenida de esta versión, sin depender de infraestructura propia. El resto de la aplicación —hooks, páginas y formularios validados con React Hook Form y Zod— no sabe ni le importa de dónde vienen los datos.'
            ],
            stack: ['React', 'TanStack Query', 'Tailwind CSS'],
            enlaces: [
                { texto: 'Ver proyecto', url: 'https://pauladolado.github.io/Company-Stock/login' },
                { texto: 'Código en GitHub', url: 'https://github.com/PaulaDolado/Company-Stock' }
            ]
        },
        tidely: {
            kicker: 'Proyecto 02',
            titulo: 'Tidely',
            descripcion: [
                'API REST construida en Node.js/TypeScript con Express y Prisma sobre PostgreSQL, con autenticación JWT (access + refresh) y documentada con Swagger/OpenAPI. Centraliza cinco módulos —agenda, metas, finanzas, proyectos y hábitos— con eventos recurrentes reales, notificaciones automáticas (recordatorios y alertas de metas en riesgo) y zona horaria propia por usuario; todo cubierto por 189 tests unitarios y de integración con Jest.',
                'El backend sirve tres clientes: este dashboard en React, una app móvil en Expo/React Native offline-first y una integración de solo lectura con Google Calendar. El móvil replica en SQLite el subconjunto de uso diario (eventos, tareas, hábitos, notas) y sincroniza contra el backend mediante GET /sync/pull y POST /sync/push, resolviendo borrados con tombstones y conflictos con last-write-wins, así que funciona igual con o sin conexión.'
            ],
            stack: ['Node.js', 'Express', 'PostgreSQL'],
            enlaces: [
                { texto: 'Ver proyecto', url: 'https://pauladolado.github.io/Tidely/' },
                { texto: 'Código en GitHub', url: 'https://github.com/PaulaDolado/Tidely' }
            ]
        },
        integra: {
            kicker: 'Proyecto 03',
            titulo: 'Integra',
            descripcion: [
                'Portal del empleado construido con React 18, TypeScript, Vite y shadcn/ui sobre Supabase (PostgreSQL, Auth, Storage y Realtime). Cada persona gestiona su día a día desde un solo sitio: fichajes de entrada y salida, solicitudes de ausencia con justificante, cambios e intercambios de turno, un tablero kanban de tareas en tiempo real, calendario, tickets al estilo GLPI, tablón de anuncios, organigrama y chat interno con indicador de presencia.',
                'Los departamentos funcionan como roles: RRHH, Dirección, Finanzas y Tecnología tienen sus propias pantallas de gestión (bandejas de aprobación, empleados, tickets, fichajes con exportación a CSV y correcciones auditadas, datos de pago), y los permisos se configuran en base de datos sin tocar código. El frontend solo decide qué mostrar; quien decide de verdad son las políticas Row Level Security, que vuelven a comprobar cada permiso en el servidor.',
                'La seguridad es parte del diseño: doble factor TOTP que bloquea los datos hasta verificarse, datos sensibles servidos mediante funciones SECURITY DEFINER (el IBAN llega enmascarado y cada consulta completa queda registrada), Content Security Policy inyectada en el build, adjuntos en buckets privados con URLs firmadas y tests con Vitest y Testing Library que se ejecutan antes de cada despliegue a GitHub Pages.'
            ],
            stack: ['React', 'TypeScript', 'Supabase'],
            enlaces: [
                { texto: 'Ver proyecto', url: 'https://pauladolado.github.io/Integra/login' },
                { texto: 'Código en GitHub', url: 'https://github.com/PaulaDolado/Integra' }
            ]
        },
        'el-candil': {
            kicker: 'Proyecto 04',
            titulo: 'El Candil',
            descripcion: [
                'Web del restaurante El Candil, planteada en dos etapas. La primera, ya publicada, es una página estática en HTML, CSS y JavaScript sin build ni dependencias: la carta se consulta abriendo las carpetas de un archivador, una por sección (menú del día, entrantes, carnes, pescados, postres, menú infantil y bebidas), con precios, etiquetas y alérgenos de cada plato, todo generado desde un único archivo de datos.',
                'La reserva de mesa solo ofrece las horas con sitio y la guarda en Supabase, donde funciones de PostgreSQL con Row Level Security vuelven a comprobar el aforo en el momento de reservar. Con la reserva confirmada, el cliente puede añadirla a su calendario y recibir el comprobante por WhatsApp desde el número del restaurante mediante una Edge Function que llama a la API de WhatsApp Business. Si Supabase no está disponible, la reserva se envía directamente al WhatsApp del local.',
                'La segunda etapa, pendiente, convertirá la web en un punto de pedido desde la propia mesa: el comensal indicará la mesa en la que está sentado y podrá hacer su pedido desde el móvil.'
            ],
            stack: ['HTML', 'JavaScript', 'Supabase'],
            enlaces: [
                { texto: 'Ver proyecto', url: 'https://pauladolado.github.io/El-Candil/' },
                { texto: 'Código en GitHub', url: 'https://github.com/PaulaDolado/El-Candil' }
            ]
        }
    };

    // Textos en inglés de cada ficha. Solo lleva lo que cambia con el
    // idioma: el resto (título, stack, URLs) se toma de PROYECTOS. Los
    // textos de los enlaces van en el mismo orden que en PROYECTOS.
    const PROYECTOS_EN = {
        'company-stock': {
            descripcion: [
                'Stock management dashboard built with React 19, Vite and TanStack Query. Every material request or internal restock goes through its own state machine (Pending → Approved → Sent to purchasing → Shipped → In transit → Delivered, with Rejected and Cancelled as alternative outcomes), split across several suppliers, with their orders generated automatically when it is sent to purchasing.',
                'Permissions are segmented by role: requesters only see their own requests, while management and administration handle stock, suppliers and the full request history, with in-app alerts for every new request and an automatic email to the purchasing manager as soon as one is sent to purchasing.',
                'The whole data layer goes through a client API: in the original project it runs on an Ubuntu server with Docker and PostgreSQL, but this demo replaces it with localStorage so it can be shared as a self-contained preview of this version, without depending on its own infrastructure. The rest of the application —hooks, pages and forms validated with React Hook Form and Zod— neither knows nor cares where the data comes from.'
            ],
            enlaces: ['View project', 'Code on GitHub']
        },
        tidely: {
            descripcion: [
                'REST API built in Node.js/TypeScript with Express and Prisma on PostgreSQL, with JWT authentication (access + refresh) and documented with Swagger/OpenAPI. It brings together five modules —calendar, goals, finances, projects and habits— with real recurring events, automatic notifications (reminders and alerts for goals at risk) and a time zone per user; all covered by 189 unit and integration tests with Jest.',
                'The backend serves three clients: this React dashboard, an offline-first mobile app in Expo/React Native and a read-only Google Calendar integration. The mobile app mirrors the everyday subset (events, tasks, habits, notes) in SQLite and syncs with the backend through GET /sync/pull and POST /sync/push, resolving deletions with tombstones and conflicts with last-write-wins, so it works the same with or without a connection.'
            ],
            enlaces: ['View project', 'Code on GitHub']
        },
        integra: {
            descripcion: [
                'Employee portal built with React 18, TypeScript, Vite and shadcn/ui on Supabase (PostgreSQL, Auth, Storage and Realtime). Everyone manages their day-to-day from a single place: clocking in and out, absence requests with supporting documents, shift changes and swaps, a real-time kanban task board, calendar, GLPI-style tickets, a notice board, an org chart and internal chat with presence indicators.',
                'Departments work as roles: HR, Management, Finance and Technology have their own management screens (approval inboxes, employees, tickets, time records with CSV export and audited corrections, payment details), and permissions are configured in the database without touching code. The frontend only decides what to show; what really decides are the Row Level Security policies, which check every permission again on the server.',
                'Security is part of the design: TOTP two-factor authentication that locks the data until verified, sensitive data served through SECURITY DEFINER functions (the IBAN arrives masked and every full lookup is logged), a Content Security Policy injected at build time, attachments in private buckets with signed URLs, and tests with Vitest and Testing Library that run before every deployment to GitHub Pages.'
            ],
            enlaces: ['View project', 'Code on GitHub']
        },
        'el-candil': {
            descripcion: [
                'Website for El Candil restaurant, planned in two stages. The first, already live, is a static page in HTML, CSS and JavaScript with no build step or dependencies: the menu is browsed by opening the folders of a filing cabinet, one per section (set menu, starters, meat, fish, desserts, children\'s menu and drinks), with prices, labels and allergens for each dish, all generated from a single data file.',
                'Table booking only offers the times with space available and stores the booking in Supabase, where PostgreSQL functions with Row Level Security check capacity again at the moment of booking. Once the booking is confirmed, the customer can add it to their calendar and receive the confirmation by WhatsApp from the restaurant\'s number through an Edge Function that calls the WhatsApp Business API. If Supabase is unavailable, the booking is sent straight to the restaurant\'s WhatsApp.',
                'The second stage, still to come, will turn the website into an ordering point at the table itself: diners will indicate which table they are sitting at and will be able to order from their phone.'
            ],
            enlaces: ['View project', 'Code on GitHub']
        }
    };

    const t = (clave, espanol) => (window.i18n ? window.i18n.t(clave, espanol) : espanol);
    const enIngles = () => window.i18n && window.i18n.idioma() === 'en';

    // Datos de la ficha en el idioma activo
    function datosProyecto(id) {
        const es = PROYECTOS[id];
        const en = PROYECTOS_EN[id];
        if (!es || !enIngles() || !en) return es;
        return Object.assign({}, es, {
            kicker: es.kicker.replace('Proyecto', t('modal.kicker', 'Proyecto')),
            descripcion: en.descripcion,
            enlaces: es.enlaces.map((enlace, i) => ({ texto: en.enlaces[i] || enlace.texto, url: enlace.url }))
        });
    }

    const modal = document.getElementById('proyecto-modal');
    if (!modal) return;

    const elKicker = document.getElementById('pm-kicker');
    const elTitulo = document.getElementById('pm-titulo');
    const elDescripcion = document.getElementById('pm-descripcion');
    const elStack = document.getElementById('pm-stack');
    const elEnlaces = document.getElementById('pm-enlaces');

    let proyectoAbierto = null; // para volver a pintarlo si cambia el idioma

    const rellenarModal = (id) => {
        const datos = datosProyecto(id);
        if (!datos) return false;
        proyectoAbierto = id;

        elKicker.textContent = datos.kicker || '';
        elTitulo.textContent = datos.titulo;
        elDescripcion.innerHTML = '';
        datos.descripcion.forEach((parrafo) => {
            const p = document.createElement('p');
            p.textContent = parrafo;
            elDescripcion.appendChild(p);
        });

        elStack.innerHTML = '';
        datos.stack.forEach((tecnologia) => {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            span.textContent = tecnologia;
            elStack.appendChild(span);
        });

        elEnlaces.innerHTML = '';
        if (datos.enlaces.length) {
            datos.enlaces.forEach((enlace) => {
                const a = document.createElement('a');
                a.className = 'carta-btn carta-btn-link';
                a.href = enlace.url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = enlace.texto;
                elEnlaces.appendChild(a);
            });
        } else {
            const p = document.createElement('p');
            p.className = 'proyecto-modal-proximamente';
            p.textContent = t('modal.sinEnlace', 'Todavía sin enlace público — vuelve pronto.');
            elEnlaces.appendChild(p);
        }
        return true;
    };

    const abrirModal = (id) => {
        if (!rellenarModal(id)) return;

        // El <dialog> se pinta en la "top layer" del navegador, por encima
        // incluso del cursor personalizado (que es un div normal). Mientras
        // esté abierto se restaura el cursor nativo para no perderlo de
        // vista. Se quita en cuanto se cierra el modal, sea cual sea la
        // vía (botón, Esc o backdrop) — ver quitarClaseModalAbierto.
        document.body.classList.add('modal-abierto');
        modal.showModal();
    };

    const quitarClaseModalAbierto = () => document.body.classList.remove('modal-abierto');

    document.querySelectorAll('[data-abrir-modal]').forEach((boton) => {
        boton.addEventListener('click', () => abrirModal(boton.dataset.abrirModal));
    });

    // Si la ficha está abierta al cambiar de idioma, se vuelve a pintar
    document.addEventListener('idiomacambiado', () => {
        if (modal.open && proyectoAbierto) rellenarModal(proyectoAbierto);
    });

    // Cerrar al pulsar fuera del cuadro de diálogo (sobre el ::backdrop).
    modal.addEventListener('click', (evento) => {
        if (evento.target === modal) {
            modal.close();
            quitarClaseModalAbierto();
        }
    });

    // El evento "close" del <dialog> ya cubre el cierre con Esc y con el
    // botón (method="dialog"), pero se refuerza con "cancel" (Esc, antes
    // de "close") para no depender de un único evento.
    modal.addEventListener('close', quitarClaseModalAbierto);
    modal.addEventListener('cancel', quitarClaseModalAbierto);
    const botonCerrar = modal.querySelector('.proyecto-modal-cerrar');
    if (botonCerrar) botonCerrar.addEventListener('click', quitarClaseModalAbierto);

    // Refuerzo por si algún navegador no dispara "cancel"/"close" con Esc:
    // se cierra explícitamente igual.
    modal.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') {
            modal.close();
            quitarClaseModalAbierto();
        }
    });
});
