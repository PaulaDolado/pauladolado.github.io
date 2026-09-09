// Reproduce el vídeo de cada tarjeta de proyecto solo mientras está a
// la vista, y lo pausa en cuanto sale de pantalla.
//
// Para activar el vídeo de un proyecto: añade un <source> con el
// archivo real dentro del <video class="carta-video"> correspondiente
// en index.html, por ejemplo:
//   <video class="carta-video" muted loop playsinline preload="none">
//     <source src="videos/proyecto-1.mp4" type="video/mp4">
//   </video>
// En cuanto haya un <source> con "src", este script detecta el vídeo
// automáticamente y oculta el aviso "PRÓXIMAMENTE".
document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('.carta-video');

    videos.forEach((video) => {
        const source = video.querySelector('source[src]');
        if (!source || !source.getAttribute('src')) {
            return; // Sin vídeo todavía: se queda el aviso "PRÓXIMAMENTE".
        }

        const contenedor = video.closest('.carta-img');
        if (contenedor) contenedor.classList.add('has-video');

        const observer = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    video.play().catch(() => {
                        // Algunos navegadores bloquean el autoplay; no pasa nada,
                        // el usuario puede reproducirlo pulsando la tarjeta.
                    });
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });
        observer.observe(video);
    });

    // Los enlaces de proyecto son placeholders (href="#") hasta que se
    // añada la URL real de cada proyecto; evita el salto a inicio mientras.
    document.querySelectorAll('a.carta[href="#"]').forEach((enlace) => {
        enlace.addEventListener('click', (e) => e.preventDefault());
    });
});
