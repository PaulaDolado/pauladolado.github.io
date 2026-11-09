// Colorea los bloques de código de los posts (estilo editor) y numera
// las líneas. Se vuelve a aplicar al cambiar de idioma, porque idioma.js
// sustituye el texto del bloque.
(function () {
    const bloques = document.querySelectorAll('.post-editor code');
    if (!bloques.length) return;

    const RESERVADAS = new Set(['const', 'let', 'var', 'function', 'new', 'true', 'false', 'null', 'undefined']);
    const CONTROL = new Set(['return', 'try', 'catch', 'finally', 'for', 'if', 'else', 'while', 'throw']);

    // Comentario | cadena | variable PHP | número | identificador
    const TOKEN = /(\/\/.*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\$[A-Za-z_]\w*)|\b(\d+(?:\.\d+)?)\b|([A-Za-z_]\w*)/g;

    const escapar = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const span = (clase, s) => `<span class="tk-${clase}">${escapar(s)}</span>`;

    function colorearLinea(linea) {
        let html = '';
        let ultimo = 0;
        TOKEN.lastIndex = 0;
        let m;
        while ((m = TOKEN.exec(linea))) {
            html += escapar(linea.slice(ultimo, m.index));
            const [txt, comentario, cadena, variable, numero, id] = m;
            if (comentario) html += span('comentario', txt);
            else if (cadena) html += span('cadena', txt);
            else if (variable) html += span('variable', txt);
            else if (numero) html += span('numero', txt);
            else if (id) {
                const siguiente = linea.slice(TOKEN.lastIndex).match(/^\s*\(/);
                if (RESERVADAS.has(id)) html += span('reservada', txt);
                else if (CONTROL.has(id)) html += span('control', txt);
                else if (/^[A-Z][A-Z0-9_]+$/.test(id)) html += span('constante', txt);
                else if (siguiente) html += span('funcion', txt);
                else if (/^[A-Z]/.test(id)) html += span('tipo', txt);
                else html += span('variable', txt);
            }
            ultimo = TOKEN.lastIndex;
        }
        return html + escapar(linea.slice(ultimo));
    }

    function colorear(code) {
        code.innerHTML = code.textContent.split('\n')
            .map((l) => `<span class="linea">${colorearLinea(l)}</span>`)
            .join('');
    }

    bloques.forEach(colorear);
    document.addEventListener('idiomacambiado', () => bloques.forEach(colorear));
})();
