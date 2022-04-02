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
  bufferType: GLenum;
  dimensions: number;
  dataType: GLenum;
  normalized: boolean;
  stride: number;
  offset: number;
}

/**
 * Link GPU and CPU
 * @param {LinkOptions} options
 * @returns {GLint}
 */
export function linkGPUAndCPU(
  gl: WebGLRenderingContext,
  {
    program,
    buffer,
    gpuVariable,
    bufferType,
    dimensions,
    dataType,
    normalized,
    stride,
    offset,
  }: LinkOptions
): GLint {
  const variable = gl.getAttribLocation(program, gpuVariable);

  gl.enableVertexAttribArray(variable);
  gl.bindBuffer(bufferType, buffer);
  gl.vertexAttribPointer(
    variable,
    dimensions,
    dataType,
    normalized,
    stride,
    offset
  );

  return variable;
}
