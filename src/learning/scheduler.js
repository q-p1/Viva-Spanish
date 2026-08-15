(function(root,factory){
  const api=factory(); if(typeof module === "object" && module.exports) module.exports=api; else root.VIVA.scheduler=api;
})(typeof globalThis !== "undefined" ? globalThis : this,function(){
  function dueScore(item, mastery, errors, dueAt, now=Date.now()){
    const m=mastery[item]||0, e=errors[item]||0, due=dueAt[item]||0;
    const overdue = Math.max(0, now-due)/3600000;
    return (100-m)*1.2 + e*9 + Math.min(24,overdue);
  }
  function sortDue(items,state,now=Date.now()){
    return [...items].sort((a,b)=>dueScore(b,state.mastery,state.errors,state.dueAt,now)-dueScore(a,state.mastery,state.errors,state.dueAt,now));
  }
  function nextDelay(mastery, correct, responseMs=6000){
    if(!correct) return 3*60*1000;
    const speed = responseMs < 4000 ? 1.3 : responseMs > 10000 ? .75 : 1;
    const hours = mastery<30 ? 1 : mastery<55 ? 8 : mastery<75 ? 24 : mastery<90 ? 72 : 168;
    return hours*3600000*speed;
  }
  return {dueScore,sortDue,nextDelay};
});