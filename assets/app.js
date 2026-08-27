// ---- lead delivery ----
// Вставьте сюда URL вебхука интеграции с AmoCRM (например, из Make/Albato/Zapier
// или своего сервера), когда он будет готов — форма сразу начнёт слать туда заявки.
// Пока строка пустая, сайт работает как демо: заявки нигде не сохраняются.
var LEAD_WEBHOOK_URL = "https://proautosvet-site.vercel.app/api/lead";

// ---- data ----
var PROJECTS=[
 {t:"Land Cruiser — экспедиционная подготовка",img:"hero.jpg",tags:["Обвес","Лебёдка","Автосвет","Багажник"],d:"Силовой бампер с лебёдкой, экспедиционный багажник, светодиодная балка и подготовка подвески под дальние маршруты."},
 {t:"Силовой бампер и лебёдка",img:"proj-winch.jpg",tags:["Силовые элементы","Лебёдка","Защита"],d:"Стальной передний бампер, лебёдка 12000 lbs, защита картера и рулевых тяг для тяжёлого офроуда."},
 {t:"Пикап с палаткой и маркизой",img:"proj-tent.jpg",tags:["Палатка","Маркиза","Багажник"],d:"Автомобильная палатка на крыше, выдвижная маркиза и модуль для автономных путешествий."},
 {t:"Автосвет и доп. освещение",img:"proj-night.jpg",tags:["Автосвет","Прожекторы","LED-балка"],d:"Комплекс дополнительного света: балка на крышу, дальнобойные прожекторы и рабочий свет по кругу."},
 {t:"Защитное покрытие кузова Z pro",img:"proj-wrap.jpg",tags:["Защита кузова","Z pro","Антигравий"],d:"Защитное покрытие Z pro и матовая антигравийная плёнка — сохраняем ЛКП в любых условиях."},
 {t:"Комплексная подготовка «под ключ»",img:"sol-complex.jpg",tags:["Комплекс","Лифт","Обвес","Свет"],d:"Полный цикл: подвеска, силовые элементы, свет, защита и экспедиционное оборудование в едином проекте."}
];
var SOLUTIONS=[
 {t:"Офроуд-тюнинг",img:"sol-suspension.jpg",d:"Лифт подвески, амортизаторы, внедорожные шины и колёсные диски."},
 {t:"Автосвет",img:"sol-light.jpg",d:"LED-балки, прожекторы, модернизация головного света и доп. освещение."},
 {t:"Защитное покрытие Z pro",img:"sol-protection.jpg",d:"Z-PRO — это сверхпрочное защитное покрытие на основе полимочевины. Покрытие предназначено для защиты от коррозии и абразивного износа кузовов автомобилей, железнодорожного транспорта, горно-шахтного оборудования, корпусов яхт и морских судов."},
 {t:"Экспедиционное оборудование",img:"sol-expedition.jpg",d:"Багажники, палатки, маркизы, канистры, крепления и модули хранения."},
 {t:"Силовые элементы",img:"sol-bumper.jpg",d:"Стальные бамперы, лебёдки, пороги, кенгурины и защита."},
 {t:"Тормозные системы",img:"sol-brakes.jpg",d:"Тормозные диски и суппорты увеличенного размера, спортивные колодки и армированные шланги — для уверенного торможения на бездорожье и трассе."},
 {t:"Авто палатки",img:"proj-tent.jpg",d:"Палатки на крышу и багажник, маркизы и модули для автономных экспедиций и комфортного отдыха в дороге."},
 {t:"Комплексная подготовка",img:"sol-complex.jpg",d:"Проект автомобиля «под ключ» — от идеи и визуализации до сдачи."}
];

var WORKS=["work-01.jpg","work-02.jpg","work-03.jpg","work-04.jpg","work-05.jpg","work-06.jpg",
 "work-07.jpg","work-08.jpg","work-09.jpg","work-10.jpg","work-11.jpg","work-12.jpg",
 "work-13.jpg","work-14.jpg","work-15.jpg","work-16.jpg","work-17.jpg","work-18.jpg",
 "work-19.jpg","work-20.jpg","work-21.jpg"];

function esc(s){return s.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}

// render projects
document.getElementById('slider').innerHTML=PROJECTS.map(function(p){
 return '<article class="card reveal"><div class="ph"><img loading="lazy" src="assets/img/'+p.img+'" alt="'+esc(p.t)+'"></div>'+
 '<div class="body"><h3>'+esc(p.t)+'</h3><div class="tags">'+p.tags.map(function(t){return '<span class="tag">'+esc(t)+'</span>'}).join('')+'</div>'+
 '<p>'+esc(p.d)+'</p></div></article>';
}).join('');

