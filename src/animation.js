// @flow

import { Vector } from '../vector.js'

export class Camera {
  /* :: position : Vector */
  /* :: velocity : Vector */
  /* :: rotation : { x: number, y: number } */
  /* :: handleChange: Function */

  constructor (
    position /* : { x: number, y: number, z: number } */,
    handleChange /* : Function */
  ) {
    this.position = new Vector(position.x, position.y, position.z)
    this.velocity = new Vector(0, 0, 0)
    this.rotation = { x: 0, y: 0 }
    this.handleChange = handleChange

    window.setInterval(() => this.tick(), 50)
  }

  get positionArray () /* : [ number, number, number ] */ {
    return [this.position.x, this.position.y, this.position.z]
  }

  tick () {
    if (this.velocity.x === 0 && this.velocity.y === 0 && this.velocity.z === 0) {
      return
    }
    this.position = this.position.add(this.velocity.scale(0.2).rotateY(this.rotation.y))
    this.handleChange(this)
  }

  handleMouseMove (event /* : { movementX: number, movementY: number } */) {
    if (!document.pointerLockElement) {
      return
    }
    this.rotation = {
      x: this.rotation.x + event.movementY / 100,
      y: this.rotation.y + event.movementX / 100
    }
    this.handleChange(this)
  }

  handleKeyDown (event /* : { key: number, repeat: bool } */) {
    if (event.repeat) {
      return
    }
    if (!document.pointerLockElement) {
      return
    }
    const direction = KEY_MAP.get(event.key)
    if (direction) {
      this.velocity = this.velocity.add(direction)
      this.handleChange(this)
    }
  }

  handleKeyUp (event /* : { key: number } */) {
    if (!document.pointerLockElement) {
      return
    }
    const direction = KEY_MAP.get(event.key)
    if (direction) {
      this.velocity = this.velocity.subtract(direction)
      this.handleChange(this)
    }
  }
}

export class ShaderAnimation {
  /* :: startTime: number */
  /* :: lastTime: number */
  /* :: frames: number */
  /* :: canvas: HTMLCanvasElement */
  /* :: gl: WebGLRenderingContext */
  /* :: program: any */
  /* :: camera: Camera */
  /* :: errorCallback: Function */

  constructor (canvas /*: HTMLCanvasElement */, camera /* : Camera */, errorCallback /* : Function */) {
    this.errorCallback = errorCallback
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
  }

  renderLoop () {
    window.requestAnimationFrame(() => this.renderLoop(), this.canvas)

    if (this.program) {
      const time = (window.performance.now() - this.startTime) / 1000
      this.render(time)

      if (this.frames >= 100) {
        // getFPSSpan().textContent = Math.round(this.frames / (time - this.lastTime)).toString()

        this.frames = 0
        this.lastTime = time
      }

      this.frames += 1
    }
  }

  render (time /* : number */) {
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
    gl.uniform3fv(cameraPositionLocation, (this.camera.positionArray /* : [number, number, number] */))

    const cameraRotationLocation = gl.getUniformLocation(program, 'camera_rotation')
    gl.uniform2fv(cameraRotationLocation, ([this.camera.rotation.x, this.camera.rotation.y] /* : [number, number] */))

    // for (const uniform of this.uniforms) {
    //   const uniformLocation = gl.getUniformLocation(program, uniform)
    //   const color = colorToVec(getInputElement(uniform).value)
    //   gl.uniform3fv(uniformLocation, color)
    // }

    gl.clearColor(1.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  updateFragmentShader (shaderSource /* : string */) {
    const compileShader = (shaderType, source) => {
      const shader = this.gl.createShader(shaderType)
      if (!shader) {
        throw Error('Failed to create shader')
      }
      this.gl.shaderSource(shader, source)
      this.gl.compileShader(shader)
      return shader
    }

    const gl = this.gl

    const vertexShader = compileShader(
      gl.VERTEX_SHADER,
      vertexShaderText)

    const fragmentShader = compileShader(
      gl.FRAGMENT_SHADER,
      shaderSource
    )

    const program = gl.createProgram()
    if (!program) {
      throw Error('Failed to create program.')
    }
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    gl.validateProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program)
      this.errorCallback(info || 'missing program error log')
      return
    }
    this.errorCallback('')

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
}

const KEY_MAP = new Map()
KEY_MAP.set('ArrowUp', new Vector(0, 0, -1))
KEY_MAP.set('ArrowDown', new Vector(0, 0, 1))
KEY_MAP.set('ArrowLeft', new Vector(-1, 0, 0))
KEY_MAP.set('ArrowRight', new Vector(1, 0, 0))
KEY_MAP.set(',', new Vector(0, 0, -1))
KEY_MAP.set('w', new Vector(0, 0, -1))
KEY_MAP.set('o', new Vector(0, 0, 1))
KEY_MAP.set('s', new Vector(0, 0, 1))
KEY_MAP.set('a', new Vector(-1, 0, 0))
KEY_MAP.set('e', new Vector(1, 0, 0))
KEY_MAP.set('d', new Vector(1, 0, 0))

const vertexShaderText = `#version 100

attribute vec2 a_position;

void main() {
    gl_Position = vec4(a_position, 0, 1);
}
`
