(function(){
  /* ================= icons ================= */
  var IC={
    home:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    cards:'<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6 15h4"/>',
    loans:'<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20.5h18"/>',
    debts:'<path d="M12 3v12M7 10l5 5 5-5M5 20h14"/>',
    lent:'<path d="M12 21V9M7 14l5-5 5 5M5 4h14"/>',
    income:'<path d="M3 17l6-6 4 4 7-8M14 7h6v6"/>',
    expenses:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6"/>',
    gamiyas:'<circle cx="12" cy="12" r="7.5"/><path d="M12 4.5v3M12 16.5v3M4.5 12h3M16.5 12h3"/><circle cx="12" cy="12" r="1.5"/>',
    insurance:'<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    bnpl:'<path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2"/>',
    accounts:'<path d="M4 6h15a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM4 6l12-3v3"/><path d="M15 13h5"/>',
    wallets:'<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18h2"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    close:'<path d="M6 6l12 12M18 6L6 18"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    back:'<path d="M9 6l6 6-6 6"/>'
  };
  function ic(k,s){return '<svg viewBox="0 0 24 24" width="'+(s||20)+'" height="'+(s||20)+'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[k]+'</svg>'}

  /* ================= helpers ================= */
  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function n(v){v=Number(v);return isFinite(v)?v:0}
  function fmt(v){return n(v).toLocaleString('en-US',{minimumFractionDigits:0,maximumFractionDigits:2})}
  function money(v){return '<span class="num">'+fmt(v)+'</span> ج'}
  function today(){var d=new Date();return new Date(d.getFullYear(),d.getMonth(),d.getDate())}
  function parseD(s){var p=String(s||'').split('-');if(p.length!==3)return null;var d=new Date(+p[0],+p[1]-1,+p[2]);return isNaN(d)?null:d}
  function iso(d){var m=d.getMonth()+1,x=d.getDate();return d.getFullYear()+'-'+(m<10?'0':'')+m+'-'+(x<10?'0':'')+x}
  function clampD(y,m,day){var last=new Date(y,m+1,0).getDate();return new Date(y,m,Math.min(day,last))}
  function addMonth(d){return clampD(d.getFullYear(),d.getMonth()+1,d.getDate())}
  function monthsBetween(a,b){return (b.getFullYear()-a.getFullYear())*12+(b.getMonth()-a.getMonth())}
  function daysTo(d){return Math.round((d-today())/864e5)}
  function ym(d){return d.getFullYear()+'-'+(d.getMonth()+1)}
  function rel(days){
    if(days===0)return 'النهاردة'; if(days===1)return 'بكرة'; if(days===2)return 'بعد يومين';
    if(days>2&&days<=10)return 'بعد '+days+' أيام'; if(days>10)return 'بعد '+days+' يوم';
    if(days===-1)return 'متأخر يوم'; if(days===-2)return 'متأخر يومين';
    if(days>=-10)return 'متأخر '+(-days)+' أيام'; return 'متأخر '+(-days)+' يوم';
  }
  function stateOf(days){return days<0?'late':days===0?'today':days<=3?'soon':days<=7?'near':'far'}
  function dl(d){return d?d.toLocaleDateString('ar-EG-u-nu-latn',{weekday:'long',day:'numeric',month:'long'}):'—'}
  function dShort(s){var d=parseD(s);return d?'<span class="num">'+d.toLocaleDateString('en-GB')+'</span>':'—'}
  function mmyy(s){var d=parseD(s);if(!d)return '--/--';var m=d.getMonth()+1;return (m<10?'0':'')+m+'/'+String(d.getFullYear()).slice(2)}
  function uid(){return Math.random().toString(36).slice(2,9)}
  function sum(a,f){return a.reduce(function(t,x,i){return t+n(f(x,i))},0)}
  function digits(s){return String(s||'').replace(/\D/g,'')}
  function groupPan(s){return digits(s).replace(/(\d{4})(?=\d)/g,'$1 ')}
  function maskPan(s){var d=digits(s);return d?'•••• •••• •••• '+d.slice(-4):'•••• •••• •••• ••••'}
  function initials(s){s=String(s||'').trim();return esc(s?s.charAt(0):'؟')}

  /* ================= state ================= */
  var S={cards:[],loans:[],debts:[],lent:[],income:[],expenses:[],v:2};
  var loaded=false, dbErr=null, docRef=null, route='home', sheet=null, revealed={}, confirmDel=null;
  var COLLS={
    cards:{title:'كروتي',one:'كارت',add:'إضافة كارت'},
    loans:{title:'قروضي',one:'قرض',add:'إضافة قرض'},
    debts:{title:'سلف عليّ',one:'سلفة',add:'إضافة سلفة'},
    lent:{title:'فلوسي عند الناس',one:'سلفة',add:'إضافة سلفة'},
    income:{title:'مصادر الدخل',one:'مصدر دخل',add:'إضافة دخل'},
    expenses:{title:'المصروفات الثابتة',one:'مصروف',add:'إضافة مصروف'},
    gamiyas:{title:'جمعياتي',one:'جمعية',add:'إضافة جمعية'},
    insurance:{title:'وثائق التأمين',one:'وثيقة',add:'إضافة وثيقة'},
    bnpl:{title:'كروت التقسيط',one:'حساب تقسيط',add:'إضافة حساب تقسيط'},
    accounts:{title:'حساباتي البنكية',one:'حساب',add:'إضافة حساب'},
    wallets:{title:'أرصدة ومحافظ',one:'رصيد',add:'إضافة محفظة'}
  };
  var KEYS=['cards','loans','debts','lent','income','expenses','gamiyas','insurance','bnpl','accounts','wallets'];
  var ROUTES=['home'].concat(KEYS).concat(['settings']);
  var DAYF={expenses:'day',insurance:'payDay',bnpl:'dueDay'};

  var FIELDS={
    cards:[
      {g:'بيانات الكارت'},
      {k:'name',l:'اسم الكارت',t:'text',req:1},{k:'bank',l:'البنك',t:'text'},
      {k:'number',l:'رقم الكارت',t:'text',ltr:1,mode:'numeric'},{k:'cvv',l:'CVV',t:'text',ltr:1,mode:'numeric'},
      {k:'issue',l:'تاريخ الإصدار',t:'date'},{k:'expiry',l:'تاريخ الانتهاء',t:'date'},
      {k:'limit',l:'الحد الائتماني',t:'number'},{k:'closeDay',l:'يوم تقفيل الكشف',t:'number'},
      {k:'balance',l:'الرصيد الحالي المستخدم',t:'number'},{k:'available',l:'المتاح حسب البنك',t:'number'},
      {g:'الفايدة والغرامة'},
      {k:'rate',l:'الفايدة الشهرية لو ما سددتش ٪',t:'number'},{k:'interestBase',l:'الفايدة بتتحسب',t:'select',opts:['على المتبقي','على كامل الكشف']},
      {k:'feePct',l:'غرامة عدم السداد ٪',t:'number'},
      {k:'feeFixed',l:'رسوم تأخير ثابتة (ج)',t:'number'},
      {k:'overFee',l:'رسوم تجاوز الحد شهريًا (ج)',t:'number'},{k:'overPct',l:'رسوم تجاوز الحد ٪ من المتجاوز',t:'number'},
      {k:'monthlyFee',l:'رسوم شهرية ثابتة (ج)',t:'number'},{k:'monthlyPct',l:'رسوم شهرية ٪ من الرصيد',t:'number'},
      {g:'الكشف الحالي'},
      {k:'statement',l:'المطلوب للسداد',t:'number'},{k:'min',l:'الحد الأدنى',t:'number'},
      {k:'paid',l:'اللي اتسدد',t:'number'},{k:'due',l:'آخر ميعاد للسداد',t:'date'}
    ],
    loans:[
      {g:'بيانات القرض'},
      {k:'name',l:'نوع القرض',t:'text',req:1},{k:'bank',l:'البنك',t:'text'},
      {k:'ref',l:'رقم العقد',t:'text',ltr:1,full:1},
      {k:'amount',l:'قيمة القرض',t:'number'},{k:'outstanding',l:'المتبقي حسب البنك',t:'number'},
      {k:'rate',l:'الفايدة السنوية ٪',t:'number'},{k:'term',l:'المدة بالشهور',t:'number'},
      {k:'start',l:'تاريخ البداية',t:'date'},{k:'maturity',l:'تاريخ الانتهاء',t:'date'},
      {g:'القسط'},
      {k:'installment',l:'قيمة القسط',t:'number'},{k:'nextDue',l:'ميعاد القسط الجاي',t:'date'},
      {k:'penalty',l:'غرامة التأخير (ج)',t:'number'},
      {k:'notes',l:'ملاحظات',t:'area',full:1}
    ],
    debts:[
      {k:'name',l:'الاسم (شخص أو جهة)',t:'text',req:1},{k:'kind',l:'النوع',t:'select',opts:['شخص','جهة']},
      {k:'amount',l:'قيمة السلفة',t:'number'},{k:'date',l:'تاريخ أخذ السلفة',t:'date'},
      {k:'plan',l:'طريقة السداد',t:'area',full:1},{k:'notes',l:'بيان السلفة',t:'area',full:1}
    ],
    lent:[
      {k:'name',l:'الاسم',t:'text',req:1},{k:'amount',l:'المبلغ',t:'number'},
      {k:'date',l:'تاريخ السلفة',t:'date'},{k:'plan',l:'اتفاق الرد',t:'text'},
      {k:'notes',l:'بيان',t:'area',full:1}
    ],
    income:[
      {k:'name',l:'المصدر',t:'text',req:1},{k:'amount',l:'المبلغ الشهري',t:'number'},
      {k:'day',l:'يوم القبض في الشهر',t:'number'},{k:'notes',l:'ملاحظات',t:'area',full:1}
    ],
    expenses:[
      {k:'name',l:'البند',t:'text',req:1},{k:'kind',l:'النوع',t:'select',opts:['مصروف ثابت','التزام']},
      {k:'amount',l:'المبلغ الشهري',t:'number'},{k:'day',l:'يوم الدفع في الشهر',t:'number'},
      {k:'notes',l:'ملاحظات',t:'area',full:1}
    ],
    gamiyas:[
      {g:'بيانات الجمعية'},
      {k:'name',l:'اسم الجمعية',t:'text',req:1},{k:'kind',l:'النوع',t:'select',opts:['تطبيق','جمعية أهلية']},
      {k:'organizer',l:'التطبيق / الشخص المسؤول',t:'text',full:1},
      {k:'installment',l:'القسط الشهري',t:'number'},{k:'installmentBefore',l:'القسط قبل القبض (لو مختلف)',t:'number'},
      {k:'months',l:'عدد الشهور',t:'number'},{k:'start',l:'تاريخ أول قسط',t:'date'},
      {k:'turn',l:'رقم دوري في القبض',t:'number'},{k:'deduct',l:'قسط شهر القبض',t:'select',opts:['بيتخصم من القبض','بيتدفع عادي']},
      {g:'القبض'},
      {k:'payout',l:'مبلغ القبض (فاضي = القسط × الشهور)',t:'number'},{k:'payoutDate',l:'تاريخ القبض (فاضي = حسب الدور)',t:'date'},
      {k:'fees',l:'رسوم أو خصم التطبيق',t:'number'},
      {k:'notes',l:'ملاحظات',t:'area',full:1}
    ],
    insurance:[
      {g:'بيانات الوثيقة'},
      {k:'name',l:'نوع الوثيقة',t:'text',req:1},{k:'company',l:'شركة التأمين',t:'text'},
      {k:'policyNo',l:'رقم الوثيقة',t:'text',ltr:1,full:1},
      {k:'start',l:'تاريخ البداية',t:'date'},{k:'end',l:'تاريخ الانتهاء',t:'date'},
      {g:'القسط والتحصيل'},
      {k:'premium',l:'القسط الشهري',t:'number'},{k:'payDay',l:'يوم دفع القسط',t:'number'},
      {k:'payout',l:'مبلغ التحصيل',t:'number'},{k:'payoutDate',l:'تاريخ التحصيل',t:'date'},
      {k:'notes',l:'ملاحظات',t:'area',full:1}
    ],
    bnpl:[
      {k:'name',l:'الاسم (فاليو، أمان، سهولة…)',t:'text',req:1},{k:'limit',l:'الحد الائتماني',t:'number'},
      {k:'dueDay',l:'يوم السداد في الشهر',t:'number'},{k:'lateFee',l:'غرامة التأخير (ج)',t:'number'},
      {k:'notes',l:'ملاحظات',t:'area',full:1}
    ],
    accounts:[
      {g:'الحساب'},
      {k:'bank',l:'البنك',t:'text',req:1},{k:'name',l:'نوع الحساب',t:'text'},
      {k:'accountNo',l:'رقم الحساب',t:'text',ltr:1},{k:'iban',l:'IBAN',t:'text',ltr:1},
      {k:'balance',l:'الرصيد',t:'number'},{k:'currency',l:'العملة',t:'text',ltr:1},
      {g:'كارت الحساب'},
      {k:'cardNumber',l:'رقم الكارت',t:'text',ltr:1,mode:'numeric'},{k:'cvv',l:'CVV',t:'text',ltr:1,mode:'numeric'},
      {k:'cardExpiry',l:'تاريخ انتهاء الكارت',t:'date'},
      {k:'notes',l:'ملاحظات',t:'area',full:1}
    ],
    wallets:[
      {g:'المحفظة'},
      {k:'name',l:'الاسم',t:'text',req:1},{k:'kind',l:'النوع',t:'select',opts:['محفظة موبايل','محفظة بنكية','كارت مدفوع مسبقًا','عملات رقمية','أخرى']},
      {k:'provider',l:'الجهة (فودافون كاش، تيلدا…)',t:'text'},{k:'number',l:'رقم المحفظة / الموبايل',t:'text',ltr:1},
      {k:'balance',l:'الرصيد',t:'number'},{k:'currency',l:'العملة',t:'text',ltr:1},
      {k:'egp',l:'القيمة بالجنيه (لو عملة تانية)',t:'number',full:1},
      {g:'الكارت (لو فيه)'},
      {k:'cardNumber',l:'رقم الكارت',t:'text',ltr:1,mode:'numeric'},{k:'cvv',l:'CVV',t:'text',ltr:1,mode:'numeric'},
      {k:'cardExpiry',l:'تاريخ الانتهاء',t:'date'},
      {k:'notes',l:'ملاحظات',t:'area',full:1}
    ]
  };

  function normalize(d){
    var o={v:2};
    KEYS.forEach(function(k){o[k]=Array.isArray(d&&d[k])?d[k]:[]});
    if(!d||!d.v||d.v<2){ o.cards.forEach(function(c){ if(n(c.rate)>0&&n(c.rate)<1)c.rate=Math.round(n(c.rate)*10000)/100; if(c.fee!=null&&c.feeFixed==null){c.feeFixed=c.fee;delete c.fee} if(!c.name)c.name=c.bank }) }
    return o;
  }

  /* ================= calculations ================= */
  function calcCard(c){
    var due=parseD(c.due), days=due?daysTo(due):999, st=n(c.statement);
    var rem=Math.max(st-n(c.paid),0), remMin=Math.max(n(c.min)-n(c.paid),0);
    var waiting=!!due&&days<0&&remMin===0&&st>0;
    var nextDue=due; if(waiting){var g=0;while(daysTo(nextDue)<0&&g++<24)nextDue=addMonth(nextDue)}
    var penalty=remMin>0?remMin*n(c.feePct)/100+n(c.feeFixed):0;
    var onFull=c.interestBase==='على كامل الكشف';
    var intNone=rem>0?(onFull?st:rem)*n(c.rate)/100:0;
    var baseMin=Math.max(st-Math.max(n(c.paid),n(c.min)),0), intMin=baseMin>0?(onFull?st:baseMin)*n(c.rate)/100:0;
    var state= st===0||!due?'none': waiting?'wait': rem===0?'done': days<0?'late': days===0?'today': days<=3?'soon': days<=7?'near': remMin===0?'minok':'far';
    var hasBal=c.balance!==''&&c.balance!=null, hasAv=c.available!==''&&c.available!=null;
    var debt=hasBal?n(c.balance):hasAv?Math.max(rem,n(c.limit)-n(c.available)):rem, approx=!hasBal&&hasAv, over=Math.max(debt-n(c.limit),0);
    var overCharge=over>0?Math.max(n(c.overFee),over*n(c.overPct)/100):0;
    var monthly=n(c.monthlyFee)+debt*n(c.monthlyPct)/100, extra=overCharge+monthly;
    return {due:due,days:days,rem:rem,remMin:remMin,waiting:waiting,nextDue:nextDue,penalty:penalty,intNone:intNone,totalNone:rem+intNone+penalty+extra,
      baseMin:baseMin,intMin:intMin,totalMin:baseMin+intMin+extra,overCharge:overCharge,monthly:monthly,extra:extra,state:state,pct:st>0?Math.min(n(c.paid)/st,1):0,
      debt:debt,hasBal:hasBal,approx:approx,over:over,avail:hasAv&&!hasBal?Math.max(n(c.available),0):Math.max(n(c.limit)-debt,0)};
  }
  var CARD_TXT={wait:'بانتظار الكشف الجديد',done:'مسدد بالكامل',minok:'الحد الأدنى اتسدد',none:'مفيش كشف'};
  function cardPill(x){var t=CARD_TXT[x.state]||rel(x.days);return '<span class="pill '+x.state+'">'+t+'</span>'}

  function calcLoan(l){
    var due=parseD(l.nextDue), mat=parseD(l.maturity), days=due?daysTo(due):999;
    var left=(due&&mat&&mat>=due)?monthsBetween(due,mat)+1:(due&&mat?0:null);
    var done=left===0;
    var paidPct=n(l.amount)>0?Math.min(Math.max(1-n(l.outstanding)/n(l.amount),0),1):0;
    return {due:due,mat:mat,days:days,left:left,leftTotal:left!=null?left*n(l.installment):null,done:done,paidPct:paidPct,state:done?'done':due?stateOf(days):'none'};
  }
  function calcDebt(d){
    var paid=sum(d.payments||[],function(p){return p.amount}), rem=Math.max(n(d.amount)-paid,0);
    var plan=(d.schedule||[]).map(function(s,i){return {s:s,i:i,d:parseD(s.date)}}).filter(function(o){return !o.s.done}).sort(function(a,b){return (a.d||0)-(b.d||0)});
    return {paid:paid,rem:rem,pct:n(d.amount)>0?Math.min(paid/n(d.amount),1):0,done:n(d.amount)>0&&rem===0,plan:plan,next:plan[0]||null,
      planned:sum(plan,function(o){return o.s.amount})};
  }
  function calcMonthly(dayV,paidMonth){
    var day=n(dayV); if(!day)return {due:null,paid:false,state:'none',key:''};
    var t=today(), occ=clampD(t.getFullYear(),t.getMonth(),day), paid=paidMonth===ym(occ);
    var due=paid?clampD(t.getFullYear(),t.getMonth()+1,day):occ, days=daysTo(due);
    return {due:due,days:days,paid:paid,state:paid?'paid':stateOf(days),key:ym(occ)};
  }
  function calcExp(e){return calcMonthly(e.day,e.paidMonth)}
  function addMonths(d,k){return clampD(d.getFullYear(),d.getMonth()+k,d.getDate())}
  function countPast(st,m){var c=0;for(var i=0;i<m;i++)if(daysTo(addMonths(st,i))<0)c++;return c}
  function gamSched(g){
    var st=parseD(g.start), m=n(g.months), t=n(g.turn), ded=g.deduct!=='بيتدفع عادي', before=g.installmentBefore!==''&&g.installmentBefore!=null&&n(g.installmentBefore)>0, out=[];
    for(var i=0;i<m;i++){var isPay=t>0&&i===t-1, amt=(before&&t>0&&i<t-1)?n(g.installmentBefore):n(g.installment);
      out.push({i:i,d:st?addMonths(st,i):null,amt:isPay&&ded?0:amt,payout:isPay,ded:isPay&&ded})}
    return out;
  }
  function calcGam(g){
    var st=parseD(g.start), m=n(g.months), sc=gamSched(g), pc=Math.min(n(g.paidCount),m);
    var idx=-1; for(var i=pc;i<sc.length;i++){if(sc[i].amt>0){idx=i;break}}
    var done=m>0&&idx<0, next=st&&idx>=0?sc[idx].d:null, nextAmt=idx>=0?sc[idx].amt:0;
    var t=n(g.turn), pd=parseD(g.payoutDate)||(st&&t?addMonths(st,t-1):null);
    var payout=(g.payout!==''&&g.payout!=null)?n(g.payout):n(g.installment)*m-(t&&g.deduct!=='بيتدفع عادي'?n(g.installment):0)-n(g.fees);
    var leftTotal=sum(sc.slice(pc),function(s){return s.amt}), paidTotal=sum(sc.slice(0,pc),function(s){return s.amt});
    return {sc:sc,idx:idx,next:next,nextAmt:nextAmt,days:next?daysTo(next):999,state:done?'done':next?stateOf(daysTo(next)):'none',done:done,pc:pc,m:m,
      left:sc.slice(pc).filter(function(s){return s.amt>0}).length,leftTotal:leftTotal,paidTotal:paidTotal,pd:pd,pdays:pd?daysTo(pd):null,payout:payout,
      received:!!g.received,end:st&&m?addMonths(st,m-1):null,pct:m?pc/m:0};
  }
  function calcIns(p){
    var end=parseD(p.end), active=!end||daysTo(end)>=0;
    var mo=active?calcMonthly(p.payDay,p.paidMonth):{due:null,state:'done',paid:false};
    var left=mo.due&&end?(end>=mo.due?monthsBetween(mo.due,end)+1:0):null;
    var pd=parseD(p.payoutDate);
    return {end:end,active:active,mo:mo,left:left,leftTotal:left!=null?left*n(p.premium):null,pd:pd,pdays:pd?daysTo(pd):null};
  }
  function calcPlan(p){
    var st=parseD(p.start), m=n(p.months); if(!st||!m)return {left:0,end:null,active:false,rem:0};
    var left=m-countPast(st,m);
    return {left:left,end:addMonths(st,m-1),active:left>0,rem:left*n(p.monthly),next:left>0?addMonths(st,m-left):null};
  }
  function calcBnpl(b){
    var plans=b.plans||[], ps=plans.map(calcPlan);
    var monthly=sum(plans.filter(function(p,i){return ps[i].active}),function(p){return p.monthly});
    var out=sum(ps,function(x){return x.rem});
    var mo=monthly>0?calcMonthly(b.dueDay,b.paidMonth):{due:null,state:'none',paid:false};
    return {ps:ps,monthly:monthly,out:out,avail:Math.max(n(b.limit)-out,0),mo:mo};
  }
  function egpVal(o){var c=String(o.currency||'').trim().toUpperCase();return (!c||c==='EGP'||c==='جنيه'||c==='ج')?n(o.balance):n(o.egp)}

  /* ================= persistence ================= */
  var saving=false,pending=false;
  function setSync(t){document.getElementById('sync').textContent=t}
  function save(){ if(!lsSet(LS_STATE,JSON.stringify(S)))toast('ماتحفظش: مساحة الموبايل أو التخزين مقفول'); }
  function mutate(fn){fn();save();renderAll()}

  /* ================= toast ================= */
  var toastT=null;
  function toast(m){var el=document.getElementById('toast');el.innerHTML='<div class="toast" role="status">'+esc(m)+'</div>';clearTimeout(toastT);toastT=setTimeout(function(){el.innerHTML=''},2400)}

  /* ================= nav ================= */
  var navOpen=false;
  function renderNav(){
    function a(r,label){return '<a href="#'+r+'" class="'+(route===r?'on':'')+'" data-nav="'+r+'">'+ic(r)+'<span>'+label+'</span>'+(S[r]&&loaded?'<span class="cnt num">'+S[r].length+'</span>':'')+'</a>'}
    function g(t){return '<div class="grp">'+t+'</div>'}
    document.getElementById('nav').innerHTML=
      '<div class="brand"><div><b>3bhady</b><small>finance tracker · v'+esc(window.APP_VERSION||'')+'</small></div><button class="icon-btn close-nav" data-act="close-nav" aria-label="قفل القائمة">'+ic('close')+'</button></div>'+
      a('home','الرئيسية')+
      g('التزاماتي')+a('cards','كروتي')+a('loans','قروضي')+a('bnpl','كروت التقسيط')+a('gamiyas','جمعياتي')+a('insurance','وثائق التأمين')+
      g('فلوسي')+a('accounts','حساباتي البنكية')+a('wallets','أرصدة ومحافظ')+
      g('السلف')+a('debts','سلف عليّ')+a('lent','فلوسي عند الناس')+
      g('شهريًا')+a('income','مصادر الدخل')+a('expenses','المصروفات الثابتة')+g('البرنامج')+a('settings','الإعدادات والتحديث');
    document.getElementById('nav').classList.toggle('open',navOpen);
    document.getElementById('navScrim').hidden=!navOpen;
  }
  function setNav(o){navOpen=o;renderNav()}

  /* ================= screens ================= */
  function tile(k,v,hl){return '<div class="tile'+(hl?' hl':'')+'"><div class="k">'+k+'</div><div class="v">'+v+'</div></div>'}

  function agendaItems(){
    var items=[];
    S.cards.forEach(function(c){var x=calcCard(c);if(x.state==='none'||x.state==='done')return;
      if(x.waiting)items.push({coll:'cards',id:c.id,name:c.name,sub:'كارت · بانتظار الكشف الجديد',date:x.nextDue,days:daysTo(x.nextDue),amt:null,full:x.rem,state:'wait'});
      else items.push({coll:'cards',id:c.id,name:c.name,sub:'كارت · '+(c.bank||''),date:x.due,days:x.days,amt:x.remMin,full:x.rem,state:x.state});});
    S.loans.forEach(function(l){var x=calcLoan(l);if(!x.due||x.done)return;
      items.push({coll:'loans',id:l.id,name:l.name,sub:'قسط · '+(l.bank||''),date:x.due,days:x.days,amt:n(l.installment),full:n(l.installment),state:x.state});});
    S.expenses.forEach(function(e){var x=calcExp(e);if(!x.due)return;
      items.push({coll:'expenses',id:e.id,name:e.name,sub:(e.kind||'مصروف')+(x.paid?' · اتدفع الشهر ده':''),date:x.due,days:x.days,amt:n(e.amount),full:n(e.amount),state:x.paid?'paid':x.state});});
    S.gamiyas.forEach(function(g){var x=calcGam(g);
      if(x.next)items.push({coll:'gamiyas',id:g.id,name:g.name,sub:'قسط جمعية'+(g.organizer?' · '+g.organizer:''),date:x.next,days:x.days,amt:x.nextAmt,full:x.nextAmt,state:x.state});
      if(x.pd&&!x.received)items.push({coll:'gamiyas',id:g.id,name:g.name,sub:'قبض الجمعية',date:x.pd,days:x.pdays,amt:null,inc:x.payout,state:'inc'});});
    S.insurance.forEach(function(p){var x=calcIns(p);
      if(x.mo.due)items.push({coll:'insurance',id:p.id,name:p.name,sub:'قسط تأمين'+(p.company?' · '+p.company:''),date:x.mo.due,days:x.mo.days,amt:n(p.premium),full:n(p.premium),state:x.mo.paid?'paid':x.mo.state});
      if(x.pd&&x.pdays>=0)items.push({coll:'insurance',id:p.id,name:p.name,sub:'تحصيل الوثيقة',date:x.pd,days:x.pdays,amt:null,inc:n(p.payout),state:'inc'});});
    ['debts','lent'].forEach(function(cl){S[cl].forEach(function(dbt){calcDebt(dbt).plan.forEach(function(o){if(!o.d)return;
      if(cl==='debts')items.push({coll:cl,id:dbt.id,name:dbt.name,sub:'سداد سلفة'+(o.s.note?' · '+o.s.note:''),date:o.d,days:daysTo(o.d),amt:n(o.s.amount),full:n(o.s.amount),state:stateOf(daysTo(o.d))});
      else items.push({coll:cl,id:dbt.id,name:dbt.name,sub:'هيرجّع'+(o.s.note?' · '+o.s.note:''),date:o.d,days:daysTo(o.d),amt:null,inc:n(o.s.amount),state:'inc'});})})});
    S.bnpl.forEach(function(b){var x=calcBnpl(b);if(!x.mo.due)return;
      items.push({coll:'bnpl',id:b.id,name:b.name,sub:'قسط تقسيط',date:x.mo.due,days:x.mo.days,amt:x.monthly,full:x.out,state:x.mo.paid?'paid':x.mo.state});});
    return items.sort(function(a,b){return a.days-b.days});
  }

  /* ---------- where each home number comes from ---------- */
  var BD_KEYS={inc:'الدخل',exp:'المصروفات والالتزامات الثابتة',inst:'أقساط القروض',mins:'الحد الأدنى للكروت (آخر كشف)',bn:'أقساط التقسيط',gam:'أقساط الجمعيات',ins:'أقساط التأمين'};
  function breakdown(k){
    var R=[], title='', ex='', items;
    function row(name,sub,amt,coll,id,extra){var o={name:name,sub:sub,amt:n(amt),coll:coll,id:id};if(extra)for(var q in extra)o[q]=extra[q];R.push(o)}
    if(k==='today'||k==='w7min'||k==='w7full'){
      items=agendaItems();
      var sel=k==='today'?items.filter(function(i){return i.days<=0&&i.amt>0&&i.state!=='paid'}):items.filter(function(i){return i.days<=7&&i.amt!=null&&i.state!=='paid'});
      title=k==='today'?'المطلوب النهاردة':k==='w7min'?'مطلوب خلال 7 أيام (حد أدنى)':'مطلوب خلال 7 أيام (كامل)';
      ex=k==='today'?'كل قسط أو حد أدنى كارت أو مصروف أو دفعة سلفة ميعاده النهاردة أو عدّى ولسه ما اتعلّمش إنه اتدفع. الكروت بيتحسب منها الباقي من الحد الأدنى بس.'
        :k==='w7min'?'كل حاجة ميعادها خلال 7 أيام من النهاردة أو متأخرة ولسه ما اتدفعتش: الباقي من الحد الأدنى للكروت، أقساط القروض، أقساط الجمعيات والتقسيط والتأمين، المصروفات الثابتة، ودفعات السلف المخططة.'
        :'نفس بنود "الحد الأدنى" بالظبط، بس الكروت محسوبة بكامل الباقي من الكشف بدل الحد الأدنى. ده اللي تدفعه لو عايز تقفل الكروت دي من غير فوايد.';
      sel.forEach(function(i){var amt=k==='w7full'?i.full:i.amt;row(i.name,i.sub+' · '+dl(i.date)+' · '+rel(i.days)+(i.coll==='cards'&&i.amt===0?' · الحد الأدنى اتسدد'+(k==='w7full'?'، ده باقي الكشف':''):''),amt,i.coll,i.id)});
    }else if(k==='cardDebt'){
      title='مديونية الكروت';ex='مجموع اللي عليك في كل كارت. لو مسجل رصيد حالي من البنك بيتاخد هو. لو مش مسجل وانت قايل إن المتاح صفر، بيتحسب على الأقل قد الحد الائتماني (أو باقي الكشف لو أكبر). غير كده بيتحسب من آخر كشف ناقص اللي اتسدد.';
      S.cards.forEach(function(c){var x=calcCard(c);
        var how=x.hasBal?'رصيد حالي مسجل'+(c.balanceAt?' يوم '+iso(parseD(c.balanceAt)).split('-').reverse().join('/'):''):x.approx?(x.debt===x.rem?'باقي الكشف '+fmt(c.statement)+' − اتسدد '+fmt(c.paid)+' (أكبر من الحد)':'تقريبي: الحد '+fmt(c.limit)+' والمتاح '+fmt(c.available)):'آخر كشف '+fmt(c.statement)+' − اتسدد '+fmt(c.paid);
        row(c.name,how+(x.over?' · أوفر ليمت '+fmt(x.over):''),x.debt,'cards',c.id)});
    }else if(k==='loanOut'){
      title='متبقي القروض';ex='المتبقي من أصل كل قرض زي ما هو ظاهر في تطبيق البنك (خانة "المتبقي حسب البنك")، من غير الفوايد اللي لسه جاية. إجمالي الأقساط المتبقية بالفوايد موجود جوّه كل قرض.';
      S.loans.forEach(function(l){var x=calcLoan(l);row(l.name,(l.bank||'')+' · من '+fmt(l.amount)+(x.left!=null?' · باقي '+x.left+' قسط = '+fmt(x.leftTotal)+' بالفوايد':''),l.outstanding,'loans',l.id)});
    }else if(k==='bnplOut'){
      title='متبقي التقسيط';ex='مجموع الأقساط اللي لسه ما جاش ميعادها في كل حساب تقسيط (عدد الأقساط الباقية × القسط).';
      S.bnpl.forEach(function(b){var x=calcBnpl(b);row(b.name,'قسط شهري '+fmt(x.monthly),x.out,'bnpl',b.id)});
    }else if(k==='debtsRem'||k==='lentRem'){
      var cl=k==='debtsRem'?'debts':'lent';title=k==='debtsRem'?'سلف عليّ':'فلوسي عند الناس';
      ex=k==='debtsRem'?'لكل شخص: قيمة السلفة ناقص الدفعات اللي اتسجلت إنها اتدفعت.':'لكل شخص: المبلغ اللي سلفته ناقص اللي رجعلك.';
      S[cl].forEach(function(d){var x=calcDebt(d);row(d.name,'من '+fmt(d.amount)+' − اتسدد '+fmt(x.paid)+(x.next&&x.next.d?' · الجاي '+fmt(x.next.s.amount)+' '+dl(x.next.d):''),x.rem,cl,d.id)});
    }else if(k==='balances'){
      title='أرصدة الحسابات والمحافظ';ex='رصيد كل حساب بنكي ومحفظة بالجنيه زي ما اتسجل آخر مرة. الحسابات اللي بالسالب بتنقص من الإجمالي. العملات التانية بتتحسب بقيمتها بالجنيه.';
      S.accounts.forEach(function(a){row(a.bank+' · '+(a.name||''),(a.accountNo?'حساب '+a.accountNo:'')+(a.balanceAt?' · آخر تحديث '+iso(parseD(a.balanceAt)).split('-').reverse().join('/'):''),egpVal(a),'accounts',a.id)});
      S.wallets.forEach(function(w){var c=String(w.currency||'').trim();row(w.name,(w.kind||'')+(c&&c.toUpperCase()!=='EGP'?' · '+fmt(w.balance)+' '+c:''),egpVal(w),'wallets',w.id)});
    }else if(k==='inc'){
      title='الدخل الشهري';ex='مجموع مصادر الدخل الشهرية المسجلة.';
      S.income.forEach(function(i){row(i.name,n(i.day)?'يوم '+i.day+' كل شهر':'',i.amount,'income',i.id)});
    }else if(k==='exp'){
      title='المصروفات والالتزامات الثابتة';ex='كل مصروف أو التزام شهري ثابت مسجل.';
      S.expenses.forEach(function(e){row(e.name,(e.kind||'')+(n(e.day)?' · يوم '+e.day:''),e.amount,'expenses',e.id)});
    }else if(k==='inst'){
      title='أقساط القروض';ex='قسط كل قرض لسه شغال (القروض اللي خلصت مش محسوبة).';
      S.loans.forEach(function(l){if(!calcLoan(l).done)row(l.name,(l.bank||'')+(l.nextDue?' · الجاي '+dl(parseD(l.nextDue)):''),l.installment,'loans',l.id)});
    }else if(k==='mins'){
      title='الحد الأدنى للكروت';ex='الحد الأدنى في آخر كشف متسجل لكل كارت، كتقدير للي هتدفعه كل شهر. الكروت اللي لسه ما اتحطلهاش كشف نوفمبر محسوبة بكشف أكتوبر، فالرقم هيتغير لما الكشوف الجديدة تتسجل.';
      S.cards.forEach(function(c){var x=calcCard(c);row(c.name,x.waiting?'كشف قديم: ميعاده '+dl(x.due):'آخر ميعاد '+dl(x.due),c.min,'cards',c.id)});
    }else if(k==='bn'){
      title='أقساط التقسيط';ex='قسط الشهر لكل حساب تقسيط (مجموع المشتريات المقسطة اللي لسه شغالة).';
      S.bnpl.forEach(function(b){row(b.name,'',calcBnpl(b).monthly,'bnpl',b.id)});
    }else if(k==='gam'){
      title='أقساط الجمعيات';ex='القسط الجاي في كل جمعية. لو شهر القبض بيتخصم من القبض مش بيتحسب.';
      S.gamiyas.forEach(function(g){var x=calcGam(g);row(g.name,x.next?'الجاي '+dl(x.next):'خلصت',x.nextAmt,'gamiyas',g.id)});
    }else if(k==='ins'){
      title='أقساط التأمين';ex='القسط الشهري لكل وثيقة لسه سارية. الوثايق اللي قسطها مش متسجل محسوبة صفر.';
      S.insurance.forEach(function(p){if(calcIns(p).active)row(p.name,(p.company||'')+(p.premium===''||p.premium==null?' · القسط مش متسجل':''),p.premium,'insurance',p.id)});
    }else if(k==='afterSalary'){
      var t0=today(), eom=new Date(t0.getFullYear(),t0.getMonth()+1,0), mName=t0.toLocaleDateString('ar-EG-u-nu-latn',{month:'long'});
      title='المتبقي من المرتب بعد مطلوب '+mName;
      ex='الدخل الشهري ناقص كل اللي لسه ما اتدفعش ومطلوب لحد آخر '+mName+' (والمتأخر كمان): الأقساط والجمعيات والمصروفات ودفعات السلف والحد الأدنى للكروت. الكروت اللي كشفها الجديد لسه ما اتسجلش محسوبة تقديريًا بالحد الأدنى بتاع آخر كشف.';
      row('الدخل الشهري','المرتب وأي دخل تاني متسجل',breakdown('inc').total,null,null,{bd:'inc',sign:1});
      agendaItems().forEach(function(i){
        if(!i.date||i.date>eom||i.state==='paid'||i.inc!=null)return;
        if(i.state==='wait'&&i.coll==='cards'){var cc=find('cards',i.id);if(cc&&n(cc.min)>0)row(i.name,'تقديري: الحد الأدنى في آخر كشف · الكشف الجديد ميعاده حوالي '+dl(i.date),cc.min,'cards',i.id,{sign:-1});return}
        if(i.amt>0)row(i.name,i.sub+' · '+dl(i.date)+' · '+rel(i.days),i.amt,i.coll,i.id,{sign:-1});
      });
      return {title:title,ex:ex,rows:R,total:sum(R,function(r){return r.sign*r.amt}),net:1};
    }else if(k==='net'){
      title='الصافي الشهري';ex='الدخل الشهري ناقص كل الالتزامات الشهرية. دوس على أي بند تشوف تفاصيله.';
      row('الدخل','',breakdown('inc').total,null,null,{bd:'inc',sign:1});
      Object.keys(BD_KEYS).forEach(function(q){if(q!=='inc')row(BD_KEYS[q],'',breakdown(q).total,null,null,{bd:q,sign:-1})});
      return {title:title,ex:ex,rows:R,total:sum(R,function(r){return r.sign*r.amt}),net:1};
    }
    return {title:title,ex:ex,rows:R,total:sum(R,function(r){return r.amt})};
  }
  function bdHtml(k){
    var b=breakdown(k);
    var h='<div class="tiles">'+tile('الإجمالي',money(b.total),1)+tile('عدد البنود','<span class="num">'+b.rows.length+'</span>')+'</div><p class="note">'+b.ex+'</p>';
    if(!b.rows.length)return h+'<div class="list"><div class="empty">مفيش بنود داخلة في الرقم ده دلوقتي.</div></div>';
    return h+'<div class="list">'+b.rows.map(function(r){
      var attrs=r.bd?'data-act="bd" data-k="'+r.bd+'"':r.coll?'data-act="open" data-coll="'+r.coll+'" data-id="'+esc(r.id)+'"':'';
      var v=(r.sign===-1?'− ':r.sign===1?'+ ':'')+money(r.amt);
      return '<button class="item" '+attrs+'><div class="main"><div class="t">'+esc(r.name)+'</div>'+(r.sub?'<div class="s">'+esc(r.sub)+'</div>':'')+'</div><div class="end"><div class="v'+(r.amt<0?'" style="color:var(--bad)':'')+'">'+v+'</div></div></button>'}).join('')+
      '<div class="item" style="background:var(--surface2)"><div class="main"><div class="t">الإجمالي</div></div><div class="end"><div class="v">'+money(b.total)+'</div></div></div></div>';
  }

  function screenHome(){
    var items=agendaItems(), urgent=items.filter(function(i){return i.days<=0&&i.amt>0&&i.state!=='paid'});
    var h=backupBanner()+'<section class="hero" aria-live="polite">';
    if(urgent.length){
      var tot=sum(urgent,function(i){return i.amt}), anyLate=urgent.some(function(i){return i.days<0});
      h+='<button class="lead bad lead-btn tap" data-act="bd" data-k="today">'+(anyLate?'عندك سداد متأخر ومستحق':'لازم تدفع النهاردة')+': '+money(tot)+'</button>';
      h+='<div class="list">'+urgent.map(itemRow).join('')+'</div>';
    }else{
      var next=items.filter(function(i){return i.days>0&&i.amt>0&&i.state!=='paid'})[0];
      h+='<p class="lead ok">مفيش دفع مستحق النهاردة</p>';
      if(next)h+='<p>أقرب ميعاد: <b>'+esc(next.name)+'</b> '+rel(next.days)+' ('+dl(next.date)+') — '+money(next.amt)+(next.coll==='cards'&&next.full>next.amt?' حد أدنى، والكامل '+money(next.full):'')+'</p>';
    }
    var week=items.filter(function(i){return i.days>0&&i.days<=7&&i.amt>0&&i.state!=='paid'});
    if(week.length){
      h+='<button class="lead-btn tap" style="font-size:16px" data-act="bd" data-k="w7min">وخلال الأسبوع ده: '+money(sum(week,function(i){return i.amt}))+'</button>';
      h+='<div class="list">'+week.map(itemRow).join('')+'</div>';
    }
    var aS=breakdown('afterSalary');
    h+='<button class="tile tap" data-act="bd" data-k="afterSalary" style="background:var('+(aS.total<0?'--bad-bg':'--ok-bg')+');border-color:transparent">'+
      '<div class="k">'+esc(aS.title)+'</div><div class="v" style="color:var('+(aS.total<0?'--bad':'--ok')+')">'+money(aS.total)+'</div>'+
      '<div class="fine">'+money(breakdown('inc').total)+' دخل − '+money(sum(aS.rows.filter(function(r){return r.sign<0}),function(r){return r.amt}))+' مطلوب ('+(aS.rows.length-1)+' بند)</div></button>';
    h+='</section>';
    function T(k,key,hl){var b=breakdown(key);return '<button class="tile tap'+(hl?' hl':'')+'" data-act="bd" data-k="'+key+'"><div class="k">'+k+'</div><div class="v">'+money(b.total)+'</div></button>'}
    h+='<section class="sec"><div class="sec-head"><h2>الصورة العامة</h2><span class="fine">دوس على أي رقم تشوف تفاصيله</span></div><div class="tiles">'+
      T('مطلوب خلال 7 أيام (حد أدنى)','w7min',1)+T('مطلوب خلال 7 أيام (كامل)','w7full')+
      T('مديونية الكروت','cardDebt')+T('متبقي القروض','loanOut')+T('متبقي التقسيط','bnplOut')+
      T('سلف عليّ','debtsRem')+T('فلوسي عند الناس','lentRem')+T('أرصدة الحسابات والمحافظ','balances',1)+'</div></section>';
    var inc=breakdown('inc').total;
    function B(label,key,minus){return '<button class="r tap" data-act="bd" data-k="'+key+'"><span class="k">'+label+'</span><span class="v">'+(minus?'− ':'')+money(breakdown(key).total)+'</span></button>'}
    var net=breakdown('net').total;
    h+='<section class="sec"><h2>الميزانية الشهرية</h2><div class="rows">'+
      B('الدخل','inc')+B('المصروفات والالتزامات الثابتة','exp',1)+B('أقساط القروض','inst',1)+B('الحد الأدنى للكروت (آخر كشف)','mins',1)+
      B('أقساط التقسيط','bn',1)+B('أقساط الجمعيات','gam',1)+B('أقساط التأمين','ins',1)+
      '<button class="r tap" data-act="bd" data-k="net"><span class="k"><b>الصافي</b></span><span class="v" style="color:var('+(net<0?'--bad':'--ok')+')">'+money(net)+'</span></button></div>'+
      (inc===0?'<p class="note">ضيف مصادر الدخل والمصروفات الثابتة من القائمة عشان الصافي يبقى مظبوط.</p>':'')+'</section>';
    var up=items.filter(function(i){return i.days>0&&i.days<=31});
    h+='<section class="sec"><div class="sec-head"><h2>المواعيد الجاية (31 يوم)</h2></div>'+
      (up.length?'<div class="list">'+up.map(itemRow).join('')+'</div>':'<div class="list"><div class="empty">مفيش مواعيد خلال الشهر الجاي.</div></div>')+'</section>';
    return h;
  }
  function itemRow(i){
    var pill=i.state==='wait'?'<span class="pill wait">بانتظار الكشف</span>':i.state==='paid'?'<span class="pill paid">اتدفع</span>':i.state==='inc'?'<span class="pill inc">قبض '+rel(i.days)+'</span>':'<span class="pill '+i.state+'">'+rel(i.days)+'</span>';
    if(i.coll==='cards'&&i.amt===0&&i.state!=='wait')pill='<span class="pill minok">الحد الأدنى اتسدد</span>';
    var amt=i.inc!=null?'<div class="v inc">+ '+money(i.inc)+'</div>':(i.coll==='cards'&&i.amt===0)?'<div class="v">'+money(i.full)+'</div>':'<div class="v">'+(i.amt==null?'—':money(i.amt))+'</div>';
    return '<button class="item" data-act="open" data-coll="'+i.coll+'" data-id="'+esc(i.id)+'"><div class="main"><div class="t">'+esc(i.name)+'</div><div class="s">'+esc(i.sub)+' · '+dl(i.date)+'</div></div>'+
      '<div class="end">'+amt+pill+'</div></button>';
  }

  var FACES=['#173a6b,#2a6fb4','#0e4a46,#1d8c7c','#3c1e52,#7d3f93','#25292f,#5b626d','#5a1d24,#a83c42','#4b360f,#a37b2b','#113a24,#2f8150','#1d2c46,#4c6d98'];
  function faceBg(c,i){var k=0,s=String(c.id||i);for(var j=0;j<s.length;j++)k=(k*31+s.charCodeAt(j))%997;var f=FACES[(c.color!=null?n(c.color):k)%FACES.length].split(',');return 'background:linear-gradient(135deg,'+f[0]+','+f[1]+')'}
  function face(c,i,show){
    return '<div class="face" style="'+faceBg(c,i)+'"><div class="row"><div><div class="bk">'+esc(c.bank||c.name)+'</div><div class="nm">'+esc(c.name!==c.bank?c.name:'')+'</div></div><div class="chip"></div></div>'+
      '<div class="pan">'+(show?esc(groupPan(c.number)||'—'):maskPan(c.number))+'</div>'+
      '<div class="meta"><span><b>LIMIT</b>'+fmt(c.limit)+'</span><span><b>ISSUED</b>'+mmyy(c.issue)+'</span><span><b>EXPIRES</b>'+mmyy(c.expiry)+'</span>'+(show?'<span><b>CVV</b>'+esc(c.cvv||'—')+'</span>':'')+'</div></div>';
  }
  function screenCards(){
    var xs=S.cards.map(calcCard);
    var h='<section class="tiles">'+
      tile('عدد الكروت','<span class="num">'+S.cards.length+'</span>')+
      tile('إجمالي الحدود',money(sum(S.cards,function(c){return c.limit})))+
      tile('إجمالي المديونية',money(sum(xs,function(x){return x.debt})),1)+
      tile('المتاح تقريبًا',money(sum(xs,function(x){return x.avail})))+
      (sum(xs,function(x){return x.over})>0?'<div class="tile" style="background:var(--bad-bg);border-color:transparent"><div class="k">أوفر ليمت</div><div class="v" style="color:var(--bad)">'+money(sum(xs,function(x){return x.over}))+'</div></div>':'')+
      tile('باقي حد أدنى مستحق',money(sum(xs,function(x){return x.waiting?0:x.remMin})))+'</section>';
    if(!S.cards.length)return h+'<div class="list"><div class="empty">مفيش كروت لسه. دوس "إضافة كارت".</div></div>';
    h+='<section class="cards-grid">'+S.cards.map(function(c,i){var x=xs[i];
      return '<button class="ccard" data-act="open" data-coll="cards" data-id="'+esc(c.id)+'" aria-label="'+esc(c.name)+'">'+face(c,i,false)+
        '<div class="under"><span>'+(x.hasBal?'الرصيد الحالي':x.approx?'المديونية على الأقل':'المديونية')+' <b>'+money(x.debt)+'</b>'+(x.over?' <span class="pill late">أوفر ليمت '+money(x.over)+'</span>':'')+'</span>'+cardPill(x)+'</div>'+
        '<div class="under fine"><span>فايدة '+fmt(c.rate)+'٪ شهريًا · غرامة '+(n(c.feePct)?fmt(c.feePct)+'٪':'')+(n(c.feePct)&&n(c.feeFixed)?' + ':'')+(n(c.feeFixed)?fmt(c.feeFixed)+' ج':'')+(!n(c.feePct)&&!n(c.feeFixed)?'—':'')+'</span><span>'+(x.waiting?'الجاي '+dl(x.nextDue):x.due?dl(x.due):'')+'</span></div></button>'}).join('')+'</section>';
    return h;
  }
  function screenLoans(){
    var xs=S.loans.map(calcLoan);
    var h='<section class="tiles">'+
      tile('إجمالي القروض',money(sum(S.loans,function(l){return l.amount})))+
      tile('المتبقي حسب البنوك',money(sum(S.loans,function(l){return l.outstanding})),1)+
      tile('الأقساط الشهرية',money(sum(S.loans,function(l,i){return xs[S.loans.indexOf(l)].done?0:l.installment})))+'</section>';
    if(!S.loans.length)return h+'<div class="list"><div class="empty">مفيش قروض لسه. دوس "إضافة قرض".</div></div>';
    h+='<div class="list">'+S.loans.map(function(l,i){var x=xs[i];
      return '<button class="item" data-act="open" data-coll="loans" data-id="'+esc(l.id)+'"><div class="ava">'+ic('loans',18)+'</div><div class="main"><div class="t">'+esc(l.name)+'</div>'+
        '<div class="s">'+esc(l.bank||'')+' · قسط '+money(l.installment)+(x.left!=null?' · باقي <span class="num">'+x.left+'</span> قسط':'')+'</div>'+
        '<div class="bar" style="margin-top:6px"><i style="width:'+Math.round(x.paidPct*100)+'%"></i></div></div>'+
        '<div class="end"><div class="v">'+money(l.outstanding)+'</div><span class="pill '+x.state+'">'+(x.done?'خلص':x.due?rel(x.days):'—')+'</span></div></button>'}).join('')+'</div>';
    return h;
  }
  function screenDebts(coll){
    var arr=S[coll], xs=arr.map(calcDebt), lent=coll==='lent';
    var h='<section class="tiles">'+
      tile(lent?'إجمالي اللي سلفته':'إجمالي السلف',money(sum(arr,function(d){return d.amount})))+
      tile(lent?'اتردلي':'اتسدد',money(sum(xs,function(x){return x.paid})))+
      tile(lent?'لسه عندهم':'المتبقي عليّ',money(sum(xs,function(x){return x.rem})),1)+'</section>';
    if(!arr.length)return h+'<div class="list"><div class="empty">'+(lent?'مفيش حد مسجل إنه سالف منك. دوس "إضافة سلفة".':'مفيش سلف مسجلة. دوس "إضافة سلفة".')+'</div></div>';
    h+='<div class="list">'+arr.map(function(d,i){var x=xs[i];
      return '<button class="item" data-act="open" data-coll="'+coll+'" data-id="'+esc(d.id)+'"><div class="ava">'+initials(d.name)+'</div><div class="main"><div class="t">'+esc(d.name)+'</div>'+
        '<div class="s">'+(d.kind?esc(d.kind)+' · ':'')+'من '+money(d.amount)+(d.date?' · '+dShort(d.date):'')+(x.next&&x.next.d?' · الجاي '+money(x.next.s.amount)+' '+rel(daysTo(x.next.d)):'')+'</div>'+
        '<div class="bar" style="margin-top:6px"><i style="width:'+Math.round(x.pct*100)+'%"></i></div></div>'+
        '<div class="end"><div class="v">'+money(x.rem)+'</div>'+(x.done?'<span class="pill done">'+(lent?'رجعت':'اتسددت')+'</span>':'<span class="fine">متبقي</span>')+'</div></button>'}).join('')+'</div>';
    return h;
  }
  function screenIncome(){
    var h='<section class="tiles">'+tile('إجمالي الدخل الشهري',money(sum(S.income,function(i){return i.amount})),1)+tile('عدد المصادر','<span class="num">'+S.income.length+'</span>')+'</section>';
    if(!S.income.length)return h+'<div class="list"><div class="empty">ضيف مصادر دخلك (مرتب، شغل، إيجار…) عشان الميزانية الشهرية تتحسب.</div></div>';
    return h+'<div class="list">'+S.income.map(function(i){
      return '<button class="item" data-act="open" data-coll="income" data-id="'+esc(i.id)+'"><div class="ava">'+ic('income',18)+'</div><div class="main"><div class="t">'+esc(i.name)+'</div><div class="s">'+(n(i.day)?'يوم '+esc(i.day)+' كل شهر':'')+(i.notes?' · '+esc(i.notes):'')+'</div></div><div class="end"><div class="v">'+money(i.amount)+'</div></div></button>'}).join('')+'</div>';
  }
  function screenExpenses(){
    var h='<section class="tiles">'+tile('إجمالي شهري',money(sum(S.expenses,function(e){return e.amount})),1)+
      tile('مصروفات ثابتة',money(sum(S.expenses.filter(function(e){return e.kind!=='التزام'}),function(e){return e.amount})))+
      tile('التزامات',money(sum(S.expenses.filter(function(e){return e.kind==='التزام'}),function(e){return e.amount})))+'</section>';
    if(!S.expenses.length)return h+'<div class="list"><div class="empty">ضيف مصروفاتك الثابتة والتزاماتك الشهرية (إيجار، جمعية، نفقة، مدارس…).</div></div>';
    return h+'<div class="list">'+S.expenses.map(function(e){var x=calcExp(e);
      return '<div class="item"><button class="ava" style="border:0" data-act="exp-toggle" data-id="'+esc(e.id)+'" aria-label="'+(x.paid?'إلغاء علامة الدفع':'علّم إنه اتدفع')+'" title="'+(x.paid?'اتدفع الشهر ده':'علّم إنه اتدفع')+'">'+(x.paid?'✓':ic('expenses',18))+'</button>'+
        '<button class="main" style="background:transparent;border:0;text-align:right;padding:0" data-act="open" data-coll="expenses" data-id="'+esc(e.id)+'"><div class="t">'+esc(e.name)+'</div><div class="s">'+esc(e.kind||'مصروف ثابت')+(x.due?' · '+dl(x.due):'')+'</div></button>'+
        '<div class="end"><div class="v">'+money(e.amount)+'</div>'+(x.due?'<span class="pill '+x.state+'">'+(x.paid?'اتدفع':rel(x.days))+'</span>':'')+'</div></div>'}).join('')+'</div>';
  }

  function emptyList(t){return '<div class="list"><div class="empty">'+t+'</div></div>'}
  function screenGamiyas(){
    var xs=S.gamiyas.map(calcGam);
    var h='<section class="tiles">'+
      tile('أقساط الشهر الجاي',money(sum(xs,function(x){return x.nextAmt})),1)+
      tile('مبالغ قبض جاية',money(sum(xs,function(x){return x.received?0:x.payout})))+
      tile('باقي أقساط هتدفعها',money(sum(xs,function(x){return x.leftTotal})))+'</section>';
    if(!S.gamiyas.length)return h+emptyList('ضيف جمعياتك: تطبيقات زي Money Fellows أو جمعيات مع أشخاص، بالقسط ودورك في القبض.');
    return h+'<div class="list">'+S.gamiyas.map(function(g,i){var x=xs[i];
      var pp=x.received?'<span class="pill done">قبضت</span>':x.pd?'<span class="pill inc">القبض '+rel(x.pdays)+'</span>':'';
      return '<button class="item" data-act="open" data-coll="gamiyas" data-id="'+esc(g.id)+'"><div class="ava">'+ic('gamiyas',18)+'</div><div class="main"><div class="t">'+esc(g.name)+'</div>'+
        '<div class="s">'+esc(g.kind||'')+(g.organizer?' · '+esc(g.organizer):'')+' · دفعت <span class="num">'+x.pc+'/'+x.m+'</span>'+(x.pd?' · القبض '+dShort(iso(x.pd)):'')+'</div>'+
        '<div class="bar" style="margin-top:6px"><i style="width:'+Math.round(x.pct*100)+'%"></i></div></div>'+
        '<div class="end"><div class="v">'+money(x.nextAmt||g.installment)+'</div>'+pp+'</div></button>'}).join('')+'</div>';
  }
  function screenInsurance(){
    var xs=S.insurance.map(calcIns);
    var h='<section class="tiles">'+
      tile('أقساط شهرية',money(sum(S.insurance,function(p,i){return xs[i].active?p.premium:0})),1)+
      tile('مبالغ التحصيل',money(sum(S.insurance,function(p){return p.payout})))+
      tile('عدد الوثايق','<span class="num">'+S.insurance.length+'</span>')+'</section>';
    if(!S.insurance.length)return h+emptyList('ضيف وثائق التأمين: القسط الشهري، تاريخ البداية والانتهاء، ومبلغ وتاريخ التحصيل.');
    return h+'<div class="list">'+S.insurance.map(function(p,i){var x=xs[i];
      return '<button class="item" data-act="open" data-coll="insurance" data-id="'+esc(p.id)+'"><div class="ava">'+ic('insurance',18)+'</div><div class="main"><div class="t">'+esc(p.name)+'</div>'+
        '<div class="s">'+esc(p.company||'')+' · من '+dShort(p.start)+' لـ '+dShort(p.end)+(n(p.payout)?' · تحصيل '+money(p.payout):'')+'</div></div>'+
        '<div class="end"><div class="v">'+money(p.premium)+'</div>'+(!x.active?'<span class="pill done">انتهت</span>':x.mo.due?'<span class="pill '+x.mo.state+'">'+(x.mo.paid?'اتدفع':rel(x.mo.days))+'</span>':'')+'</div></button>'}).join('')+'</div>';
  }
  function screenBnpl(){
    var xs=S.bnpl.map(calcBnpl);
    var h='<section class="tiles">'+
      tile('إجمالي الحدود',money(sum(S.bnpl,function(b){return b.limit})))+
      tile('المتبقي عليّ',money(sum(xs,function(x){return x.out})),1)+
      tile('قسط الشهر',money(sum(xs,function(x){return x.monthly})))+
      tile('المتاح',money(sum(xs,function(x){return x.avail})))+'</section>';
    if(!S.bnpl.length)return h+emptyList('ضيف حسابات التقسيط زي فاليو وأمان وسهولة، وجوّه كل حساب ضيف المشتريات المقسطة.');
    return h+'<div class="list">'+S.bnpl.map(function(b,i){var x=xs[i];
      return '<button class="item" data-act="open" data-coll="bnpl" data-id="'+esc(b.id)+'"><div class="ava">'+ic('bnpl',18)+'</div><div class="main"><div class="t">'+esc(b.name)+'</div>'+
        '<div class="s">الحد '+money(b.limit)+' · المتبقي '+money(x.out)+' · <span class="num">'+x.ps.filter(function(p){return p.active}).length+'</span> تقسيط شغال</div></div>'+
        '<div class="end"><div class="v">'+money(x.monthly)+'</div>'+(x.mo.due?'<span class="pill '+x.mo.state+'">'+(x.mo.paid?'اتدفع':rel(x.mo.days))+'</span>':'<span class="fine">شهريًا</span>')+'</div></button>'}).join('')+'</div>';
  }
  function screenBalances(coll){
    var arr=S[coll], acc=coll==='accounts';
    var h='<section class="tiles">'+tile('إجمالي الأرصدة (بالجنيه)',money(sum(arr,egpVal)),1)+tile(acc?'عدد الحسابات':'عدد المحافظ','<span class="num">'+arr.length+'</span>')+'</section>';
    if(!arr.length)return h+emptyList(acc?'ضيف حساباتك البنكية: البنك ورقم الحساب والرصيد وبيانات كارت الحساب.':'ضيف محافظك: فودافون كاش، إنستاباي، كارت Money Fellows، ماي فوري، تيلدا، كليفر، عملات رقمية…');
    return h+'<div class="list">'+arr.map(function(o){
      var cur=String(o.currency||'').trim(), other=cur&&cur.toUpperCase()!=='EGP'&&cur!=='جنيه'&&cur!=='ج';
      var sub=acc?esc(o.name||'')+(o.accountNo?' · <span class="num">•••• '+esc(String(o.accountNo).slice(-4))+'</span>':''):esc(o.kind||'')+(o.provider?' · '+esc(o.provider):'')+(o.number?' · <span class="num">'+esc(o.number)+'</span>':'');
      return '<button class="item" data-act="open" data-coll="'+coll+'" data-id="'+esc(o.id)+'"><div class="ava">'+ic(coll,18)+'</div><div class="main"><div class="t">'+esc(acc?o.bank:o.name)+'</div><div class="s">'+sub+'</div></div>'+
        '<div class="end"><div class="v">'+(other?'<span class="num">'+fmt(o.balance)+' '+esc(cur)+'</span>':money(o.balance))+'</div>'+(other&&n(o.egp)?'<span class="fine">≈ '+money(o.egp)+'</span>':'')+'</div></button>'}).join('')+'</div>';
  }

  function renderMain(){
    var m=document.getElementById('main');
    document.getElementById('screenTitle').textContent=route==='home'?'الرئيسية':route==='settings'?'الإعدادات والتحديث':COLLS[route].title;
    var fab=document.getElementById('fab');
    fab.hidden=route==='home'||route==='settings'||!loaded; if(!fab.hidden)fab.innerHTML=ic('plus')+'<span>'+COLLS[route].add+'</span>';
    if(dbErr){m.innerHTML='<section class="hero"><p class="lead bad">'+esc(dbErr)+'</p><p>جرّب تقفل البرنامج وتفتحه تاني.</p></section>';return}
    if(!loaded){m.innerHTML='<div class="empty">بحمّل البيانات…</div>';return}
    var h= route==='settings'?screenSettings(): route==='home'?screenHome(): route==='cards'?screenCards(): route==='loans'?screenLoans():
           route==='debts'||route==='lent'?screenDebts(route): route==='income'?screenIncome():
           route==='gamiyas'?screenGamiyas(): route==='insurance'?screenInsurance(): route==='bnpl'?screenBnpl():
           route==='accounts'||route==='wallets'?screenBalances(route): screenExpenses();
    m.innerHTML=h;
  }

  /* ================= sheet (details + forms) ================= */
  function find(coll,id){return S[coll].filter(function(x){return x.id===id})[0]}
  function r(k,v){return '<div class="r"><span class="k">'+k+'</span><span class="v">'+v+'</span></div>'}
  function delBtn(coll,id){var key=coll+id;return '<button class="btn sm danger" data-act="del">'+(confirmDel===key?'تأكيد الحذف؟':'حذف')+'</button>'}

  function detailCard(c){
    var x=calcCard(c), i=S.cards.indexOf(c), show=!!revealed[c.id];
    var h=face(c,i,show)+'<div class="actions"><button class="btn sm" data-act="reveal">'+ic('eye',16)+' '+(show?'إخفاء الرقم والـ CVV':'إظهار الرقم والـ CVV')+'</button>'+cardPill(x)+'</div>';
    h+='<div class="rows"><h3>بيانات الكارت</h3>'+r('البنك',esc(c.bank||'—'))+r('رقم الكارت',show?'<span class="num">'+esc(groupPan(c.number)||'—')+'</span>':'<span class="num">'+maskPan(c.number)+'</span>')+
      r('CVV',show?'<span class="num">'+esc(c.cvv||'—')+'</span>':'•••')+r('تاريخ الإصدار',dShort(c.issue))+r('تاريخ الانتهاء',dShort(c.expiry))+
      r('الحد الائتماني',money(c.limit))+(x.hasBal?r('الرصيد الحالي المستخدم',money(c.balance)+(c.balanceAt?' <span class="fine">('+dShort(c.balanceAt)+')</span>':'')):'')+
      (x.approx?r('المديونية على الأقل',money(x.debt)+' <span class="fine">(تقريبي: المتاح '+money(c.available)+')</span>'):'')+
      (x.over?r('أوفر ليمت','<span style="color:var(--bad)">'+money(x.over)+'</span>'):'')+r('المتاح',money(x.avail))+r('يوم تقفيل الكشف',c.closeDay?esc(c.closeDay):'—')+
      r('الفايدة الشهرية لو ما سددتش','<span class="num">'+fmt(c.rate)+'%</span> '+(c.interestBase==='على كامل الكشف'?'على كامل الكشف حتى لو سددت جزء':'على المتبقي بس'))+r('غرامة عدم السداد',(n(c.feePct)?'<span class="num">'+fmt(c.feePct)+'%</span> من الحد الأدنى':'')+(n(c.feePct)&&n(c.feeFixed)?' + ':'')+(n(c.feeFixed)?money(c.feeFixed):'')+(!n(c.feePct)&&!n(c.feeFixed)?'—':''))+
      r('رسوم تجاوز الحد',(n(c.overFee)||n(c.overPct))?(n(c.overPct)?fmt(c.overPct)+'% من المتجاوز، أقل حاجة ':'')+money(c.overFee)+' شهريًا'+(x.over?' · <b style="color:var(--bad)">عليك دلوقتي '+money(x.overCharge)+'</b>':''):'—')+
      r('رسوم شهرية ثابتة',(n(c.monthlyFee)||n(c.monthlyPct))?(n(c.monthlyFee)?money(c.monthlyFee):'')+(n(c.monthlyFee)&&n(c.monthlyPct)?' + ':'')+(n(c.monthlyPct)?fmt(c.monthlyPct)+'% من الرصيد':'')+' ≈ '+money(x.monthly)+' الشهر ده':'—')+'</div>';
    h+='<div class="rows"><h3>الكشف الحالي</h3>'+r('آخر ميعاد سداد',x.due?dl(x.due)+' · '+rel(x.days):'—')+r('المطلوب للسداد',money(c.statement))+r('الحد الأدنى',money(c.min))+
      r('اللي اتسدد',money(c.paid))+r('باقي من الحد الأدنى',money(x.remMin))+r('باقي من المديونية',money(x.rem))+'</div>';
    if(x.waiting)h+='<p class="note">الحد الأدنى اتسدد والميعاد عدى. المتبقي '+money(x.rem)+' مرحّل للكشف الجاي، والسداد الجاي حوالي '+dl(x.nextDue)+'. لما الكشف يطلع دوس "كشف جديد".</p>';
    else if(x.rem>0){var full=c.interestBase==='على كامل الكشف';
      h+='<div class="whatif">'+(x.remMin===0?'':'<div class="r"><span class="k">لو ما سددتش خالص</span><span>فايدة '+money(x.intNone)+' ('+fmt(c.rate)+'% × '+fmt(full?c.statement:x.rem)+')'+(x.penalty?' + غرامة '+money(x.penalty):'')+(x.extra?' + رسوم '+money(x.extra):'')+' ← هيبقى عليك <b class="bad">'+money(x.totalNone)+'</b></span></div>')+
      '<div class="r"><span class="k">'+(x.remMin>0?'لو سددت الحد الأدنى بس':'الحد الأدنى اتسدد، لو سبت الباقي')+'</span><span>فايدة '+money(x.intMin)+' ('+fmt(c.rate)+'% × '+fmt(full?c.statement:x.baseMin)+')'+(x.extra?' + رسوم '+money(x.extra):'')+' ← هيبقى عليك <b>'+money(x.totalMin)+'</b></span></div>'+
      (x.extra?'<div class="r"><span class="k fine">الرسوم = '+(x.overCharge?'تجاوز الحد '+fmt(x.overCharge):'')+(x.overCharge&&x.monthly?' + ':'')+(x.monthly?'رسوم شهرية '+fmt(x.monthly):'')+'</span></div>':'')+
      (full?'<div class="r"><span class="k fine">البنك ده بيحسب الفايدة على كامل الكشف، فلازم تسدد الكشف كله عشان ما تدفعش فايدة.</span></div>':'')+'</div>';}
    h+='<div class="actions"><input class="in num-in" id="pay-amt" type="number" inputmode="decimal" min="0" step="any" placeholder="مبلغ" aria-label="مبلغ الدفعة">'+
      '<button class="btn primary sm" data-act="card-pay">سجّل دفعة</button>'+
      (x.remMin>0&&!x.waiting?'<button class="btn sm" data-act="card-pay-min">دفعت الحد الأدنى</button>':'')+
      (x.rem>0&&!x.waiting?'<button class="btn sm" data-act="card-pay-all">دفعت الكل</button>':'')+'</div>';
    h+='<div class="actions"><input class="in num-in" id="bal-amt" type="number" inputmode="decimal" step="any" placeholder="الرصيد الحالي" aria-label="الرصيد الحالي على الكارت"><button class="btn sm" data-act="set-bal">حدّث الرصيد الحالي</button></div>';
    h+='<div class="actions"><button class="btn sm" data-act="card-new">كشف جديد</button><button class="btn sm" data-act="edit">تعديل</button>'+delBtn('cards',c.id)+'</div>';
    return h;
  }
  function detailLoan(l){
    var x=calcLoan(l);
    var h='<div class="tiles">'+tile('المتبقي حسب البنك',money(l.outstanding),1)+tile('القسط',money(l.installment))+tile('القسط الجاي',x.due?'<span style="font-size:15px">'+rel(x.days)+'</span>':'—')+'</div>';
    h+='<div class="rows"><h3>بيانات القرض</h3>'+r('النوع',esc(l.name))+r('البنك',esc(l.bank||'—'))+r('رقم العقد','<span class="num">'+esc(l.ref||'—')+'</span>')+
      r('قيمة القرض',money(l.amount))+r('الفايدة',l.rate!==''&&l.rate!=null?'<span class="num">'+fmt(l.rate)+'%</span> سنويًا':'—')+r('المدة',n(l.term)?'<span class="num">'+fmt(l.term)+'</span> شهر':'—')+
      r('تاريخ البداية',dShort(l.start))+r('تاريخ الانتهاء',dShort(l.maturity))+'</div>';
    h+='<div class="rows"><h3>الأقساط</h3>'+r('ميعاد القسط الجاي',x.due?dl(x.due):'—')+r('قيمة القسط',money(l.installment))+
      r('عدد الأقساط المتبقية',x.left!=null?'<span class="num">'+x.left+'</span>':'—')+r('إجمالي الأقساط المتبقية',x.leftTotal!=null?money(x.leftTotal):'—')+
      r('اتسدد من الأصل','<span class="num">'+Math.round(x.paidPct*100)+'%</span>')+(n(l.penalty)?r('لو اتأخرت',money(n(l.installment)+n(l.penalty))+' (غرامة '+money(l.penalty)+')'):'')+'</div>';
    if(l.notes)h+='<p class="note">'+esc(l.notes)+'</p>';
    h+='<p class="note">عدد الأقساط محسوب من ميعاد القسط الجاي لحد تاريخ الانتهاء. "المتبقي حسب البنك" حدّثه من تطبيق البنك كل فترة.</p>';
    h+='<div class="actions">'+(x.done?'':'<button class="btn primary sm" data-act="loan-paid">دفعت القسط</button>')+'<button class="btn sm" data-act="edit">تعديل</button>'+delBtn('loans',l.id)+'</div>';
    return h;
  }
  function detailDebt(coll,d){
    var x=calcDebt(d), lent=coll==='lent';
    var h='<div class="tiles">'+tile(lent?'المبلغ':'قيمة السلفة',money(d.amount))+tile(lent?'اتردلي':'اتسدد',money(x.paid))+tile(lent?'لسه عنده':'المتبقي',money(x.rem),1)+'</div>';
    h+='<div class="rows">'+r('الاسم',esc(d.name))+(d.kind?r('النوع',esc(d.kind)):'')+r(lent?'تاريخ السلفة':'تاريخ أخذ السلفة',dShort(d.date))+
      r(lent?'اتفاق الرد':'طريقة السداد',esc(d.plan||'—'))+'</div>';
    if(d.notes)h+='<div class="rows"><h3>'+(lent?'بيان':'بيان السلفة')+'</h3><div class="r"><span>'+esc(d.notes)+'</span></div></div>';
    var sch=(d.schedule||[]).map(function(s,i){return {s:s,i:i}}).sort(function(a,b){return String(a.s.date).localeCompare(String(b.s.date))});
    h+='<div class="rows pays"><h3>'+(lent?'مواعيد الرد المتفق عليها':'خطة السداد')+(x.planned?' · باقي '+money(x.planned):'')+'</h3>'+(sch.length?sch.map(function(o){var dd=parseD(o.s.date);
      return '<div class="r"><span class="k">'+(dd?dl(dd):'—')+(o.s.note?' · '+esc(o.s.note):'')+(o.s.done?' <span class="pill paid">'+(lent?'رجعت':'اتدفعت')+'</span>':dd?' <span class="pill '+stateOf(daysTo(dd))+'">'+rel(daysTo(dd))+'</span>':'')+'</span>'+
        '<span class="v">'+money(o.s.amount)+(o.s.done?'':' <button class="btn sm primary" data-act="plan-done" data-i="'+o.i+'">'+(lent?'رجعت':'دفعتها')+'</button>')+' <button class="btn sm danger" data-act="del-sched" data-i="'+o.i+'" aria-label="حذف">×</button></span></div>'}).join(''):'<div class="r"><span class="k">مفيش خطة لسه</span></div>')+'</div>';
    h+='<div class="actions"><input class="in num-in" id="sch-amt" type="number" inputmode="decimal" min="0" step="any" placeholder="المبلغ" aria-label="مبلغ الدفعة المخططة">'+
      '<input class="in" id="sch-date" type="date" value="'+iso(addMonth(today()))+'" aria-label="ميعادها" style="direction:ltr">'+
      '<input class="in" id="sch-note" type="text" placeholder="ملاحظة (اختياري)" aria-label="ملاحظة" style="flex:1;min-width:120px">'+
      '<button class="btn sm" data-act="add-sched">ضيف للخطة</button></div>';
    var pays=(d.payments||[]).map(function(p,i){return {p:p,i:i}}).sort(function(a,b){return String(a.p.date).localeCompare(String(b.p.date))});
    h+='<div class="rows pays"><h3>'+(lent?'الدفعات اللي رجعت':'الدفعات المسددة')+'</h3>'+(pays.length?pays.map(function(o){
      return '<div class="r"><span class="k">'+dShort(o.p.date)+(o.p.note?' · '+esc(o.p.note):'')+'</span><span class="v">'+money(o.p.amount)+' <button class="btn sm danger" style="margin-inline-start:6px" data-act="del-pay" data-i="'+o.i+'" aria-label="حذف الدفعة">×</button></span></div>'}).join(''):'<div class="r"><span class="k">مفيش دفعات لسه</span></div>')+'</div>';
    h+='<div class="actions"><input class="in num-in" id="pay-amt" type="number" inputmode="decimal" min="0" step="any" placeholder="المبلغ" aria-label="مبلغ الدفعة">'+
      '<input class="in" id="pay-date" type="date" value="'+iso(today())+'" aria-label="تاريخ الدفعة" style="direction:ltr">'+
      '<button class="btn primary sm" data-act="add-pay">'+(lent?'سجّل دفعة رجعت':'سجّل دفعة')+'</button></div>';
    h+='<div class="actions"><button class="btn sm" data-act="edit">تعديل</button>'+delBtn(coll,d.id)+'</div>';
    return h;
  }
  function detailSimple(coll,o){
    var h='<div class="rows">'+r(coll==='income'?'المصدر':'البند',esc(o.name))+(o.kind?r('النوع',esc(o.kind)):'')+r('المبلغ الشهري',money(o.amount))+r(coll==='income'?'يوم القبض':'يوم الدفع',n(o.day)?esc(o.day)+' كل شهر':'—')+'</div>';
    if(coll==='expenses'){var x=calcExp(o);if(x.due)h+='<p class="note">'+(x.paid?'اتدفع الشهر ده. الجاي ':'الميعاد ')+dl(x.due)+'.</p>';
      h+='<div class="actions"><button class="btn primary sm" data-act="exp-toggle" data-id="'+esc(o.id)+'">'+(x.paid?'إلغاء "اتدفع"':'علّم إنه اتدفع الشهر ده')+'</button></div>'}
    if(o.notes)h+='<p class="note">'+esc(o.notes)+'</p>';
    return h+'<div class="actions"><button class="btn sm" data-act="edit">تعديل</button>'+delBtn(coll,o.id)+'</div>';
  }

  function monthToggleBtn(o,mo){return mo.due?'<button class="btn primary sm" data-act="month-toggle" data-id="'+esc(o.id)+'">'+(mo.paid?'إلغاء "اتدفع"':'علّم إنه اتدفع الشهر ده')+'</button>':''}
  function detailGam(g){
    var x=calcGam(g);
    var h='<div class="tiles">'+tile('القسط الجاي',money(x.nextAmt))+tile('مبلغ القبض',money(x.payout),1)+tile('القبض',x.received?'قبضت':x.pd?'<span style="font-size:15px">'+rel(x.pdays)+'</span>':'—')+'</div>';
    h+='<div class="rows"><h3>بيانات الجمعية</h3>'+r('النوع',esc(g.kind||'—'))+r('التطبيق / المسؤول',esc(g.organizer||'—'))+
      r('مبلغ الجمعية',money(n(g.installment)*x.m))+r('القسط الشهري',money(g.installment)+(n(g.installmentBefore)?' (قبل القبض '+money(g.installmentBefore)+')':''))+
      r('المدة','<span class="num">'+x.m+'</span> شهر · من '+dShort(g.start)+' لـ '+(x.end?dShort(iso(x.end)):'—'))+r('دوري في القبض',n(g.turn)?'<span class="num">'+g.turn+'</span>'+(x.pd?' · '+x.pd.toLocaleDateString('ar-EG-u-nu-latn',{month:'long',year:'numeric'}):''):'—')+'</div>';
    h+='<div class="rows"><h3>الأقساط والقبض</h3>'+r('اتدفع','<span class="num">'+x.pc+'</span> من <span class="num">'+x.m+'</span> شهر · '+money(x.paidTotal))+
      r('القسط الجاي',x.next?money(x.nextAmt)+' · '+dl(x.next)+' · '+rel(x.days):(x.done?'خلصت الأقساط':'—'))+r('باقي أقساط هتدفعها',money(x.leftTotal)+' (<span class="num">'+x.left+'</span> قسط)')+
      r('تاريخ القبض',x.pd?dl(x.pd):'—')+r('صافي القبض',money(x.payout)+(x.received?' · اتقبض':''))+'</div>';
    h+='<div class="rows pays"><h3>جدول الشهور</h3>'+x.sc.map(function(s){
      var tag=s.payout?'<span class="pill inc">شهر القبض</span> ':'';
      var st=s.i<x.pc?'<span class="pill paid">اتدفع</span>':s.i===x.idx?'<span class="pill '+x.state+'">الجاي</span>':'';
      return '<div class="r"><span class="k">'+(s.d?s.d.toLocaleDateString('ar-EG-u-nu-latn',{month:'long',year:'numeric'}):'شهر '+(s.i+1))+' '+tag+'</span><span class="v">'+(s.ded?'<span class="fine">بيتخصم من القبض</span>':money(s.amt))+' '+st+'</span></div>'}).join('')+'</div>';
    if(g.notes)h+='<p class="note">'+esc(g.notes)+'</p>';
    h+='<div class="actions">'+(x.done?'':'<button class="btn primary sm" data-act="gam-paid">دفعت القسط</button>')+(x.pc>0?'<button class="btn sm" data-act="gam-unpaid">تراجع عن آخر قسط</button>':'')+
      '<button class="btn sm" data-act="gam-recv">'+(x.received?'لسه ما قبضتش':'قبضت الجمعية')+'</button></div>';
    return h+'<div class="actions"><button class="btn sm" data-act="edit">تعديل</button>'+delBtn('gamiyas',g.id)+'</div>';
  }
  function detailIns(p){
    var x=calcIns(p);
    var h='<div class="tiles">'+tile('القسط الشهري',money(p.premium))+tile('مبلغ التحصيل',money(p.payout),1)+tile('الانتهاء',x.end?'<span style="font-size:15px">'+(x.active?rel(daysTo(x.end)):'انتهت')+'</span>':'—')+'</div>';
    h+='<div class="rows"><h3>بيانات الوثيقة</h3>'+r('النوع',esc(p.name))+r('شركة التأمين',esc(p.company||'—'))+r('رقم الوثيقة','<span class="num">'+esc(p.policyNo||'—')+'</span>')+
      r('تاريخ البداية',dShort(p.start))+r('تاريخ الانتهاء',dShort(p.end))+'</div>';
    h+='<div class="rows"><h3>القسط والتحصيل</h3>'+r('يوم الدفع',n(p.payDay)?esc(p.payDay)+' كل شهر':'—')+r('القسط الجاي',x.mo.due?dl(x.mo.due)+(x.mo.paid?' (الشهر ده اتدفع)':' · '+rel(x.mo.days)):'—')+
      r('أقساط متبقية',x.left!=null?'<span class="num">'+x.left+'</span> · '+money(x.leftTotal):'—')+
      r('تاريخ التحصيل',x.pd?dl(x.pd)+' · '+rel(x.pdays):'—')+r('مبلغ التحصيل',money(p.payout))+'</div>';
    if(p.notes)h+='<p class="note">'+esc(p.notes)+'</p>';
    return h+'<div class="actions">'+monthToggleBtn(p,x.mo)+'<button class="btn sm" data-act="edit">تعديل</button>'+delBtn('insurance',p.id)+'</div>';
  }
  function detailBnpl(b){
    var x=calcBnpl(b), plans=b.plans||[];
    var h='<div class="tiles">'+tile('الحد',money(b.limit))+tile('المتبقي عليّ',money(x.out),1)+tile('قسط الشهر',money(x.monthly))+tile('المتاح',money(x.avail))+'</div>';
    h+='<div class="rows">'+r('يوم السداد',n(b.dueDay)?esc(b.dueDay)+' كل شهر':'—')+r('الميعاد الجاي',x.mo.due?dl(x.mo.due)+(x.mo.paid?' (الشهر ده اتدفع)':' · '+rel(x.mo.days)):'—')+
      (n(b.lateFee)?r('لو اتأخرت',money(x.monthly+n(b.lateFee))+' (غرامة '+money(b.lateFee)+')'):'')+'</div>';
    h+='<div class="rows pays"><h3>المشتريات المقسطة</h3>'+(plans.length?plans.map(function(p,i){var c=x.ps[i];
      return '<div class="r"><span class="k"><b style="color:var(--ink)">'+esc(p.item||'—')+'</b><br>'+money(p.monthly)+' × <span class="num">'+fmt(p.months)+'</span> شهر · باقي <span class="num">'+c.left+'</span> · آخر قسط '+(c.end?dShort(iso(c.end)):'—')+'</span>'+
        '<span class="v">'+money(c.rem)+' <button class="btn sm danger" data-act="del-plan" data-i="'+i+'" aria-label="حذف">×</button></span></div>'}).join(''):'<div class="r"><span class="k">مفيش مشتريات مقسطة لسه</span></div>')+'</div>';
    h+='<div class="fgroup"><h3>إضافة تقسيط</h3><div class="fields">'+
      '<label class="full" for="pl-item">الحاجة<input id="pl-item" type="text"></label>'+
      '<label for="pl-monthly">القسط الشهري<input id="pl-monthly" class="ltr" type="number" inputmode="decimal" step="any"></label>'+
      '<label for="pl-months">عدد الشهور<input id="pl-months" class="ltr" type="number" inputmode="numeric"></label>'+
      '<label class="full" for="pl-start">تاريخ أول قسط<input id="pl-start" class="ltr" type="date" value="'+iso(addMonth(today()))+'"></label></div>'+
      '<div class="actions"><button class="btn primary sm" data-act="add-plan">إضافة</button></div></div>';
    h+='<p class="note">الأقساط اللي ميعادها عدّى بتتحسب إنها اتدفعت.</p>';
    return h+'<div class="actions">'+monthToggleBtn(b,x.mo)+'<button class="btn sm" data-act="edit">تعديل</button>'+delBtn('bnpl',b.id)+'</div>';
  }
  function detailBalance(coll,o){
    var show=!!revealed[o.id], acc=coll==='accounts', cur=String(o.currency||'').trim()||'EGP';
    function sec(v,mask){return show?'<span class="num">'+esc(v||'—')+'</span>':(v?'<span class="num">'+mask+'</span>':'—')}
    var h='<div class="tiles">'+tile('الرصيد','<span class="num">'+fmt(o.balance)+'</span> '+esc(cur==='EGP'?'ج':cur),1)+(egpVal(o)!==n(o.balance)?tile('بالجنيه',money(egpVal(o))):'')+'</div>';
    h+='<div class="actions"><button class="btn sm" data-act="reveal">'+ic('eye',16)+' '+(show?'إخفاء الأرقام':'إظهار الأرقام والـ CVV')+'</button></div>';
    if(acc)h+='<div class="rows"><h3>الحساب</h3>'+r('البنك',esc(o.bank))+r('نوع الحساب',esc(o.name||'—'))+r('رقم الحساب',sec(o.accountNo,'•••• '+String(o.accountNo||'').slice(-4)))+r('IBAN',sec(o.iban,'••••'+String(o.iban||'').slice(-4)))+'</div>';
    else h+='<div class="rows"><h3>المحفظة</h3>'+r('النوع',esc(o.kind||'—'))+r('الجهة',esc(o.provider||'—'))+r('رقم المحفظة / الموبايل','<span class="num">'+esc(o.number||'—')+'</span>')+r('العملة',esc(cur))+'</div>';
    h+='<div class="rows"><h3>الكارت</h3>'+r('رقم الكارت',show?'<span class="num">'+esc(groupPan(o.cardNumber)||'—')+'</span>':'<span class="num">'+(o.cardNumber?maskPan(o.cardNumber):'—')+'</span>')+
      r('CVV',show?'<span class="num">'+esc(o.cvv||'—')+'</span>':(o.cvv?'•••':'—'))+r('تاريخ الانتهاء',o.cardExpiry?'<span class="num">'+mmyy(o.cardExpiry)+'</span>':'—')+'</div>';
    if(o.notes)h+='<p class="note">'+esc(o.notes)+'</p>';
    h+='<div class="actions"><input class="in num-in" id="bal-amt" type="number" inputmode="decimal" step="any" placeholder="الرصيد الجديد" aria-label="الرصيد الجديد"><button class="btn primary sm" data-act="set-bal">حدّث الرصيد</button></div>';
    return h+'<div class="actions"><button class="btn sm" data-act="edit">تعديل</button>'+delBtn(coll,o.id)+'</div>';
  }

  function formHtml(){
    var f=sheet, fields=FIELDS[f.coll], v=f.v, h='', open=false;
    function close(){if(open){h+='</div></div>';open=false}}
    function begin(t){close();h+='<div class="fgroup">'+(t?'<h3>'+t+'</h3>':'')+'<div class="fields">';open=true}
    fields.forEach(function(fd){
      if(fd.g){begin(fd.g);return}
      if(!open)begin('');
      var id='f-'+fd.k, val=v[fd.k]==null?'':v[fd.k], cls=(fd.full||fd.t==='area')?'full':'';
      var ctl;
      if(fd.t==='area')ctl='<textarea id="'+id+'">'+esc(val)+'</textarea>';
      else if(fd.t==='select')ctl='<select id="'+id+'">'+fd.opts.map(function(o){return '<option'+(o===val?' selected':'')+'>'+esc(o)+'</option>'}).join('')+'</select>';
      else ctl='<input id="'+id+'" type="'+(fd.t==='number'?'number':fd.t)+'"'+(fd.t==='number'?' inputmode="decimal" step="any"':'')+(fd.mode?' inputmode="'+fd.mode+'"':'')+
        ((fd.ltr||fd.t==='number'||fd.t==='date')?' class="ltr"':'')+' value="'+esc(val)+'" autocomplete="off">';
      h+='<label class="'+cls+'" for="'+id+'">'+fd.l+(fd.req?' *':'')+ctl+'</label>';
    });
    close();
    if(f.hint)h='<p class="note">'+esc(f.hint)+'</p>'+h;
    return h+'<div class="actions"><button class="btn primary" data-act="save-form">حفظ</button><button class="btn" data-act="cancel-form">إلغاء</button></div>';
  }

  function renderSheet(){
    var el=document.getElementById('sheet');
    var oldScrim=el.querySelector('.sheet-scrim'), oldTop=oldScrim?oldScrim.scrollTop:0, oldKey=el.getAttribute('data-key');
    document.documentElement.classList.toggle('sheet-open',!!sheet);
    if(!sheet){el.innerHTML='';el.removeAttribute('data-key');return}
    var key=[sheet.mode,sheet.coll,sheet.id,sheet.k].join('|');
    setTimeout(function(){var s=el.querySelector('.sheet-scrim');if(s)s.scrollTop=(key===oldKey?oldTop:0)},0);
    el.setAttribute('data-key',key);
    var title, body;
    if(sheet.mode==='form'){title=sheet.title;body=formHtml()}
    else if(sheet.mode==='bd'){title=breakdown(sheet.k).title;body=bdHtml(sheet.k)}
    else{
      var o=find(sheet.coll,sheet.id); if(!o){sheet=null;el.innerHTML='';return}
      title=(sheet.coll==='accounts'?o.bank+(o.name?' · '+o.name:''):o.name)||COLLS[sheet.coll].one;
      var cl=sheet.coll;
      body= cl==='cards'?detailCard(o): cl==='loans'?detailLoan(o): (cl==='debts'||cl==='lent')?detailDebt(cl,o):
            cl==='gamiyas'?detailGam(o): cl==='insurance'?detailIns(o): cl==='bnpl'?detailBnpl(o):
            (cl==='accounts'||cl==='wallets')?detailBalance(cl,o): detailSimple(cl,o);
    }
    var keepAmt=document.getElementById('pay-amt'); keepAmt=keepAmt?keepAmt.value:'';
    el.innerHTML='<div class="sheet-scrim" data-act="close-sheet"><div class="sheet" role="dialog" aria-modal="true" aria-label="'+esc(title)+'">'+
      '<div class="sheet-head">'+(sheet.back&&sheet.mode!=='form'?'<button class="icon-btn" data-act="sheet-back" aria-label="رجوع">'+ic('back')+'</button>':'')+'<h2>'+esc(title)+'</h2><button class="icon-btn" data-act="close-sheet-btn" aria-label="قفل">'+ic('close')+'</button></div>'+
      '<div class="sheet-body">'+body+'</div></div></div>';
    var pa=document.getElementById('pay-amt'); if(pa&&keepAmt&&sheet.mode!=='form')pa.value=keepAmt;
  }
  function renderAll(){renderNav();renderMain();if(!sheet||sheet.mode!=='form')renderSheet()}

  function openForm(coll,id,preset,title,hint){
    var src=id?find(coll,id):null, v={};
    FIELDS[coll].forEach(function(fd){if(fd.k)v[fd.k]=src&&src[fd.k]!=null?src[fd.k]:(fd.t==='select'?fd.opts[0]:'')});
    if(preset)for(var k in preset)v[k]=preset[k];
    sheet={mode:'form',coll:coll,id:id,v:v,title:title||(id?'تعديل '+(src.name||''):COLLS[coll].add),hint:hint,back:id?{mode:'detail',coll:coll,id:id}:null};
    renderSheet(); var first=document.querySelector('.sheet-body input,.sheet-body textarea'); if(first)first.focus();
  }
  function saveForm(){
    var f=sheet, rec={}, ok=true;
    FIELDS[f.coll].forEach(function(fd){ if(!fd.k)return; var e=document.getElementById('f-'+fd.k); var val=e?e.value:'';
      if(fd.t==='number')val=val===''?'':Number(val); else if(typeof val==='string')val=val.trim();
      if((fd.k==='number'&&f.coll==='cards')||fd.k==='cardNumber')val=digits(val);
      if(fd.req&&!val){ok=false;toast('اكتب '+fd.l)}
      rec[fd.k]=val; });
    if(!ok)return;
    mutate(function(){
      if(f.id){Object.assign(find(f.coll,f.id),rec);sheet={mode:'detail',coll:f.coll,id:f.id}}
      else{rec.id=uid();if(f.coll==='debts'||f.coll==='lent')rec.payments=[];if(f.coll==='bnpl')rec.plans=[];
        if(f.coll==='gamiyas'){var st=parseD(rec.start);rec.paidCount=st?countPast(st,n(rec.months)):0;rec.received=false}
        S[f.coll].push(rec);sheet={mode:'detail',coll:f.coll,id:rec.id}}
    });
    renderSheet(); toast('اتحفظ');
  }

  /* ================= events ================= */
  document.getElementById('menuBtn').innerHTML=ic('menu',22);
  document.getElementById('menuBtn').addEventListener('click',function(){setNav(true)});
  document.getElementById('navScrim').addEventListener('click',function(){setNav(false)});
  document.getElementById('fab').addEventListener('click',function(){if(COLLS[route])openForm(route,null,route==='cards'?{rate:'',feePct:'',paid:0}:null)});

  function go(rt){ if(ROUTES.indexOf(rt)<0)rt='home'; route=rt; navOpen=false; sheet=null; confirmDel=null; renderAll(); window.scrollTo(0,0) }
  window.addEventListener('hashchange',function(){go(location.hash.slice(1))});

  document.getElementById('app').addEventListener('click',function(e){
    var nv=e.target.closest('[data-nav]'); if(nv){ /* hash link handles route */ if(location.hash==='#'+nv.getAttribute('data-nav')){e.preventDefault();go(nv.getAttribute('data-nav'))} return }
    var t=e.target.closest('[data-act]'); if(!t)return;
    var act=t.getAttribute('data-act');
    if(settingsAction(act))return;
    if(act==='close-nav'){setNav(false);return}
    if(act==='close-sheet'){ if(e.target===t){sheet=null;confirmDel=null;renderSheet()} return }
    if(act==='close-sheet-btn'){sheet=null;confirmDel=null;renderSheet();return}
    if(act==='open'){var bk=sheet&&sheet.mode==='bd'?{mode:'bd',k:sheet.k,back:sheet.back}:null;sheet={mode:'detail',coll:t.getAttribute('data-coll'),id:t.getAttribute('data-id'),back:bk};confirmDel=null;renderSheet();return}
    if(act==='bd'){var bk2=sheet&&sheet.mode==='bd'?{mode:'bd',k:sheet.k,back:sheet.back}:null;sheet={mode:'bd',k:t.getAttribute('data-k'),back:bk2};renderSheet();var sb=document.querySelector('.sheet-scrim');if(sb)sb.scrollTop=0;return}
    if(act==='sheet-back'){sheet=sheet.back||null;confirmDel=null;renderSheet();return}
    if(act==='exp-toggle'||act==='month-toggle'){var mc=act==='exp-toggle'?'expenses':(sheet&&sheet.coll), ex=find(mc,t.getAttribute('data-id'));if(!ex)return;
      var mo=calcMonthly(ex[DAYF[mc]],ex.paidMonth);
      if(!mo.key){toast('حدد يوم الدفع الأول من "تعديل"');return}
      mutate(function(){ex.paidMonth=ex.paidMonth===mo.key?'':mo.key});toast(ex.paidMonth?'اتعلّم إن '+ex.name+' اتدفع الشهر ده':'اتلغت العلامة');return}
    if(act==='save-form'){saveForm();return}
    if(act==='cancel-form'){sheet=sheet.back||null;renderSheet();return}
    if(!sheet)return;
    var coll=sheet.coll, o=find(coll,sheet.id); if(!o)return;
    if(act==='edit'){openForm(coll,o.id);return}
    if(act==='del'){var key=coll+o.id;
      if(confirmDel===key){confirmDel=null;sheet=null;mutate(function(){S[coll]=S[coll].filter(function(x){return x.id!==o.id})});renderSheet();toast('اتحذف')}
      else{confirmDel=key;renderSheet();setTimeout(function(){if(confirmDel===key){confirmDel=null;if(sheet&&sheet.mode==='detail')renderSheet()}},3500)}
      return}
    if(act==='reveal'){revealed[o.id]=!revealed[o.id];renderSheet();return}
    function cardPay(amt){ if(!(amt>0)){toast('اكتب مبلغ أكبر من صفر');return} var pa=document.getElementById('pay-amt');if(pa)pa.value='';
      mutate(function(){o.paid=Math.round((n(o.paid)+amt)*100)/100}); toast('اتسجلت دفعة '+fmt(amt)+' ج على '+o.name) }
    if(act==='card-pay'){cardPay(n(document.getElementById('pay-amt').value));return}
    if(act==='card-pay-min'){cardPay(calcCard(o).remMin);return}
    if(act==='card-pay-all'){cardPay(calcCard(o).rem);return}
    if(act==='card-new'){var x=calcCard(o), nd=x.waiting?x.nextDue:(parseD(o.due)?addMonth(parseD(o.due)):addMonth(today()));
      openForm('cards',o.id,{paid:0,statement:'',min:'',due:iso(nd)},'كشف جديد: '+o.name,'حط المطلوب والحد الأدنى من الكشف الجديد وراجع ميعاد السداد. اللي اتسدد بيبدأ من صفر.');return}
    if(act==='loan-paid'){var d=parseD(o.nextDue); if(!d){toast('حدد ميعاد القسط الجاي الأول');return}
      mutate(function(){o.nextDue=iso(addMonth(d));o.lastPaid=iso(today())}); toast('اتسجل القسط. الجاي '+dl(parseD(o.nextDue)));return}
    if(act==='add-pay'){var amt=n(document.getElementById('pay-amt').value), dt=document.getElementById('pay-date').value||iso(today());
      if(!(amt>0)){toast('اكتب مبلغ الدفعة');return}
      mutate(function(){o.payments=(o.payments||[]).concat([{amount:amt,date:dt}])}); toast('اتسجلت دفعة '+fmt(amt)+' ج');return}
    if(act==='gam-paid'){var gx=calcGam(o);if(gx.done)return;mutate(function(){o.paidCount=Math.min(gx.idx+1,n(o.months))});
      var nx=calcGam(o).next;toast('اتسجل القسط'+(nx?'. الجاي '+dl(nx):'. خلصت الأقساط'));return}
    if(act==='gam-unpaid'){mutate(function(){o.paidCount=Math.max(n(o.paidCount)-1,0)});return}
    if(act==='gam-recv'){mutate(function(){o.received=!o.received});toast(o.received?'اتسجل إنك قبضت '+o.name:'اتلغى');return}
    if(act==='add-plan'){var it=document.getElementById('pl-item').value.trim(), mm=n(document.getElementById('pl-monthly').value), mn=n(document.getElementById('pl-months').value), sd=document.getElementById('pl-start').value;
      if(!(mm>0)||!(mn>0)||!parseD(sd)){toast('اكتب القسط وعدد الشهور وتاريخ أول قسط');return}
      mutate(function(){o.plans=(o.plans||[]).concat([{item:it,monthly:mm,months:mn,start:sd}])});toast('اتضاف التقسيط');return}
    if(act==='del-plan'){var pi=+t.getAttribute('data-i');mutate(function(){o.plans=(o.plans||[]).filter(function(_,j){return j!==pi})});return}
    if(act==='set-bal'){var bv=document.getElementById('bal-amt').value;if(bv===''){toast('اكتب الرصيد');return}
      mutate(function(){o.balance=Number(bv);o.balanceAt=iso(today())});toast('اتحدّث الرصيد');return}
    if(act==='add-sched'){var sa=n(document.getElementById('sch-amt').value), sd2=document.getElementById('sch-date').value, sn=document.getElementById('sch-note').value.trim();
      if(!(sa>0)||!parseD(sd2)){toast('اكتب المبلغ والميعاد');return}
      mutate(function(){o.schedule=(o.schedule||[]).concat([{amount:sa,date:sd2,note:sn,done:false}])});toast('اتضافت للخطة');return}
    if(act==='plan-done'){var si=+t.getAttribute('data-i'), it2=(o.schedule||[])[si]; if(!it2)return;
      mutate(function(){it2.done=true;o.payments=(o.payments||[]).concat([{amount:n(it2.amount),date:iso(today()),note:it2.note||'من الخطة'}])});toast('اتسجلت دفعة '+fmt(it2.amount)+' ج');return}
    if(act==='del-sched'){var di=+t.getAttribute('data-i');mutate(function(){o.schedule=(o.schedule||[]).filter(function(_,j){return j!==di})});return}
    if(act==='del-pay'){var i=+t.getAttribute('data-i');mutate(function(){o.payments=(o.payments||[]).filter(function(_,j){return j!==i})});return}
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){ if(sheet){sheet=sheet.mode==='form'&&sheet.back?sheet.back:null;renderSheet()} else if(navOpen)setNav(false) }
  });

  /* ================= standalone: storage, settings, update, backup ================= */
  var LS_STATE='3bh_state', LS_UPDATE='3bh_app_update', LS_BACKUP='3bh_last_backup', LS_PREV='3bh_state_before_update';
  var persisted=null, pendingImport=null, pendingUpdate=null;
  function lsGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function lsSet(k,v){try{localStorage.setItem(k,v);return true}catch(e){return false}}
  function lsDel(k){try{localStorage.removeItem(k)}catch(e){}}
  function curVersion(){return window.APP_VERSION||'?'}
  function cmpV(a,b){a=String(a).split('.').map(Number);b=String(b).split('.').map(Number);for(var i=0;i<3;i++){var d=(a[i]||0)-(b[i]||0);if(d)return d}return 0}
  function daysSince(isoStr){var d=parseD(isoStr);return d?-daysTo(d):null}
  function itemCount(st){return KEYS.reduce(function(t,k){return t+((st&&st[k])||[]).length},0)}

  function saveFile(name,text){
    var blob=new Blob([text],{type:'application/json'}), url=URL.createObjectURL(blob), a=document.createElement('a');
    a.href=url;a.download=name;document.body.appendChild(a);a.click();
    setTimeout(function(){URL.revokeObjectURL(url);a.remove()},1500);
  }
  function backupPayload(){return JSON.stringify({kind:'3bhady-data',app:'3bhady finance tracker',version:curVersion(),exportedAt:new Date().toISOString(),state:S},null,1)}
  function backupName(){return '3bhady-backup-'+iso(today())+'.json'}
  function markBackup(){lsSet(LS_BACKUP,iso(today()))}
  function readFile(input,cb){
    var f=input.files&&input.files[0]; if(!f)return;
    var r=new FileReader();
    r.onload=function(){var obj=null;try{obj=JSON.parse(r.result)}catch(e){toast('الملف ده مش ملف البرنامج (مش JSON)');input.value='';return}cb(obj,f.name);input.value=''};
    r.onerror=function(){toast('ماقدرتش أقرا الملف')};
    r.readAsText(f);
  }

  function backupBanner(){
    var lb=lsGet(LS_BACKUP), ds=lb?daysSince(lb):null;
    if(itemCount(S)===0)return '<a class="banner" href="#settings">البرنامج فاضي. افتح "الإعدادات والتحديث" واسترجع ملف بياناتك.</a>';
    if(ds===null||ds>=14)return '<a class="banner" href="#settings">'+(ds===null?'لسه ما عملتش نسخة احتياطية من بياناتك.':'آخر نسخة احتياطية من '+ds+' يوم.')+' اعمل واحدة من الإعدادات.</a>';
    return '';
  }

  function screenSettings(){
    var up=null;try{up=JSON.parse(lsGet(LS_UPDATE)||'null')}catch(e){}
    var lb=lsGet(LS_BACKUP), ds=lb?daysSince(lb):null, size=(lsGet(LS_STATE)||'').length;
    var h='';
    if(pendingUpdate){
      h+='<section class="hero"><p class="lead">تحديث جاهز للتثبيت</p>'+
        '<div class="rows">'+r('النسخة الحالية','<span class="num">v'+esc(curVersion())+'</span>')+r('النسخة الجديدة','<span class="num">v'+esc(pendingUpdate.version)+'</span>')+
        (pendingUpdate.date?r('تاريخ التحديث',esc(pendingUpdate.date)):'')+'</div>'+
        (pendingUpdate.notes?'<p class="note" style="white-space:pre-line">'+esc(pendingUpdate.notes)+'</p>':'')+
        (cmpV(pendingUpdate.version,curVersion())<=0?'<p class="note" style="color:var(--bad)">النسخة دي مش أحدث من اللي عندك.</p>':'')+
        '<p class="note">بياناتك مش هتتغير. البرنامج هيقفل ويفتح تاني بالنسخة الجديدة.</p>'+
        '<div class="actions"><button class="btn primary" data-act="apply-update">ثبّت التحديث</button><button class="btn" data-act="cancel-update">إلغاء</button></div></section>';
    }
    if(pendingImport){
      h+='<section class="hero"><p class="lead bad">استرجاع بيانات من ملف</p>'+
        '<div class="rows">'+r('الملف',esc(pendingImport.name))+r('عدد البنود في الملف','<span class="num">'+itemCount(pendingImport.state)+'</span>')+
        (pendingImport.at?r('اتعمل يوم',esc(String(pendingImport.at).slice(0,10))):'')+r('عدد البنود اللي عندك دلوقتي','<span class="num">'+itemCount(S)+'</span>')+'</div>'+
        '<p class="note">البيانات اللي في الملف هتحل محل كل بياناتك الحالية.</p>'+
        '<div class="actions"><button class="btn primary" data-act="apply-import">استبدل بياناتي بالملف</button><button class="btn" data-act="cancel-import">إلغاء</button></div></section>';
    }
    h+='<section class="sec"><h2>البرنامج</h2><div class="rows">'+
      r('الاسم','3bhady finance tracker')+
      r('النسخة','<span class="num">v'+esc(curVersion())+'</span>'+(window.APP_SOURCE==='update'?' <span class="pill ok">من ملف تحديث</span>':' <span class="pill wait">الأصلية</span>'))+
      (up&&up.date?r('تاريخ آخر تحديث',esc(up.date)):'')+'</div>'+
      '<div class="actions"><label class="btn primary" for="upd-file" style="cursor:pointer">تحديث البرنامج من ملف</label>'+
      '<input type="file" id="upd-file" accept=".json,application/json,text/plain,*/*" hidden>'+
      (window.APP_SOURCE==='update'?'<button class="btn" data-act="reset-update">'+(confirmDel==='reset-update'?'متأكد؟ ارجع للأصلية':'ارجع للنسخة الأصلية v'+esc(window.BUILTIN_VERSION||''))+'</button>':'')+'</div>'+
      '<p class="note">ملف التحديث بيبعتهولك Claude باسم زي <span class="num">3bhady-update-v1.1.0.json</span>. اختاره من هنا والبرنامج يتحدّث وبياناتك زي ما هي.</p></section>';
    h+='<section class="sec"><h2>البيانات</h2><div class="rows">'+
      r('عدد البنود','<span class="num">'+itemCount(S)+'</span>')+
      r('مساحة البيانات','<span class="num">'+fmt(Math.round(size/1024*10)/10)+'</span> KB')+
      r('آخر نسخة احتياطية',lb?dShort(lb)+(ds?' · من '+ds+' يوم':' · النهاردة'):'<span style="color:var(--bad)">لسه</span>')+
      r('التخزين',persisted===true?'محفوظ دائمًا':persisted===false?'عادي (ممكن يتمسح لو مساحة الموبايل خلصت)':'—')+'</div>'+
      '<div class="actions"><button class="btn primary" data-act="export-data">حفظ نسخة احتياطية</button>'+
      (navigator.share?'<button class="btn" data-act="share-data">مشاركة النسخة</button>':'')+
      '<label class="btn" for="data-file" style="cursor:pointer">استرجاع بيانات من ملف</label><input type="file" id="data-file" accept=".json,application/json,text/plain,*/*" hidden></div>'+
      '<p class="note">بياناتك متخزنة على الموبايل ده بس، ومحدش بيشوفها. اعمل نسخة احتياطية كل فترة واحفظها في مكان آمن، لأن فيها أرقام الكروت والـ CVV. لو عايز Claude يعدّل في بياناتك، ابعتله النسخة الاحتياطية ويرجعهالك متعدلة تسترجعها من هنا.</p>'+
      (lsGet(LS_PREV)?'<div class="actions"><button class="btn sm" data-act="restore-prev">'+(confirmDel==='restore-prev'?'متأكد؟ رجّع البيانات':'رجّع البيانات زي ما كانت قبل آخر استرجاع')+'</button></div>':'')+'</section>';
    h+='<section class="sec"><h2>منطقة الخطر</h2><div class="actions"><button class="btn danger" data-act="wipe">'+(confirmDel==='wipe'?'متأكد؟ امسح كل حاجة':'امسح كل البيانات من الموبايل')+'</button></div></section>';
    return h;
  }

  function onUpdateFile(obj,name){
    if(!obj||obj.kind!=='3bhady-update'||!obj.js||!obj.html||!obj.version){toast('الملف ده مش ملف تحديث للبرنامج');return}
    pendingUpdate=obj;pendingImport=null;renderMain();window.scrollTo(0,0);
  }
  function onDataFile(obj,name){
    var st=obj&&obj.kind==='3bhady-data'?obj.state:(obj&&Array.isArray(obj.cards)?obj:null);
    if(!st){toast('الملف ده مش نسخة بيانات للبرنامج');return}
    pendingImport={state:normalize(st),name:name,at:obj.exportedAt};pendingUpdate=null;renderMain();window.scrollTo(0,0);
  }
  document.addEventListener('change',function(e){
    if(e.target.id==='upd-file')readFile(e.target,onUpdateFile);
    if(e.target.id==='data-file')readFile(e.target,onDataFile);
  });
  function twoStep(key){if(confirmDel===key){confirmDel=null;return true}confirmDel=key;renderMain();setTimeout(function(){if(confirmDel===key){confirmDel=null;renderMain()}},4000);return false}
  function settingsAction(act){
    if(act==='export-data'){saveFile(backupName(),backupPayload());markBackup();toast('اتحفظت النسخة في التنزيلات');renderMain();return true}
    if(act==='share-data'){var file=null;try{file=new File([backupPayload()],backupName(),{type:'application/json'})}catch(e){}
      var data=file&&navigator.canShare&&navigator.canShare({files:[file]})?{files:[file],title:backupName()}:{title:backupName(),text:backupPayload()};
      navigator.share(data).then(function(){markBackup();renderMain()}).catch(function(){});return true}
    if(act==='apply-import'){if(!pendingImport)return true;lsSet(LS_PREV,JSON.stringify(S));S=pendingImport.state;pendingImport=null;save();renderAll();toast('اتسترجعت البيانات');return true}
    if(act==='cancel-import'){pendingImport=null;renderMain();return true}
    if(act==='restore-prev'){if(!twoStep('restore-prev'))return true;try{S=normalize(JSON.parse(lsGet(LS_PREV)))}catch(e){toast('مفيش نسخة سابقة');return true}save();renderAll();toast('رجعت البيانات اللي كانت قبل آخر استرجاع');return true}
    if(act==='apply-update'){if(!pendingUpdate)return true;lsSet(LS_PREV,JSON.stringify(S));
      if(!lsSet(LS_UPDATE,JSON.stringify(pendingUpdate))){toast('ماقدرتش أحفظ التحديث');return true}
      toast('بيتثبت التحديث…');setTimeout(function(){location.reload()},600);return true}
    if(act==='cancel-update'){pendingUpdate=null;renderMain();return true}
    if(act==='reset-update'){if(!twoStep('reset-update'))return true;lsDel(LS_UPDATE);location.reload();return true}
    if(act==='wipe'){if(!twoStep('wipe'))return true;lsSet(LS_PREV,JSON.stringify(S));S=normalize(null);save();renderAll();toast('اتمسحت البيانات');return true}
    return false;
  }

  /* ================= boot ================= */
  route=ROUTES.indexOf(location.hash.slice(1))>=0?location.hash.slice(1):'home';
  try{var raw=lsGet(LS_STATE);S=normalize(raw?JSON.parse(raw):null)}catch(e){S=normalize(null)}
  loaded=true;renderAll();
  if(navigator.storage&&navigator.storage.persist){navigator.storage.persist().then(function(p){persisted=p;if(route==='settings')renderMain()}).catch(function(){})}
  window.__appReady=true;
  setInterval(function(){if(!(sheet&&sheet.mode==='form'))renderAll()},10*60*1000);
})();