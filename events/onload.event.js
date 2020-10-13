export default class onloadEvent {

  constructor(callbackFunction,timeOut, timeOutSesion) {
    this.callbackFunction = callbackFunction;
    this.timeOut = timeOut;
    this.noInteration = null;
    this.eventNoINteraction =null;
    this.timeOutSesion = timeOutSesion;
    this.noInterationSession=null;
  }

  get addListeners() {

    this.domContentLoaded;
    this.newLoadedPage;
    this.checkWhenUserDontInteract;

    return true;
  }

  get domContentLoaded() {
    document.addEventListener('DOMContentLoaded', (e) =>{
      this.eventNoINteraction = e;
      localStorage.hasOpenTabs = (localStorage.hasOpenTabs*1 + 1)*1;
    });
  }

  get newLoadedPage() {
    document.addEventListener('DOMContentLoaded', (e) =>{
      if (!('hasCodeRunBefore' in localStorage) || localStorage.hasOpenTabs == 0)
      {
        this.callbackFunction(e,'startSession');
        localStorage.hasCodeRunBefore = true;
        localStorage.hasOpenTabs = 1;
      }
    });
  }

  get checkWhenUserDontInteract() {
    window.onload = (e) => {
      this.noInterationEvent(e);
      this.noInterationSessionEvent(e);
    };

    window.onmousemove = (e)=> { this.noInterationEvent(e);  this.noInterationSessionEvent(e);};
    window.addEventListener('touchstart', (e) => { this.noInterationEvent(e);  this.noInterationSessionEvent(e);});
    window.addEventListener('keydown', (e) => {  this.noInterationEvent(e);  this.noInterationSessionEvent(e);});
    window.addEventListener('scroll',  (e) =>  {  this.noInterationEvent(e);  this.noInterationSessionEvent(e);});
    window.addEventListener('mouseenter', (e) => { this.noInterationEvent(e);  this.noInterationSessionEvent(e);});
  }

  noInterationEvent(e) {
    localStorage.listnearBackGroundEvent = true;
    clearTimeout(this.noInteration);
    this.noInteration = window.setTimeout(
      () => {
        localStorage.listnearBackGroundEvent = false;
        this.callbackFunction(this.eventNoINteraction,`user_no_interaction_${this.timeOut/60000}_minutes`);
      }, this.timeOut);
  }

  noInterationSessionEvent(e) {
    localStorage.listnearBackGroundEvent = true;
    clearTimeout(this.noInterationSession);
    this.noInterationSession = window.setTimeout(
      () => {
        localStorage.listnearBackGroundEvent = false;
        this.callbackFunction(this.eventNoINteraction,`session_timeout_${ this.timeOutSesion/60000}_minutes`);
      }, this.timeOutSesion);
  }

}
