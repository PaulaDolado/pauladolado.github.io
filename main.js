gsap.registerPlugin(SplitText);

// Dividir texto en letras
const text = document.querySelector(".text");
const splitText=new SplitText(text, {type: "chars"})

// Animar cada letra desde abajo hacia arriba
const tl=gsap.timeline();
tl.from(splitText.chars,{
    y:100,
    ratationX:90,
    opacity:0,
    color:"#FFFFFF",
    stagger:0.05,
    duration:0.03,
    transformOrigin:"center top",
    perspective:700,
}).to(splitText.chars,{
    color:"#6c5ce7",
    duration:0.03,
    stagger:0.05,
    ease:"power2.out",
});

