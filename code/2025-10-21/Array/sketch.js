// create an empty array
let values = [];
let xPositions = []; // New array for x positions
let speeds = [];     // New array for movement speeds

function setup() {
  // fit the canvas to the window size
  createCanvas(windowWidth, windowHeight);
  
  // Initialize arrays with random positions and speeds
  for (let i = 0; i < 100; i++) {
    values.push(random(height));
    xPositions.push(random(width));
    speeds.push({
      x: random(-2, 2),
      y: random(-2, 2)
    });
  }
}

function drawAlien(x, y) {
  // Antennas
  stroke(0, 255, 0);
  strokeWeight(2);
  line(x, y - 10, x - 8, y - 20);  // Left antenna
  line(x, y - 10, x + 8, y - 20);  // Right antenna
  
  // Head
  noStroke();
  fill(0, 255, 0);
  ellipse(x, y, 20, 20);
  
  // Eyes with pupils
  // White part of eyes
  fill(255);
  ellipse(x - 4, y, 5, 5);    // Left eye
  ellipse(x + 4, y, 5, 5);    // Right eye
  
  // Black pupils
  fill(0);
  ellipse(x - 4, y, 2, 2);    // Left pupil
  ellipse(x + 4, y, 2, 2);    // Right pupil
  
  // Add smiling mouth
  noFill();
  stroke(0);
  strokeWeight(1);
  arc(x, y + 4, 8, 6, 0, PI);  // Simple black smile
  
  // Body
  fill(0, 200, 0);
  ellipse(x, y + 15, 15, 20);
  
  // Arms
  stroke(0, 200, 0);
  strokeWeight(2);
  // Left arm with wave animation
  let leftArmX = x - 15 + sin(frameCount * 0.1) * 3;
  let leftArmY = y + 15 + cos(frameCount * 0.1) * 2;
  line(x - 7, y + 15, leftArmX, leftArmY);
  
  // Right arm with wave animation
  let rightArmX = x + 15 + sin(frameCount * 0.1 + PI) * 3;
  let rightArmY = y + 15 + cos(frameCount * 0.1 + PI) * 2;
  line(x + 7, y + 15, rightArmX, rightArmY);
}

function draw() {
  background(0);
  
  // Update and draw aliens
  for (let i = 0; i < values.length; i++) {
    // Update positions
    xPositions[i] += speeds[i].x;
    values[i] += speeds[i].y;
    
    // Bounce off edges
    if (xPositions[i] < 0 || xPositions[i] > width) {
      speeds[i].x *= -1;
    }
    if (values[i] < 0 || values[i] > height) {
      speeds[i].y *= -1;
    }
    
    // Draw complete alien
    drawAlien(xPositions[i], values[i]);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
