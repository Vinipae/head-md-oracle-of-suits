// detections variable comes from MediaPipeHands.js
let error404Particles = [];
let glitchOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupHands();
  setupVideo();
}

function draw() {
  // Digital void background with glitch effect
  drawGlitchBackground();
  
  // Hide any HTML text elements
  let elements = document.querySelectorAll('h1, h2, h3, p, div');
  elements.forEach(el => el.style.display = 'none');
  
  // ERROR 404 AT FINGERTIPS
  if (detections && detections.multiHandLandmarks) {
    spawnError404FromFingertips();
  }
  
  // Update and draw all error particles
  updateAndDrawErrors();
}

function drawGlitchBackground() {
  // Dark digital background
  background(0);
  
  // Random glitch lines
  if (frameCount % 3 === 0) {
    glitchOffset = random(-20, 20);
  }
  
  stroke(255, 0, 0, 30);
  strokeWeight(1);
  for (let i = 0; i < 5; i++) {
    let y = random(height);
    line(0, y + glitchOffset, width, y + glitchOffset);
  }
  
  // Grid overlay
  stroke(0, 100, 0, 20);
  strokeWeight(1);
  for (let x = 0; x < width; x += 50) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += 50) {
    line(0, y, width, y);
  }
}

function spawnError404FromFingertips() {
  for (let i = 0; i < detections.multiHandLandmarks.length; i++) {
    let hand = detections.multiHandLandmarks[i];
    
    // Spawn from all fingertips
    for (let tipIndex of [4, 8, 12, 16, 20]) {
      let tip = hand[tipIndex];
      let x = tip.x * width;
      let y = tip.y * height;
      
      // Spawn error messages every few frames
      if (frameCount % 3 === 0) {
        error404Particles.push({
          x: x,
          y: y,
          vx: random(-2, 2),
          vy: random(-3, -1),
          life: 255,
          glitchType: floor(random(0, 4)),
          size: random(0.5, 1.5),
          rotation: random(TWO_PI)
        });
      }
      
      // Draw error symbol at fingertip
      drawError404Symbol(x, y, tipIndex);
    }
  }
}

function drawError404Symbol(x, y, seed) {
  push();
  translate(x, y);
  
  let pulse = sin(frameCount * 0.2 + seed) * 3;
  
  // Red warning circle
  noFill();
  stroke(255, 0, 0, 200);
  strokeWeight(3);
  circle(0, 0, 40 + pulse);
  
  // ERROR text
  fill(255, 0, 0);
  noStroke();
  textAlign(CENTER, CENTER);
  textFont('Courier New');
  textSize(10);
  text('404', 0, 0);
  
  // X symbol
  stroke(255, 0, 0, 150);
  strokeWeight(2);
  line(-15, -15, 15, 15);
  line(15, -15, -15, 15);
  
  // Glitch particles around fingertip
  for (let i = 0; i < 3; i++) {
    let angle = frameCount * 0.1 + seed + i * TWO_PI / 3;
    let dist = 25 + pulse;
    let px = cos(angle) * dist;
    let py = sin(angle) * dist;
    
    fill(255, 0, 0, 150);
    noStroke();
    rect(px - 2, py - 2, 4, 4);
  }
  
  pop();
}

function updateAndDrawErrors() {
  // Remove old particles
  for (let i = error404Particles.length - 1; i >= 0; i--) {
    let p = error404Particles[i];
    p.life -= 3;
    if (p.life <= 0) {
      error404Particles.splice(i, 1);
    }
  }
  
  // Limit particle count for performance
  if (error404Particles.length > 500) {
    error404Particles.splice(0, error404Particles.length - 500);
  }
  
  // Draw particles
  for (let p of error404Particles) {
    // Update position
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.1; // gravity
    p.rotation += 0.1;
    
    push();
    translate(p.x, p.y);
    rotate(p.rotation);
    
    // Draw different error messages
    let messages = [
      '404',
      'ERROR',
      'NOT FOUND',
      'FAILED'
    ];
    
    let glitchColors = [
      color(255, 0, 0),
      color(0, 255, 0),
      color(0, 100, 255),
      color(255, 255, 0)
    ];
    
    fill(glitchColors[p.glitchType % glitchColors.length]);
    textAlign(CENTER, CENTER);
    textFont('Courier New');
    textSize(12 * p.size);
    
    // Add glitch effect
    if (random() > 0.7) {
      fill(255, 0, 0, p.life);
      text(messages[p.glitchType], random(-2, 2), random(-2, 2));
    }
    
    fill(glitchColors[p.glitchType % glitchColors.length]);
    textStyle(BOLD);
    text(messages[p.glitchType], 0, 0);
    
    // Pixel corruption effect
    if (random() > 0.8) {
      stroke(255, 0, 0, p.life * 0.5);
      strokeWeight(1);
      for (let i = 0; i < 5; i++) {
        point(random(-20, 20), random(-20, 20));
      }
    }
    
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
