export default class unloadEvent {

  constructor(callbackFunction) {
    this.callbackFunction = callbackFunction;
  }

  addDataBeforeUnload(e) {

    this.domContentLoaded(e);

    return true;
  }

  domContentLoaded(e) {
    alert('test');
    if(localStorage.hasOpenTabs<2)
    {
      this.callbackFunction(e, 'exitSession');
      localStorage.hasOpenTabs=0;
    }
    else
      localStorage.hasOpenTabs=(localStorage.hasOpenTabs*1 - 1)*1;
  }



}