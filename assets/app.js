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
// Цены — плейсхолдеры ("от ХХХ ХХХ ₸" из ТЗ), замените на реальные, когда пришлют.
// x/y — позиция точки в % от ширины/высоты фото (assets/img/interactive-car.png).
// Фото — реальный проект клиента, фон вырезан (прозрачный PNG, обрезан по машине).
// Камуфляжная плёнка — а не Z-PRO, поэтому у палатки, маркизы и Z-PRO нет точки на
// этом фото — их не видно на этой конкретной машине, они остаются доступны для
// выбора только в чеклисте формы.
// x/y — позиция маркера на изображении assets/img/interactive-car.webp в процентах
// (координаты подобраны под это фото — весь комплект виден на одной машине).
var EQUIPMENT=[
 {id:"snorkel",label:"Шноркель",price:"от 350 000 ₸",x:29,y:18},
 {id:"rack",label:"Экспедиционный багажник",price:"от 280 000 ₸",x:44,y:16.5},
 {id:"tent",label:"Палатка на крышу",price:"от 450 000 ₸",x:65,y:6.5},
 {id:"light",label:"Дополнительное освещение",price:"от 150 000 ₸",x:53,y:11},
 {id:"bumper",label:"Усиленный бампер / обвес",price:"от 500 000 ₸",x:17,y:70},
 {id:"wheels",label:"Кованые диски",price:"от 600 000 ₸",x:54,y:81},
 {id:"tires",label:"Грязевая резина",price:"от 400 000 ₸",x:88.5,y:71},
 {id:"steps",label:"Силовые пороги",price:"от 220 000 ₸",x:70,y:72},
 {id:"awning",label:"Маркиза",price:"от 180 000 ₸",x:80,y:13},
 {id:"zpro",label:"Защитное покрытие Z-PRO",price:"от 700 000 ₸",x:80,y:46}
];

function esc(s){return s.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}

// render projects
document.getElementById('slider').innerHTML=PROJECTS.map(function(p){
 return '<article class="card reveal"><div class="ph"><img loading="lazy" src="assets/img/'+p.img+'" alt="'+esc(p.t)+'"></div>'+
 '<div class="body"><h3>'+esc(p.t)+'</h3><div class="tags">'+p.tags.map(function(t){return '<span class="tag">'+esc(t)+'</span>'}).join('')+'</div>'+
 '<p>'+esc(p.d)+'</p></div></article>';
}).join('');

// render works gallery
document.getElementById('worksSlider').innerHTML=WORKS.map(function(f,i){
 return '<div class="wcard reveal" onclick="openLightbox('+i+')"><img loading="lazy" src="assets/img/works/'+f+'" alt="Автомобиль в работе — проект ProAvtosvet '+(i+1)+'"></div>';
}).join('')+
 '<div class="wcard more reveal"><div><div class="n disp">800+</div><div class="sub" style="margin-top:6px">автомобилей уже прошли через наш цех</div>'+
 '<button class="btn grad" style="margin-top:16px;padding:10px 20px;font-size:13px" onclick="jump(\'contacts\')">Хочу так же</button></div></div>';

// ---- интерактивный автомобиль: точки на фото ----
// позиция есть не у всех — то, чего не видно на конкретном фото, точки не получает
// (но остаётся доступно для выбора в чеклисте формы ниже)
document.getElementById('ivDots').innerHTML=EQUIPMENT.filter(function(e){return e.x!=null&&e.y!=null}).map(function(e){
 var edgeCls = (e.x<12 ? ' edge-l' : (e.x>85 ? ' edge-r' : '')) + (e.y<15 ? ' edge-t' : '');
 return '<button type="button" class="iv-dot'+edgeCls+'" style="left:'+e.x+'%;top:'+e.y+'%" data-id="'+e.id+'" '+
  'onclick="toggleDotSelect(this,event)" aria-label="'+esc(e.label)+'">'+
  '<span class="tip"><b>'+esc(e.label)+'</b><i>'+esc(e.price)+'</i></span></button>';
}).join('');

// ---- чеклист «Что хотите установить?» в форме заявки ----
document.getElementById('eqList').innerHTML=EQUIPMENT.map(function(e){
 var onPhoto = e.x!=null&&e.y!=null;
 return '<label class="eq-item"><input type="checkbox" value="'+e.id+'" onchange="setEquip(this.value,this.checked)">'+
  '<span class="eq-name">'+esc(e.label)+(onPhoto?'':' <i class="eq-nophoto">· нет на фото</i>')+'</span><span class="eq-price">'+esc(e.price)+'</span></label>';
}).join('');

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
 if(!lb.classList.contains('open'))return;
 if(e.key==='Escape')closeLightbox();
 if(e.key==='ArrowLeft')lbMove(-1);
 if(e.key==='ArrowRight')lbMove(1);
});
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
window.openLightbox=openLightbox;window.closeLightbox=closeLightbox;window.lbMove=lbMove;

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
  showSent(form,'Заявка принята!','Спасибо! Мы свяжемся с вами и рассчитаем стоимость выбранного оборудования.');
 }).catch(function(err){
  console.error('Lead webhook error:', err);
  if(btn){btn.disabled=false;}
  showSent(form,'Не удалось отправить заявку','Попробуйте ещё раз или позвоните нам напрямую: <a href="tel:+77051108080" style="color:var(--brand)">+7 (705) 110-80-80</a>.',true);
 });
 return false;
}
window.jump=jump;window.toggleMenu=toggleMenu;window.openModal=openModal;window.closeModal=closeModal;window.submitForm=submitForm;
window.submitIvForm=submitIvForm;window.toggleDotSelect=toggleDotSelect;window.toggleEqList=toggleEqList;window.setEquip=setEquip;
