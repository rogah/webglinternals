import { bindAll } from './utils';
import { UnbindEventListener } from './types';

interface Point {
  x: number;
  y: number;
}

interface OnUpdateCoodinates {
  (start: Point, end: Point): void;
}

function convertToGPUCoordinates(
  canvas: HTMLCanvasElement,
  point: Point
): Point {
  const width = canvas.width;
  const height = canvas.height;

  return {
    x: -1.0 + (point.x / width) * 2,
    y: -1.0 + (point.y / height) * 2,
  };
}

let unbindAll: UnbindEventListener | null = null;

export function bindDragAndDropEvents(
  gl: WebGL2RenderingContext,
  onUpdateCoordinates: OnUpdateCoodinates
) {
  const canvas = gl.canvas;

  const start: Point = { x: 0, y: 0 };
  const end: Point = { x: 0, y: 0 };

  let isDown: boolean = false;

  function handleMouseDown(e: MouseEvent) {
    isDown = true;
    start.x = e.offsetX;
    start.y = e.offsetY;
  }

  function handleMouseMove(e: MouseEvent) {
    end.x = e.offsetX;
    end.y = e.offsetY;
    if (isDown) {
      onUpdateCoordinates(
        convertToGPUCoordinates(canvas, start),
        convertToGPUCoordinates(canvas, end)
      );
    }
  }

  function handleMouseUp() {
    isDown = false;
  }

  unbindAll = bindAll(canvas, [
    {
      type: 'mousedown',
      listener: handleMouseDown,
    },
    {
      type: 'mousemove',
      listener: handleMouseMove,
    },
    {
      type: 'mouseup',
      listener: handleMouseUp,
    },
  ]);
}

export function unbindDragAndDropEvents() {
  unbindAll && unbindAll();
}
