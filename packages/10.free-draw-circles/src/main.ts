import './style.css';

import {
  getContext,
  getProgram,
  createAndBindBuffer,
  linkGPUAndCPU,
  toGPUCoordinates,
  gpuToZeroToTwoCoordinates,
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

const getCircleVertices = (
  centerX: number,
  centerY: number,
  radiusX: number
): number[][] => {
  const radiusY = (radiusX / gl.canvas.height) * gl.canvas.width;
  const numberOfPoints = 300;

  const vertices = [];
  const colors = [];

  for (let index = 0; index < numberOfPoints; index++) {
    const circumference = 2 * Math.PI * (index / numberOfPoints);
    const x = centerX + radiusX * Math.cos(circumference);
    const y = centerY + radiusY * Math.sin(circumference);
    vertices.push(x, y);
    colors.push(Math.random(), Math.random(), Math.random());
  }

  return [vertices, colors];
};

bindDragAndDropEvents(gl.canvas, (start, end) => {
  // Step 3: create buffers
  const gpuStart = toGPUCoordinates(gl, start);
  const gpuEnd = toGPUCoordinates(gl, end);

  const [
    { x: centerStartX, y: centerStartY },
    { x: centerEndX, y: centerEndY },
  ] = gpuToZeroToTwoCoordinates(gpuStart, gpuEnd);

  const centerX = gpuStart.x + (centerEndX - centerStartX) / 2;
  const centerY = gpuStart.y + (centerEndY - centerStartY) / 2;
  const radiusX = (centerEndX - centerStartX) / 2;

  const [vertices, colors] = getCircleVertices(centerX, centerY, radiusX);

  const positionBuffer = createAndBindBuffer(
    gl,
    gl.ARRAY_BUFFER,
    gl.STATIC_DRAW,
    new Float32Array(vertices)
  );

  const colorBuffer = createAndBindBuffer(
    gl,
    gl.ARRAY_BUFFER,
    gl.STATIC_DRAW,
    new Float32Array(colors)
  );

  // Step 4: link GPU variable to CPU and seding data
  gl.useProgram(program);

  linkGPUAndCPU(gl, {
    program,
    buffer: positionBuffer,
    gpuVariable: 'position',
    dimensions: 2,
  });

  linkGPUAndCPU(gl, {
    program,
    buffer: colorBuffer,
    gpuVariable: 'colorFromCPU',
    dimensions: 3,
  });

  const flipY = gl.getUniformLocation(program, 'flipY');
  gl.uniform1f(flipY, -1.0);

  // Step 5: render rectangle
  gl.drawArrays(gl.POINTS, 0, vertices.length / 2);
});

addEventListener(
  'beforeunload',
  () => {
    unbindDragAndDropEvents();
  },
  { capture: true }
);
