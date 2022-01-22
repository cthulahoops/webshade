var gl;
var canvas;
var buffer;
var timeLocation;
var program;

window.onload = init;

function compileShader(shaderType, source) {
    let shader = gl.createShader(shaderType);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}

function bind_program_source(shaderSource) {
    let vertexShader = compileShader(
        gl.VERTEX_SHADER,
        document.getElementById("2d-vertex-shader").text);

    let fragmentShader = compileShader(
        gl.FRAGMENT_SHADER,
        shaderSource
    );

    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    gl.validateProgram(program);

    if ( !gl.getProgramParameter(program, gl.LINK_STATUS) ) {
        var info = gl.getProgramInfoLog(program);
        document.getElementById("fragment_errors").textContent = info;
        return
    }
    document.getElementById("fragment_errors").textContent = "";

    gl.useProgram(program);
    return program;
}

async function init() {
    var shaderScript;
    var shaderSource;
    var vertexShader;
    var fragmentShader;

    canvas = document.getElementById('glscreen');
    gl = canvas.getContext('experimental-webgl');
    canvas.width  = 800;
    canvas.height = 600;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1.0, -1.0,
             1.0, -1.0,
            -1.0,  1.0,
            -1.0,  1.0,
             1.0, -1.0,
             1.0,  1.0]),
        gl.STATIC_DRAW
    );

    await change_fragment_shader(document.getElementById("shader-selection"))

    render()

    if (window.location.hostname === '0.0.0.0') {
        connect_websocket()
    }
}

function connect_websocket() {
    let socket = new WebSocket("ws://localhost:5555/changes")
    socket.onopen = function(e) {
      console.log("[open] Connection established");
    };

    socket.onmessage = function(event) {
        let filename = event.data;
        console.log("Got refresh message for: ", filename);

        let select = document.getElementById("shader-selection");
        let selected_program = select.selectedOptions[0].value

        if (selected_program != filename) {
            for (const option of select.options) {
                if (option.text == filename) {
                    option.selected = true;
                }
            }
        }
        refresh_shader(select);
    };

    socket.onclose = function(event) {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
      }
    };

    socket.onerror = function(error) {
      console.log(`[websocket error] ${error.message}`);
    };
}

function seconds() {
    let date = new Date();
    return date.getTime() / 1000;
}

var start_time = seconds();

async function change_fragment_shader(select) {
    let selected_program = select.selectedOptions[0].value
    let shaderResponse = await fetch(selected_program);
    let shaderSource   = await shaderResponse.text();

    document.getElementById("shader_source").value = shaderSource;

    program = await bind_program_source(shaderSource);
}

async function refresh_shader() {
    await change_fragment_shader(document.getElementById("shader-selection"));
}

async function textarea_updated() {
    console.log("Recompiling from textarea.");
    let source = document.getElementById("shader_source").value;
    program = await bind_program_source(source);
}

function render() {
    window.requestAnimationFrame(render, canvas);

    if (!program) {
        return;
    }

    gl.clearColor(1.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    timeLocation = gl.getUniformLocation(program, "time");
    gl.uniform1f(timeLocation, seconds() - start_time)

    resolutionUniform = gl.getUniformLocation(program, "resolution");
    gl.uniform2fv(resolutionUniform, [canvas.width, canvas.height]);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}
