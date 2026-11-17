(function(){
  var r=document.documentElement;
  try{var t=localStorage.getItem('theme');if(t)r.setAttribute('data-theme',t)}catch(e){}
  document.getElementById('theme').addEventListener('click',function(){
    var cur=r.getAttribute('data-theme');
    var dark=cur?cur==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
    var n=dark?'light':'dark';r.setAttribute('data-theme',n);
    try{localStorage.setItem('theme',n)}catch(e){}
  });
  var type=document.getElementById('e-type'),adds=document.querySelectorAll('.e-add'),out=document.getElementById('e-out'),mail=document.getElementById('e-mail');
  function est(){
    var lo=+type.value,names=[type.options[type.selectedIndex].text];
    adds.forEach(function(a){if(a.checked){lo+=+a.value;names.push(a.parentNode.textContent.trim())}});
    var step=lo>=1000?100:10,hi=Math.round(lo*1.4/step)*step,cur=type.dataset.cur||'$',fmt=function(n){return cur+n.toLocaleString('en-US')};
    out.textContent=fmt(lo)+' to '+fmt(hi);out.classList.remove('pop');void out.offsetWidth;out.classList.add('pop');
    mail.href='mailto:Bernardbriola0826@gmail.com?subject='+encodeURIComponent('Website estimate request')+'&body='+encodeURIComponent('I’d like a quote for:\n- '+names.join('\n- ')+'\n\nEstimate shown: '+fmt(lo)+' to '+fmt(hi)+'\n\nAbout my business:\n');
  }
  type.addEventListener('change',est);adds.forEach(function(a){a.addEventListener('change',est)});est();
  var clock=document.getElementById('clock');
  function tick(){
    var d=new Date(),o={timeZone:'Asia/Manila'};
    var time=new Intl.DateTimeFormat('en-US',Object.assign({hour:'numeric',minute:'2-digit'},o)).format(d);
    var h=+new Intl.DateTimeFormat('en-US',Object.assign({hour:'numeric',hour12:false},o)).format(d)%24;
    clock.textContent=h>=19?'It’s '+time+' in Manila, so I’m usually online right now.':'It’s '+time+' in Manila. I usually reply in the evening, 7 PM to 12 AM.';
  }
  tick();setInterval(tick,30000);
  r.classList.add('js');
  var P={size:0,contrast:0,motion:0};
  try{P=Object.assign(P,JSON.parse(localStorage.getItem('prefs')||'{}'))}catch(e){}
  P.size=Math.min(3,Math.max(0,+P.size||0));
  var sizes=[100,112.5,125,137.5],hc=document.getElementById('o-hc'),mo=document.getElementById('o-mo'),bar=document.getElementById('optbar'),ob=document.getElementById('optbtn');
  function apply(){
    r.style.fontSize=sizes[P.size]+'%';
    if(P.contrast)r.setAttribute('data-contrast','high');else r.removeAttribute('data-contrast');
    if(P.motion)r.setAttribute('data-motion','off');else r.removeAttribute('data-motion');
    hc.setAttribute('aria-pressed',String(!!P.contrast));mo.setAttribute('aria-pressed',String(!!P.motion));
    try{localStorage.setItem('prefs',JSON.stringify(P))}catch(e){}
  }
  ob.addEventListener('click',function(){var open=bar.hidden;bar.hidden=!open;ob.setAttribute('aria-expanded',String(open))});
  document.getElementById('o-sm').addEventListener('click',function(){P.size=Math.max(0,P.size-1);apply()});
  document.getElementById('o-lg').addEventListener('click',function(){P.size=Math.min(3,P.size+1);apply()});
  hc.addEventListener('click',function(){P.contrast=P.contrast?0:1;apply()});
  mo.addEventListener('click',function(){P.motion=P.motion?0:1;apply()});
  document.getElementById('o-rs').addEventListener('click',function(){P={size:0,contrast:0,motion:0};apply()});
  apply();
  var prog=document.getElementById('prog');
  function pg(){var h=document.documentElement.scrollHeight-innerHeight;prog.style.width=(h>0?scrollY/h*100:0)+'%'}
  addEventListener('scroll',pg,{passive:true});pg();
  var links={};document.querySelectorAll('nav a[href^="#"]').forEach(function(a){links[a.getAttribute('href').slice(1)]=a});
  if('IntersectionObserver' in window){var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){Object.keys(links).forEach(function(k){links[k].removeAttribute('aria-current')});var l=links[e.target.id];if(l)l.setAttribute('aria-current','true')}})},{rootMargin:'-40% 0px -55% 0px'});Object.keys(links).forEach(function(k){var s=document.getElementById(k);if(s)so.observe(s)})}
  var toast=document.getElementById('toast'),addr='Bernardbriola0826@gmail.com';
  document.getElementById('copy').addEventListener('click',function(){
    function ok(){toast.textContent='Email address copied.'}
    function no(){toast.textContent='Copy did not work. My address is '+addr+'.'}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(addr).then(ok,no)}else{no()}
    setTimeout(function(){toast.textContent=''},4000);
  });
  document.getElementById('e-reset').addEventListener('click',function(){type.selectedIndex=2;adds.forEach(function(a){a.checked=false});est()});
  var shots=document.querySelectorAll('.shot');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('go');io.unobserve(e.target)}})},{threshold:.4});shots.forEach(function(s){io.observe(s)})}else{shots.forEach(function(s){s.classList.add('go')})}
  function calm(){return P.motion||matchMedia('(prefers-reduced-motion: reduce)').matches}
  if('IntersectionObserver' in window&&!calm()){
    var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    document.querySelectorAll('.proj,section>h2,.sec div,.row,details,.est,.contact,ol li,.ctaband p,.ctaband .links').forEach(function(el,i){el.classList.add('rv');el.style.transitionDelay=(i%4)*70+'ms';ro.observe(el)});
  }
  var raf=0;
  addEventListener('pointermove',function(e){if(calm()||raf)return;raf=requestAnimationFrame(function(){raf=0;r.style.setProperty('--mx',e.clientX+'px');r.style.setProperty('--my',e.clientY+'px')})},{passive:true});
  if(matchMedia('(hover:hover)').matches){shots.forEach(function(s){
    s.addEventListener('pointermove',function(e){if(calm())return;var b=s.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;s.style.transform='perspective(900px) rotateY('+x*7+'deg) rotateX('+(-y*7)+'deg) scale(1.015)'});
    s.addEventListener('pointerleave',function(){s.style.transform=''});
  })}
  var path=document.querySelector('.shot .l');
  if(path){
    var svg=path.ownerSVGElement,dot=document.createElementNS('http://www.w3.org/2000/svg','circle'),L=path.getTotalLength(),t0=0;
    dot.setAttribute('r','7');dot.setAttribute('class','rider');dot.style.display='none';svg.appendChild(dot);
    (function loop(ts){
      if(svg.classList.contains('go')&&!calm()){
        if(!t0)t0=ts+1700;var el=ts-t0;
        if(el>=0){var k=(el%4500)/4500,pt=path.getPointAtLength(L*k);dot.setAttribute('cx',pt.x);dot.setAttribute('cy',pt.y);dot.style.display=''}
      }else dot.style.display='none';
      requestAnimationFrame(loop);
    })(0);
  }
})();