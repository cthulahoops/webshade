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

  window.document.addEventListener('keydown', (event) => camera.handleKeyDown(event))
  window.document.addEventListener('keyup', (event) => camera.handleKeyUp(event))
  window.setInterval(() => camera.tick(), 50)
}

class Vector {
  /* :: x : number */
  /* :: y : number */
  /* :: z : number */
  constructor (x /* : number */, y /* : number */, z /* : number */) {
    this.x = x
    this.y = y
    this.z = z
  }

  static add (v1, v2) /* : Vector */ {
    return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z + v2.z)
  }

  static sub (v1, v2) /* : Vector */ {
    return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z - v2.z)
  }

  static scale (v, factor) /* : Vector */ {
    return new Vector(factor * v.x, factor * v.y, factor * v.z)
  }
}

const KEY_MAP = new Map()
KEY_MAP.set('ArrowUp', new Vector(0, 0, -1))
KEY_MAP.set('ArrowDown', new Vector(0, 0, 1))
KEY_MAP.set('ArrowLeft', new Vector(-1, 0, 0))
KEY_MAP.set('ArrowRight', new Vector(1, 0, 0))

class Camera {
  /* :: _position : Vector */
  /* :: velocity : Vector */
  constructor (x, y, z) {
    this._position = new Vector(x, y, z)
    this.velocity = new Vector(0, 0, 0)
  }

  get position () {
    return [this._position.x, this._position.y, this._position.z]
  }

  tick () {
    this._position = Vector.add(this._position, Vector.scale(this.velocity, 0.1))
  }

  handleKeyDown (event) {
    if (event.repeat) {
      return
    }
    const direction = KEY_MAP.get(event.key)
    if (direction) {
      this.velocity = Vector.add(this.velocity, direction)
    }
  }

  handleKeyUp (event) {
    const direction = KEY_MAP.get(event.key)
    if (direction) {
      this.velocity = Vector.sub(this.velocity, direction)
    }
  }
}

window.onload = init

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

class ShaderAnimation {
  /* :: startTime: number */
  /* :: lastTime: number */
  /* :: frames: number */
  /* :: canvas: HTMLCanvasElement */
  /* :: gl: WebGLRenderingContext */
  /* :: program: any */
  /* :: uniforms: Array<string> */
  /* :: camera: Camera */

  constructor (canvas /*: HTMLCanvasElement */, camera /* : Camera */) {
    this.startTime = window.performance.now()
    this.lastTime = this.startTime
    this.frames = 0

    this.canvas = canvas
    this.camera = camera

    const gl = canvas.getContext('experimental-webgl')
    if (!(gl instanceof window.WebGLRenderingContext)) {
      throw Error("Didn't get a WebGL context.")
    }
    this.gl = gl
    canvas.width = 800
    canvas.height = 600

    this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight)

    this.bindQuadFillingScreen()

    this.program = null
    this.uniforms = []
  }

  renderLoop () {
    window.requestAnimationFrame(() => this.renderLoop(), this.canvas)

    if (this.program) {
      const time = (window.performance.now() - this.startTime) / 1000
      this.render(time)

      if (this.frames >= 100) {
        getFPSSpan().textContent = Math.round(this.frames / (time - this.lastTime)).toString()

        this.frames = 0
        this.lastTime = time
      }

      this.frames += 1
    }
  }

  render (time) {
    const gl = this.gl
    const program = this.program

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const timeLocation = gl.getUniformLocation(program, 'time')
    gl.uniform1f(timeLocation, time)

    const resolutionUniform = gl.getUniformLocation(program, 'resolution')
    gl.uniform2fv(resolutionUniform, ([this.canvas.width, this.canvas.height] /* : [number, number] */))

    const cameraPositionLocation = gl.getUniformLocation(program, 'camera_position')
    gl.uniform3fv(cameraPositionLocation, (this.camera.position /* : [number, number, number] */))

    const cameraRotationLocation = gl.getUniformLocation(program, 'camera_rotation')
    gl.uniform2fv(cameraRotationLocation, ([this.camera._position.y, this.camera._position.x] /* : [number, number] */))

    for (const uniform of this.uniforms) {
      const uniformLocation = gl.getUniformLocation(program, uniform)
      const color = colorToVec(getInputElement(uniform).value)
      gl.uniform3fv(uniformLocation, color)
    }

    gl.clearColor(1.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  updateFragmentShader (shaderSource, uniforms) {
    const gl = this.gl

    const vertexShader = this.compileShader(
      gl.VERTEX_SHADER,
      getVertexScriptElement().text)

    const fragmentShader = this.compileShader(
      gl.FRAGMENT_SHADER,
      shaderSource
    )

    this.uniforms = uniforms

    const program = gl.createProgram()
    if (!program) {
      throw Error('Failed to create program.')
    }
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    gl.validateProgram(program)

    const errorLog = getDivElement('errors')

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program)
      errorLog.textContent = info || 'missing program error log'
      return
    }
    errorLog.textContent = ''

    gl.useProgram(program)
    this.program = program
  }

  bindQuadFillingScreen () {
    const buffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        1.0, 1.0]),
      this.gl.STATIC_DRAW
    )
  }

  compileShader (shaderType, source) {
    const shader = this.gl.createShader(shaderType)
    if (!shader) {
      throw Error('Failed to create shader')
    }
    this.gl.shaderSource(shader, source)
    this.gl.compileShader(shader)
    return shader
  }
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
  return getElementByIdTyped('shader_source', window.HTMLTextAreaElement)
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

function getVertexScriptElement () /* : HTMLScriptElement */ {
  return getElementByIdTyped('2d-vertex-shader', window.HTMLScriptElement)
}

function getDivElement (id) /* : HTMLDivElement */ {
  return getElementByIdTyped(id, window.HTMLDivElement)
}

function getElementByIdTyped (id, type) {
  const element = document.getElementById(id)
  if (!(element instanceof type)) {
    throw Error('Unexpected HTMLElement')
  }
  return element
}
