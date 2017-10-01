export function addWrapper (htmlData, params) {
  var bodyStyle = 'font-family:' + params.font + ' !important; font-size: ' + params.font_size + ' !important; width:100%;'
  return '<div style="' + bodyStyle + '">' + htmlData + '</div>'
}

export function capitalizePrint (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function collectStyles (element, params) {
  var win = document.defaultView || window

  var style = []

  // String variable to hold styling for each element
  var elementStyle = ''

  if (win.getComputedStyle) { // modern browsers
    style = win.getComputedStyle(element, '')

    // Styles including
    var targetStyles = ['border', 'float', 'box', 'break', 'text-decoration']

    // Exact match
    var targetStyle = ['clear', 'display', 'width', 'min-width', 'height', 'min-height', 'max-height']

    // Optional - include margin and padding
    if (params.honorMarginPadding) {
      targetStyles.push('margin', 'padding')
    }

    // Optional - include color
    if (params.honorColor) {
      targetStyles.push('color')
    }

    for (var i = 0; i < style.length; i++) {
      for (var s = 0; s < targetStyle.length; s++) {
        if (style[i].indexOf(targetStyles[s]) !== -1 || style[i].indexOf(targetStyle[s]) === 0) {
          elementStyle += style[i] + ':' + style.getPropertyValue(style[i]) + ';'
        }
      }
    }
  } else if (element.currentStyle) { // IE
    style = element.currentStyle

    for (var name in style) {
      if (style.indexOf('border') !== -1 && style.indexOf('color') !== -1) {
        elementStyle += name + ':' + style[name] + ';'
      }
    }
  }

  // Print friendly defaults
  elementStyle += 'max-width: ' + params.maxWidth + 'px !important;' + params.font_size + ' !important;'

  return elementStyle
}

export function loopNodesCollectStyles (elements, params) {
  for (var n = 0; n < elements.length; n++) {
    var currentElement = elements[n]

    // Form Printing - check if is element Input
    var tag = currentElement.tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
      // Save style to variable
      var textStyle = collectStyles(currentElement, params)

      // Remove INPUT element and insert a text node
      var parent = currentElement.parentNode

      // Get text value
      var textNode = tag === 'SELECT'
                ? document.createTextNode(currentElement.options[currentElement.selectedIndex].text)
                : document.createTextNode(currentElement.value)

      // Create text element
      var textElement = document.createElement('div')
      textElement.appendChild(textNode)

      // Add style to text
      textElement.setAttribute('style', textStyle)

      // Add text
      parent.appendChild(textElement)

      // Remove input
      parent.removeChild(currentElement)
    } else {
      // Get all styling for print element
      currentElement.setAttribute('style', collectStyles(currentElement, params))
    }

    // Check if more elements in tree
    var children = currentElement.children

    if (children && children.length) {
      loopNodesCollectStyles(children, params)
    }
  }
}

export function addHeader (printElement, header) {
  // Create header element
  var headerElement = document.createElement('h1')

  // Create header text node
  var headerNode = document.createTextNode(header)

  // Build and style
  headerElement.appendChild(headerNode)
  headerElement.setAttribute('style', 'font-weight:300;')

  printElement.insertBefore(headerElement, printElement.childNodes[0])
}
