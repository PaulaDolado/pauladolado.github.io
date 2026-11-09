// Visor de capturas de los posts: al pulsar una imagen se abre ampliada
// encima de la página, sin salir de ella. Se cierra con la X, con Esc o
// pulsando fuera de la imagen.
(function () {
    const enlaces = document.querySelectorAll('.post-captura a');
    if (!enlaces.length || typeof HTMLDialogElement !== 'function') return;

    const t = (clave, es) => (window.i18n ? window.i18n.t(clave, es) : es);

    const visor = document.createElement('dialog');
    visor.className = 'visor';
    visor.innerHTML =
        '<button type="button" class="visor-cerrar"><span aria-hidden="true">×</span></button>' +
        '<figure class="visor-contenido">' +
            '<img class="visor-imagen" alt="" />' +
            '<figcaption class="visor-pie"></figcaption>' +
        '</figure>';
    document.body.appendChild(visor);

    const cerrar = visor.querySelector('.visor-cerrar');
    const imagen = visor.querySelector('.visor-imagen');
    const pie = visor.querySelector('.visor-pie');

    let actual = null;

    // Textos copiados de la captura, para que sigan el idioma de la página
    function textos() {
        const miniatura = actual.querySelector('img');
        const leyenda = actual.closest('figure').querySelector('figcaption');
        imagen.alt = miniatura ? miniatura.alt : '';
        pie.textContent = leyenda ? leyenda.textContent : '';
        pie.hidden = !leyenda;
        cerrar.setAttribute('aria-label', t('modal.cerrar', 'Cerrar'));
    }

    function abrir(enlace) {
        actual = enlace;
        imagen.src = enlace.getAttribute('href');
        textos();
        document.documentElement.classList.add('visor-abierto');
        visor.showModal();
        cerrar.focus();
    }

    enlaces.forEach((enlace) => {
        enlace.addEventListener('click', (e) => {
            // Ctrl/Cmd + clic sigue abriendo la imagen en otra pestaña
            if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            abrir(enlace);
        });
    });

    cerrar.addEventListener('click', () => visor.close());
    // Pulsar fuera de la imagen (en el fondo oscuro) también cierra
    visor.addEventListener('click', (e) => {
        if (e.target !== imagen) visor.close();
    });
    visor.addEventListener('close', () => {
        document.documentElement.classList.remove('visor-abierto');
        imagen.removeAttribute('src');
    });

    document.addEventListener('idiomacambiado', () => {
        if (visor.open) textos();
    });
})();
