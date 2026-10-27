/* MotoLogix homepage expansion, loaded before the Ultra Max 7 router. */
(function enrichHome(){
 'use strict';
 const main=document.querySelector('main');
 if(!main||main.dataset.homeExpanded)return;
 const hero=main.querySelector('#home'), services=main.querySelector('#services'),
  about=main.querySelector('#about'), gallery=main.querySelector('#insights'),
  contact=main.querySelector('#contact'), approach=main.querySelector('#approach');
 if(!hero||!services||!about||!gallery||!contact||!approach)return;
 main.dataset.homeExpanded='true';
 const welcome=`
 <section class="homeWelcome" id="discover" aria-labelledby="welcomeHeading"><div class="container">
   <div class="homeWelcomeHead">
     <div class="reveal"><span class="eyebrow">Welcome to MotoLogix</span><h2 id="welcomeHeading">One industry. <span>Connected solutions.</span></h2></div>
     <div class="reveal"><p>From delivery riders and fleets to market opportunities and mobility policy, MotoLogix brings together the expertise to help South Africa's last-mile economy move forward.</p><a class="homeTextLink" href="/about">Discover our story ↗</a></div>
   </div>
   <div class="homeQuickCards" aria-label="Explore MotoLogix pages">
     <a class="homeQuickCard reveal" href="/services"><span class="homeQuickIcon" aria-hidden="true">▦</span><span class="homeQuickCount">01 / EXPERTISE</span><strong>Explore our services</strong><small>Six ways we help advance the last mile.</small><span class="homeQuickArrow" aria-hidden="true">↗</span></a>
     <a class="homeQuickCard reveal" href="/gallery"><span class="homeQuickIcon" aria-hidden="true">◉</span><span class="homeQuickCount">02 / GALLERY</span><strong>See the industry</strong><small>Real South African delivery photographs.</small><span class="homeQuickArrow" aria-hidden="true">↗</span></a>
     <a class="homeQuickCard reveal" href="/about"><span class="homeQuickIcon" aria-hidden="true">◎</span><span class="homeQuickCount">03 / ABOUT</span><strong>Get to know us</strong><small>Insight, strategy and practical development.</small><span class="homeQuickArrow" aria-hidden="true">↗</span></a>
     <a class="homeQuickCard reveal" href="/faq"><span class="homeQuickIcon" aria-hidden="true">?</span><span class="homeQuickCount">04 / HELP</span><strong>Your questions</strong><small>Answers before getting in touch.</small><span class="homeQuickArrow" aria-hidden="true">↗</span></a>
   </div>
 </div></section>`;
 const spotlight=`
<section class="section homeSpotlight" id="homeSpotlight" aria-labelledby="spotlightHeading"><div class="container">
 <div class="homeSectionHead reveal"><div><span class="eyebrow">Where we make a difference</span><h2 id="spotlightHeading">Designed for the realities of the <span>last mile.</span></h2></div><a class="homeTextLink" href="/services">Explore expertise ↗</a></div>
 <div class="homeSpotlightGrid">
 <article class="homeSpotlightCard reveal"><div class="homeSpotlightImage"><img loading="lazy" src="https://commons.wikimedia.org/wiki/Special:FilePath/Sixty60_motorcycles.jpg?width=950" alt="Motorbike delivery fleet in South Africa"></div><div class="homeSpotlightContent"><span class="homeSpotlightNum">01 / FLEET DEVELOPMENT</span><h3>Smarter delivery operations.</h3><p>From fleet utilisation to operational performance, we consider the practical challenges of running an effective motorbike delivery network.</p><a href="/services" class="homeTextLink">Fleet development ↗</a></div></article>
 <article class="homeSpotlightCard reveal"><div class="homeSpotlightImage"><img loading="lazy" src="https://commons.wikimedia.org/wiki/Special:FilePath/Delivery_men_taking_a_break_-_Cape_Town.jpg?width=950" alt="Delivery riders in Cape Town, South Africa"></div><div class="homeSpotlightContent"><span class="homeSpotlightNum">02 / SKILLS DEVELOPMENT</span><h3>The people behind delivery.</h3><p>Skills development, upskilling and professionalisation can help make South African delivery more capable, confident and inclusive.</p><a href="/services" class="homeTextLink">Skills development ↗</a></div></article>
 <article class="homeSpotlightCard reveal"><div class="homeSpotlightImage"><img loading="lazy" src="https://commons.wikimedia.org/wiki/Special:FilePath/Hatfield_Deliveryman.jpg?width=950" alt="Motorbike delivery rider in Pretoria"></div><div class="homeSpotlightContent"><span class="homeSpotlightNum">03 / MARKET DEVELOPMENT</span><h3>Opening pathways to growth.</h3><p>Township markets, entry strategies and emerging mobility opportunities deserve insight grounded in South African realities.</p><a href="/about" class="homeTextLink">Our approach ↗</a></div></article>
 </div></div></section>`;
 const faqs=`
<section class="section homeFaq" aria-labelledby="homeFaqHeading"><div class="container homeFaqGrid">
 <div class="reveal"><span class="eyebrow">Frequently asked</span><h2 id="homeFaqHeading">Curious about <span>what we do?</span></h2><p class="lead">Quick answers about MotoLogix, delivery fleet development and rider training. Find more details on our FAQ page.</p><a class="btn btn-green" href="/faq">Explore all FAQs ↗</a></div>
 <div class="homeFaqItems reveal">
  <details open><summary>What does MotoLogix specialise in?</summary><p>The motorbike delivery and last-mile industry, across research, fleets, skills, markets, mobility and policy advisory.</p></details>
  <details><summary>Can MotoLogix help with a delivery fleet?</summary><p>Yes, fleet development and management is one of our core services, including operational performance and utilisation.</p></details>
  <details><summary>Can you assist with skills and market growth?</summary><p>Skills development and market entry, including township markets, are part of our service focus.</p></details>
  <a class="homeTextLink" href="/contact">Have another question? Contact us ↗</a>
 </div></div></section>
<section class="homeCallout"><div class="container homeCalloutInner reveal">
  <div><span class="eyebrow">Next step</span><h2>Let's build a smarter last mile. <span>Together.</span></h2><p>Have a project, industry question or fleet challenge? Start a conversation with MotoLogix.</p></div>
  <div class="homeCalloutButtons"><a class="btn btn-gold" href="/contact">Request a conversation ↗</a><a class="btn btn-border" href="https://wa.me/27661253754?text=Hello%20MotoLogix%2C%20I%20would%20like%20to%20discuss%20your%20services." target="_blank" rel="noopener noreferrer">WhatsApp us ↗</a></div>
</div></section>`;
 hero.insertAdjacentHTML('afterend',welcome);
 document.querySelector('#discover').insertAdjacentElement('afterend',services);
 const intro=services.querySelector('.sectionintro .lead');
 if(intro)intro.insertAdjacentHTML('beforeend',' <strong>Hover or tap any card to flip it.</strong>');
 const svcContainer=services.querySelector('.container');
 if(svcContainer)svcContainer.insertAdjacentHTML('beforeend','<div class="homeSectionFooter reveal"><p>Explore how all six service areas can help your organisation.</p><a class="btn btn-green" href="/services">View full services page ↗</a></div>');
 const ticker=main.querySelector('.ticker'),ribbon=main.querySelector('.ribbon');
 if(ticker)services.insertAdjacentElement('afterend',ticker);
 if(ribbon)(ticker||services).insertAdjacentElement('afterend',ribbon);
 about.insertAdjacentHTML('afterend',spotlight);
 const galleryContainer=gallery.querySelector('.container');
 if(galleryContainer)galleryContainer.insertAdjacentHTML('beforeend','<div class="homeSectionFooter reveal"><p>Discover more from the world of last-mile mobility.</p><a class="btn btn-green" href="/gallery">Visit the full gallery ↗</a></div>');
 gallery.insertAdjacentHTML('afterend',faqs);
 const approachContainer=approach.querySelector('.container');
 if(approachContainer)approachContainer.insertAdjacentHTML('beforeend','<div class="homeSectionFooter reveal homeDarkFooter"><p>See the thinking behind our approach.</p><a href="/about" class="btn btn-gold">Learn about us ↗</a></div>');
})();
