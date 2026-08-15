(function(root){
  const V=root.VIVA;
  V.ui={
    $(s,e=document){return e.querySelector(s)}, $$(s,e=document){return [...e.querySelectorAll(s)]},
    toast(msg){ const t=document.getElementById("toast"); if(!t)return; t.textContent=msg; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),1500); },
    modal(html){ const d=document.createElement("div"); d.className="modal-bg"; d.innerHTML=`<div class="modal">${html}</div>`; document.body.appendChild(d); d.addEventListener("click",e=>{ if(e.target===d||e.target.closest("[data-close]"))d.remove(); }); return d; },
    closeModal(){ document.querySelector(".modal-bg")?.remove(); },
    shuffle(a){ a=[...a]; for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; },
    esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;"); },
    phrase(es){ return V.content.phrases.find(w=>w.es===es)||V.store.state.personal.find(w=>w.es===es); },
    mastery(es){ return V.store.state.mastery[es]||0; },
    setMastery(es,v){ V.store.state.mastery[es]=V.mastery.clamp(v); V.store.save(); },
    overall(){ const arr=V.content.phrases.filter(w=>this.mastery(w.es)>0); return arr.length?arr.reduce((a,w)=>a+this.mastery(w.es),0)/arr.length:0; },
    learned(){ return V.content.phrases.filter(w=>this.mastery(w.es)>0).length; },
    strong(){ return V.content.phrases.filter(w=>this.mastery(w.es)>=82).length; },
    accuracy(){ const s=V.store.state; return s.attempts?Math.round(s.correct/s.attempts*100):0; },
    skillScore(skill){ const arr=V.content.phrases.filter(w=>w.skill===skill); return arr.length?Math.round(arr.reduce((a,w)=>a+this.mastery(w.es),0)/arr.length):0; },
    lessonPct(i){ const l=V.content.lessons[i]; return Math.round(l.words.reduce((a,e)=>a+this.mastery(e),0)/l.words.length); },
    lessonUnlocked(i){ return i===0||this.lessonPct(i-1)>=65; },
    weak(){ return V.scheduler.sortDue(V.content.phrases.filter(w=>this.mastery(w.es)>0).map(w=>w.es),V.store.state).map(es=>this.phrase(es)).filter(w=>w&&this.mastery(w.es)<90); },
    wordRow(w){ const m=this.mastery(w.es); return `<div class="error-row"><div><b dir="ltr">${w.es}</b><small>${w.en} · ${m}%</small><div class="progress"><i style="width:${m}%"></i></div></div><button class="pill" data-speak="${this.esc(w.es)}">🔊</button></div>`; },
    feature(icon,title,desc,go,badge){ return `<button class="card feature-card" data-go="${go}"><span class="badge">${badge}</span><span class="emoji">${icon}</span><h3>${title}</h3><p>${desc}</p></button>`; },
    bindSpeak(scope=document){ scope.querySelectorAll("[data-speak]").forEach(b=>b.onclick=()=>V.audio.speak(b.dataset.speak)); }
  };
})(typeof globalThis!=="undefined"?globalThis:window);