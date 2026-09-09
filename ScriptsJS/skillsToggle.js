// Interruptor (segmented control) para alternar entre las 4 primeras
// y las 4 últimas categorías de "Habilidades técnicas".
document.addEventListener('DOMContentLoaded', function () {
    const switchEl = document.getElementById('skills-switch');
    const groupsContainer = document.getElementById('skill-groups');
    if (!switchEl || !groupsContainer) return;

    const buttons = switchEl.querySelectorAll('.skills-switch-btn');
    const page1Groups = groupsContainer.querySelectorAll('.skill-group[data-page="1"]');
    const page2Groups = groupsContainer.querySelectorAll('.skill-group[data-page="2"]');

    function showPage(page) {
        const showSecond = page === '2';

        page1Groups.forEach((group) => { group.hidden = showSecond; });
        page2Groups.forEach((group) => { group.hidden = !showSecond; });

        switchEl.classList.toggle('is-second', showSecond);

        buttons.forEach((btn) => {
            const isActive = btn.dataset.page === page;
            btn.classList.toggle('is-active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
    }

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => showPage(btn.dataset.page));
    });
});
