(function(root){
  const V = root.VIVA = root.VIVA || {};
  V.version = "0.7.0";
  V.bus = {
    listeners: {},
    on(name, fn){ (this.listeners[name] ||= []).push(fn); },
    emit(name, payload){ (this.listeners[name] || []).forEach(fn => fn(payload)); }
  };
})(typeof globalThis !== "undefined" ? globalThis : window);