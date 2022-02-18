// @flow

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

const DEFAULT_SHADERS = ['geometry.frag', 'cone.frag', 'marching.frag', 'manyspheres.frag', 'mixing.frag', 'simple.frag', 'wheel.frag']

function App () {
  const [code, setCode] = useState('#version 100\n')
  const selection = useSelection()
  const [shader, setShader] = useState(window.location.hash.substr(1))
  const [errors, setErrors] = useState('')

  const [position, setPosition] = useState({ x: 0, y: 1, z: 0 })
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const camera = useRef(new Camera(position, (c) => {
    setPosition(c.position)
    setRotation(c.rotation)
  }))

  const canvas = useRef()
  const animation = useRef()

  useEffect(() => {
    if (!canvas.current) {
      return
    }
    const newAnimation = new ShaderAnimation(canvas.current, camera.current, setErrors)
    newAnimation.renderLoop()
    animation.current = newAnimation
  }, [canvas])

  useEffect(() => {
    console.log('Shader selected: ', shader)
    selectShader(shader, setCode)
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
        FPS = <span id='fps' />
        <div>Selection: {selection.value.start}-{selection.value.end}</div>
        <div>Current token: <Token token={currentToken} onChange={updateToken} /></div>
        <CameraValues position={position} rotation={rotation} />
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

function CameraValues ({ position, rotation }) {
  return (
    <div>
      <div>position = ({position.x.toFixed(3)}, {position.y.toFixed(3)}, {position.z.toFixed(3)})</div>
      <div>rotation = ({rotation.x.toFixed(3)}, {rotation.y.toFixed(3)})</div>
    </div>
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

async function selectShader (shaderName, setCode) {
  const shaderResponse = await window.fetch(shaderName)
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

ReactDOM.render(<App />, document.getElementById('app'))
