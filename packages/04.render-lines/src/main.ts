import './style.css';

import {
  getContext,
  getProgram,
  createAndBindBuffer,
  linkGPUAndCPU,
} from '@webglinternals/common';

import { vertexShader, fragmentShader } from './shaders';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = getContext(canvas);

// Step 2: create program from shaders
const program = getProgram(gl, vertexShader, fragmentShader);

// Step 3: create buffers
const vertices = [-0.6, 0.6, 0.6, 0.6, -0.6, -0.6, 0.6, -0.6];

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
  bufferType: gl.ARRAY_BUFFER,
  dimensions: 2,
  dataType: gl.FLOAT,
  normalized: false,
  stride: 0,
  offset: 0,
});

// Step 5: render rectangle
gl.drawArrays(gl.LINES, 0, vertices.length / 2);