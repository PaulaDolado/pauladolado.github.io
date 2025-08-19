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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);      
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});