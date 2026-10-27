/* MotoLogix Ultra Max 7 interactive website – 27 Oct 2026.
   No external JavaScript dependencies or builder branding. */
(() => {
'use strict';
const routeNames = {'/':'Home','/about':'About','/services':'Services','/gallery':'Gallery','/faq':'FAQ','/testimonials':'Testimonials','/contact':'Contact'};
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (selector,root=document) => root.querySelector(selector);
const $$ = (selector,root=document) => [...root.querySelectorAll(selector)];
const main = $('main');
const saved = {home:main.innerHTML};
['home','services','about','approach','insights','contact'].forEach(id=>{
 const el=document.getElementById(id);
 if(el)saved[id]=el.outerHTML;
});
const ribbon=$('.ribbon');saved.ribbon=ribbon?ribbon.outerHTML:'';
const ticker=$('.ticker');saved.ticker=ticker?ticker.outerHTML:'';
let stopSlider=()=>{};
const content={
 about:{heading:'About MotoLogix',kicker:'Who we are',intro:"We specialise in the motorbike delivery and last-mile industry, combining insight, operational thinking and market development.",parts:['about','approach']},
 services:{heading:'Our areas of expertise',kicker:'What we do',intro:'Research, fleets, skills, market growth, new mobility and industry advisory—connected for a stronger last-mile economy.',parts:['services','approach']},
 gallery:{heading:'The industry in focus',kicker:'MotoLogix gallery',intro:'A visual look at mobility, people, operations and the opportunities reshaping last-mile services.',parts:['insights']},
 contact:{heading:"Let's move forward",kicker:'Talk to MotoLogix',intro:'Tell us about your fleet, research, market, mobility or industry advisory requirements.',parts:['contact']}
};
const faqData=[
 ['What does MotoLogix specialise in?','MotoLogix focuses on the motorbike delivery and last-mile sector, including industry intelligence, fleet development, skills, market development, mobility and policy advisory.'],
 ['Do you work with organisations and individual operators?','Our areas of expertise can be relevant to businesses, sector stakeholders, fleet operators and development initiatives. Contact us with your needs so we can discuss their fit.'],
 ['Can MotoLogix assist with delivery fleet operations?','Fleet development and management is one of our core focus areas. Tell us about your fleet, goals and challenges to discuss appropriate advisory support.'],
 ['Do you provide training for motorbike delivery riders?','Skills development, training, upskilling and professionalisation are central to our service offering. Contact us to discuss your training requirements and available arrangements.'],
 ['Can you assist with entering township delivery markets?','Market development—including township markets, market entry and expansion—is one of our areas of expertise. We can discuss your objectives and the relevant market context.'],
 ['Do you advise on electric motorcycles and sustainable mobility?','Our mobility development focus includes electric transition, sustainability and future mobility. Please describe your fleet or project to explore the right starting point.'],
 ['Can I get a quotation?','Yes. Use the enquiry form, email info@motologix.co.za, call +27 66 125 3754 or send a WhatsApp message with your requirements.']
];
const escapeHtml=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function pageHero(name,meta){
 return '<section class="pageHero"><div class="container"><span class="eyebrow">'+escapeHtml(meta.kicker)+'</span>'+
 '<h1 class="pageHeading">'+escapeHtml(meta.heading)+'</h1><p>'+escapeHtml(meta.intro)+'</p>'+
 '<div class="breadcrumb"><a href="/">Home</a> / '+escapeHtml(name)+'</div></div></section>';
}
function faqPage(){
 const faqs=faqData.map(([q,a])=>'<details class="faqitem reveal"><summary>'+escapeHtml(q)+'</summary><p>'+escapeHtml(a)+'</p></details>').join('');
 return pageHero('FAQ',{heading:'Frequently asked questions',kicker:'What to know',intro:'Clear starting points about our work in the last-mile industry.'})+
 '<section class="section"><div class="container"><div class="sectionintro reveal"><span class="eyebrow">Helpful answers</span>'+
 '<h2>Answers to your questions.</h2><p class="lead">Still need more information? We would be glad to hear from you.</p></div>'+
 '<div class="faqgrid">'+faqs+'</div><p style="text-align:center;margin-top:35px"><a class="btn btn-green" href="/contact">Ask us directly ↗</a></p></div></section>'+saved.ribbon;
}
function testimonialsPage(){
 return pageHero('Testimonials',{heading:'Client feedback & stories',kicker:'Trust & relationships',intro:'Our clients’ voices matter. We only publish feedback with permission.'})+
 '<section class="section"><div class="container"><div class="noReviews reveal">'+
 '<div class="roundIcon" aria-hidden="true">✦</div><h2>Authentic voices. Real experiences.</h2>'+
 '<p class="lead">Approved client testimonials have not yet been supplied for publication. We will showcase genuine feedback here when it becomes available.</p>'+
 '<a href="/contact" class="btn btn-green">Speak to MotoLogix ↗</a></div></div></section>'+saved.ribbon;
}
function currentPath(){let p=window.location.pathname.replace(/\/+$/,'')||'/';if(p==='/index.html')p='/';return p;}
function render(path,scroll=true){
 stopSlider();
 let html=saved.home;
 const meta=content[path.slice(1)];
 if(path==='/faq')html=faqPage();
 else if(path==='/testimonials')html=testimonialsPage();
 else if(meta)html=pageHero(routeNames[path],meta)+meta.parts.map(id=>saved[id]||'').join('')+saved.ribbon;
 else if(path!=='/'){html=pageHero('Not found',{heading:'Page not found',kicker:'MotoLogix',intro:'We could not find the page you requested.'})+
 '<section class="section"><div class="container"><a href="/" class="btn btn-green">Return home ↗</a></div></section>';}
 main.innerHTML=html;
 // Homepage-only cross-links should not point from an inner page back to itself.
 if(path!=='/')main.querySelectorAll('.homeSectionFooter').forEach(el=>el.remove());
 const routeLabel=routeNames[path]||'Not Found';
 document.title=(path==='/'?'MotoLogix | Advisory & Development | South Africa':routeLabel+' | MotoLogix Advisory & Development');
 const canonical=$('link[rel="canonical"]');if(canonical)canonical.href='https://www.motologix.co.za'+(path==='/'?'':path);
 const description=$('meta[name="description"]');
 if(description&&meta)description.content=meta.intro;
 $$('#navlinks a, .mobileBottom a, .footer a').forEach(a=>{
    a.removeAttribute('aria-current');
    try{const u=new URL(a.href,location.href);if(u.pathname===path&&u.origin===location.origin)a.setAttribute('aria-current','page');}catch(e){}
 });
 const nav=$('#navlinks'),burger=$('#burger');
 if(nav&&burger){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.textContent='☰';}
 initRevealAndHeadings();initCards();initForm();initHero();
 if(scroll){if(location.hash){requestAnimationFrame(()=>{const id=location.hash.slice(1);if(document.getElementById(id))document.getElementById(id).scrollIntoView();else window.scrollTo(0,0);});}else window.scrollTo(0,0);}
}
function typeHeading(el){
 if(!el || reduced || el.dataset.v7typed)return;
 el.dataset.v7typed='yes';
 const text=el.textContent.replace(/\s+/g,' ').trim();
 if(!text)return;
 el.setAttribute('aria-label',text);
 const accent=el.querySelector('.accentline')||el.querySelector('span[style*="color"]');
 const accentWord=accent?accent.textContent.trim():'';
 const accentAt=accentWord?text.lastIndexOf(accentWord):-1;
 const accentStyle=accent?accent.getAttribute('style')||'':'';
 let i=0;
 function step(){
  if(!el.isConnected)return;
  const current=text.slice(0,i);
  el.replaceChildren();
  if(accentAt>=0&&current.length>accentAt){
   el.appendChild(document.createTextNode(current.slice(0,accentAt)));
   const s=document.createElement('span');s.className='accentline';if(accentStyle)s.setAttribute('style',accentStyle);
   s.textContent=current.slice(accentAt);el.appendChild(s);
  } else el.textContent=current;
  el.classList.add('v7-typing');
  if(i<text.length){i++;setTimeout(step,85)}else el.classList.remove('v7-typing');
 }
 step();
}
function initRevealAndHeadings(){
 const headings=$$('.hero h1,.pageHeading,.section h2');
 const reveals=$$('.reveal');
 const variations=['slide-up','slide-left','scale-in','slide-right','rotate-in','slide-up'];
 reveals.forEach((el,i)=>{
  el.classList.remove('slide-up','slide-left','slide-right','scale-in','rotate-in','image-wipe','seen');
  el.classList.add(variations[i%variations.length]);
  if(el.classList.contains('aboutimg')){el.classList.remove(variations[i%variations.length]);el.classList.add('image-wipe');}
 });
 if(reduced || !('IntersectionObserver'in window)){
  reveals.forEach(x=>x.classList.add('seen'));
  return;
 }
 document.documentElement.classList.add('v7-ready');
 const io=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   const el=entry.target;
   if(el.classList.contains('reveal'))el.classList.add('seen');
   if(el.matches('h1,h2'))typeHeading(el);
   io.unobserve(el);
  });
 },{threshold:.12,rootMargin:'0px 0px -14px 0px'});
 [...new Set([...reveals,...headings])].forEach(x=>io.observe(x));
}
function initCards(){
 $$('.flip').forEach(card=>{
  card.setAttribute('aria-pressed','false');
  card.addEventListener('click',()=>{
   const was=card.classList.contains('open');
   $$('.flip').forEach(c=>{c.classList.remove('open');c.setAttribute('aria-pressed','false');});
   if(!was){card.classList.add('open');card.setAttribute('aria-pressed','true');}
  });
 });
}
function initHero(){
 const hero=$('.hero');if(!hero)return;
 const slides=$$('.heroSlide',hero),dots=$$('.dot',hero),status=$('#slideNum'),progress=$('.heroProgress');
 let idx=0,interval=null;
 const stop=()=>{clearInterval(interval);interval=null;if(progress)progress.classList.remove('running');};
 function to(n){
  idx=(n+slides.length)%slides.length;
  slides.forEach((s,i)=>{s.classList.toggle('active',i===idx);s.setAttribute('aria-hidden',String(i!==idx));});
  dots.forEach((dot,i)=>{dot.classList.toggle('active',i===idx);dot.setAttribute('aria-pressed',String(i===idx));});
  if(status)status.textContent=String(idx+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
 }
 function start(){
  stop();
  if(reduced||document.hidden)return;
  if(progress){void progress.offsetWidth;progress.classList.add('running');}
  interval=setInterval(()=>{to(idx+1);start();},7200);
 }
 dots.forEach((dot,i)=>dot.addEventListener('click',()=>{to(i);start();}));
 const prev=$('#prevSlide'),next=$('#nextSlide');
 if(prev)prev.addEventListener('click',()=>{to(idx-1);start();});
 if(next)next.addEventListener('click',()=>{to(idx+1);start();});
 hero.addEventListener('mouseenter',stop);hero.addEventListener('mouseleave',start);
 hero.addEventListener('focusin',stop);
 hero.addEventListener('focusout',e=>{if(!hero.contains(e.relatedTarget))start();});
 const onVisibility=()=>document.hidden?stop():start();
 document.addEventListener('visibilitychange',onVisibility);
 stopSlider=()=>{stop();document.removeEventListener('visibilitychange',onVisibility);};
 to(0);start();
 const p=$('.heroP',hero);
 if(p&&!reduced){
   const words=p.textContent.trim().split(/\s+/);
   p.replaceChildren();
   words.forEach((word,i)=>{
    const el=document.createElement('span');
    el.className='v7-word';el.textContent=word+'\u00a0';el.style.animationDelay=(.75+i*.085)+'s';p.append(el);
   });
 }
}
function initForm(){
 const form=$('#leadform');if(!form)return;
 form.addEventListener('submit',e=>{
  e.preventDefault();
  if(!form.reportValidity())return;
  const f=new FormData(form);
  const msg='Hello MotoLogix, I would like to enquire.\n\n'+
   'Name: '+f.get('name')+'\nCompany: '+(f.get('company')||'N/A')+
   '\nEmail: '+f.get('email')+'\nPhone: '+(f.get('phone')||'N/A')+
   '\nService: '+f.get('service')+'\nMessage: '+f.get('message');
  window.open('https://wa.me/27661253754?text='+encodeURIComponent(msg),'_blank','noopener,noreferrer');
 });
}
function initNav(){
 const btn=$('#burger'),nav=$('#navlinks');
 if(btn&&nav)btn.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  btn.textContent=open?'✕':'☰';btn.setAttribute('aria-expanded',String(open));
 });
 document.addEventListener('click',e=>{
  const link=e.target.closest('a[href]');
  if(!link||e.defaultPrevented||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||link.target==='_blank'||e.button!==0)return;
  const u=new URL(link.href,location.href);
  if(u.origin!==location.origin||!routeNames[u.pathname])return;
  e.preventDefault();
  history.pushState(null,'',u.pathname+u.hash);
  render(currentPath(),true);
 });
 window.addEventListener('popstate',()=>render(currentPath(),true));
}
function initChat(){
 const toggle=$('#assistantToggle'),panel=$('#assistantPanel'),close=$('#assistantClose');
 if(!toggle||!panel)return;
 function show(){panel.classList.add('open');toggle.setAttribute('aria-expanded','true');$('#assistantName')?.focus();}
 function hide(){panel.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();}
 toggle.addEventListener('click',()=>panel.classList.contains('open')?hide():show());
 close.addEventListener('click',hide);
 $$('#openAssistant').forEach(btn=>btn.addEventListener('click',show));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('open'))hide();});
 const form=$('#assistantForm'),review=$('#assistantReview'),send=$('#assistantSend'),edit=$('#assistantEdit');
 if(!form)return;
 form.addEventListener('submit',e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const f=new FormData(form);
  const msg='Hello MotoLogix,\n\nName: '+f.get('name')+'\nPhone: '+f.get('phone')+
    '\nService: '+f.get('service')+'\nMessage: '+f.get('message');
  review.textContent=msg;review.hidden=false;
  send.hidden=false;edit.hidden=false;form.hidden=true;
 });
 edit.addEventListener('click',()=>{review.hidden=true;send.hidden=true;edit.hidden=true;form.hidden=false;});
 send.addEventListener('click',()=>{
  window.open('https://wa.me/27661253754?text='+encodeURIComponent(review.textContent),'_blank','noopener,noreferrer');
 });
}
function initPWA(){
 let deferred=null;
 const install=$('#installAction'),dialog=$('#installHelp'),close=$('#installClose'),dialogInstall=$('#installFromDialog');
 const openHelp=()=>{if(dialog?.showModal){if(!dialog.open)dialog.showModal();}else alert('For installation, open the browser menu and choose Install App or Add to Home Screen.');};
 const act=async()=>{
  if(deferred){
   deferred.prompt();
   try{await deferred.userChoice;}catch(e){}
   deferred=null;
  }else openHelp();
 };
 window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;});
 install?.addEventListener('click',act);
 close?.addEventListener('click',()=>dialog.close());
 dialogInstall?.addEventListener('click',act);
 // Logo and brand have been supplied for MotoLogix. Cache is isolated to this client.
 if('serviceWorker'in navigator && (location.protocol==='https:'||location.hostname==='localhost')){
  window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js',{scope:'/'}).catch(()=>{}),{once:true});
 }
}
$('#year').textContent=String(new Date().getFullYear());
initNav();initChat();initPWA();
render(currentPath(),false);
})();
