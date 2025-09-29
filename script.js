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
        border: '2px solid #632024',
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
//Cursor con Boton de ver mas
buttons.forEach(button => {
    document.addEventListener('mousemove', (e) => {
        // Detectar múltiples tipos de elementos interactivos
        const isOverInteractiveElement = 
            e.target.closest('.lkn') !== null ||
            e.target.closest('.nav-link') !== null ||
            e.target.closest('.btn button') !== null ||
            e.target.closest('.send') !== null ||
            e.target.closest('.iconos') !== null;
        
        if (isOverInteractiveElement) {// sobre cualquier elemento interactivo
            cursorPunto.classList.add('on-button');
            gsap.to(cursorPunto, { 
                scale: 2,
                duration: 0.2
            });
            gsap.to(cursorLinia, {
                scale: 1.5,
                duration: 0.3
            });
        } else {// no sobre ningún elemento interactivo
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

// Animación título en letras
const tl=gsap.timeline();
tl.from(splitText.chars,{
    y:100,
    rotationX:90,
    opacity:0,
    color:"#b0c7e0",
    stagger:0.03,
    transformOrigin:"center top",
    perspective:700,
}).to(splitText.chars,{
    color:"#d8d78c",
    stagger:0.03,
    duration:0.9,
    ease:"power2.out",
});
//Animación subtítulo en palabras
tl.from(splitSubText.words,{
    y:60,
    opacity:0,
    filter:"blur(16px)",
    stagger:0.12,
    duration:0.7,
    ease:"power2.out"
},"-=0.8")
tl.from(splitSubText2.words,{
    y:60,
    opacity:0,
    filter:"blur(16px)",
    stagger:0.12,
    duration:0.7,
    ease: "power2.out"
}, "-=0.5");

// Animación de los dos botones principales (proj. + cv)
gsap.set(".btn", { visibility: "hidden", opacity: 0, y: 30 });
tl.to(".btn", {
    visibility: "visible",
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "back.out(1.2)", 
    delay: 0.1 
}); 

document.addEventListener('DOMContentLoaded', function() {
    initAboutAnimations();
    initHoverEffects();
});

function initAboutAnimations() {
    let ctx = gsap.context(() => {
        // Animate description card
        gsap.fromTo("#about-description .card", 
            {
                opacity: 0,
                y: 60,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "#about-description",
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
        // Animate skills cards
        gsap.fromTo("#about-skills .card", 
            {
                opacity: 0,
                x: -60,
                scale: 0.9
            },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "#about-skills",
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    // Cleanup 
    return () => ctx.revert();
}

function initHoverEffects() {
    // Avatar circle hover 
    const avatarCircle = document.querySelector('.avatar-circle');
    if (avatarCircle) {
        avatarCircle.addEventListener('mouseenter', () => {
            gsap.to(avatarCircle, {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        avatarCircle.addEventListener('mouseleave', () => {
            gsap.to(avatarCircle, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    }
    // Card hover
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -8,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

