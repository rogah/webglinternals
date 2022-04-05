#version 300 es
precision mediump float;

in vec2 position;
in vec3 colorFromCPU;

out vec3 colotToFragmentShader;

uniform float flipY;

void main() {
    gl_Position = vec4(position.x, position.y * flipY, 0.0, 1.0);
    gl_PointSize = 5.0;
    colotToFragmentShader = colorFromCPU;
}
