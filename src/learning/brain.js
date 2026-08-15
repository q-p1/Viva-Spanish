(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else { root.VIVA=root.VIVA||{}; root.VIVA.brain=api; }
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function avg(arr){ return arr&&arr.length?arr.reduce((a,b)=>a+b,0)/arr.length:null; }
  function forgettingRisk(es,state,now=Date.now()){
    const m=(state.mastery&&state.mastery[es])||0;
    const e=(state.errors&&state.errors[es])||0;
    const due=(state.dueAt&&state.dueAt[es])||0;
    const overdue=Math.max(0,now-due)/3600000;
    const rt=avg((state.responseTimes&&state.responseTimes[es])||[]);
    const slow=rt==null?0:Math.min(18,Math.max(0,(rt-4500)/700));
    const unseen=m===0?15:0;
    return Math.max(0,Math.min(100,Math.round((100-m)*.72+Math.min(24,e*5)+Math.min(22,overdue*.7)+slow+unseen)));
  }
  function abilityStatus(score){ if(score>=86)return 'Ready'; if(score>=68)return 'Almost ready'; if(score>=42)return 'Developing'; if(score>0)return 'Starting'; return 'Untrained'; }
  function dominantError(state){
    const e=state.errorTypes||{}; return Object.entries(e).sort((a,b)=>b[1]-a[1])[0]||['none',0];
  }
  function profile(state,phrases=[]){
    const [errorType,errorCount]=dominantError(state);
    const mode=state.modeStats||{};
    const modes=Object.entries(mode).map(([name,x])=>({name,accuracy:x.attempts?x.correct/x.attempts:0,attempts:x.attempts||0})).sort((a,b)=>b.accuracy-a.accuracy);
    const risks=phrases.map(p=>({es:p.es,risk:forgettingRisk(p.es,state)})).sort((a,b)=>b.risk-a.risk);
    return {errorType,errorCount,bestMode:modes[0]?.name||'unknown',weakest:risks.slice(0,5)};
  }
  function recordMode(state,mode,correct,responseMs){
    state.modeStats=state.modeStats||{}; const x=state.modeStats[mode]||(state.modeStats[mode]={attempts:0,correct:0,totalMs:0});
    x.attempts++; if(correct)x.correct++; if(Number.isFinite(responseMs))x.totalMs+=responseMs; return x;
  }
  function why(es){
    const exact={
      'Me llamo':'“Me llamo” is literally closer to “I call myself.” Spanish uses a reflexive structure here.',
      'Soy de':'“Soy” comes from ser, used here for identity/origin. Add a place after “de.”',
      'Quiero':'“Quiero” means “I want.” It is the yo form of querer.',
      'Necesito':'“Necesito” means “I need.” Put a noun or action after it.',
      '¿Dónde está...?':'“Dónde” asks where. “Está” is used for location. Replace the dots with the place or thing.',
      'Más despacio, por favor':'“Más” = more, “despacio” = slowly. Together: “more slowly, please.”',
      'No entiendo':'“No” negates the verb. “Entiendo” means “I understand,” so together: “I don’t understand.”',
      'Mucho gusto':'Literally “much pleasure,” but naturally it means “nice to meet you.”'
    };
    if(exact[es])return exact[es];
    if(/^¿/.test(es))return 'This is a question. Spanish normally uses both opening and closing question marks.';
    if(es.includes('por favor'))return '“Por favor” is a reusable politeness block. You can attach it to many requests.';
    return 'Notice the reusable chunks rather than memorizing every sentence as one giant object.';
  }
  function recommend(state,phrases=[]){
    const p=profile(state,phrases),r=[];
    if(p.errorType==='order')r.push('Sentence Forge');
    if(['far','missing','extra','sub','swap'].includes(p.errorType))r.push('One Mistake, Five Ways');
    if((state.attempts||0)>5 && ((state.correct||0)/(state.attempts||1))<.7)r.push('Rescue Review');
    r.push('Daily Adventure'); return [...new Set(r)].slice(0,3);
  }
  return {avg,forgettingRisk,abilityStatus,dominantError,profile,recordMode,why,recommend};
});