// render works gallery
document.getElementById('worksSlider').innerHTML=WORKS.map(function(f,i){
 return '<div class="wcard reveal"><img loading="lazy" src="assets/img/works/'+f+'" alt="Автомобиль в работе — проект ProAvtosvet '+(i+1)+'"></div>';
}).join('')+
 '<div class="wcard more reveal"><div><div class="n disp">800+</div><div class="sub" style="margin-top:6px">автомобилей уже прошли через наш цех</div>'+
 '<button class="btn grad" style="margin-top:16px;padding:10px 20px;font-size:13px" onclick="jump(\'contacts\')">Хочу так же</button></div></div>';

// render solutions
document.getElementById('sols').innerHTML=SOLUTIONS.map(function(s){
 return '<article class="card reveal"><div class="ph" style="height:208px"><img loading="lazy" src="assets/img/'+s.img+'" alt="'+esc(s.t)+'"></div>'+
 '<div class="body"><h3>'+esc(s.t)+'</h3><p>'+esc(s.d)+'</p></div></article>';
}).join('');

document.getElementById('yr').textContent=new Date().getFullYear();

// nav
function jump(id){var el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth'});document.getElementById('mmenu').style.display='none';}
function toggleMenu(){var m=document.getElementById('mmenu');m.style.display=m.style.display==='flex'?'none':'flex';}

// sticky header + reveal
var hdr=document.getElementById('hdr');
function onScroll(){if(window.scrollY>40)hdr.classList.add('scrolled');else hdr.classList.remove('scrolled');}
window.addEventListener('scroll',onScroll);onScroll();
document.documentElement.classList.add('js');
var revEls=[].slice.call(document.querySelectorAll('.reveal'));
function revealAll(){revEls.forEach(function(el){el.classList.add('in');});}
if('IntersectionObserver' in window){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:0.08,rootMargin:'0px 0px -5% 0px'});
 revEls.forEach(function(el){io.observe(el);});
 // safety: reveal everything after 1.6s no matter what
 setTimeout(revealAll,1600);
}else{revealAll();}

// before/after
(function(){
 var ba=document.getElementById('ba'),after=document.getElementById('baAfter'),handle=document.getElementById('baHandle'),dragging=false;
 function setPos(clientX){var r=ba.getBoundingClientRect();var p=(clientX-r.left)/r.width*100;p=Math.max(0,Math.min(100,p));after.style.clipPath='inset(0 0 0 '+p+'%)';handle.style.left=p+'%';}
 ba.addEventListener('mousedown',function(e){dragging=true;setPos(e.clientX);});
 window.addEventListener('mousemove',function(e){if(dragging)setPos(e.clientX);});
 window.addEventListener('mouseup',function(){dragging=false;});
 ba.addEventListener('touchstart',function(e){setPos(e.touches[0].clientX);},{passive:true});
 ba.addEventListener('touchmove',function(e){setPos(e.touches[0].clientX);},{passive:true});
})();

// modal
function openModal(){document.getElementById('modal').classList.add('open');}
function closeModal(){document.getElementById('modal').classList.remove('open');}
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal();});

