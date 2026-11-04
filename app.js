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
    reports:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    spend:'<rect x="2.5" y="6" width="19" height="13" rx="2.5"/><path d="M2.5 10.5h19M15 15h3"/><path d="M7 3.5l2 2.5 2-2.5"/>',
    transfer:'<path d="M4 8h14l-3-3M20 16H6l3 3"/>',
    notifs:'<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    statement:'<path d="M6 2.5h9l4 4V21.5H6z"/><path d="M15 2.5v4h4M9 11h7M9 15h7M9 19h4"/>',
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
    wallets:{title:'كل الأرصدة والمحافظ',one:'رصيد',add:'إضافة حساب أو محفظة أو كاش'},
    reports:{title:'التقارير',one:'معاملة',add:'إضافة معاملة'},
    spend:{title:'الصرف والتحويل',one:'عملية',add:'اصرف'},
    notifs:{title:'الإشعارات',one:'إشعار',add:'ابعت رسالة النهاردة'}
  };
  var KEYS=['cards','loans','debts','lent','income','expenses','gamiyas','insurance','bnpl','accounts','wallets','reports'];
  var ROUTES=['home','spend','notifs'].concat(KEYS).concat(['settings']);
  var DAYF={expenses:'day',insurance:'payDay',bnpl:'dueDay'};

  var FIELDS={
    cards:[
      {g:'بيانات الكارت'},
      {k:'name',l:'اسم الكارت',t:'text',req:1},{k:'bank',l:'البنك',t:'text'},{k:'bankId',t:'hidden'},{k:'cardType',l:'نوع الكارت',t:'text'},{k:'annualFee',l:'الرسوم السنوية (ج)',t:'number'},
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
      {k:'minPct',l:'الحد الأدنى ٪ من الكشف',t:'number'},{k:'minFixed',l:'الحد الأدنى مش أقل من (ج)',t:'number'},
      {k:'cashFee',l:'رسوم سحب الكاش',t:'text',full:1},
      {g:'الكشف الحالي'},
      {k:'statement',l:'المطلوب للسداد',t:'number'},{k:'min',l:'الحد الأدنى',t:'number'},
      {k:'paid',l:'اللي اتسدد',t:'number'},{k:'due',l:'آخر ميعاد للسداد',t:'date'},
      {k:'stmtCharges',l:'الفوايد والرسوم في الكشف (اختياري)',t:'number'}
    ],
    loans:[
      {g:'بيانات القرض'},
      {k:'name',l:'نوع القرض',t:'text',req:1},{k:'bank',l:'البنك',t:'text'},{k:'bankId',t:'hidden'},
      {k:'ref',l:'رقم العقد',t:'text',ltr:1,full:1},
      {k:'amount',l:'قيمة القرض',t:'number'},{k:'outstanding',l:'المتبقي حسب البنك',t:'number'},
      {k:'rate',l:'الفايدة السنوية ٪',t:'number'},{k:'term',l:'المدة بالشهور',t:'number'},
      {k:'start',l:'تاريخ البداية',t:'date'},{k:'maturity',l:'تاريخ الانتهاء',t:'date'},
      {g:'القسط'},
      {k:'installment',l:'قيمة القسط',t:'number'},{k:'nextDue',l:'ميعاد القسط الجاي',t:'date'},
      {k:'penalty',l:'غرامة التأخير (ج) · فاضية = تتحسب لوحدها',t:'number'},
      {g:'رسوم وغرامات القرض'},
      {k:'penaltyRate',l:'عائد تأخير إضافي ٪ سنويًا على المتأخر',t:'number'},{k:'penaltyFixed',l:'غرامة ثابتة لكل قسط متأخر (ج)',t:'number'},
      {k:'penaltyPct',l:'غرامة ٪ من المبلغ المتأخر',t:'number'},{k:'earlyPct',l:'عمولة السداد المعجل ٪',t:'number'},
      {k:'adminPct',l:'المصاريف الإدارية ٪ من القرض',t:'number'},
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
      {g:'نوع الجمعية'},
      {k:'kind',l:'النوع',t:'select',opts:['Money Fellows','جمعية أفراد'],full:1,refresh:1},
      {g:'بيانات الجمعية'},
      {k:'name',l:'اسم الجمعية',t:'text',req:1},
      {k:'organizer',l:'الشخص المسؤول عن الجمعية',t:'text',when:function(v){return v.kind!=='Money Fellows'}},
      {k:'installment',l:'القسط الشهري',t:'number'},{k:'months',l:'عدد الشهور',t:'number'},
      {k:'start',l:'تاريخ أول قسط',t:'date'},{k:'turn',l:'رقم دوري في القبض',t:'number'},
      {k:'deduct',l:'قسط شهر القبض',t:'select',opts:['بيتخصم من القبض','بيتدفع عادي'],full:1},
      {g:'رسوم Money Fellows',when:function(v){return v.kind==='Money Fellows'}},
      {k:'adminFee',l:'الرسوم الإدارية (الإجمالي)',t:'number',when:mfOnly},{k:'taxFee',l:'الضريبة (الإجمالي)',t:'number',when:mfOnly},
      {k:'payoutFees',l:'المخصوم من القبض من الرسوم (فاضي = كله من القبض)',t:'number',full:1,when:mfOnly},
      {k:'feeMode',l:'باقي الرسوم بيتدفع',t:'select',opts:['على أول قسط','متوزع على الأقساط قبل القبض'],full:1,when:mfOnly},
      {k:'promo',l:'خصم بروموكود',t:'number',when:mfOnly},{k:'deposit',l:'مقدم حجز (اتدفع قبل البداية)',t:'number',when:mfOnly},
      {g:'تعديل يدوي (اختياري)'},
      {k:'installmentBefore',l:'القسط قبل القبض (لو عايز تكتبه بإيدك)',t:'number'},
      {k:'payout',l:'صافي القبض (لو عايز تكتبه بإيدك)',t:'number'},
      {k:'payoutDate',l:'تاريخ القبض (فاضي = حسب الدور)',t:'date'},
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
      {k:'name',l:'الاسم',t:'text',req:1},{k:'kind',l:'النوع',t:'select',opts:['محفظة موبايل','محفظة بنكية','كارت مدفوع مسبقًا','كاش','عملات رقمية','أخرى']},
      {k:'provider',l:'الجهة (اختار أو اكتب)',t:'text',list:['فودافون كاش','اتصالات كاش (e& money)','أورنج كاش','WE Pay','CIB Smart Wallet','محفظة بنك مصر','محفظة البنك الأهلي','محفظة QNB','Money Fellows','ماي فوري','تيلدا','كليفر','InstaPay','Binance']},{k:'number',l:'رقم الخط / المحفظة',t:'text',ltr:1,mode:'tel'},
      {k:'balance',l:'الرصيد',t:'number'},{k:'currency',l:'العملة',t:'text',ltr:1},
      {k:'egp',l:'القيمة بالجنيه (لو عملة تانية)',t:'number',full:1},
      {g:'الكارت (لو فيه)'},
      {k:'cardNumber',l:'رقم الكارت',t:'text',ltr:1,mode:'numeric'},{k:'cvv',l:'CVV',t:'text',ltr:1,mode:'numeric'},
      {k:'cardExpiry',l:'تاريخ الانتهاء',t:'date'},
      {k:'notes',l:'ملاحظات',t:'area',full:1}
    ],
    reports:[
      {k:'date',l:'التاريخ',t:'date',req:1},{k:'kind',l:'النوع',t:'select',opts:['مصروف','مشتريات','دفعة','دخل','فوايد ورسوم']},
      {k:'name',l:'البيان',t:'text',req:1,full:1},
      {k:'amount',l:'المبلغ',t:'number',req:1},{k:'cat',l:'التصنيف (اختار أو اكتب)',t:'text',list:['مشتريات','أكل وشرب','فواتير ومرافق','مواصلات وبنزين','بيت','عيلة','شخصي','خروجات واجتماعيات','صحة','تعليم','استثمار','سحب كاش','المرتب','فلوس من بره','أخرى']},{k:'via',l:'اتدفع من (كارت / حساب / كاش)',t:'text'},
      {k:'notes',l:'ملاحظات',t:'area',full:1}
    ]
  };

  function mfOnly(v){return v.kind==='Money Fellows'}
  function normalize(d){
    var o={v:2,seeds:(d&&d.seeds)||{},notifs:Array.isArray(d&&d.notifs)?d.notifs:[],notifyHour:d&&d.notifyHour!=null?d.notifyHour:10};
    KEYS.forEach(function(k){o[k]=Array.isArray(d&&d[k])?d[k]:[]});
    if(!d)o.seeds.cash=1;
    if(d&&!o.seeds.cash){o.seeds.cash=1;if(o.wallets.some(function(w){return w.id==='mf9028'})&&!o.wallets.some(function(w){return w.kind==='كاش'}))o.wallets.push({id:'cash_me',name:'كاش معايا',kind:'كاش',balance:0,currency:'EGP',notes:''},{id:'cash_wife',name:'كاش مع زوجتي',kind:'كاش',balance:0,currency:'EGP',notes:''})}
    if(!d||!d.v||d.v<2){ o.cards.forEach(function(c){ if(n(c.rate)>0&&n(c.rate)<1)c.rate=Math.round(n(c.rate)*10000)/100; if(c.fee!=null&&c.feeFixed==null){c.feeFixed=c.fee;delete c.fee} if(!c.name)c.name=c.bank }) }
    /* gamiya types: old 'تطبيق'/'جمعية أهلية' → 'Money Fellows'/'جمعية أفراد'; fill the fee structure of the two known MF gamiyas */
    o.gamiyas.forEach(function(g){
      if(g.kind==='جمعية أهلية')g.kind='جمعية أفراد';
      if(g.kind==='تطبيق'||!g.kind)g.kind=/money\s*fellows|موني|مونى/i.test(String(g.organizer||'')+' '+String(g.name||''))||g.kind==='تطبيق'?'Money Fellows':'جمعية أفراد';
      if(g.adminFee==null&&g.id==='mf96'){g.adminFee=14400;g.taxFee=0;g.payoutFees=7200;g.feeMode='على أول قسط';g.promo=800;g.deposit=100}
      if(g.adminFee==null&&g.id==='mf48'){g.adminFee=960;g.taxFee=135;g.payoutFees=730;g.feeMode='متوزع على الأقساط قبل القبض';g.promo=0;g.deposit=0}
      if(g.fees!=null&&g.adminFee==null&&n(g.fees)){g.adminFee=n(g.fees);g.payoutFees=n(g.fees)}
      delete g.policy;
    });
    o.loans.forEach(function(l){if(!l.outstandingAt&&l.outstanding!==''&&l.outstanding!=null)l.outstandingAt='2026-11-01'});
    var EPP_SEED={
      titan:[['2026-08-29','Amazon Retail EPP',752.08,3,250.69],['2026-05-16','Amazon Marketplace EPP',2142.9,6,357.15],['2026-03-03','Balance Conversion (تحويل رصيد)',15414.11,12,1525.51],
             ['2025-12-01','Amazon Marketplace EPP',1936.51,12,161.37],['2025-11-05','Amazon Marketplace EPP',13223.55,24,550.98]],
      plat:[['2026-09-05','Amazon Marketplace EPP',1319.23,3,439.74],['2026-03-03','Balance Conversion (تحويل رصيد)',69749.68,12,6903.04],['2025-12-01','NOON',1411.5,12,117.62],
            ['2025-11-26','Amazon Retail EPP',519.95,12,43.32],['2025-11-24','Amazon Marketplace EPP',1051.69,12,87.64],['2025-11-10','EPP Amazon Retail',12999,24,541.62],['2025-11-11','NOON',9549,12,795.75]]};
    o.cards.forEach(function(c){if(!Array.isArray(c.epp))c.epp=(EPP_SEED[c.id]||[]).map(function(e){return {id:uid(),date:e[0],desc:e[1],amount:e[2],tenor:e[3],inst:e[4]}})});
    return o;
  }

  /* ================= transactions log (feeds the reports) ================= */
  var TX_OUT=['دفعة','مصروف','مشتريات','سحب كاش'], TX_IN=['دخل','قبض جمعية'];
  function logTx(kind,coll,o,amount,note,date){
    var t={id:uid(),date:date||iso(today()),kind:kind,coll:coll,ref:o?o.id:'',name:o?(coll==='accounts'?o.bank:o.name):'',amount:Math.round(n(amount)*100)/100,notes:note||'',auto:true};
    S.reports.push(t);return t.id;
  }
  function unlogTx(id){if(id)S.reports=S.reports.filter(function(t){return t.id!==id})}

  /* ================= monthly statement prompts ================= */
  /* ================= card installments (EPP / balance conversion) ================= */
  function nextClose(day,after){var c=clampD(after.getFullYear(),after.getMonth(),day);return c>after?c:clampD(after.getFullYear(),after.getMonth()+1,day)}
  function eppCalc(c,e){
    var cd=n(c.closeDay), d=parseD(e.date)||today(), ten=Math.max(1,Math.round(n(e.tenor))), inst=n(e.inst)||Math.round(n(e.amount)/ten*100)/100, amt=n(e.amount);
    var first=parseD(e.first)||(cd?nextClose(cd,d):clampD(d.getFullYear(),d.getMonth()+1,d.getDate()));
    var L=cd?lastClose(cd,today()):today(), billed=first<=L?Math.min(monthsBetween(first,L)+1,ten):0, left=ten-billed;
    var flat=inst*ten<=amt*1.01+1, total=flat?amt:Math.round(inst*ten*100)/100;
    var remPay=left<=0?0:flat?Math.round((amt-billed*inst)*100)/100:Math.round(left*inst*100)/100;
    var held=left<=0?0:flat?remPay:Math.round(amt*left/ten*100)/100;
    var fd=first.getDate(), lastBill=clampD(first.getFullYear(),first.getMonth()+ten-1,cd||fd), nextBill=left>0?clampD(first.getFullYear(),first.getMonth()+billed,cd||fd):null;
    return {inst:inst,ten:ten,billed:billed,left:left,remPay:remPay,held:held,flat:flat,interest:flat?0:Math.round((total-amt)*100)/100,first:first,lastBill:lastBill,nextBill:nextBill,
      nextInst:left===1&&flat?remPay:inst};
  }
  function eppSum(c){var a=(c.epp||[]).map(function(e){return eppCalc(c,e)});
    return {list:a,held:sum(a,function(x){return x.held}),remPay:sum(a,function(x){return x.remPay}),next:sum(a,function(x){return x.left>0?x.nextInst:0}),active:a.filter(function(x){return x.left>0}).length}}
  function lastClose(day,onOrBefore){var y=onOrBefore.getFullYear(),m=onOrBefore.getMonth(),d=clampD(y,m,day);return d<=onOrBefore?d:clampD(y,m-1,day)}
  function cardStmtNeed(c){
    var cd=n(c.closeDay); if(!cd)return null;
    var L=lastClose(cd,today()), due=parseD(c.due);
    var have=c.stmtFor?parseD(c.stmtFor):(due?lastClose(cd,new Date(due.getFullYear(),due.getMonth(),due.getDate()-10)):null);
    return (!have||have<L)?{close:L}:null;
  }
  function loanUpdNeed(l){
    var at=parseD(l.outstandingAt), due=parseD(l.nextDue); if(!due||calcLoan(l).done)return null;
    if(!at)return {since:null};
    var t=today(), day=n(String(l.nextDue).split('-')[2])||1, last=lastClose(day,t);
    return at<last?{since:at}:null;
  }
  function openStmtForm(c){
    var need=cardStmtNeed(c), L=need?need.close:lastClose(n(c.closeDay)||1,today());
    var x=calcCard(c), nd=parseD(c.due)?addMonth(parseD(c.due)):addMonth(today()); if(x.waiting)nd=x.nextDue;
    while(nd<=L)nd=addMonth(nd);
    var mon=L.toLocaleDateString('ar-EG-u-nu-latn',{month:'long',year:'numeric'});
    openForm('cards',c.id,{paid:0,statement:'',min:'',due:iso(nd),stmtCharges:''},'كشف '+mon+': '+c.name,
      'من كشف الحساب اللي قفل يوم '+L.toLocaleDateString('ar-EG-u-nu-latn',{day:'numeric',month:'long'})+': اكتب المطلوب للسداد والحد الأدنى وآخر ميعاد. الرصيد الحالي والفوايد اختياري.');
    sheet.only=['statement','min','due','stmtCharges','balance'];
    sheet.onSave=function(o){o.stmtFor=iso(L);o.cyc=null;
      logTx('كشف','cards',o,o.statement,'كشف '+mon+' · حد أدنى '+fmt(o.min)+' · السداد '+o.due);
      if(n(o.stmtCharges)>0)logTx('فوايد ورسوم','cards',o,o.stmtCharges,'من كشف '+mon)};
    renderSheet();
  }
  function openLoanUpd(l){
    openForm('loans',l.id,null,'تحديث شهري: '+l.name,'من كشف أو تطبيق البنك: اكتب المتبقي من القرض، وراجع القسط وميعاد القسط الجاي.');
    sheet.only=['outstanding','installment','nextDue'];
    sheet.onSave=function(o){o.outstandingAt=iso(today())};
    renderSheet();
  }

  /* ================= bank tariffs (credit cards + personal loans) =================
     c: r=monthly rate %, b='k' interest on full statement / 'm' on remaining, lf=late fee EGP, lp=late % of minimum,
        of=over-limit fee EGP, op=over-limit % of excess, mf=monthly fixed fees EGP (SMS/statement/insurance), mp=monthly % of balance,
        minP/minF=minimum payment % and floor, cash=cash advance fee text
     t: card types [name, annual fee, {overrides}]   l: personal loan: rate=[from,to] annual %, pr=+% yearly on overdue, pf=fixed EGP per late instalment,
        pp=% of overdue amount, early=% early settlement, admin=% admin fee
     q: 'رسمي' (bank's own published tariff), 'موقع' (comparison site, recent), 'تقديري' (no published tariff found: market average, edit from your statement) */
  var BANKS=[
    {id:'nbe',n:'البنك الأهلي المصري',s:'الأهلي',q:'موقع',src:'بنكي (يوليو 2026) + تعريفة القروض على موقع البنك',
      c:{r:3.5,b:'k',lf:75,of:75,minP:5,minF:100,cash:'2% (أقل حاجة 10 ج)'},
      t:[['Classic',150],['Gold',''],['Titanium',''],['Platinum',''],['World Elite',5000,{r:3.15}]],
      l:{rate:[19,24],pf:20,pp:2,early:7,admin:2,note:'غرامة القسط: 20 ج شهريًا + 2% من المتأخر · السداد المعجل 7% (12% لو بنك تاني اشترى المديونية)'}},
    {id:'bm',n:'بنك مصر',s:'بنك مصر',q:'رسمي',src:'صفحات بطاقات بنك مصر + حدود ورسوم البطاقات 01-09-2026',
      c:{r:4,b:'m',lf:75,of:75,minP:5,minF:0,cash:'2% (أقل حاجة 15 ج) · بره مصر 3% + 50 ج'},
      t:[['Classic',250],['Gold',250],['Titanium',350],['Platinum',''],['World',2500],['World Elite / Infinite',8000],['كنانة Classic',250,{r:3}],['كنانة Titanium',350,{r:3}]],
      l:{rate:[19,24],note:'مفيش غرامات قروض منشورة لقيتها'}},
    {id:'bdc',n:'بنك القاهرة',s:'بنك القاهرة',q:'رسمي',src:'تعريفة بنك القاهرة 19-10-2026',
      c:{r:4.3,b:'k',lf:200,of:100,op:2,mf:10,minP:5,minF:100,cash:'حسب التعريفة'},
      t:[['Classic',''],['Gold',300],['Titanium',''],['Platinum','']],
      l:{rate:[23,30],note:'غرامة التأخير في الكارت: 7% من الحد الأدنى (أقل حاجة 100 وأقصى 200)'}},
    {id:'cib',n:'البنك التجاري الدولي (CIB)',s:'CIB',q:'رسمي',src:'تعريفة CIB سبتمبر 2026',
      c:{r:3.99,b:'k',lf:150,of:150,mf:45,minP:5,minF:0,cash:'حسب التعريفة'},
      t:[['Classic',''],['Gold',''],['Titanium',''],['Platinum',''],['World',''],['Infinite','']],
      l:{rate:[21,25.5],pr:5,early:10,note:'غرامة القسط: سعر القرض + 5% على المتأخر · السداد المعجل 10% (التمويل العقاري 7%)'}},
    {id:'alex',n:'بنك الإسكندرية',s:'AlexBank',q:'رسمي',src:'بيان المعلومات الأساسية لبطاقات بنك الإسكندرية (يوليو 2026)',
      c:{r:3.9,b:'k',lf:100,of:75,minP:5,minF:0,cash:'4% (أقل حاجة 50 ج) · بره مصر 6% (أقل حاجة 100)'},
      t:[['Gold',350],['Titanium',400],['Platinum',650,{r:3.5}],['World',3000,{r:3.5}]],
      l:{rate:[19.5,21.5]}},
    {id:'hdb',n:'بنك التعمير والإسكان',s:'HDB',q:'موقع',src:'بنكي (أبريل 2025)',
      c:{r:3,b:'m',lf:'',of:75,minP:5,minF:0,cash:'2% (أقل حاجة 25 ج)'},
      t:[['Classic',200],['Titanium',300],['Platinum',500]],l:{}},
    {id:'ub',n:'المصرف المتحد',s:'المصرف المتحد',q:'تقديري',src:'مفيش تعريفة منشورة لقيتها',c:{},t:[['Classic',''],['Gold',''],['Platinum','']],l:{}},
    {id:'abe',n:'البنك الزراعي المصري',s:'البنك الزراعي',q:'تقديري',src:'مفيش تعريفة منشورة لقيتها',c:{},t:[['Classic',''],['Gold','']],l:{}},
    {id:'ealb',n:'البنك العقاري المصري العربي',s:'EALB',q:'موقع',src:'بنكي (أغسطس 2026)',
      c:{r:1.6,b:'k',lf:'',of:'',minP:5,minF:100,cash:'20 ج'},t:[['Gold',50]],l:{}},
    {id:'idb',n:'بنك التنمية الصناعية',s:'IDB',q:'تقديري',src:'مفيش تعريفة كروت منشورة لقيتها',c:{},t:[['Classic','']],l:{}},
    {id:'mid',n:'ميد بنك',s:'MIDBank',q:'موقع',src:'بنكي (2026)',c:{r:4,b:'k',minP:5,minF:0},t:[['Classic',''],['Platinum',''],['Signature',''],['Infinite Privilege',6000]],l:{}},
    {id:'awb',n:'التجاري وفا بنك',s:'Attijariwafa',q:'موقع',src:'بنكي (أغسطس 2026)',
      c:{r:4.2,b:'k',lf:750,of:75,minP:5,minF:100,cash:'35 ج · بره مصر 80 ج'},t:[['Classic',''],['Gold',''],['Platinum',''],['Signature',1500]],l:{}},
    {id:'saib',n:'سايب (saib)',s:'saib',q:'موقع',src:'بنكي (أغسطس 2026)',
      c:{r:4.5,b:'k',lf:150,of:200,minP:5,minF:100,cash:'7% (أقل حاجة 70 ج) · بره مصر 10%'},t:[['Classic',250],['Gold',''],['Titanium',''],['Platinum','']],l:{}},
    {id:'cae',n:'كريدي أجريكول',s:'Crédit Agricole',q:'رسمي',src:'تعريفة الأفراد ديسمبر 2024 + بنكي (أكتوبر 2026)',
      c:{r:4.1,b:'k',lf:300,of:100,minP:5,minF:50,cash:'5% (أقل حاجة 200 ج)'},t:[['Gold',300],['Platinum',500],['Infinite',2000]],
      l:{pr:5,early:15,admin:2,note:'غرامة القسط: سعر القرض + 5% على المتأخر · السداد المعجل أو الجزئي 15% · مصاريف إدارية 2% (أقل حاجة 200)'}},
    {id:'enbd',n:'بنك الإمارات دبي الوطني',s:'Emirates NBD',q:'رسمي',src:'تعريفة الأفراد 01-10-2026',
      c:{r:4.99,b:'k',lf:200,of:150,mf:30,minP:5,minF:50,cash:'4% (أقل حاجة 50 ج) · بره مصر 10%'},
      t:[['Classic',300],['Gold',300],['Titanium',300,{mf:40}],['TMG Titanium',400,{mf:40}],['TMG Platinum',650,{mf:50}],['World',3000,{mf:50}],['World Elite',8000,{mf:50}]],
      l:{pr:5,pf:100,early:10,admin:2.5,note:'غرامة القسط: + 5% سنويًا على المتأخر + 100 ج لكل قسط · السداد المعجل 10% (15% بالتحويل) · مصاريف إدارية 2.5% (أقل حاجة 500)'}},
    {id:'scb',n:'بنك قناة السويس',s:'بنك قناة السويس',q:'موقع',src:'بنكي (أكتوبر 2026)',c:{r:3.75,b:'k',minP:5,minF:0},t:[['Classic',''],['Gold',''],['Titanium',''],['Platinum',''],['Infinite',4000]],l:{}},
    {id:'qnb',n:'QNB مصر',s:'QNB',q:'موقع',src:'بنكي (أكتوبر 2026) + banksegypt (يونيو 2026)',
      c:{r:4.35,b:'m',minP:5,minF:100},t:[['Standard',150],['Classic',250],['Gold',250],['Platinum',600],['Infinite',1750]],l:{rate:[21,25.5]}},
    {id:'nxt',n:'بنك NXT (بنك الاستثمار العربي سابقًا)',s:'NXT',q:'رسمي',src:'تعريفة بنك NXT + الشيت',
      c:{r:4.2,b:'m',lf:150,of:200,mp:0.4,minP:5,minF:0},t:[['Spark',''],['Classic',''],['Platinum','']],l:{}},
    {id:'abk',n:'البنك الأهلي الكويتي (ABK)',s:'ABK',q:'رسمي',src:'تعريفة ABK + الشيت',
      c:{r:4.17,b:'k',lf:150,of:150,mf:100,mp:0.4,minP:5,minF:0},t:[['Classic',''],['Gold',''],['Platinum','']],l:{}},
    {id:'fab',n:'بنك أبوظبي الأول مصر (FAB)',s:'FAB مصر',q:'رسمي',src:'جدول رسوم الأفراد أكتوبر 2025',
      c:{r:4.39,b:'k',lf:150,of:150,mf:100,minP:5,minF:50,cash:'4% (أقل حاجة 40 ج) · بره مصر 8%'},
      t:[['Classic',250,{mf:105}],['Gold',400],['Titanium',400],['Platinum',600],['World Elite',6000]],
      l:{pf:150,pr:0,early:10,admin:2,note:'غرامة القسط 150 ج + عائد تأخير 22.75% سنويًا · السداد المعجل 10% (8% بضمان، 15% بالتحويل)'}},
    {id:'kfh',n:'بيت التمويل الكويتي مصر (KFH)',s:'KFH',q:'موقع',src:'بنكي (2026) + عقد KFH',c:{r:4,b:'k',minP:5,minF:0},t:[['Classic',''],['Platinum',''],['Infinite',8000]],
      l:{pp:5,note:'غرامة التأخير: مبلغ تصدّق 5% شهريًا حسب أيام التأخير · مكافأة سداد مبكر'}},
    {id:'faisal',n:'بنك فيصل الإسلامي',s:'بنك فيصل',q:'تقديري',src:'مفيش تعريفة منشورة لقيتها',c:{},t:[['Classic',''],['Gold','']],l:{}},
    {id:'baraka',n:'بنك البركة',s:'البركة',q:'رسمي',src:'رسوم البركة + الشيت',
      c:{r:4.5,b:'m',lf:100,mf:35,minP:5,minF:0},t:[['Classic',250],['Titanium',400],['Platinum',650],['World',2500]],l:{}},
    {id:'nbk',n:'بنك الكويت الوطني مصر (NBK)',s:'NBK',q:'تقديري',src:'مفيش تعريفة منشورة لقيتها',c:{},t:[['Classic',''],['Platinum',''],['Infinite','']],l:{}},
    {id:'adib',n:'مصرف أبوظبي الإسلامي مصر',s:'ADIB',q:'رسمي',src:'جدول رسوم البطاقات المغطاة',
      c:{r:4.99,b:'k',lf:125,mf:40,minP:5,minF:0,cash:'10% (أقل حاجة 100 ج)'},
      t:[['Standard',350],['Gold',350],['Titanium',475,{mf:50}],['Platinum',900,{mf:60}],['Signature',2500,{mf:60,r:3.99}],['Infinite',5000,{mf:60,r:3.99}]],l:{}},
    {id:'adcb',n:'بنك أبوظبي التجاري مصر (ADCB)',s:'ADCB',q:'رسمي',src:'تعريفة ADCB أغسطس 2026',
      c:{r:4.25,b:'k',lf:180,of:175,mf:35,minP:5,minF:0},t:[['Classic',''],['Titanium',''],['Platinum',''],['Misr Cashback',750]],l:{}},
    {id:'egb',n:'البنك المصري الخليجي (EG Bank)',s:'EG Bank',q:'موقع',src:'بنكي (2026)',
      c:{r:2.95,b:'k',of:70,minP:5,minF:0,cash:'4% (أقل حاجة 30 ج)'},t:[['Mint',0,{r:2.8}],['Classic',100],['Titanium',250],['Platinum',400],['World',2000],['Freelance','']],l:{}},
    {id:'aaib',n:'البنك العربي الأفريقي الدولي (AAIB)',s:'AAIB',q:'رسمي',src:'تعريفة بطاقات AAIB (بدون تاريخ؛ تعريفة يناير 2026 ما فتحتش)',
      c:{r:4.99,b:'k',lf:150,of:150,mp:0.24,minP:5,minF:0,cash:'3% (أقل حاجة 40 ج)'},
      t:[['Gold',300],['Titanium',400],['Platinum',600],['Signature',1500],['World Elite',6000]],l:{}},
    {id:'hsbc',n:'HSBC مصر',s:'HSBC',q:'موقع',src:'بنكي (يوليو 2026)',c:{r:4.42,b:'k',minP:5,minF:100},t:[['Gold',0],['Advance',''],['Platinum Cashback',''],['Premier','']],l:{rate:[21,24]}},
    {id:'abc',n:'بنك المؤسسة العربية المصرفية (ABC)',s:'ABC',q:'رسمي',src:'تعريفة ABC 17-08-2025',
      c:{r:4.5,b:'k',lf:200,of:150,mf:30,mp:0.05,minP:5,minF:0},t:[['Classic',''],['Gold',''],['Platinum','']],l:{rate:[19,19]}},
    {id:'ebe',n:'البنك المصري لتنمية الصادرات',s:'EBank',q:'تقديري',src:'مفيش تعريفة منشورة لقيتها',c:{},t:[['Classic',''],['Platinum','']],l:{}},
    {id:'aib',n:'البنك العربي الدولي',s:'AIB',q:'تقديري',src:'مفيش تعريفة منشورة لقيتها',c:{},t:[['Classic',''],['Platinum','']],l:{}},
    {id:'citi',n:'سيتي بنك مصر',s:'Citi',q:'تقديري',src:'مش بيصدر كروت أفراد في مصر حاليًا',c:{},t:[['Card','']],l:{}},
    {id:'arab',n:'البنك العربي',s:'Arab Bank',q:'موقع',src:'بنكي (أكتوبر 2026)',c:{r:2.49,b:'k',minP:5,minF:0},t:[['Titanium',400],['LALIGA Platinum',1000],['Travel Mate',5000],['Online Shopping',150]],l:{}},
    {id:'mashreq',n:'بنك المشرق مصر (e& Mashreq NEO)',s:'المشرق',q:'رسمي',src:'جدول رسوم e&Mashreq NEO ديسمبر 2024',
      c:{r:4.25,b:'k',lf:100,of:100,mf:55,mp:0.9,minP:5,minF:50,cash:'3% (أقل حاجة 30 ج)'},t:[['NEO',250],['NEO Plus',500,{r:3.99,mf:50}]],
      l:{early:8,note:'قروض بضمان: غرامة تأخير 500 ج · سداد معجل 8% · جزئي 5% · مصاريف 2%'}},
    {id:'nbg',n:'البنك الأهلي اليوناني',s:'NBG',q:'تقديري',src:'مفيش تعريفة كروت أفراد منشورة',c:{},t:[['Card','']],l:{}},
    {id:'stan',n:'ستاندرد تشارترد',s:'Standard Chartered',q:'تقديري',src:'بنك شركات في مصر',c:{},t:[['Card','']],l:{}}
  ];
  var BANK_DEF={r:4,b:'k',lf:150,lp:0,of:150,op:0,mf:0,mp:0,minP:5,minF:100,cash:''};
  function bankById(id){return BANKS.filter(function(b){return b.id===id})[0]}
  function bankPreset(bk,type){
    var c={};for(var k in BANK_DEF)c[k]=BANK_DEF[k];for(var k2 in bk.c)if(bk.c[k2]!==''&&bk.c[k2]!=null)c[k2]=bk.c[k2];
    var t=(bk.t||[]).filter(function(x){return x[0]===type})[0]; if(t&&t[2])for(var k3 in t[2])c[k3]=t[2][k3];
    c.annual=t?t[1]:'';return c;
  }
  function presetHtml(f){
    var v=f.v, isCard=f.coll==='cards', bk=bankById(v.bankId);
    var h='<div class="whatif preset"><div class="r"><span class="k"><b style="color:var(--ink)">'+(isCard?'🏦 اختار البنك ونوع الكارت':'🏦 اختار البنك')+'</b></span></div>'+
      '<p class="note" style="margin:0">'+(isCard?'الفايدة والرسوم والغرامات هتتملي لوحدها من تعريفة البنك، وتقدر تعدل أي رقم تحت.':'غرامة التأخير والسداد المعجل والمصاريف هتتملي من تعريفة البنك، وتقدر تعدلها.')+'</p>'+
      '<div class="fields"><label for="pp-bank">البنك<select id="pp-bank"><option value="">— اختار —</option>'+BANKS.map(function(b){return '<option value="'+b.id+'"'+(b.id===v.bankId?' selected':'')+'>'+esc(b.n)+(b.q==='تقديري'?' (تقديري)':'')+'</option>'}).join('')+'</select></label>';
    if(isCard)h+='<label for="pp-type">نوع الكارت<select id="pp-type"'+(bk?'':' disabled')+'><option value="">— اختار —</option>'+(bk?bk.t.map(function(t){return '<option'+(t[0]===v.cardType?' selected':'')+'>'+esc(t[0])+'</option>'}).join(''):'')+'</select></label>';
    h+='</div>';
    if(bk)h+='<p class="note" style="margin:0">'+(bk.q==='رسمي'?'✅ من تعريفة البنك الرسمية':bk.q==='موقع'?'ℹ️ من مواقع مقارنة البنوك (حديثة)':'⚠️ تقديري: ما لقيتش تعريفة منشورة للبنك ده، فدي أرقام متوسط السوق. عدّلها من أول كشف')+' · '+esc(bk.src)+
      (!isCard&&bk.l&&bk.l.note?'<br>'+esc(bk.l.note):'')+(!isCard&&bk.l&&bk.l.rate?'<br>سعر القروض الشخصية عادة من '+bk.l.rate[0]+'% لـ '+bk.l.rate[1]+'% سنويًا (حسب العميل)':'')+'</p>';
    return h+'</div>';
  }
  function applyPreset(f,changed){
    var v=f.v, bk=bankById(v.bankId); if(!bk)return; f.man={};
    if(f.coll==='cards'&&changed==='bank'&&bk.t.length===1)v.cardType=bk.t[0][0];
    v.bank=bk.s;
    if(f.coll==='cards'){var nm=bk.s+(v.cardType?' '+v.cardType:''); if(!v.name||v.name===f.autoName)v.name=nm; f.autoName=nm}
    var sg=sugOf(f); for(var k in sg)v[k]=sg[k];
    if(f.coll==='loans'&&bk.l&&bk.l.rate&&(v.rate===''||v.rate==null))v.rate=bk.l.rate[0];
  }
  function loanPen(l){
    if(l.penalty!==''&&l.penalty!=null&&n(l.penalty)>0)return n(l.penalty);
    var i=n(l.installment);if(!i)return 0;
    return Math.round((i*(n(l.rate)+n(l.penaltyRate))/1200*(n(l.penaltyRate)?1:0)+n(l.penaltyFixed)+i*n(l.penaltyPct)/100)*100)/100;
  }

  /* ================= guided add (step by step, essentials first) ================= */
  var HINT={
    cards:{limit:'Credit limit',available:'Available limit · المتاح',balance:'Outstanding / Used · المستخدم',closeDay:'Statement date · رقم اليوم بس (1-31)',statement:'Total amount due',min:'Minimum amount due',due:'Payment due date',
      number:'الـ 16 رقم اللي على الكارت (بيتخبى)',cvv:'التلات أرقام على ضهر الكارت',name:'بيتكتب لوحده لما تختار البنك والنوع'},
    loans:{installment:'Installment amount',nextDue:'Next installment date',maturity:'Maturity date · آخر قسط',outstanding:'Outstanding / Remaining principal',amount:'Loan amount · من العقد',rate:'من العقد (سنوي)',ref:'Contract / Loan no.'},
    accounts:{balance:'Available balance · الرصيد المتاح',name:'جاري / توفير / مرتب…'},
    wallets:{balance:'الرصيد اللي ظاهر في التطبيق أو الرسالة'},
    income:{amount:'الصافي اللي بينزل فعلًا',day:'رقم اليوم بس (1-31)'},
    expenses:{day:'رقم اليوم بس (1-31)'},
    gamiyas:{turn:'دورك في القبض (مثلًا 3)',start:'ميعاد أول قسط'},
    insurance:{payDay:'رقم اليوم بس (1-31)'},
    bnpl:{dueDay:'رقم اليوم بس (1-31)'}
  };
  var WALW={'محفظة موبايل':'افتح تطبيق المحفظة (أنا فودافون، e& money، My Orange، My WE) أو اطلب الكود (*9# لفودافون كاش) وشوف الرصيد.',
    'محفظة بنكية':'من تطبيق البنك ← المحفظة.','كارت مدفوع مسبقًا':'من تطبيق الكارت (Money Fellows، ماي فوري…) أو آخر رسالة.','كاش':'عدّ الفلوس اللي معاك واكتب المبلغ.','عملات رقمية':'من التطبيق (Binance…): اكتب الرصيد بالعملة وقيمته بالجنيه.'};
  var WIZ={
    cards:[
      {t:'البنك ونوع الكارت',pre:1,k:['name','bank'],req:['name'],w:'البنك ونوع الكارت (Classic / Gold / Titanium / Platinum…) مكتوبين على وش الكارت. اختارهم من فوق والفايدة والرسوم هتتملي لوحدها.'},
      {t:'الحد والرصيد دلوقتي',k:['limit','available','balance'],req:['limit'],any:[['available','balance'],'اكتب المتاح أو المستخدم (واحد منهم يكفي)'],w:'افتح تطبيق البنك ← الكروت ← الكارت ده. هتلاقي الحد الائتماني، والمتاح، والمستخدم. يكفي المتاح أو المستخدم.'},
      {t:'الكشف وميعاد السداد',k:['closeDay','statement','min','due'],req:['closeDay'],w:'من آخر كشف حساب (الإيميل أو تطبيق البنك ← كشوف الحساب): يوم تقفيل الكشف، والمطلوب، والحد الأدنى، وآخر ميعاد. لو مفيش كشف عليك دلوقتي اكتب يوم التقفيل بس.'},
      {t:'الفايدة والرسوم',sug:1,k:['rate','interestBase','feeFixed','feePct','overFee','overPct','monthlyFee','monthlyPct','minPct','minFixed','annualFee','cashFee'],w:'دي من تعريفة البنك. سيب المقترح زي ما هو، أو دوس "قيمة تانية" لو الكشف بيقول غير كده.'},
      {t:'بيانات الكارت',opt:1,k:['cardType','number','cvv','issue','expiry'],w:'من على الكارت نفسه. مش لازمين للحسابات، بس عشان ترجعلهم وقت ما تحتاج. الرقم والـ CVV بيتخبوا.'}],
    loans:[
      {t:'البنك ونوع القرض',pre:1,k:['name','bank'],req:['name'],w:'نوع القرض (شخصي، عربية، عقاري…) من العقد أو تطبيق البنك ← القروض.'},
      {t:'القسط',k:['installment','nextDue','maturity'],req:['installment','nextDue','maturity'],w:'من تطبيق البنك ← القروض ← القرض ده، أو من جدول الأقساط: قيمة القسط، وميعاد القسط الجاي، وتاريخ آخر قسط.'},
      {t:'المتبقي من القرض',k:['outstanding','amount'],req:['outstanding'],w:'"المتبقي" أو Outstanding في تطبيق البنك. قيمة القرض الأصلية من العقد (اختياري).'},
      {t:'الفايدة والغرامات',sug:1,k:['rate','penaltyRate','penaltyFixed','penaltyPct','earlyPct','adminPct'],w:'الفايدة من عقدك. الغرامات والسداد المعجل من تعريفة البنك: سيب المقترح أو دوس "قيمة تانية".'},
      {t:'تفاصيل',opt:1,k:['ref','term','start','penalty','notes'],w:'من العقد. مش لازمين للحسابات.'}],
    debts:[
      {t:'السلفة',k:['name','kind','amount'],req:['name','amount'],w:'مين اللي سلّفك، وقد إيه لسه عليك.'},
      {t:'تفاصيل',opt:1,k:['date','plan','notes'],w:'إمتى أخدتها واتفقتوا على الرد إزاي.'}],
    lent:[
      {t:'السلفة',k:['name','amount'],req:['name','amount'],w:'مين اللي معاه فلوسك، وقد إيه.'},
      {t:'تفاصيل',opt:1,k:['date','plan','notes'],w:'إمتى سلّفته واتفقتوا على الرد إزاي.'}],
    income:[
      {t:'الدخل',k:['name','amount','day'],req:['name','amount','day'],w:'المرتب أو أي دخل ثابت: المبلغ اللي بينزل فعلًا (من رسالة البنك أو كشف الحساب) ويوم نزوله.'},
      {t:'ملاحظات',opt:1,k:['notes'],w:''}],
    expenses:[
      {t:'المصروف',k:['name','kind','amount','day'],req:['name','amount','day'],w:'الإيجار، النت، الموبايل، المدرسة… المبلغ اللي بتدفعه كل شهر ويوم دفعه.'},
      {t:'ملاحظات',opt:1,k:['notes'],w:''}],
    gamiyas:[
      {t:'الجمعية',k:['name','organizer','installment','months','start','turn'],req:['name','installment','months','start','turn'],w:'من تطبيق Money Fellows ← جمعياتي، أو من اتفاقك مع المسؤول: القسط، وعدد الشهور، وأول قسط، ودورك.'},
      {t:'الرسوم وشهر القبض',k:['deduct','adminFee','taxFee','payoutFees','feeMode','promo','deposit'],w:'من تفاصيل الجمعية في التطبيق (الرسوم والضريبة). لو مش متأكد سيبها.'},
      {t:'تعديل يدوي',opt:1,k:['installmentBefore','payout','payoutDate','notes'],w:'لو حسابي للقسط أو صافي القبض مختلف عن التطبيق اكتبه هنا.'}],
    insurance:[
      {t:'الوثيقة',k:['name','company','premium','payDay'],req:['name','premium','payDay'],w:'من الوثيقة أو تطبيق شركة التأمين: القسط الشهري ويوم دفعه.'},
      {t:'المدة والتحصيل',opt:1,k:['start','end','payout','payoutDate','policyNo','notes'],w:'من الوثيقة.'}],
    bnpl:[
      {t:'حساب التقسيط',k:['name','limit','dueDay'],req:['name','dueDay'],w:'من تطبيق فاليو / أمان / سهولة… ← الحساب: الحد ويوم السداد.'},
      {t:'تفاصيل',opt:1,k:['lateFee','notes'],w:'غرامة التأخير من شروط التطبيق.'}],
    accounts:[
      {t:'الحساب والرصيد',k:['bank','name','balance'],req:['bank','balance'],w:'افتح تطبيق البنك ← الحسابات: اسم الحساب والرصيد المتاح.'},
      {t:'بيانات الحساب والكارت',opt:1,k:['accountNo','iban','currency','cardNumber','cvv','cardExpiry','notes'],w:'من تطبيق البنك أو كارت الحساب. مش لازمين للحسابات.'}],
    wallets:[
      {t:'الرصيد',k:['name','provider','balance'],req:['name','balance'],w:function(v){return WALW[v.kind]||'اكتب الرصيد اللي ظاهر في التطبيق.'}},
      {t:'العملة والقيمة بالجنيه',k:['currency','egp'],req:['currency','egp'],when:function(v){return v.kind==='عملات رقمية'},w:'العملة (USDT، BTC…) وقيمة الرصيد بالجنيه النهاردة.'},
      {t:'تفاصيل',opt:1,k:['number','currency','cardNumber','cvv','cardExpiry','notes'],w:'رقم الخط أو الكارت (لو فيه). مش لازمين للحسابات.'}]
  };
  function sugOf(f){
    var bk=bankById(f.v.bankId); if(!bk)return null;
    if(f.coll==='cards'){var c=bankPreset(bk,f.v.cardType);
      return {rate:c.r,interestBase:c.b==='m'?'على المتبقي':'على كامل الكشف',feeFixed:c.lf,feePct:c.lp||'',overFee:c.of,overPct:c.op||'',monthlyFee:c.mf||'',monthlyPct:c.mp||'',minPct:c.minP,minFixed:c.minF||'',annualFee:c.annual,cashFee:c.cash||''}}
    if(f.coll==='loans'){var L=bk.l||{};return {penaltyRate:L.pr!=null?L.pr:'',penaltyFixed:L.pf!=null?L.pf:'',penaltyPct:L.pp!=null?L.pp:'',earlyPct:L.early!=null?L.early:'',adminPct:L.admin!=null?L.admin:''}}
    return null;
  }
  function wzSteps(f){var fs=FIELDS[f.coll];
    return (WIZ[f.coll]||[]).filter(function(s){return (!s.when||s.when(f.v))&&s.k.some(function(k){var fd=fs.filter(function(x){return x.k===k})[0];return fd&&(!fd.when||fd.when(f.v))})})}
  function isWiz(f){return f&&f.mode==='form'&&!f.id&&!f.only&&!!WIZ[f.coll]}
  function grabForm(){if(!sheet||!FIELDS[sheet.coll])return;FIELDS[sheet.coll].forEach(function(x){if(!x.k)return;var el=document.getElementById('f-'+x.k);if(el)sheet.v[x.k]=el.value})}
  function sugTxt(fd,val){if(val===''||val==null)return '—';if(fd.t!=='number')return esc(val);
    return '<bdi>'+fmt(val)+(/٪|%/.test(fd.l)?'%':/\(ج\)/.test(fd.l)?' ج':'')+'</bdi>'}
  function wzCheck(f,s){
    var empty=function(k){var x=f.v[k];return x===''||x==null};
    for(var i=0;i<(s.req||[]).length;i++){var k=s.req[i];var fd=FIELDS[f.coll].filter(function(x){return x.k===k})[0];
      if(fd&&fd.when&&!fd.when(f.v))continue;
      if(empty(k)){f.errK=k;return 'اكتب '+fd.l}}
    if(s.any&&s.any[0].every(empty)){f.errK=s.any[0][0];return s.any[1]}
    var dd=['closeDay','day','payDay','dueDay'];for(var j=0;j<dd.length;j++){var d=f.v[dd[j]];if(s.k.indexOf(dd[j])>=0&&d!==''&&d!=null&&!(n(d)>=1&&n(d)<=31)){f.errK=dd[j];return 'اليوم لازم يكون رقم من 1 لـ 31'}}
    if(f.coll==='cards'&&s.k.indexOf('statement')>=0&&n(f.v.statement)>0&&empty('due')){f.errK='due';return 'اكتب آخر ميعاد للسداد بتاع الكشف'}
    if(f.coll==='cards'&&s.k.indexOf('statement')>=0&&n(f.v.min)>n(f.v.statement)&&n(f.v.statement)>0){f.errK='min';return 'الحد الأدنى أكبر من المطلوب، راجعه'}
    f.errK=null;return '';
  }
  (function(){var bl=BANKS.map(function(b){return b.s});['cards','loans','accounts'].forEach(function(c){var fd=FIELDS[c].filter(function(x){return x.k==='bank'})[0];if(fd)fd.list=bl});
    var L={loans:['قرض شخصي','قرض عربية','تمويل عقاري','قرض بضمان شهادة','قرض بضمان وديعة','قرض تعليم'],expenses:['إيجار','كهربا','مية','غاز','نت البيت','باقة الموبايل','مدرسة','نادي','اشتراكات'],
      income:['المرتب','شغل حر','إيجار','عائد شهادات'],insurance:['تأمين حياة','تأمين طبي','تأمين عربية','وثيقة استثمار'],accounts:['حساب جاري','حساب توفير','حساب مرتب']};
    for(var c in L){var fd=FIELDS[c].filter(function(x){return x.k==='name'})[0];if(fd&&!fd.list)fd.list=L[c]}})();
  function fieldHtml(f,fd,sgv,reqd){
    var v=f.v, id='f-'+fd.k, val=v[fd.k]==null?'':v[fd.k], cls=((fd.full||fd.t==='area')?'full':'')+(f.errK===fd.k?' err':''), ctl;
    if(fd.t==='area')ctl='<textarea id="'+id+'">'+esc(val)+'</textarea>';
    else if(fd.t==='select')ctl='<select id="'+id+'">'+fd.opts.map(function(o){return '<option'+(o===val?' selected':'')+'>'+esc(o)+'</option>'}).join('')+'</select>';
    else ctl='<input id="'+id+'" type="'+(fd.t==='number'?'number':fd.t)+'"'+(fd.t==='number'?' inputmode="decimal" step="any"':'')+(fd.mode?' inputmode="'+fd.mode+'"':'')+
      ((fd.ltr||fd.t==='number'||fd.t==='date')?' class="ltr"':'')+(fd.list?' list="dl-'+fd.k+'"':'')+' value="'+esc(val)+'" autocomplete="off">'+
      (fd.list?'<datalist id="dl-'+fd.k+'">'+fd.list.map(function(x){return '<option value="'+esc(x)+'">'}).join('')+'</datalist>':'');
    var hn=HINT[f.coll]&&HINT[f.coll][fd.k];
    var hasS=sgv!==''&&sgv!=null, isMan=f.man&&f.man[fd.k];
    var sl=(hasS&&(isMan||String(sgv)!==String(val)))?'<button type="button" class="sugl" data-act="sug-use" data-k="'+fd.k+'">'+(isMan?'رجّع مقترح البنك ('+sugTxt(fd,sgv)+')':'مقترح البنك: '+sugTxt(fd,sgv)+' · استخدمه')+'</button>':'';
    return '<label class="'+cls+'" for="'+id+'">'+fd.l+(reqd?' <b class="rq">*</b>':'')+ctl+(hn?'<small class="fhint">'+esc(hn)+'</small>':'')+sl+'</label>';
  }
  function wizHtml(f){
    var steps=wzSteps(f); if(f.step==null)f.step=0; if(f.step>steps.length-1)f.step=steps.length-1;
    var s=steps[f.step], last=f.step===steps.length-1, fs=FIELDS[f.coll], man=f.man||(f.man={});
    var restOpt=steps.slice(f.step+1).every(function(x){return !(x.req&&x.req.length)&&!x.any});
    var h='<div class="wz-prog">'+steps.map(function(x,i){return '<i class="'+(i<f.step?'done':i===f.step?'on':'')+'"></i>'}).join('')+'</div>'+
      '<div class="wz-head"><small>خطوة '+(f.step+1)+' من '+steps.length+'</small><h3>'+esc(s.t)+(s.opt?' <span class="fine">(اختياري)</span>':'')+'</h3></div>';
    if(s.pre)h+=presetHtml(f);
    var w=typeof s.w==='function'?s.w(f.v):s.w; if(w)h+='<div class="wz-where"><b>📍 هتلاقيها فين؟</b> '+esc(w)+'</div>';
    var sg=s.sug?sugOf(f):null, rq=(s.req||[]).concat(s.any?s.any[0]:[]), rows='', more='';
    s.k.forEach(function(k){var fd=fs.filter(function(x){return x.k===k})[0]; if(!fd||fd.t==='hidden'||(fd.when&&!fd.when(f.v)))return;
      var sv=sg?sg[k]:null, has=sv!==''&&sv!=null;
      if(has&&!man[k]){f.v[k]=sv;rows+='<div class="sug full"><div><span>'+fd.l+'</span><b>'+sugTxt(fd,sv)+'</b><small>مقترح من تعريفة البنك</small></div><button type="button" class="btn sm" data-act="sug-man" data-k="'+k+'">قيمة تانية</button></div>';return}
      var x=fieldHtml(f,fd,has?sv:null,(s.req||[]).indexOf(k)>=0||(s.any&&s.any[0].indexOf(k)>=0));
      if(s.sug&&sg&&!has&&(k in sg))more+=x; else rows+=x});
    if(s.sug&&!sg)h+='<p class="note" style="margin:0">'+(f.coll==='cards'||f.coll==='loans'?'ما اخترتش البنك في أول خطوة، فاكتب الأرقام من الكشف أو العقد. أو ارجع واختار البنك وهتتملي لوحدها.':'')+'</p>';
    h+='<div class="fields">'+rows+'</div>';
    if(more)h+='<details class="wz-more"><summary>رسوم تانية مش في تعريفة البنك (اختياري)</summary><div class="fields">'+more+'</div></details>';
    if(s.sug&&f.coll==='loans'&&n(f.v.installment)){var pn=loanPen(f.v);if(pn)h+='<p class="note" style="margin:0">لو اتأخرت في قسط، الغرامة هتتحسب حوالي <b>'+money(pn)+'</b>.</p>'}
    if(rq.length)h+='<p class="note" style="margin:0"><b class="rq">*</b> لازم تتكتب عشان الحسابات تطلع صح.</p>';
    h+='<div class="actions wz-act">'+(last?'<button class="btn primary" data-act="wz-save">حفظ</button>':'<button class="btn primary" data-act="wz-next">'+(s.opt?'تخطي / التالي':'التالي')+'</button>')+
      (!last&&restOpt?'<button class="btn" data-act="wz-save">احفظ كده</button>':'')+
      (f.step>0?'<button class="btn" data-act="wz-back">رجوع</button>':'<button class="btn" data-act="cancel-form">إلغاء</button>')+'</div>';
    if(!last&&restOpt)h+='<p class="note" style="margin:0">الباقي اختياري. تقدر تحفظ دلوقتي وتكمله بعدين من "تعديل".</p>';
    return h;
  }

  /* ================= calculations ================= */
  function calcCard(c){
    var due=parseD(c.due), days=due?daysTo(due):999, st=n(c.statement);
    var minEst=(c.min===''||c.min==null)&&st>0&&n(c.minPct)>0, mn=minEst?Math.min(st,Math.max(st*n(c.minPct)/100,n(c.minFixed))):n(c.min);
    var rem=Math.max(st-n(c.paid),0), remMin=Math.max(mn-n(c.paid),0);
    var waiting=!!due&&days<0&&remMin===0&&st>0;
    var nextDue=due; if(waiting){var g=0;while(daysTo(nextDue)<0&&g++<24)nextDue=addMonth(nextDue)}
    var penalty=remMin>0?remMin*n(c.feePct)/100+n(c.feeFixed):0;
    var onFull=c.interestBase==='على كامل الكشف';
    var intNone=rem>0?(onFull?st:rem)*n(c.rate)/100:0;
    var baseMin=Math.max(st-Math.max(n(c.paid),mn),0), intMin=baseMin>0?(onFull?st:baseMin)*n(c.rate)/100:0;
    var state= st===0||!due?'none': waiting?'wait': rem===0?'done': days<0?'late': days===0?'today': days<=3?'soon': days<=7?'near': remMin===0?'minok':'far';
    var hasBal=c.balance!==''&&c.balance!=null, hasAv=c.available!==''&&c.available!=null;
    var debt=hasBal?n(c.balance):hasAv?Math.max(rem,n(c.limit)-n(c.available)):rem, approx=!hasBal&&hasAv, over=Math.max(debt-n(c.limit),0);
    var overCharge=over>0?Math.max(n(c.overFee),over*n(c.overPct)/100):0;
    var monthly=n(c.monthlyFee)+debt*n(c.monthlyPct)/100, extra=overCharge+monthly;
    return {due:due,days:days,rem:rem,remMin:remMin,waiting:waiting,nextDue:nextDue,penalty:penalty,intNone:intNone,totalNone:rem+intNone+penalty+extra,
      baseMin:baseMin,intMin:intMin,totalMin:baseMin+intMin+extra,overCharge:overCharge,monthly:monthly,extra:extra,state:state,pct:st>0?Math.min(n(c.paid)/st,1):0,
      debt:debt,minVal:mn,minEst:minEst,hasBal:hasBal,approx:approx,over:over,avail:hasAv&&!hasBal?Math.max(n(c.available),0):Math.max(n(c.limit)-debt,0)};
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
    var plan=(d.schedule||[]).map(function(s,i){return {s:s,i:i,d:parseD(s.date),left:Math.max(n(s.amount)-n(s.paidAmt),0)}}).filter(function(o){return !o.s.done}).sort(function(a,b){return (a.d||0)-(b.d||0)});
    return {paid:paid,rem:rem,pct:n(d.amount)>0?Math.min(paid/n(d.amount),1):0,done:n(d.amount)>0&&rem===0,plan:plan,next:plan[0]||null,
      planned:sum(plan,function(o){return o.left})};
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
  /* Money Fellows fee structure: total = admin + tax; part is deducted from the payout, the rest is paid
     before the payout — either all on the first installment or spread over the installments before the payout.
     Promo discount and booking deposit come off the first installment. */
  function gamFees(g){
    var mf=g.kind==='Money Fellows', admin=n(g.adminFee), tax=n(g.taxFee), total=admin+tax;
    var fromPayout=mf&&total?(g.payoutFees!==''&&g.payoutFees!=null?Math.min(n(g.payoutFees),total):total):0;
    var pre=mf?Math.max(total-fromPayout,0):0, mode=g.feeMode==='متوزع على الأقساط قبل القبض'?'spread':'first';
    return {mf:mf,admin:admin,tax:tax,total:mf?total:0,fromPayout:fromPayout,pre:pre,mode:mode,promo:mf?n(g.promo):0,deposit:mf?n(g.deposit):0};
  }
  function gamSched(g){
    var st=parseD(g.start), m=n(g.months), t=n(g.turn), ded=g.deduct!=='بيتدفع عادي', before=g.installmentBefore!==''&&g.installmentBefore!=null&&n(g.installmentBefore)>0, out=[];
    var f=gamFees(g), nPre=t>0?t-1:m;
    for(var i=0;i<m;i++){var isPay=t>0&&i===t-1, isPre=t>0?i<t-1:true, amt=n(g.installment), extra=0;
      if(before&&t>0&&i<t-1)amt=n(g.installmentBefore);
      else if(f.pre>0){ if(f.mode==='spread'&&nPre>0){if(isPre)extra=f.pre/nPre} else if(i===0)extra=f.pre }
      if(i===0)extra-=f.promo+f.deposit;
      amt=Math.round((amt+extra)*100)/100;
      out.push({i:i,d:st?addMonths(st,i):null,amt:isPay&&ded?0:Math.max(amt,0),payout:isPay,ded:isPay&&ded,fee:Math.round(extra*100)/100})}
    return out;
  }
  function calcGam(g){
    var st=parseD(g.start), m=n(g.months), sc=gamSched(g), pc=Math.min(n(g.paidCount),m);
    var idx=-1; for(var i=pc;i<sc.length;i++){if(sc[i].amt>0){idx=i;break}}
    var done=m>0&&idx<0, next=st&&idx>=0?sc[idx].d:null, nextAmt=idx>=0?sc[idx].amt:0;
    var t=n(g.turn), pd=parseD(g.payoutDate)||(st&&t?addMonths(st,t-1):null);
    var gf=gamFees(g), gross=n(g.installment)*m, dedInst=t&&g.deduct!=='بيتدفع عادي'?n(g.installment):0;
    var payoutCalc=gross-dedInst-(gf.mf?gf.fromPayout:n(g.fees));
    var payout=(g.payout!==''&&g.payout!=null)?n(g.payout):payoutCalc;
    var leftTotal=sum(sc.slice(pc),function(s){return s.amt}), paidTotal=sum(sc.slice(0,pc),function(s){return s.amt});
    return {sc:sc,idx:idx,next:next,nextAmt:nextAmt,days:next?daysTo(next):999,state:done?'done':next?stateOf(daysTo(next)):'none',done:done,pc:pc,m:m,
      left:sc.slice(pc).filter(function(s){return s.amt>0}).length,leftTotal:leftTotal,paidTotal:paidTotal,pd:pd,pdays:pd?daysTo(pd):null,payout:payout,
      gross:gross,dedInst:dedInst,gf:gf,payoutCalc:payoutCalc,payoutManual:g.payout!==''&&g.payout!=null,
      received:!!g.received,end:st&&m?addMonths(st,m-1):null,pct:m?pc/m:0};
  }
  /* Money Fellows payment policy: window 25th (prev month) → 5th; grace 6–10; 5% from 11th; +5% from 16th;
     cancellation on 24th (first-time late); end of month → legal if already received. % is of the installment. */
  function isMF(g){return g.kind==='Money Fellows'}
  /* people's gamiya: pay any day from the 1st to the 10th of the installment month, no late fees */
  function isPeople(g){return g.kind==='جمعية أفراد'}
  function peopleWin(g,x){if(!isPeople(g)||!x.next)return null;var y=x.next.getFullYear(),m=x.next.getMonth();return {from:clampD(y,m,1),to:clampD(y,m,10)}}
  function gamLate(g,x){
    if(!isMF(g)||!x.next)return null;
    var due=x.next, y=due.getFullYear(), m=due.getMonth(), dd=function(day){return clampD(y,m,day)};
    var base=x.nextAmt, paidNow=(g.cyc&&g.cyc.key==='i'+x.idx)?n(g.cyc.paid):0, t=today();
    var win=clampD(y,m-1,25), grace=dd(10), p1=dd(11), p2=dd(16), cancel=dd(24), eom=new Date(y,m+1,0);
    var pct=t>=p2?10:t>=p1?5:0, fee=base*pct/100;
    var stage= t<win?'before': t<=due?'window': t<=grace?'grace': t<p2?'late5': t<cancel?'late10': t<eom?'cancel':'legal';
    return {win:win,due:due,grace:grace,p1:p1,p2:p2,cancel:cancel,eom:eom,pct:pct,fee:fee,base:base,rem:Math.max(base-paidNow,0),stage:stage,
      fee5:base*0.05,fee10:base*0.10,received:!!g.received};
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
  /* ---------- partial payments for recurring items (one open cycle per item) ---------- */
  var AMTF={expenses:'amount',insurance:'premium'};
  function cycInfo(coll,o){
    var key=null,due=0,complete=null,totalLeft=null,label='القسط',x;
    if(coll==='loans'){x=calcLoan(o);if(!x.due||x.done)return null;key='d'+o.nextDue;due=n(o.installment);totalLeft=x.leftTotal;
      complete=function(){o.nextDue=iso(addMonth(parseD(o.nextDue)));o.lastPaid=iso(today())}}
    else if(coll==='gamiyas'){x=calcGam(o);if(x.idx<0)return null;key='i'+x.idx;due=x.nextAmt;totalLeft=x.leftTotal;
      complete=function(){o.paidCount=x.idx+1}}
    else if(coll==='expenses'||coll==='insurance'||coll==='bnpl'){
      if(coll==='insurance'&&!calcIns(o).active)return null;
      var mo=calcMonthly(o[DAYF[coll]],o.paidMonth); if(!mo.key||mo.paid)return null;
      key='m'+mo.key; due=coll==='bnpl'?calcBnpl(o).monthly:n(o[AMTF[coll]]); label=coll==='expenses'?'المبلغ':'القسط';
      if(coll==='insurance')totalLeft=calcIns(o).leftTotal; if(coll==='bnpl')totalLeft=calcBnpl(o).out;
      complete=function(){o.paidMonth=mo.key}}
    else return null;
    if(!(due>0))return null;
    var paid=(o.cyc&&o.cyc.key===key)?n(o.cyc.paid):0;
    return {key:key,due:due,paid:paid,rem:Math.max(due-paid,0),complete:complete,totalLeft:totalLeft!=null?Math.max(totalLeft-paid,0):null,label:label,log:(o.cyc&&o.cyc.key===key&&o.cyc.log)||[]};
  }
  function allocDebt(d,amt){
    var out=[], left=amt, sch=(d.schedule||[]).map(function(s,i){return {s:s,i:i}}).filter(function(o){return !o.s.done}).sort(function(a,b){return String(a.s.date).localeCompare(String(b.s.date))});
    sch.forEach(function(o){if(left<=0.005)return;var need=Math.max(n(o.s.amount)-n(o.s.paidAmt),0),take=Math.min(need,left);
      if(take<=0)return;o.s.paidAmt=Math.round((n(o.s.paidAmt)+take)*100)/100;if(o.s.paidAmt>=n(o.s.amount)-0.005)o.s.done=true;left-=take;out.push({i:o.i,amt:take})});
    return out;
  }
  function cycPaidNow(coll,o){var c=cycInfo(coll,o);return c?c.paid:0}
  function payCycle(coll,o,amt){
    var c=cycInfo(coll,o); if(!c)return null;
    var txId=logTx('دفعة',coll,o,amt,(c.label==='المبلغ'?'دفع':'قسط')+(amt<c.rem-0.005?' (جزئي)':''));
    var tot=Math.round((c.paid+amt)*100)/100, log=c.log.concat([{amount:amt,date:iso(today()),txId:txId}]);
    if(tot>=c.due-0.005){c.complete();o.cyc=null;return {done:true,over:Math.max(tot-c.due,0),c:c}}
    o.cyc={key:c.key,paid:tot,log:log};return {done:false,rem:c.due-tot,c:c,tot:tot};
  }
  function egpVal(o){var c=String(o.currency||'').trim().toUpperCase();return (!c||c==='EGP'||c==='جنيه'||c==='ج')?n(o.balance):n(o.egp)}

  /* ================= persistence ================= */
  var saving=false,pending=false;
  function setSync(t){document.getElementById('sync').textContent=t}
  function save(){ if(!lsSet(LS_STATE,JSON.stringify(S)))toast('ماتحفظش: مساحة الموبايل أو التخزين مقفول'); }
  function mutate(fn){fn();save();renderAll();ntWritePlan()}

  /* ================= toast ================= */
  var toastT=null;
  function toast(m){var el=document.getElementById('toast');el.innerHTML='<div class="toast" role="status">'+esc(m)+'</div>';clearTimeout(toastT);toastT=setTimeout(function(){el.innerHTML=''},2400)}

  /* ================= nav ================= */
  var navOpen=false;
  function renderNav(){
    var MI={home:'🏠',notifs:'🔔',spend:'💸',reports:'📊',cards:'💳',loans:'🏦',bnpl:'🧾',gamiyas:'👥',insurance:'🛡️',wallets:'👛',accounts:'🏛️',debts:'📤',lent:'📥',income:'💰',expenses:'📅',settings:'⚙️'};
    function a(r,label){return '<a href="#'+r+'" class="mt'+(route===r?' on':'')+'" data-nav="'+r+'"><span class="mi" aria-hidden="true">'+(MI[r]||'•')+'</span><span class="ml">'+label+'</span>'+(r==='notifs'?(loaded&&ntUnread()?'<span class="cnt hot num">'+ntUnread()+'</span>':''):S[r]&&loaded&&S[r].length?'<span class="cnt num">'+S[r].length+'</span>':'')+'</a>'}
    function g(t){return '</div><div class="grp">'+t+'</div><div class="mtiles">'}
    document.getElementById('nav').innerHTML='<div class="nav-in">'+
      '<div class="brand"><div><b>3bhady</b><small>Financial Aid · v'+esc(window.APP_VERSION||'')+'</small></div><button class="icon-btn close-nav" data-act="close-nav" aria-label="قفل القائمة">'+ic('close')+'</button></div>'+
      '<div class="mtiles">'+a('home','الرئيسية')+a('notifs','الإشعارات')+a('spend','الصرف والتحويل')+a('reports','التقارير')+
      g('التزاماتي')+a('cards','كروتي')+a('loans','قروضي')+a('bnpl','كروت التقسيط')+a('gamiyas','جمعياتي')+a('insurance','وثائق التأمين')+
      g('فلوسي')+a('wallets','كل الأرصدة والمحافظ')+a('accounts','حساباتي البنكية')+
      g('السلف')+a('debts','سلف عليّ')+a('lent','فلوسي عند الناس')+
      g('شهريًا')+a('income','مصادر الدخل')+a('expenses','المصروفات الثابتة')+g('البرنامج')+a('settings','الإعدادات والتحديث')+'</div></div>';
    document.getElementById('nav').classList.toggle('open',navOpen);
    document.getElementById('navScrim').hidden=!navOpen;
  }
  function setNav(o){navOpen=o;renderNav()}

  /* ================= screens ================= */
  function otile(em,label,attrs,sub,primary){return '<button type="button" class="ot'+(primary?' pri':'')+'" '+attrs+'><span class="mi" aria-hidden="true">'+em+'</span><span class="ml">'+label+'</span>'+(sub?'<span class="os">'+sub+'</span>':'')+'</button>'}
  function tile(k,v,hl){return '<div class="tile'+(hl?' hl':'')+'"><div class="k">'+k+'</div><div class="v">'+v+'</div></div>'}

  function agendaItems(){
    var items=[];
    S.cards.forEach(function(c){var x=calcCard(c);if(x.state==='none'||x.state==='done')return;
      if(x.waiting)items.push({coll:'cards',id:c.id,name:c.name,sub:'كارت · بانتظار الكشف الجديد',date:x.nextDue,days:daysTo(x.nextDue),amt:null,full:x.rem,state:'wait'});
      else items.push({coll:'cards',id:c.id,name:c.name,sub:'كارت · '+(c.bank||''),date:x.due,days:x.days,amt:x.remMin,full:x.rem,state:x.state});});
    function pp(coll,o){var c=cycInfo(coll,o);return c&&c.paid>0?{p:c.paid,t:' · اتدفع '+fmt(c.paid)+' من '+fmt(c.due)}:{p:0,t:''}}
    S.loans.forEach(function(l){var x=calcLoan(l);if(!x.due||x.done)return;var q=pp('loans',l),a=Math.max(n(l.installment)-q.p,0);
      items.push({coll:'loans',id:l.id,name:l.name,sub:'قسط · '+(l.bank||'')+q.t,date:x.due,days:x.days,amt:a,full:a,state:x.state});});
    S.expenses.forEach(function(e){var x=calcExp(e);if(!x.due)return;var q=pp('expenses',e),a=Math.max(n(e.amount)-q.p,0);
      items.push({coll:'expenses',id:e.id,name:e.name,sub:(e.kind||'مصروف')+(x.paid?' · اتدفع الشهر ده':q.t),date:x.due,days:x.days,amt:a,full:a,state:x.paid?'paid':x.state});});
    S.gamiyas.forEach(function(g){var x=calcGam(g);var q=pp('gamiyas',g),a=Math.max(x.nextAmt-q.p,0),lt=gamLate(g,x),lx='';
      if(lt&&a>0){if(lt.fee>0){a+=lt.fee;lx=' · غرامة '+lt.pct+'% ('+fmt(lt.fee)+')'}else if(lt.stage==='grace')lx=' · فترة سماح لحد '+dl(lt.grace)}
      var pw=peopleWin(g,x), gd=x.next, gdays=x.days, gst=x.state;
      if(pw){gd=pw.to;gdays=daysTo(gd);gst=x.done?'done':stateOf(gdays);lx+=' · تدفع من 1 لـ 10 بدون غرامة'}
      if(x.next)items.push({coll:'gamiyas',id:g.id,name:g.name,sub:'قسط جمعية'+(isMF(g)?' · Money Fellows':g.organizer?' · '+g.organizer:'')+q.t+lx,date:gd,days:gdays,amt:a,full:a,state:gst});
      if(x.pd&&!x.received)items.push({coll:'gamiyas',id:g.id,name:g.name,sub:'قبض الجمعية',date:x.pd,days:x.pdays,amt:null,inc:x.payout,state:'inc'});});
    S.insurance.forEach(function(p){var x=calcIns(p);
      var qi=pp('insurance',p),ai=Math.max(n(p.premium)-qi.p,0);
      if(x.mo.due)items.push({coll:'insurance',id:p.id,name:p.name,sub:'قسط تأمين'+(p.company?' · '+p.company:'')+qi.t,date:x.mo.due,days:x.mo.days,amt:ai,full:ai,state:x.mo.paid?'paid':x.mo.state});
      if(x.pd&&x.pdays>=0)items.push({coll:'insurance',id:p.id,name:p.name,sub:'تحصيل الوثيقة',date:x.pd,days:x.pdays,amt:null,inc:n(p.payout),state:'inc'});});
    ['debts','lent'].forEach(function(cl){S[cl].forEach(function(dbt){calcDebt(dbt).plan.forEach(function(o){if(!o.d)return;
      var pp=n(o.s.paidAmt)>0?' · اتدفع '+fmt(o.s.paidAmt)+' من '+fmt(o.s.amount):'';
      if(cl==='debts')items.push({coll:cl,id:dbt.id,name:dbt.name,sub:'سداد سلفة'+(o.s.note?' · '+o.s.note:'')+pp,date:o.d,days:daysTo(o.d),amt:o.left,full:o.left,state:stateOf(daysTo(o.d))});
      else items.push({coll:cl,id:dbt.id,name:dbt.name,sub:'هيرجّع'+(o.s.note?' · '+o.s.note:'')+pp,date:o.d,days:daysTo(o.d),amt:null,inc:o.left,state:'inc'});})})});
    S.bnpl.forEach(function(b){var x=calcBnpl(b);if(!x.mo.due)return;var q=pp('bnpl',b);
      items.push({coll:'bnpl',id:b.id,name:b.name,sub:'قسط تقسيط'+q.t,date:x.mo.due,days:x.mo.days,amt:Math.max(x.monthly-q.p,0),full:Math.max(x.out-q.p,0),state:x.mo.paid?'paid':x.mo.state});});
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
      title=k==='today'?'المطلوب النهاردة (شامل المتأخر)':k==='w7min'?'مطلوب خلال 7 أيام (حد أدنى)':'مطلوب خلال 7 أيام (كامل)';
      ex=k==='today'?'كل قسط أو حد أدنى كارت أو مصروف أو دفعة سلفة ميعاده النهاردة أو عدّى ولسه ما اتعلّمش إنه اتدفع. الكروت بيتحسب منها الباقي من الحد الأدنى بس.'
        :k==='w7min'?'كل حاجة ميعادها خلال 7 أيام من النهاردة أو متأخرة ولسه ما اتدفعتش: الباقي من الحد الأدنى للكروت، أقساط القروض، أقساط الجمعيات والتقسيط والتأمين، المصروفات الثابتة، ودفعات السلف المخططة.'
        :'نفس بنود "الحد الأدنى" بالظبط، بس الكروت محسوبة بكامل الباقي من الكشف بدل الحد الأدنى. ده اللي تدفعه لو عايز تقفل الكروت دي من غير فوايد.';
      sel.forEach(function(i){var amt=k==='w7full'?i.full:i.amt;row(i.name,i.sub+' · '+dl(i.date)+' · '+rel(i.days)+(i.coll==='cards'&&i.amt===0?' · الحد الأدنى اتسدد'+(k==='w7full'?'، ده باقي الكشف':''):''),amt,i.coll,i.id)});
    }else if(k==='allDebt'){
      title='إجمالي المديونيات كلها';ex='كل اللي عليك: مديونية الكروت (شاملة التقسيط المحجوز عليها) + المتبقي من القروض + المتبقي من التقسيط + السلف اللي عليك. دوس على أي بند تشوف تفاصيله.';
      [['cardDebt','الكروت'],['loanOut','القروض'],['bnplOut','التقسيط'],['debtsRem','السلف']].forEach(function(q){var b=breakdown(q[0]);if(b.rows.length||b.total)row(q[1],b.rows.length+' بند',b.total,null,null,{bd:q[0]})});
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
    h=h.replace('<section class="hero" aria-live="polite">','<section class="home-top" aria-live="polite">');
    function gt(cls,em,label,val,key,sub,big){
      return '<button class="gtile '+cls+(big?' big':'')+'" data-act="bd" data-k="'+key+'"><span class="gi" aria-hidden="true">'+em+'</span><span class="gk">'+label+'</span><span class="gv">'+val+'</span>'+(sub?'<span class="gs">'+sub+'</span>':'')+'</button>'}
    /* total debts */
    var D=breakdown('allDebt');
    h+='<div class="gcard g-debt"><button class="gc-main" data-act="bd" data-k="allDebt"><span class="gc-row"><span class="gi" aria-hidden="true">🧾</span><span class="gk">إجمالي المديونيات كلها</span></span>'+
      '<span class="gc-big">'+money(D.total)+'</span></button><div class="gchips">'+
      D.rows.map(function(r){var em={'الكروت':'💳','القروض':'🏦','التقسيط':'🧾','السلف':'🤝'}[r.name]||'•';return '<button class="gchip" data-act="bd" data-k="'+r.bd+'"><span aria-hidden="true">'+em+'</span> '+esc(r.name)+' <b class="num">'+fmt(r.amt)+'</b></button>'}).join('')+'</div></div>';
    /* due today incl. late */
    var tdue=sum(urgent,function(i){return i.amt}), late=urgent.filter(function(i){return i.days<0}), lateSum=sum(late,function(i){return i.amt});
    var aS=breakdown('afterSalary'), inc0=breakdown('inc').total, need=sum(aS.rows.filter(function(r){return r.sign<0}),function(r){return r.amt}), pct=inc0>0?Math.min(need/inc0,1):1;
    h+='<div class="gcard '+(aS.total<0?'g-bad':'g-good')+'"><button class="gc-main" data-act="bd" data-k="afterSalary"><span class="gc-row"><span class="gi" aria-hidden="true">💼</span><span class="gk">'+esc(aS.title)+'</span></span>'+
      '<span class="gc-big">'+money(aS.total)+'</span><span class="gbar"><span style="width:'+Math.round(pct*100)+'%"></span></span>'+
      '<span class="gs">'+fmt(inc0)+' دخل − '+fmt(need)+' مطلوب ('+(aS.rows.length-1)+' بند)'+(inc0>0?' · المطلوب '+Math.round(need/inc0*100)+'% من الدخل':'')+'</span></button></div>';
    h+='<div class="otiles three">'+otile('💸','اصرف','data-act="mv-new" data-t="spend"','',1)+otile('🔁','حوّل','data-act="mv-new" data-t="xfer"')+otile('💰','فلوس من بره','data-act="mv-new" data-t="add"')+'</div>';
    h+='</section>';
    /* overview */
    var w7=breakdown('w7min'), w7f=breakdown('w7full'), bal=breakdown('balances'), lent=breakdown('lentRem');
    h+='<section class="sec"><div class="sec-head"><h2>الصورة العامة</h2><span class="fine">دوس على أي رقم تشوف تفاصيله</span></div><div class="gtiles">'+
      gt('t-red','⏰','مطلوب النهاردة (شامل المتأخر)',money(tdue),'today',late.length?'متأخر '+fmt(lateSum):'',1)+
      gt('t-amber','📅','مطلوب خلال 7 أيام (حد أدنى)',money(w7.total),'w7min')+
      gt('t-sand','🗓️','مطلوب خلال 7 أيام (كامل)',money(w7f.total),'w7full')+
      gt(bal.total<0?'t-wine':'t-teal','👛','أرصدة الحسابات والمحافظ',money(bal.total),'balances')+
      gt('t-violet','📥','فلوسي عند الناس',money(lent.total),'lentRem')+'</div></section>';
    /* monthly budget */
    var inc=breakdown('inc').total, net=breakdown('net').total;
    function B(em,label,key,minus){return '<button class="r tap" data-act="bd" data-k="'+key+'"><span class="k"><span aria-hidden="true">'+em+'</span> '+label+'</span><span class="v">'+(minus?'− ':'')+money(breakdown(key).total)+'</span></button>'}
    h+='<section class="sec"><h2>الميزانية الشهرية</h2><div class="gcard g-budget"><div class="rows clear">'+
      B('💰','الدخل','inc')+B('📅','المصروفات والالتزامات الثابتة','exp',1)+B('🏦','أقساط القروض','inst',1)+B('💳','الحد الأدنى للكروت (آخر كشف)','mins',1)+
      B('🧾','أقساط التقسيط','bn',1)+B('👥','أقساط الجمعيات','gam',1)+B('🛡️','أقساط التأمين','ins',1)+
      '<button class="r tap net" data-act="bd" data-k="net"><span class="k"><b>الصافي</b></span><span class="v" style="color:var('+(net<0?'--bad':'--ok')+')">'+money(net)+'</span></button></div></div>'+
      (inc===0?'<p class="note">ضيف مصادر الدخل والمصروفات الثابتة من القائمة عشان الصافي يبقى مظبوط.</p>':'')+'</section>';
    /* monthly statement prompts */
    var stm=S.cards.filter(cardStmtNeed), lu=S.loans.filter(loanUpdNeed);
    if(stm.length||lu.length){
      h+='<section class="sec"><div class="sec-head"><h2>التحديث الشهري</h2><span class="fine">من كشوف الحساب</span></div><div class="list">'+
        stm.map(function(c){var L=cardStmtNeed(c).close;
          return '<button class="item" data-act="stmt-open" data-id="'+esc(c.id)+'"><div class="ava">'+ic('statement',18)+'</div><div class="main"><div class="t">'+esc(c.name)+'</div>'+
            '<div class="s">الكشف قفل يوم '+L.toLocaleDateString('ar-EG-u-nu-latn',{day:'numeric',month:'long'})+' · اكتب المطلوب والحد الأدنى وتاريخ السداد</div></div>'+
            '<div class="end"><span class="pill soon">أدخل الكشف</span></div></button>'}).join('')+
        lu.map(function(l){var nd=loanUpdNeed(l);
          return '<button class="item" data-act="loan-upd-open" data-id="'+esc(l.id)+'"><div class="ava">'+ic('loans',18)+'</div><div class="main"><div class="t">'+esc(l.name)+' · '+esc(l.bank||'')+'</div>'+
            '<div class="s">حدّث المتبقي من القرض من كشف البنك'+(nd.since?' · آخر تحديث '+dShort(iso(nd.since)):'')+'</div></div>'+
            '<div class="end"><span class="pill near">حدّث</span></div></button>'}).join('')+'</div></section>';
    }
    /* payment order */
    h+='<section class="sec"><div class="sec-head"><h2>ترتيب الدفع</h2><span class="fine">بالأقدم والأقرب</span></div>';
    if(urgent.length){
      h+='<div class="phead p-red"><span>'+(late.length?'⚠️ متأخر ومستحق النهاردة':'⏰ لازم تدفع النهاردة')+'</span><b>'+money(tdue)+'</b></div>';
      h+='<div class="list">'+urgent.map(itemRow).join('')+'</div>';
    }else{
      var next=items.filter(function(i){return i.days>0&&i.amt>0&&i.state!=='paid'})[0];
      h+='<div class="phead p-green"><span>✅ مفيش دفع مستحق النهاردة</span></div>';
      if(next)h+='<p class="fine" style="margin:0">أقرب ميعاد: <b>'+esc(next.name)+'</b> '+rel(next.days)+' ('+dl(next.date)+') — '+money(next.amt)+'</p>';
    }
    var week=items.filter(function(i){return i.days>0&&i.days<=7&&i.amt>0&&i.state!=='paid'});
    if(week.length){
      h+='<div class="phead p-amber"><span>📅 خلال الأسبوع ده</span><b>'+money(sum(week,function(i){return i.amt}))+'</b></div>';
      h+='<div class="list">'+week.map(itemRow).join('')+'</div>';
    }
    var up=items.filter(function(i){return i.days>7&&i.days<=31});
    h+='<div class="phead p-violet"><span>🗓️ بعد كده (لحد 31 يوم)</span>'+(up.length?'<b>'+money(sum(up.filter(function(i){return i.amt>0}),function(i){return i.amt}))+'</b>':'')+'</div>'+
      (up.length?'<div class="list">'+up.map(itemRow).join('')+'</div>':'<div class="list"><div class="empty">مفيش مواعيد تانية خلال الشهر الجاي.</div></div>')+'</section>';
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
        '<div class="under fine"><span>فايدة '+fmt(c.rate)+'٪ شهريًا · غرامة '+(n(c.feePct)?fmt(c.feePct)+'٪':'')+(n(c.feePct)&&n(c.feeFixed)?' + ':'')+(n(c.feeFixed)?fmt(c.feeFixed)+' ج':'')+(!n(c.feePct)&&!n(c.feeFixed)?'—':'')+'</span><span>'+(x.waiting?'الجاي '+dl(x.nextDue):x.due?dl(x.due):'')+'</span></div>'+eppMini(c)+'</button>'}).join('')+'</section>';
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
        '<div class="s">'+esc(g.kind||'')+(g.organizer&&!isMF(g)?' · '+esc(g.organizer):'')+' · دفعت <span class="num">'+x.pc+'/'+x.m+'</span>'+(x.pd?' · القبض '+dShort(iso(x.pd)):'')+'</div>'+
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
  function screenAllBalances(){
    var G=hGroups().slice(1), all=S.accounts.concat(S.wallets), tot=sum(all,egpVal);
    var h='<section class="tiles">'+tile('إجمالي كل الأرصدة (بالجنيه)',money(tot),1)+
      tile('الحسابات البنكية',money(sum(S.accounts,egpVal)))+tile('الكاش',money(sum(S.wallets.filter(isCash),egpVal)))+
      tile('المحافظ والكروت',money(sum(S.wallets.filter(function(o){return !isCash(o)}),egpVal)))+'</section>';
    if(!all.length)return h+emptyList('ضيف حساباتك البنكية ومحافظك والكاش اللي معاك من الزرار اللي تحت.');
    G.forEach(function(g){if(!g.a.length)return;
      h+='<section class="sec"><div class="sec-head"><h2>'+(g.c==='accounts'?'الحسابات البنكية':g.l)+'</h2><span class="fine">'+money(sum(g.a,egpVal))+'</span></div><div class="mgrid">'+g.a.map(function(o){
        var cur=hCur(g.c,o);return mFace(g.c,o,{act:'open',attrs:' data-coll="'+g.c+'" data-id="'+esc(o.id)+'"',foot:cur!=='EGP'&&n(o.egp)?'≈ '+fmt(o.egp)+' ج':'',warn:o.balSync?'':'● مش متأكد'})}).join('')+'</div></section>'});
    return h;
  }
  function screenBalances(coll){
    if(coll==='wallets')return screenAllBalances();
    var arr=S[coll], acc=coll==='accounts';
    var h='<section class="tiles">'+tile('إجمالي الأرصدة (بالجنيه)',money(sum(arr,egpVal)),1)+tile(acc?'عدد الحسابات':'عدد المحافظ','<span class="num">'+arr.length+'</span>')+'</section>';
    if(!arr.length)return h+emptyList(acc?'ضيف حساباتك البنكية: البنك ورقم الحساب والرصيد وبيانات كارت الحساب.':'ضيف محافظك: فودافون كاش، إنستاباي، كارت Money Fellows، ماي فوري، تيلدا، كليفر، عملات رقمية…');
    return h+'<div class="list">'+arr.map(function(o){
      var cur=String(o.currency||'').trim(), other=cur&&cur.toUpperCase()!=='EGP'&&cur!=='جنيه'&&cur!=='ج';
      var sub=acc?esc(o.name||'')+(o.accountNo?' · <span class="num">•••• '+esc(String(o.accountNo).slice(-4))+'</span>':''):esc(o.kind||'')+(o.provider?' · '+esc(o.provider):'')+(o.number?' · <span class="num">'+esc(o.number)+'</span>':'');
      return '<button class="item" data-act="open" data-coll="'+coll+'" data-id="'+esc(o.id)+'"><div class="ava">'+ic(coll,18)+'</div><div class="main"><div class="t">'+esc(acc?o.bank:o.name)+'</div><div class="s">'+sub+'</div></div>'+
        '<div class="end"><div class="v">'+(other?'<span class="num">'+fmt(o.balance)+' '+esc(cur)+'</span>':money(o.balance))+'</div>'+(other&&n(o.egp)?'<span class="fine">≈ '+money(o.egp)+'</span>':'')+'</div></button>'}).join('')+'</div>';
  }

  /* ================= reports ================= */
  var CAT={cards:'الكروت',loans:'القروض',gamiyas:'الجمعيات',insurance:'التأمين',bnpl:'التقسيط',expenses:'المصروفات الثابتة',debts:'السلف',lent:'فلوس رجعتلي',income:'الدخل',accounts:'الحسابات',wallets:'المحافظ',reports:'يدوي'};
  var RP={p:'month',off:0,from:'',to:'',cat:'',side:'out'};
  function addDays(d,k){return new Date(d.getFullYear(),d.getMonth(),d.getDate()+k)}
  function rpRange(){
    var t=today(),s,e,label,o=RP.off;
    if(RP.p==='day'){s=addDays(t,o);e=s;label=dl(s)}
    else if(RP.p==='week'){var dow=(t.getDay()+1)%7;s=addDays(t,-dow+7*o);e=addDays(s,6);
      label='من '+s.toLocaleDateString('ar-EG-u-nu-latn',{day:'numeric',month:'short'})+' لـ '+e.toLocaleDateString('ar-EG-u-nu-latn',{day:'numeric',month:'short'})}
    else if(RP.p==='year'){s=new Date(t.getFullYear()+o,0,1);e=new Date(t.getFullYear()+o,11,31);label=String(t.getFullYear()+o)}
    else if(RP.p==='custom'){s=parseD(RP.from)||new Date(t.getFullYear(),t.getMonth(),1);e=parseD(RP.to)||t;if(e<s){var q=s;s=e;e=q}label='فترة مخصوصة'}
    else{s=new Date(t.getFullYear(),t.getMonth()+o,1);e=new Date(t.getFullYear(),t.getMonth()+o+1,0);label=s.toLocaleDateString('ar-EG-u-nu-latn',{month:'long',year:'numeric'})}
    return {s:s,e:e,label:label};
  }
  function txSign(t){return TX_IN.indexOf(t.kind)>=0?1:TX_OUT.indexOf(t.kind)>=0?-1:0}
  function catOf(t){return t.manual?'reports':t.coll}
  function rpChart(list,rg){
    var days=Math.round((rg.e-rg.s)/864e5)+1; if(days<2)return '';
    var byMonth=days>62, buckets=[], idx={};
    if(byMonth){for(var d=new Date(rg.s.getFullYear(),rg.s.getMonth(),1);d<=rg.e;d=new Date(d.getFullYear(),d.getMonth()+1,1)){idx[ym(d)]=buckets.length;buckets.push({lab:String(d.getMonth()+1),o:0,i:0})}}
    else{for(var k=0;k<days;k++){var dd=addDays(rg.s,k);idx[iso(dd)]=buckets.length;buckets.push({lab:String(dd.getDate()),o:0,i:0})}}
    list.forEach(function(t){var d=parseD(t.date);if(!d)return;var b=buckets[idx[byMonth?ym(d):t.date]];if(!b)return;var sg=txSign(t);if(sg<0)b.o+=t.amount;else if(sg>0)b.i+=t.amount});
    var mx=Math.max.apply(null,buckets.map(function(b){return Math.max(b.o,b.i)}).concat([1]));
    var W=320,H=140,pad=18,bw=(W-pad)/buckets.length,every=Math.ceil(buckets.length/10);
    var svg='<svg viewBox="0 0 '+W+' '+(H+16)+'" width="100%" role="img" aria-label="رسم بياني للخارج والداخل" style="display:block;direction:ltr">'+
      '<line x1="'+pad+'" y1="'+H+'" x2="'+W+'" y2="'+H+'" stroke="var(--line)"/>'+
      '<text x="'+(pad-3)+'" y="10" text-anchor="end" font-size="8" fill="var(--muted)">'+fmt(Math.round(mx))+'</text>';
    buckets.forEach(function(b,j){var x=pad+j*bw, w=Math.max(bw/2-1,1), ho=b.o/mx*(H-14), hi=b.i/mx*(H-14);
      if(b.o)svg+='<rect x="'+(x+0.5)+'" y="'+(H-ho)+'" width="'+w+'" height="'+ho+'" rx="1.5" fill="var(--bad)"><title>خارج '+fmt(b.o)+'</title></rect>';
      if(b.i)svg+='<rect x="'+(x+0.5+w)+'" y="'+(H-hi)+'" width="'+w+'" height="'+hi+'" rx="1.5" fill="var(--ok)"><title>داخل '+fmt(b.i)+'</title></rect>';
      if(j%every===0)svg+='<text x="'+(x+bw/2)+'" y="'+(H+11)+'" text-anchor="middle" font-size="8" fill="var(--muted)">'+b.lab+'</text>'});
    return '<div class="rows" style="padding:10px 8px 4px">'+svg+'</svg><div class="fine" style="display:flex;gap:14px;justify-content:center;padding:4px 0 6px"><span><span style="color:var(--bad)">■</span> خارج</span><span><span style="color:var(--ok)">■</span> داخل</span><span>'+(byMonth?'حسب الشهر':'حسب اليوم')+'</span></div></div>';
  }
  var CAT_COL=['#e5534b','#ee8a5b','#e6b450','#c9c94a','#7cc35a','#3fb98a','#36a9c9','#4c84e0','#8a6fe0','#c564c9','#d77a9b','#9aa3ad'];
  var CAT_IC={'أكل وشرب':'🍲','مشتريات':'🛍️','فواتير ومرافق':'💡','مواصلات وبنزين':'🚕','بيت':'🏠','عيلة':'👪','شخصي':'🧑','خروجات واجتماعيات':'🧑‍🤝‍🧑','صحة':'💊','تعليم':'📚','استثمار':'💹',
    'سحب كاش':'🏧','أخرى':'📦','رسوم وفوايد بنكية':'🏛️','سداد الكروت':'💳','أقساط القروض':'🏦','أقساط الجمعيات':'🔄','التأمين':'🛡️','التقسيط':'🧾','سداد السلف':'🤝','قبض جمعيات':'🔄','سلف رجعتلي':'🤝','فلوس من بره':'💼','دخل تاني':'➕','مصروف':'🧾'};
  function txCat(t){
    if(t.cat)return t.cat;
    var k=t.kind;
    if(k==='فوايد ورسوم')return 'رسوم وفوايد بنكية';
    if(k==='سحب كاش')return 'سحب كاش';
    if(k==='قبض جمعية')return 'قبض جمعيات';
    if(k==='دخل'){if(t.coll==='income')return t.name||'المرتب';if(t.coll==='lent')return 'سلف رجعتلي';if(t.mv==='add'||t.coll==='accounts'||t.coll==='wallets')return 'فلوس من بره';return 'دخل تاني'}
    if(k==='دفعة'){var m={cards:'سداد الكروت',accounts:'سداد الكروت',wallets:'سداد الكروت',loans:'أقساط القروض',gamiyas:'أقساط الجمعيات',insurance:'التأمين',bnpl:'التقسيط',debts:'سداد السلف'};
      if(t.coll==='expenses')return t.name||'مصروفات ثابتة';return m[t.coll]||'مدفوعات'}
    var mm=String(t.notes||'').match(/ · (فواتير|أكل وشرب|مواصلات وبنزين|أخرى)/);if(mm)return mm[1]==='فواتير'?'فواتير ومرافق':mm[1];
    return k||'أخرى';
  }
  function catIc(c){return CAT_IC[c]||'•'}
  function rpCats(list,side){
    var m={};list.forEach(function(t){var sg=txSign(t);if(side==='in'?sg<=0:sg>=0)return;var c=txCat(t);m[c]=(m[c]||0)+t.amount});
    var tot=sum(Object.keys(m),function(c){return m[c]});
    return {tot:tot,rows:Object.keys(m).sort(function(a,b){return m[b]-m[a]}).map(function(c,i){return {c:c,v:m[c],p:tot?m[c]/tot:0,col:CAT_COL[i%CAT_COL.length]}})};
  }
  function donut(rows,tot,label){
    var R=58,C=2*Math.PI*R,off=0,svg='<svg viewBox="0 0 160 160" width="190" height="190" role="img" aria-label="'+esc(label)+'" style="direction:ltr;display:block;margin:auto"><g transform="rotate(-90 80 80)">';
    if(!tot)svg+='<circle cx="80" cy="80" r="'+R+'" fill="none" stroke="var(--line)" stroke-width="24"/>';
    rows.forEach(function(r){var len=r.p*C;svg+='<circle cx="80" cy="80" r="'+R+'" fill="none" stroke="'+r.col+'" stroke-width="24" stroke-dasharray="'+len.toFixed(2)+' '+(C-len).toFixed(2)+'" stroke-dashoffset="'+(-off).toFixed(2)+'"><title>'+esc(r.c)+' '+Math.round(r.p*100)+'%</title></circle>';off+=len});
    svg+='</g><text x="80" y="76" text-anchor="middle" font-size="11" fill="var(--muted)">'+esc(label)+'</text><text x="80" y="95" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ink)">'+fmt(Math.round(tot))+'</text></svg>';
    return svg;
  }
  function screenReports(){
    var rg=rpRange(), s=iso(rg.s), e=iso(rg.e), side=RP.side||'out';
    var all=S.reports.filter(function(t){return t.date>=s&&t.date<=e}).sort(function(a,b){return String(b.date).localeCompare(String(a.date))||(b.seq||0)-(a.seq||0)});
    var out=sum(all.filter(function(t){return txSign(t)<0}),function(t){return t.amount}), inc=sum(all.filter(function(t){return txSign(t)>0}),function(t){return t.amount});
    var stm=sum(all.filter(function(t){return t.kind==='كشف'}),function(t){return t.amount}), chg=sum(all.filter(function(t){return t.kind==='فوايد ورسوم'}),function(t){return t.amount});
    function chip(p,l){return '<button class="btn sm'+(RP.p===p?' primary':'')+'" data-act="rp" data-p="'+p+'">'+l+'</button>'}
    var h='<section class="sec"><div class="actions">'+chip('day','يومي')+chip('week','أسبوعي')+chip('month','شهري')+chip('year','سنوي')+chip('custom','فترة')+'</div>';
    if(RP.p==='custom')h+='<div class="actions"><label class="fine" for="rp-from">من</label><input class="in" id="rp-from" type="date" style="direction:ltr" value="'+s+'"><label class="fine" for="rp-to">لـ</label><input class="in" id="rp-to" type="date" style="direction:ltr" value="'+e+'"></div>';
    else h+='<div class="actions" style="justify-content:space-between"><button class="btn sm" data-act="rp-off" data-d="-1" aria-label="اللي قبله">‹ اللي قبله</button><b>'+esc(rg.label)+'</b><button class="btn sm" data-act="rp-off" data-d="1" aria-label="اللي بعده"'+(RP.off>=0?' disabled':'')+'>اللي بعده ›</button></div>';
    h+='</section>';
    h+='<div class="rp-tabs" role="tablist"><button role="tab" aria-selected="'+(side==='in')+'" class="'+(side==='in'?'on':'')+'" data-act="rp-side" data-s="in">الدخل<b class="num" style="color:var(--ok)">'+fmt(inc)+'</b></button>'+
      '<button role="tab" aria-selected="'+(side==='out')+'" class="'+(side==='out'?'on':'')+'" data-act="rp-side" data-s="out">المصروفات<b class="num" style="color:var(--bad)">'+fmt(out)+'</b></button></div>';
    if(!all.length)return h+'<div class="list"><div class="empty">مفيش معاملات في الفترة دي. كل صرف أو دفعة أو قبض بتسجله في التطبيق بيظهر هنا لوحده، وتقدر كمان تضيف معاملة بإيدك من الزرار اللي تحت.</div></div>';
    var C=rpCats(all,side);
    h+='<section class="sec">'+donut(C.rows,C.tot,side==='in'?'الدخل':'المصروفات');
    if(!C.rows.length)h+='<div class="list"><div class="empty">مفيش '+(side==='in'?'دخل':'مصروفات')+' في الفترة دي.</div></div>';
    else h+='<div class="list catlist">'+C.rows.map(function(r){
      return '<button class="item" data-act="rp-catc" data-c="'+esc(r.c)+'" data-col="'+r.col+'"><span class="pct" style="background:'+r.col+'">'+Math.round(r.p*100)+'%</span><div class="main"><div class="t"><span aria-hidden="true">'+catIc(r.c)+'</span> '+esc(r.c)+'</div></div>'+
        '<div class="end"><div class="v">'+money(r.v)+'</div></div></button>'}).join('')+'</div><p class="fine" style="text-align:center;margin-top:6px">دوس على أي بند تشوف رسمه البياني الشهري</p>';
    h+='</section>';
    h+='<section class="tiles">'+tile('الصافي','<span style="color:var('+(inc-out<0?'--bad':'--ok')+')">'+money(inc-out)+'</span>',1)+
      tile('كشوف اتسجلت',money(stm))+tile('فوايد ورسوم',money(chg))+tile('عدد المعاملات','<span class="num">'+all.length+'</span>')+'</section>';
    h+='<section class="sec"><h2>الحركة خلال الفترة</h2>'+rpChart(all,rg)+'</section>';
    h+='<section class="sec"><h2>المعاملات</h2><div class="list">'+all.map(txRow).join('')+'</div></section>';
    return h;
  }
  function txRow(t){var sg=txSign(t);
    return '<button class="item" data-act="open" data-coll="reports" data-id="'+esc(t.id)+'"><div class="main"><div class="t">'+esc(t.name||t.kind)+'</div><div class="s">'+esc(txCat(t))+(t.notes?' · '+esc(t.notes):'')+' · '+dShort(t.date)+'</div></div>'+
      '<div class="end"><div class="v" style="color:var('+(sg<0?'--bad':sg>0?'--ok':'--ink')+')">'+(sg<0?'− ':sg>0?'+ ':'')+money(t.amount)+'</div></div></button>'}
  function catHtml(){
    var c=sheet.c, side=sheet.side, col=sheet.col||CAT_COL[0], rg=rpRange(), end=new Date(rg.e.getFullYear(),rg.e.getMonth(),1), B=[];
    for(var q=11;q>=0;q--){var d=new Date(end.getFullYear(),end.getMonth()-q,1);B.push({d:d,k:ym(d),v:0})}
    var idx={};B.forEach(function(b,i){idx[b.k]=i});
    S.reports.forEach(function(t){var sg=txSign(t);if((side==='in'?sg<=0:sg>=0)||txCat(t)!==c)return;var d=parseD(t.date);if(!d)return;var i=idx[ym(d)];if(i!=null)B[i].v+=t.amount});
    var mx=Math.max.apply(null,B.map(function(b){return b.v}).concat([1])), tot=sum(B,function(b){return b.v}), act=B.filter(function(b){return b.v>0}).length;
    var W=330,H=150,pad=6,bw=(W-pad*2)/12;
    var svg='<svg viewBox="0 0 '+W+' '+(H+34)+'" width="100%" role="img" aria-label="رسم شهري لـ '+esc(c)+'" style="direction:ltr;display:block"><line x1="0" y1="'+(H+2)+'" x2="'+W+'" y2="'+(H+2)+'" stroke="var(--line)"/>';
    B.forEach(function(b,i){var x=pad+i*bw, h0=b.v/mx*(H-22), w=bw*0.62, cx=x+bw/2, cur=i===11;
      if(b.v>0){svg+='<rect x="'+(cx-w/2)+'" y="'+(H+2-h0)+'" width="'+w+'" height="'+h0+'" rx="3" fill="'+col+'"'+(cur?'':' opacity=".85"')+'><title>'+fmt(b.v)+'</title></rect>';
        svg+='<text x="'+cx+'" y="'+(H-4-h0)+'" text-anchor="middle" font-size="8.5" fill="var(--ink)">'+(b.v>=1000?(Math.round(b.v/100)/10)+'k':Math.round(b.v))+'</text>'}
      svg+='<text x="'+cx+'" y="'+(H+16)+'" text-anchor="middle" font-size="7" fill="'+(cur?'var(--ink)':'var(--muted)')+'"'+(cur?' font-weight="700"':'')+'>'+b.d.toLocaleDateString('ar-EG-u-nu-latn',{month:'short'})+'</text>'+
        (b.d.getMonth()===0||i===0?'<text x="'+cx+'" y="'+(H+28)+'" text-anchor="middle" font-size="7.5" fill="var(--muted)">'+b.d.getFullYear()+'</text>':'')});
    svg+='</svg>';
    var h='<div class="tiles">'+tile(B[11].d.toLocaleDateString('ar-EG-u-nu-latn',{month:'long',year:'numeric'}),money(B[11].v),1)+tile('متوسط الشهر'+(act?' ('+act+' شهر فيه حركة)':''),money(act?tot/act:0))+tile('آخر 12 شهر',money(tot))+'</div>';
    h+='<div class="rows" style="padding:10px 8px 6px">'+svg+'</div>';
    var s=iso(rg.s),e=iso(rg.e), L=S.reports.filter(function(t){var sg=txSign(t);return !(side==='in'?sg<=0:sg>=0)&&txCat(t)===c&&t.date>=s&&t.date<=e}).sort(function(a,b){return String(b.date).localeCompare(String(a.date))});
    h+='<div class="rows"><h3>معاملات '+esc(rg.label)+'</h3></div><div class="list">'+(L.length?L.map(txRow).join(''):'<div class="empty">مفيش معاملات في الفترة دي.</div>')+'</div>';
    return h;
  }
  function renderMain(){
    var m=document.getElementById('main');
    document.getElementById('screenTitle').textContent=route==='home'?'الرئيسية':route==='settings'?'الإعدادات والتحديث':COLLS[route].title;
    var fab=document.getElementById('fab');
    fab.hidden=route==='home'||route==='settings'||!loaded; if(!fab.hidden)fab.innerHTML=ic('plus')+'<span>'+COLLS[route].add+'</span>';
    if(dbErr){m.innerHTML='<section class="hero"><p class="lead bad">'+esc(dbErr)+'</p><p>جرّب تقفل البرنامج وتفتحه تاني.</p></section>';return}
    if(!loaded){m.innerHTML='<div class="empty">بحمّل البيانات…</div>';return}
    var h= route==='settings'?screenSettings(): route==='home'?screenHome(): route==='reports'?screenReports(): route==='spend'?screenSpend(): route==='notifs'?screenNotifs(): route==='cards'?screenCards(): route==='loans'?screenLoans():
           route==='debts'||route==='lent'?screenDebts(route): route==='income'?screenIncome():
           route==='gamiyas'?screenGamiyas(): route==='insurance'?screenInsurance(): route==='bnpl'?screenBnpl():
           route==='accounts'||route==='wallets'?screenBalances(route): screenExpenses();
    m.innerHTML=h;
  }

  /* ================= sheet (details + forms) ================= */
  function find(coll,id){return S[coll].filter(function(x){return x.id===id})[0]}
  function r(k,v){return '<div class="r"><span class="k">'+k+'</span><span class="v">'+v+'</span></div>'}
  function delBtn(coll,id){var key=coll+id;return '<button class="btn sm danger" data-act="del">'+(confirmDel===key?'تأكيد الحذف؟':'حذف')+'</button>'}

  function dFull(d){return d?'<span class="num">'+d.toLocaleDateString('en-GB')+'</span>':'—'}
  function eppMini(c){
    var es=eppSum(c); if(!es.active)return '';
    var rows=(c.epp||[]).map(function(e,i){return {e:e,k:es.list[i]}}).filter(function(o){return o.k.left>0}).sort(function(a,b){return a.k.lastBill-b.k.lastBill});
    return '<div class="eppmini"><div class="eh"><span>تقسيط شغال ('+es.active+')</span><span>في الكشف الجاي <b class="num" style="color:var(--ink)">'+fmt(es.next)+'</b> ج</span></div>'+
      rows.map(function(o){var e=o.e,k=o.k;
        return '<div class="er"><span class="d"><span dir="auto">'+esc(e.desc||'تقسيط')+'</span><br><small>بدأت '+dShort(e.date)+' · القيمة '+fmt(e.amount)+' · '+k.ten+' قسط (باقي '+k.left+')</small></span>'+
          '<span class="v"><b class="num">'+fmt(k.inst)+'</b> ج/شهر<br><small>آخر قسط '+dFull(k.lastBill)+'</small></span></div>'}).join('')+'</div>';
  }
  function eppHtml(c,x){
    var es=eppSum(c), E=c.epp||[], h='';
    h+='<div class="rows"><h3>التقسيط على الكارت (EPP وتحويل الرصيد)</h3>';
    if(!E.length)h+='<div class="r"><span class="k">مفيش تقسيط متسجل على الكارت ده.</span></div>';
    else{
      h+=r('قسط التقسيط في الكشف الجاي','<b>'+money(es.next)+'</b> <span class="fine">('+es.active+' تقسيط شغال)</span>')+
        r('باقي التقسيط اللي لسه ما نزلش في كشف',money(es.remPay))+
        (Math.abs(es.held-es.remPay)>=1?r('منه محجوز من الحد (أصل المبلغ تقريبًا)',money(es.held)):'');
      var order=E.map(function(e,i){return {e:e,i:i,k:es.list[i]}}).sort(function(a,b){return (b.k.left>0)-(a.k.left>0)||String(b.e.date).localeCompare(String(a.e.date))});
    }
    h+='</div>';
    if(E.length)h+=order.map(function(o){var e=o.e,k=o.k,done=k.left<=0;
        return '<div class="epp'+(done?' done':'')+'"><div class="eh"><b dir="auto">'+esc(e.desc||'تقسيط')+'</b>'+(done?'<span class="pill done">خلص</span>':'<span class="pill near">باقي '+k.left+' قسط</span>')+'</div>'+
          '<div class="g"><span><b>بدأت</b>'+dFull(parseD(e.date))+'</span><span><b>قيمة المعاملة</b>'+money(e.amount)+'</span>'+
          '<span><b>قيمة القسط</b>'+money(k.inst)+'</span><span><b>عدد الأقساط</b><span class="num">'+k.ten+'</span> (نزل '+k.billed+' · باقي '+k.left+')</span>'+
          '<span><b>أول قسط (كشف)</b>'+dFull(k.first)+'</span><span><b>آخر قسط (كشف)</b>'+dFull(k.lastBill)+'</span>'+
          '<span><b>الباقي تدفعه</b>'+money(k.remPay)+'</span>'+(k.interest?'<span><b>فوايد التقسيط</b>'+money(k.interest)+'</span>':'<span><b>فوايد التقسيط</b>بدون فوايد</span>')+'</div>'+
          '<div class="actions" style="justify-content:flex-end"><button class="btn sm" data-act="epp-del" data-i="'+o.i+'">'+(confirmDel==='epp'+c.id+o.i?'متأكد؟ امسح':'حذف')+'</button></div></div>'}).join('');
    if(es.held>0){var used=x.debt, rest=Math.round((used-es.held)*100)/100;
      h+='<div class="whatif"><div class="r"><span class="k"><b style="color:var(--ink)">ليه الرصيد'+(x.over>0?' أوفر ليمت':' عالي')+' والكشف أقل من الحد؟</b></span></div>'+
        '<p class="note" style="margin:0">لما بتقسط مشتريات (EPP) أو تحوّل رصيد، البنك بيحجز باقي المبلغ كله من الحد مرة واحدة، لكن الكشف بينزل فيه قسط واحد بس كل شهر. عشان كده المديونية بتبان أكبر من الكشف، وممكن تعدّي الحد.</p>'+
        r('المديونية (المستخدم)',money(used))+r('− تقسيط محجوز لسه ما نزلش',money(es.held))+r('= الكشف والمشتريات العادية',money(rest))+
        (n(c.limit)?r('الحد من غير التقسيط المحجوز',money(Math.max(n(c.limit)-es.held,0))):'')+'</div>';}
    if(E.length&&n(c.closeDay)){var L=lastClose(n(c.closeDay),today()), rows='';
      for(var q=1;q<=6;q++){var dq=clampD(L.getFullYear(),L.getMonth()+q,n(c.closeDay)), t=0;
        E.forEach(function(e,i){var k=es.list[i];if(dq>=k.first&&dq<=k.lastBill){var idx=monthsBetween(k.first,dq);t+=(k.flat&&idx===k.ten-1)?Math.round((n(e.amount)-(k.ten-1)*k.inst)*100)/100:k.inst}});
        rows+=r('كشف '+dq.toLocaleDateString('ar-EG-u-nu-latn',{month:'long',year:'numeric'}),money(t))}
      h+='<div class="rows"><h3>أقساط التقسيط في الكشوف الجاية</h3>'+rows+'</div>';}
    h+='<details class="whatif"><summary style="cursor:pointer;font-weight:600">+ إضافة تقسيط على الكارت</summary><div class="fields" style="margin-top:8px">'+
      '<label class="full" for="ep-desc">البيان<input id="ep-desc" type="text" placeholder="Amazon EPP، تحويل رصيد…"></label>'+
      '<label for="ep-date">تاريخ العملية<input id="ep-date" class="ltr" type="date" value="'+iso(today())+'"></label>'+
      '<label for="ep-amt">المبلغ<input id="ep-amt" class="ltr" type="number" inputmode="decimal" step="any"></label>'+
      '<label for="ep-ten">عدد الشهور<input id="ep-ten" class="ltr" type="number" inputmode="numeric" step="1"></label>'+
      '<label for="ep-inst">القسط الشهري (فاضي = المبلغ ÷ الشهور)<input id="ep-inst" class="ltr" type="number" inputmode="decimal" step="any"></label>'+
      '<label class="full" for="ep-first">أول قسط نزل في كشف يوم (فاضي = أول كشف بعد العملية)<input id="ep-first" class="ltr" type="date"></label></div>'+
      '<div class="actions"><button class="btn primary sm" data-act="epp-add">أضف التقسيط</button></div></details>';
    return h;
  }
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
      r('رسوم شهرية ثابتة',(n(c.monthlyFee)||n(c.monthlyPct))?(n(c.monthlyFee)?money(c.monthlyFee):'')+(n(c.monthlyFee)&&n(c.monthlyPct)?' + ':'')+(n(c.monthlyPct)?fmt(c.monthlyPct)+'% من الرصيد':'')+' ≈ '+money(x.monthly)+' الشهر ده':'—')+
      (c.cardType?r('نوع الكارت',esc(c.cardType)):'')+(c.annualFee!==''&&c.annualFee!=null?r('الرسوم السنوية',n(c.annualFee)?money(c.annualFee):'مجانًا'):'')+
      (n(c.minPct)?r('قاعدة الحد الأدنى','<span class="num">'+fmt(c.minPct)+'%</span> من الكشف'+(n(c.minFixed)?'، مش أقل من '+money(c.minFixed):'')):'')+(c.cashFee?r('سحب الكاش',esc(c.cashFee)):'')+'</div>'+
      (function(){var bk=bankById(c.bankId);return bk?'<p class="note">'+(bk.q==='تقديري'?'⚠️ رسوم تقديرية (مفيش تعريفة منشورة للبنك)، راجعها من الكشف.':'مصدر الرسوم: '+esc(bk.src))+'</p>':''})();
    h+='<div class="rows"><h3>الكشف الحالي</h3>'+r('آخر ميعاد سداد',x.due?dl(x.due)+' · '+rel(x.days):'—')+r('المطلوب للسداد',money(c.statement))+r('الحد الأدنى',x.minEst?money(x.minVal)+' <span class="fine">(تقديري من قاعدة البنك)</span>':money(c.min))+
      r('اللي اتسدد',money(c.paid))+r('باقي من الحد الأدنى',money(x.remMin))+r('باقي من المديونية',money(x.rem))+'</div>';
    h+=eppHtml(c,x);
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
    var ck='cards:'+esc(c.id);
    h+='<div class="whatif"><div class="r"><span class="k"><b style="color:var(--ink)">الرصيد دلوقتي</b></span><span>'+hBalTxt('cards',c)+' · المديونية '+money(hUsed(c))+'</span></div><div class="r"><span class="k fine">'+hSyncTxt(c)+(eppSum(c).held>0?' · منها تقسيط محجوز '+fmt(eppSum(c).held):'')+'</span></div>'+
      '<div class="actions"><button class="btn primary sm" data-act="mv-new" data-t="spend" data-from="'+ck+'">اصرف منه</button><button class="btn sm" data-act="mv-new" data-t="xfer" data-from="'+ck+'">حوّل منه</button>'+
      '<button class="btn sm" data-act="mv-new" data-t="xfer" data-to="'+ck+'">اشحنه من حساب</button><button class="btn sm" data-act="hb-edit" data-k="'+ck+'">عدّل الرصيد</button></div></div>';
    h+='<div class="actions"><button class="btn sm" data-act="card-new">'+ic('statement',16)+' إدخال كشف حساب جديد</button><button class="btn sm" data-act="edit">تعديل</button>'+delBtn('cards',c.id)+'</div>'+
      (c.stmtFor?'<p class="note">الكشف المسجل: اللي قفل يوم '+dShort(c.stmtFor)+'.'+(c.closeDay?' الكشف الجاي بيقفل يوم '+esc(c.closeDay)+' والتطبيق هيطلبه منك في الرئيسية.':'')+'</p>':'');
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
      r('اتسدد من الأصل','<span class="num">'+Math.round(x.paidPct*100)+'%</span>')+(function(){var pn=loanPen(l);return pn?r('لو اتأخرت',money(n(l.installment)+pn)+' (غرامة '+money(pn)+(n(l.penalty)?'':' تقديري')+')'):''})()+'</div>';
    var lfee=(n(l.penaltyRate)?r('عائد التأخير','+<span class="num">'+fmt(l.penaltyRate)+'%</span> سنويًا على المتأخر'):'')+(n(l.penaltyFixed)?r('غرامة ثابتة',money(l.penaltyFixed)+' لكل قسط متأخر'):'')+(n(l.penaltyPct)?r('غرامة نسبة','<span class="num">'+fmt(l.penaltyPct)+'%</span> من المتأخر'):'')+
      (n(l.earlyPct)?r('لو قفلته دلوقتي',n(l.outstanding)?money(n(l.outstanding)*(1+n(l.earlyPct)/100))+' <span class="fine">(المتبقي + عمولة '+fmt(l.earlyPct)+'% = '+money(n(l.outstanding)*n(l.earlyPct)/100)+')</span>':'عمولة '+fmt(l.earlyPct)+'% من المتبقي'):'')+
      (n(l.adminPct)?r('المصاريف الإدارية','<span class="num">'+fmt(l.adminPct)+'%</span>'+(n(l.amount)?' = '+money(n(l.amount)*n(l.adminPct)/100):'')):'');
    if(lfee)h+='<div class="rows"><h3>رسوم وغرامات القرض</h3>'+lfee+'</div>';
    var lbk=bankById(l.bankId);if(lbk&&lbk.l&&lbk.l.note)h+='<p class="note">'+esc(lbk.s)+': '+esc(lbk.l.note)+'</p>';
    if(l.notes)h+='<p class="note">'+esc(l.notes)+'</p>';
    h+='<p class="note">عدد الأقساط محسوب من ميعاد القسط الجاي لحد تاريخ الانتهاء. "المتبقي حسب البنك" حدّثه من تطبيق البنك كل فترة.</p>';
    h+=payBlock('loans',l,'دفع قسط '+(x.due?dl(x.due):''));
    h+='<div class="actions"><button class="btn sm" data-act="loan-upd">تحديث شهري من كشف البنك</button><button class="btn sm" data-act="edit">تعديل</button>'+delBtn('loans',l.id)+'</div>'+
      (l.outstandingAt?'<p class="note">آخر تحديث للمتبقي: '+dShort(l.outstandingAt)+'</p>':'');
    return h;
  }
  function detailDebt(coll,d){
    var x=calcDebt(d), lent=coll==='lent';
    var h='<div class="tiles">'+tile(lent?'المبلغ':'قيمة السلفة',money(d.amount))+tile(lent?'اتردلي':'اتسدد',money(x.paid))+tile(lent?'لسه عنده':'المتبقي',money(x.rem),1)+'</div>';
    h+='<div class="rows">'+r('الاسم',esc(d.name))+(d.kind?r('النوع',esc(d.kind)):'')+r(lent?'تاريخ السلفة':'تاريخ أخذ السلفة',dShort(d.date))+
      r(lent?'اتفاق الرد':'طريقة السداد',esc(d.plan||'—'))+'</div>';
    if(d.notes)h+='<div class="rows"><h3>'+(lent?'بيان':'بيان السلفة')+'</h3><div class="r"><span>'+esc(d.notes)+'</span></div></div>';
    if(x.rem>0){
      var nx=addMonth(today()), pn=x.plan.length||1;
      h+='<div class="whatif"><div class="r"><span class="k"><b style="color:var(--ink)">'+(lent?'هيرجّع الباقي إزاي':'هتسدد الباقي إزاي')+' ('+money(x.rem)+')</b></span></div>'+
        '<div class="fields"><label for="dp-n">عدد الدفعات (1 = مرة واحدة)<input id="dp-n" class="ltr" type="number" inputmode="numeric" min="1" value="'+pn+'"></label>'+
        '<label for="dp-start">تاريخ '+(pn>1?'أول قسط':'السداد')+'<input id="dp-start" class="ltr" type="date" value="'+(x.next&&x.next.d?iso(x.next.d):iso(nx))+'"></label></div>'+
        '<p class="note" id="dp-prev">'+(pn>1?pn+' قسط × '+fmt(Math.floor(x.rem/pn*100)/100)+' كل شهر':'مرة واحدة: '+fmt(x.rem))+'</p>'+
        '<div class="actions"><button class="btn primary sm" data-act="debt-plan">اعمل الخطة</button>'+
        '<button class="btn sm" data-act="debt-all">'+(lent?'رجعلي الباقي كله':'ادفع الباقي كله')+' ('+fmt(x.rem)+')</button></div>'+
        '<p class="note">الخطة الجديدة بتحل محل الدفعات اللي لسه ما اتدفعتش. وتقدر تسجل أي دفعة جزئية في أي وقت من تحت.</p></div>';
    }
    var sch=(d.schedule||[]).map(function(s,i){return {s:s,i:i}}).sort(function(a,b){return String(a.s.date).localeCompare(String(b.s.date))});
    h+='<div class="rows pays"><h3>'+(lent?'مواعيد الرد المتفق عليها':'خطة السداد')+(x.planned?' · باقي '+money(x.planned):'')+'</h3>'+(sch.length?sch.map(function(o){var dd=parseD(o.s.date);
      return '<div class="r"><span class="k">'+(dd?dl(dd):'—')+(o.s.note?' · '+esc(o.s.note):'')+(o.s.done?' <span class="pill paid">'+(lent?'رجعت':'اتدفعت')+'</span>':dd?' <span class="pill '+stateOf(daysTo(dd))+'">'+rel(daysTo(dd))+'</span>':'')+'</span>'+
        (n(o.s.paidAmt)>0&&!o.s.done?'<br><span class="fine">اتدفع '+fmt(o.s.paidAmt)+' · الباقي '+fmt(Math.max(n(o.s.amount)-n(o.s.paidAmt),0))+'</span>':'')+
        '<span class="v">'+money(o.s.amount)+(o.s.done?'':' <button class="btn sm primary" data-act="plan-done" data-i="'+o.i+'">'+(lent?'رجعت':(n(o.s.paidAmt)>0?'دفعت الباقي':'دفعتها'))+'</button>')+' <button class="btn sm danger" data-act="del-sched" data-i="'+o.i+'" aria-label="حذف">×</button></span></div>'}).join(''):'<div class="r"><span class="k">مفيش خطة لسه</span></div>')+'</div>';
    h+='<div class="actions"><input class="in num-in" id="sch-amt" type="number" inputmode="decimal" min="0" step="any" placeholder="المبلغ" aria-label="مبلغ الدفعة المخططة">'+
      '<input class="in" id="sch-date" type="date" value="'+iso(addMonth(today()))+'" aria-label="ميعادها" style="direction:ltr">'+
      '<input class="in" id="sch-note" type="text" placeholder="ملاحظة (اختياري)" aria-label="ملاحظة" style="flex:1;min-width:120px">'+
      '<button class="btn sm" data-act="add-sched">ضيف للخطة</button></div>';
    var pays=(d.payments||[]).map(function(p,i){return {p:p,i:i}}).sort(function(a,b){return String(a.p.date).localeCompare(String(b.p.date))});
    h+='<div class="rows pays"><h3>'+(lent?'الدفعات اللي رجعت':'الدفعات المسددة')+'</h3>'+(pays.length?pays.map(function(o){
      return '<div class="r"><span class="k">'+dShort(o.p.date)+(o.p.note?' · '+esc(o.p.note):'')+'</span><span class="v">'+money(o.p.amount)+' <button class="btn sm danger" style="margin-inline-start:6px" data-act="del-pay" data-i="'+o.i+'" aria-label="حذف الدفعة">×</button></span></div>'}).join(''):'<div class="r"><span class="k">مفيش دفعات لسه</span></div>')+'</div>';
    h+='<div class="actions"><input class="in num-in" id="pay-amt" type="number" inputmode="decimal" min="0" step="any" placeholder="المبلغ" aria-label="مبلغ الدفعة">'+
      '<input class="in" id="pay-date" type="date" value="'+iso(today())+'" aria-label="تاريخ الدفعة" style="direction:ltr">'+
      '<button class="btn primary sm" data-act="add-pay">'+(lent?'سجّل دفعة رجعت':'سجّل دفعة')+'</button></div>'+
      (x.plan.length?'<p class="note">أي دفعة بتتخصم من أقرب بند في الخطة الأول، ولو زادت بتكمّل على اللي بعده.</p>':'');
    h+='<div class="actions"><button class="btn sm" data-act="edit">تعديل</button>'+delBtn(coll,d.id)+'</div>';
    return h;
  }
  function detailSimple(coll,o){
    var h='<div class="rows">'+r(coll==='income'?'المصدر':'البند',esc(o.name))+(o.kind?r('النوع',esc(o.kind)):'')+r('المبلغ الشهري',money(o.amount))+r(coll==='income'?'يوم القبض':'يوم الدفع',n(o.day)?esc(o.day)+' كل شهر':'—')+'</div>';
    if(coll==='expenses'){var x=calcExp(o);
      if(!x.due)h+='<p class="note">حدد يوم الدفع من "تعديل" عشان تقدر تسجل دفعات.</p>';
      else h+=payBlock('expenses',o,'دفع '+(x.paid?'':'شهر '+x.due.toLocaleDateString('ar-EG-u-nu-latn',{month:'long'})+' · '+rel(x.days)));}
    if(coll==='income'){
      h+='<div class="whatif"><div class="r"><span class="k"><b style="color:var(--ink)">سجّل قبض</b></span></div>'+
        '<div class="actions"><input class="in num-in" id="inc-amt" type="number" inputmode="decimal" step="any" value="'+esc(o.amount)+'" aria-label="المبلغ">'+
        '<input class="in" id="inc-date" type="date" value="'+iso(today())+'" style="direction:ltr" aria-label="التاريخ"><button class="btn primary sm" data-act="inc-recv">قبضت</button></div></div>';
      var rc=S.reports.filter(function(t){return t.coll==='income'&&t.ref===o.id}).sort(function(a,b){return String(b.date).localeCompare(String(a.date))}).slice(0,6);
      if(rc.length)h+='<div class="rows"><h3>آخر مرات القبض</h3>'+rc.map(function(t){return r(dShort(t.date),money(t.amount))}).join('')+'</div>';
    }
    if(o.notes)h+='<p class="note">'+esc(o.notes)+'</p>';
    return h+'<div class="actions"><button class="btn sm" data-act="edit">تعديل</button>'+delBtn(coll,o.id)+'</div>';
  }
  function detailTx(tx){
    var src=tx.ref&&tx.coll&&tx.coll!=='reports'?find(tx.coll,tx.ref):null, plus=TX_IN.indexOf(tx.kind)>=0, info=tx.kind==='كشف'||tx.kind==='فوايد ورسوم'||tx.kind==='تحويل'||tx.kind==='تسوية رصيد';
    var h='<div class="tiles">'+tile(tx.kind,'<span style="color:var('+(info?'--ink':plus?'--ok':'--bad')+')">'+(info?'':plus?'+ ':'− ')+money(tx.amount)+'</span>',1)+tile('التاريخ',dShort(tx.date))+'</div>';
    h+='<div class="rows">'+r('البيان',esc(tx.name||'—'))+(tx.notes?r('التفاصيل',esc(tx.notes)):'')+(tx.via?r('اتدفع من',esc(tx.via)):'')+(tx.toName?r('اتحوّل لـ',esc(tx.toName)):'')+(tx.fee?r('العمولة',money(tx.fee)):'')+
      r('المصدر',tx.manual?'اتضافت بإيدك':(CAT[tx.coll]||'—')+' (اتسجلت لوحدها)')+'</div>';
    if(src)h+='<div class="actions"><button class="btn sm" data-act="open" data-coll="'+esc(tx.coll)+'" data-id="'+esc(src.id)+'">افتح '+esc(src.name||src.bank||'')+'</button></div>';
    if(tx.grp)h+='<p class="note">مسح العملية دي هيلغيها ويرجّع الأرصدة زي ما كانت قبلها (ومعاها العمولة لو فيه).</p>';
    else if(!tx.manual)h+='<p class="note">مسح المعاملة دي بيشيلها من التقارير بس، ومش بيلغي الدفعة نفسها. عشان تلغي دفعة، الغيها من جوّه البند.</p>';
    return h+'<div class="actions">'+(tx.manual?'<button class="btn sm" data-act="edit">تعديل</button>':'')+delBtn('reports',tx.id)+'</div>';
  }

  function payBlock(coll,o,title){
    var c=cycInfo(coll,o);
    if(!c){
      var mo=DAYF[coll]?calcMonthly(o[DAYF[coll]],o.paidMonth):null;
      if(mo&&mo.paid)return '<div class="whatif"><div class="r"><span class="k">الشهر ده اتدفع بالكامل · الجاي '+dl(mo.due)+'</span><button class="btn sm" data-act="month-toggle" data-id="'+esc(o.id)+'">إلغاء "اتدفع"</button></div></div>';
      return '';
    }
    var h='<div class="whatif"><div class="r"><span class="k"><b style="color:var(--ink)">'+esc(title||('دفع '+c.label))+'</b></span></div>'+
      '<div class="r"><span class="k">المطلوب</span><span>'+money(c.due)+'</span></div>'+
      '<div class="r"><span class="k">اتدفع</span><span>'+money(c.paid)+(c.log.length?' <span class="fine">('+c.log.map(function(l){return fmt(l.amount)+' يوم '+iso(parseD(l.date)).split('-').reverse().slice(0,2).join('/')}).join(' + ')+')</span>':'')+'</span></div>'+
      '<div class="r"><span class="k">الباقي من '+c.label+'</span><b class="'+(c.rem>0?'bad':'')+'">'+money(c.rem)+'</b></div>'+
      (c.totalLeft!=null?'<div class="r"><span class="k">الباقي من الإجمالي</span><span>'+money(c.totalLeft)+'</span></div>':'')+
      '<div class="actions"><input class="in num-in" id="cyc-amt" type="number" inputmode="decimal" min="0" step="any" placeholder="مبلغ" aria-label="مبلغ الدفعة">'+
      '<button class="btn primary sm" data-act="cyc-pay">سجّل دفعة</button><button class="btn sm" data-act="cyc-pay-all">دفعت الباقي ('+fmt(c.rem)+')</button>'+
      (c.paid>0?'<button class="btn sm danger" data-act="cyc-reset">'+(confirmDel==='cyc'+o.id?'متأكد؟':'إلغاء الدفعات')+'</button>':'')+'</div></div>';
    return h;
  }
  function monthToggleBtn(o,mo){return mo.due?'<button class="btn primary sm" data-act="month-toggle" data-id="'+esc(o.id)+'">'+(mo.paid?'إلغاء "اتدفع"':'علّم إنه اتدفع الشهر ده')+'</button>':''}
  function detailGam(g){
    var x=calcGam(g);
    var h='<div class="tiles">'+tile('القسط الجاي',money(x.nextAmt))+tile('مبلغ القبض',money(x.payout),1)+tile('القبض',x.received?'قبضت':x.pd?'<span style="font-size:15px">'+rel(x.pdays)+'</span>':'—')+'</div>';
    h+='<div class="rows"><h3>بيانات الجمعية</h3>'+r('النوع',esc(g.kind||'—'))+(isMF(g)?'':r('الشخص المسؤول',esc(g.organizer||'—')))+
      r('مبلغ الجمعية',money(n(g.installment)*x.m))+r('القسط الشهري',money(g.installment)+(n(g.installmentBefore)?' (قبل القبض '+money(g.installmentBefore)+')':''))+
      r('المدة','<span class="num">'+x.m+'</span> شهر · من '+dShort(g.start)+' لـ '+(x.end?dShort(iso(x.end)):'—'))+r('دوري في القبض',n(g.turn)?'<span class="num">'+g.turn+'</span>'+(x.pd?' · '+x.pd.toLocaleDateString('ar-EG-u-nu-latn',{month:'long',year:'numeric'}):''):'—')+'</div>';
    h+='<div class="rows"><h3>الأقساط والقبض</h3>'+r('اتدفع','<span class="num">'+x.pc+'</span> من <span class="num">'+x.m+'</span> شهر · '+money(x.paidTotal))+
      r('القسط الجاي',x.next?money(x.nextAmt)+' · '+dl(x.next)+' · '+rel(x.days):(x.done?'خلصت الأقساط':'—'))+r('باقي أقساط هتدفعها',money(x.leftTotal)+' (<span class="num">'+x.left+'</span> قسط)')+
      r('تاريخ القبض',x.pd?dl(x.pd):'—')+r('صافي القبض',money(x.payout)+(x.received?' · اتقبض':''))+'</div>';
    if(x.gf.mf&&x.gf.total){var gf=x.gf;
      h+='<div class="rows"><h3>رسوم Money Fellows</h3>'+
        r('الرسوم الإدارية',money(gf.admin))+(gf.tax?r('الضريبة',money(gf.tax)):'')+r('إجمالي الرسوم','<b>'+money(gf.total)+'</b>')+
        r('بيتخصم من القبض',money(gf.fromPayout))+
        (gf.pre?r(gf.mode==='spread'?'متوزع على الأقساط قبل القبض':'على أول قسط',money(gf.pre)+(gf.mode==='spread'&&n(g.turn)>1?' ('+fmt(Math.round(gf.pre/(n(g.turn)-1)*100)/100)+' × '+(n(g.turn)-1)+' قسط)':'')):'')+
        (gf.promo?r('خصم بروموكود','− '+money(gf.promo)+' من أول قسط'):'')+(gf.deposit?r('مقدم حجز','− '+money(gf.deposit)+' من أول قسط (اتدفع قبل البداية)'):'')+
        r('صافي تكلفة الجمعية عليك',money(gf.total-gf.promo)+' <span class="fine">('+fmt(Math.round((gf.total-gf.promo)/x.gross*1000)/10)+'% من مبلغ الجمعية)</span>')+'</div>';
    }
    h+='<div class="rows"><h3>حساب صافي القبض</h3>'+r('مبلغ الجمعية',money(x.gross))+
      (x.dedInst?r('قسط شهر القبض','− '+money(x.dedInst)):'')+
      (x.gf.mf&&x.gf.fromPayout?r('رسوم بتتخصم من القبض','− '+money(x.gf.fromPayout)):(n(g.fees)?r('رسوم','− '+money(g.fees)):''))+
      r('صافي القبض المحسوب','<b>'+money(x.payoutCalc)+'</b>')+
      (x.payoutManual&&Math.abs(x.payout-x.payoutCalc)>0.5?r('صافي القبض المكتوب بإيدك','<b>'+money(x.payout)+'</b> <span class="fine">(ده اللي بيتحسب)</span>'):'')+'</div>';
    h+='<div class="rows pays"><h3>جدول الشهور</h3>'+x.sc.map(function(s){
      var tag=s.payout?'<span class="pill inc">شهر القبض</span> ':'';
      var st=s.i<x.pc?'<span class="pill paid">اتدفع</span>':s.i===x.idx?'<span class="pill '+x.state+'">الجاي</span>':'';
      return '<div class="r"><span class="k">'+(s.d?s.d.toLocaleDateString('ar-EG-u-nu-latn',{month:'long',year:'numeric'}):'شهر '+(s.i+1))+' '+tag+'</span><span class="v">'+(s.ded?'<span class="fine">بيتخصم من القبض</span>':money(s.amt)+(s.fee?' <span class="fine">('+(s.fee>0?'فيه رسوم '+fmt(s.fee):'خصم '+fmt(-s.fee))+')</span>':''))+' '+st+'</span></div>'}).join('')+'</div>';
    if(g.notes)h+='<p class="note">'+esc(g.notes)+'</p>';
    var lt=gamLate(g,x);
    if(lt){var on=function(st){return lt.stage===st?' style="background:var(--warn-bg)"':''}, dshort=function(d){return d.toLocaleDateString('ar-EG-u-nu-latn',{day:'numeric',month:'long'})};
      var mon=lt.due.toLocaleDateString('ar-EG-u-nu-latn',{month:'long'});
      h+='<div class="rows"><h3>سياسة الدفع (Money Fellows) · قسط '+mon+'</h3>'+
        '<div class="r"'+on('window')+'><span class="k">ميعاد الدفع</span><span class="v">من '+dshort(lt.win)+' لـ '+dshort(lt.due)+'</span></div>'+
        '<div class="r"'+on('grace')+'><span class="k">فترة سماح (من غير غرامة)</span><span class="v">لحد '+dshort(lt.grace)+'</span></div>'+
        '<div class="r"'+on('late5')+'><span class="k">من '+dshort(lt.p1)+'</span><span class="v">غرامة 5% = '+money(lt.fee5)+' ← تدفع '+money(lt.rem+lt.fee5)+'</span></div>'+
        '<div class="r"'+on('late10')+'><span class="k">من '+dshort(lt.p2)+'</span><span class="v">غرامة 10% = '+money(lt.fee10)+' ← تدفع '+money(lt.rem+lt.fee10)+'</span></div>'+
        '<div class="r"'+on('cancel')+'><span class="k">'+dshort(lt.cancel)+'</span><span class="v" style="color:var(--bad)">إلغاء الاشتراك في الجمعية لو أول مرة تتأخر</span></div>'+
        (lt.received?'<div class="r"'+on('legal')+'><span class="k">آخر '+mon+'</span><span class="v" style="color:var(--bad)">انت قبضت الجمعية دي: ملفك يتحول للشؤون القانونية ومش هتقدر تشترك في أي جمعية تانية</span></div>':'')+
        '</div>';
      if(lt.fee>0)h+='<p class="note" style="color:var(--bad)">عليك دلوقتي غرامة '+lt.pct+'% = '+money(lt.fee)+'، يعني المطلوب '+money(lt.rem+lt.fee)+'.</p>';
      else if(lt.stage==='grace')h+='<p class="note" style="color:var(--warn)">انت في فترة السماح، ادفع قبل '+dshort(lt.p1)+' عشان تتجنب غرامة '+money(lt.fee5)+'.</p>';
      h+='<p class="note">طرق الدفع: كارت البنك / فوري / محفظة إلكترونية. وتقدر تدفع أي قسط مقدمًا من التطبيق: جمعياتي ← الجمعية ← المزيد ← دفع مسبق.</p>';
    }
    var pw=peopleWin(g,x);
    if(pw){var ds=function(d){return d.toLocaleDateString('ar-EG-u-nu-latn',{day:'numeric',month:'long'})}, pdays=daysTo(pw.to);
      h+='<div class="rows"><h3>سياسة الدفع (جمعية أفراد)</h3>'+
        '<div class="r" style="background:var(--warn-bg)"><span class="k">ميعاد الدفع</span><span class="v">من '+ds(pw.from)+' لـ '+ds(pw.to)+' · '+(pdays>=0?'فاضل '+rel(pdays).replace('بعد ',''):'عدّى')+'</span></div>'+
        '<div class="r"><span class="k">غرامة التأخير</span><span class="v">مفيش</span></div></div>';}
    h+=payBlock('gamiyas',g,x.next?'دفع قسط '+x.next.toLocaleDateString('ar-EG-u-nu-latn',{month:'long',year:'numeric'}):'');
    h+='<div class="actions">'+(x.pc>0?'<button class="btn sm" data-act="gam-unpaid">تراجع عن آخر قسط</button>':'')+
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
    h+=payBlock('insurance',p,x.mo.due&&!x.mo.paid?'دفع قسط '+dl(x.mo.due):'');
    return h+'<div class="actions"><button class="btn sm" data-act="edit">تعديل</button>'+delBtn('insurance',p.id)+'</div>';
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
    h+=payBlock('bnpl',b,x.mo.due&&!x.mo.paid?'دفع قسط '+dl(x.mo.due):'');
    return h+'<div class="actions"><button class="btn sm" data-act="edit">تعديل</button>'+delBtn('bnpl',b.id)+'</div>';
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
    h+='<div class="whatif"><div class="r"><span class="k"><b style="color:var(--ink)">حركة على الرصيد</b></span></div>'+
      '<div class="actions"><input class="in num-in" id="mv-amt" type="number" inputmode="decimal" min="0" step="any" placeholder="المبلغ" aria-label="المبلغ">'+
      '<input class="in" id="mv-src" type="text" placeholder="من فين / على إيه (شغل خارجي، تحويل…)" aria-label="البيان" style="flex:1;min-width:150px"></div>'+
      '<div class="actions"><button class="btn primary sm" data-act="bal-add">+ أضف للرصيد</button><button class="btn sm" data-act="bal-sub">− صرفت / سحبت</button></div>'+
      '<p class="note">الحركة بتتسجل في التقارير، والرصيد بيتحدّث على طول.</p></div>';
    var bk=coll+':'+esc(o.id);
    h+='<div class="actions"><button class="btn sm" data-act="mv-new" data-t="spend" data-from="'+bk+'">اصرف منه</button><button class="btn sm" data-act="mv-new" data-t="xfer" data-from="'+bk+'">حوّل منه</button>'+
      '<button class="btn sm" data-act="mv-new" data-t="xfer" data-to="'+bk+'">حوّل له</button><button class="btn sm" data-act="hb-edit" data-k="'+bk+'">عدّل الرصيد</button></div><p class="note">'+hSyncTxt(o)+'</p>';
    var mv=hMoves(coll,o.id).slice(0,8);
    if(mv.length)h+='<div class="rows"><h3>آخر الحركات</h3>'+mv.map(function(t){var sg=hMoveSign(t,coll,o.id),am=t.kind==='تسوية رصيد'?Math.abs(n(t.delta)):t.amount;
      return '<div class="r"><span class="k">'+dShort(t.date)+' · '+esc(t.notes||t.kind)+'</span><span class="v" style="color:var('+(sg>0?'--ok':'--bad')+')">'+(sg>0?'+ ':'− ')+money(am)+'</span></div>'}).join('')+'</div>';
    return h+'<div class="actions"><button class="btn sm" data-act="edit">تعديل</button>'+delBtn(coll,o.id)+'</div>';
  }

  function formHtml(){
    var f=sheet; if(isWiz(f))return wizHtml(f);
    var fields=FIELDS[f.coll], v=f.v, h='', open=false, sg=f.only?null:sugOf(f);
    function close(){if(open){h+='</div></div>';open=false}}
    function begin(t){close();h+='<div class="fgroup">'+(t?'<h3>'+t+'</h3>':'')+'<div class="fields">';open=true}
    var hideGroup=false;
    if(f.only)fields=f.only.map(function(k){return fields.filter(function(fd){return fd.k===k})[0]}).filter(Boolean);
    fields.forEach(function(fd){
      if(f.only){if(fd.g||f.only.indexOf(fd.k)<0)return}
      if(fd.g){hideGroup=!!(fd.when&&!fd.when(v));if(!hideGroup)begin(fd.g);return}
      if(hideGroup)return;
      if(!open)begin('');
      if(fd.when&&!fd.when(v))return;
      if(fd.t==='hidden')return;
      h+=fieldHtml(f,fd,sg?sg[fd.k]:null,fd.req);
    });
    close();
    if(!f.only&&(f.coll==='cards'||f.coll==='loans'))h=presetHtml(f)+h;
    if(f.hint)h='<p class="note">'+esc(f.hint)+'</p>'+h;
    return h+'<div class="actions"><button class="btn primary" data-act="save-form">حفظ</button><button class="btn" data-act="cancel-form">إلغاء</button></div>';
  }

  function renderSheet(){
    var el=document.getElementById('sheet');
    var oldScrim=el.querySelector('.sheet-scrim'), oldTop=oldScrim?oldScrim.scrollTop:0, oldKey=el.getAttribute('data-key');
    document.documentElement.classList.toggle('sheet-open',!!sheet);
    if(!sheet){el.innerHTML='';el.removeAttribute('data-key');return}
    var key=[sheet.mode,sheet.coll,sheet.id,sheet.k,sheet.step].join('|');
    setTimeout(function(){var s=el.querySelector('.sheet-scrim');if(s)s.scrollTop=(key===oldKey?oldTop:0)},0);
    el.setAttribute('data-key',key);
    var title, body;
    if(sheet.mode==='form'){title=sheet.title;body=formHtml()}
    else if(sheet.mode==='bd'){title=breakdown(sheet.k).title;body=bdHtml(sheet.k)}
    else if(sheet.mode==='pick'&&sheet.k==='wallet'){title='رصيد جديد';
      body='<p class="note">اختار النوع:</p><div class="otiles">'+[['حساب بنكي','🏛️','حساب بنكي','جاري أو توفير وكارته'],['محفظة موبايل','📱','محفظة على خط','فودافون كاش، اتصالات، أورنج، WE Pay'],
        ['محفظة بنكية','🏦','محفظة بنكية','CIB Smart Wallet، بنك مصر، الأهلي…'],['كاش','💵','كاش','معاك أو مع حد من البيت'],['كارت مدفوع مسبقًا','💳','كارت مدفوع مسبقًا','Money Fellows، ماي فوري، تيلدا، كليفر…'],['عملات رقمية','🪙','عملات رقمية','Binance وغيرها']].map(function(o){
        return otile(o[1],o[2],'data-act="new-wal" data-kind="'+o[0]+'"',o[3])}).join('')+'</div>'}
    else if(sheet.mode==='pick'){title='جمعية جديدة';
      body='<p class="note">اختار نوع الجمعية:</p><div class="otiles" style="grid-template-columns:repeat(2,minmax(0,1fr))">'+
        otile('🔄','جمعية Money Fellows','data-act="new-gam" data-kind="Money Fellows"','رسوم وخصم من القبض. الدفع من 25 لـ 5 وغرامة بعد يوم 10')+
        otile('👥','جمعية أفراد','data-act="new-gam" data-kind="جمعية أفراد"','من غير رسوم. الدفع من 1 لـ 10 من غير غرامات')+'</div>'}
    else if(sheet.mode==='move'){title=sheet.t==='spend'?'اصرف':sheet.v.from==='ext'?'فلوس من بره':'تحويل بين كروتك';body=moveHtml()}
    else if(sheet.mode==='cat'){title=catIc(sheet.c)+' '+sheet.c+(sheet.side==='in'?' (دخل)':'');body=catHtml()}
    else if(sheet.mode==='mvdone'){title='الرصيد بعد العملية';body=mvDoneHtml()}
    else if(sheet.mode==='hbal'){var hh=hGet(sheet.key);title=hh?hName(hh.coll,hh.o):'الرصيد';body=hbalHtml()}
    else{
      var o=find(sheet.coll,sheet.id); if(!o){sheet=null;el.innerHTML='';return}
      title=(sheet.coll==='accounts'?o.bank+(o.name?' · '+o.name:''):o.name)||COLLS[sheet.coll].one;
      var cl=sheet.coll;
      body= cl==='cards'?detailCard(o): cl==='loans'?detailLoan(o): (cl==='debts'||cl==='lent')?detailDebt(cl,o):
            cl==='gamiyas'?detailGam(o): cl==='insurance'?detailIns(o): cl==='bnpl'?detailBnpl(o):
            (cl==='accounts'||cl==='wallets')?detailBalance(cl,o): cl==='reports'?detailTx(o): detailSimple(cl,o);
    }
    var keepAmt=document.getElementById('pay-amt'); keepAmt=keepAmt?keepAmt.value:'';
    el.innerHTML='<div class="sheet-scrim" data-act="close-sheet"><div class="sheet" role="dialog" aria-modal="true" aria-label="'+esc(title)+'">'+
      '<div class="sheet-head">'+(sheet.back&&sheet.mode!=='form'?'<button class="icon-btn" data-act="sheet-back" aria-label="رجوع">'+ic('back')+'</button>':'')+'<h2>'+esc(title)+'</h2><button class="icon-btn" data-act="close-sheet-btn" aria-label="قفل">'+ic('close')+'</button></div>'+
      '<div class="sheet-body">'+body+'</div></div></div>';
    var pa=document.getElementById('pay-amt'); if(pa&&keepAmt&&sheet.mode!=='form')pa.value=keepAmt;
  }
  function renderAll(){renderNav();renderMain();if(!sheet||(sheet.mode!=='form'&&sheet.mode!=='move'))renderSheet()}

  function openForm(coll,id,preset,title,hint){
    var src=id?find(coll,id):null, v={};
    FIELDS[coll].forEach(function(fd){if(fd.k)v[fd.k]=src&&src[fd.k]!=null?src[fd.k]:(fd.t==='select'?fd.opts[0]:'')});
    if(preset)for(var k in preset)v[k]=preset[k];
    if((coll==='cards'||coll==='loans')&&!v.bankId&&v.bank){var gb=String(v.bank).toLowerCase().trim();var mb=BANKS.filter(function(b){return b.s.toLowerCase()===gb||b.n===v.bank})[0];if(mb)v.bankId=mb.id}
    sheet={mode:'form',coll:coll,id:id,v:v,title:title||(id?'تعديل '+(src.name||''):COLLS[coll].add),hint:hint,back:id?{mode:'detail',coll:coll,id:id}:null};
    renderSheet(); var first=document.querySelector('.sheet-body input,.sheet-body textarea'); if(first)first.focus();
  }
  function saveForm(){
    var f=sheet, rec={}, ok=true;
    FIELDS[f.coll].forEach(function(fd){ if(!fd.k)return; var e=document.getElementById('f-'+fd.k);
      if(!e){var hv=f.v[fd.k]==null?'':f.v[fd.k];if(fd.t==='number'&&hv!==''&&!isNaN(Number(hv)))hv=Number(hv);else if(typeof hv==='string')hv=hv.trim();if((fd.k==='number'&&f.coll==='cards')||fd.k==='cardNumber')hv=digits(hv);rec[fd.k]=hv;return}   /* field not on screen (hidden or other wizard step): keep what it had */
      var val=e.value;
      if(fd.t==='number')val=val===''?'':Number(val); else if(typeof val==='string')val=val.trim();
      if((fd.k==='number'&&f.coll==='cards')||fd.k==='cardNumber')val=digits(val);
      if(fd.req&&!val){ok=false;toast('اكتب '+fd.l)}
      rec[fd.k]=val; });
    if(!ok)return;
    mutate(function(){
      if(f.id){var tgt=find(f.coll,f.id);Object.assign(tgt,rec);if(f.onSave)f.onSave(tgt);sheet={mode:'detail',coll:f.coll,id:f.id}}
      else{rec.id=uid();if(f.coll==='debts'||f.coll==='lent')rec.payments=[];if(f.coll==='bnpl')rec.plans=[];
        if(f.coll==='reports')rec.manual=true;
        if((f.coll==='wallets'||f.coll==='accounts')&&rec.balance!=='')rec.balSync=iso(today());
        if(f.coll==='cards'){if(rec.balance===''&&n(rec.available)>0&&n(rec.limit)>0)rec.balance=Math.round((n(rec.limit)-n(rec.available))*100)/100; if(rec.balance!=='')rec.balSync=iso(today())}
        if(f.coll==='gamiyas'){var st=parseD(rec.start);rec.paidCount=st?countPast(st,n(rec.months)):0;rec.received=false}
        S[f.coll].push(rec);sheet={mode:'detail',coll:f.coll,id:rec.id}}
    });
    renderSheet(); toast('اتحفظ');
  }

  /* ================= daily payment notification ================= */
  /*NT-BUILD*/
  function ntBuild(plan,now){
    function z(x){return (x<10?'0':'')+x}
    function d2(d){return d.getFullYear()+'-'+z(d.getMonth()+1)+'-'+z(d.getDate())}
    function f(v){return Number(v||0).toLocaleString('en-US',{maximumFractionDigits:2})}
    var t=d2(now), tm=d2(new Date(now.getFullYear(),now.getMonth(),now.getDate()+1)), T0=new Date(now.getFullYear(),now.getMonth(),now.getDate());
    function dd(s){var p=String(s).split('-');return Math.round((new Date(+p[0],+p[1]-1,+p[2])-T0)/864e5)}
    var its=(plan.items||[]).filter(function(i){return i.a>0}).map(function(i){var c={};for(var k in i)c[k]=i[k];c.days=dd(i.d);return c});
    var G=[{k:'late',t:'متأخر عليك ولسه ما اتدفعش',x:its.filter(function(i){return i.d<t}).sort(function(a,b){return a.days-b.days})},
           {k:'today',t:'مطلوب النهاردة',x:its.filter(function(i){return i.d===t})},
           {k:'tomorrow',t:'جهّز لبكرا',x:its.filter(function(i){return i.d===tm})}];
    G.forEach(function(g){g.sum=g.x.reduce(function(s,i){return s+i.a},0)});
    var due=G[0].sum+G[1].sum;
    var title=due>0?'3bhady · مطلوب النهاردة '+f(due)+' ج':(G[2].x.length?'3bhady · مفيش مستحق النهاردة، بكرا '+f(G[2].sum)+' ج':'3bhady · مفيش مدفوعات النهاردة ولا بكرا');
    var lines=[];
    G.forEach(function(g){if(!g.x.length)return;
      lines.push(g.t+' ('+f(g.sum)+' ج):');
      g.x.forEach(function(i){lines.push('• '+i.n+' — '+f(i.a)+' ج'+(g.k==='late'?' (متأخر '+(-i.days)+' يوم)':''))})});
    if(!lines.length)lines.push('مفيش حاجة مستحقة النهاردة ولا بكرا.');
    return {id:'n'+t+'-'+now.getTime(),kind:'daily',date:t,at:now.toISOString(),title:title,body:lines.join('\n'),total:due,
      groups:G.map(function(g){return {k:g.k,t:g.t,sum:g.sum,items:g.x}}),read:false};
  }
  /*NT-END*/
  var NT_C='3bh-notify', NT_PLAN='./__3bh/plan', NT_LAST='./__3bh/last', NT_INBOX='./__3bh/inbox';
  function ntPlan(){return {hour:ntHour(),items:agendaItems().filter(function(i){return i.amt>0&&i.state!=='paid'&&i.date}).map(function(i){return {n:i.name,s:i.sub,d:iso(i.date),a:Math.round(i.amt*100)/100,c:i.coll,i:i.id}})}}
  function ntHour(){var h=S.notifyHour;return h===''||h==null?10:n(h)}
  var ntT=null;
  function ntWritePlan(){clearTimeout(ntT);ntT=setTimeout(function(){try{if(!window.caches)return;caches.open(NT_C).then(function(c){return c.put(NT_PLAN,new Response(JSON.stringify(ntPlan()),{headers:{'content-type':'application/json'}}))}).catch(function(){})}catch(e){}},800)}
  function ntPerm(){try{return 'Notification' in window?Notification.permission:'unsupported'}catch(e){return 'unsupported'}}
  function ntShow(m){
    if(ntPerm()!=='granted')return;
    var opt={body:m.body,tag:'3bh-'+m.date,icon:'icon-192.png',badge:'icon-192.png',lang:'ar',dir:'rtl',renotify:true,data:{url:'./#notifs'}};
    try{if(navigator.serviceWorker&&navigator.serviceWorker.getRegistration){navigator.serviceWorker.getRegistration().then(function(reg){if(reg&&reg.showNotification)reg.showNotification(m.title,opt);else new Notification(m.title,opt)}).catch(function(){try{new Notification(m.title,opt)}catch(e){}})}
      else new Notification(m.title,opt)}catch(e){}
    try{if(window.caches)caches.open(NT_C).then(function(c){c.put(NT_LAST,new Response(m.date))})}catch(e){}
  }
  function ntRun(force){
    if(!loaded||!S.notifs)return;
    var now=new Date(), d=iso(today());
    if(!force){if(now.getHours()<ntHour())return;if(S.notifs.some(function(x){return x.kind==='daily'&&x.date===d}))return}
    var m=ntBuild(ntPlan(),now); if(force)m.kind='manual';
    S.notifs.unshift(m); if(S.notifs.length>120)S.notifs.length=120;
    save(); renderNav(); if(route==='notifs')renderMain(); ntShow(m);
    return m;
  }
  function ntImport(){
    try{if(!window.caches)return;caches.open(NT_C).then(function(c){return c.match(NT_INBOX).then(function(r){if(!r)return;return r.json().then(function(arr){
      var added=0;(arr||[]).forEach(function(m){if(!S.notifs.some(function(x){return x.kind==='daily'&&x.date===m.date})){S.notifs.unshift(m);added++}});
      S.notifs.sort(function(a,b){return String(b.at).localeCompare(String(a.at))});
      return c.delete(NT_INBOX).then(function(){if(added){save();renderAll()}})})})}).catch(function(){})}catch(e){}
  }
  function ntPeriodic(){
    try{navigator.serviceWorker.ready.then(function(reg){if(!reg.periodicSync)return;
      var go=function(){reg.periodicSync.register('3bh-daily',{minInterval:60*60*1000}).catch(function(){})};
      if(navigator.permissions&&navigator.permissions.query)navigator.permissions.query({name:'periodic-background-sync'}).then(function(s){if(s.state==='granted')go()}).catch(go);else go()}).catch(function(){})}catch(e){}
  }
  function ntEnable(){
    if(ntPerm()==='unsupported'){toast('الموبايل ده مش بيدعم الإشعارات من البرنامج');return}
    Notification.requestPermission().then(function(p){renderMain();if(p==='granted'){ntPeriodic();ntWritePlan();toast('الإشعارات اتفعلت');var d=iso(today());
      if(new Date().getHours()>=ntHour()&&!S.notifs.some(function(x){return x.kind==='daily'&&x.date===d}))ntRun()}else toast('الإشعارات اترفضت. فعّلها من إعدادات الموبايل للبرنامج')});
  }
  function ntBoot(){
    ntImport();ntWritePlan();if(ntPerm()==='granted')ntPeriodic();
    setTimeout(function(){ntRun()},1500);
    setInterval(function(){ntRun()},60*1000);
    document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible'){ntImport();ntRun();ntWritePlan()}});
  }
  function ntUnread(){return (S.notifs||[]).filter(function(x){return !x.read}).length}
  function screenNotifs(){
    var p=ntPerm(), hr=ntHour(), h='<section class="hero">';
    if(p==='granted')h+='<p class="lead ok">الإشعارات شغالة</p><p>كل يوم الساعة <b class="num">'+hr+':00</b> هيوصلك إشعار بالمطلوب النهاردة، والمتأخر عليك، واللي هتدفعه بكرا. وكل إشعار بيتحفظ هنا.</p>';
    else if(p==='denied')h+='<p class="lead bad">الإشعارات مقفولة</p><p>افتح إعدادات الموبايل ← التطبيقات ← 3bhady (أو Chrome) ← الإشعارات، وفعّلها، وارجع هنا.</p>';
    else if(p==='unsupported')h+='<p class="lead bad">الموبايل ده مش بيدعم الإشعارات من البرنامج</p><p>الرسالة اليومية هتتحفظ هنا برضو لما تفتح البرنامج بعد الساعة '+hr+':00.</p>';
    else h+='<p class="lead">فعّل الإشعارات</p><p>عشان يوصلك كل يوم الساعة '+hr+':00 إشعار بالمطلوب النهاردة والمتأخر واللي بكرا.</p><div class="actions"><button class="btn primary" data-act="nt-enable">فعّل الإشعارات</button></div>';
    h+='<div class="actions"><label class="fine" for="nt-hour">ميعاد الإشعار</label><select class="in" id="nt-hour">';
    for(var q=6;q<=23;q++)h+='<option value="'+q+'"'+(q===hr?' selected':'')+'>'+(q<10?'0':'')+q+':00</option>';
    h+='</select><button class="btn sm" data-act="nt-now">ابعت رسالة النهاردة دلوقتي</button>'+(ntUnread()?'<button class="btn sm" data-act="nt-read">علّم الكل مقروء</button>':'')+'</div>';
    h+='<p class="note">الإشعار بيوصل في ميعاده لو البرنامج مفتوح أو في الخلفية، ولو كان مقفول بيوصل أول ما تفتحه بعد الميعاد. عشان يوصل والبرنامج مقفول خالص لازم ملف sw.js الجديد يترفع على GitHub، وحتى ساعتها أندرويد هو اللي بيحدد اللحظة بالظبط فممكن يتأخر شوية.</p></section>';
    var L=S.notifs||[];
    if(!L.length)return h+'<div class="list"><div class="empty">لسه مفيش إشعارات. أول رسالة هتيجي النهاردة الساعة '+hr+':00 أو دوس "ابعت رسالة النهاردة دلوقتي".</div></div>';
    h+='<section class="sec"><h2>الرسائل</h2>';
    L.forEach(function(m){var at=new Date(m.at);
      h+='<div class="ntf'+(m.read?'':' unread')+'"><div class="eh"><b>'+esc(m.title.replace(/^3bhady · /,''))+'</b><span class="fine">'+esc(at.toLocaleDateString('ar-EG-u-nu-latn',{weekday:'long',day:'numeric',month:'long'}))+' · <span class="num">'+at.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})+'</span></span></div>';
      var any=false;(m.groups||[]).forEach(function(g){if(!g.items||!g.items.length)return;any=true;
        h+='<div class="ng ng-'+g.k+'"><div class="ngh"><span>'+esc(g.t)+'</span><b>'+money(g.sum)+'</b></div>'+g.items.map(function(i){
          var dt=parseD(i.d);return '<button class="nr" '+(i.c&&i.i?'data-act="open" data-coll="'+esc(i.c)+'" data-id="'+esc(i.i)+'"':'')+'><span class="d"><span>'+esc(i.n)+'</span><small>'+esc(i.s||'')+(dt?' · '+dt.toLocaleDateString('ar-EG-u-nu-latn',{day:'numeric',month:'short'}):'')+(g.k==='late'?' · متأخر '+(-i.days)+' يوم':'')+'</small></span><b class="num">'+fmt(i.a)+'</b></button>'}).join('')+'</div>'});
      if(!any)h+='<p class="fine" style="margin:0">مفيش حاجة مستحقة النهاردة ولا بكرا.</p>';
      h+='</div>'});
    return h+'</section>';
  }
  /* ================= spend & transfer (cards, account cards, wallets) ================= */
  /* "holder" = anything with a balance: credit card (balance = used, money = limit − used), account, wallet */
  var MV_KINDS=['مشتريات','أكل وشرب','فواتير ومرافق','مواصلات وبنزين','بيت','عيلة','شخصي','خروجات واجتماعيات','صحة','تعليم','استثمار','سحب كاش','أخرى'];
  function hName(coll,o){return coll==='accounts'?o.bank+(o.name?' · '+o.name:''):o.name}
  function hCur(coll,o){if(coll==='cards')return 'EGP';var c=String(o.currency||'').trim();return (!c||c.toUpperCase()==='EGP'||c==='جنيه'||c==='ج')?'EGP':c}
  function hUsed(c){return (c.balance!==''&&c.balance!=null)?n(c.balance):calcCard(c).debt}
  function hBal(coll,o){return coll==='cards'?Math.round((n(o.limit)-hUsed(o))*100)/100:n(o.balance)}
  function hRate(coll,o){if(hCur(coll,o)==='EGP')return 1;return n(o.balance)&&n(o.egp)?n(o.egp)/n(o.balance):0}
  function hGet(key){var p=String(key||'').split(':');if(p.length<2||!S[p[0]])return null;var o=find(p[0],p[1]);return o?{coll:p[0],o:o,key:key}:null}
  function hKey(coll,o){return coll+':'+o.id}
  function hSet(coll,o,bal){
    bal=Math.round(n(bal)*100)/100;
    if(coll==='cards'){var used=Math.round((n(o.limit)-bal)*100)/100;o.balance=used;o.available=Math.max(bal,0)}
    else{var rt=hRate(coll,o);o.balance=bal;if(hCur(coll,o)!=='EGP'&&rt)o.egp=Math.round(bal*rt*100)/100}
    o.balanceAt=iso(today());
  }
  function hAmt(coll,o,v){var c=hCur(coll,o);return c==='EGP'?money(v):'<span class="num">'+fmt(v)+'</span> '+esc(c)}
  function hBalTxt(coll,o){var b=hBal(coll,o);
    if(coll!=='cards')return hAmt(coll,o,b);
    return b<0?'<span style="color:var(--bad)">أوفر ليمت '+money(-b)+'</span>':'متاح '+money(b)}
  function hSyncTxt(o){return o.balSync?'آخر تأكيد منك '+dShort(o.balSync):'<span style="color:var(--warn)">لسه ما أكدتش رصيده</span>'}
  function hMoves(coll,id){
    return S.reports.filter(function(t){return t.kind!=='كشف'&&((t.coll===coll&&t.ref===id)||(t.toColl===coll&&t.toRef===id))})
      .sort(function(a,b){return String(b.date).localeCompare(String(a.date))||(b.seq||0)-(a.seq||0)});
  }
  function hMoveSign(t,coll,id){
    if(t.kind==='تسوية رصيد')return n(t.delta)<0?-1:1;
    if(t.toColl===coll&&t.toRef===id)return 1;
    var e=(t.eff||[]).filter(function(x){return x.coll===coll&&x.id===id})[0]; if(e)return e.delta<0?-1:1;
    if(coll==='cards'&&t.kind==='دفعة')return 1;
    return TX_IN.indexOf(t.kind)>=0?1:-1;
  }
  function hShort(coll,o){
    if(coll==='cards'){var nm=String(o.name||''),bk=String(o.bank||'');if(bk&&nm.toLowerCase().indexOf(bk.toLowerCase()+' ')===0)nm=nm.slice(bk.length+1);return {t1:bk||nm,t2:bk?nm:'',l4:digits(o.number).slice(-4)}}
    if(coll==='accounts')return {t1:o.bank,t2:String(o.name||'حساب').split(' - ')[0],l4:digits(o.cardNumber).slice(-4)||digits(o.accountNo).slice(-4)};
    if(isCash(o))return {t1:o.name,t2:'كاش',l4:''};
    if(EWAL.indexOf(o.kind)>=0)return {t1:o.name,t2:(o.provider&&o.provider!==o.name?o.provider+' · ':'')+o.kind,l4:digits(o.cardNumber).slice(-4)||digits(o.number).slice(-4)};
    var wp=String(o.name||'').split(' - ');
    return {t1:wp[0],t2:(wp[1]?wp.slice(1).join(' - ')+' · ':'')+(o.kind||o.provider||''),l4:digits(o.cardNumber).slice(-4)};
  }
  function tdir(x){return /[\u0600-\u06FF]/.test(String(x||''))?'rtl':'ltr'}
  function mFace(coll,o,opt){
    opt=opt||{}; var i=S[coll].indexOf(o), b=hBal(coll,o), cr=coll==='cards', cur=hCur(coll,o), sh=hShort(coll,o), neg=b<0;
    var lab=cr?(neg?'أوفر ليمت':'المتاح'):'الرصيد', val=cr?Math.abs(b):b;
    var bv=fmt(val)+' <small>'+(cur==='EGP'?'ج':esc(cur))+'</small>';
    return '<button type="button" class="mface'+(neg&&cr?' neg':'')+(opt.sel?' sel':'')+(opt.big?' big':'')+'" style="'+faceBg(o,i+(coll==='cards'?0:coll==='accounts'?3:5))+'"'+
      (opt.act?' data-act="'+opt.act+'"':'')+(opt.attrs||'')+(opt.dis?' disabled':'')+' aria-pressed="'+(opt.sel?'true':'false')+'" aria-label="'+esc(hName(coll,o))+' — '+lab+' '+fmt(val)+'">'+
      '<div class="top"><div style="min-width:0;flex:1"><div class="t1" dir="'+tdir(sh.t1)+'">'+esc(sh.t1)+'</div>'+(sh.t2?'<div class="t2" dir="'+tdir(sh.t2)+'">'+esc(sh.t2)+'</div>':'')+'</div><div class="mchip"></div></div>'+
      '<div class="l4"><span>'+(opt.warn?'<span class="warn">'+opt.warn+'</span>':'')+'</span><span class="pan4">'+(sh.l4?'•••• '+esc(sh.l4):'')+'</span></div>'+
      '<div><div class="bl"><span>'+lab+'</span>'+(opt.foot?'<span>'+opt.foot+'</span>':'')+'</div><div class="bv">'+bv+'</div></div></button>';
  }
  function isCash(o){return o.kind==='كاش'}
  var EWAL=['محفظة موبايل','محفظة بنكية'];
  function hGroups(){var W=S.wallets;return [{l:'كروت المشتريات',c:'cards',a:S.cards},{l:'كروت الحسابات',c:'accounts',a:S.accounts},{l:'الكاش',c:'wallets',a:W.filter(isCash)},
    {l:'المحافظ الإلكترونية (خطوط وبنوك)',c:'wallets',a:W.filter(function(o){return EWAL.indexOf(o.kind)>=0})},{l:'الكروت المدفوعة مسبقًا',c:'wallets',a:W.filter(function(o){return o.kind==='كارت مدفوع مسبقًا'})},
    {l:'أرصدة تانية',c:'wallets',a:W.filter(function(o){return !isCash(o)&&EWAL.indexOf(o.kind)<0&&o.kind!=='كارت مدفوع مسبقًا'})}]}
  function mPick(field,title,sel,ext,dis,multi){
    var any=multi?sel.length>0:!!sel;
    function isSel(k){return multi?sel.indexOf(k)>=0:k===sel}
    function grp(label,coll,arr){if(!arr.length)return '';
      return '<div class="pk-g">'+label+'</div><div class="mcards'+(any?' has-sel':'')+'">'+arr.map(function(o){var k=hKey(coll,o);
        return mFace(coll,o,{act:multi?'mv-tog':'mv-pick',attrs:' data-f="'+field+'" data-k="'+esc(k)+'"',sel:isSel(k),dis:k===dis})}).join('')+'</div>'}
    var h='<div class="pick"><div class="pk-h">'+title+'</div>';
    if(ext)h+='<div class="mcards'+(sel?' has-sel':'')+'"><button type="button" class="mface ext'+(sel==='ext'?' sel':'')+'" data-act="mv-pick" data-f="'+field+'" data-k="ext" aria-pressed="'+(sel==='ext')+'">'+
      '<div class="top"><div><div class="t1">من بره</div><div class="t2">مرتب، شغل خارجي، أي مصدر</div></div></div><div></div><div class="bv">'+ic('plus',22)+'</div></button></div>';
    return h+hGroups().map(function(g){return grp(g.l,g.c,g.a)}).join('')+'</div>';
  }
  function hOpts(sel,ext){
    function grp(label,coll,arr){if(!arr.length)return '';
      return '<optgroup label="'+label+'">'+arr.map(function(o){var k=hKey(coll,o),b=hBal(coll,o),cur=hCur(coll,o);
        return '<option value="'+esc(k)+'"'+(k===sel?' selected':'')+'>'+esc(hName(coll,o))+' — '+(coll==='cards'?(b<0?'أوفر ليمت '+fmt(-b):'متاح '+fmt(b)):fmt(b)+(cur==='EGP'?'':' '+cur))+'</option>'}).join('')+'</optgroup>'}
    return (sel?'':'<option value="" selected disabled>اختار…</option>')+(ext?'<option value="ext"'+(sel==='ext'?' selected':'')+'>'+ext+'</option>':'')+
      grp('كروت المشتريات','cards',S.cards)+grp('كروت الحسابات','accounts',S.accounts)+grp('المحافظ والكروت المدفوعة','wallets',S.wallets);
  }
  function openMove(t,preset){
    var v={from:'',to:'',amt:'',fee:'',got:'',kind:MV_KINDS[0],note:'',date:iso(today()),af:'',afu:'',at:'',atu:''};
    if(t==='add'){v.from='ext';t='xfer'}
    if(preset)for(var k in preset)v[k]=preset[k];
    v.srcs=t==='spend'&&v.from?[v.from]:[];v.sp={};
    sheet={mode:'move',t:t,v:v,back:sheet&&sheet.mode!=='move'&&sheet.mode!=='mvdone'?sheet:null};renderSheet();scrollSel();
  }
  function scrollSel(){setTimeout(function(){[].forEach.call(document.querySelectorAll('.mcards .mface.sel'),function(el){var sc=el.parentNode;if(sc&&sc.scrollWidth>sc.clientWidth){var r1=el.getBoundingClientRect(),r2=sc.getBoundingClientRect();sc.scrollLeft+=(r1.left+r1.width/2)-(r2.left+r2.width/2)}})},40)}
  var MV_IDS=['from','to','amt','fee','got','kind','note','date','af','afu','at','atu'];
  function grabMove(){if(!sheet||sheet.mode!=='move')return;MV_IDS.forEach(function(k){var e=document.getElementById('mv-'+k);if(e)sheet.v[k]=e.value});
    (sheet.v.srcs||[]).forEach(function(k,i){var s=spRow(k);[['a','sa'],['f','sf'],['af','saf'],['afu','safu']].forEach(function(q){var e=document.getElementById('mv-'+q[1]+'-'+i);if(e)s[q[0]]=e.value})})}
  /* ---- spend split across several sources ---- */
  function spRow(k){var v=sheet.v;v.sp=v.sp||{};return v.sp[k]=v.sp[k]||{a:'',f:'',af:'',afu:''}}
  function spendParts(){
    var v=sheet.v, rows=(v.srcs||[]).map(function(k){var h=hGet(k),s=spRow(k);return h?{k:k,h:h,s:s,a:s.a===''?null:n(s.a),f:n(s.f)}:null}).filter(Boolean);
    var total=v.amt===''?null:n(v.amt), given=sum(rows.filter(function(r0){return r0.a!=null}),function(r0){return r0.a}), empty=rows.filter(function(r0){return r0.a==null});
    if(total!=null&&empty.length===1){empty[0].a=Math.max(Math.round((total-given)*100)/100,0);empty[0].auto=true}
    var alloc=sum(rows,function(r0){return r0.a||0});
    return {rows:rows,total:total==null?alloc:total,alloc:alloc,left:total==null?0:Math.round((total-alloc)*100)/100,fees:sum(rows,function(r0){return r0.f})};
  }
  function spendPreview(){
    var p=spendParts(); if(!p.rows.length)return '<span class="fine">اختار كارت أو أكتر واكتب المبلغ وهقولك الرصيد بعد العملية.</span>';
    var h=p.rows.map(function(x){var o=x.h.o,c=x.h.coll,b=hBal(c,o),d=-((x.a||0)+x.f);
      return r(esc(hName(c,o))+' <span class="fine">('+fmt(x.a||0)+(x.f?' + رسوم '+fmt(x.f):'')+')</span>',o.balSync?hAmt(c,o,b)+' ← <b>'+(c==='cards'&&b+d<0?'<span style="color:var(--bad)">أوفر ليمت '+money(-(b+d))+'</span>':hAmt(c,o,b+d))+'</b>':'<span class="fine">هيتسجل اللي هتكتبه</span>')}).join('');
    if(p.rows.length>1||p.left)h+=r('<b>الإجمالي</b>',money(p.alloc)+(p.left?' <span style="color:var(--bad)">· فاضل '+fmt(p.left)+' من '+fmt(p.total)+'</span>':''));
    return h;
  }
  function spendHtml(){
    var v=sheet.v, p=spendParts(), multi=p.rows.length>1, h='';
    h+=mPick('src','هتصرف من * <span class="fine">(دوس على كارت أو أكتر لو هتجمّع المبلغ من كذا مصدر)</span>',v.srcs||[],0,null,1);
    h+='<div class="fgroup"><div class="fields">'+
      '<label for="mv-amt">'+(multi?'المبلغ الكلي':'المبلغ *')+'<input id="mv-amt" class="ltr" type="number" inputmode="decimal" min="0" step="any" value="'+esc(v.amt)+'"'+(multi?' placeholder="فاضي = مجموع المصادر"':'')+'></label>'+
      '<label for="mv-kind">التصنيف<select id="mv-kind">'+MV_KINDS.map(function(k){return '<option'+(k===v.kind?' selected':'')+'>'+esc(k)+'</option>'}).join('')+'</select></label>'+
      '<label class="full" for="mv-note">على إيه<input id="mv-note" type="text" value="'+esc(v.note)+'" placeholder="سوبرماركت، بنزين، فاتورة…"></label>'+
      '<label for="mv-date">التاريخ<input id="mv-date" class="ltr" type="date" value="'+esc(v.date)+'"></label></div></div>';
    p.rows.forEach(function(x,i){var o=x.h.o,c=x.h.coll,cr=c==='cards',s=x.s;
      h+='<div class="whatif"><div class="r"><span class="k"><b style="color:var(--ink)">'+(multi?'من ':'')+esc(hName(c,o))+'</b></span><span>'+hBalTxt(c,o)+'</span></div><div class="fields">'+
        (multi?'<label for="mv-sa-'+i+'">المبلغ من هنا'+'<input id="mv-sa-'+i+'" class="ltr" type="number" inputmode="decimal" min="0" step="any" value="'+esc(s.a)+'"'+(x.auto?' placeholder="الباقي: '+fmt(x.a)+'"':'')+'></label>':'')+
        '<label for="mv-sf-'+i+'">رسوم / عمولة (لو فيه)<input id="mv-sf-'+i+'" class="ltr" type="number" inputmode="decimal" min="0" step="any" value="'+esc(s.f)+'" placeholder="0"></label>'+
        (o.balSync?'':'<label for="mv-saf-'+i+'">'+(cr?'المتاح بعد العملية':'الرصيد بعد العملية')+' (أول مرة بس)<input id="mv-saf-'+i+'" class="ltr" type="number" inputmode="decimal" step="any" value="'+esc(s.af)+'" placeholder="حسابي: '+fmt(hBal(c,o))+'"></label>'+
          (cr?'<label for="mv-safu-'+i+'">أو المديونية بعد العملية<input id="mv-safu-'+i+'" class="ltr" type="number" inputmode="decimal" step="any" value="'+esc(s.afu)+'"></label>':''))+
        '</div>'+(o.balSync?'':'<p class="note" style="margin:0">أول مرة تستخدمه هنا: اكتب رصيده بعد العملية زي ما في رسالة البنك، وبعد كده هحسبه لوحدي.</p>')+'</div>'});
    if(multi)h+='<p class="note">اكتب المبلغ اللي هيتدفع من كل مصدر. لو كتبت المبلغ الكلي وسبت مصدر واحد فاضي، هيتحسب عليه الباقي لوحده.</p>';
    h+='<div class="rows"><h3>الرصيد بعد العملية</h3><div id="mv-prev">'+spendPreview()+'</div></div>';
    return h+'<div class="actions"><button class="btn primary" data-act="mv-save">سجّل</button><button class="btn" data-act="mv-cancel">إلغاء</button></div>';
  }
  function spendSave(){
    grabMove(); var v=sheet.v, p=spendParts();
    if(!p.rows.length){toast('اختار هتصرف منين');return}
    if(!(p.alloc>0)){toast('اكتب المبلغ');return}
    if(p.rows.some(function(x){return !(x.a>0)})){toast('اكتب المبلغ من كل مصدر');return}
    if(Math.abs(p.left)>=0.01){toast('مجموع المصادر '+fmt(p.alloc)+' مش مساوي للمبلغ الكلي '+fmt(p.total));return}
    if(!parseD(v.date)){toast('اكتب التاريخ');return}
    var afs=p.rows.map(function(x){var o=x.h.o,s=x.s;if(o.balSync)return null;
      if(s.af!==''&&isFinite(Number(s.af)))return {bal:Number(s.af)};
      if(x.h.coll==='cards'&&s.afu!==''&&isFinite(Number(s.afu)))return {bal:n(o.limit)-Number(s.afu)};return false});
    if(afs.indexOf(false)>=0){toast('اكتب الرصيد بعد العملية للكروت اللي أول مرة');return}
    var grp=uid(), lines=[], seq=Date.now(), note=v.note.trim(), multi=p.rows.length>1, base=['مشتريات','مصروف','سحب كاش'];
    var kind=v.kind==='مشتريات'||v.kind==='سحب كاش'?v.kind:'مصروف', label=note||v.kind;
    mutate(function(){
      p.rows.forEach(function(x,i){var h=x.h,o=h.o,c=h.coll,rt=hRate(c,o),b0=hBal(c,o),af=afs[i],d=-(x.a+x.f);
        hSet(c,o,af?af.bal:b0+d); if(af)o.balSync=iso(today());
        lines.push({key:hKey(c,o),before:b0,after:hBal(c,o),first:!!af});
        var cur=hCur(c,o)!=='EGP', eg=function(a){return cur&&rt?a*rt:a}, cn=function(a){return cur?' ('+fmt(a)+' '+hCur(c,o)+')':''};
        var m=txById(logTx(kind,c,o,eg(x.a),label+(multi?' · جزء من '+fmt(p.total):'')+cn(x.a),v.date));
        m.cat=v.kind;m.grp=grp;m.mv='spend';m.seq=seq+i*2;m.eff=[{coll:c,id:o.id,delta:af?Math.round((af.bal-b0)*100)/100:d,paid:0}];if(x.f)m.fee=x.f;if(multi){m.split=p.rows.length;m.splitTotal=p.total}
        if(x.f){var ft=txById(logTx('فوايد ورسوم',c,o,eg(x.f),'رسوم '+label+cn(x.f),v.date));ft.grp=grp;ft.seq=seq+i*2+1}
      });
    });
    sheet={mode:'mvdone',t:'spend',lines:lines,grp:grp};renderSheet();
    toast(multi?'اتسجلت العملية من '+p.rows.length+' مصادر':'اتسجلت العملية');
  }

  function moveParts(){
    var v=sheet.v, sp=sheet.t==='spend', F=v.from==='ext'?null:hGet(v.from), T=sp?null:hGet(v.to);
    var amt=n(v.amt), fee=n(v.fee), diff=!!(F&&T&&hCur(F.coll,F.o)!==hCur(T.coll,T.o)), got=diff&&v.got!==''?n(v.got):amt;
    return {sp:sp,ext:v.from==='ext',F:F,T:T,amt:amt,fee:fee,diff:diff,got:got};
  }
  function afterBox(h,pre,label){
    if(!h||h.o.balSync)return '';
    var cr=h.coll==='cards', v=sheet.v;
    return '<div class="whatif"><div class="r"><span class="k"><b style="color:var(--ink)">'+label+': '+esc(hName(h.coll,h.o))+'</b></span></div>'+
      '<p class="note" style="margin:0">أول مرة تستخدمه هنا. اكتب رصيده <b>بعد</b> العملية زي ما في رسالة البنك أو الأبلكيشن، وبعد كده هحسبه لوحدي.</p>'+
      '<div class="fields"><label for="mv-'+pre+'">'+(cr?'المتاح بعد العملية':'الرصيد بعد العملية')+'<input id="mv-'+pre+'" class="ltr" type="number" inputmode="decimal" step="any" value="'+esc(v[pre])+'" placeholder="حسابي: '+fmt(hBal(h.coll,h.o))+'"></label>'+
      (cr?'<label for="mv-'+pre+'u">أو المديونية (المستخدم) بعد العملية<input id="mv-'+pre+'u" class="ltr" type="number" inputmode="decimal" step="any" value="'+esc(v[pre+'u'])+'"></label>':'')+'</div></div>';
  }
  function movePreview(){
    if(sheet.t==='spend')return spendPreview();
    var p=moveParts(), L=[];
    function line(h,delta,label){if(!h)return;var b=hBal(h.coll,h.o);
      L.push(r(label+' '+esc(hName(h.coll,h.o)),h.o.balSync?hAmt(h.coll,h.o,b)+' ← <b>'+(h.coll==='cards'&&b+delta<0?'<span style="color:var(--bad)">أوفر ليمت '+money(-(b+delta))+'</span>':hAmt(h.coll,h.o,b+delta))+'</b>':'<span class="fine">هيتسجل اللي هتكتبه</span>'))}
    if(p.F)line(p.F,-(p.amt+p.fee),'رصيد');
    if(p.T)line(p.T,p.got,'رصيد');
    if(!L.length)return '<span class="fine">اختار الكارت واكتب المبلغ وهقولك الرصيد بعد العملية.</span>';
    return (p.fee?r('هيتخصم من '+esc(hName(p.F.coll,p.F.o)),hAmt(p.F.coll,p.F.o,p.amt+p.fee)+' <span class="fine">(المبلغ + العمولة '+fmt(p.fee)+')</span>'):'')+L.join('');
  }
  function moveHtml(){
    if(sheet.t==='spend')return spendHtml();
    var v=sheet.v, p=moveParts(), sp=p.sp, h='';
    function fld(id,label,ctl,full){return '<label'+(full?' class="full"':'')+' for="mv-'+id+'">'+label+ctl+'</label>'}
    function num(id,ph){return '<input id="mv-'+id+'" class="ltr" type="number" inputmode="decimal" min="0" step="any" value="'+esc(v[id])+'"'+(ph?' placeholder="'+ph+'"':'')+'>'}
    if(sp)h+=mPick('from','هتصرف من * <span class="fine">(دوس على الكارت)</span>',v.from);
    else h+=mPick('from','من *',v.from,1,v.to)+mPick('to','إلى *',v.to,0,v.from);
    h+='<div class="fgroup"><div class="fields">';
    if(sp){
      h+=
        fld('amt','المبلغ *',num('amt'))+fld('fee','رسوم / عمولة (لو فيه)',num('fee','0'))+
        fld('note','على إيه','<input id="mv-note" type="text" value="'+esc(v.note)+'" placeholder="سوبرماركت، بنزين، فاتورة…">',1)+
        fld('kind','النوع','<select id="mv-kind">'+MV_KINDS.map(function(k){return '<option'+(k===v.kind?' selected':'')+'>'+esc(k)+'</option>'}).join('')+'</select>')+
        fld('date','التاريخ','<input id="mv-date" class="ltr" type="date" value="'+esc(v.date)+'">');
    }else{
      h+=
        fld('amt',p.ext?'المبلغ *':'مبلغ التحويل *',num('amt'))+(p.ext?'':fld('fee','العمولة',num('fee','0')))+
        (p.diff?fld('got','المبلغ اللي وصل ('+esc(hCur(p.T.coll,p.T.o))+')',num('got',fmt(p.amt)),1):'')+
        fld('note',p.ext?'منين؟':'ملاحظة','<input id="mv-note" type="text" value="'+esc(v.note)+'" placeholder="'+(p.ext?'شغل خارجي، مرتب، هدية…':'شحن محفظة، سداد كارت…')+'">',1)+
        fld('date','التاريخ','<input id="mv-date" class="ltr" type="date" value="'+esc(v.date)+'">');
    }
    h+='</div></div>';
    h+=afterBox(p.F,'af',sp?'هتصرف من':'هتحوّل من')+afterBox(p.T,'at','هتحوّل لـ');
    if(p.T&&p.T.coll==='cards'&&!p.ext)h+='<p class="note">التحويل لكارت مشتريات بيتحسب سداد على الكشف كمان (بيقلل الباقي من الحد الأدنى والمديونية).</p>';
    if(p.F&&p.F.coll==='cards'&&!sp)h+='<p class="note">التحويل من كارت مشتريات بيزوّد المديونية بالمبلغ والعمولة.</p>';
    h+='<div class="rows"><h3>الرصيد بعد العملية</h3><div id="mv-prev">'+movePreview()+'</div></div>';
    return h+'<div class="actions"><button class="btn primary" data-act="mv-save">سجّل</button><button class="btn" data-act="mv-cancel">إلغاء</button></div>';
  }
  function moveSave(){
    if(sheet.t==='spend')return spendSave();
    grabMove(); var v=sheet.v, p=moveParts(), t=sheet.t;
    if(p.sp&&!p.F){toast('اختار هتصرف منين');return}
    if(!p.sp&&!p.ext&&!p.F){toast('اختار هتحوّل منين');return}
    if(!p.sp&&!p.T){toast('اختار هتحوّل لفين');return}
    if(p.F&&p.T&&p.F.o===p.T.o){toast('اختار كارتين مختلفين');return}
    if(!(p.amt>0)){toast('اكتب المبلغ');return}
    if(!parseD(v.date)){toast('اكتب التاريخ');return}
    function aft(h,pre){if(!h||h.o.balSync)return null;var a=v[pre],u=v[pre+'u'];
      if(a!==''&&a!=null&&isFinite(Number(a)))return {bal:Number(a)};
      if(h.coll==='cards'&&u!==''&&u!=null&&isFinite(Number(u)))return {bal:n(h.o.limit)-Number(u)};
      return false}
    var aF=aft(p.F,'af'), aT=aft(p.T,'at');
    if(aF===false||aT===false){toast('اكتب الرصيد بعد العملية (أول مرة بس)');return}
    var grp=uid(), lines=[], effs=[], seq=Date.now();
    var rF=p.F?hRate(p.F.coll,p.F.o):1, rT=p.T?hRate(p.T.coll,p.T.o):1;
    function egp(h,rt,a){return h&&hCur(h.coll,h.o)!=='EGP'&&rt?a*rt:a}
    function curNote(h,a){return h&&hCur(h.coll,h.o)!=='EGP'?' ('+fmt(a)+' '+hCur(h.coll,h.o)+')':''}
    mutate(function(){
      function apply(h,delta,af,paid){
        var b0=hBal(h.coll,h.o);
        hSet(h.coll,h.o,af?af.bal:b0+delta);
        if(af)h.o.balSync=iso(today());
        if(paid){h.o.paid=Math.round((n(h.o.paid)+paid)*100)/100}
        effs.push({coll:h.coll,id:h.o.id,delta:af?Math.round((af.bal-b0)*100)/100:delta,paid:paid||0});
        lines.push({key:hKey(h.coll,h.o),before:b0,after:hBal(h.coll,h.o),first:!!af});
      }
      var main, note=v.note.trim();
      if(p.F)apply(p.F,-(p.amt+p.fee),aF);
      if(p.T)apply(p.T,p.got,aT,p.T.coll==='cards'&&!p.ext?egp(p.T,rT,p.got):0);
      if(p.sp){main=logTx(v.kind==='سحب كاش'?'سحب كاش':v.kind==='مصروف'||v.kind==='مشتريات'?v.kind:'مصروف',p.F.coll,p.F.o,egp(p.F,rF,p.amt),(note?note+(['مشتريات','مصروف','سحب كاش'].indexOf(v.kind)<0?' · '+v.kind:''):v.kind)+curNote(p.F,p.amt),v.date)}
      else if(p.ext){main=logTx('دخل',p.T.coll,p.T.o,egp(p.T,rT,p.amt),(note||'إضافة رصيد')+curNote(p.T,p.amt),v.date)}
      else{var toCard=p.T.coll==='cards';
        main=logTx(toCard?'دفعة':'تحويل',p.F.coll,p.F.o,egp(p.F,rF,p.amt),'تحويل لـ '+hName(p.T.coll,p.T.o)+(note?' · '+note:'')+curNote(p.F,p.amt),v.date);
        var mt=txById(main);mt.toColl=p.T.coll;mt.toRef=p.T.o.id;mt.toName=hName(p.T.coll,p.T.o);
        if(toCard){mt.name=hName(p.T.coll,p.T.o);mt.via=hName(p.F.coll,p.F.o)}}
      var m=txById(main);m.grp=grp;m.mv=p.sp?'spend':p.ext?'add':'xfer';m.eff=effs;m.seq=seq;if(p.fee)m.fee=p.fee;
      if(p.fee){var ft=txById(logTx('فوايد ورسوم',p.F.coll,p.F.o,egp(p.F,rF,p.fee),(p.sp?'رسوم ':'عمولة تحويل ')+(p.sp?(note||v.kind):'لـ '+hName(p.T.coll,p.T.o))+curNote(p.F,p.fee),v.date));ft.grp=grp;ft.seq=seq+1}
    });
    sheet={mode:'mvdone',t:t,ext:p.ext,lines:lines,grp:grp};renderSheet();
    toast('اتسجلت العملية');
  }
  function txById(id){return S.reports.filter(function(t){return t.id===id})[0]}
  function mvUndo(grp){
    S.reports.filter(function(t){return t.grp===grp}).forEach(function(t){(t.eff||[]).forEach(function(e){var o=find(e.coll,e.id);if(!o)return;
      hSet(e.coll,o,hBal(e.coll,o)-n(e.delta));if(e.paid)o.paid=Math.round((n(o.paid)-n(e.paid))*100)/100})});
    S.reports=S.reports.filter(function(t){return t.grp!==grp});
  }
  function mvDoneHtml(){
    var s=sheet, h='<div class="list">';
    s.lines.forEach(function(L){var hd=hGet(L.key);if(!hd)return;var cr=hd.coll==='cards',o=hd.o;
      h+='<div class="item" style="cursor:default"><div class="ava">'+ic(hd.coll,18)+'</div><div class="main"><div class="t">'+esc(hName(hd.coll,o))+'</div>'+
        '<div class="s">'+(L.first?'الرصيد زي ما كتبته':'كان '+(cr?(L.before<0?'أوفر ليمت '+fmt(-L.before):'متاح '+fmt(L.before)):fmt(L.before)))+(cr?' · المديونية دلوقتي '+fmt(hUsed(o)):'')+'</div></div>'+
        '<div class="end"><div class="v">'+hBalTxt(hd.coll,o)+'</div><button class="btn sm" data-act="hb-edit" data-k="'+esc(L.key)+'">مش مظبوط؟ عدّل</button></div></div>'});
    h+='</div><p class="note">ده الرصيد بعد العملية حسب حسابي. لو مختلف عن رسالة البنك دوس "عدّل" واكتب الصح.</p>';
    return h+'<div class="actions"><button class="btn primary" data-act="mv-again">عملية تانية</button><button class="btn" data-act="close-sheet-btn">تمام</button></div>';
  }
  function hbalHtml(){
    var hd=hGet(sheet.key); if(!hd)return '<div class="empty">مش لاقيه</div>';
    var o=hd.o, cr=hd.coll==='cards', b=hBal(hd.coll,o), k=sheet.key;
    var h=mFace(hd.coll,o,{big:1,foot:cr?'المديونية '+fmt(hUsed(o)):'',warn:o.balSync?'':'● لسه ما أكدتش رصيده'})+(hCur(hd.coll,o)!=='EGP'&&n(o.egp)?'<div class="tiles">'+tile('بالجنيه',money(o.egp))+'</div>':'');
    h+='<p class="note">'+(cr?'الحد الائتماني '+money(o.limit)+' · ':'')+hSyncTxt(o)+(o.balanceAt?' · آخر حركة '+dShort(o.balanceAt):'')+'</p>';
    h+='<div class="actions"><button class="btn primary sm" data-act="mv-new" data-t="spend" data-from="'+esc(k)+'">اصرف منه</button><button class="btn sm" data-act="mv-new" data-t="xfer" data-from="'+esc(k)+'">حوّل منه</button><button class="btn sm" data-act="mv-new" data-t="xfer" data-to="'+esc(k)+'">حوّل له / اشحنه</button>'+
      '<button class="btn sm" data-act="mv-new" data-t="add" data-to="'+esc(k)+'">+ فلوس من بره</button></div>';
    h+='<div class="whatif"><div class="r"><span class="k"><b style="color:var(--ink)">الرصيد مش مظبوط؟</b></span></div>'+
      '<div class="fields"><label for="hb-v">'+(cr?'المتاح دلوقتي زي ما في البنك':'الرصيد الصح دلوقتي')+'<input id="hb-v" class="ltr" type="number" inputmode="decimal" step="any" placeholder="'+fmt(b)+'"></label>'+
      (cr?'<label for="hb-u">أو المديونية (المستخدم) دلوقتي<input id="hb-u" class="ltr" type="number" inputmode="decimal" step="any" placeholder="'+fmt(hUsed(o))+'"></label>':'')+'</div>'+
      '<div class="actions"><button class="btn sm primary" data-act="hb-save">احفظ الرصيد</button></div>'+
      '<p class="note" style="margin:0">الفرق بيتسجل في التقارير كـ "تسوية رصيد" من غير ما يتحسب مصروف أو دخل.</p></div>';
    var mv=hMoves(hd.coll,o.id).slice(0,12);
    if(mv.length)h+='<div class="rows"><h3>آخر الحركات</h3>'+mv.map(function(t){var sg=hMoveSign(t,hd.coll,o.id), amt=t.kind==='تسوية رصيد'?Math.abs(n(t.delta)):t.amount;
      return '<button class="r tap" data-act="open" data-coll="reports" data-id="'+esc(t.id)+'"><span class="k">'+dShort(t.date)+' · '+esc(t.kind)+(t.notes?' · '+esc(t.notes):'')+'</span><span class="v" style="color:var('+(sg<0?'--bad':'--ok')+')">'+(sg<0?'− ':'+ ')+money(amt)+'</span></button>'}).join('')+'</div>';
    h+='<div class="actions"><button class="btn sm" data-act="open" data-coll="'+esc(hd.coll)+'" data-id="'+esc(o.id)+'">افتح '+(cr?'الكارت':hd.coll==='accounts'?'الحساب':'المحفظة')+'</button></div>';
    return h;
  }
  function hbSave(){
    var hd=hGet(sheet.key); if(!hd)return; var o=hd.o, cr=hd.coll==='cards';
    var v=document.getElementById('hb-v').value, u=cr?document.getElementById('hb-u').value:'', nb;
    if(v!==''&&isFinite(Number(v)))nb=Number(v); else if(u!==''&&isFinite(Number(u)))nb=n(o.limit)-Number(u); else {toast('اكتب الرصيد');return}
    var b0=hBal(hd.coll,o), d=Math.round((nb-b0)*100)/100;
    mutate(function(){hSet(hd.coll,o,nb);o.balSync=iso(today());
      if(Math.abs(d)>=0.01){var t=txById(logTx('تسوية رصيد',hd.coll,o,Math.abs(d)*(hRate(hd.coll,o)||1),(d>0?'زيادة ':'نقص ')+fmt(Math.abs(d))+' عن حسابي'));t.delta=d;t.seq=Date.now()}});
    if(sheet.back){sheet=sheet.back;renderSheet()}else renderSheet();
    toast('اتعدّل الرصيد: '+(cr?(nb<0?'أوفر ليمت '+fmt(-nb):'متاح '+fmt(nb)):fmt(nb)));
  }
  function screenSpend(){
    var h='<section class="hero"><p class="lead">عايز تعمل إيه؟</p><div class="otiles" style="grid-template-columns:repeat(2,minmax(0,1fr))">'+
      otile('💸','اصرف','data-act="mv-new" data-t="spend"','من كارت أو أكتر',1)+otile('🔁','تحويل بين كروتك','data-act="mv-new" data-t="xfer"','بالعمولة')+
      otile('💰','فلوس من بره','data-act="mv-new" data-t="add"','شغل خارجي أو أي مصدر')+otile('➕','حساب أو محفظة أو كاش','data-act="new-wal-pick"','إضافة جديد')+'</div>'+
      '<p class="note">اختار الكارت أو الحساب أو المحفظة، واكتب المبلغ والعمولة. أول مرة لكل كارت هسألك عن رصيده بعد العملية، وبعد كده هحسبه لوحدي. ولو لقيت الرصيد مش مظبوط دوس عليه وعدّله.</p></section>';
    function grp(title,coll,arr){if(!arr.length)return '';
      return '<section class="sec"><div class="sec-head"><h2>'+title+'</h2><span class="fine">دوس على الكارت تعدّل رصيده</span></div><div class="mgrid">'+arr.map(function(o){
        return mFace(coll,o,{act:'hb-edit',attrs:' data-k="'+esc(hKey(coll,o))+'"',foot:coll==='cards'?'مديونية '+fmt(hUsed(o)):'',warn:o.balSync?'':'● مش متأكد'})}).join('')+'</div></section>'}
    h+=hGroups().map(function(g){return grp(g.l,g.c,g.a)}).join('');
    var ops=S.reports.filter(function(t){return t.mv||t.kind==='تسوية رصيد'}).sort(function(a,b){return String(b.date).localeCompare(String(a.date))||(b.seq||0)-(a.seq||0)}).slice(0,20);
    if(ops.length)h+='<section class="sec"><div class="sec-head"><h2>آخر العمليات</h2><a class="fine" href="#reports">كل التقارير</a></div><div class="list">'+ops.map(function(t){
      var lab=t.mv==='spend'?'صرف':t.mv==='add'?'فلوس من بره':t.mv==='xfer'?'تحويل':'تسوية رصيد', sg=t.mv==='spend'?-1:t.mv==='add'?1:0;
      var who=t.mv==='xfer'?(t.toColl==='cards'?t.via:t.name)+' ← '+(t.toName||''):t.name;
      return '<button class="item" data-act="open" data-coll="reports" data-id="'+esc(t.id)+'"><div class="main"><div class="t">'+esc(who||'')+'</div><div class="s">'+lab+(t.notes?' · '+esc(t.notes):'')+(t.fee?' · عمولة '+fmt(t.fee):'')+' · '+dShort(t.date)+'</div></div>'+
        '<div class="end"><div class="v" style="color:var('+(sg<0?'--bad':sg>0?'--ok':'--ink')+')">'+(sg<0?'− ':sg>0?'+ ':'')+money(t.kind==='تسوية رصيد'?Math.abs(n(t.delta)):t.amount)+'</div></div></button>'}).join('')+'</div></section>';
    return h;
  }

  /* ================= events ================= */
  document.getElementById('menuBtn').innerHTML=ic('menu',22);
  document.getElementById('menuBtn').addEventListener('click',function(){setNav(true)});
  document.getElementById('navScrim').addEventListener('click',function(){setNav(false)});
  document.getElementById('fab').addEventListener('click',function(){
    if(route==='gamiyas'){sheet={mode:'pick'};renderSheet();return}
    if(route==='wallets'){sheet={mode:'pick',k:'wallet'};renderSheet();return}
    if(route==='spend'){sheet=null;openMove('spend');return}
    if(route==='notifs'){ntRun(true);toast('اتبعتت رسالة النهاردة');return}
    if(COLLS[route])openForm(route,null,route==='cards'?{rate:'',feePct:'',paid:0}:route==='reports'?{date:iso(today())}:null)});
  /* re-draw the form when a field that changes which other fields apply (gamiya type) changes */
  document.getElementById('app').addEventListener('input',function(e){
    if(sheet&&sheet.mode==='move'&&/^mv-/.test(e.target.id)){grabMove();var mp=document.getElementById('mv-prev');if(mp)mp.innerHTML=movePreview();return}
    if(e.target.id==='dp-n'&&sheet&&sheet.mode==='detail'){var o=find(sheet.coll,sheet.id);if(!o)return;var rem=calcDebt(o).rem,k=Math.max(1,Math.round(n(e.target.value)||1));
      var pv=document.getElementById('dp-prev');if(pv)pv.textContent=k>1?k+' قسط × '+fmt(Math.floor(rem/k*100)/100)+' كل شهر':'مرة واحدة: '+fmt(rem)}
  });
  document.getElementById('app').addEventListener('change',function(e){
    if(e.target.id==='nt-hour'){S.notifyHour=+e.target.value;save();ntWritePlan();renderMain();toast('الإشعار هيوصل كل يوم الساعة '+e.target.value+':00');return}
    if(e.target.id==='rp-from'||e.target.id==='rp-to'){RP[e.target.id==='rp-from'?'from':'to']=e.target.value;renderMain();return}
    if(sheet&&sheet.mode==='move'&&(e.target.id==='mv-from'||e.target.id==='mv-to')){grabMove();renderSheet();return}
    if(!sheet||sheet.mode!=='form')return;
    if(e.target.id==='pp-bank'||e.target.id==='pp-type'){grabForm();
      if(e.target.id==='pp-bank'){sheet.v.bankId=e.target.value;sheet.v.cardType=''}else sheet.v.cardType=e.target.value;
      applyPreset(sheet,e.target.id==='pp-bank'?'bank':'type');renderSheet();var bk=bankById(sheet.v.bankId);if(bk)toast(sheet.coll==='cards'?'اتملت رسوم '+bk.s+(sheet.v.cardType?' '+sheet.v.cardType:'')+' — راجعها وعدّل لو لازم':'اتملت غرامات قروض '+bk.s);return}
    var fd=(FIELDS[sheet.coll]||[]).filter(function(x){return x.k&&'f-'+x.k===e.target.id})[0]; if(!fd||!fd.refresh)return;
    FIELDS[sheet.coll].forEach(function(x){if(!x.k)return;var el=document.getElementById('f-'+x.k);if(el)sheet.v[x.k]=el.value});
    renderSheet();
  });

  function go(rt){ if(ROUTES.indexOf(rt)<0)rt='home'; route=rt; navOpen=false; sheet=null; confirmDel=null; renderAll(); window.scrollTo(0,0);
    if(rt==='notifs'&&ntUnread())setTimeout(function(){if(route!=='notifs')return;S.notifs.forEach(function(x){x.read=true});save();renderNav()},2500) }
  window.addEventListener('hashchange',function(){go(location.hash.slice(1))});

  document.getElementById('app').addEventListener('click',function(e){
    var nv=e.target.closest('[data-nav]'); if(nv){ /* hash link handles route */ if(location.hash==='#'+nv.getAttribute('data-nav')){e.preventDefault();go(nv.getAttribute('data-nav'))} return }
    var t=e.target.closest('[data-act]'); if(!t)return;
    var act=t.getAttribute('data-act');
    if(settingsAction(act))return;
    if(act==='close-nav'){setNav(false);return}
    if(act==='close-sheet'){ if(e.target===t){sheet=null;confirmDel=null;renderSheet()} return }
    if(act==='close-sheet-btn'){sheet=null;confirmDel=null;renderSheet();return}
    if(act==='open'){var bk=sheet&&sheet.mode==='bd'?{mode:'bd',k:sheet.k,back:sheet.back}:sheet&&sheet.mode==='hbal'?{mode:'hbal',key:sheet.key,back:sheet.back}:sheet&&sheet.mode==='cat'?{mode:'cat',c:sheet.c,col:sheet.col,side:sheet.side}:null;sheet={mode:'detail',coll:t.getAttribute('data-coll'),id:t.getAttribute('data-id'),back:bk};confirmDel=null;renderSheet();return}
    if(act==='bd'){var bk2=sheet&&sheet.mode==='bd'?{mode:'bd',k:sheet.k,back:sheet.back}:null;sheet={mode:'bd',k:t.getAttribute('data-k'),back:bk2};renderSheet();var sb=document.querySelector('.sheet-scrim');if(sb)sb.scrollTop=0;return}
    if(act==='sheet-back'){sheet=sheet.back||null;confirmDel=null;renderSheet();return}
    if(act==='exp-toggle'||act==='month-toggle'){var mc=act==='exp-toggle'?'expenses':(sheet&&sheet.coll), ex=find(mc,t.getAttribute('data-id'));if(!ex)return;
      var mo=calcMonthly(ex[DAYF[mc]],ex.paidMonth);
      if(!mo.key){toast('حدد يوم الدفع الأول من "تعديل"');return}
      var cinfo=cycInfo(mc,ex);
      mutate(function(){
        if(ex.paidMonth===mo.key){ex.paidMonth='';unlogTx(ex.paidTx);ex.paidTx=''}
        else{ex.paidMonth=mo.key;ex.paidTx=cinfo&&cinfo.rem>0?logTx('دفعة',mc,ex,cinfo.rem,'اتعلّم إنه اتدفع'):'';ex.cyc=null}});toast(ex.paidMonth?'اتعلّم إن '+ex.name+' اتدفع الشهر ده':'اتلغت العلامة');return}
    if(act==='stmt-open'){var sc0=find('cards',t.getAttribute('data-id'));if(sc0){sheet=null;openStmtForm(sc0)}return}
    if(act==='loan-upd-open'){var ln0=find('loans',t.getAttribute('data-id'));if(ln0){sheet=null;openLoanUpd(ln0)}return}
    if(act==='rp'){RP.p=t.getAttribute('data-p');RP.off=0;renderMain();return}
    if(act==='rp-off'){RP.off+=+t.getAttribute('data-d');renderMain();return}
    if(act==='nt-enable'){ntEnable();return}
    if(act==='nt-now'){ntRun(true);toast('اتبعتت رسالة النهاردة');return}
    if(act==='nt-read'){S.notifs.forEach(function(x){x.read=true});save();renderAll();return}
    if(act==='rp-side'){RP.side=t.getAttribute('data-s');renderMain();return}
    if(act==='rp-catc'){sheet={mode:'cat',c:t.getAttribute('data-c'),col:t.getAttribute('data-col'),side:RP.side||'out'};renderSheet();return}
    if(act==='rp-cat'){RP.cat=t.getAttribute('data-c')===RP.cat?'':t.getAttribute('data-c');renderMain();return}
    if(act==='new-wal-pick'){sheet={mode:'pick',k:'wallet'};renderSheet();return}
    if(act==='new-wal'&&t.getAttribute('data-kind')==='حساب بنكي'){openForm('accounts',null,{currency:'EGP',balance:''},'حساب بنكي جديد');return}
    if(act==='new-wal'){var wk=t.getAttribute('data-kind');openForm('wallets',null,{kind:wk,currency:'EGP',balance:''},wk==='كاش'?'كاش جديد':wk==='محفظة موبايل'?'محفظة موبايل جديدة':wk==='محفظة بنكية'?'محفظة بنكية جديدة':'رصيد جديد',
      wk==='محفظة موبايل'?'اكتب اسم المحفظة (مثلًا: فودافون كاش خطي) والجهة ورقم الخط والرصيد.':wk==='كاش'?'مثلًا: كاش معايا، كاش في البيت.':'');return}
    if(act==='new-gam'){var gk=t.getAttribute('data-kind');openForm('gamiyas',null,{kind:gk,feeMode:'على أول قسط'},gk==='Money Fellows'?'جمعية Money Fellows جديدة':'جمعية أفراد جديدة');return}
    if(act==='mv-new'){var mt=t.getAttribute('data-t'),pr={};if(t.getAttribute('data-from'))pr.from=t.getAttribute('data-from');if(t.getAttribute('data-to'))pr.to=t.getAttribute('data-to');openMove(mt,pr);return}
    if(act==='mv-pick'){if(!sheet||sheet.mode!=='move')return;grabMove();sheet.v[t.getAttribute('data-f')]=t.getAttribute('data-k');renderSheet();
      scrollSel();return}
    if(act==='mv-tog'){if(!sheet||sheet.mode!=='move')return;grabMove();var tk=t.getAttribute('data-k'),L0=sheet.v.srcs=sheet.v.srcs||[],ix=L0.indexOf(tk);if(ix>=0)L0.splice(ix,1);else L0.push(tk);renderSheet();return}
    if(act==='mv-save'){moveSave();return}
    if(act==='mv-cancel'){sheet=sheet&&sheet.back||null;renderSheet();return}
    if(act==='mv-again'){var ag=sheet.t==='spend'?'spend':sheet.ext?'add':'xfer';sheet=null;openMove(ag);return}
    if(act==='hb-edit'){sheet={mode:'hbal',key:t.getAttribute('data-k'),back:sheet&&sheet.mode!=='hbal'?sheet:null};renderSheet();return}
    if(act==='hb-save'){hbSave();return}
    if(act==='save-form'){saveForm();return}
    if(act==='wz-next'||act==='wz-save'){grabForm();var wst=wzSteps(sheet)[sheet.step],werr=wzCheck(sheet,wst);
      if(werr){toast(werr);renderSheet();setTimeout(function(){var fe=document.getElementById('f-'+sheet.errK);if(fe){fe.focus();fe.scrollIntoView({block:'center'})}},30);return}
      if(act==='wz-save'){saveForm();return}
      sheet.step++;renderSheet();setTimeout(function(){var fi=document.querySelector('.sheet-body .fields input:not([type=date]),.sheet-body .fields select');if(fi&&fi.id!=='pp-bank')fi.focus({preventScroll:true})},30);return}
    if(act==='wz-back'){grabForm();sheet.errK=null;sheet.step=Math.max(0,sheet.step-1);renderSheet();return}
    if(act==='sug-man'){grabForm();sheet.man=sheet.man||{};sheet.man[t.getAttribute('data-k')]=true;renderSheet();var sk=document.getElementById('f-'+t.getAttribute('data-k'));if(sk){sk.focus();if(sk.select)try{sk.select()}catch(_){}}return}
    if(act==='sug-use'){grabForm();var sgg=sugOf(sheet),skk=t.getAttribute('data-k');if(sgg){sheet.v[skk]=sgg[skk];if(sheet.man)sheet.man[skk]=false}renderSheet();return}
    if(act==='cancel-form'){sheet=sheet.back||null;renderSheet();return}
    if(!sheet)return;
    var coll=sheet.coll, o=find(coll,sheet.id); if(!o)return;
    if(act==='edit'){openForm(coll,o.id);return}
    if(act==='del'){var key=coll+o.id;
      if(confirmDel===key){confirmDel=null;sheet=null;mutate(function(){if(coll==='reports'&&o.grp)mvUndo(o.grp);else S[coll]=S[coll].filter(function(x){return x.id!==o.id})});renderSheet();toast('اتحذف')}
      else{confirmDel=key;renderSheet();setTimeout(function(){if(confirmDel===key){confirmDel=null;if(sheet&&sheet.mode==='detail')renderSheet()}},3500)}
      return}
    if(act==='reveal'){revealed[o.id]=!revealed[o.id];renderSheet();return}
    function cardPay(amt){ if(!(amt>0)){toast('اكتب مبلغ أكبر من صفر');return} var pa=document.getElementById('pay-amt');if(pa)pa.value='';
      mutate(function(){if(o.balance!==''&&o.balance!=null)hSet('cards',o,hBal('cards',o)+amt);o.paid=Math.round((n(o.paid)+amt)*100)/100;logTx('دفعة','cards',o,amt,'سداد كارت')}); var cx=calcCard(o);
      toast('اتسجلت '+fmt(amt)+' ج · الباقي من الحد الأدنى '+fmt(cx.remMin)+' · من الكشف '+fmt(cx.rem)) }
    if(act==='cyc-pay'||act==='cyc-pay-all'){var ci=cycInfo(coll,o);if(!ci){toast('مفيش قسط مفتوح دلوقتي');return}
      var ca=act==='cyc-pay-all'?ci.rem:n(document.getElementById('cyc-amt').value); if(!(ca>0)){toast('اكتب مبلغ أكبر من صفر');return}
      var res;mutate(function(){res=payCycle(coll,o,ca)});
      if(res.done)toast('اتدفع '+ci.label+' بالكامل'+(res.over>0.005?' (فيه '+fmt(res.over)+' زيادة ما اتحسبتش)':'')+(ci.totalLeft!=null?' · الباقي من الإجمالي '+fmt(Math.max(ci.totalLeft-ca+(res.over||0),0)):''));
      else toast('اتسجلت '+fmt(ca)+' ج · الباقي من '+ci.label+' '+fmt(res.rem));
      return}
    if(act==='cyc-reset'){var rk='cyc'+o.id;if(confirmDel!==rk){confirmDel=rk;renderSheet();setTimeout(function(){if(confirmDel===rk){confirmDel=null;renderSheet()}},3500);return}
      confirmDel=null;mutate(function(){((o.cyc&&o.cyc.log)||[]).forEach(function(l){unlogTx(l.txId)});o.cyc=null});toast('اتلغت الدفعات الجزئية');return}
    if(act==='card-pay'){cardPay(n(document.getElementById('pay-amt').value));return}
    if(act==='card-pay-min'){cardPay(calcCard(o).remMin);return}
    if(act==='card-pay-all'){cardPay(calcCard(o).rem);return}
    if(act==='card-new'){openStmtForm(o);return}
    if(act==='epp-add'){var ed=document.getElementById('ep-desc').value.trim(), edt=document.getElementById('ep-date').value, ea=n(document.getElementById('ep-amt').value),
        et=Math.round(n(document.getElementById('ep-ten').value)), ei=document.getElementById('ep-inst').value, ef=document.getElementById('ep-first').value;
      if(!(ea>0)||!(et>0)||!parseD(edt)){toast('اكتب المبلغ وعدد الشهور والتاريخ');return}
      mutate(function(){o.epp=(o.epp||[]).concat([{id:uid(),date:edt,desc:ed||'تقسيط',amount:ea,tenor:et,inst:ei===''?Math.round(ea/et*100)/100:n(ei),first:ef||''}])});
      toast('اتضاف التقسيط');return}
    if(act==='epp-del'){var di0=+t.getAttribute('data-i'), dk='epp'+o.id+di0;
      if(confirmDel!==dk){confirmDel=dk;renderSheet();setTimeout(function(){if(confirmDel===dk){confirmDel=null;renderSheet()}},3500);return}
      confirmDel=null;mutate(function(){o.epp=(o.epp||[]).filter(function(_,j){return j!==di0})});toast('اتحذف التقسيط');return}
    if(act==='loan-upd'){openLoanUpd(o);return}
    if(act==='loan-paid'){var d=parseD(o.nextDue); if(!d){toast('حدد ميعاد القسط الجاي الأول');return}
      mutate(function(){o.nextDue=iso(addMonth(d));o.lastPaid=iso(today())}); toast('اتسجل القسط. الجاي '+dl(parseD(o.nextDue)));return}
    if(act==='add-pay'){var amt=n(document.getElementById('pay-amt').value), dt=document.getElementById('pay-date').value||iso(today());
      if(!(amt>0)){toast('اكتب مبلغ الدفعة');return}
      mutate(function(){o.payments=(o.payments||[]).concat([{amount:amt,date:dt,alloc:allocDebt(o,amt),txId:logTx(coll==='lent'?'دخل':'دفعة',coll,o,amt,coll==='lent'?'رجعتلي من سلفة':'سداد سلفة',dt)}])});
      var dx=calcDebt(o);toast('اتسجلت '+fmt(amt)+' ج · الباقي '+fmt(dx.rem)+(dx.next?' · الجاي في الخطة '+fmt(dx.next.left):''));return}
    if(act==='gam-paid'){var gx=calcGam(o);if(gx.done)return;mutate(function(){o.paidCount=Math.min(gx.idx+1,n(o.months))});
      var nx=calcGam(o).next;toast('اتسجل القسط'+(nx?'. الجاي '+dl(nx):'. خلصت الأقساط'));return}
    if(act==='gam-unpaid'){mutate(function(){o.paidCount=Math.max(n(o.paidCount)-1,0)});return}
    if(act==='gam-recv'){mutate(function(){o.received=!o.received;
        if(o.received)o.recvTx=logTx('قبض جمعية','gamiyas',o,calcGam(o).payout,'صافي القبض');else{unlogTx(o.recvTx);o.recvTx=''}});
      toast(o.received?'اتسجل إنك قبضت '+o.name:'اتلغى');return}
    if(act==='inc-recv'){var ia=n(document.getElementById('inc-amt').value), idt=document.getElementById('inc-date').value||iso(today());
      if(!(ia>0)){toast('اكتب المبلغ');return}
      mutate(function(){logTx('دخل','income',o,ia,'قبض',idt)});toast('اتسجل قبض '+fmt(ia)+' ج');return}
    if(act==='bal-add'||act==='bal-sub'){var ba=n(document.getElementById('mv-amt').value), bs=document.getElementById('mv-src').value.trim();
      if(!(ba>0)){toast('اكتب المبلغ');return}
      var cur2=String(o.currency||'').trim(), other2=cur2&&cur2.toUpperCase()!=='EGP'&&cur2!=='جنيه'&&cur2!=='ج';
      mutate(function(){var sg=act==='bal-add'?1:-1;o.balance=Math.round((n(o.balance)+sg*ba)*100)/100;o.balanceAt=iso(today());
        logTx(act==='bal-add'?'دخل':'مصروف',coll,o,ba,(bs||(act==='bal-add'?'إضافة رصيد':'صرف من الرصيد'))+(other2?' ('+cur2+')':''))});
      toast((act==='bal-add'?'اتضاف ':'اتخصم ')+fmt(ba)+' · الرصيد دلوقتي '+fmt(o.balance));return}
    if(act==='debt-plan'){var dx2=calcDebt(o), nIn=Math.max(1,Math.round(n(document.getElementById('dp-n').value)||1)), sdt=document.getElementById('dp-start').value;
      if(!(dx2.rem>0)){toast('مفيش باقي');return} if(!parseD(sdt)){toast('حدد التاريخ');return}
      mutate(function(){
        (o.schedule||[]).forEach(function(s){if(!s.done&&n(s.paidAmt)>0){s.amount=n(s.paidAmt);s.done=true}});
        o.schedule=(o.schedule||[]).filter(function(s){return s.done});
        var each=Math.floor(dx2.rem/nIn*100)/100, acc=0, d0=parseD(sdt);
        for(var q=0;q<nIn;q++){var a=q===nIn-1?Math.round((dx2.rem-acc)*100)/100:each;acc+=a;
          o.schedule.push({amount:a,date:iso(clampD(d0.getFullYear(),d0.getMonth()+q,d0.getDate())),note:nIn>1?'قسط '+(q+1)+' من '+nIn:'مرة واحدة',done:false})}
        o.plan=nIn===1?'الباقي مرة واحدة يوم '+sdt:nIn+' قسط × '+fmt(each)+' كل شهر من '+sdt});
      toast(nIn===1?'اتعملت الخطة: مرة واحدة':'اتعملت الخطة: '+nIn+' قسط');return}
    if(act==='debt-all'){var dx3=calcDebt(o);if(!(dx3.rem>0))return;
      mutate(function(){o.payments=(o.payments||[]).concat([{amount:dx3.rem,date:iso(today()),note:'سداد الباقي كله',alloc:allocDebt(o,dx3.rem),
        txId:logTx(coll==='lent'?'دخل':'دفعة',coll,o,dx3.rem,coll==='lent'?'رجعلي الباقي كله':'سداد الباقي كله')}])});
      toast('اتسددت بالكامل');return}
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
      var left2=Math.max(n(it2.amount)-n(it2.paidAmt),0);
      mutate(function(){it2.done=true;it2.paidAmt=n(it2.amount);o.payments=(o.payments||[]).concat([{amount:left2,date:iso(today()),note:it2.note||'من الخطة',alloc:[{i:si,amt:left2}],
        txId:logTx(coll==='lent'?'دخل':'دفعة',coll,o,left2,(coll==='lent'?'رجعتلي':'سداد سلفة')+(it2.note?' · '+it2.note:''))}])});
      toast('اتسجلت '+fmt(left2)+' ج · الباقي '+fmt(calcDebt(o).rem));return}
    if(act==='del-sched'){var di=+t.getAttribute('data-i');mutate(function(){o.schedule=(o.schedule||[]).filter(function(_,j){return j!==di})});return}
    if(act==='del-pay'){var i=+t.getAttribute('data-i');mutate(function(){var pdel=(o.payments||[])[i];if(pdel)unlogTx(pdel.txId);
      (pdel&&pdel.alloc||[]).forEach(function(a){var s=(o.schedule||[])[a.i];if(s){s.paidAmt=Math.max(n(s.paidAmt)-n(a.amt),0);if(s.paidAmt<n(s.amount)-0.005)s.done=false}});
      o.payments=(o.payments||[]).filter(function(_,j){return j!==i})});return}
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
  function backupPayload(){return JSON.stringify({kind:'3bhady-data',app:'3bhady Financial Aid',version:curVersion(),exportedAt:new Date().toISOString(),state:S},null,1)}
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
    if(itemCount(S)===0)return '<a class="banner" href="#cards">أهلًا بيك. البرنامج لسه فاضي: ابدأ بإضافة كروتك وقروضك وحساباتك من القائمة ☰. ولو معاك نسخة احتياطية، استرجعها من "الإعدادات والتحديث".</a>';
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
      r('الاسم','3bhady Financial Aid')+
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

  function isUpdate(obj){return obj&&obj.kind==='3bhady-update'&&obj.js&&obj.html&&obj.version}
  function dataOf(obj){return obj&&obj.kind==='3bhady-data'?obj.state:(obj&&Array.isArray(obj.cards)?obj:null)}
  /* either button accepts either file: the file's own content decides what happens */
  function onAnyFile(obj,name){
    if(isUpdate(obj)){pendingUpdate=obj;pendingImport=null;renderMain();window.scrollTo(0,0);return}
    var st=dataOf(obj);
    if(st){pendingImport={state:normalize(st),name:name,at:obj.exportedAt};pendingUpdate=null;renderMain();window.scrollTo(0,0);return}
    toast('الملف ده مش ملف تحديث ولا نسخة بيانات للبرنامج');
  }
  var onUpdateFile=onAnyFile, onDataFile=onAnyFile;
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
  document.title='3bhady Financial Aid';
  try{document.documentElement.setAttribute('data-theme','dark');var tcm=document.querySelector('meta[name="theme-color"]');if(!tcm){tcm=document.createElement('meta');tcm.name='theme-color';document.head.appendChild(tcm)}tcm.setAttribute('content','#000000')}catch(e){}
  (function(){var sp=document.createElement('div');sp.id='splash';sp.setAttribute('role','img');sp.setAttribute('aria-label','3bhady Financial Aid');
    sp.innerHTML='<svg class="sp-logo" width="132" height="86" viewBox="0 0 132 86" aria-hidden="true" style="direction:ltr"><rect x="1" y="1" width="130" height="84" rx="11" fill="#26262a" stroke="#3a3a3f"/><rect x="1" y="16" width="130" height="12" fill="#0b0b0c"/>'+
      '<rect x="13" y="38" width="24" height="18" rx="3" fill="#d9b45a"/><text x="119" y="74" text-anchor="end" direction="ltr" unicode-bidi="bidi-override" font-family="system-ui,sans-serif" font-weight="800" font-size="30" fill="#e3bb55">3b</text></svg>'+
      '<div class="sp-t">3bhady</div><div class="sp-s">Financial Aid</div><div class="sp-v">v'+esc(window.APP_VERSION||'')+'</div>';
    document.body.appendChild(sp);function off(){if(!sp.parentNode||sp.classList.contains('out'))return;sp.classList.add('out');setTimeout(function(){if(sp.parentNode)sp.parentNode.removeChild(sp)},500)}
    sp.addEventListener('click',off);setTimeout(off,1600)})();
  loaded=true;renderAll();ntBoot();
  if(navigator.storage&&navigator.storage.persist){navigator.storage.persist().then(function(p){persisted=p;if(route==='settings')renderMain()}).catch(function(){})}
  window.__appReady=true;
  setInterval(function(){if(!(sheet&&sheet.mode==='form'))renderAll()},10*60*1000);
})();