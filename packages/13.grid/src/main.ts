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

const drawGrids = (grids: number): void => {
  let startX = -1.0;
  let startY = -1.0;

  const step = 2.0 / grids;

  let endX = startX + step;
  let endY = startY + step;

  let verticies: number[] = [];
  let colors: number[] = [];

  for (let i = 0; i < grids; i++) {
    for (let j = 0; j < grids; j++) {
      const vec2 = [
        startX,
        startY,
        endX,
        startY,
        startX,
        endY,
        startX,
        endY,
        endX,
        endY,
        endX,
        startY,
      ];

      verticies = verticies.concat(vec2);

      startX = endX;
      endX += step;

      const color = [Math.random(), Math.random(), Math.random()];
      colors = colors
        .concat(color)
        .concat(color)
        .concat(color)
        .concat(color)
        .concat(color)
        .concat(color);
    }
    startX = -1.0;
    startY = endY;
    endX = startX + step;
    endY = startY + step;
  }

  // Step 3: create buffers
  const verticesBuffer = createAndBindBuffer(
    gl,
    gl.ARRAY_BUFFER,
    gl.STATIC_DRAW,
    new Float32Array(verticies)
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
    buffer: verticesBuffer,
    gpuVariable: 'position',
    dimensions: 2,
  });

  linkGPUAndCPU(gl, {
    program,
    buffer: colorBuffer,
    gpuVariable: 'gridColor',
    dimensions: 3,
  });

  // Step 5: render line
  gl.drawArrays(gl.TRIANGLES, 0, verticies.length / 2);
};

const gridInput = <HTMLInputElement>document.getElementById('grids');
gridInput.addEventListener('input', (e) => {
  let target = <HTMLInputElement>e.target;
  if (!target) {
    return;
  }

  const input = Number((<HTMLInputElement>e.target)?.value);
  if (isNaN(input)) {
    return;
  }

  const grids = Math.max(input, 0);
  if (grids === 0) {
    return;
  }

  drawGrids(grids);
});

drawGrids(3);
