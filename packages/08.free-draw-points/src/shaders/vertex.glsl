#version 300 es
precision mediump float;

in vec2 position;
uniform float flipY;

void main() {
    gl_Position = vec4(position.x, position.y * flipY, 0.0, 1.0);
    gl_PointSize = 10.0;
}
