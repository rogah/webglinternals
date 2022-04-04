/**
 * Get WebGL context
 * @param {HTMLCanvasElement} canvas
 * @returns @type {WebGL2RenderingContext}
 */
export function getContext(canvas: HTMLCanvasElement): WebGL2RenderingContext {
  const gl = canvas.getContext('webgl2');
  if (!gl) {
    throw new Error('Not able to get WebGL context');
  }

  // gl.clearColor(0.09, 0.17, 0.3, 1);
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

  return gl;
}
