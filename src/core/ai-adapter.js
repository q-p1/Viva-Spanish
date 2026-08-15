(function(root){
  const V=root.VIVA;
  function endpoint(){return (V.store.state.settings.aiEndpoint||'').replace(/\/$/,'');}
  async function call(payload){
    const url=endpoint();if(!url)return null;
    const res=await fetch(url,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
    if(!res.ok){const e=new Error('ai-provider-failed');e.status=res.status;throw e;}return res.json();
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
      const key=(npc||'').toLowerCase(),pool=localNpc[key]||['Vale. Cuéntame más.','Entiendo.','Perfecto.'];return pool[(memory?.turns||0)%pool.length];
    },
    async scanImage(image,mimeType){try{return await call({type:'scan',image,mimeType});}catch(e){return null;}},
    async generateAdventure(context){try{return await call({type:'adventure',context});}catch(e){return null;}},
    async transcribeAudio(audio,language='es'){try{return await call({type:'transcription',audio,language});}catch(e){return null;}},
    async status(){try{return await call({type:'status'});}catch(e){return null;}},
    provider(){return endpoint()?'multi-provider-gateway':'local-fallback';}
  };
})(typeof globalThis!=='undefined'?globalThis:window);
