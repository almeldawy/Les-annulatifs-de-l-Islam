/* Pour ajouter un chapitre : passer ok:true et déposer le fichier correspondant. */
const CH=[
{f:"chapitre-0.html",ok:true,t:"Introduction : « Sache que les annulatifs de l’Islam sont au nombre de dix »"},
{f:"chapitre-1.html",ok:true,t:"Le premier annulatif : L’association (Le Chirk) dans l’adoration d’Allah Ta’âlâ"},
{f:"chapitre-2.html",ok:true,t:"Le deuxième annulatif : Quiconque place entre lui et Allah des intermédiaires qu’il invoque, auxquels il demande [le besoin et l’intercession] et en qui il place sa confiance, a certes mécru à l’unanimité"},
{f:"chapitre-3.html",ok:true,t:"Le troisième annulatif : Quiconque ne déclare pas mécréants les associateurs, ou doute de leur mécréance, ou valide leur doctrine, a certes mécru"},
{f:"chapitre-4.html",ok:true,t:"Le quatrième annulatif : Quiconque a la croyance que la voie d’un autre que le Prophète ﷺ est plus parfaite que la sienne, ou que le jugement d’un autre est meilleur que le sien – à l’exemple de celui qui préfère le jugement des fausses divinités (Les Tâghoûts) à son jugement – est certes mécréant"},
{f:"chapitre-5.html",ok:true,t:"Le cinquième annulatif : Quiconque déteste une chose apportée par le Messager ﷺ, même s’il la met en pratique, a mécru"},
{f:"chapitre-6.html",ok:true,t:"Le sixième annulatif : Quiconque se moque d’une chose de la religion du Messager ﷺ, ou de la récompense d’Allah, ou de Son châtiment, a mécru"},
{f:"chapitre-7.html",ok:true,t:"Le septième annulatif : La sorcellerie. En font partie le Sarf (le sortilège de désunion/séparation) et l’’Atf (le sortilège d’attachement/amour artificiel). Quiconque la pratique ou l’agréé (en est satisfait) a mécru"},
{f:"chapitre-8.html",ok:true,t:"Le huitième annulatif : Secourir les associateurs (les soutenir) et les entraider contre les musulmans"},
{f:"chapitre-9.html",ok:true,t:"Le neuvième annulatif : Quiconque a la croyance que certaines personnes ont la possibilité de s’affranchir (de sortir) de la législation (Sharî’ah) de Muhammad ﷺ, tout comme il a été permis à Al-Khidr de s’affranchir de la législation de Moïse (Mûsâ) — que la paix soit sur lui —, alors celui-ci est un mécréant"},
{f:"chapitre-10.html",ok:true,t:"Le dixième annulatif : Se détourner (l’indifférence totale) de la religion d’Allah le Très-Haut, en ne l’apprenant pas et en ne la mettant pas en pratique"}];
const K="annulatifs-progress",R=document.documentElement;
const ld=()=>{try{return JSON.parse(localStorage.getItem(K))||{}}catch(e){return{}}};
const sv=o=>{try{localStorage.setItem(K,JSON.stringify(o))}catch(e){}};
const cur=document.body.dataset.ch;
/* thème */
try{const t=localStorage.getItem("annulatifs-theme");if(t)R.dataset.theme=t}catch(e){}
const dark=()=>R.dataset.theme?R.dataset.theme=="dark":matchMedia("(prefers-color-scheme:dark)").matches;
/* en-tête */
const h=document.createElement("header");
h.innerHTML='<button id="burger" aria-label="Menu">☰</button><h1><a href="index.html"><small>Commentaire du livre</small><span>Les annulatifs de l’Islam</span></a></h1><button id="bmb" aria-label="Marque-pages" title="Marque-pages"><span class="rib"></span><span class="lb"> Marque-pages</span><em id="bmn"></em></button><button id="fsb" aria-label="Taille du texte" title="Taille du texte">Aa<span class="lb"> Taille</span></button><button id="th" aria-label="Basculer clair/sombre" title="Clair/Sombre">◐<span class="lb"> Clair/Sombre</span></button><button id="rz" aria-label="Réinitialiser la progression" title="Réinitialiser la progression">↺<span class="lb"> Réinitialiser</span></button>';
document.body.prepend(h);
const pr=ld();
const pc=i=>{const s=pr[i];return s?(s.done?100:s.n?Math.round((s.i+1)/s.n*100):0):0};
const tot=()=>Math.round(CH.reduce((x,c,i)=>x+pc(i),0)/CH.length);
const esc=t=>t.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const m=document.createElement("nav");m.id="menu";
m.innerHTML='<a href="index.html"'+(cur==undefined?' class="cur"':'')+'>Accueil et sommaire</a>'+CH.map((c,i)=>c.ok?`<a href="${c.f}" class="${cur==i?'cur':''} ${pr[i]&&pr[i].done?'done':''}">${c.t}<i class="mb"><u style="width:${pc(i)}%"></u></i></a>`:`<span class="soon">${c.t} <em>(à venir)</em></span>`).join("");
document.body.insertBefore(m,document.querySelector("main"));
const bk=document.createElement("div");bk.id="mbk";document.body.appendChild(bk);
const tg=v=>{m.classList.toggle("open",v);bk.classList.toggle("on",m.classList.contains("open"))};
document.getElementById("burger").onclick=()=>tg();
bk.onclick=()=>tg(false);
m.onclick=e=>{if(e.target.closest("a"))tg(false)};
addEventListener("resize",()=>{if(innerWidth>=1000)tg(false)});
document.getElementById("th").onclick=()=>{const v=dark()?"light":"dark";R.dataset.theme=v;try{localStorage.setItem("annulatifs-theme",v)}catch(e){}};
document.getElementById("rz").onclick=()=>{if(confirm("Réinitialiser la progression de lecture ? (Vos marque-pages sont conservés.)")){try{localStorage.removeItem(K)}catch(e){}location.reload()}};
/* sommaire de l'accueil */
const so=document.getElementById("sommaire");
if(so)so.innerHTML=CH.map((c,i)=>{const p=pc(i),t=c.t.split(":")[0],r=c.t.includes(":")?c.t.slice(c.t.indexOf(":")+1).trim():"";
return c.ok?`<li><a href="${c.f}"><span class="num">${i?i:"✦"}</span><span class="tx"><b>${t}</b>${r?`<em>${r}</em>`:""}<span class="row"><span class="mb"><u style="width:${p}%"></u></span><small>${p==100?"Lu ✓":p+" %"}</small></span></span></a></li>`:`<li class="soon"><span class="num">${i}</span><span class="tx"><b>${t}</b><em>(à venir)</em></span></li>`}).join("");
/* progression */
let ps=[];
if(cur!==undefined){
ps=[...document.querySelectorAll("main .p")];
const st=pr[cur]||{i:-1};
ps.forEach((p,i)=>{p.id=p.id||"p"+i;if(i<=st.i)p.classList.add("read")});
const rs=document.getElementById("resume");
if(rs&&st.i>=0&&st.i<ps.length-1){rs.style.display="block";rs.onclick=()=>ps[st.i].scrollIntoView()}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const i=ps.indexOf(e.target),o=ld(),s=o[cur]||{i:-1};if(i>s.i&&!window.__j){o[cur]={i:i,n:ps.length,done:i>=ps.length-1};o.last={c:+cur,i:i};sv(o);upd();ps.forEach((p,j)=>p.classList.toggle("read",j<=i))}}}),{rootMargin:"-45% 0px -45% 0px"});
ps.forEach(p=>io.observe(p));
const n=document.getElementById("nav"),k=+cur,pv=CH[k-1],nx=CH[k+1];
if(n)n.innerHTML=(pv?`<a href="${pv.f}">← Précédent</a>`:'<a href="index.html">← Accueil</a>')+(nx&&nx.ok?`<a href="${nx.f}">Suivant →</a>`:'');
}
/* notes en fenêtre */
(()=>{const o=document.createElement("div");o.id="fnpop";o.innerHTML='<div role="dialog" aria-modal="true"><b></b><span></span><br><button class="btn">Fermer</button></div>';document.body.appendChild(o);
const cl=()=>o.classList.remove("on");
o.onclick=e=>{if(e.target==o||e.target.tagName=="BUTTON")cl()};
document.addEventListener("keydown",e=>{if(e.key=="Escape")cl()});
document.addEventListener("click",e=>{const a=e.target.closest("sup a");if(!a)return;const n=document.getElementById((a.getAttribute("href")||"").slice(1));if(!n)return;e.preventDefault();
o.querySelector("b").textContent="Note "+a.textContent;
o.querySelector("span").textContent=n.textContent.replace(/^\s*\d+\.\s*/,"").replace(/\s*↩\s*$/,"");
o.classList.add("on");o.querySelector("button").focus()})})();

