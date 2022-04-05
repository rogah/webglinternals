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

export function gpuToZeroToTwoCoordinates(start: Point, end: Point): Point[] {
  return [
    {
      x: 1.0 + start.x,
      y: 1.0 + start.y,
    },
    {
      x: 1.0 + end.x,
      y: 1.0 + end.y,
    },
  ];
}

export function getCircleVertices(
  gl: WebGL2RenderingContext,
  centerX: number,
  centerY: number,
  radiusX: number,
  numberOfPoints: number | undefined = 300,
  isLine: boolean = false
): number[] {
  const radiusY = (radiusX / gl.canvas.height) * gl.canvas.width;

  const vertices = [];

  for (let index = 0; index < numberOfPoints; index++) {
    const circumference = 2 * Math.PI * (index / numberOfPoints);
    const x = centerX + radiusX * Math.cos(circumference);
    const y = centerY + radiusY * Math.sin(circumference);
    if (isLine) {
      vertices.push(centerX, centerY);
    }
    vertices.push(x, y);
  }

  return vertices;
}
