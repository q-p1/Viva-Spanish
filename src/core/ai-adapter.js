(function(root){
  const V=root.VIVA;
  async function call(payload){
    const endpoint=V.store.state.settings.aiEndpoint;
    if(!endpoint) return null;
    const res=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
    if(!res.ok)throw new Error('ai-provider-failed'); return res.json();
  }
  const localNpc={
    mateo:['Perfecto. ¿Algo más?','Vale. ¿Con leche?','Claro. La cuenta cuando quieras.'],
    lucia:['Vale, te entiendo.','¿Y tú?','Poco a poco. Hablas mejor cada día.'],
    elena:['Entiendo. ¿Cómo te llamas?','Vale, necesito un poco más de información.','Perfecto, gracias.'],
    dani:['¡Bien! ¿Jugamos?','Claro. Nos vemos luego.','Qué bien.']
  };
  V.ai={
    async reply({npc,userText,scene,memory,level}){
      try{const remote=await call({type:'conversation',npc,userText,scene,memory,level});if(remote?.reply)return remote.reply;}catch(e){}
      const key=(npc||'').toLowerCase(); const pool=localNpc[key]||['Vale. Cuéntame más.','Entiendo.','Perfecto.'];
      const n=(memory?.turns||0)%pool.length; return pool[n];
    },
    async scanImage(image){try{return await call({type:'scan',image});}catch(e){return null;}},
    async generateAdventure(context){try{return await call({type:'adventure',context});}catch(e){return null;}},
    provider(){return V.store.state.settings.aiEndpoint?'remote':'local-fallback';}
  };
})(typeof globalThis!=='undefined'?globalThis:window);
