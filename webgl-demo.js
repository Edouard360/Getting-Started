var canvas;
var gl;
var squareVerticesBuffer;
var shaderProgram;
var vertexPositionAttribute;

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

  var vertices = [
    0.2,  0.2,  0.0,
    -0.2, 0.2,  0.0,
    0.2,  -0.2, 0.0,
    -0.2, -0.2, 0.0
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); 

  /**
   * Step 4 : Sending data from the buffers to the program 
   */

  // To get the location of the attribute named “position”.
  attributeLocation = gl.getAttribLocation(shaderProgram, "position");

  // Turn on the attribute to receive data.
  gl.enableVertexAttribArray(vertexPositionAttribute);

  // Bind the buffer that contains the data for our attribute.
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