// Cambio de idioma ES / EN sin recargar la página.
//
// El español es el texto que ya está en el HTML; el inglés está en
// ScriptsJS/traducciones.js (window.TRADUCCIONES_EN). Al arrancar se
// guarda el español original de cada elemento marcado, así que volver a
// español solo es restaurarlo.
//
// Marcado en el HTML:
//   data-i18n="clave"                 → cambia el texto del elemento
//   data-i18n-html="clave"            → cambia su HTML (para textos con <strong>)
//   data-i18n-attr="attr:clave;..."   → cambia atributos (placeholder, aria-label…)
//   data-idioma-toggle                → botón ES / EN
//
// Los textos que ponen otros scripts (formulario, terminal de
// habilidades, ficha de proyecto…) usan window.i18n.t(clave, español) y
// escuchan el evento "idiomacambiado" para actualizarse.
//
// Este script debe cargarse antes que los demás (justo después de
// traducciones.js) para que la página arranque ya en el idioma guardado.
(function () {
    const EN = window.TRADUCCIONES_EN || {};
    const CLAVE_GUARDADA = 'idioma';

    // Español original de cada elemento: { texto, html, attrs: { attr: valor } }
    const originales = new Map();

    function original(el) {
        if (!originales.has(el)) originales.set(el, { attrs: {} });
        return originales.get(el);
    }

    // "placeholder:form.nombre;aria-label:x" → [['placeholder','form.nombre'], ['aria-label','x']]
    function paresAtributos(el) {
        return el.dataset.i18nAttr.split(';')
            .map((par) => par.split(':').map((s) => s.trim()))
            .filter(([attr, clave]) => attr && clave);
    }

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        original(el).texto = el.textContent;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        original(el).html = el.innerHTML;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
        paresAtributos(el).forEach(([attr]) => {
            original(el).attrs[attr] = el.getAttribute(attr);
        });
    });

    let idioma = 'es';

    const traducir = (clave, espanol) =>
        (idioma === 'en' && Object.prototype.hasOwnProperty.call(EN, clave)) ? EN[clave] : espanol;

    function aplicar(nuevo) {
        idioma = nuevo === 'en' ? 'en' : 'es';
        document.documentElement.lang = idioma;

        document.querySelectorAll('[data-i18n]').forEach((el) => {
            el.textContent = traducir(el.dataset.i18n, original(el).texto);
        });
        document.querySelectorAll('[data-i18n-html]').forEach((el) => {
            el.innerHTML = traducir(el.dataset.i18nHtml, original(el).html);
        });
        document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
            paresAtributos(el).forEach(([attr, clave]) => {
                const valor = traducir(clave, original(el).attrs[attr]);
                if (valor != null) el.setAttribute(attr, valor);
            });
        });

        document.dispatchEvent(new CustomEvent('idiomacambiado', { detail: { idioma } }));
    }

    function cambiar(nuevo) {
        aplicar(nuevo);
        // Preferencia del visitante: si el navegador no deja guardar
        // (modo privado, almacenamiento bloqueado) simplemente no se recuerda.
        try { localStorage.setItem(CLAVE_GUARDADA, idioma); } catch (e) { /* sin persistencia */ }
    }

    window.i18n = {
        idioma: () => idioma,
        t: traducir,
        cambiar
    };

    document.querySelectorAll('[data-idioma-toggle]').forEach((boton) => {
        boton.addEventListener('click', () => cambiar(idioma === 'es' ? 'en' : 'es'));
    });

    let guardado = null;
    try { guardado = localStorage.getItem(CLAVE_GUARDADA); } catch (e) { /* sin persistencia */ }
    if (guardado === 'en') aplicar('en');
}());
