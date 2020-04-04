precision mediump float;
varying vec2 vTexCoord;

uniform float aspectRatio;

uniform vec2 features0;
uniform vec2 features1;
uniform vec2 features2;
uniform vec2 features3;
uniform vec2 features4;
uniform vec2 features5;
uniform vec2 features6;
uniform vec2 features7;
uniform vec2 features8;
uniform vec2 features9;
uniform vec2 features10;
uniform vec2 features11;
uniform vec2 features12;
uniform vec2 features13;
uniform vec2 features14;
uniform vec2 features15;
uniform vec2 features16;

void main() {
  vec2 coord = vTexCoord;
  
  vec2 feat[17];
  feat[0] = features0;
  feat[1] = features1;
  feat[2] = features2;
  feat[3] = features3;
  feat[4] = features4;
  feat[5] = features5;
  feat[6] = features6;
  feat[7] = features7;
  feat[8] = features8;
  feat[9] = features9;
  feat[10] = features10;
  feat[11] = features11;
  feat[12] = features12;
  feat[13] = features13;
  feat[14] = features14;
  feat[15] = features15;
  feat[16] = features16;
  
  float dist0 = 1.0;
  float dist1 = 1.0;
  float dist2 = 1.0;
  
  for (int i = 0; i < 17; i++) {
    float dist = distance(coord, feat[i]);
    if (dist < dist0) {
      dist2 = dist1;
      dist1 = dist0;
      dist0 = dist;
    } else if (dist < dist1) {
      dist2 = dist1;
      dist1 = dist;
    } else if (dist < dist2) {
      dist2 = dist;
    }
  }

  float r = 1.0 - dist1 * 5.0;
  float g = 1.0 - dist2 * 10.0;
  float b = 1.0 - dist0 * 3.0;

  gl_FragColor = vec4(r, g, b, 1.0);
}
