(function(root,factory){ const api=factory(); if(typeof module==="object"&&module.exports) module.exports=api; else root.VIVA.mastery=api; })(typeof globalThis!=="undefined"?globalThis:this,function(){
  function gain(current, mode, responseMs, hints=0){
    const base = mode==="recall" ? 22 : mode==="listen" ? 14 : mode==="mission" ? 18 : 10;
    const speed = responseMs < 4500 ? 1.15 : responseMs > 12000 ? .78 : 1;
    const hintPenalty = Math.max(.55, 1-hints*.16);
    const saturation = Math.max(.35,1-current/135);
    return Math.max(4,Math.round(base*speed*hintPenalty*saturation));
  }
  function loss(current, close){ return Math.max(2,Math.round((close?4:7)*(current>75?1.2:1))); }
  function clamp(v){ return Math.max(0,Math.min(100,Math.round(v))); }
  return {gain,loss,clamp};
});