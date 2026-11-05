const div=document.querySelector("#about-title");

// El texto se pide cada vez para que salga en el idioma activo (ver idioma.js)
const textoTitulo=() => window.i18n ? window.i18n.t('about.titulo', 'Acerca de mí.') : 'Acerca de mí.';

let tecleo=null;      // temporizador del tecleo en curso
let empezado=false;   // la animación solo se hace una vez

function efectoTextTyping(elemento,texto,i=0){
    elemento.textContent+=texto[i];

    if (i==texto.length-1){tecleo=null;return;}

    tecleo=setTimeout(() => efectoTextTyping(div,texto,i+1),100);
}
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            empezado = true;
            div.textContent = "";
            efectoTextTyping(div, textoTitulo());
            observer.unobserve(div);
        }
    });
}, {
    threshold: 0.5 // Se muestra cuando el 50% de la seccion está visible
});
observer.observe(div);

// Al cambiar de idioma: si el título ya se ha escrito (o se está
// escribiendo), se pone entero en el idioma nuevo; si aún no, se
// escribirá en ese idioma cuando la sección entre en pantalla.
document.addEventListener('idiomacambiado', () => {
    if (!empezado) return;
    clearTimeout(tecleo);
    tecleo = null;
    div.textContent = textoTitulo();
});
