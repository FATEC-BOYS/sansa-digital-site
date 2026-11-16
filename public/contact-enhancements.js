/* SANSA contact enhancement: optional progressive enhancement, no third-party dependencies. */
(() => {
  'use strict';
  const EMAIL = 'comercial@sansadigital.com.br';
  const WHATSAPP = '5511950292652';
  const TARGET = '#contato';
  function makeLink(label, href, external = false) {
    const a = document.createElement('a');
    a.textContent = label;
    a.href = href;
    if (external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    return a;
  }
  function setup() {
    const section = document.querySelector(TARGET);
    if (!section) return;
    const form = section.querySelector('form');
    const anchor = form || section;
    if (!section.querySelector('.sansa-contact-options')) {
      const options = document.createElement('div');
      options.className = 'sansa-contact-options';
      options.setAttribute('aria-label', 'Outras formas de contato');
      options.append(
        makeLink('Enviar e-mail', 'mailto:' + EMAIL),
        makeLink('Conversar pelo WhatsApp', 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent('Olá! Conheci a SANSA pelo site e gostaria de conversar sobre um projeto.'), true)
      );
      anchor.insertAdjacentElement('afterend', options);
    }
    if (!document.querySelector('.sansa-contact-fab')) {
      const floating = makeLink('✉ Fale com a SANSA', TARGET);
      floating.className = 'sansa-contact-fab';
      floating.setAttribute('aria-label', 'Abrir formulário de contato da SANSA');
      document.body.appendChild(floating);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once: true });
  else setup();
})();