// ---- phone mask (KZ, +7 XXX XXX XX XX) ----
function normalizePhoneDigits(raw){
 var d=(raw||'').replace(/\D/g,'');
 if(!d) return '';
 if(d.charAt(0)==='8') d='7'+d.slice(1); // ведущая 8 (городской стиль) -> код страны 7
 if(d.length===10) d='7'+d; // набрали 10 цифр без кода страны -> добавляем его
 return d.slice(0,11);
}
function formatPhoneDigits(d){
 if(!d) return '';
 var rest=d.slice(1);
 var parts=[rest.slice(0,3),rest.slice(3,6),rest.slice(6,8),rest.slice(8,10)].filter(Boolean);
 return '+7'+(parts.length?' '+parts.join(' '):'');
}
// поле теперь содержит ТОЛЬКО национальный номер (10 цифр) — "+7" показан статично рядом.
// Важно: при обычном наборе (не вставке) НИКОГДА не срезаем цифру по длине —
// иначе случайная лишняя цифра в конце (когда поле уже заполнено все 10 цифр)
// сдвигает номер и "съедает" настоящую первую цифру. Срезание кода страны делаем
// только при настоящей вставке (paste), где мы точно знаем, что это вставленный
// полный номер, а не опечатка при наборе.
function capNationalDigits(raw){
 var d=(raw||'').replace(/\D/g,'');
 return d.slice(0,10);
}
function formatNationalDisplay(national){
 var parts=[national.slice(0,3),national.slice(3,6),national.slice(6,8),national.slice(8,10)].filter(Boolean);
 return parts.join(' ');
}
// Реальные коды операторов сотовой связи Казахстана (3 цифры сразу после +7).
// Список сверен по нескольким справочникам (данные на 2024-2026): Beeline, Kcell/Activ,
// Tele2, Altel. Это не 100%-я гарантия, что номер существует и используется прямо
// сейчас (для этого нужна SMS-верификация), но полностью отсекает придуманные /
// случайно набранные номера с несуществующим кодом оператора — например "013", "999" и т.п.
var KZ_MOBILE_PREFIXES=['700','701','702','705','707','708','747','771','775','776','777','778'];
var KZ_MOBILE_RE=new RegExp('^7('+KZ_MOBILE_PREFIXES.join('|')+')\\d{7}$');
function isValidKzPhone(d){ return KZ_MOBILE_RE.test(d); }
var INVALID_PHONE_MSG='Введите настоящий казахстанский номер, например 701 333 44 55';
function attachPhoneMask(input){
 function sync(){
  var national=capNationalDigits(input.value);
  input.value=formatNationalDisplay(national);
  var full=national?'7'+national:'';
  input.setCustomValidity(national.length===10&&!isValidKzPhone(full)?INVALID_PHONE_MSG:(national&&national.length!==10?'Введите номер полностью, например 701 333 44 55':''));
 }
 input.addEventListener('input',sync);
 input.addEventListener('blur',sync);
 input.addEventListener('paste',function(e){
  var cd=e.clipboardData||window.clipboardData;
  var text=cd?cd.getData('text'):'';
  var d=(text||'').replace(/\D/g,'');
  // вставили номер целиком, с кодом страны (11 цифр, начинается на 7 или 8) -> уберём код страны
  if(d.length===11 && (d.charAt(0)==='7'||d.charAt(0)==='8')) d=d.slice(1);
  var national=d.slice(0,10);
  input.value=formatNationalDisplay(national);
  var full=national?'7'+national:'';
  input.setCustomValidity(national.length===10&&!isValidKzPhone(full)?INVALID_PHONE_MSG:(national&&national.length!==10?'Введите номер полностью, например 701 333 44 55':''));
  e.preventDefault();
 });
}
[].slice.call(document.querySelectorAll('input[type="tel"][name="phone"]')).forEach(attachPhoneMask);

// form submit
function showSent(form,title,text,showRetry){
 form.style.display='none';
 var d=document.createElement('div');d.className='sent';
 d.innerHTML='<div class="em">🛠️</div><h3 class="disp" style="font-size:22px;font-weight:700;margin-top:8px">'+title+'</h3>'+
 '<p class="sub" style="margin-top:8px">'+text+'</p>'+
 (showRetry?'<button class="btn grad" style="margin-top:16px" onclick="this.parentElement.previousElementSibling.style.display=\'\';this.parentElement.remove();">Попробовать снова</button>':'');
 form.insertAdjacentElement('afterend',d);
}

function submitForm(form){
 var phoneInput=form.querySelector('input[name="phone"]');
 var phoneDigits=normalizePhoneDigits(phoneInput?phoneInput.value:'');
 if(!isValidKzPhone(phoneDigits)){
  if(phoneInput){
   phoneInput.setCustomValidity(INVALID_PHONE_MSG);
   phoneInput.reportValidity();
   phoneInput.focus();
  }
  return false;
 }
 if(phoneInput){ phoneInput.setCustomValidity(''); phoneInput.value=formatNationalDisplay(phoneDigits.slice(1)); }
 if(!LEAD_WEBHOOK_URL){
  // демо-режим: вебхук ещё не подключён, заявка нигде не сохраняется
  showSent(form,'Заявка принята!','Демо-форма — заявка реально не отправляется. Укажите LEAD_WEBHOOK_URL в assets/app.js, чтобы подключить приём заявок.');
  return false;
 }
 var fd=new FormData(form);
 var payload={name:fd.get('name')||'',phone:formatPhoneDigits(phoneDigits),car:fd.get('car')||'',source:'proavtosvet-patsha.kz',page:location.href};
 var btn=form.querySelector('button[type="submit"]');
 if(btn){btn.disabled=true;}
 fetch(LEAD_WEBHOOK_URL,{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify(payload)
 }).then(function(r){
  if(!r.ok) throw new Error('bad status '+r.status);
  showSent(form,'Заявка принята!','Спасибо! Мы свяжемся с вами в ближайшее время.');
 }).catch(function(err){
  console.error('Lead webhook error:', err);
  if(btn){btn.disabled=false;}
  showSent(form,'Не удалось отправить заявку','Попробуйте ещё раз или позвоните нам напрямую: <a href="tel:+77051108080" style="color:var(--brand)">+7 (705) 110-80-80</a>.',true);
 });
 return false;
}
window.jump=jump;window.toggleMenu=toggleMenu;window.openModal=openModal;window.closeModal=closeModal;window.submitForm=submitForm;
