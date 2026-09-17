// Modal "Más información" de las tarjetas de proyecto.
//
// Cada botón .carta-btn-info lleva un data-abrir-modal con la clave del
// proyecto en PROYECTOS (más abajo). Al pulsarlo se rellena el <dialog>
// #proyecto-modal con esos datos y se abre con showModal(), que ya trae
// gestión de foco y cierre con Esc integrada en el navegador.
//
// Para añadir/editar un proyecto: solo hay que tocar este objeto y, en
// index.html, poner el mismo data-abrir-modal en el botón de esa tarjeta.
document.addEventListener('DOMContentLoaded', function () {
    const PROYECTOS = {
        'company-stock': {
            kicker: 'Proyecto 01',
            titulo: 'Company Stock',
            descripcion: [
                'Dashboard de gestión de stock construido con React 19, Vite y TanStack Query. Cada solicitud de material o reposición interna recorre una máquina de estados propia (Pendiente → Aprobada → Derivada a compra → Enviado → En tránsito → Entregado, con Rechazado y Cancelado como salidas alternativas), repartiéndose entre varios proveedores y generando sus pedidos automáticamente al derivarse a compra.',
                'Los permisos están segmentados por rol: quien solicita solo ve sus propias solicitudes, mientras que gestión y administración controlan proveedores, pedidos y catálogo, y reciben notificaciones con cada solicitud nueva o derivación a compra. Toda la capa de datos pasa por una API cliente que en esta demo persiste en localStorage en vez de contra un backend real, así que el resto de la aplicación —hooks, páginas y formularios validados con React Hook Form y Zod— no sabe ni le importa de dónde vienen los datos.'
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
        'proyecto-iii': {
            kicker: 'Próximamente',
            titulo: 'Proyecto III',
            descripcion: ['Este proyecto todavía está en marcha. En cuanto esté listo, aquí aparecerá su descripción completa, el papel que tuve en él y un enlace para verlo en directo.'],
            stack: ['Tecnologías'],
            enlaces: []
        },
        'proyecto-iv': {
            kicker: 'Próximamente',
            titulo: 'Proyecto IV',
            descripcion: ['Este proyecto todavía está en marcha. En cuanto esté listo, aquí aparecerá su descripción completa, el papel que tuve en él y un enlace para verlo en directo.'],
            stack: ['Tecnologías'],
            enlaces: []
        }
    };

    const modal = document.getElementById('proyecto-modal');
    if (!modal) return;

    const elKicker = document.getElementById('pm-kicker');
    const elTitulo = document.getElementById('pm-titulo');
    const elDescripcion = document.getElementById('pm-descripcion');
    const elStack = document.getElementById('pm-stack');
    const elEnlaces = document.getElementById('pm-enlaces');

    const abrirModal = (id) => {
        const datos = PROYECTOS[id];
        if (!datos) return;

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
            p.textContent = 'Todavía sin enlace público — vuelve pronto.';
            elEnlaces.appendChild(p);
        }

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
