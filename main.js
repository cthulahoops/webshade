// @flow

import { connectWebsocket } from './detect_changes_websocket.js'

async function init () {
  const anchorText = window.location.hash.substr(1)
  const select = getShaderSelectElement()

  const camera = new Camera(0, 1, 0)

  if (anchorText) {
    setSelectedOption(select, anchorText)
  }

  const canvas = document.getElementById('glscreen')
  if (!(canvas instanceof window.HTMLCanvasElement)) {
    throw Error("Canvas isn't a canvas")
  }

  const animation = new ShaderAnimation(canvas, camera)

  await selectFragmentShader(animation, select)

  animation.renderLoop()

  window.selectFragmentShader = (select) => selectFragmentShader(animation, select)
  window.refetchCode = () => refetchCode(animation)
  window.textareaUpdated = () => textareaUpdated(animation)

  if (isLocalhost(window.location.hostname)) {
    connectWebsocket((filename) => handleCodeChange(animation, filename))
  }

  canvas.addEventListener('click', () => canvas.requestPointerLock())
  canvas.addEventListener('mousemove', (event) => camera.handleMouseMove(event))
  window.document.addEventListener('keydown', (event) => camera.handleKeyDown(event))
  window.document.addEventListener('keyup', (event) => camera.handleKeyUp(event))
  window.setInterval(() => camera.tick(), 50)
}



// window.onload = init

async function selectFragmentShader (shaderAnimation, select /*: HTMLSelectElement */) {
  const selectedProgram = select.selectedOptions[0].value

  window.location.hash = '#' + selectedProgram
  const shaderResponse = await window.fetch(selectedProgram)
  const shaderSource = await shaderResponse.text()

  getShaderSourceTextArea().value = shaderSource

  changeFragmentShader(shaderAnimation, shaderSource)
}

function changeFragmentShader (shaderAnimation, shaderSource) {
  const uniformContainer = getElementByIdTyped('uniforms', window.HTMLUListElement)
  const uniforms = extractUniforms(shaderSource)
  addUniformElements(uniformContainer, uniforms)
  shaderAnimation.updateFragmentShader(shaderSource, uniforms)
}

async function refetchCode (shaderAnimation) {
  await selectFragmentShader(
    shaderAnimation,
    getShaderSelectElement())
}

async function textareaUpdated (shaderAnimation) {
  console.log('Recompiling from textarea.')
  changeFragmentShader(shaderAnimation, getShaderSourceTextArea().value)
}

function addUniformElements (uniformContainer /* : HTMLDivElement */, uniforms) {
  while (uniformContainer.lastChild) {
    uniformContainer.removeChild(uniformContainer.lastChild)
  }

  for (const uniform of uniforms) {
    const element = uniformControlElement(uniform)
    uniformContainer.appendChild(element)
  }
}

function uniformControlElement (uniform) {
  const li = document.createElement('li')

  const label = document.createElement('label')
  label.textContent = uniform

  const input = document.createElement('input')
  input.id = uniform
  input.type = 'color'

  li.appendChild(label)
  li.appendChild(input)

  return li
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

function colorToVec (colorString /* : string */) /* : [number, number, number] */ {
  const r = parseInt('0x' + colorString.substr(1, 2))
  const g = parseInt('0x' + colorString.substr(3, 2))
  const b = parseInt('0x' + colorString.substr(5, 2))
  return [r / 255, g / 255, b / 255]
}

function extractUniforms (source) {
  const uniforms = []
  for (const line of source.split('\n')) {
    if (line.startsWith('uniform vec3')) {
      const uniformName = line.split(';')[0].split(' ')[2]
      if (uniformName.indexOf('COLOR') >= 0) {
        uniforms.push(uniformName)
      }
    }
  }
  return uniforms
}

function setSelectedOption (select /* : HTMLSelectElement */, value) {
  for (const option of select.options) {
    if (option.text === value) {
      option.selected = true
    }
  }
}

function getShaderSourceTextArea () /* HTMLTextAreaElement */ {
  return window.document.getElementById('shader_source')
}

function getShaderSelectElement () /* : HTMLSelectElement */ {
  return getElementByIdTyped('shader-selection', window.HTMLSelectElement)
}

function getFPSSpan () /* : HTMLSpanElement */ {
  return getElementByIdTyped('fps', window.HTMLSpanElement)
}

function getInputElement (id) /* : HTMLInputElement */ {
  return getElementByIdTyped(id, window.HTMLInputElement)
}


function getDivElement (id) /* : HTMLDivElement */ {
  return getElementByIdTyped(id, window.HTMLDivElement)
}

function getElementByIdTyped (id, type) {
  const element = document.getElementById(id)
  if (!(element instanceof type)) {
    throw Error('Unexpected HTMLElement ' + element)
  }
  return element
}
