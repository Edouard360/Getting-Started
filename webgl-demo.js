var canvas;
var gl;
var squareVerticesBuffer;
var shaderProgram;
var vertexPositionAttribute;
var vertices;

function start() {
  /**
   * Step 0 : Preparing the canvas
   */
  canvas = document.getElementById("glcanvas");
  gl = canvas.getContext("webgl");

  gl.clearColor(27.0/255,27.0/255,27.0/255, 1.0);  // Clear to the Inovia black
  gl.clearDepth(1.0); // Clear the depth buffer
  gl.enable(gl.DEPTH_TEST); // Enable depth testing (objects in the front hide the others)

  /**
   * Step 1 : Creating the shaders
   */
  var vertexShaderSource = document.getElementById("shader-vs").firstChild.textContent;
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  var fragmentShaderSource = document.getElementById("shader-fs").firstChild.textContent;
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  /**
   * Step 2 : Creating the program from the shaders
   */
  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  gl.useProgram(shaderProgram);

  /**
   * Step 3 : Creating and filling the buffers
   */
  squareVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer); 

  vertices =  new Float32Array([
    0.2,  0.2,  0.0,
    -0.2, 0.2,  0.0,
    0.2,  -0.2, 0.0,
    -0.2, -0.2, 0.0
  ]);

  gl.bufferData(gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW); 

  /**
   * Step 4 : Sending data from the buffers to the program 
   */

  attributeLocation = gl.getAttribLocation(shaderProgram, "position");
  gl.enableVertexAttribArray(vertexPositionAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

  var numCoordinates = 3; // The numbers of coordinates per vertex. Here 3 coordinates (x,y,z).
  var type = gl.FLOAT; // The size of each element is a float.
  var normalize = false; //we don’t want normalized values here.
  var stride = 0 ; // the offset in bytes of the first coordinate in the array.
  var offset = 0; // the offset in bytes between the consecutive vertex coordinates.

  gl.vertexAttribPointer(attributeLocation, numCoordinates,type, normalize, stride, offset);

  drawScene();
}

function drawScene() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  /**
   * Step 5 : The draw call
   */
  var option = gl.TRIANGLE_STRIP; // The option for drawing
  var start = 0; // The starting index in the array
  var count = 4; // The number of indices to be rendered
  gl.drawArrays(option, start, count);

  requestAnimationFrame(drawScene);
}

/**
 * moveUp moves the square up.
 */
function moveUp(){
  vertices = vertices.map((i,j) => {return (j%3===1)?i+0.1:i});
  buffer(vertices);
}

/**
 * moveDown moves the square down.
 */
function moveDown(){
  vertices = vertices.map((i,j) => {return (j%3===1)?i-0.1:i});
  buffer(vertices);
}

/**
 * reset resets the initial position of the square.
 */
function reset(){
  vertices = new Float32Array([
    0.2,  0.2,  0.0,
    -0.2, 0.2,  0.0,
    0.2,  -0.2, 0.0,
    -0.2, -0.2, 0.0
  ]);
  buffer(vertices);
}

/**
 * The buffer function simply put the new data in the buffer
 * @param {array} vertices - the array of vertices to put in the buffer
 */
function buffer(vertices){
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
}