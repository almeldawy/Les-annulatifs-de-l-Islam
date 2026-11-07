/* Version : changer cette valeur à chaque mise à jour du contenu pour forcer le rafraîchissement du cache. */
const V="annulatifs-v1";
const CORE=[
"./",
"index.html",
"style.css",
"app.js",
"manifest.webmanifest",
"icon-192.png",
"icon-512.png",
"chapitre-0.html",
"chapitre-1.html",
"chapitre-2.html",
"chapitre-3.html",
"chapitre-4.html",
"chapitre-5.html",
"chapitre-6.html",
"chapitre-7.html",
"chapitre-8.html",
"chapitre-9.html",
"chapitre-10.html"
];
const FONTS=["fonts/Amiri-Regular.woff2", "fonts/Amiri-Regular.ttf", "fonts/Amiri-Bold.woff2", "fonts/Amiri-Bold.ttf", "fonts/SourceSerif4-Regular.woff2", "fonts/SourceSerif4-Regular.ttf", "fonts/SourceSerif4-Italic.woff2", "fonts/SourceSerif4-Italic.ttf", "fonts/SourceSerif4-SemiBold.woff2", "fonts/SourceSerif4-SemiBold.ttf"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(async c=>{await c.addAll(CORE);await Promise.allSettled(FONTS.map(f=>c.add(f)))}).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>{
const n=fetch(r).then(res=>{if(res.ok&&new URL(r.url).origin===location.origin){const k=res.clone();caches.open(V).then(c=>c.put(r,k))}return res}).catch(()=>h||caches.match("index.html"));
return h||n}))});
