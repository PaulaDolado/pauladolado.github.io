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
const proyectosLink2 = document.querySelector('.nav2-link[href="#proyectos-button"]');
const inicioLink = document.querySelector('.nav-link[href="#inicio"]');
const acercademiLink = document.querySelector('.nav-link[href="#acercademi"]');
const experienciaLink = document.querySelector('.nav-link[href="#experiencia"]');
const contactoLink = document.querySelector('.nav-link[href="#contacto"]');

  // Función para el scroll suave
  const smoothScroll = (targetId) => {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Asignar el evento a cada enlace
  if (proyectosLink) {
    proyectosLink.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScroll('proyectos');
    });
  }
  if (inicioLink) {
    inicioLink.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScroll('inicio');
    });
  }

  if (acercademiLink) {
    acercademiLink.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScroll('acercademi');
    });
  }

  if (experienciaLink) {
    experienciaLink.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScroll('experiencia');
    });
  }

  if (contactoLink) {
    contactoLink.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScroll('contacto');
    });
  }
    
});