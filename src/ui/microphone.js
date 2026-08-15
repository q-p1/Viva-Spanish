(function(root){
  const V=root.VIVA;
  V.microphone={
    async recordOnce(maxMs=7000){
      if(!navigator.mediaDevices?.getUserMedia || !root.MediaRecorder) throw new Error("recording-unavailable");
      const stream=await navigator.mediaDevices.getUserMedia({audio:true}); const chunks=[]; const rec=new MediaRecorder(stream);
      return new Promise((resolve,reject)=>{
        const timer=setTimeout(()=>{ if(rec.state!=="inactive") rec.stop(); },maxMs);
        rec.ondataavailable=e=>chunks.push(e.data);
        rec.onerror=e=>{ clearTimeout(timer); stream.getTracks().forEach(t=>t.stop()); reject(e); };
        rec.onstop=()=>{ clearTimeout(timer); stream.getTracks().forEach(t=>t.stop()); const blob=new Blob(chunks,{type:rec.mimeType||"audio/webm"}); resolve(URL.createObjectURL(blob)); };
        rec.start();
      });
    },
    recognizeSpanish(){
      const R=root.SpeechRecognition||root.webkitSpeechRecognition; if(!R) return Promise.reject(new Error("recognition-unavailable"));
      return new Promise((resolve,reject)=>{ const r=new R(); r.lang="es-ES"; r.interimResults=false; r.maxAlternatives=3; r.onresult=e=>resolve(e.results[0][0].transcript); r.onerror=reject; r.start(); });
    }
  };
})(typeof globalThis!=="undefined"?globalThis:window);