let program
let uniforms = []

window.onload = init

class ShaderCanvas {
  constructor (canvas) {
    this.canvas = canvas

    this.gl = canvas.getContext('experimental-webgl')
    canvas.width = 800
    canvas.height = 600

    this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight)
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

  async changeFragmentShader (select) {
    const selectedProgram = select.selectedOptions[0].value

    window.location.hash = '#' + selectedProgram
    const shaderResponse = await window.fetch(selectedProgram)
    const shaderSource = await shaderResponse.text()

    document.getElementById('shader_source').value = shaderSource

    program = await bindProgramSource(this.gl, shaderSource)
  }

  render () {
    const gl = this.gl

    window.requestAnimationFrame(() => this.render(), this.canvas)

    if (!program) {
      return
    }

    const time = window.performance.now()

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const timeLocation = gl.getUniformLocation(program, 'time')
    gl.uniform1f(timeLocation, (time - startTime) / 1000)

    const resolutionUniform = gl.getUniformLocation(program, 'resolution')
    gl.uniform2fv(resolutionUniform, [this.canvas.width, this.canvas.height])

    for (const uniform of uniforms) {
      const uniformLocation = gl.getUniformLocation(program, uniform)
      gl.uniform3fv(uniformLocation, colorToVec(document.getElementById(uniform).value))
    }

    if (frames % 4 === 0) {
      gl.clearColor(1.0, 0.0, 0.0, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    if (frames >= 100) {
      document.getElementById('fps').textContent = Math.round(1000 * frames / (time - lastTime))

      frames = 0
      lastTime = time
    }

    frames += 1
  }
}

function compileShader (gl, shaderType, source) {
  const shader = gl.createShader(shaderType)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

function addUniformElements (uniformContainer, uniforms) {
  while (uniformContainer.lastChild) {
    uniformContainer.removeChild(uniformContainer.lastChild)
  }

  for (const uniform of uniforms) {
    console.log('Color uniform: ', uniform)

    const li = document.createElement('li')

    const label = document.createElement('label')
    label.textContent = uniform

    const input = document.createElement('input')
    input.id = uniform
    input.type = 'color'

    li.appendChild(label)
    li.appendChild(input)
    uniformContainer.appendChild(li)
  }
}

function bindProgramSource (gl, shaderSource) {
  const vertexShader = compileShader(
    gl,
    gl.VERTEX_SHADER,
    document.getElementById('2d-vertex-shader').text)

  const uniformContainer = document.getElementById('uniforms')
  uniforms = extractUniforms(shaderSource)
  addUniformElements(uniformContainer, uniforms)

  const fragmentShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    shaderSource
  )

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
  return program
}

async function init () {
  const anchorText = window.location.hash.substr(1)
  if (anchorText) {
    selectProgram(anchorText)
  }

  const canvas = new ShaderCanvas(document.getElementById('glscreen'))

  await canvas.changeFragmentShader(document.getElementById('shader-selection'))

  canvas.render()

  if (isLocalhost(window.location.hostname)) {
    connectWebsocket()
  }
  window.changeFragmentShader = () => canvas.changeFragmentShader()
  window.refetchCode = () => refetchCode(canvas)
  window.textareaUpdated = () => textareaUpdated(canvas)
}

function isLocalhost (hostname) {
  return hostname === '0.0.0.0' || hostname === 'localhost' || hostname === '127.0.0.1'
}

function selectProgram (filename) {
  console.log('Selecting: ', filename)
  const select = document.getElementById('shader-selection')
  for (const option of select.options) {
    if (option.text === filename) {
      option.selected = true
    }
  }
}

function connectWebsocket () {
  const socket = new window.WebSocket('ws://localhost:5555/changes')
  socket.onopen = function (e) {
    console.log('[open] Connection established')
  }

  socket.onmessage = function (event) {
    const filename = event.data
    console.log('Got refresh message for: ', filename)

    if (filename.endsWith('.frag')) {
      const select = document.getElementById('shader-selection')
      const selectedProgram = select.selectedOptions[0].value

      if (selectedProgram !== filename) {
        for (const option of select.options) {
          if (option.text === filename) {
            option.selected = true
          }
        }
      }
      refetchCode(select)
    } else {
      window.location.reload(true)
    }
  }

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`)
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log('[close] Connection died')
    }
  }

  socket.onerror = function (error) {
    console.log(`[websocket error] ${error.message}`)
  }
}

async function refetchCode (canvas) {
  await canvas.changeFragmentShader(document.getElementById('shader-selection'))
}

async function textareaUpdated (canvas) {
  console.log('Recompiling from textarea.')
  const source = document.getElementById('shader_source').value
  program = await bindProgramSource(canvas.gl, source)
}

function colorToVec (colorString) {
  const r = parseInt('0x' + colorString.substr(1, 2))
  const g = parseInt('0x' + colorString.substr(3, 2))
  const b = parseInt('0x' + colorString.substr(5, 2))
  return [r / 255, g / 255, b / 255]
}

const startTime = window.performance.now()
let lastTime = startTime
let frames = 0


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

