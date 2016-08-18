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

  gl.clearColor(27.0/255,27.0/255,27.0/255, 1.0); // Clear to the Inovia black
  gl.clearDepth(1.0); // Clear the depth buffer
  gl.enable(gl.DEPTH_TEST); // Enable depth testing (objects in the front hide the others)

  drawScene();
}

function drawScene() {
  // We clear the canvas between every frame (even if we draw nothing)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  requestAnimationFrame(drawScene);
}
