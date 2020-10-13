export default class mouseEvent {

  constructor(callbackFunction) {
    this.callbackFunction = callbackFunction;


  }

  get addListeners() {
 
    return true;
  }



  get touchstart() {
    document.addEventListener('touchstart', (e) => {
      if(this.checkIHaveDataAnalyzeAttribute(e))
      {
        let touchPositionX={};
        let touchPositionY={};

        let touches = e.changedTouches;

        let touchmove = false;
        let longTouch = false;

        let objectE = e;

        for (let i = 0; i < touches.length; i++) {
          touchPositionX[i] = touches[i].pageX;
          touchPositionY[i] = touches[i].pageY;
        }

        document.addEventListener('touchmove', (e1)=>{
          touches = e1.changedTouches;
          for (let i = 0; i < touches.length; i++) {
            if((touchPositionX[i] + 5 < touches[i].pageX || touchPositionX[i] - 5 > touches[i].pageX) && (touchPositionY[i] + 5 < touches[i].pageY || touchPositionY[i] - 5 > touches[i].pageY))
            {
              touchmove=true;
              return false;
            }
          }
        }, false);

        document.addEventListener('touchcancel', (e)=>{
          setTimeout(()=>{ if(!touchmove && !longTouch)
          {
            this.callbackFunction(objectE, 'touchClick');
          }
          }, 5);
        }, false);

        document.addEventListener('touchend', (e)=>{
          setTimeout(()=>{ if(!touchmove && !longTouch)
          {
            this.callbackFunction(objectE, 'touchClick');
          }
          }, 5);
        }, false);
        setTimeout(()=>{ longTouch=true; }, 250);
      }
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
