(function(root){
  const V=root.VIVA;
  async function recordBlob(maxMs=7000){
    if(!navigator.mediaDevices?.getUserMedia||!root.MediaRecorder)throw new Error('recording-unavailable');
    const stream=await navigator.mediaDevices.getUserMedia({audio:true}),chunks=[],rec=new MediaRecorder(stream);
    return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{if(rec.state!=='inactive')rec.stop();},maxMs);rec.ondataavailable=e=>chunks.push(e.data);rec.onerror=e=>{clearTimeout(timer);stream.getTracks().forEach(t=>t.stop());reject(e);};rec.onstop=()=>{clearTimeout(timer);stream.getTracks().forEach(t=>t.stop());resolve(new Blob(chunks,{type:rec.mimeType||'audio/webm'}));};rec.start();});
  }
  function blobToDataUrl(blob){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(blob);});}
  function browserRecognize(){
    const R=root.SpeechRecognition||root.webkitSpeechRecognition;if(!R)return Promise.reject(new Error('recognition-unavailable'));
    return new Promise((resolve,reject)=>{const r=new R(),accent=V.world?.accents?.[V.store.state.settings.accent]||{lang:'es-ES'};r.lang=accent.lang;r.interimResults=false;r.maxAlternatives=3;r.onresult=e=>resolve(e.results[0][0].transcript);r.onerror=reject;r.start();});
  }
  V.microphone={
    async recordBlobOnce(maxMs=7000){return recordBlob(maxMs);},
    async recordOnce(maxMs=7000){return URL.createObjectURL(await recordBlob(maxMs));},
    async recognizeSpanish(){
      if(V.store.state.settings.aiEndpoint){
        try{const blob=await recordBlob(6500),data=await blobToDataUrl(blob),out=await V.ai.transcribeAudio(data,'es');if(out?.text)return out.text;}catch(e){}
      }
      return browserRecognize();
    },
    async transcribeSpanish(maxMs=6500){
      if(V.store.state.settings.aiEndpoint){
        try{const blob=await recordBlob(maxMs),data=await blobToDataUrl(blob),out=await V.ai.transcribeAudio(data,'es');if(out?.text)return {text:out.text,provider:out.provider||'ai'};}catch(e){}
      }
      return {text:await browserRecognize(),provider:'browser'};
    }
  };
})(typeof globalThis!=='undefined'?globalThis:window);
