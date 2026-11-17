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

// ---- интерактивный автомобиль: точки на фото + чеклист в форме заявки ----
// Фото обновлено 2026-09-08 (студийный кадр клиента, замена демо-фото).
// Цены — реальные, присланы клиентом 2026-09-07/08. "Силовые пороги" клиент в
// этом прайсе не упоминал — цена оставлена старой демо-плашкой, уточнить и
// обновить отдельно. Для "лагерный свет" на этом фото нет отдельного узнаваемого
// элемента — точка на фото не расставлена, доступен только в чеклисте формы.
// x/y — позиция маркера на изображении assets/img/interactive-car.webp в процентах
// (координаты подобраны под текущее фото).
var EQUIPMENT=[
 {id:"snorkel",label:"Шноркель",price:"от 250 000 ₸",x:28,y:19},
 {id:"rack",label:"Экспедиционный багажник",price:"от 235 000 ₸",x:77,y:17},
 {id:"tent",label:"Палатка на крышу",price:"от 780 000 ₸",x:67,y:6},
 {id:"light",label:"Дополнительное освещение",price:"от 187 000 ₸",x:48,y:12},
 {id:"camplight",label:"Лагерный свет (1 шт.)",price:"от 31 500 ₸"},
 {id:"winch",label:"Лебёдка",price:"от 285 000 ₸",x:18,y:69},
 {id:"bumper",label:"Усиленный бампер",price:"от 400 000 ₸",x:33,y:68},
 {id:"bodykit",label:"Обвес",price:"от 1 056 000 ₸",x:54,y:51},
 {id:"archflares",label:"Расширители арок",price:"от 250 000 ₸",x:63,y:60},
 {id:"wheels",label:"Кованые диски (4 шт.)",price:"от 550 000 ₸",x:94,y:70},
 {id:"tires",label:"Грязевая резина",price:"от 140 000 ₸",x:60,y:75},
 {id:"steps",label:"Силовые пороги",price:"от 220 000 ₸",x:77,y:73},
 {id:"awning",label:"Маркиза",price:"от 260 000 ₸",x:94,y:14},
 {id:"zpro",label:"Защитное покрытие Z-PRO",price:"от 1 680 000 ₸",x:86,y:44}
];

function esc(s){return s.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}

// render projects
// (все блоки ниже написаны так, чтобы безопасно не выполняться на страницах,
// где соответствующего элемента нет — assets/app.js теперь общий файл для
// index.html, diski.html и avtosvet.html, см. комментарий внизу файла)
if(document.getElementById('slider')){
 document.getElementById('slider').innerHTML=PROJECTS.map(function(p){
  return '<article class="card reveal"><div class="ph"><img loading="lazy" src="assets/img/'+p.img+'" alt="'+esc(p.t)+'"></div>'+
  '<div class="body"><h3>'+esc(p.t)+'</h3><div class="tags">'+p.tags.map(function(t){return '<span class="tag">'+esc(t)+'</span>'}).join('')+'</div>'+
  '<p>'+esc(p.d)+'</p></div></article>';
 }).join('');
}

// render works gallery
if(document.getElementById('worksSlider')){
 document.getElementById('worksSlider').innerHTML=WORKS.map(function(f,i){
  return '<div class="wcard reveal" onclick="openLightbox('+i+')"><img loading="lazy" src="assets/img/works/'+f+'" alt="Автомобиль в работе — проект ProAvtosvet '+(i+1)+'"></div>';
 }).join('')+
  '<div class="wcard more reveal"><div><div class="n disp">800+</div><div class="sub" style="margin-top:6px">автомобилей уже прошли через наш цех</div>'+
  '<button class="btn grad" style="margin-top:16px;padding:10px 20px;font-size:13px" onclick="jump(\'contacts\')">Хочу так же</button></div></div>';
}

