let worley;

const numberOfFeatures = 17; // must also be changed in shader using uniform-generator
let features = [];

let video;
let poseNet;
let pose;

let aspectRatio;

function size() {
  return windowWidth < windowHeight ? windowWidth * 3 / 4 : windowHeight * 3 / 4;
}

function preload() {
  worley = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  const c = createCanvas(size(), size(), WEBGL);
  c.parent('container');
  
  for (let i = 0; i < numberOfFeatures; ++i) {
    features.push(createVector(random(), random()));
  }

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  
}

function windowResized() {
  resizeCanvas(size(), size());
}

function gotPoses(poses) {
  //console.log(poses); 
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  translate(-width/2, -height/2);

  if (pose) {

    shader(worley);

    for (let i = 0; i < features.length; i++) {
      features[i].set(
        map(pose.keypoints[i].position.x, 0, video.width, 1, 0), 
        map(pose.keypoints[i].position.y, 0, video.width, 1, 0)
      );
    }

    arrayUniform(worley, 'features', features);

    rect(0,0,width, height);
    
  }
}

function arrayUniform(shader_, uniformName, vectorArray) {
  for (let i = 0; i < vectorArray.length; ++i) {
    shader_.setUniform(uniformName + i, [vectorArray[i].x, vectorArray[i].y]);
  }
}