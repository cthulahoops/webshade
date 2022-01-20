var gl;
var canvas;
var buffer;
var timeLocation;

window.onload = init;

async function init() {
    var shaderScript;
    var shaderSource;
    var vertexShader;
    var fragmentShader;

    canvas	  = document.getElementById('glscreen');
    gl		  = canvas.getContext('experimental-webgl');
    canvas.width  = 640;
    canvas.height = 480;

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

    shaderScript = document.getElementById("2d-vertex-shader");
    shaderSource = shaderScript.text;
    vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, shaderSource);
    gl.compileShader(vertexShader);

    shaderResponse = await fetch("/marching.frag");
    shaderSource   = await shaderResponse.text();

    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, shaderSource);
    gl.compileShader(fragmentShader);

    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    timeLocation = gl.getUniformLocation(program, "iTime");

    render()
}

function seconds() {
    let date = new Date();
    return date.getTime() / 1000;
}

var start_time = seconds();

function render() {
    window.requestAnimationFrame(render, canvas);

    gl.clearColor(1.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.uniform1f(timeLocation, seconds() - start_time)

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}
