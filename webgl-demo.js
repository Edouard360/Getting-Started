var canvas;
var gl;
var squareVerticesBuffer;
var shaderProgram;
var vertexPositionAttribute;

function start() {
  canvas = document.getElementById("glcanvas");
  gl = canvas.getContext("webgl");

  gl.clearColor(27.0/255,27.0/255,27.0/255, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing

  //************** Creating the shaders ************************//

  var vertexShaderSource = document.getElementById("shader-vs").firstChild.textContent;
  var  vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  var fragmentShaderSource = document.getElementById("shader-fs").firstChild.textContent;
  var  fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  //************** Creating the program ************************//
  
  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  gl.useProgram(shaderProgram);

  sendDataToProgram();
  drawScene();
}

function drawScene() {

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  draw();
  requestAnimationFrame(drawScene);
}

function sendDataToProgram(){
 //************** Creating the buffers ************************//
  squareVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

  var vertices = [
    0.2,  0.2,  0.0,
    -0.2, 0.2,  0.0,
    0.2,  -0.2, 0.0,
    -0.2, -0.2, 0.0
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  //************** Preparing to send data to the program ************************//
  vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "position");
  gl.enableVertexAttribArray(vertexPositionAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
}
function draw(){
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
 