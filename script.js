gsap.registerPlugin(SplitText);

// Dividir texto en letras y palabras
const text = document.querySelector(".text");
const subtext = document.querySelector(".subtext");
const subtext2 = document.querySelector(".subtext2");
const splitText=new SplitText(text, {type: "chars"})
const splitSubText=new SplitText(subtext, {type: "words"})
const splitSubText2=new SplitText(subtext2, {type: "words"})

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

const button= document.createElement('button');
button.type="button";
button.innerText="Ver Proyectos";
document.body.appendChild(button);

