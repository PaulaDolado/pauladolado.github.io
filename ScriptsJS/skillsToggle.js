// Alterna entre las 4 primeras y las 4 últimas categorías de
// "Habilidades técnicas" con un botón "Ver más" / "Ver menos".
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('skills-toggle');
    const groupsContainer = document.getElementById('skill-groups');
    if (!toggleBtn || !groupsContainer) return;

    const page1Groups = groupsContainer.querySelectorAll('.skill-group[data-page="1"]');
    const page2Groups = groupsContainer.querySelectorAll('.skill-group[data-page="2"]');
    const label = toggleBtn.querySelector('span');

    let showingSecondPage = false;

    toggleBtn.addEventListener('click', function () {
        showingSecondPage = !showingSecondPage;

        page1Groups.forEach((group) => {
            group.hidden = showingSecondPage;
        });
        page2Groups.forEach((group) => {
            group.hidden = !showingSecondPage;
        });

        label.textContent = showingSecondPage ? 'Ver menos' : 'Otras tecnologías';
        toggleBtn.classList.toggle('is-expanded', showingSecondPage);
        toggleBtn.setAttribute('aria-expanded', showingSecondPage ? 'true' : 'false');
    });
});
