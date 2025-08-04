gsap.registerPlugin(SplitText);

// Dividir texto en letras
let split = SplitText.create(".text",{type:"chars"});

// Animar cada letra desde abajo hacia arriba
gsap.from(split.words,{
    y: 100,
  autoAlpha: 0,
  stagger: 0.05,
  ease: "power2.out"
})

