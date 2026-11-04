/* 3bhady Financial Aid — offline cache + daily payment notification. Same-origin files: cache first, refreshed in the background. */
var CACHE='3bh-1.9.0', NT_C='3bh-notify', NT_PLAN='./__3bh/plan', NT_LAST='./__3bh/last', NT_INBOX='./__3bh/inbox';
var FILES=['./','index.html','app.css','app.html','app.js','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE&&k!==NT_C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var req=e.request; if(req.method!=='GET')return;
  var url=new URL(req.url), same=url.origin===location.origin, font=/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if(!same&&!font)return; if(same&&url.pathname.indexOf('/__3bh/')>=0)return;
  e.respondWith(caches.open(CACHE).then(function(c){
    return c.match(req,{ignoreSearch:same}).then(function(hit){
      var net=fetch(req).then(function(res){if(res&&(res.ok||res.type==='opaque'))c.put(req,res.clone());return res}).catch(function(){return hit});
      return hit||net;
    });
  }));
});
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
function ntDaily(){
  return caches.open(NT_C).then(function(c){
    return Promise.all([c.match(NT_PLAN),c.match(NT_LAST)]).then(function(r){
      if(!r[0])return;
      return Promise.all([r[0].json(),r[1]?r[1].text():'']).then(function(v){
        var plan=v[0], last=v[1], now=new Date(), m=ntBuild(plan,now);
        if(last===m.date||now.getHours()<(plan.hour==null?10:plan.hour))return;
        m.src='sw';
        return self.registration.showNotification(m.title,{body:m.body,tag:'3bh-'+m.date,icon:'icon-192.png',badge:'icon-192.png',lang:'ar',dir:'rtl',renotify:true,data:{url:'./#notifs'}})
          .then(function(){return c.put(NT_LAST,new Response(m.date))})
          .then(function(){return c.match(NT_INBOX)}).then(function(ib){return ib?ib.json():[]})
          .then(function(arr){arr=(arr||[]).filter(function(x){return x.date!==m.date});arr.push(m);return c.put(NT_INBOX,new Response(JSON.stringify(arr),{headers:{'content-type':'application/json'}}))});
      });
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
