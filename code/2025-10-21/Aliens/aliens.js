function checkCollision(i, j) {
  let distance = dist(xPositions[i], values[i], xPositions[j], values[j]);
  return distance < 20;
}

function drawAlien(x, y, isScreaming) {
  // This is now replaced by draw3DAlien in the main sketch
  // Keeping this for compatibility
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
