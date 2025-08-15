document.addEventListener("DOMContentLoaded",()=>{
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time)=>{lenis.raf(time*1000);});
    gsap.ticker.lagSmoothing(0);

    const dispositivas = gsap.utils.toArray(".diapositiva");
    const introDispo= dispositivas[0];

    const titulos=gsap.utils.toArray(".diapositiva-titulo");
    titulos.forEach((titulo)=>{
        const split = new SplitText(titulo,{
            type: "char",
            charsClass: "char",
            tag: "div",
        });
        split.chars.forEach((char)=>{
            char.innerHTML = `<span>${char.textContent}</span>`;
        });
    });
    const dispoImgWrapper = introDispo.querySelector(".diapositiva-img");
    const dispoImg = introDispo.querySelector(".diapositiva-img img");
    gsap.set(dispoImgWrapper,{scale:0.5, borderRadius:"150px"});
    gsap.set(dispoImg,{scale:1.5});

    function animacionContenidoIn(tituloChars, descripcion){
        gsap.to(tituloChars,{x:"0%", duration:0.75,ease:"power4.out"});
        gsap.to(descripcion,{
            x: 0,
            opacity: 1,
            duration:0.75,
            delay: 0.1,
            ease: "power4.out",
    });
    }
    function animacionContenidoOut(tituloChars, descripcion){
        gsap.to(tituloChars,{x:"100%", duration:0.5,ease:"power4.out"});
        gsap.to(descripcion,{
            x: "40px",
            opacity: 0,
            duration:0.5,
            ease: "power4.out",
    });
    }
    const marca=introDispo.querySelector(".diapositiva-marca .marca");
    const tituloChars=introDispo.querySelector(".char span");
    const descripcion=introDispo.querySelector(".diapositiva-descripcion");

    ScrollTrigger.create({
        trigger: introDispo,
        start:"top top",
        end:"+=300vh",
        onUpdate: (self)=>{
            const progress = self.progress;
            const imgScale= 0.5 + progress * 0.5;
            const borderRadius = 150 - progress*175;
            const innerImgScale = 1.5 - progress*0.5;
            
            gsap.set(dispoImgWrapper,{
                scale: imgScale,
                borderRadius: borderRadius + "px",
            });
            gsap.set(dispoImg,{scale: innerImgScale});

            if (imgScale>=0.5 && imgScale<=0.75){
                const fadeProgress = (imgScale - 0.5)/(0.75-0.5);
                gsap.set(marca,{opacity:1 - fadeProgress});
            }else if(imgScale<0.5){
                gsap.set(marca,{opacity:1});
            }else if(imgScale>0.75){
                gsap.set(marca,{opacity:0});
            }
            
            if(progress>=1 && !introDispo.contentRevealed){
                introDispo.contentRevealed=true;
                animacionContenidoIn(tituloChars,descripcion);
            }
            if(progress<1 && introDispo.contentRevealed){
                introDispo.contentRevealed=false;
                animacionContenidoOut(tituloChars,descripcion);
            }
        },
    });
    dispositivas.forEach((dispositiva, index)=>{
        const ultima = index== dispositivas.length-1;
        ScrollTrigger.create({
            trigger: dispositiva,
            start: "top top",
            end: ultima ?"+=100vh":"top top",
            endTrigger: ultima?null: dispositivas[dispositivas.length-1],
            pin: true,
            pinSpacing: ultima,
        });
    });
});
