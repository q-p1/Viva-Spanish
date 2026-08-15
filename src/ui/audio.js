(function(root){
  root.VIVA.audio={
    speak(text,slow=false){
      if(!('speechSynthesis' in root))return false;
      const V=root.VIVA,accent=V.world?.accents?.[V.store?.state?.settings?.accent]||{lang:'es-ES'};
      speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=accent.lang;u.rate=slow?.62:.86;
      const voices=speechSynthesis.getVoices();const lang=accent.lang.toLowerCase();u.voice=voices.find(v=>v.lang&&v.lang.toLowerCase()===lang)||voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith(lang.split('-')[0]))||null;
      speechSynthesis.speak(u);return true;
    }
  };
})(typeof globalThis!=='undefined'?globalThis:window);
