// Envío del formulario de contacto vía AJAX (sin recargar/redirigir la página)
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const response = document.getElementById('form-response');
    if (!form || !response) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const sendButton = form.querySelector('.send');
        const originalLabel = sendButton ? sendButton.value : '';
        if (sendButton) {
            sendButton.value = 'Enviando...';
            sendButton.disabled = true;
        }
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
                response.textContent = '¡Gracias! Tu mensaje se ha enviado correctamente, te responderé pronto.';
                response.classList.add('is-success');
            })
            .catch(() => {
                response.textContent = 'Ha ocurrido un error al enviar el mensaje. Prueba de nuevo o escríbeme directamente por correo.';
                response.classList.add('is-error');
            })
            .finally(() => {
                if (sendButton) {
                    sendButton.value = originalLabel;
                    sendButton.disabled = false;
                }
            });
    });
});