// ---- интерактивный автомобиль: точки на фото ----
// позиция есть не у всех — то, чего не видно на конкретном фото, точки не получает
// (но остаётся доступно для выбора в чеклисте формы ниже)
if(document.getElementById('ivDots')){
 document.getElementById('ivDots').innerHTML=EQUIPMENT.filter(function(e){return e.x!=null&&e.y!=null}).map(function(e){
  var edgeCls = (e.x<12 ? ' edge-l' : (e.x>85 ? ' edge-r' : '')) + (e.y<25 ? ' edge-t' : '');
  return '<button type="button" class="iv-dot'+edgeCls+'" style="left:'+e.x+'%;top:'+e.y+'%" data-id="'+e.id+'" '+
   'onclick="toggleDotSelect(this,event)" aria-label="'+esc(e.label)+'">'+
   '<span class="tip"><b>'+esc(e.label)+'</b><i>'+esc(e.price)+'</i></span></button>';
 }).join('');
}

// ---- чеклист «Что хотите установить?» в форме заявки ----
if(document.getElementById('eqList')){
 document.getElementById('eqList').innerHTML=EQUIPMENT.map(function(e){
  var onPhoto = e.x!=null&&e.y!=null;
  return '<label class="eq-item"><input type="checkbox" value="'+e.id+'" onchange="setEquip(this.value,this.checked)">'+
   '<span class="eq-name">'+esc(e.label)+(onPhoto?'':' <i class="eq-nophoto">· нет на фото</i>')+'</span><span class="eq-price">'+esc(e.price)+'</span></label>';
 }).join('');
}

// извлекает число из строки цены вида "от 350 000 ₸" -> 350000 (для подсчёта суммы)
function parsePrice(str){
 var digits=(str||'').replace(/[^\d]/g,'');
 return digits?parseInt(digits,10):0;
}
function formatSum(n){
 return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
}

var eqSelected={};
function syncEqUI(){
 var chosen=EQUIPMENT.filter(function(e){return eqSelected[e.id]});
 var summaryEl=document.getElementById('eqSummary');
 if(!chosen.length){
  summaryEl.textContent='Что хотите установить?';
  summaryEl.classList.remove('has-val');
 }else{
  var names=chosen.map(function(e){return e.label});
  var text=names.length<=2?('Выбрано: '+names.join(', ')):('Выбрано: '+names.slice(0,2).join(', ')+' +'+(names.length-2));
  summaryEl.textContent=text;
  summaryEl.classList.add('has-val');
 }
 [].slice.call(document.querySelectorAll('#eqList input[type="checkbox"]')).forEach(function(cb){
  cb.checked=!!eqSelected[cb.value];
 });
 [].slice.call(document.querySelectorAll('.iv-dot')).forEach(function(d){
  d.classList.toggle('selected',!!eqSelected[d.getAttribute('data-id')]);
 });
 // бегущая сумма набранного оборудования — показываем, только если что-то выбрано
 var totalEl=document.getElementById('eqTotal'),totalSumEl=document.getElementById('eqTotalSum');
 if(totalEl&&totalSumEl){
  var sum=chosen.reduce(function(s,e){return s+parsePrice(e.price);},0);
  if(sum>0){
   totalSumEl.textContent=formatSum(sum);
   totalEl.hidden=false;
  }else{
   totalEl.hidden=true;
  }
 }
}
function setEquip(id,checked){
 eqSelected[id]=checked;
 syncEqUI();
}
function toggleDotSelect(el,e){
 e.stopPropagation();
 var id=el.getAttribute('data-id');
 var willOpen=!el.classList.contains('active');
 [].slice.call(document.querySelectorAll('.iv-dot.active')).forEach(function(d){ if(d!==el) d.classList.remove('active'); });
 el.classList.toggle('active',willOpen);
 setEquip(id,!eqSelected[id]);
}
function toggleEqList(e){
 if(e) e.stopPropagation();
 document.getElementById('eqSelect').classList.toggle('open');
}
document.addEventListener('click',function(e){
 if(!e.target.closest('.iv-dot')){
  [].slice.call(document.querySelectorAll('.iv-dot.active')).forEach(function(d){d.classList.remove('active');});
 }
 if(!e.target.closest('#eqSelect')){
  var eqSel=document.getElementById('eqSelect');
  if(eqSel) eqSel.classList.remove('open');
 }
});

