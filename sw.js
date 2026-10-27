/* MotoLogix Ultra Max 7: isolated first-party offline cache */
const CACHE='motologix-ultramax7-home-v2-20261027';
const CORE=['/','/index.html','/v7.css','/v7.js','/homepage-v7.js','/homepage-v7.css','/manifest.webmanifest','/favicon.svg','/offline.html'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('motologix-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 if(request.mode==='navigate'){
  event.respondWith(fetch(request).then(response=>response).catch(async()=>{
   const cache=await caches.open(CACHE);
   return await cache.match('/index.html')||await cache.match('/offline.html');
  }));
  return;
 }
 event.respondWith(caches.match(request).then(hit=>hit||fetch(request).then(response=>{
  if(response.ok&&response.type==='basic'&&CORE.includes(new URL(request.url).pathname)){
   const copy=response.clone();caches.open(CACHE).then(c=>c.put(request,copy));
  }
  return response;
 }).catch(()=>caches.match('/offline.html'))));
});