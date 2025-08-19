document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
            
    // Toggle menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    // Cerrar menú hamburgesa
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        });
    });
    // Cerrar menú click fuera
    document.addEventListener('click', function(event) {
    const isClickInsideNav = navLinks.contains(event.target) || hamburger.contains(event.target);
                
    if (!isClickInsideNav && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        }
    });
    // Scroll smooth
const proyectosLink = document.querySelector('.nav-link[href="#proyectos"]');

if (proyectosLink) {
    proyectosLink.addEventListener('click', function(e) {
        e.preventDefault();

        const allSections = document.querySelectorAll('section');
        let previousSection = null;

        for (let i = 0; i < allSections.length; i++) {
            if (allSections[i].id === 'proyectos') {
                if (i > 0) {
                    previousSection = allSections[i - 1];
                }
                break;
            }
        }

        if (previousSection) {
            window.scrollTo({
                top: previousSection.offsetTop + previousSection.offsetHeight,
                behavior: 'smooth'
            });
        }
    });
}

    
});