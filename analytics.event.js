import onloadEvent from './events/onload.event.js';
import mouseEvent from './events/mouse.event.js';
import visibilityEvent from './events/visibility.event.js';
import touchEvent from './events/touch.event.js';
import unloadEvent from './events/unload.event.js';

export default class AnalyticsEvent {
  constructor() {
    this.callbackFunction = null;
    this.saveDataFunction = null;
    this.maxRequestInPackage = null;

    this.dataLength = null
    this.timeOutToSync = 30000;

    this.backGroundEvent = true;
  }

  set setCallbackFunction(callbackFunction) {
    this.callbackFunction = callbackFunction;
  }
  set setSaveDataFunction(saveDataFunction) {
    this.saveDataFunction = saveDataFunction;
  }
  set setMaxRequestInPackage(maxRequestInPackage) {
    this.maxRequestInPackage = maxRequestInPackage;
  }

  set setDataLength(dataLength) {
    this.dataLength = dataLength;
  }
  set setTimeOutToSync(timeOutToSync) {
    this.timeOutToSync = timeOutToSync;
  }

  get addListeners() {

    let onload = new onloadEvent(this.callbackFunction,300000 ,1800000);
    onload.addListeners;

    let mouse = new mouseEvent(this.callbackFunction);
    mouse.addListeners;

    let visibility = new visibilityEvent(this.callbackFunction, 100);
    visibility.addListeners;

    let touch = new touchEvent(this.callbackFunction);
    touch.addListeners;

  }

  saveAllData() {

    let unload = new unloadEvent(this.callbackFunction);

    document.addEventListener('AddNewDataToUserLog', (e)=> {
      this.dataLength = e.detail;
      if( e.detail > this.maxRequestInPackage )
        this.saveDataFunction()
    }, false);

    //interval to save all log info
    window.setInterval(() => {
      if(this.dataLength>0) {
        this.saveDataFunction();
      }
    } , this.timeOutToSync);

    //event before user leave this page
    window.onbeforeunload = (e)=> {
      if(this.dataLength>0)
      {
        unload.addDataBeforeUnload(e)

        this.saveDataFunction();
        try {
          waitJS();
        }
        catch{
          return undefined;
        }
      }
    };

    // fix if browser don't want wait, for send data
    function waitJS() {
      return waitJS();
    }
  }
}
