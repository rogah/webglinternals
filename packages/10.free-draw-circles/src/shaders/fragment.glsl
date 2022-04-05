#version 300 es
precision mediump float;

in vec3 colotToFragmentShader;

out vec4 color;

void main() {
    color = vec4(colotToFragmentShader, 1.0);
}
