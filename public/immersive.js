/* SANSA editorial experience: no external dependencies, motion is optional. */
(()=>{'use strict';
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
document.body.classList.add('sansa-experience');
const hero=document.querySelector('.hero');
if(hero){const cue=document.createElement('span');cue.className='sansa-scroll-cue';cue.setAttribute('aria-hidden','true');cue.textContent='Role para explorar';hero.append(cue);}
const selectors=['.about .about-main','.services .section-heading','.service','.work .section-heading','.project','.process .section-heading','.process-grid li','.contact-grid'];
const nodes=selectors.flatMap(s=>Array.from(document.querySelectorAll(s)));
if(!reduced.matches && 'IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}},{threshold:.08,rootMargin:'0px 0px -25px 0px'});
 nodes.forEach(n=>{n.setAttribute('data-sansa-reveal','');observer.observe(n)});
}else{nodes.forEach(n=>{n.setAttribute('data-sansa-reveal','');n.classList.add('is-visible')});}
if(!reduced.matches && hero){
 let scheduled=false;
 const update=()=>{const rect=hero.getBoundingClientRect();const travel=Math.max(0,-rect.top);const progress=Math.min(1,travel/Math.max(1,rect.height));hero.style.setProperty('--sansa-scroll',Math.min(500,travel)+'px');hero.style.setProperty('--sansa-progress',progress);scheduled=false;};
 const onScroll=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}};
 window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll,{passive:true});update();
}
})();
