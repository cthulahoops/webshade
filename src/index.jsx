import React, { useState, useEffect, useMemo, useRef } from 'react'
import ReactDOM from 'react-dom'

import Editor from './simple-editor.jsx'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-glsl'

import { ShaderAnimation, Camera } from './animation.js'
import { scan } from '../scanner.js'
import { sliderRange, formatLike } from './numbers.js'

function debounce (callbackFunction, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => callbackFunction(...args), delay)
  }
}

function tokenAt (tokens, position) {
  for (const token of tokens) {
    const tokenEndPosition = token.position + token.value.length
    if (tokenEndPosition > position || (token.type === 'number' && tokenEndPosition === position)) {
      return token
    }
  }
}

const compileRender = debounce((animation, source) => {
  console.log('Debounced: Updating and compiling shader!')
  animation.updateFragmentShader(source, [])
}, 200)

async function selectShader (shaderName, setCode) {
  const shaderResponse = await window.fetch(shaderName)
  const shaderSource = await shaderResponse.text()
  setCode(shaderSource)
  console.log(shaderName)
}

function stringSplice (string, position, oldLength, value) {
  return string.substr(0, position) + value + string.substr(position + oldLength)
}

function Token (props) {
  if (!props.token) {
    return <span>No current token.</span>
  }
  if (props.token.type === 'number') {
    const range = sliderRange(props.token.value)
    return (
      <div>
        {props.token.type}
        <input style={{ width: '50em' }} type='range' min={range.min} max={range.max} step={range.step} value={props.token.value} onChange={(event) => props.onChange(event.target.value)} />
        <span>{props.token.value}</span>
      </div>
    )
  }
  return <div>{props.token.type} {props.token.value}</div>
}

function App () {
  const [code, setCode] = useState('#version 100\n')
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)
  const [shader, setShader] = useState('geometry.frag')
  const [errors, setErrors] = useState('')

  const canvas = useRef()
  const animation = useRef()

  useEffect(() => {
    if (!canvas.current) {
      return
    }
    const camera = new Camera(0, 1, 0)
    const newAnimation = new ShaderAnimation(canvas.current, camera, setErrors)
    newAnimation.renderLoop()
    animation.current = newAnimation
  }, [canvas])

  useEffect(() => {
    console.log('Shader selected: ', shader)
    selectShader(shader, setCode)
  }, [shader])

  useEffect(() => {
    compileRender(animation.current, code)
  }, [animation, code])

  const tokens = useMemo(() => {
    try {
      return scan(code)
    } catch (err) {
      return []
    }
  }, [code])
  const currentToken = useMemo(() => tokenAt(tokens, selectionStart), [tokens, selectionStart])

  const updateToken = (value) => {
    if (!value) {
      return
    }
    const newCode = stringSplice(code, currentToken.position, currentToken.value.length, formatLike(parseFloat(value), currentToken.value))
    setCode(newCode)
  }

  return (
    <div className='grid_container'>
      <div className='canvas'>
        <canvas
          tabIndex={-1}
          ref={canvas}
          id='glscreen'
          onClick={() => canvas.current.requestPointerLock()}
          onMouseMove={(event) => animation.current.camera.handleMouseMove(event)}
          onKeyDown={(event) => animation.current.camera.handleKeyDown(event)}
          onKeyUp={(event) => animation.current.camera.handleKeyUp(event)}
        />

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
        <div>Selection: {selectionStart}-{selectionEnd}</div>
        <div>Current token: <Token token={currentToken} onChange={updateToken} /></div>
        <ul id='uniforms' />
        <pre>{errors}</pre>
      </div>

      <div className='source'>
        <Editor
          id='shader_source'
          value={code}
          onValueChange={setCode}
          onSelectionChange={
            (event) => {
              console.log(event)
              if (event.target.selectionStart === event.target.textLength) {
                return
              }
              setSelectionStart(event.target.selectionStart)
              setSelectionEnd(event.target.selectionEnd)
            }
          }
          highlight={(code) => highlight(code, languages.glsl)}
        />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
