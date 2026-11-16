'use strict';
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
menu.addEventListener('click', () => {
 const open = menu.getAttribute('aria-expanded') !== 'true';
 menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if(e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
document.addEventListener('click', e => { if(!e.target.closest('.header')) closeMenu(); });
window.matchMedia('(min-width: 801px)').addEventListener('change', e => { if(e.matches) closeMenu(); });
const filterButtons = document.querySelectorAll('[data-filter]');
filterButtons.forEach(button => button.addEventListener('click', () => {
 filterButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
 let count = 0;
 document.querySelectorAll('[data-category]').forEach(project => {
  const visible = button.dataset.filter === 'all' || project.dataset.category === button.dataset.filter;
  project.hidden = !visible; if(visible) count++;
 });
 document.querySelector('#filter-status').textContent = `${count} ${count === 1 ? 'projeto apresentado' : 'projetos apresentados'}`;
}));
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { document.querySelector('#service').value = link.dataset.service; }));
const emailAddress = 'comercial@sansadigital.com.br';
document.querySelector('.copy-email').addEventListener('click', async () => {
 const status = document.querySelector('.copy-status');
 try { await navigator.clipboard.writeText(emailAddress); status.textContent = 'E-mail copiado.'; }
 catch { status.textContent = 'Selecione o endereço acima para copiar.'; }
});
document.querySelector('#contact-form').addEventListener('submit', e => {
 e.preventDefault(); const data = new FormData(e.currentTarget);
 const subject = `Projeto SANSA — ${data.get('service')}`;
 const body = `Olá, SANSA!\n\nMeu nome é ${data.get('name')}.\nMeu e-mail: ${data.get('email')}\nInteresse: ${data.get('service')}\n\nSobre o projeto:\n${data.get('message')}`;
 const mailto = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 window.location.href = mailto;
 const status = document.querySelector('#form-status');
 status.textContent = 'Mensagem preparada. Se o aplicativo não abrir, copie a mensagem ou use o endereço ao lado.';
 let copy = document.querySelector('#copy-message');
 if(!copy) { copy = document.createElement('button'); copy.id = 'copy-message'; copy.type = 'button'; copy.className = 'copy-email'; copy.textContent = 'Copiar mensagem'; status.after(copy); }
 copy.onclick = async () => { try { await navigator.clipboard.writeText(`${subject}\n\n${body}`); status.textContent = 'Mensagem copiada. Cole no seu e-mail e envie para ' + emailAddress + '.'; } catch { status.textContent = 'Seu navegador não permitiu copiar. Use o endereço ao lado e o texto preenchido acima.'; } };
});
document.querySelector('#year').textContent = new Date().getFullYear();
