#version 300 es
precision mediump float;

out vec4 color;
in vec3 gcolor;

void main () {
    color = vec4(gcolor, 1.0);
}