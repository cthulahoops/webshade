import React from 'react'
import ReactDOM from 'react-dom'

import Editor from './simple-editor.jsx'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-glsl'

import { ShaderAnimation, Camera } from '../main.js'

function debounce (callbackFunction, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => callbackFunction(...args), delay)
  }
}

const compileRender = debounce((animation, source) => {
  console.log('Debounced: Updating and compiling shader!')
  animation.updateFragmentShader(source, [])
}, 1000)

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      code: '',
      selectionStart: 0,
      selectionEnd: 0
    }

    this.selectShader('geometry.frag')
  }

  setCode (code) {
    this.setState({ code: code })
    if (this.animation) {
      compileRender(this.animation, this.state.code)
    }
  }

  async selectShader (shaderName) {
    const shaderResponse = await window.fetch(shaderName)
    const shaderSource = await shaderResponse.text()
    this.setCode(shaderSource)
    console.log(shaderName)
  }

  mountCanvas (canvasElement) {
    if (!canvasElement) {
      return
    }
    if (this.animation) {
      return
    }
    console.log('Mounted canvas: ', canvasElement)
    const camera = new Camera(0, 1, 0)
    this.animation = new ShaderAnimation(canvasElement, camera)
    this.animation.renderLoop()
    compileRender(this.animation, this.state.code)
  }

  render () {
    return (
      <div className='grid_container'>
        <div className='canvas'>
          <canvas ref={(element) => this.mountCanvas(element)} id='glscreen' />

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
          <div>
            {this.state.selectionStart},
            {this.state.selectionEnd}
          </div>
          <pre>{this.state.code.substr(this.state.selectionStart, this.state.selectionEnd - this.state.selectionStart)}</pre>
          <ul id='uniforms' />
        </div>

        <div className='source'>
          <Editor
            id='shader_source'
            value={this.state.code}
            onValueChange={(code) => this.setCode(code)}
            onSelectionChange={
              (event) =>
                this.setState({ selectionStart: event.target.selectionStart, selectionEnd: event.target.selectionEnd })
            }
            highlight={(code) => highlight(code, languages.glsl)}
          />
        </div>
        <div id='errors' />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
