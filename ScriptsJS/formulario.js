// Envío del formulario de contacto vía AJAX (sin recargar/redirigir la página)
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const response = document.getElementById('form-response');
    if (!form || !response) return;

    // Textos en el idioma activo (ver idioma.js)
    const t = (clave, espanol) => (window.i18n ? window.i18n.t(clave, espanol) : espanol);
    const MENSAJES = {
        ok: () => t('form.ok', '¡Gracias! Tu mensaje se ha enviado correctamente, te responderé pronto.'),
        error: () => t('form.error', 'Ha ocurrido un error al enviar el mensaje. Prueba de nuevo o escríbeme directamente por correo.')
    };
    let ultimoMensaje = null; // 'ok' | 'error' | null, para traducirlo si cambia el idioma

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const sendButton = form.querySelector('.send');
        if (sendButton) {
            sendButton.value = t('form.enviando', 'Enviando...');
            sendButton.disabled = true;
        }
        ultimoMensaje = null;
        response.textContent = '';
        response.classList.remove('is-success', 'is-error');

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
        })
            .then((res) => {
                if (!res.ok) throw new Error('request-failed');
                form.reset();
                ultimoMensaje = 'ok';
                response.textContent = MENSAJES.ok();
                response.classList.add('is-success');
            })
            .catch(() => {
                ultimoMensaje = 'error';
                response.textContent = MENSAJES.error();
                response.classList.add('is-error');
            })
            .finally(() => {
                if (sendButton) {
                    sendButton.value = t('form.enviar', 'Enviar');
                    sendButton.disabled = false;
                }
            });
    });

    document.addEventListener('idiomacambiado', () => {
        if (ultimoMensaje) response.textContent = MENSAJES[ultimoMensaje]();
    });
});
