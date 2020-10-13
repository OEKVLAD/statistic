export default class AnalyticsSave {
  constructor(requestName) {
    this.data=null;
    this.requestName=requestName;
  }

  get send() {
    let http = new XMLHttpRequest();
    http.open('POST', this.requestName, true);
    http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    http.onreadystatechange = function() {
      if (http.readyState == 4) {
        if (http.status === 200) {
          // xhr success
        }
        else {
          // xhr error;
        }
      }
    };
    http.send(this.data);
  }

  get sendData(){
    // use 16byte array or 32
    let type = this.data.dictionarySize > 65535 ? 'Uint32Array' : 'Uint16Array',
      count = this.data.length,
      buffer = new ArrayBuffer((count+2) * window[type].BYTES_PER_ELEMENT),
      // by first byte check array
      bufferBase = new Uint8Array(buffer, 0, 1),
      // for fast backend send a size for dictionary lwc
      bufferDictSize = new window[type](buffer, window[type].BYTES_PER_ELEMENT, 1),
      bufferData = new window[type](buffer, window[type].BYTES_PER_ELEMENT*2, count);

    bufferBase[0] = type === 'Uint32Array' ? 32 : 16; // save a type for array
    bufferDictSize[0] = this.data.dictionarySize; // save size for dictionary LZW
    bufferData.set(this.data); // save date

    this.data = new Blob([buffer]); // wrap ArrayBuffer in Blob for send XHR

    this.send;

    return false;
  }

  set setData(data) {
    this.data = data;
  }

  get clear() {
    this.data = 0;
  }
}