// ---- lightbox (увеличенный просмотр галереи "Проделанные работы") ----
// (есть только на index.html — элемент #lightbox там единственный;
// на diski.html/avtosvet.html используются свои лайтбоксы через makeLightbox(), см. ниже)
var LB_IMAGES=WORKS.map(function(f){return 'assets/img/works/'+f;});
var lbIndex=0;
function lbRender(){
 document.getElementById('lbImg').src=LB_IMAGES[lbIndex];
 document.getElementById('lbCount').textContent=(lbIndex+1)+' / '+LB_IMAGES.length;
}
function openLightbox(i){
 lbIndex=i;
 lbRender();
 document.getElementById('lightbox').classList.add('open');
 document.body.style.overflow='hidden';
}
function closeLightbox(){
 document.getElementById('lightbox').classList.remove('open');
 document.body.style.overflow='';
}
function lbMove(d){
 lbIndex=(lbIndex+d+LB_IMAGES.length)%LB_IMAGES.length;
 lbRender();
}
document.addEventListener('keydown',function(e){
 var lb=document.getElementById('lightbox');
 if(!lb||!lb.classList.contains('open'))return;
 if(e.key==='Escape')closeLightbox();
 if(e.key==='ArrowLeft')lbMove(-1);
 if(e.key==='ArrowRight')lbMove(1);
});
if(document.getElementById('lightbox')){
 (function(){
  var lb=document.getElementById('lightbox'),sx=0,dx=0,active=false;
  lb.addEventListener('touchstart',function(e){
   if(e.touches.length!==1)return;
   sx=e.touches[0].clientX;dx=0;active=true;
  },{passive:true});
  lb.addEventListener('touchmove',function(e){
   if(!active)return;
   dx=e.touches[0].clientX-sx;
  },{passive:true});
  lb.addEventListener('touchend',function(){
   if(!active)return;active=false;
   if(Math.abs(dx)>50) lbMove(dx<0?1:-1);
  });
 })();
}
window.openLightbox=openLightbox;window.closeLightbox=closeLightbox;window.lbMove=lbMove;

// render solutions
if(document.getElementById('sols')){
 document.getElementById('sols').innerHTML=SOLUTIONS.map(function(s){
  return '<article class="card reveal"><div class="ph" style="height:208px"><img loading="lazy" src="assets/img/'+s.img+'" alt="'+esc(s.t)+'"></div>'+
  '<div class="body"><h3>'+esc(s.t)+'</h3><p>'+esc(s.d)+'</p></div></article>';
 }).join('');
}

if(document.getElementById('yr')) document.getElementById('yr').textContent=new Date().getFullYear();

