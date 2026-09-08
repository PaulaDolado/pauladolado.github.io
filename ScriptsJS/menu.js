document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
            
    // Toggle menu
    hamburger.addEventListener('click', function() {
        const isActive = this.classList.toggle('active');
        navLinks.classList.toggle('active');
        this.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        this.setAttribute('aria-label', isActive ? 'Cerrar menú' : 'Abrir menú');
    });
    // Cerrar menú hamburgesa
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Abrir menú');
        });
    });
    // Cerrar menú click fuera
    document.addEventListener('click', function(event) {
    const isClickInsideNav = navLinks.contains(event.target) || hamburger.contains(event.target);

    if (!isClickInsideNav && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Abrir menú');
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

  // Resalta en el menú el enlace de la sección visible en pantalla.
  // Se calcula por posición de scroll (en lugar de IntersectionObserver) para
  // que funcione igual de bien con secciones más altas que la ventana.
  // Nota: la sección "proyectos" queda fijada (pin) por GSAP ScrollTrigger
  // dentro de un contenedor ".pin-spacer"; su posición real en el documento
  // hay que leerla de ese contenedor, no de la sección (que pasa a estar
  // posicionada de forma relativa a él).
  const posicionEnDocumento = (seccion) => {
    const spacer = seccion.closest('.pin-spacer');
    return spacer ? spacer.offsetTop : seccion.offsetTop;
  };
  const seccionesConId = Array.from(document.querySelectorAll('section[id]'));
  const marcarEnlaceActivo = (id) => {
    navLinksItems.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };
  let tickeando = false;
  const actualizarSeccionActiva = () => {
    tickeando = false;
    const lineaDeteccion = window.scrollY + window.innerHeight * 0.4;
    let actual = seccionesConId[0];
    seccionesConId.forEach((seccion) => {
      if (posicionEnDocumento(seccion) <= lineaDeteccion) {
        actual = seccion;
      }
    });
    if (actual) marcarEnlaceActivo(actual.id);
  };
  window.addEventListener('scroll', () => {
    if (!tickeando) {
      tickeando = true;
      requestAnimationFrame(actualizarSeccionActiva);
    }
  }, { passive: true });
  actualizarSeccionActiva();

});