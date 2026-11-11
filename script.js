// Web Wizard Studio 1.0
// 1. Menu telefon
var menuBtn=document.querySelector('.menu'),menu=document.getElementById('menu');
if(menuBtn)menuBtn.addEventListener('click',function(){var o=menu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',o);});
menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');});});

// 2. Komponen tab
document.querySelectorAll('[data-tabs]').forEach(function(box){
  var btns=box.querySelectorAll('[data-tab]'),panels=box.querySelectorAll('[data-panel]');
  btns.forEach(function(b){b.addEventListener('click',function(){
    btns.forEach(function(x){x.setAttribute('aria-selected',x===b);});
    panels.forEach(function(p){p.hidden=p.dataset.panel!==b.dataset.tab;});
  });});
});

// 3. Mod halaman (setiap bahagian sebagai halaman)
if(document.body.classList.contains('page-mode')){
  var pages=document.querySelectorAll('.page');
  var showPage=function(id){var found=false;pages.forEach(function(p){var on=p.id===id;p.hidden=!on;if(on)found=true;});if(!found&&pages[0])pages[0].hidden=false;
    document.querySelectorAll('#menu a').forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+id);});window.scrollTo(0,0);};
  document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var id=a.getAttribute('href').slice(1);if(document.getElementById(id)&&document.getElementById(id).classList.contains('page')){e.preventDefault();showPage(id);try{history.replaceState(null,'','#'+id);}catch(x){}}});});
  showPage((location.hash||'#utama').slice(1));
}

// 4. Kesan muncul semasa menatal
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
  document.querySelectorAll('.card,.list li,.gallery figure,.faq details').forEach(function(el){el.classList.add('reveal');io.observe(el);});}