/* marque-pages, progression, tableau de bord */
const BK="annulatifs-bookmarks";
const lb=()=>{try{return JSON.parse(localStorage.getItem(BK))||[]}catch(e){return[]}};
const sb=x=>{try{localStorage.setItem(BK,JSON.stringify(x))}catch(e){}};
const bar=document.createElement("div");bar.id="pbar";bar.innerHTML="<i></i>";document.body.appendChild(bar);
const pill=document.createElement("div");pill.id="ppill";document.body.appendChild(pill);
function upd(){if(cur===undefined){pill.style.display="none";return}
const s=ld()[cur],p=s?(s.done?100:Math.round((s.i+1)/s.n*100)):0;pill.textContent=p+" % lu";
const u=m.querySelector("a.cur u");if(u)u.style.width=p+"%"}
addEventListener("scroll",()=>{const d=document.documentElement,h=d.scrollHeight-innerHeight;bar.firstChild.style.width=(h>0?Math.min(100,scrollY/h*100):0)+"%"},{passive:true});
const pn=document.createElement("aside");pn.id="bmp";
pn.innerHTML='<div class="bh"><b>Marque-pages</b><button class="btn" id="bmx">Fermer</button></div><div id="bml"></div>';document.body.appendChild(pn);
const here=location.pathname.split("/").pop()||"index.html";
function jump(id){const el=document.getElementById(id);if(!el||!/^p\d+$/.test(id))return;window.__j=1;setTimeout(()=>window.__j=0,1500);
el.scrollIntoView({block:"center"});el.classList.add("flash");setTimeout(()=>el.classList.remove("flash"),1800)}
function rend(){const x=lb(),set=new Set(x.filter(b=>b.c==+cur).map(b=>b.i));
ps.forEach((p,i)=>p.classList.toggle("bmk",set.has(i)));
document.getElementById("bmn").textContent=x.length||"";
document.getElementById("bml").innerHTML=x.length?x.sort((p,q)=>p.c-q.c||p.i-q.i).map(b=>`<div class="bi"><a href="${CH[b.c].f}#p${b.i}" data-c="${b.c}" data-i="${b.i}"><small>${esc(CH[b.c].t.split(":")[0])} · passage ${b.i+1}</small>${esc(b.s)}…</a><button data-del="${b.c}-${b.i}" aria-label="Supprimer ce marque-page">✕</button></div>`).join("")+'<button class="btn" id="bma">Tout supprimer</button>':'<p class="em">Aucun marque-page pour le moment. Touchez le ruban à droite d’un passage pour l’ajouter.</p>'}
ps.forEach(p=>{p.dataset.s=p.textContent.replace(/\s+/g," ").trim().slice(0,90);const b=document.createElement("button");b.type="button";b.className="bm";b.setAttribute("aria-label","Marquer ce passage");p.appendChild(b)});
document.addEventListener("click",e=>{
const b=e.target.closest(".bm");
if(b){const i=ps.indexOf(b.parentNode),x=lb(),k=x.findIndex(y=>y.c==+cur&&y.i==i);if(k>=0)x.splice(k,1);else x.push({c:+cur,i:i,s:b.parentNode.dataset.s});sb(x);rend();return}
if(e.target.closest("#bmb")){pn.classList.toggle("on");return}
if(e.target.id=="bmx"){pn.classList.remove("on");return}
const d=e.target.closest("[data-del]");if(d){const[c,i]=d.dataset.del.split("-").map(Number);sb(lb().filter(y=>!(y.c==c&&y.i==i)));rend();return}
if(e.target.id=="bma"){if(confirm("Supprimer tous les marque-pages ?")){sb([]);rend()}return}
const l=e.target.closest("#bml a");if(l){pn.classList.remove("on");if(CH[l.dataset.c].f==here){e.preventDefault();jump("p"+l.dataset.i)}}});
document.addEventListener("keydown",e=>{if(e.key=="Escape")pn.classList.remove("on")});
addEventListener("hashchange",()=>jump(location.hash.slice(1)));
rend();upd();
if(location.hash)jump(location.hash.slice(1));
const ds=document.getElementById("dash");
if(ds){const g=tot(),l=pr.last;ds.innerHTML='<div class="dgh"><b>Votre progression</b><span>'+g+' %</span></div><div class="mb big"><u style="width:'+g+'%"></u></div>'+(l&&CH[l.c]?'<a class="btn" href="'+CH[l.c].f+'#p'+l.i+'">Reprendre la lecture · '+esc(CH[l.c].t.split(":")[0])+'</a>':'<a class="btn" href="chapitre-0.html">Commencer la lecture</a>')}

