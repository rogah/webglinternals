/**
 * Create and bind WebGL buffer
 * @param {WebGLRenderingContext} gl
 * @param {GLenum} bufferType
 * @param {GLenum} typeOfDrawing
 * @param {Float32Array} data
 * @returns @type {WebGLBuffer}
 */
export function createAndBindBuffer(gl: WebGLRenderingContext, bufferType: GLenum, typeOfDrawing: GLenum, data: Float32Array): WebGLBuffer {
  const buffer = gl.createBuffer(); // allocates memory on GPU
  if (!buffer) {
    throw new Error('Not able to create buffer');
  }

  gl.bindBuffer(bufferType, buffer); // bind memory GPU
  gl.bufferData(bufferType, data, typeOfDrawing);
  gl.bindBuffer(bufferType, null); // bind with null to avoid memory link

  return buffer;
}
