(function(root,factory){
  const api=factory();
  if(typeof module === "object" && module.exports) module.exports=api;
  else { root.VIVA = root.VIVA || {}; root.VIVA.answerAnalyzer=api; }
})(typeof globalThis !== "undefined" ? globalThis : this,function(){
  function normalize(s, keepAccents=false){
    let x=(s||"").toLowerCase().trim().replace(/[¡!¿?.,;:]/g,"").replace(/\s+/g," ");
    return keepAccents ? x : x.normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  }
  function distance(a,b){
    const d=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));
    for(let i=0;i<=a.length;i++) d[i][0]=i; for(let j=0;j<=b.length;j++) d[0][j]=j;
    for(let i=1;i<=a.length;i++) for(let j=1;j<=b.length;j++) d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
    return d[a.length][b.length];
  }
  function isAdjacentSwap(g,a){ if(g.length!==a.length) return false; for(let i=0;i<g.length-1;i++){ const x=g.split(""); [x[i],x[i+1]]=[x[i+1],x[i]]; if(x.join("")===a) return true; } return false; }
  function analyze(given, answer, options={}){
    const g=normalize(given), a=normalize(answer), ga=normalize(given,true), aa=normalize(answer,true);
    if(!g) return {correct:false,close:false,type:"empty",title:"Give it a try.",message:"Even a rough attempt lets VIVA coach the mistake."};
    if(ga===aa) return {correct:true,type:"exact",title:"Perfect.",message:"Exact recall."};
    if(g===a){
      if(options.strictAccents) return {correct:false,close:true,type:"accent",title:"Almost perfect.",message:"Every letter is right. Add the accent mark."};
      return {correct:true,type:"accent",title:"Correct.",message:"The letters are right. Notice the accent mark for next time."};
    }
    if(isAdjacentSwap(g,a)) return {correct:false,close:true,type:"swap",title:"Very close.",message:"Two nearby letters are switched. Try swapping them."};
    const d=distance(g,a);
    if(a.length-g.length===1 && d===1) return {correct:false,close:true,type:"missing",title:"Almost.",message:"You are missing one letter."};
    if(g.length-a.length===1 && d===1) return {correct:false,close:true,type:"extra",title:"Almost.",message:"There is one extra letter."};
    if(d===1) return {correct:false,close:true,type:"sub",title:"One tiny change.",message:"Only one letter is wrong. Try a different letter there."};
    if(g.split(" ").sort().join("|")===a.split(" ").sort().join("|")) return {correct:false,close:true,type:"order",title:"Right words.",message:"The word order is wrong. Rearrange them."};
    if(d<=Math.max(2,Math.floor(a.length*.22))) return {correct:false,close:true,type:"sub",title:"That is close.",message:"Keep most of what you typed and adjust one or two letters."};
    return {correct:false,close:false,type:"far",title:"Not yet.",message:"Listen once, say it aloud, then try again."};
  }
  return {normalize,distance,isAdjacentSwap,analyze};
});