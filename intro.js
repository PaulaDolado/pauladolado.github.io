const texto = "Paula Dolado Aynié";
const container = document.getElementById('intro');

// Crear spans para cada letra
texto.split('').forEach(letra => {
  const span = document.createElement('span');
  span.textContent = letra;
  span.classList.add('letter');
  container.appendChild(span);
});

// Animar letras con GSAP
gsap.to(".letter", {
  duration: 0.6,
  y: 0,
  opacity: 1,
  stagger: 0.1,
  ease: "power2.out",
});