// nav
function jump(id){var el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth'});document.getElementById('mmenu').style.display='none';}
function toggleMenu(){var m=document.getElementById('mmenu');m.style.display=m.style.display==='flex'?'none':'flex';}

// дропдаун "Каталог" в десктоп-навигации (Диски / Автосвет) — клик открывает/закрывает,
// клик вне меню или Escape закрывает; работает одинаково на мыши и тач-экранах
function toggleCatalogMenu(ev,id){
 if(ev){ev.stopPropagation();ev.preventDefault();}
 var el=document.getElementById(id);
 if(!el)return;
 var wasOpen=el.classList.contains('open');
 document.querySelectorAll('.navdrop.open').forEach(function(d){d.classList.remove('open');});
 if(!wasOpen)el.classList.add('open');
}
window.toggleCatalogMenu=toggleCatalogMenu;
document.addEventListener('click',function(){
 document.querySelectorAll('.navdrop.open').forEach(function(d){d.classList.remove('open');});
});
document.addEventListener('keydown',function(e){
 if(e.key==='Escape')document.querySelectorAll('.navdrop.open').forEach(function(d){d.classList.remove('open');});
});

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

// before/after (index.html only — есть #ba; avtosvet.html использует свой
// compare-слайдер через initCompareSlider(), см. ниже)
if(document.getElementById('ba')){
 (function(){
  var ba=document.getElementById('ba'),after=document.getElementById('baAfter'),handle=document.getElementById('baHandle'),dragging=false;
  function setPos(clientX){var r=ba.getBoundingClientRect();var p=(clientX-r.left)/r.width*100;p=Math.max(0,Math.min(100,p));after.style.clipPath='inset(0 0 0 '+p+'%)';handle.style.left=p+'%';}
  ba.addEventListener('mousedown',function(e){dragging=true;setPos(e.clientX);});
  window.addEventListener('mousemove',function(e){if(dragging)setPos(e.clientX);});
  window.addEventListener('mouseup',function(){dragging=false;});
  ba.addEventListener('touchstart',function(e){setPos(e.touches[0].clientX);},{passive:true});
  ba.addEventListener('touchmove',function(e){setPos(e.touches[0].clientX);},{passive:true});
 })();
}

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

// заявка из блока «Интерактивный автомобиль» — те же поля + марка/модель/год
// и список отмеченного оборудования (передаётся в AmoCRM через api/lead.py)
function submitIvForm(form){
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
 var fd=new FormData(form);
 var chosen=EQUIPMENT.filter(function(e){return eqSelected[e.id]}).map(function(e){return e.label});
 var mark=fd.get('mark')||'', model=fd.get('model')||'', year=fd.get('year')||'';
 var carStr=(mark+' '+model).trim();
 if(!LEAD_WEBHOOK_URL){
  showSent(form,'Заявка принята!','Демо-форма — заявка реально не отправляется. Укажите LEAD_WEBHOOK_URL в assets/app.js, чтобы подключить приём заявок.');
  return false;
 }
 var payload={name:fd.get('name')||'',phone:formatPhoneDigits(phoneDigits),mark:mark,model:model,year:year,
  car:carStr,equipment:chosen,source:'proavtosvet-patsha.kz',page:location.href};
 var btn=form.querySelector('button[type="submit"]');
 if(btn){btn.disabled=true;}
 fetch(LEAD_WEBHOOK_URL,{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify(payload)
 }).then(function(r){
  if(!r.ok) throw new Error('bad status '+r.status);
  if(typeof ym==='function'){ ym(112494150,'reachGoal','lead_sent'); }
  showSent(form,'Заявка принята!','Спасибо! Мы свяжемся с вами и рассчитаем стоимость выбранного оборудования.');
 }).catch(function(err){
  console.error('Lead webhook error:', err);
  if(btn){btn.disabled=false;}
  showSent(form,'Не удалось отправить заявку','Попробуйте ещё раз или позвоните нам напрямую: <a href="tel:+77051107070" style="color:var(--brand)">+7 (705) 110-70-70</a>.',true);
 });
 return false;
}
window.jump=jump;window.toggleMenu=toggleMenu;
window.submitIvForm=submitIvForm;window.toggleDotSelect=toggleDotSelect;window.toggleEqList=toggleEqList;window.setEquip=setEquip;

// =====================================================================
// Страницы каталогов «Диски для внедорожников» (diski.html) и
// «Автосвет X-Optic Prisma Force» (avtosvet.html), добавлено 2026-11-10.
// Всё ниже выполняется только если на странице есть соответствующие
// элементы — на index.html эти блоки отсутствуют, код просто не сработает
// и никак не повлияет на главную страницу.
// =====================================================================

// ---- универсальная форма заявки (переиспользует проверку телефона и
// хелперы форматирования, уже объявленные выше для формы конфигуратора) ----
// opts: {service, goal, successTitle, successText}
function submitSimpleLeadForm(form, opts){
 opts = opts || {};
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
 var fd=new FormData(form);
 var mark=fd.get('mark')||'', model=fd.get('model')||'', year=fd.get('year')||'', style=fd.get('style')||'';
 var carStr=(mark+' '+model).trim();
 if(!LEAD_WEBHOOK_URL){
  showSent(form,'Заявка принята!','Демо-форма — заявка реально не отправляется. Укажите LEAD_WEBHOOK_URL в assets/app.js, чтобы подключить приём заявок.');
  return false;
 }
 var payload={name:fd.get('name')||'',phone:formatPhoneDigits(phoneDigits),mark:mark,model:model,year:year,
  car:carStr,style:style,service:opts.service||'',source:'proavtosvet-patsha.kz',page:location.href};
 var btn=form.querySelector('button[type="submit"]');
 if(btn){btn.disabled=true;}
 fetch(LEAD_WEBHOOK_URL,{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify(payload)
 }).then(function(r){
  if(!r.ok) throw new Error('bad status '+r.status);
  if(typeof ym==='function'){
   ym(112494150,'reachGoal','lead_sent');
   if(opts.goal) ym(112494150,'reachGoal',opts.goal);
  }
  showSent(form,opts.successTitle||'Заявка принята!',opts.successText||'Спасибо! Мы свяжемся с вами в ближайшее время.');
 }).catch(function(err){
  console.error('Lead webhook error:', err);
  if(btn){btn.disabled=false;}
  showSent(form,'Не удалось отправить заявку','Попробуйте ещё раз или позвоните нам напрямую: <a href="tel:+77051107070" style="color:var(--brand)">+7 (705) 110-70-70</a>.',true);
 });
 return false;
}
window.submitSimpleLeadForm=submitSimpleLeadForm;

// ---- универсальный лайтбокс (используется и каталогом дисков, и
// галереями "Готовые проекты" на обеих новых страницах) ----
// Ожидает в разметке: #<prefix>Lightbox / #<prefix>LbImg / #<prefix>LbCount
// и кнопки с onclick="<имя_переменной>.close()/.move(±1)".
function makeLightbox(prefix, images){
 var root=document.getElementById(prefix+'Lightbox');
 if(!root) return null;
 var imgEl=document.getElementById(prefix+'LbImg');
 var countEl=document.getElementById(prefix+'LbCount');
 var idx=0;
 function render(){ imgEl.src=images[idx]; if(countEl) countEl.textContent=(idx+1)+' / '+images.length; }
 function open(i){ idx=i||0; render(); root.classList.add('open'); document.body.style.overflow='hidden'; }
 function close(){ root.classList.remove('open'); document.body.style.overflow=''; }
 function move(d){ idx=(idx+d+images.length)%images.length; render(); }
 root.addEventListener('click',function(e){ if(e.target===root) close(); });
 document.addEventListener('keydown',function(e){
  if(!root.classList.contains('open')) return;
  if(e.key==='Escape') close();
  if(e.key==='ArrowLeft') move(-1);
  if(e.key==='ArrowRight') move(1);
 });
 (function(){
  var sx=0,dx=0,active=false;
  root.addEventListener('touchstart',function(e){ if(e.touches.length!==1)return; sx=e.touches[0].clientX;dx=0;active=true; },{passive:true});
  root.addEventListener('touchmove',function(e){ if(!active)return; dx=e.touches[0].clientX-sx; },{passive:true});
  root.addEventListener('touchend',function(){ if(!active)return; active=false; if(Math.abs(dx)>50) move(dx<0?1:-1); });
 })();
 return {open:open, close:close, move:move};
}

// ---- универсальная галерея-слайдер (карточки + клик -> лайтбокс) ----
function renderGallery(containerId, images, lb, labelPrefix){
 var el=document.getElementById(containerId);
 if(!el) return;
 el.innerHTML=images.map(function(src,i){
  return '<div class="wcard reveal" onclick="'+lb+'.open('+i+')"><img loading="lazy" src="'+src+'" alt="'+esc(labelPrefix||'Фото')+' '+(i+1)+'"></div>';
 }).join('');
}

// ---- compare-слайдер "до/после" (аналог блока на главной, но с другими
// id, чтобы не пересекаться с существующим #ba на index.html) ----
function initCompareSlider(wrapId, afterId, handleId){
 var wrap=document.getElementById(wrapId);
 if(!wrap) return;
 var after=document.getElementById(afterId), handle=document.getElementById(handleId), dragging=false;
 function setPos(clientX){
  var r=wrap.getBoundingClientRect();
  var p=(clientX-r.left)/r.width*100;
  p=Math.max(0,Math.min(100,p));
  after.style.clipPath='inset(0 0 0 '+p+'%)';
  handle.style.left=p+'%';
 }
 wrap.addEventListener('mousedown',function(e){dragging=true;setPos(e.clientX);});
 window.addEventListener('mousemove',function(e){if(dragging)setPos(e.clientX);});
 window.addEventListener('mouseup',function(){dragging=false;});
 wrap.addEventListener('touchstart',function(e){setPos(e.touches[0].clientX);},{passive:true});
 wrap.addEventListener('touchmove',function(e){setPos(e.touches[0].clientX);},{passive:true});
}
window.initCompareSlider=initCompareSlider;

// ---- каталог дисков (diski.html) ----
// Реальные фото с объектов ProAvtosvet (ноябрь 2026). Patsha Offroad — наш
// собственный бренд (кованые, характеристики с заводской гравировки на диске:
// 20" 6x139.7 ET0, CB78.1, сертификация JWL, нагрузка до 1300 кг/диск).
// MAT Race Wheel, Agility Force, FUEL, Braid Wheels и дизайн "Black Mud" —
// диски сторонних брендов, которые мы устанавливаем на автомобили клиентов;
// точный размер/вылет и цена по этим брендам уточняются у менеджера под
// конкретный автомобиль — цифры по ним намеренно не указаны, чтобы не вводить
// в заблуждение.
var DISKI_CATALOG=[
 {id:'patsha-black',group:'Patsha Offroad',name:'Чёрный глянец',size:'Кованые',
  specs:'20″ · 6×139.7 · ET0 · JWL Forged, нагрузка до 1300 кг/диск',price:'от 950 000 ₸',
  img:['assets/img/diski/real/patsha-black-1.jpg','assets/img/diski/real/patsha-black-2.jpg','assets/img/diski/real/patsha-black-3.jpg','assets/img/diski/real/patsha-black-4.jpg','assets/img/diski/real/patsha-black-5.jpg','assets/img/diski/real/patsha-black-6.jpg','assets/img/diski/real/patsha-black-onvehicle.jpg']},
 {id:'patsha-bronze',group:'Patsha Offroad',name:'Бронза (сатин)',size:'Кованые',
  specs:'20″ · 6×139.7 · ET0 · JWL Forged, нагрузка до 1300 кг/диск',price:'от 950 000 ₸',
  img:['assets/img/diski/real/patsha-bronze-1.jpg','assets/img/diski/real/patsha-bronze-2.jpg','assets/img/diski/real/patsha-bronze-3.jpg','assets/img/diski/real/patsha-bronze-4.jpg','assets/img/diski/real/patsha-bronze-5.jpg','assets/img/diski/real/patsha-bronze-onvehicle-1.jpg','assets/img/diski/real/patsha-bronze-onvehicle-2.jpg']},
 {id:'patsha-matte',group:'Patsha Offroad',name:'Матовый графит',size:'Кованые',
  specs:'20″ · 6×139.7 · ET0 · JWL Forged, нагрузка до 1300 кг/диск',price:'от 950 000 ₸',
  img:['assets/img/diski/real/patsha-matte-1.jpg','assets/img/diski/real/patsha-matte-2.jpg','assets/img/diski/real/patsha-matte-3.jpg','assets/img/diski/real/patsha-matte-4.jpg','assets/img/diski/real/patsha-matte-5.jpg']},
 {id:'mat',group:'MAT Race Wheel',name:'Off-Road',size:'Литые',
  specs:'Устанавливаем на внедорожники клиентов — диаметр, вылет и цвет подбираем под ваш автомобиль',price:'цена по запросу',
  img:['assets/img/diski/real/mat-1.jpg','assets/img/diski/real/mat-2.jpg']},
 {id:'agility',group:'Agility Force',name:'Off-Road',size:'Литые',
  specs:'Прочный off-road диск, подбор размера и цвета под ваш автомобиль',price:'цена по запросу',
  img:['assets/img/diski/real/agility-1.jpg','assets/img/diski/real/agility-2.jpg']},
 {id:'fuel',group:'FUEL',name:'Off-Road',size:'Литые',
  specs:'Американский бренд дисков для внедорожников, разные дизайны и размеры под заказ',price:'цена по запросу',
  img:['assets/img/diski/real/fuel-1.jpg','assets/img/diski/real/fuel-2.jpg','assets/img/diski/real/fuel-3.jpg']},
 {id:'braid',group:'Braid Wheels',name:'Rally / Dakar',size:'Кованые',
  specs:'Профессиональные спортивные диски для ралли-рейдов (включая «Дакар») и тяжёлого бездорожья, повышенная прочность на ударные нагрузки',price:'цена по запросу',
  img:['assets/img/diski/real/braid-1.jpg']},
 {id:'blackmud',group:'Off-Road диски',name:'Дизайн «Black Mud» (бедлок)',size:'Литые',
  specs:'Диск с имитацией бедлока (decorative beadlock) — агрессивный внедорожный вид без обслуживания настоящего бедлока',price:'цена по запросу',
  img:['assets/img/diski/real/blackmud-1.jpg','assets/img/diski/real/blackmud-2.jpg']}
];
var DISKI_GALLERY=['assets/img/diski/real/project-1.jpg','assets/img/diski/real/project-2.jpg','assets/img/diski/real/project-3.jpg',
 'assets/img/diski/real/project-4.jpg','assets/img/diski/real/project-5.jpg','assets/img/diski/real/project-6.jpg',
 'assets/img/diski/real/patsha-onvehicle-3.jpg','assets/img/diski/real/patsha-onvehicle-4.jpg','assets/img/diski/real/patsha-onvehicle-5.jpg'];

var diskiCatLB=null, diskiWorkLB=null;
if(document.getElementById('diskiCatalog')){
 var diskiCatImages=[]; var diskiCatOffsets=[];
 DISKI_CATALOG.forEach(function(m){ diskiCatOffsets.push(diskiCatImages.length); diskiCatImages=diskiCatImages.concat(m.img); });
 diskiCatLB=makeLightbox('diskiCat',diskiCatImages);
 window.diskiCatLB=diskiCatLB;
 document.getElementById('diskiCatalog').innerHTML=DISKI_CATALOG.map(function(m,i){
  return '<article class="card reveal wheel-card"><div class="ph" onclick="diskiCatLB.open('+diskiCatOffsets[i]+')"><img loading="lazy" src="'+m.img[0]+'" alt="'+esc(m.group+' '+m.name)+'"><span class="wheel-photos">'+m.img.length+' фото</span></div>'+
  '<div class="body"><div class="tags"><span class="tag">'+esc(m.group)+'</span><span class="tag">'+esc(m.size)+'</span></div>'+
  '<h3>'+esc(m.group)+' — '+esc(m.name)+'</h3><p>'+esc(m.specs)+'</p>'+
  '<div class="wheel-price">'+esc(m.price)+'</div></div></article>';
 }).join('');
}
if(document.getElementById('diskiGallery')){
 diskiWorkLB=makeLightbox('diskiWork',DISKI_GALLERY);
 window.diskiWorkLB=diskiWorkLB;
 renderGallery('diskiGallery',DISKI_GALLERY,'diskiWorkLB','Внедорожник с дисками, проект ProAvtosvet');
}

// ---- галерея "Автосвет X-Optic Prisma Force" (avtosvet.html) ----
var AVTOSVET_GALLERY=['assets/img/avtosvet/avtosvet-work-01.jpg','assets/img/avtosvet/avtosvet-work-02.jpg','assets/img/avtosvet/avtosvet-work-03.jpg',
 'assets/img/avtosvet/avtosvet-work-04.jpg','assets/img/avtosvet/avtosvet-work-05.jpg','assets/img/avtosvet/avtosvet-work-06.jpg'];
var avtosvetWorkLB=null;
if(document.getElementById('avtosvetGallery')){
 avtosvetWorkLB=makeLightbox('avtosvetWork',AVTOSVET_GALLERY);
 window.avtosvetWorkLB=avtosvetWorkLB;
 renderGallery('avtosvetGallery',AVTOSVET_GALLERY,'avtosvetWorkLB','Установка X-Optic Prisma Force, проект ProAvtosvet');
}
if(document.getElementById('cmp')){
 initCompareSlider('cmp','cmpAfter','cmpHandle');
}

// ---- досканировать .reveal после динамического рендера каталога/галерей ----
// Основной IntersectionObserver (см. "sticky header + reveal" выше) создаётся
// и сканирует DOM РАНЬШЕ, чем выполняется рендер каталога дисков и галерей
// на этой странице — иначе эти карточки так и остались бы с opacity:0 навсегда,
// потому что исходный revEls их просто не увидел. Подключаем их отдельно.
(function(){
 var freshReveals=[].slice.call(document.querySelectorAll('.reveal:not(.in)'));
 if(typeof io!=='undefined' && io){
  freshReveals.forEach(function(el){ io.observe(el); });
 }else{
  freshReveals.forEach(function(el){ el.classList.add('in'); });
 }
})();
