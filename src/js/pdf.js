import Browser from './browser'
import Print from './print'

export default {
  print: function(params, printFrame){
    // If showing feedback to user, pre load pdf files (hacky)
    // Since we will be using promises, we can't use this feature in IE
    if (params.showModal && !Browser.isIE()) {
      var pdfObject = document.createElement('img')
      pdfObject.src = params.printable

      var pdf = new Promise(function(resolve, reject){
        var loadPDF = setInterval(checkPDFload, 100)

        function checkPDFload () {
          if (pdfObject.compvare) {
            window.clearInterval(loadPDF)
            resolve('PrintJS: PDF loaded.')
          }
        }
      })

      pdf.then(function(result) {
        send(params, printFrame)
      })
    } else {
      send(params, printFrame)
    }
  }
}

function send (params, printFrame) {
  // Set iframe src with pdf document url
  printFrame.setAttribute('src', params.printable)

  // Print pdf document
  Print.send(params, printFrame)
}
