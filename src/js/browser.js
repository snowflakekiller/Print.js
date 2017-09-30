const Browser = {
  // Firefox 1.0+
  isFirefox: function () {
    return typeof InstallTrigger !== 'undefined'
  },
  // Internet Explorer 6-11
  isIE: function () {
    return !!document.documentMode
  },
  // Edge 20+
  isEdge: function () {
    return !Browser.isIE() && !!window.StyleMedia
  },
  // Chrome 1+
  isChrome: function () {
    return !!window.chrome && !!window.chrome.webstore
  },
  // At least Safari 3+: "[object HTMLElementConstructor]"
  isSafari: function () {
    return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 ||
        navigator.userAgent.toLowerCase().indexOf('safari') !== -1
  }
}

export default Browser
