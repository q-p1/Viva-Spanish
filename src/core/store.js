(function(root){
  const V = root.VIVA;
  const KEY = "viva_repo_v5";
  const DEFAULT = {
    view: "home", lesson: 0, lessonIndex: 0, phase: "teach", story: null, storyScene: 0,
    mastery: {}, seen: {}, errors: {}, errorTypes: {swap:0,missing:0,extra:0,sub:0,far:0,accent:0,order:0},
    responseTimes: {}, dueAt: {}, favorites: [], notes: {}, personal: [], history: [], reviewQueue: [], reviewPos: 0,
    attempts: 0, correct: 0, goal: 12, streak: 0, lastStudy: null, studyLog: {}, sessionStart: Date.now(),
    daily: {learn:false,review:false,listen:false,mission:false}, missionDone: [], buildIndex: 0, selected: [], conversation: [],
    settings: {autoAudio:true,strictAccents:false,captionFade:72,reducedMotion:false,coachIntensity:"balanced"},
    onboarding: {complete:false, name:"Dawi", native:"English", goal:"conversation"}
  };
  function clone(o){ return JSON.parse(JSON.stringify(o)); }
  let state;
  try { state = Object.assign(clone(DEFAULT), JSON.parse(localStorage.getItem(KEY) || "{}")); } catch(e){ state = clone(DEFAULT); }
  V.store = {
    state,
    defaults: DEFAULT,
    save(){ try { localStorage.setItem(KEY, JSON.stringify(state)); } catch(e){} V.bus.emit("state", state); },
    reset(){ try { localStorage.removeItem(KEY); } catch(e){} state = clone(DEFAULT); this.state = state; this.save(); },
    export(){ return JSON.stringify(state,null,2); },
    import(json){ const parsed = JSON.parse(json); state = Object.assign(clone(DEFAULT), parsed); this.state = state; this.save(); },
    today(){ return new Date().toISOString().slice(0,10); },
    study(){
      const t = this.today(), prev = state.lastStudy;
      if(prev !== t){
        if(prev){ const diff = Math.round((new Date(t+"T00:00:00") - new Date(prev+"T00:00:00"))/86400000); state.streak = diff === 1 ? Math.max(1,state.streak)+1 : 1; }
        else state.streak = 1;
        state.sessionStart = Date.now();
      }
      const mins = Math.max(1, Math.round((Date.now()-state.sessionStart)/60000));
      state.studyLog[t] = Math.max(state.studyLog[t] || 0, mins);
      state.lastStudy = t; this.save();
    }
  };
})(typeof globalThis !== "undefined" ? globalThis : window);