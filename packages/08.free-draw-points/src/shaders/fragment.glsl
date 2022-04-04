#version 300 es
precision mediump float;

out vec4 color;
uniform vec4 inputColor;

void main() {
    color = inputColor;
}
