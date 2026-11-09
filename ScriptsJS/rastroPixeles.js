// Fondo de Otros posts: rastro de cuadraditos al mover el ratón e iconos
// pixelados que aparecen y se desvanecen. La cuadrícula está en posts.css.
(function () {
    const AJUSTES = {
        // Rastro del ratón
        tamano: [4, 14],            // lado de cada cuadradito, en px
        velocidad: [24, 80],        // px por segundo al salir disparado
        vida: [0.7, 1.3],           // segundos hasta apagarse
        porRafaga: [3, 6],          // cuadraditos por ráfaga
        distanciaRafaga: 26,        // px que hay que mover el ratón entre ráfagas
        rejilla: 6,                 // se alinean a esta rejilla para verse pixelados
        opacidad: [0.35, 0.7],
        // Iconos
        intervaloIcono: [1400, 3000], // ms entre un icono y el siguiente
        maxIconos: 3,
        pixelIcono: 6,              // px de cada "píxel" del icono
        vidaIcono: [3.5, 5.5],      // segundos visibles en total
        entradaIcono: 0.6,          // segundos en aparecer
        salidaIcono: 0.9,           // segundos en desaparecer
        opacidadIcono: 0.32
    };

    const COLORES = ['#c8a983', '#bf9d76', '#b5906a', '#aa845f', '#d0b491', '#9c3a45'];

    // Cada '#' es un píxel
    const ICONOS = [
        { color: '#c98a8f', filas: [ // corazón
            '..####...####..',
            '.#....#.#....#.',
            '#......#......#',
            '#.............#',
            '#.............#',
            '.#...........#.',
            '..#.........#..',
            '...#.......#...',
            '....#.....#....',
            '.....#...#.....',
            '......#.#......',
            '.......#.......'
        ] },
        { color: '#b5906a', filas: [ // cara sonriente
            '....#####....',
            '..##.....##..',
            '.#.........#.',
            '.#..#...#..#.',
            '#...#...#...#',
            '#...........#',
            '#...........#',
            '#..#.....#..#',
            '#...#...#...#',
            '.#...###...#.',
            '.#.........#.',
            '..##.....##..',
            '....#####....'
        ] },
        { color: '#9c3a45', filas: [ // </>
            '....#......#..#....',
            '...#.......#...#...',
            '..#.......#.....#..',
            '.#........#......#.',
            '#........#........#',
            '.#.......#.......#.',
            '..#.....#.......#..',
            '...#....#......#...',
            '....#..#......#....'
        ] },
        { color: '#c08552', filas: [ // rayo
            '.....###',
            '....###.',
            '...###..',
            '..###...',
            '.#######',
            '#######.',
            '...###..',
            '..###...',
            '.###....',
            '.##.....',
            '#.......'
        ] },
        { color: '#8a6a50', filas: [ // documento
            '#######...',
            '#.....##..',
            '#.....#.#.',
            '#.....####',
            '#........#',
            '#.######.#',
            '#........#',
            '#.######.#',
            '#........#',
            '#.####...#',
            '#........#',
            '##########'
        ] },
        { color: '#a88c6c', filas: [ // portátil
            '..############..',
            '..#..........#..',
            '..#..........#..',
            '..#..........#..',
            '..#..........#..',
            '..#..........#..',
            '..############..',
            '.#............#.',
            '#..............#',
            '################'
        ] },
        { color: '#c08552', filas: [ // bombilla
            '...#####...',
            '..#.....#..',
            '.#.......#.',
            '#.........#',
            '#.........#',
            '#.........#',
            '.#.......#.',
            '..#.....#..',
            '...#...#...',
            '...#####...',
            '....###....'
        ] },
        { color: '#b8664a', filas: [ // sobre
            '##############',
            '##..........##',
            '#.#........#.#',
            '#..#......#..#',
            '#...#....#...#',
            '#....####....#',
            '#............#',
            '#............#',
            '##############'
        ] }
    ];

    const azar = (min, max) => Math.random() * (max - min) + min;
    const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');

    const canvas = document.createElement('canvas');
    canvas.className = 'fondo-rastro';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    let ancho = 0;
    let alto = 0;
    let particulas = [];
    let iconos = [];
    let ultimaRafaga = null;
    let animando = false;
    let ultimo = 0;
    let temporizadorIcono = null;

    function dimensionar() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        ancho = window.innerWidth;
        alto = window.innerHeight;
        canvas.width = Math.round(ancho * dpr);
        canvas.height = Math.round(alto * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // --- Rastro del ratón ---
    function rafaga(x, y) {
        const total = Math.round(azar(AJUSTES.porRafaga[0], AJUSTES.porRafaga[1]));
        for (let i = 0; i < total; i++) {
            const angulo = azar(0, Math.PI * 2);
            const velocidad = azar(AJUSTES.velocidad[0], AJUSTES.velocidad[1]);
            const vida = azar(AJUSTES.vida[0], AJUSTES.vida[1]);
            particulas.push({
                x: x + azar(-8, 8),
                y: y + azar(-8, 8),
                vx: Math.cos(angulo) * velocidad,
                vy: Math.sin(angulo) * velocidad,
                lado: Math.round(azar(AJUSTES.tamano[0], AJUSTES.tamano[1]) / 2) * 2,
                color: COLORES[Math.floor(Math.random() * COLORES.length)],
                opacidad: azar(AJUSTES.opacidad[0], AJUSTES.opacidad[1]),
                vida,
                edad: 0
            });
        }
        arrancar();
    }

    window.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch' || reducirMovimiento.matches) return;
        if (!ultimaRafaga) {
            ultimaRafaga = { x: e.clientX, y: e.clientY };
            return;
        }
        const distancia = Math.hypot(e.clientX - ultimaRafaga.x, e.clientY - ultimaRafaga.y);
        if (distancia >= AJUSTES.distanciaRafaga) {
            ultimaRafaga = { x: e.clientX, y: e.clientY };
            rafaga(e.clientX, e.clientY);
        }
    }, { passive: true });
    document.addEventListener('pointerleave', () => { ultimaRafaga = null; });

    // --- Iconos ---
    function nuevoIcono() {
        if (iconos.length >= AJUSTES.maxIconos) return;
        const icono = ICONOS[Math.floor(Math.random() * ICONOS.length)];
        const pixel = ancho < 640 ? Math.round(AJUSTES.pixelIcono * 0.7) : AJUSTES.pixelIcono;
        const w = icono.filas[0].length * pixel;
        const h = icono.filas.length * pixel;
        const margen = 24;

        // Sin pisar a los que ya hay
        for (let intento = 0; intento < 12; intento++) {
            const x = Math.round(azar(margen, Math.max(margen, ancho - w - margen)) / pixel) * pixel;
            const y = Math.round(azar(80, Math.max(80, alto - h - margen)) / pixel) * pixel;
            const pisa = iconos.some((o) =>
                x < o.x + o.w + 40 && x + w + 40 > o.x && y < o.y + o.h + 40 && y + h + 40 > o.y);
            if (!pisa) {
                iconos.push({ icono, x, y, w, h, pixel, edad: 0,
                    vida: azar(AJUSTES.vidaIcono[0], AJUSTES.vidaIcono[1]) });
                arrancar();
                return;
            }
        }
    }

    function programarIcono() {
        clearTimeout(temporizadorIcono);
        if (document.hidden || reducirMovimiento.matches) return;
        temporizadorIcono = setTimeout(() => {
            nuevoIcono();
            programarIcono();
        }, azar(AJUSTES.intervaloIcono[0], AJUSTES.intervaloIcono[1]));
    }

    function opacidadIcono(o) {
        let k = 1;
        if (o.edad < AJUSTES.entradaIcono) k = o.edad / AJUSTES.entradaIcono;
        else if (o.edad > o.vida - AJUSTES.salidaIcono) k = (o.vida - o.edad) / AJUSTES.salidaIcono;
        return AJUSTES.opacidadIcono * Math.max(0, Math.min(1, k));
    }

    // --- Bucle de dibujo ---
    function fotograma(ahora) {
        const dt = ultimo ? Math.min((ahora - ultimo) / 1000, 1 / 30) : 0;
        ultimo = ahora;
        ctx.clearRect(0, 0, ancho, alto);

        iconos = iconos.filter((o) => (o.edad += dt) < o.vida);
        for (const o of iconos) {
            ctx.globalAlpha = opacidadIcono(o);
            ctx.fillStyle = o.icono.color;
            o.icono.filas.forEach((fila, f) => {
                for (let c = 0; c < fila.length; c++) {
                    if (fila[c] === '#') ctx.fillRect(o.x + c * o.pixel, o.y + f * o.pixel, o.pixel, o.pixel);
                }
            });
        }

        const r = AJUSTES.rejilla;
        particulas = particulas.filter((p) => (p.edad += dt) < p.vida);
        for (const p of particulas) {
            p.vx *= 1 - 1.6 * dt;
            p.vy *= 1 - 1.6 * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            const k = 1 - p.edad / p.vida;
            const lado = Math.max(2, Math.round(p.lado * (0.5 + 0.5 * k)));
            ctx.globalAlpha = p.opacidad * k * k;
            ctx.fillStyle = p.color;
            ctx.fillRect(Math.round(p.x / r) * r - lado / 2, Math.round(p.y / r) * r - lado / 2, lado, lado);
        }
        ctx.globalAlpha = 1;

        if (particulas.length || iconos.length) {
            requestAnimationFrame(fotograma);
        } else {
            animando = false;
            ultimo = 0;
        }
    }

    function arrancar() {
        if (animando || document.hidden) return;
        animando = true;
        ultimo = 0;
        requestAnimationFrame(fotograma);
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearTimeout(temporizadorIcono);
        } else {
            programarIcono();
            arrancar();
        }
    });
    reducirMovimiento.addEventListener('change', () => {
        if (reducirMovimiento.matches) {
            clearTimeout(temporizadorIcono);
            particulas = [];
            iconos = [];
        } else {
            programarIcono();
        }
    });
    window.addEventListener('resize', dimensionar);

    dimensionar();
    if (!reducirMovimiento.matches) {
        setTimeout(nuevoIcono, 700);
        programarIcono();
    }
})();
