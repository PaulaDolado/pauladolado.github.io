const div=document.querySelector(".diapositiva-titulo"),
texto="Acerca de mí.";

function efectoTextTyping(elemento,texto,i=0){
    elemento.textContent+=texto[i];

    if (i==texto.length-1){return;}

    setTimeout(() => efectoTextTyping(div,texto,i+1),100);
}
efectoTextTyping(div,texto);