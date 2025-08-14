//Animacion Seción proyectos
document.addEventListener("DOMContentLoaded",()=>{
    gsap.registerPlugin(ScrollTrigger);
    const lenis= new Lenis();
    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((time)=>{lenis.raf(time*1000);});
    gsap.ticker.lagSmoothing(0);

    const stickySection= document.querySelector(".proyectos");
    const stickyHeight= window.innerHeight * 7;
    const cartas= document.querySelectorAll(".carta");
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
            const procesoNorm = (totalcartas -1 -i)/totalcartas;
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
