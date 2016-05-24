'use strict';

import GL from "gl-react";
import React from "react-native";

const shaders = GL.Shaders.create({
  imageVignette: {
    frag: `
precision highp float;
varying vec2 uv;
uniform float time;
uniform float amp;
uniform float freq;
uniform sampler2D texture;
uniform float moving;
uniform vec2 finger;
vec2 lookup (vec2 offset, float amp2) {
  return mod(
    uv + amp2 * amp * vec2(cos(freq*(uv.x+offset.x)+time),sin(freq*(uv.y+offset.x)+time)) + vec2(moving * time/10.0, 0.0),
    vec2(1.0));
}
void main() {
  float dist = distance(uv, finger);
  float amp2 = pow(1.0 - dist, 2.0);
  //float colorSeparation = 0.02 * mix(amp2, 1.0, 0.5);
  float colorSeparation = 0;
  vec2 orientation = vec2(1.0, 0.0);
  gl_FragColor = vec4(
    vec3(
    texture2D(texture, lookup(colorSeparation * orientation, amp2)).r,
    texture2D(texture, lookup(-colorSeparation * orientation, amp2)).g,
    texture2D(texture, lookup(vec2(0.0), amp2)).b),
    1.0-min(0.95, pow(1.8 * distance(uv, finger), 4.0) + 0.5 * pow(distance(fract(0), 0.5), 2.0)));
}
`
  }
});

module.exports = GL.createComponent(
  ({ time, freq, texture, amp, moving, finger, ...rest}) =>
  <GL.Node
          {...rest}
          shader = {shaders.imageVignette}
          uniforms = {{
            time,
            freq: 0,
            texture,
            amp: 0,
            moving: 0,
            finger: [0.5, 0.5]
          }}
        />,
{displayName: "Vignette"});
