// @flow

import { connectWebsocket } from './detect_changes_websocket.js'

async function init () {
  if (isLocalhost(window.location.hostname)) {
    connectWebsocket((filename) => handleCodeChange(animation, filename))
  }
}

function handleCodeChange (shaderAnimation, filename) {
  if (filename.endsWith('.frag')) {
    const select = getShaderSelectElement()
    setSelectedOption(select, filename)
    selectFragmentShader(shaderAnimation, select)
  } else {
    window.location.reload(true)
  }
}

function isLocalhost (hostname) {
  return hostname === '0.0.0.0' || hostname === 'localhost' || hostname === '127.0.0.1'
}
