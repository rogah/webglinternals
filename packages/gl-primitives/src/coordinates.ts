import { Point } from '@webglinternals/types';

export function toGPUCoordinates(
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
