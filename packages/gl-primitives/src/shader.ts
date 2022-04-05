/**
 * Get WebGL shader
 * @param {WebGL2RenderingContext} gl
 * @param {string} shaderSource
 * @param {GLenum} shaderType
 * @returns @type {WebGLShader}
 */
export function getShader(
  gl: WebGL2RenderingContext,
  shaderSource: string,
  shaderType: GLenum
): WebGLShader {
  const shader = gl.createShader(shaderType);
  if (!shader) {
    throw new Error('Not able to create shader');
  }

  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
  }

  return shader;
}
