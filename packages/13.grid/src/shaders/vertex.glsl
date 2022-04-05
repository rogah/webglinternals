#version 300 es
precision mediump float;

in vec2 position;
in vec3 gridColor;

out vec3 gcolor;

void main() {
    gcolor = gridColor;
    gl_Position = vec4(position, 0.0, 1.0);
}
