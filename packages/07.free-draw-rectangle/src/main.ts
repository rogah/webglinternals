import './style.css';

import {
  getContext,
  getProgram,
  createAndBindBuffer,
  linkGPUAndCPU,
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

bindDragAndDropEvents(gl, (start, end) => {
  // Step 3: create buffers
  const vertices = [
    start.x,
    start.y,
    end.x,
    start.y,
    start.x,
    end.y,
    start.x,
    end.y,
    end.x,
    end.y,
    end.x,
    start.y,
  ];

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

  // Step 5: render rectangle
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
});

addEventListener(
  'beforeunload',
  () => {
    unbindDragAndDropEvents();
  },
  { capture: true }
);
