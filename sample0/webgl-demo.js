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
  drawScene();
}

function drawScene() {

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  requestAnimationFrame(drawScene);
}
