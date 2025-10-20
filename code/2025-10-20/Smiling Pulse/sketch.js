function setup() {
  // Create a canvas that fills the entire window
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  // Set background color
  background(220);

  // Calculate size for pulsing effect
  const pulse = map(sin(frameCount * 0.1), -1, 1, 80, 120);
  
  // Draw the smiling emoji at the center of the canvas
  drawSmilingEmoji(width / 2, height / 2, pulse);
}

// Make a smiling emoji that is pulsing like a heartbeat
function drawSmilingEmoji(x, y, size) {
  // Face
  fill(255, 204, 0);
  ellipse(x, y, size); // face

  // Eyes
  fill(0);
  const eye = size * 0.1;
  ellipse(x - size * 0.2, y - size * 0.1, eye);
  ellipse(x + size * 0.2, y - size * 0.1, eye);

  // Smile
  noFill();
  stroke(0);
  strokeWeight(4);
  arc(x, y + size * 0.1, size * 0.6, size * 0.6, 0, PI); // smile
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}