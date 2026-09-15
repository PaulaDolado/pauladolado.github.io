//Animacion Seción proyectos
const lenis= new Lenis();

document.addEventListener("DOMContentLoaded",()=>{
    gsap.registerPlugin(ScrollTrigger);
    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((time)=>{lenis.raf(time*1000);});
    gsap.ticker.lagSmoothing(0);

    const stickySection= document.querySelector(".proyecto");
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
        // procesoActual se calcula para que la primera carta quede centrada
        // (visible) justo al entrar en la sección (progress=0) y la última
        // quede centrada al terminar el recorrido (progress=1), en vez de
        // arrancar con todo el carrusel fuera de pantalla.
        const procesoActual = progress * (totalcartas - 1) / totalcartas + (1 / totalcartas - 0.5);

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
    // Distancia (px) entre un número y el siguiente dentro del contador.
    // Antes iba fija a 150, pero eso solo coincide con el font-size:150px
    // de escritorio: en los breakpoints donde se reduce el tamaño de letra
    // (móvil, portátiles de poca altura) el paso real es menor y el
    // contador terminaba mostrando dos números a la vez. Se mide en cada
    // momento la altura real de un dígito.
    const getPasoContador= ()=>{
        const primerNumero= ContenedorContador.querySelector('h1');
        return primerNumero ? primerNumero.getBoundingClientRect().height : 150;
    };
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
                const pasoContador= getPasoContador();
                const targetY= pasoContador - IndexAct * pasoContador;
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
