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
console.log(gl);

const triagleCoordinates = [0.0, -1.0, 0.0, 1.0, 1.0, -1.0];

// Step 1: write shaders
// External mported from ./shaders
// const vertexShader = `#version 300 es
//   precision mediump float;

//   in vec2 position;

//   void main() {
//     gl_Position = vec4(position, 0.0, 1.0);
//   }
//   `;

// const fragmentShader = `#version 300 es
//   precision mediump float;

//   out vec4 color;

//   void main() {
//     color = vec4(0.0, 0.0, 1.0, 1.0);
//   }
//   `;

// Step 2: create program from shaders
const program = getProgram(gl, vertexShader, fragmentShader);
console.log(program);

// Step 3: create buffers
const buffer = createAndBindBuffer(
  gl,
  gl.ARRAY_BUFFER,
  gl.STATIC_DRAW,
  new Float32Array(triagleCoordinates)
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

// Step 5: render triagle
gl.drawArrays(gl.TRIANGLES, 0, 3);
