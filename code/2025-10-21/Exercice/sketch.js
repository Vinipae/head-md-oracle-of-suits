function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  circle(width*0.5, height*0.5, frameCount * 0.1);
  // Print the frame count to the console
  print(frameCount)
}

let x;
let Y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width * 0.5;
  y = height * 0.5;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  // add a little wiggle to the circle position
  x += random(-1, 1);
  y += random(-1, 1);
  circle(x, y, 50);
  }

  function mousePressed() {
    x = mouseX;
    y = mouseY;
  }
