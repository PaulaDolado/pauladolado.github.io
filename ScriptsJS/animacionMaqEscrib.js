const div=document.querySelector("#about-title"),
texto="Acerca de mí.";

function efectoTextTyping(elemento,texto,i=0){
    elemento.textContent+=texto[i];

    if (i==texto.length-1){return;}

    setTimeout(() => efectoTextTyping(div,texto,i+1),100);
}
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            div.textContent = "";
            efectoTextTyping(div, texto);
            observer.unobserve(div);
        }
    });
}, {
    threshold: 0.5 // Se muestra cuando el 50% de la seccion está visible
});
observer.observe(div);