(function(root,factory){
  const api=factory(); if(typeof module==='object'&&module.exports) module.exports=api; else root.VIVA.repair=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function plan(es,errorType='far'){
    const base=[
      {mode:'listen',label:'Hear it',prompt:'Listen before seeing the phrase.'},
      {mode:'recognize',label:'Recognize it',prompt:'Pick the meaning from context.'},
      {mode:'recall',label:'Type it',prompt:'Recall the phrase from memory.'},
      {mode:'build',label:'Build with it',prompt:'Use the phrase as part of a sentence.'},
      {mode:'mission',label:'Use it',prompt:'Use it inside a real-life situation.'}
    ];
    if(errorType==='order')return [base[3],base[1],base[2],base[4],base[0]];
    if(errorType==='far')return [base[0],base[1],base[2],base[3],base[4]];
    return [base[2],base[0],base[3],base[1],base[4]];
  }
  function title(type){return ({swap:'Swapped-letter repair',missing:'Missing-letter repair',extra:'Extra-letter repair',sub:'Near-spelling repair',order:'Word-order repair',accent:'Accent repair',far:'Memory rebuild'})[type]||'Memory repair';}
  return {plan,title};
});
