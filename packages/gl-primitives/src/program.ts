import { getShader } from './shader';

/**
 * Get WebGL program
 * @param {WebGL2RenderingContext} gl
 * @param {string} vertexShaderSource
 * @param {string} fragmentShaderSource
 * @returns @type {WebGLProgram}
 */
export function getProgram(
  gl: WebGL2RenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string
): WebGLProgram {
  const vertexShader = getShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
  const fragmentShader = getShader(
    gl,
    fragmentShaderSource,
    gl.FRAGMENT_SHADER
  );

  const program = gl.createProgram();
  if (!program) {
    throw new Error('Not able to create program');
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
  }

  return program;
}
