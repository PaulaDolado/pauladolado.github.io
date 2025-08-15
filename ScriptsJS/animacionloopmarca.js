const init = () => { 
  const marca = document.querySelector(".diapositiva-marca");
  if (!marca) return;

  const contenido = marca.querySelector(".marca"); // Selecciona .marca, no firstChild
  if (!contenido) return;

  // Clona el contenido y lo añade al final
  const clon = contenido.cloneNode(true);
  marca.appendChild(clon);

  // Calcula el ancho del elemento y el espacio (gap)
  const width = contenido.offsetWidth; 
  const gap = parseInt(getComputedStyle(marca).gap, 10) || 0; // Si gap no está definido, usa 0

  // La distancia es el ancho + el espacio (en negativo para mover hacia la izquierda)
  const distancia = -(width + gap);

  // Animación con GSAP 
  gsap.to(marca.children, {
    x: distancia,
    duration: 10,
    ease: "none",
    repeat: -1, // Repite infinitamente
  });
};

document.addEventListener("DOMContentLoaded", init);