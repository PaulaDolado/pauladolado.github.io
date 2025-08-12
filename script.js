gsap.registerPlugin(SplitText);

// Cogemos los elementos
const cursorPunto= document.querySelector("[data-punto]");
const cursorLinia= document.querySelector("[data-linia]");

const text = document.querySelector(".text");
const subtext = document.querySelector(".subtext");
const subtext2 = document.querySelector(".subtext2");

const buttons = document.querySelectorAll(".btn button");
// Dividir texto en letras y palabras
const splitText=new SplitText(text, {type: "chars"})
const splitSubText=new SplitText(subtext, {type: "words"})
const splitSubText2=new SplitText(subtext2, {type: "words"})

//Animación cursor
window.addEventListener("mousemove", function(e){
    const posX= e.clientX;
    const posY= e.clientY;
    cursorPunto.style.left=`${posX}px`;
    cursorPunto.style.top=`${posY}px`;

    gsap.to(cursorLinia, {
        left: posX,
        top: posY,
        duration: 0.3,
        ease: "power2.out"
    });
});
//Animación cursor click
document.addEventListener('mousedown', () => {
    gsap.to(cursorLinia, {
        scale: 1.8,
        border: '2px solid hsl(267, 61%, 49%)',
        duration: 0.1
    });
});

document.addEventListener('mouseup', () => {
    gsap.to(cursorLinia, {
        scale: 1,
        border: '2px solid gray',
        duration: 0.3
    });
});
// Animación cursor-botón
buttons.forEach(button => {
    document.addEventListener('mousemove', (e) => {
        const isOverButton = e.target.closest('.btn button') !== null;
        
        if (isOverButton) {// sobre el botón
            cursorPunto.classList.add('on-button');
            gsap.to(cursorPunto, { 
                scale: 2,
                duration: 0.2
            });
            gsap.to(cursorLinia, {
                scale: 1.5,
                duration: 0.3
            });
        } else {// no sobre el botón
            cursorPunto.classList.remove('on-button');
            gsap.to(cursorPunto, {
                scale: 1,
                duration: 0.3
            });
            gsap.to(cursorLinia, {
                scale: 1,
                duration: 0.3
            });
        }
    });
});

// Animación letras
const tl=gsap.timeline();
tl.from(splitText.chars,{
    y:100,
    ratationX:90,
    opacity:0,
    color:"#FFFFFF",
    stagger:0.03,
    transformOrigin:"center top",
    perspective:700,
}).to(splitText.chars,{
    color:"#6c5ce7",
    stagger:0.03,
    duration:0.9,
    ease:"power2.out",
});
//Animación palabras
tl.from(splitSubText.words,{
    y:60,
    opacity:0,
    filter:"blur(16px)",
    stagger:0.12,
    duration:0.7,
    ease:"power2.out"
},"-=1.2"),to(splitSubText.words,{
    filter:"blur(0px)",
})
tl.from(splitSubText2.words,{
    y:60,
    opacity:0,
    filter:"blur(16px)",
    stagger:0.12,
    duration:0.7,
    ease:"power2.out"
},"-=1.2"),to(splitSubText.words,{
    filter:"blur(0px)",
})
