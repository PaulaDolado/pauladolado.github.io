// Fondo animado de la portada: cuadraditos en tonos arena que aparecen,
// flotan y se desvanecen. Al pasar el ratón cerca se apartan y vuelven a
// su sitio con un muelle (resorte con amortiguación), así que el
// movimiento rebota un poco en vez de ser lineal.
//
// Se dibuja en un <canvas> detrás del contenido de .intro. Solo se anima
// mientras la portada está a la vista; con "reducir movimiento" activado
// se dibuja una vez, quieto.
(function () {
    const seccion = document.querySelector('.intro');
    if (!seccion) return;

    const AJUSTES = {
        densidad: 0.00011,        // píxeles por px² de pantalla
        minimo: 40,
        maximo: 200,
        tamano: [6, 18],          // lado del cuadrado, en px (antes de escalar)
        opacidad: [0.35, 0.8],
        aparicion: [0.6, 1.4],    // segundos en aparecer
        vida: [2.5, 7],           // segundos visible antes de desvanecerse
        desaparicion: [0.9, 2],   // segundos en desvanecerse
        deriva: 26,               // amplitud del vaivén, en px
        frecuencia: [0.12, 0.4],  // vueltas por segundo del vaivén
        radioRaton: 190,          // px alrededor del ratón que se apartan
        empujeRaton: 70,          // desplazamiento máximo, en px
        rigidez: 90,              // muelle: cuánto tira hacia su sitio
        amortiguacion: 11         // muelle: cuánto frena el rebote
    };

    // Tonos de la paleta arena, del más claro al más tostado, y alguno
    // granate muy suave para que no quede plano
    const COLORES = [
        '#e6d6bd', '#dfcbad', '#d8c09f', '#d0b491',
        '#c8a983', '#bf9d76', '#b5906a', '#aa845f'
    ];
    const COLOR_ACENTO = '#9c3a45';

    const azar = (min, max) => Math.random() * (max - min) + min;
    const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');

    const canvas = document.createElement('canvas');
    canvas.className = 'fondo-pixeles';
    canvas.setAttribute('aria-hidden', 'true');
    seccion.prepend(canvas);
    const ctx = canvas.getContext('2d');

    let ancho = 0;
    let alto = 0;
    let escala = 1;
    let pixeles = [];
    let raton = { x: -9999, y: -9999, activo: false };
    let visible = true;
    let animando = false;
    let ultimo = 0;

    // Cuadrados algo mayores en pantallas grandes, como en el original
    function factorTamano(w) {
        if (w < 480) return 0.75;
        if (w < 768) return 0.9;
        if (w < 1024) return 1;
        if (w < 1440) return 1.15;
        return 1.4;
    }

    function nuevoPixel(enCurso) {
        const acento = Math.random() < 0.06;
        const p = {
            // Posición base sobre una rejilla de 4 px, para que no se vean borrosos
            x: Math.round(azar(0, ancho) / 4) * 4,
            y: Math.round(azar(0, alto) / 4) * 4,
            lado: Math.round(azar(AJUSTES.tamano[0], AJUSTES.tamano[1]) * escala),
            color: acento ? COLOR_ACENTO : COLORES[Math.floor(Math.random() * COLORES.length)],
            opacidadMax: acento ? azar(0.12, 0.25) : azar(AJUSTES.opacidad[0], AJUSTES.opacidad[1]),
            // Ciclo de vida: aparece, se queda y se desvanece
            fase: 0,
            t: 0,
            tAparicion: azar(AJUSTES.aparicion[0], AJUSTES.aparicion[1]),
            tVida: azar(AJUSTES.vida[0], AJUSTES.vida[1]),
            tDesaparicion: azar(AJUSTES.desaparicion[0], AJUSTES.desaparicion[1]),
            // Vaivén suave: cada uno con su ritmo y dirección
            frecX: azar(AJUSTES.frecuencia[0], AJUSTES.frecuencia[1]),
            frecY: azar(AJUSTES.frecuencia[0], AJUSTES.frecuencia[1]),
            desfase: azar(0, Math.PI * 2),
            amplitud: AJUSTES.deriva * azar(0.4, 1),
            // Muelle: desplazamiento actual y su velocidad
            dx: 0, dy: 0, vx: 0, vy: 0
        };
        // Al arrancar, repartidos en distintos momentos de su vida para
        // que no aparezcan todos a la vez
        if (enCurso) {
            p.fase = Math.floor(Math.random() * 3);
            p.t = azar(0, [p.tAparicion, p.tVida, p.tDesaparicion][p.fase]);
        }
        return p;
    }

    function dimensionar() {
        const rect = seccion.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const nuevoAncho = Math.round(rect.width);
        const nuevoAlto = Math.round(rect.height);
        if (nuevoAncho === ancho && nuevoAlto === alto) return;

        ancho = nuevoAncho;
        alto = nuevoAlto;
        escala = factorTamano(window.innerWidth);
        canvas.width = Math.round(ancho * dpr);
        canvas.height = Math.round(alto * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const total = Math.max(AJUSTES.minimo,
            Math.min(AJUSTES.maximo, Math.round(ancho * alto * AJUSTES.densidad)));
        pixeles = Array.from({ length: total }, () => nuevoPixel(true));
        if (!animando) dibujar(0, 0);
    }

    function opacidadDe(p) {
        if (p.fase === 0) {
            const k = p.t / p.tAparicion;
            return p.opacidadMax * (1 - Math.pow(1 - k, 3)); // entrada suave
        }
        if (p.fase === 1) return p.opacidadMax;
        const k = p.t / p.tDesaparicion;
        return p.opacidadMax * (1 - k * k);
    }

    function dibujar(dt, tiempo) {
        ctx.clearRect(0, 0, ancho, alto);
        const radio = AJUSTES.radioRaton;

        for (let i = 0; i < pixeles.length; i++) {
            let p = pixeles[i];

            if (dt > 0) {
                // Ciclo de vida
                p.t += dt;
                const duracion = [p.tAparicion, p.tVida, p.tDesaparicion][p.fase];
                if (p.t >= duracion) {
                    p.t -= duracion;
                    p.fase++;
                    if (p.fase > 2) {
                        p = pixeles[i] = nuevoPixel(false);
                    }
                }

                // Hacia dónde tira el muelle: el vaivén más el empuje del ratón
                let objetivoX = Math.sin(tiempo * p.frecX * Math.PI * 2 + p.desfase) * p.amplitud;
                let objetivoY = Math.cos(tiempo * p.frecY * Math.PI * 2 + p.desfase) * p.amplitud;

                if (raton.activo) {
                    const cx = p.x + p.dx - raton.x;
                    const cy = p.y + p.dy - raton.y;
                    const distancia = Math.hypot(cx, cy);
                    if (distancia < radio && distancia > 0.01) {
                        const fuerza = 1 - distancia / radio;
                        const empuje = AJUSTES.empujeRaton * fuerza * fuerza;
                        objetivoX += (cx / distancia) * empuje;
                        objetivoY += (cy / distancia) * empuje;
                    }
                }

                // Muelle amortiguado: a = k·(objetivo − x) − c·v
                const ax = AJUSTES.rigidez * (objetivoX - p.dx) - AJUSTES.amortiguacion * p.vx;
                const ay = AJUSTES.rigidez * (objetivoY - p.dy) - AJUSTES.amortiguacion * p.vy;
                p.vx += ax * dt;
                p.vy += ay * dt;
                p.dx += p.vx * dt;
                p.dy += p.vy * dt;
            }

            const opacidad = dt > 0 || animando ? opacidadDe(p) : p.opacidadMax;
            if (opacidad <= 0.005) continue;
            ctx.globalAlpha = opacidad;
            ctx.fillStyle = p.color;
            const mitad = p.lado / 2;
            ctx.fillRect(Math.round(p.x + p.dx - mitad), Math.round(p.y + p.dy - mitad), p.lado, p.lado);
        }
        ctx.globalAlpha = 1;
    }

    function fotograma(ahora) {
        if (!animando) return;
        // Pasos limitados para que al volver a la pestaña no dé un salto
        const dt = ultimo ? Math.min((ahora - ultimo) / 1000, 1 / 30) : 0;
        ultimo = ahora;
        dibujar(dt, ahora / 1000);
        requestAnimationFrame(fotograma);
    }

    function arrancar() {
        if (animando || !visible || reducirMovimiento.matches || document.hidden) return;
        animando = true;
        ultimo = 0;
        requestAnimationFrame(fotograma);
    }

    function parar() {
        animando = false;
    }

    // Ratón: coordenadas relativas a la portada
    window.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch') return;
        const rect = canvas.getBoundingClientRect();
        raton.x = e.clientX - rect.left;
        raton.y = e.clientY - rect.top;
        raton.activo = raton.y > -AJUSTES.radioRaton && raton.y < alto + AJUSTES.radioRaton;
    }, { passive: true });
    document.addEventListener('pointerleave', () => { raton.activo = false; });
    window.addEventListener('blur', () => { raton.activo = false; });

    // Solo se anima mientras la portada se ve
    if ('IntersectionObserver' in window) {
        new IntersectionObserver((entradas) => {
            visible = entradas[0].isIntersecting;
            visible ? arrancar() : parar();
        }).observe(seccion);
    }
    document.addEventListener('visibilitychange', () => {
        document.hidden ? parar() : arrancar();
    });
    reducirMovimiento.addEventListener('change', () => {
        if (reducirMovimiento.matches) {
            parar();
            dibujar(0, 0);
        } else {
            arrancar();
        }
    });

    if ('ResizeObserver' in window) {
        new ResizeObserver(dimensionar).observe(seccion);
    } else {
        window.addEventListener('resize', dimensionar);
    }

    dimensionar();
    arrancar();
    requestAnimationFrame(() => canvas.classList.add('fondo-pixeles--visible'));
})();
