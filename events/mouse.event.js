export default class mouseEvent {

  constructor(callbackFunction) {
    this.callbackFunction = callbackFunction;
  }

  get addListeners() {

    this.auxclick;
    this.click;

    return true;
  }

  get auxclick() {
    document.addEventListener('auxclick', (e) => {
      if (this.checkIHaveDataAnalyzeAttribute(e))
        this.callbackFunction(e, 'middleButtonClick');
    }, false);
  }

  get click() {
    document.addEventListener('click', (e) => {
      if (this.checkIHaveDataAnalyzeAttribute(e))
        this.callbackFunction(e, 'leftButtonClick');
    }, false);
  }

  checkIHaveDataAnalyzeAttribute(e) {
    let dataElementPath = e.path;
    if(!dataElementPath)
      dataElementPath = e.composedPath ;
    for(let i=0; i<dataElementPath.length-3; i++) {
      if(dataElementPath[i].getAttribute('data-analyze'))
        return true;
    }
    return false;
  }

}
