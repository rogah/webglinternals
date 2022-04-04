import { Point } from '@webglinternals/types';

export function toGPUCoordinates(
  gl: WebGL2RenderingContext,
  point: Point
): Point {
  const canvas = gl.canvas;
  const width = canvas.width;
  const height = canvas.height;

  return {
    x: -1.0 + (point.x / width) * 2,
    y: -1.0 + (point.y / height) * 2,
  };
}
