import { Point } from '@webglinternals/types';

import { bindAll } from './utils';
import { UnbindEventListener } from './types';

interface OnUpdateCoodinates {
  (start: Point, end: Point): void;
}

let unbindAll: UnbindEventListener | null = null;

export function bindDragAndDropEvents(
  canvas: HTMLCanvasElement,
  onUpdateCoordinates: OnUpdateCoodinates
) {
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
      onUpdateCoordinates(start, end);
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
