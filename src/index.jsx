// @flow

import React, { useState, useEffect, useMemo, useRef } from 'react'
import ReactDOM from 'react-dom'

import Editor from './simple-editor.jsx'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-glsl'

import { connectWebsocket } from './detect_changes_websocket.js'
import { ShaderAnimation, Camera } from './animation.js'
import { scan } from '../scanner.js'
import { sliderRange, formatLike } from './numbers.js'

const DEFAULT_SHADERS = [
  'shell.frag',
  'dome.frag',
  'geometry.frag',
  'cone.frag',
  'marching.frag',
  'manyspheres.frag',
  'simple.frag',
  'wheel.frag',
  'polar.frag',
  'flower.frag']

function App () {
  const [code, setCode] = useState('#version 100\n')
  const selection = useSelection()
  const [shader, setShader] = useState(window.location.hash.substr(1) || DEFAULT_SHADERS[0])
  const [errors, setErrors] = useState('')
  const [fps, setFPS] = useState(0)

  // const [position, setPosition] = useState({ x: 0, y: 1, z: 0 })
  // const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const position = { x: 0, y: 1, z: 0 }
  const camera = useRef(new Camera(position, (c) => {}))

  const canvas = useRef()
  const animation = useRef()

  useEffect(() => {
    if (isLocalhost(window.location.hostname)) {
      connectWebsocket((filename) => {
        if (filename === shader) {
          console.log('Refetching shader: ', shader)
          fetchShaderCode(shader, setCode)
        } else {
          setShader(filename)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (!canvas.current) {
      return
    }
    const newAnimation = new ShaderAnimation(
      canvas.current,
      camera.current,
      setErrors,
      setFPS)
    newAnimation.renderLoop()
    animation.current = newAnimation
  }, [canvas])

  useEffect(() => {
    console.log('Shader selected: ', shader)
    fetchShaderCode(shader, setCode)
  }, [shader])

  useEffect(() => {
    window.location.hash = '#' + shader
  }, [shader])

  useEffect(() => {
    if (animation.current) {
      compileRender(animation.current, code)
    }
  }, [animation, code])

  const tokens = useMemo(() => {
    try {
      return scan(code)
    } catch (err) {
      return []
    }
  }, [code])
  const currentToken /* : { position: number, value: string } | void */ = useMemo(() => tokenAt(tokens, selection.value.start), [tokens, selection.value.start])

  const updateToken = (value) => {
    if (!value) {
      return
    }
    if (!currentToken) {
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
          onClick={() => { if (canvas.current) canvas.current.requestPointerLock() }}
          onMouseMove={(event) => camera.current.handleMouseMove(event)}
          onKeyDown={(event) => camera.current.handleKeyDown(event)}
          onKeyUp={(event) => camera.current.handleKeyUp(event)}
        />

        <Selection selected={shader} options={DEFAULT_SHADERS} handleChange={setShader} />
        <div>FPS = <span>{fps}</span></div>
        <div>Selection: {selection.value.start}-{selection.value.end}</div>
        <div>Current token: <Token token={currentToken} onChange={updateToken} /></div>
        <pre>{errors}</pre>
      </div>

      <div className='source'>
        <Editor
          id='shader_source'
          value={code}
          onValueChange={setCode}
          onSelectionChange={selection.handleSelectionChange}
          highlight={(code) => highlight(code, languages.glsl)}
        />
      </div>
    </div>
  )
}

function Selection ({ options, selected, handleChange }) {
  return (
    <select defaultValue={selected} onChange={(event) => handleChange(event.target.value)}>
      {
        options.map((option) => <option key={option}>{option}</option>)
      }
    </select>
  )
}

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

const compileRender = debounce((animation /* : ShaderAnimation */, source) => {
  console.log('Debounced: Updating and compiling shader!')
  animation.updateFragmentShader(source)
}, 200)

async function fetchShaderCode (shaderName, setCode) {
  const shaderResponse = await window.fetch('/shaders/' + shaderName)
  const shaderSource = await shaderResponse.text()
  setCode(shaderSource)
  console.log(shaderName)
}

function stringSplice (string, position, oldLength, value) {
  return string.substr(0, position) + value + string.substr(position + oldLength)
}

function Token (props /* : { token: Object, onChange: Function } */) {
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

function useSelection () {
  const [selection, setSelection] = useState({ start: 0, end: 0 })
  return {
    value: selection,
    handleSelectionChange: (event) => {
      console.log(event)
      if (event.target.selectionStart === event.target.textLength) {
        return
      }
      setSelection({ start: event.target.selectionStart, end: event.target.selectionEnd })
    }
  }
}

function isLocalhost (hostname) {
  return hostname === '0.0.0.0' || hostname === 'localhost' || hostname === '127.0.0.1'
}

ReactDOM.render(<App />, document.getElementById('app'))
