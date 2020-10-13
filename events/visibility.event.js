export default class visibilityEvent {

  constructor(callbackFunction, timeOutToCheckVisibility) {
    this.callbackFunction = callbackFunction;
    this.timeOutToCheckVisibility = timeOutToCheckVisibility;
  }

  get addListeners() {
    this.onVisibleElements;

    return true;
  }

  get onVisibleElements() {
    let listenerVisibilityElement = document.querySelectorAll('[data-analyzevisiable="true"]');
    let isEventVisibilityElement= {};

    for (let i=0; i<listenerVisibilityElement.length; i++) {
      isEventVisibilityElement[i]=false;
      listenerVisibilityElement[i].addEventListener('load',(e) => {
        window.setInterval(()=>{
          if(isEventVisibilityElement[i]==false && this.elementInViewport(listenerVisibilityElement[i]) && this.elementVisible(listenerVisibilityElement[i]) && localStorage.listnearBackGroundEvent)
          {
            isEventVisibilityElement[i] = true;
            this.callbackFunction(e, 'onVisible');
          }
          else if (isEventVisibilityElement[i]==true  && !(this.elementInViewport(listenerVisibilityElement[i]) && this.elementVisible(listenerVisibilityElement[i])))
          {
            isEventVisibilityElement[i] = false;
          }
        }, this.timeOutToCheckVisibility);
      });
    }
  }

  elementInViewport(element) {
    let top = element.offsetTop;
    let left = element.offsetLeft;
    let width = element.offsetWidth;
    let height = element.offsetHeight;

    while(element.offsetParent) {
      element = element.offsetParent;
      top += element.offsetTop;
      left += element.offsetLeft;
    }

    return (
      top >= window.pageYOffset &&
      left >= window.pageXOffset &&
        (top + height) <= (window.pageYOffset + window.innerHeight) &&
        (left + width) <= (window.pageXOffset + window.innerWidth)
    );
  }

  elementVisible(element) {
    if (!(element instanceof Element)) throw Error('DomUtil: elem is not an element.');
    const style = getComputedStyle(element);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (element.offsetWidth + element.offsetHeight + element.getBoundingClientRect().height +
        element.getBoundingClientRect().width === 0) {
      return false;
    }
    const elemCenter   = {
      x: element.getBoundingClientRect().left + element.offsetWidth / 2,
      y: element.getBoundingClientRect().top + element.offsetHeight / 2,
    };
    if (elemCenter.x < 0) return false;
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elemCenter.y < 0) return false;
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
      if (pointContainer === element) return true;
    } while (pointContainer = pointContainer.parentNode);
    return false;
  }

}
