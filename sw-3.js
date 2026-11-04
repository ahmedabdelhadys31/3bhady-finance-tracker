/* 3bhady Financial Aid — offline cache + daily payment notification. Same-origin files: cache first, refreshed in the background. */
var CACHE='3bh-1.9.6', NT_C='3bh-notify', NT_PLAN='./__3bh/plan', NT_SENT='./__3bh/sent', NT_INBOX='./__3bh/inbox';
var FILES=['./','index.html','app.css','app.html','app.js','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES.map(function(f){return new Request(f,{cache:'reload'})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener('message',function(e){if(e.data==='skip')self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE&&k!==NT_C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var req=e.request; if(req.method!=='GET')return;
  var url=new URL(req.url), same=url.origin===location.origin, font=/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if(!same&&!font)return; if(same&&(url.pathname.indexOf('/__3bh/')>=0||/\/sw\.js$/.test(url.pathname)))return;
  e.respondWith(caches.open(CACHE).then(function(c){
    return c.match(req,{ignoreSearch:same}).then(function(hit){
      var net=fetch(req).then(function(res){if(res&&(res.ok||res.type==='opaque'))c.put(req,res.clone());return res}).catch(function(){return hit});
      return hit||net;
    });
  }));
});
/* the app's clock is Cairo time (Africa/Cairo, summer/winter time included), whatever the phone's time zone:
     returns a Date whose local fields are the current wall-clock time in Cairo */
  function cairoNow(){var r=new Date();try{var p={};new Intl.DateTimeFormat('en-US',{timeZone:'Africa/Cairo',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric',hourCycle:'h23'}).formatToParts(r).forEach(function(x){if(x.type!=='literal')p[x.type]=+x.value});
    return new Date(p.year,p.month-1,p.day,p.hour%24,p.minute,p.second,r.getMilliseconds())}catch(e){return r}}
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
    var due=G[0].sum+G[1].sum, nm=plan.name?' يا '+plan.name:'';
    var title=due>0?'صباح الخير'+nm+' · مطلوب النهاردة '+f(due)+' ج':(G[2].x.length?'صباح الخير'+nm+' · مفيش مستحق النهاردة، بكرا '+f(G[2].sum)+' ج':'صباح الخير'+nm+' · مفيش مدفوعات النهاردة ولا بكرا');
    var lines=[];
    G.forEach(function(g){if(!g.x.length)return;
      lines.push(g.t+' ('+f(g.sum)+' ج):');
      g.x.forEach(function(i){lines.push('• '+i.n+' — '+f(i.a)+' ج'+(g.k==='late'?' (متأخر '+(-i.days)+' يوم)':''))})});
    if(!lines.length)lines.push('مفيش حاجة مستحقة النهاردة ولا بكرا.');
    return {id:'n'+t+'-'+now.getTime(),key:'daily-'+t,kind:'daily',date:t,at:now.toISOString(),title:title,body:lines.join('\n'),total:due,
      groups:G.map(function(g){return {k:g.k,t:g.t,sum:g.sum,items:g.x}}),read:false};
  }
  /* end-of-day summary of what happened on day D (spend, payments, transfers, money in, fees) */
  function ntDay(plan,D,now){
    function f(v){return Number(v||0).toLocaleString('en-US',{maximumFractionDigits:2})}
    var tx=(plan.tx||[]).filter(function(x){return x.d===D});
    var C=[{k:'spend',t:'صرف',m:function(x){return x.mv==='spend'||['مشتريات','مصروف','سحب كاش'].indexOf(x.k)>=0}},
           {k:'pay',t:'سداد',m:function(x){return x.k==='دفعة'}},
           {k:'xfer',t:'تحويلات',m:function(x){return x.k==='تحويل'}},
           {k:'in',t:'فلوس دخلت',m:function(x){return x.k==='دخل'||x.k==='قبض جمعية'}},
           {k:'fees',t:'رسوم وعمولات',m:function(x){return x.k==='فوايد ورسوم'}}];
    var used={};
    C.forEach(function(c){c.x=tx.filter(function(x,i){if(used[i])return false;if(c.m(x)){used[i]=1;return true}return false}).map(function(x){return {n:x.n,s:x.o||x.k,a:x.a,d:x.d,c:x.c,i:x.i}});c.sum=c.x.reduce(function(s,i){return s+i.a},0)});
    var p=String(D).split('-'), dt=new Date(+p[0],+p[1]-1,+p[2]), wd=dt.toLocaleDateString('ar-EG-u-nu-latn',{weekday:'long',day:'numeric',month:'long'});
    var nm=plan.name?' يا '+plan.name:'', any=C.some(function(c){return c.x.length}), lines=[];
    C.forEach(function(c){if(!c.x.length)return;lines.push(c.t+': '+f(c.sum)+' ج ('+c.x.length+(c.x.length===1?' عملية':' عمليات')+')');
      c.x.slice(0,4).forEach(function(i){lines.push('• '+i.n+' — '+f(i.a)+' ج')});if(c.x.length>4)lines.push('• و'+(c.x.length-4)+' كمان')});
    if(!any)lines.push('مفيش أي معاملات اتسجلت في اليوم ده: لا صرف ولا سداد ولا تحويلات ولا فلوس دخلت.');
    return {id:'d'+D+'-'+now.getTime(),key:'day-'+D,kind:'day',date:D,at:now.toISOString(),title:'ملخص يومك'+nm+' · '+wd,body:lines.join('\n'),
      groups:C.map(function(c){return {k:c.k,t:c.t,sum:c.sum,items:c.x}}),read:false};
  }
  /* due reminders for anything that can charge interest (cards, loans, BNPL), on bank working days:
     2 days before the last working day (check how you pay), and on that day (pay before 5 pm, or interest/late fees) */
  function ntCards(plan,now){
    function z(x){return (x<10?'0':'')+x}
    function d2(d){return d.getFullYear()+'-'+z(d.getMonth()+1)+'-'+z(d.getDate())}
    function f(v){return Number(v||0).toLocaleString('en-US',{maximumFractionDigits:2})}
    function lab(s){var p=String(s).split('-');return new Date(+p[0],+p[1]-1,+p[2]).toLocaleDateString('ar-EG-u-nu-latn',{weekday:'long',day:'numeric',month:'numeric'})}
    var t=d2(now), t2=d2(new Date(now.getFullYear(),now.getMonth(),now.getDate()+2)), nm=plan.name?'يا '+plan.name+'، ':'', out=[];
    var HOL='خد بالك: لو في أعياد أو إجازات رسمية لازم تسدد قبل آخر يوم عمل.';
    (plan.dues||(plan.cards||[]).map(function(c){return {i:c.i,c:'cards',n:c.n,d:c.d,rem:c.rem,min:c.min}})).forEach(function(c){
      var card=c.c==='cards', who=c.c==='bnpl'?'الجهة':'البنك', orig=c.od?' (الميعاد الأصلي '+lab(c.od)+'، '+c.why+')':'';
      var amt='المطلوب '+f(c.rem)+' ج'+(card&&c.min&&c.min<c.rem?'، والحد الأدنى '+f(c.min)+' ج':'');
      var it=[{n:c.n,s:amt,a:c.rem,d:c.d,c:c.c,i:c.i}];
      if(c.d===t2)out.push({id:'p'+c.i+t2,key:'pre2-'+c.c+'-'+c.i+'-'+c.d,kind:'card',date:t,at:now.toISOString(),title:'سداد '+c.n+' بعد يومين · '+lab(c.d),
        body:nm+'آخر يوم عمل لسداد '+c.n+' هو '+lab(c.d)+orig+'. '+amt+'.\nراجع طريقة السداد مع '+who+': بعض البنوك مش بتحسب السداد بالتحويل (InstaPay) أو الإيداع في الـ ATM أو في الفرع غير بعد وقت معين، فادفع من بدري.\n'+HOL,
        groups:[{k:'tomorrow',t:'آخر يوم عمل: '+lab(c.d),sum:c.rem,items:it}],read:false});
      if(c.d===t)out.push({id:'q'+c.i+t,key:'dueday-'+c.c+'-'+c.i+'-'+c.d,kind:'card',date:t,at:now.toISOString(),title:'النهاردة آخر يوم لسداد '+c.n,
        body:nm+'النهاردة آخر يوم عمل لسداد '+c.n+orig+'. '+amt+'.\nلو ما سددتش النهاردة لحد ما المتبقي يبقى صفر، ممكن تنزل فوايد أو يتحسب تأخير.\nسدد قبل الساعة 5 مساءً أو راجع '+who+'، لأن بعض البنوك مش بتحسب المعاملة بعد 5 مساءً.\n'+HOL,
        groups:[{k:'today',t:'آخر يوم · قبل 5 مساءً',sum:c.rem,items:it}],read:false});
    });
    return out;
  }
  /* everything that should have been sent by now and wasn't */
  function ntQueue(plan,now,sent){
    function z(x){return (x<10?'0':'')+x}
    function d2(d){return d.getFullYear()+'-'+z(d.getMonth()+1)+'-'+z(d.getDate())}
    var has=function(k){return sent.indexOf(k)>=0}, q=[], hr=plan.hour==null?10:plan.hour, t=d2(now), y=d2(new Date(now.getFullYear(),now.getMonth(),now.getDate()-1));
    if(now.getHours()>=hr){var m=ntBuild(plan,now);if(!has(m.key))q.push(m);ntCards(plan,now).forEach(function(c){if(!has(c.key))q.push(c)})}
    if(!has('day-'+y)&&(!plan.since||plan.since<=y))q.push(ntDay(plan,y,now));
    if(now.getHours()===23&&now.getMinutes()===59&&now.getSeconds()>=50&&!has('day-'+t))q.push(ntDay(plan,t,now));
    return q;
  }
function ntJson(c,k,def){return c.match(k).then(function(r){return r?r.json():def}).catch(function(){return def})}
function ntDaily(){
  return caches.open(NT_C).then(function(c){
    return Promise.all([ntJson(c,NT_PLAN,null),ntJson(c,NT_SENT,[]),ntJson(c,NT_INBOX,[])]).then(function(v){
      var plan=v[0], sent=(v[1]||[]).slice(), inbox=v[2]||[]; if(!plan)return;
      inbox.forEach(function(m){if(m.key&&sent.indexOf(m.key)<0)sent.push(m.key)});
      var q=ntQueue(plan,cairoNow(),sent); if(!q.length)return; var realAt=new Date().toISOString();
      return Promise.all(q.map(function(m){m.src='sw';m.at=realAt;sent.push(m.key);inbox.push(m);
        return self.registration.showNotification(m.title,{body:m.body,tag:'3bh-'+m.key,icon:'icon-192.png',badge:'icon-192.png',lang:'ar',dir:'rtl',renotify:true,data:{url:'./#notifs'}}).catch(function(){})}))
        .then(function(){return Promise.all([c.put(NT_SENT,new Response(JSON.stringify(sent.slice(-300)),{headers:{'content-type':'application/json'}})),
          c.put(NT_INBOX,new Response(JSON.stringify(inbox.slice(-60)),{headers:{'content-type':'application/json'}}))])});
    });
  }).catch(function(){});
}
self.addEventListener('periodicsync',function(e){if(e.tag==='3bh-daily')e.waitUntil(ntDaily())});
self.addEventListener('notificationclick',function(e){
  e.notification.close();
  var url=(e.notification.data&&e.notification.data.url)||'./#notifs';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(ws){
    for(var i=0;i<ws.length;i++){var w=ws[i];if('focus' in w){if(w.navigate)w.navigate(url).catch(function(){});return w.focus()}}
    return self.clients.openWindow(url);
  }));
});
