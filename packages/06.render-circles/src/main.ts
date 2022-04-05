import './style.css';

import {
  getContext,
  getProgram,
  createAndBindBuffer,
  linkGPUAndCPU,
} from '@webglinternals/primitives';

import { vertexShader, fragmentShader } from './shaders';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = getContext(canvas);

// Step 2: create program from shaders
const program = getProgram(gl, vertexShader, fragmentShader);

// Step 3: create buffers
const getCircleVertices = () => {
  const centerX = 0.0;
  const centerY = 0.0;
  const radiusX = 0.4;
  const radiusY = (radiusX / gl.canvas.height) * gl.canvas.width;
  const numberOfPoints = 300;

  const vertices = [];

  for (let index = 0; index < numberOfPoints; index++) {
    const circumference = 2 * Math.PI * (index / numberOfPoints);
    const x = centerX + radiusX * Math.cos(circumference);
    const y = centerY + radiusY * Math.sin(circumference);
    vertices.push(x, y);
  }

  return vertices;
};
const vertices = getCircleVertices();

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

// Step 5: render rectangle
gl.drawArrays(gl.POINTS, 0, vertices.length / 2);
//gl.drawArrays(gl.LINES, 0, vertices.length / 2);
