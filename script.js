gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);
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
gsap.set(".btn", { visibility: "hidden", opacity: 0, y: 30 });
// Animación título en letras
const tl=gsap.timeline();
tl.from(splitText.chars,{
    y:100,
    rotationX:90,
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
//Animación subtítulo en palabras
tl.from(splitSubText.words,{
    y:60,
    opacity:0,
    filter:"blur(16px)",
    stagger:0.12,
    duration:0.7,
    ease:"power2.out"
},"-=0.3")
tl.from(splitSubText2.words,{
    y:60,
    opacity:0,
    filter:"blur(16px)",
    stagger:0.12,
    duration:0.7,
    ease: "power2.out"
}, "-=0.5");

tl.to(".btn", {
    visibility: "visible",
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "back.out(1.2)", 
    delay: 0.1 
}); 
//Animacion Secciones proyectos
document.addEventListener("DOMContentLoaded",()=>{
    
    const lenis= new Lenis();
    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((time)=>{
        lenis.raf(time*1000);
    });
    gsap.ticker.lagSmoothing(0);

    const stickySection= document.querySelector(".proyectos");
    const stickyHeight= window.innerHeight * 7;
    const cartas= document.querySelectorAll(".carta:not(.empty)");
    const ContenedorContador= document.querySelector(".contenedor-contador");
    const totalcartas= cartas.length ; 
    

    ScrollTrigger.create({
        trigger: stickySection,
        start:"top top",
        end:`+=${stickyHeight}px`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self)=>{
            posicionCartas(self.progress);
        },
    });
    const getRadio=()=>{
        return window.innerWidth<900 ? window.innerWidth * 7.5: window.innerWidth*2.5;
    };
    const arcAngulo= Math.PI * 0.4;
    const inicioAngulo= Math.PI / 2 - arcAngulo / 2;
    

    function posicionCartas(progress=0){
        const radio=getRadio();
        const totalViaje = 1 + totalcartas/7.5;
        const procesoActual = (progress * totalViaje -1)*0.75;

        cartas.forEach((carta, i) =>{
            const procesoNorm = (totalcartas-1-i)/totalcartas;
            const procesCartas = procesoNorm + procesoActual;
            const angulo = inicioAngulo + arcAngulo * procesCartas;

            const x=Math.cos(angulo) * radio;
            const y=Math.sin(angulo) * radio;
            const rotacion = (angulo - Math.PI / 2) * (180 / Math.PI);
            gsap.set(carta,{
                x:x,
                y:-y + radio,
                rotation:-rotacion,
                transformOrigin:"center center"
            });
        });
    }
    posicionCartas(0);
    let IndexAct=0;
    const opciones={
        root:null,
        rootMargin: "0% 0%",
        threshold:0.5,
    };
    const observador = new IntersectionObserver((entradas)=>{
        entradas.forEach((entrada)=>{
            if (entrada.isIntersecting){
                lastScrollY=window.scrollY;
                let Index = Array.from(cartas).indexOf(entrada.target);
                IndexAct= Index;
                const targetY= 150 - IndexAct * 150;
                gsap.to(ContenedorContador,{
                    y: targetY,
                    duration: 0.3,
                    ease: "power1.out",
                    overwrite:true,
                    });
                }
            });
        }, opciones);
    cartas.forEach((carta)=>{
        observador.observe(carta);
    });
    window.addEventListener("resize",()=>posicionCartas(0, cartas.length));
});


