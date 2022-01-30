import { connectWebsocket } from './detect_changes_websocket.js'

async function init () {
  if (isLocalhost(window.location.hostname)) {
    connectWebsocket(handleCodeChange)
  }

  const anchorText = window.location.hash.substr(1)
  if (anchorText) {
    const select = document.getElementById('shader-selection')
    setSelectedOption(select, anchorText)
  }

  const animation = new ShaderAnimation(document.getElementById('glscreen'))

  await selectFragmentShader(animation, document.getElementById('shader-selection'))

  animation.renderLoop()

  window.selectFragmentShader = (select) => selectFragmentShader(animation, select)
  window.refetchCode = () => refetchCode(animation)
  window.textareaUpdated = () => textareaUpdated(animation)
}

window.onload = init

async function selectFragmentShader (shaderAnimation, select) {
  const selectedProgram = select.selectedOptions[0].value

  window.location.hash = '#' + selectedProgram
  const shaderResponse = await window.fetch(selectedProgram)
  const shaderSource = await shaderResponse.text()

  document.getElementById('shader_source').value = shaderSource

  changeFragmentShader(shaderAnimation, shaderSource)
}

function changeFragmentShader (shaderAnimation, shaderSource) {
  const uniformContainer = document.getElementById('uniforms')
  const uniforms = extractUniforms(shaderSource)
  addUniformElements(uniformContainer, uniforms)
  shaderAnimation.updateFragmentShader(shaderSource, uniforms)
}

async function refetchCode (shaderAnimation) {
  await selectFragmentShader(document.getElementById(shaderAnimation, 'shader-selection'))
}

async function textareaUpdated (shaderAnimation) {
  console.log('Recompiling from textarea.')
  const source = document.getElementById('shader_source').value
  changeFragmentShader(shaderAnimation, source)
}

class ShaderAnimation {
  constructor (canvas) {
    this.startTime = window.performance.now()
    this.lastTime = this.startTime
    this.frames = 0

    this.canvas = canvas

    this.gl = canvas.getContext('experimental-webgl')
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
        document.getElementById('fps').textContent = Math.round(this.frames / (time - this.lastTime))

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
    gl.uniform2fv(resolutionUniform, [this.canvas.width, this.canvas.height])

    for (const uniform of this.uniforms) {
      const uniformLocation = gl.getUniformLocation(program, uniform)
      gl.uniform3fv(uniformLocation, colorToVec(document.getElementById(uniform).value))
    }

    gl.clearColor(1.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  updateFragmentShader (shaderSource, uniforms) {
    const gl = this.gl

    const vertexShader = this.compileShader(
      gl.VERTEX_SHADER,
      document.getElementById('2d-vertex-shader').text)

    const fragmentShader = this.compileShader(
      gl.FRAGMENT_SHADER,
      shaderSource
    )

    this.uniforms = uniforms

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    gl.validateProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program)
      document.getElementById('errors').textContent = info
      return
    }
    document.getElementById('errors').textContent = ''

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
    this.gl.shaderSource(shader, source)
    this.gl.compileShader(shader)
    return shader
  }
}

function addUniformElements (uniformContainer, uniforms) {
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

function handleCodeChange (filename) {
  if (filename.endsWith('.frag')) {
    const select = document.getElementById('shader-selection')
    const selectedProgram = select.selectedOptions[0].value

    if (selectedProgram !== filename) {
      setSelectedOption(select, filename)
    }
    refetchCode(select)
  } else {
    window.location.reload(true)
  }
}

function isLocalhost (hostname) {
  return hostname === '0.0.0.0' || hostname === 'localhost' || hostname === '127.0.0.1'
}

function colorToVec (colorString) {
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
      uniforms.push(uniformName)
    }
  }
  return uniforms
}

function setSelectedOption (select, value) {
  for (const option of select.options) {
    if (option.text === value) {
      option.selected = true
    }
  }
}
