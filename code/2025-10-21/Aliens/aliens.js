function drawAlien(x, y, isScreaming) {
  // Body (drawn first so it appears behind) - reduced size
  noStroke();
  fill(0, 200, 0);
  ellipse(x, y + 8, 10, 12);  // Changed from 15, 20
  
  // Arms (drawn before head) - shorter arms
  stroke(0, 200, 0);
  strokeWeight(1.5);  // Changed from 2
  // Left arm with wave animation (more dramatic when screaming)
  let waveAmount = isScreaming ? 6 : 2;  // Changed from 10, 3
  let leftArmX = x - 10 + sin(frameCount * 0.1) * waveAmount;  // Changed from -15
  let leftArmY = y + 8 + cos(frameCount * 0.1) * 2;  // Changed from y + 15
  line(x - 5, y + 8, leftArmX, leftArmY);  // Changed from -7, y + 15
  
  // Right arm with wave animation
  let rightArmX = x + 10 + sin(frameCount * 0.1 + PI) * waveAmount;  // Changed from +15
  let rightArmY = y + 8 + cos(frameCount * 0.1 + PI) * 2;  // Changed from y + 15
  line(x + 5, y + 8, rightArmX, rightArmY);  // Changed from +7, y + 15
  
  // Antennas - shorter
  stroke(0, 255, 0);
  strokeWeight(1.5);  // Changed from 2
  line(x, y - 7, x - 5, y - 13);  // Changed from -10, -8, -20
  line(x, y - 7, x + 5, y - 13);  // Changed from -10, +8, -20
  
  // Head (drawn on top) - smaller
  noStroke();
  fill(0, 255, 0);
  ellipse(x, y, 14, 14);  // Changed from 20, 20
  
  // Eyes with pupils (wider when screaming) - smaller
  fill(255);
  let eyeSize = isScreaming ? 5 : 3.5;  // Changed from 7, 5
  ellipse(x - 3, y, eyeSize, eyeSize);    // Changed from -4
  ellipse(x + 3, y, eyeSize, eyeSize);    // Changed from +4
  
  // Black pupils - smaller
  fill(0);
  ellipse(x - 3, y, 1.5, 1.5);    // Changed from -4, 2, 2
  ellipse(x + 3, y, 1.5, 1.5);    // Changed from +4, 2, 2
  
  // Mouth - O shape when screaming, smile when not - smaller
  noFill();
  stroke(0);
  strokeWeight(0.8);  // Changed from 1
  if (isScreaming) {
    ellipse(x, y + 3, 4, 5);  // Changed from y + 5, 6, 8
  } else {
    arc(x, y + 3, 6, 4, 0, PI);  // Changed from y + 4, 8, 6
  }
  
  // Hug text only (no hearts) - smaller text
  if (isScreaming) {
    fill(255, 100, 200);
    noStroke();
    textSize(8);  // Changed from 12
    textAlign(CENTER);
    text("HUG!", x, y - 18);  // Changed from -25
  }
}

function checkCollision(i, j) {
  let d = dist(xPositions[i], values[i], xPositions[j], values[j]);
  return d < 20; // Changed from 30 - smaller collision range
}

function isAlienInSpaceship(alienIndex) {
  // Check if this alien is a pilot
  for (let ship of spaceships) {
    if (ship.pilotIndex === alienIndex) {
      return true;
    }
  }
  return false;
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
    if (!isAlienInSpaceship(i)) {
      drawAlien(xPositions[i], values[i], screams[i] > 0);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function playHugSound() {
  // Create a cute "eee!" sound with pitch rise
  let osc = new p5.Oscillator('sine');
  
  // Start at a medium pitch and rise up
  osc.freq(600);
  osc.amp(0.2);
  osc.start();
  
  // Pitch goes up quickly for excitement
  osc.freq(1200, 0.15);
  
  // Quick fade out
  osc.amp(0, 0.2);
  
  setTimeout(() => {
    osc.stop();
  }, 200);
}
