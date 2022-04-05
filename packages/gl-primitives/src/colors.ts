import { Color, Point } from '@webglinternals/types';

export function toGPUColor(gl: WebGL2RenderingContext, rgbColor: Color): Color {
  const colorSpec = gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT;
  return {
    red: rgbColor.red / colorSpec,
    green: rgbColor.green / colorSpec,
    blue: rgbColor.blue / colorSpec,
    alpha: rgbColor.alpha / colorSpec,
  };
}

export function coordinatesToColor(start: Point, end: Point): Color {
  return {
    red: start.x,
    green: start.y,
    blue: end.x,
    alpha: end.y,
  };
}

export function toGPUTextureColor(
  gl: WebGL2RenderingContext,
  rgbColor: Color
): Color {
  const canvas = gl.canvas;
  const width = canvas.width;
  const height = canvas.height;

  return {
    red: rgbColor.red / width,
    green: rgbColor.green / height,
    blue: rgbColor.blue / width,
    alpha: rgbColor.alpha / height,
  };
}
