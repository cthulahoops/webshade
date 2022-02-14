import React from 'react'

import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'

import { ShaderAnimation, Camera } from '../main.js'

class GLCanvas extends React.Component {
  constructor (props) {
    console.log("GL canvas created!")
    super(props)
    this.state = {}
  }

  mountCanvas (canvasElement) {
    if (!canvasElement) {
      return
    }
    if (this.animation) {
      console.log("Don't need to remount: ", canvasElement)
      return
    }
    console.log('Canvas: ', canvasElement)
    const camera = new Camera(0, 1, 0)
    this.animation = new ShaderAnimation(canvasElement, camera)
    this.animation.renderLoop()
  }

  setCode( shaderSource ) {
    this.animation.updateFragmentShader(shaderSource, [])
  }

  render () {
    if (this.animation) {
      this.animation.updateFragmentShader(this.props.code, [])
    }
    return <canvas ref={(element) => this.mountCanvas(element)} id='glscreen' />
  }
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { code: '#version 100;\nvoid main() { gl_FragColor = vec4(1, 0, 0, 0); }' }
  }

  setCode (code) {
    this.setState({ code: code })
  }

  async selectShader (shaderName) {
    const shaderResponse = await window.fetch(shaderName)
    const shaderSource = await shaderResponse.text()
    this.setCode(shaderSource)
    console.log(shaderName)
  }

  render () {
    return (
      <div className='grid_container'>
        <div className='canvas'>
          <GLCanvas code={this.state.code} />

          <select id='shader-selection' onChange={(event) => this.selectShader(event.target.value)}>
            <option>geometry.frag</option>
            <option>cone.frag</option>
            <option>marching.frag</option>
            <option>manyspheres.frag</option>
            <option>mixing.frag</option>
            <option>simple.frag</option>
            <option>wheel.frag</option>
          </select>
          FPS = <span id='fps' />
          <ul id='uniforms' />
        </div>

        <div className='source'>
          <Editor id='shader_source' value={this.state.code} onValueChange={(code) => this.setCode(code)} highlight={(code) => highlight(code, languages.javascript)} cols={120} />
        </div>
        <div id='errors' />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