/* style des versets et hadiths */
document.querySelectorAll("main .ar.p").forEach(x=>{const t=x.nextElementSibling;if(!t||!t.classList.contains("tr"))return;
const v=t.classList.contains("vs")||x.classList.contains("vs")||(!t.classList.contains("hd")&&!!t.querySelector("small"));
[x,t].forEach(e=>e.classList.add(v?"vs":"hd"))});

/* taille de la police */
(()=>{const FK="annulatifs-fs";let f={fs:1,fa:1};
try{f=Object.assign(f,JSON.parse(localStorage.getItem(FK))||{})}catch(e){}
const ap=()=>{R.style.setProperty("--fs",f.fs);R.style.setProperty("--fa",f.fa);try{localStorage.setItem(FK,JSON.stringify(f))}catch(e){}};ap();
const p=document.createElement("div");p.id="fsp";
p.innerHTML='<b>Taille du texte</b><label>Texte français<span id="fsv"></span><div><button data-k="fs" data-d="-.05" aria-label="Réduire">A−</button><input type="range" id="fsr" min=".85" max="1.6" step=".05"><button data-k="fs" data-d=".05" aria-label="Agrandir">A+</button></div></label><label>Texte arabe<span id="fav"></span><div><button data-k="fa" data-d="-.05" aria-label="Réduire">A−</button><input type="range" id="far" min=".85" max="1.7" step=".05"><button data-k="fa" data-d=".05" aria-label="Agrandir">A+</button></div></label><button class="btn" id="fsz">Réinitialiser</button>';
document.body.appendChild(p);
const sy=()=>{p.querySelector("#fsr").value=f.fs;p.querySelector("#far").value=f.fa;p.querySelector("#fsv").textContent=Math.round(f.fs*100)+" %";p.querySelector("#fav").textContent=Math.round(f.fa*100)+" %"};sy();
const cl=(v,mn,mx)=>Math.min(mx,Math.max(mn,Math.round(v*100)/100));
p.addEventListener("input",e=>{if(e.target.id=="fsr")f.fs=+e.target.value;if(e.target.id=="far")f.fa=+e.target.value;ap();sy()});
p.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;
if(b.id=="fsz"){f={fs:1,fa:1}}else if(b.dataset.k){f[b.dataset.k]=cl(f[b.dataset.k]+ +b.dataset.d,.85,b.dataset.k=="fs"?1.6:1.7)}
ap();sy()});
document.addEventListener("click",e=>{if(e.target.closest("#fsb"))p.classList.toggle("on");else if(!e.target.closest("#fsp"))p.classList.remove("on")});
document.addEventListener("keydown",e=>{if(e.key=="Escape")p.classList.remove("on")})})();

/* lecture hors connexion */
if("serviceWorker" in navigator&&/^https?:/.test(location.protocol))addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
