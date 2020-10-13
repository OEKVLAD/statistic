export default class AnalyticsCompress {
  constructor() {
    this.uncompressed = null;
    this.compressed = null;
  }

  set setUncompressed(uncompressed) {
    this.uncompressed = JSON.stringify(uncompressed);
  }

  get clearCompressed() {
    this.uncompressed = null;
    this.compressed = null;
  }

  get getCompressed() {
    return this.compressed;
  }

  get compress() {
    'use strict';

    var i, l,
      dictionary = {},
      w = '', k, wk,
      result = [],
      dictSize = 256;

    // initial dictionary
    for (i = 0; i < dictSize; i++) {
      dictionary[String.fromCharCode(i)] = i;
    }

    for (i = 0, l = this.uncompressed.length; i < l; i++) {
      k = this.uncompressed.charAt(i);
      wk = w + k;
      if (dictionary.hasOwnProperty(wk)) {
        w = wk;
      }
      else {
        result.push(dictionary[w]);
        dictionary[wk] = dictSize++;
        w = k;
      }
    }

    if (w !== '') {
      result.push(dictionary[w]);
    }

    result.dictionarySize = dictSize;

    this.compressed = result;
  }
}