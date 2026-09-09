// Botón estilo terminal para alternar entre las 4 primeras y las 4
// últimas categorías de "Habilidades técnicas", con un pequeño efecto
// de tecleo antes de aplicar el cambio.
document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('skills-terminal');
    const cmdEl = document.getElementById('skills-terminal-cmd');
    const groupsContainer = document.getElementById('skill-groups');
    if (!button || !cmdEl || !groupsContainer) return;

    const page1Groups = groupsContainer.querySelectorAll('.skill-group[data-page="1"]');
    const page2Groups = groupsContainer.querySelectorAll('.skill-group[data-page="2"]');

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // "Escribe" un texto en el botón, letra a letra.
    function typeCommand(text, speed) {
        return new Promise((resolve) => {
            cmdEl.textContent = '';
            let i = 0;
            (function paso() {
                cmdEl.textContent += text[i];
                i += 1;
                if (i < text.length) {
                    setTimeout(paso, speed);
                } else {
                    resolve();
                }
            }());
        });
    }

    let showingSecondPage = false;

    button.addEventListener('click', async () => {
        button.disabled = true;

        // Efecto de "ejecutar" el comando antes de aplicar el cambio
        await typeCommand('', 0);
        await typeCommand('cargando…', 25);
        await sleep(250);

        showingSecondPage = !showingSecondPage;
        page1Groups.forEach((group) => { group.hidden = showingSecondPage; });
        page2Groups.forEach((group) => { group.hidden = !showingSecondPage; });
        button.setAttribute('aria-expanded', showingSecondPage ? 'true' : 'false');

        const proximoComando = showingSecondPage ? 'ver --principales' : 'ver --otras-tecnologias';
        await typeCommand(proximoComando, 30);

        button.disabled = false;
    });
});
