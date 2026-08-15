(function(root){
  root.VIVA.audio={
    speak(text,slow=false){
      if(!("speechSynthesis" in root)) return false;
      speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang="es-ES"; u.rate=slow?.62:.86;
      const voices=speechSynthesis.getVoices(); u.voice=voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith("es-es"))||voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith("es"))||null;
      speechSynthesis.speak(u); return true;
    }
  };
})(typeof globalThis!=="undefined"?globalThis:window);