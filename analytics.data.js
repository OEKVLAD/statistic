import Cookies from 'js-cookie';

const format = require('date-format');

export default class AnalyticsData {
  constructor() {
    this.data = null;

    this.dataElementPath=null;
    this.eventType = null;

    this.customersId = null;

    this.itemLevel1=0;
    this.itemLevel2=0;
    this.itemLevel3=0;

    this.targetUrl=0;

    this.savedData={};

    this.savedDataIndex=0;
    this.eventName=null;

  }

  set setEventName(eventName) {
    this.eventName = eventName;
  }

  get clearDataForSingleRecord() {
    this.data = null;

    this.dataElementPath=null;
    this.eventType = null;

    this.itemLevel1=0;
    this.itemLevel2=0;
    this.itemLevel3=0;

    this.targetUrl=0;
  }

  set setData(data) {
    this.data = data;
    this.dataElementPath=data.path;
    if(!this.dataElementPath)
      this.dataElementPath = data.composedPath;
    this.eventType = this.eventName?this.eventName:data.type;
  }

  get convertDataToObject() {
    for(let i=this.dataElementPath.length-3; i>=0; i--)
    {
      if (this.dataElementPath[i].getAttribute('href'))
        this.targetUrl = this.dataElementPath[i].getAttribute('href');
      if(!this.itemLevel1 && !this.itemLevel2 && !this.itemLevel3)
      {
        this.itemLevel1 = this.dataElementPath[i].getAttribute('data-analyze');
      }
      else if(this.itemLevel1!=this.dataElementPath[i].getAttribute('data-analyze') && !this.itemLevel2 && !this.itemLevel3)
      {
        this.itemLevel2 = this.dataElementPath[i].getAttribute('data-analyze');
      }
      else if(this.itemLevel1!=this.dataElementPath[i].getAttribute('data-analyze') && this.itemLevel2!=this.dataElementPath[i].getAttribute('data-analyze') && !this.itemLevel3)
      {
        this.itemLevel3 = this.dataElementPath[i].getAttribute('data-analyze');
      }
    }
  }

  get clear() {
    this.data = null;

    this.dataElementPath=null;
    this.eventType = null;

    this.customersId = null;

    this.itemLevel1=0;
    this.itemLevel2=0;
    this.itemLevel3=0;

    this.targetUrl=0;

    this.savedData={};

    this.savedDataIndex=0;
  }

  get getDateNow() {
    return format('yy-MM-dd  hh:mm:ss', new Date());
  }

  get getClientId() {
    if(!this.clientId)
    {
      let _ga = Cookies.get(encodeURIComponent('_ga'));

      if(!_ga && !Cookies.get(encodeURIComponent('_random_ga')))
      {
        let _random_ga = ('0000000000.'+ (1000000000 + Math.floor((99999999 - 10000000) * Math.random())));
        Cookies.set(encodeURIComponent('_random_ga'), _random_ga, 100);
      }
      else if (_ga) {
        let  client_id = _ga.split('.');
        client_id = client_id[2]+'.'+client_id[3];
        this.clientId = client_id;
      }
      return this.clientId?this.clientId:Cookies.get(encodeURIComponent('_random_ga'));
    }
    else {
      return this.clientId;
    }
  }

  get saveData() {
    let data = {};

    data['customersId'] = this.getClientId;
    data['Date'] = this.getDateNow;
    data['sourceUrl'] = this.replaceSpecialPolishChars(location.pathname);
    data['item-level-1'] = this.replaceSpecialPolishChars(this.itemLevel1);
    data['item-level-2'] = this.replaceSpecialPolishChars(this.itemLevel2);
    data['item-level-3'] = this.replaceSpecialPolishChars(this.itemLevel3);
    data['action'] = this.replaceSpecialPolishChars(this.eventType);
    data['targetUrl'] = this.replaceSpecialPolishChars(this.targetUrl);

    this.savedData[this.savedDataIndex] = data;
    this.savedDataIndex++;
    this.createEventAddNewData;
  }

  get createEventAddNewData() {
    let getDataLength = this.getDataLength;
    let newEvent = new  CustomEvent('AddNewDataToUserLog', {
      'detail': getDataLength,
    });
    document.dispatchEvent(newEvent);
  }

  get getData() {
    return this.savedData;
  }

  get getDataLength() {
    return this.savedDataIndex;
  }

  replaceSpecialPolishChars( varr ) {
    let polishHtmlCodes = [
      'a', // ą
      'c', // ć
      'e', // ę
      'l', // ł
      'n', // ń
      'o', // ó
      's', // ś
      'z', // ź
      'z', // ż
      'A', // Ą
      'C', // Ć
      'E', // Ę
      'L', // Ł
      'N', // Ń
      'O', // Ó
      'S', // Ś
      'Z', // Ż
      'Z', // Ż
    ];

    let specialChars = [
      'ą', //  &#261;
      'ć', //  &#263;
      'ę', //  &#281;
      'ł', //  &#322;
      'ń', //  &#322;
      'ó', //  &#243;
      'ś', //  &#347;
      'ź', //  &#378;
      'ż', //  &#380;
      'Ą', //  &#260;
      'Ć', //  &#262;
      'Ę', //  &#280;
      'Ł', //  &#321;
      'Ń', //  &#323;
      'Ó', //  &#211;
      'Ś', //  &#346;
      'Ż', //  &#377;
      'Ż', //  &#379;
    ];

    for (let i=0; i<polishHtmlCodes.length; i++)
    {
      varr = this.replaceAll(varr, specialChars[i].toString(), polishHtmlCodes[i].toString());
    }

    return varr;

  }

  replaceAll(str, find, replace) {
    if(str && str.length>0)
      return str.replace(new RegExp(find, 'g'), replace);
    return '';
  }
}

