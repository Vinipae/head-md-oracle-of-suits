// create an empty array
let values = [];
let xPositions = []; // New array for x positions
let speeds = [];     // New array for movement speeds
let screams = [];    // New array to track screaming aliens
let hugSound;        // Sound variable

function preload() {
  // Load sound - you can use the built-in oscillator for now
  // Or load a sound file: hugSound = loadSound('hug.mp3');
}

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
    screams.push(0); // 0 means not screaming
  }
  
  // Setup audio for user interaction
  userStartAudio();
}

function playHugSound() {
  // Create a simple beep sound using Web Audio API
  let osc = new p5.Oscillator('sine');
  osc.freq(800); // High pitch
  osc.amp(0.3);
  osc.start();
  
  // Quick fade out
  osc.amp(0, 0.1);
  setTimeout(() => {
    osc.stop();
  }, 150);
}

function drawAlien(x, y, isScreaming) {
  // Body (drawn first so it appears behind)
  noStroke();
  fill(0, 200, 0);
  ellipse(x, y + 15, 15, 20);
  
  // Arms (drawn before head)
  stroke(0, 200, 0);
  strokeWeight(2);
  // Left arm with wave animation (more dramatic when screaming)
  let waveAmount = isScreaming ? 10 : 3;
  let leftArmX = x - 15 + sin(frameCount * 0.1) * waveAmount;
  let leftArmY = y + 15 + cos(frameCount * 0.1) * 2;
  line(x - 7, y + 15, leftArmX, leftArmY);
  
  // Right arm with wave animation
  let rightArmX = x + 15 + sin(frameCount * 0.1 + PI) * waveAmount;
  let rightArmY = y + 15 + cos(frameCount * 0.1 + PI) * 2;
  line(x + 7, y + 15, rightArmX, rightArmY);
  
  // Antennas
  stroke(0, 255, 0);
  strokeWeight(2);
  line(x, y - 10, x - 8, y - 20);  // Left antenna
  line(x, y - 10, x + 8, y - 20);  // Right antenna
  
  // Head (drawn on top)
  noStroke();
  fill(0, 255, 0);
  ellipse(x, y, 20, 20);
  
  // Eyes with pupils (wider when screaming)
  fill(255);
  let eyeSize = isScreaming ? 7 : 5;
  ellipse(x - 4, y, eyeSize, eyeSize);    // Left eye
  ellipse(x + 4, y, eyeSize, eyeSize);    // Right eye
  
  // Black pupils
  fill(0);
  ellipse(x - 4, y, 2, 2);    // Left pupil
  ellipse(x + 4, y, 2, 2);    // Right pupil
  
  // Mouth - O shape when screaming, smile when not
  noFill();
  stroke(0);
  strokeWeight(1);
  if (isScreaming) {
    ellipse(x, y + 5, 6, 8); // O mouth for screaming
  } else {
    arc(x, y + 4, 8, 6, 0, PI);  // Simple black smile
  }
  
  // Hug text only (no hearts)
  if (isScreaming) {
    fill(255, 100, 200);
    noStroke();
    textSize(12);
    textAlign(CENTER);
    text("HUG!", x, y - 25);
  }
}

function checkCollision(i, j) {
  let d = dist(xPositions[i], values[i], xPositions[j], values[j]);
  return d < 30; // Collision if aliens are closer than 30 pixels
}

function draw() {
  background(0);
  
  // Check collisions between all aliens
  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) {
      if (checkCollision(i, j)) {
        // Only play sound and set scream if not already screaming
        if (screams[i] === 0 && screams[j] === 0) {
          playHugSound();
        }
        
        // Bounce off each other
        let tempX = speeds[i].x;
        let tempY = speeds[i].y;
        speeds[i].x = speeds[j].x;
        speeds[i].y = speeds[j].y;
        speeds[j].x = tempX;
        speeds[j].y = tempY;
        
        // Make them scream
        screams[i] = 30; // Scream for 30 frames
        screams[j] = 30;
      }
    }
  }
  
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
    
    // Update scream counter
    if (screams[i] > 0) {
      screams[i]--;
    }
    
    // Draw complete alien
    drawAlien(xPositions[i], values[i], screams[i] > 0);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
