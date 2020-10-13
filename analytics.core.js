import AnalyticsCompress from './analytics.compress.js';
import AnalyticsEvent from './analytics.event.js';
import AnalyticsData from './analytics.data.js';
import AnalyticsSave from './analytics.save.js';

let compress = new AnalyticsCompress();
let data = new AnalyticsData();
let save = new AnalyticsSave('/get_analitics_data');
let event = new AnalyticsEvent();

class AnalyticsCore {
  constructor() {

  }

  get init() {
    event.setCallbackFunction = this.callbackEvent;
    event.setSaveDataFunction = this.saveData;
    event.setMaxRequestInPackage = 20;
    event.setTimeOutToSync = 30000;

    event.addListeners;
    event.saveAllData();
  }

  callbackEvent(e, eventName=null) {
    data.clearDataForSingleRecord;
    data.setEventName = eventName;
    data.setData = e;
    data.convertDataToObject;
    data.saveData;
  }
  
  saveData() {
    event.setDataLength = 0;

    console.log(data.getData);

    compress.setUncompressed = data.getData;
    data.clear;

    compress.compress;

    save.setData = compress.getCompressed;
    compress.clearCompressed;

    save.sendData;
    save.clear;
  }

}

let core = new AnalyticsCore();
core.init;
