(function(root){
  const V=root.VIVA;
  V.coachEngine={
    record(es,result,responseMs){
      const s=V.store.state; s.attempts++;
      s.responseTimes[es]=(s.responseTimes[es]||[]).concat(responseMs).slice(-8);
      if(result.correct) s.correct++;
      else { s.errors[es]=(s.errors[es]||0)+1; s.errorTypes[result.type]=(s.errorTypes[result.type]||0)+1; s.history.push({date:Date.now(),es,type:result.type}); s.history=s.history.slice(-120); }
      const current=s.mastery[es]||0;
      const delta=result.correct ? V.mastery.gain(current,"recall",responseMs,0) : -V.mastery.loss(current,result.close);
      s.mastery[es]=V.mastery.clamp(current+delta);
      s.dueAt[es]=Date.now()+V.scheduler.nextDelay(s.mastery[es],result.correct,responseMs);
      V.store.study(); V.store.save();
    },
    dominantError(){ const e=V.store.state.errorTypes; return Object.entries(e).sort((a,b)=>b[1]-a[1])[0]||["none",0]; },
    tip(type){ const map={swap:"You usually know the word but reverse nearby letters. Slow down for one final spelling pass.",missing:"You tend to drop letters. Say the syllables as you type.",extra:"You add letters while sounding words out. Compare the sound with the written form after recall.",sub:"Most misses are one letter away. Short repeated recall is likely enough to fix this.",far:"Your misses are not close yet. More listening and recognition will help more than hard typing.",accent:"Your base spelling is strong. Clean up accent marks now.",order:"You know the pieces but scramble the order. Sentence Forge should be a priority.",none:"Practice a few phrases and VIVA will build a personal mistake profile."}; return map[type]||map.none; },
    averageRecall(es){ const a=V.store.state.responseTimes[es]||[]; return a.length?a.reduce((x,y)=>x+y,0)/a.length:null; }
  };
})(typeof globalThis!=="undefined"?globalThis:window);