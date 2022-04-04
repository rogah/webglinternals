import './style.css';

import {
  getContext,
  getProgram,
  createAndBindBuffer,
  linkGPUAndCPU,
  toGPUCoordinates,
} from '@webglinternals/primitives';

import {
  bindDragAndDropEvents,
  unbindDragAndDropEvents,
} from '@webglinternals/dom-events';

import { vertexShader, fragmentShader } from './shaders';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = getContext(canvas);

// Step 2: create program from shaders
const program = getProgram(gl, vertexShader, fragmentShader);

const vertices: number[] = [];

bindDragAndDropEvents(gl.canvas, (start, end) => {
  // Step 3: create buffers
  const { x: startX, y: startY } = toGPUCoordinates(gl, start);
  const { x: endX, y: endY } = toGPUCoordinates(gl, end);

  vertices.push(startX, startY, endX, endY);

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

  const flipY = gl.getUniformLocation(program, 'flipY');
  gl.uniform1f(flipY, -1.0);

  const inputColor = gl.getUniformLocation(program, 'inputColor');
  gl.uniform4fv(inputColor, [Math.random(), Math.random(), Math.random(), 1.0]);

  // Step 5: render rectangle
  gl.drawArrays(gl.POINTS, 0, vertices.length / 2);
});

addEventListener(
  'beforeunload',
  () => {
    unbindDragAndDropEvents();
    vertices.length = 0;
  },
  { capture: true }
);