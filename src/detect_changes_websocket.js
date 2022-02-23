export function connectWebsocket (handleCodeChange) {
  const socket = new window.WebSocket('ws://localhost:5555/changes')
  socket.onopen = function (e) {
    console.log('[open] Websocket connection established')
  }

  socket.onmessage = function (event) {
    const filename = event.data
    console.log('Got code change message for: ', filename)
    handleCodeChange(filename)
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
