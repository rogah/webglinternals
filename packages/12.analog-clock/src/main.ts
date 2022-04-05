import './style.css';

import {
  getContext,
  getProgram,
  createAndBindBuffer,
  linkGPUAndCPU,
  getCircleVertices,
} from '@webglinternals/primitives';

import { vertexShader, fragmentShader } from './shaders';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = getContext(canvas);

// Step 2: create program from shaders
const program = getProgram(gl, vertexShader, fragmentShader);

const drawShape = (
  vertices: number[],
  color: number[],
  drawingMode: GLenum,
  startingIndex: number = 0,
  count: number | undefined = 0
): void => {
  // Step 3: create buffers
  const buffer = createAndBindBuffer(
    gl,
    gl.ARRAY_BUFFER,
    gl.STATIC_DRAW,
    new Float32Array(vertices)
  );

  // Step 4: link GPU variable to CPU and seding data
  gl.useProgram(program);

  linkGPUAndCPU(gl, {
    program,
    buffer,
    gpuVariable: 'position',
    dimensions: 2,
  });

  const inputColor = gl.getUniformLocation(program, 'inputColor');
  gl.uniform3fv(inputColor, color);

  // Step 5: render line
  gl.drawArrays(
    drawingMode,
    startingIndex,
    !count ? vertices.length / 2 : count
  );
};

const blackColor = [0.0, 0.0, 0.0];

const getLineCoodinates = (input: number): number => {
  const start = 15;
  let index = 0;
  if (input <= start) {
    index = start - input;
  } else {
    index = 60 - input + start;
  }
  return index * 2;
};

setInterval(() => {
  const date = new Date();
  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // boarder
  drawShape(getCircleVertices(gl, 0.0, 0.0, 0.3, 1000), blackColor, gl.POINTS);

  // points
  drawShape(getCircleVertices(gl, 0.0, 0.0, 0.27, 60), blackColor, gl.POINTS);

  // seconds
  drawShape(
    getCircleVertices(gl, 0.0, 0.0, 0.27, 60, true),
    blackColor,
    gl.LINES,
    getLineCoodinates(seconds),
    2
  );

  // minutes
  drawShape(
    getCircleVertices(gl, 0.0, 0.0, 0.24, 60, true),
    blackColor,
    gl.LINES,
    getLineCoodinates(minutes),
    2
  );

  // hour
  drawShape(
    getCircleVertices(gl, 0.0, 0.0, 0.18, 60, true),
    blackColor,
    gl.LINES,
    getLineCoodinates(hours * 5 + Math.floor(minutes / 60)),
    2
  );
});
