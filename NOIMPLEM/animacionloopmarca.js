const init = () => { 
  const marca = document.querySelector(".diapositiva-marca");
  if (!marca) return;
  const contenido = marca.querySelector(".marca");
  if (!contenido) return;
  const clon = contenido.cloneNode(true);
  marca.appendChild(clon);
  marca.appendChild(clon);

  const width = parseInt(getComputedStyle(contenido).getPropertyValue("width"), 10); 
  const gap = parseInt(getComputedStyle(contenido).gap, 10) || 0; // Si no gap -> 0
  const distancia = -(width + gap);

  gsap.to(marca.children, {
    x: distancia,
    duration: 10,
    ease: "none",
    repeat: -1, // Repite infinitamente
  });
  console.log(width)
};

document.addEventListener("DOMContentLoaded", init);