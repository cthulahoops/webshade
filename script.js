var gl;
var canvas;
var program;
var uniforms = [];

window.onload = init;

function compileShader(shaderType, source) {
    let shader = gl.createShader(shaderType);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}

function add_uniform_elements(uniform_container, uniforms) {
    while (uniform_container.lastChild) {
        uniform_container.removeChild(uniform_container.lastChild);
    }

    for (uniform of uniforms) {
        console.log("Color uniform: ", uniform);

        let li = document.createElement('li');

        let label = document.createElement('label');
        label.textContent = uniform;

        let input = document.createElement('input');
        input.id = uniform;
        input.type = 'color';

        li.appendChild(label);
        li.appendChild(input);
        uniform_container.appendChild(li);
    }
}

function bind_program_source(shaderSource) {
    let vertexShader = compileShader(
        gl.VERTEX_SHADER,
        document.getElementById("2d-vertex-shader").text);

    let uniform_container = document.getElementById("uniforms");
    uniforms = extract_uniforms(shaderSource)
    add_uniform_elements(uniform_container, uniforms);

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
        let info = gl.getProgramInfoLog(program);
        document.getElementById("fragment_errors").textContent = info;
        return
    }
    document.getElementById("fragment_errors").textContent = "";

    gl.useProgram(program);
    return program;
}

async function init() {
    let anchor_text = window.location.hash.substr(1);
    if (anchor_text) {
        select_program(anchor_text);
    }

    canvas = document.getElementById('glscreen');
    gl = canvas.getContext('experimental-webgl');
    canvas.width  = 800;
    canvas.height = 600;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    let buffer = gl.createBuffer();
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

    if (is_localhost(window.location.hostname)) {
        connect_websocket()
    }
}

function is_localhost(hostname) {
    return hostname == '0.0.0.0' || hostname == 'localhost' || hostname == '127.0.0.1';
}

function select_program(filename) {
    console.log("Selecting: ", filename);
    const select = document.getElementById("shader-selection");
    for (const option of select.options) {
        if (option.text == filename) {
            option.selected = true;
        }
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

        if (filename.endsWith(".frag")) {
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
        } else {
            window.location.reload(true);
        }
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

async function change_fragment_shader(select) {
    let selected_program = select.selectedOptions[0].value

    window.location.hash = '#' + selected_program;
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

function color_to_vec(color_string) {
    r = parseInt("0x" + color_string.substr(1,2));
    g = parseInt("0x" + color_string.substr(3,2));
    b = parseInt("0x" + color_string.substr(5,2));
    return [r / 255, g / 255, b / 255];
}

let start_time = performance.now();
let last_time = start_time;
let frames = 0;

function render() {
    window.requestAnimationFrame(render, canvas);

    if (!program) {
        return;
    }

    const time = performance.now();

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "time");
    gl.uniform1f(timeLocation, (time - start_time) / 1000)

    const resolutionUniform = gl.getUniformLocation(program, "resolution");
    gl.uniform2fv(resolutionUniform, [canvas.width, canvas.height]);

    for (const uniform of uniforms) {
        const uniformLocation = gl.getUniformLocation(program, uniform);
        gl.uniform3fv(uniformLocation, color_to_vec(document.getElementById(uniform).value));
    }

    if (frames % 4 == 0) {
        gl.clearColor(1.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    if (frames >= 100) {
        document.getElementById("fps").textContent = Math.round(1000 * frames / (time - last_time));

        frames = 0;
        last_time = time;
    }

    frames += 1;
}

function extract_uniforms(source) {
    let uniforms = [];
    for (const line of source.split("\n")) {
        if (line.startsWith('uniform vec3')) {
            let uniformName = line.split(';')[0].split(' ')[2]
            uniforms.push(uniformName);
        }
    }
    return uniforms;
}
