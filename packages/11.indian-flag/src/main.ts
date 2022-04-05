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

export function getCircleVertices(
  gl: WebGL2RenderingContext,
  centerX: number,
  centerY: number,
  radiusX: number
): number[][] {
  const radiusY = (radiusX / gl.canvas.height) * gl.canvas.width;
  const numberOfPoints = 240;
  const numberOfLines = 24;
  const factor = numberOfPoints / numberOfLines;

  const vertices = [];
  const lines = [];

  for (let index = 0; index < numberOfPoints; index++) {
    const circumference = 2 * Math.PI * (index / numberOfPoints);
    const x = centerX + radiusX * Math.cos(circumference);
    const y = centerY + radiusY * Math.sin(circumference);
    vertices.push(x, y);
    if ((index + 1) % factor === 0) {
      lines.push(centerX, centerY, x, y);
    }
  }

  return [vertices, lines];
}

const drawShape = (
  vertices: number[],
  color: number[],
  drawingMode: GLenum
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
  gl.drawArrays(drawingMode, 0, vertices.length / 2);
};

const blackColor = [0.0, 0.0, 0.0];
const orangeColor = [1.0, 0.6, 0.2];
const whiteColor = [1.0, 1.0, 1.0];
const greenColor = [0.07, 0.6, 0.02];
const blueColor = [0.0, 0.0, 0.6];

const flagPostCoordinates = [-0.31, 0.7, -0.31, -0.9];
drawShape(flagPostCoordinates, blackColor, gl.LINES);

const orangeRectangleCoordinates = [
  -0.3, 0.7, -0.3, 0.4, 0.4, 0.7, -0.3, 0.4, 0.4, 0.7, 0.4, 0.4,
];
drawShape(orangeRectangleCoordinates, orangeColor, gl.TRIANGLES);

const whiteRectangleCoordinates = [
  -0.3, 0.4, -0.3, 0.1, 0.4, 0.4, 0.4, 0.4, -0.3, 0.1, 0.4, 0.1,
];
drawShape(whiteRectangleCoordinates, whiteColor, gl.TRIANGLES);

const greenRectangleCoordinates = [
  -0.3, 0.1, -0.3, -0.2, 0.4, 0.1, 0.4, 0.1, -0.3, -0.2, 0.4, -0.2,
];
drawShape(greenRectangleCoordinates, greenColor, gl.TRIANGLES);

const [circleCoordinates, spikeCoodinates] = getCircleVertices(
  gl,
  0.05,
  0.25,
  0.08
);
drawShape(circleCoordinates, blueColor, gl.POINTS);
drawShape(spikeCoodinates, blueColor, gl.LINES);
