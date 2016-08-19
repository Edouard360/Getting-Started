var canvas;
var gl;
var squareVerticesBuffer;
var shaderProgram;
var attributePositionLocation;
var attributeLightLocation;
var vertices;

var numCoordinates, type, normalize, stride, offsetArray;

var uniformOffsetLocation; // For the offset location
var offset = [0,0.2,0]; // The initial offset

var uniformColorLocation; // For the color location
var color = [232.0/255., 85.0/255., 47.0/255.]; // The Inovia orange

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

  /**
   * Two attributes, one array
   * ( x , y , z ) ,     ( a )
   *   position    ,  transparency
   */
  vertices = [
    0.2,  0.2,  0.0,  1,
    -0.2, 0.2,  0.0,  0.5,
    0.2,  -0.2, 0.0,  0.5,
    -0.2, -0.2, 0.0,  0
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); 

  /**
   * Step 4 : Sending attributes from the buffers to the program 
   */
  attributePositionLocation = gl.getAttribLocation(shaderProgram, "position");
  gl.enableVertexAttribArray(attributePositionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

  numCoordinates = 3; // Number of elements (x,y,z). Same as before
  type = gl.FLOAT; // Same as before.
  normalize = false; // Same as before.
  stride = 4 * 4; // Now we should skip 1 element (the alpha element)
  offsetArray = 0; // We still start at 0 for position.

  gl.vertexAttribPointer(attributePositionLocation, numCoordinates,type, normalize, stride, offsetArray);

  attributeLightLocation = gl.getAttribLocation(shaderProgram, "light");
  gl.enableVertexAttribArray(attributeLightLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

  var numCoordinates = 1; // Number of elements (alpha).
  var type = gl.FLOAT; // Same as before.
  var normalize = false; // Same as before.
  var stride = 4 * 4; // 4 elements * (float size in bytes = 4)
  var offsetArray = 3 * 4; // Skip the first 3 elements (x,y,z) * (float size = 4)

  gl.vertexAttribPointer(attributeLightLocation, numCoordinates,type, normalize, stride, offsetArray);
  /**
   * Step 5 : Sending uniforms to the program 
   */

  // Get the location of the uniform named ‘offset’
  uniformOffsetLocation = gl.getUniformLocation(shaderProgram, "offset");
  // The uniform is a three dimensional vector (3v) of floats (f)
  gl.uniform3fv(uniformOffsetLocation, offset);  

  // Get the location of the uniform named 'color'
  uniformColorLocation = gl.getUniformLocation(shaderProgram, "color");
  // The uniform is a three dimensional vector (3v) of floats (f)
  gl.uniform3fv(uniformColorLocation, color);  

  drawScene();
}

function drawScene() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  /**
   * Step 6 : The draw call
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
  offset[1] += 0.1;
  color = color.map((i)=>{return i*1.1})
  update(offset,color);
}

/**
 * moveDown moves the square down.
 */
function moveDown(){
  offset[1] -= 0.1;
  color = color.map((i)=>{return i/1.1})
  update(offset,color);
}

/**
 * reset resets the initial position of the square.
 */
function reset(){
  offset = [0,0.2,0];
  color = [232.0/255., 85.0/255., 47.0/255.];
  update(offset,color);
}

/**
 * The update function sends the new uniform to the program
 * @param {array} offset - the offset to send to the program
 * @param {array} color - the color to send to the program
 */
function update(offset){
  gl.uniform3fv(uniformOffsetLocation, offset);
  gl.uniform3fv(uniformColorLocation, color);   
}