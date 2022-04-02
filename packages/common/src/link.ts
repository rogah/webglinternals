const DEFAULT_STRIDE: number = 0;
const DEFAULT_OFFSET: number = 0;

/**
 * @typedef LinkOptions
 * @type {object}
 * @property {WebGLProgram} program
 * @property {WebGLBuffer} buffer
 * @property {string} gpuVariable
 * @property {GLenum} bufferType
 * @property {number} dimensions
 * @property {GLenum} dataType
 * @property {GLenum} normalized
 * @property {number} stride
 * @property {number} offset
 */
export interface LinkOptions {
  program: WebGLProgram;
  buffer: WebGLBuffer;
  gpuVariable: string;
  dimensions: number;
  bufferType?: GLenum;
  dataType?: GLenum;
  normalized?: boolean;
  stride?: number;
  offset?: number;
}

/**
 * Link GPU and CPU
 * @param {WebGLRenderingContext} gl
 * @param {LinkOptions} options
 * @returns {GLint}
 */
export function linkGPUAndCPU(
  gl: WebGLRenderingContext,
  {
    program,
    buffer,
    gpuVariable,
    dimensions,
    bufferType,
    dataType,
    normalized,
    stride,
    offset,
  }: LinkOptions
): GLint {
  const variable = gl.getAttribLocation(program, gpuVariable);

  gl.enableVertexAttribArray(variable);
  gl.bindBuffer(bufferType || gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(
    variable,
    dimensions,
    dataType || gl.FLOAT,
    !!normalized,
    stride || DEFAULT_STRIDE,
    offset || DEFAULT_OFFSET
  );

  return variable;
}
