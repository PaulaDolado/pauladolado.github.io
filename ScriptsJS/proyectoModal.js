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
                'Dashboard de gestión de stock pensado para centralizar las solicitudes de material y la reposición interna de una empresa, sustituyendo hojas de cálculo y correos sueltos por un flujo único y trazable.',
                'Incluye gestión de proveedores y pedidos, control de roles por perfil de usuario y un flujo de aprobación completo: cada solicitud pasa por los estados correspondientes hasta quedar resuelta, con permisos distintos para quien solicita, quien aprueba y quien gestiona el catálogo.'
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
                'API REST de organización personal que centraliza agenda, metas, finanzas y proyectos en un único sitio, con notificaciones automáticas para no perder de vista fechas ni tareas pendientes.',
                'Este dashboard web es uno de los tres clientes del mismo backend: hay además una aplicación de escritorio y una app móvil offline en desarrollo, pensadas para que la información se mantenga sincronizada sea cual sea el dispositivo que uses.'
            ],
            stack: ['Node.js', 'Express', 'PostgreSQL'],
            enlaces: [
                { texto: 'Ver proyecto', url: 'https://pauladolado.github.io/Tidely/' }
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
