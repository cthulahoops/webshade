import React, { useState, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'

import Editor from './simple-editor.jsx'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-glsl'

import { ShaderAnimation, Camera } from '../main.js'
import { scan } from '../scanner.js'

function debounce (callbackFunction, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => callbackFunction(...args), delay)
  }
}

function tokenAt (tokens, position) {
  for (const token of tokens) {
    if (token.position + token.value.length > position) {
      return token.value
    }
  }
  return 'meh'
}

const compileRender = debounce((animation, source) => {
  console.log('Debounced: Updating and compiling shader!')
  animation.updateFragmentShader(source, [])
}, 1000)

async function selectShader (shaderName, setCode) {
  const shaderResponse = await window.fetch(shaderName)
  const shaderSource = await shaderResponse.text()
  setCode(shaderSource)
  console.log(shaderName)
}

function App () {
  const [code, setCode] = useState('#version 100\n')
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)
  const [shader, setShader] = useState('geometry.frag')
  const [canvas, setCanvas] = useState()
  const [animation, setAnimation] = useState()

  useEffect(() => {
    if (!canvas) {
      return
    }
    const camera = new Camera(0, 1, 0)
    const newAnimation = new ShaderAnimation(canvas, camera)
    newAnimation.renderLoop()
    setAnimation(newAnimation)
  }, [canvas])

  useEffect(() => {
    console.log('Shader selected: ', shader)
    selectShader(shader, setCode)
  }, [shader])

  useEffect(() => {
    compileRender(animation, code)
  }, [animation, code])

  const tokens = useMemo(() => scan(code), [code])
  const currentToken = useMemo(() => tokenAt(tokens, selectionStart), [tokens, selectionStart])

  return (
    <div className='grid_container'>
      <div className='canvas'>
        <canvas ref={setCanvas} id='glscreen' />

        <select id='shader-selection' onChange={(event) => setShader(event.target.value)}>
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
          {selectionStart},
          {selectionEnd}
        </div>
        <div>{currentToken}</div>
        <ul id='uniforms' />
      </div>

      <div className='source'>
        <Editor
          id='shader_source'
          value={code}
          onValueChange={setCode}
          onSelectionChange={
            (event) => {
              setSelectionStart(event.target.selectionStart)
              setSelectionEnd(event.target.setSelectionEnd)
            }
          }
          highlight={(code) => highlight(code, languages.glsl)}
        />
      </div>
      <div id='errors' />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
