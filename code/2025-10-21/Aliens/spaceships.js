// create spaceships array
let spaceships = [];
let ambientSynth;
let reverb;
let delay;
let bassOsc;
let padOsc;

function setupSpaceships() {
  // Setup audio effects
  reverb = new p5.Reverb();
  delay = new p5.Delay();
  
  // Configure reverb for spacey atmosphere
  reverb.process(delay, 5, 2); // 5 second decay, 2% mix
  delay.process(reverb, 0.4, 0.6, 3000); // delay time, feedback, filter freq
  
  // Create ambient pad oscillator
  padOsc = new p5.Oscillator('sine');
  padOsc.amp(0);
  padOsc.freq(110); // Low A
  padOsc.start();
  reverb.process(padOsc, 3, 2);
  
  // Create bass pulse
  bassOsc = new p5.Oscillator('triangle');
  bassOsc.amp(0);
  bassOsc.freq(55); // Low bass
  bassOsc.start();
  
  // Create 10 spaceships, each with their own alien pilot
  for (let i = 0; i < 10; i++) {
    let angle = random(TWO_PI);
    let speed = random(1, 3);
    
    spaceships.push({
      x: random(width),
      y: random(height),
      speedX: cos(angle) * speed,
      speedY: sin(angle) * speed,
      wobble: random(TWO_PI),
      wobbleSpeed: random(0.02, 0.05),
      lightPhase: random(TWO_PI),
      pilotIndex: i,
      hasPilot: true
    });
  }
  
  // Start ambient loop
  startAmbientLoop();
}

function startAmbientLoop() {
  // Very slow beat pattern (every 3 seconds)
  setInterval(() => {
    playAmbientBeat();
  }, 3000);
  
  // Pad swell pattern (every 6 seconds)
  setInterval(() => {
    playPadSwell();
  }, 6000);
}

function playAmbientBeat() {
  // Soft bass pulse
  bassOsc.amp(0.15, 0.1);
  bassOsc.amp(0, 1.5);
  
  // Add a subtle melodic tone
  let tone = new p5.Oscillator('sine');
  let notes = [220, 247, 277, 330, 370]; // A minor pentatonic
  tone.freq(random(notes));
  tone.amp(0);
  tone.start();
  
  reverb.process(tone, 4, 2);
  delay.process(tone, 0.5, 0.7, 2000);
  
  tone.amp(0.08, 0.2);
  tone.amp(0, 2);
  
  setTimeout(() => {
    tone.stop();
  }, 3000);
}

function playPadSwell() {
  // Slow atmospheric pad swell
  let chordNotes = [110, 165, 220]; // A minor chord
  
  chordNotes.forEach((freq, i) => {
    setTimeout(() => {
      padOsc.freq(freq, 1);
      padOsc.amp(0.06, 2);
      padOsc.amp(0.02, 4);
    }, i * 500);
  });
}

function playHugSound() {
  // Peaceful chime sound with reverb and delay
  let chime = new p5.Oscillator('sine');
  let chime2 = new p5.Oscillator('sine');
  
  // Harmonic intervals for peaceful sound
  let baseFreq = random([220, 247, 277, 330, 370, 440]);
  chime.freq(baseFreq);
  chime2.freq(baseFreq * 1.5); // Perfect fifth
  
  // Process through effects
  reverb.process(chime, 5, 2);
  reverb.process(chime2, 5, 2);
  delay.process(chime, 0.6, 0.5, 2500);
  delay.process(chime2, 0.6, 0.5, 2500);
  
  chime.start();
  chime2.start();
  
  // Gentle attack and long release
  chime.amp(0.15, 0.3);
  chime2.amp(0.1, 0.3);
  
  chime.amp(0, 2);
  chime2.amp(0, 2);
  
  setTimeout(() => {
    chime.stop();
    chime2.stop();
  }, 3000);
  
  // Add a subtle sub-bass pulse
  let sub = new p5.Oscillator('sine');
  sub.freq(baseFreq / 4);
  sub.start();
  sub.amp(0.1, 0.1);
  sub.amp(0, 1);
  
  setTimeout(() => {
    sub.stop();
  }, 1500);
}

function drawSpaceship(x, y, wobble, lightPhase, hasPilot) {
  push();
  translate(x, y);
  
  // Scale down for distance
  scale(0.4);
  
  // Add slight wobble effect
  rotate(sin(wobble) * 0.1);
  
  // Bottom dome shadow
  fill(80, 80, 90);
  noStroke();
  ellipse(0, 8, 50, 15);
  
  // Main saucer body (metallic)
  fill(150, 150, 160);
  ellipse(0, 0, 60, 20);
  
  // Metallic highlights
  fill(180, 180, 200);
  ellipse(-8, -2, 40, 12);
  
  // Metallic shadow
  fill(100, 100, 110);
  ellipse(8, 2, 40, 12);
  
  // Top dome (cockpit)
  fill(120, 120, 140);
  ellipse(0, -8, 30, 20);
  
  // Hublot (window) on center
  fill(100, 150, 200, 150);
  ellipse(0, -10, 15, 12);
  
  // Hublot reflection
  fill(200, 220, 255, 200);
  ellipse(-3, -12, 8, 6);
  
  // Draw pilot alien inside if present
  if (hasPilot) {
    push();
    scale(0.7);
    translate(0, -10);
    drawAlienPilot(0, 0);
    pop();
  }
  
  // Red bubble lights around the saucer
  let numLights = 8;
  for (let i = 0; i < numLights; i++) {
    let angle = (TWO_PI / numLights) * i + lightPhase;
    let lightX = cos(angle) * 28;
    let lightY = sin(angle) * 8;
    
    // Light glow
    let glowIntensity = sin(lightPhase + i) * 0.5 + 0.5;
    fill(255, 0, 0, 100 * glowIntensity);
    ellipse(lightX, lightY, 12, 12);
    
    // Light core
    fill(255, 50, 50, 200 * glowIntensity);
    ellipse(lightX, lightY, 6, 6);
  }
  
  // Metallic edge detail
  stroke(80, 80, 90);
  strokeWeight(1);
  noFill();
  ellipse(0, 0, 58, 18);
  
  pop();
}

function drawAlienPilot(x, y) {
  // Simplified alien for cockpit (no body, just head)
  noStroke();
  fill(0, 255, 0);
  ellipse(x, y, 14, 14);
  
  // Eyes
  fill(255);
  ellipse(x - 3, y, 3.5, 3.5);
  ellipse(x + 3, y, 3.5, 3.5);
  
  // Pupils
  fill(0);
  ellipse(x - 3, y, 1.5, 1.5);
  ellipse(x + 3, y, 1.5, 1.5);
  
  // Smile
  noFill();
  stroke(0);
  strokeWeight(0.8);
  arc(x, y + 3, 6, 4, 0, PI);
  
  // Antennas
  stroke(0, 255, 0);
  strokeWeight(1);
  line(x, y - 7, x - 4, y - 11);
  line(x, y - 7, x + 4, y - 11);
}

function drawSpaceships() {
  for (let i = 0; i < spaceships.length; i++) {
    let ship = spaceships[i];
    
    // Store position in history for trails
    if (ship.pilotIndex < trails.length) {
      trails[ship.pilotIndex].history.push({x: ship.x, y: ship.y});
      if (trails[ship.pilotIndex].history.length > trails[ship.pilotIndex].maxHistory) {
        trails[ship.pilotIndex].history.shift();
      }
    }
    
    // Update position
    ship.x += ship.speedX;
    ship.y += ship.speedY;
    ship.wobble += ship.wobbleSpeed;
    ship.lightPhase += 0.05;
    
    // Wrap around screen edges
    if (ship.x < -100) {
      ship.x = width + 100;
      if (ship.pilotIndex < trails.length) trails[ship.pilotIndex].history = [];
    }
    if (ship.x > width + 100) {
      ship.x = -100;
      if (ship.pilotIndex < trails.length) trails[ship.pilotIndex].history = [];
    }
    if (ship.y < -100) {
      ship.y = height + 100;
      if (ship.pilotIndex < trails.length) trails[ship.pilotIndex].history = [];
    }
    if (ship.y > height + 100) {
      ship.y = -100;
      if (ship.pilotIndex < trails.length) trails[ship.pilotIndex].history = [];
    }
    
    // Update the pilot alien's position to match ship
    if (ship.pilotIndex < values.length) {
      xPositions[ship.pilotIndex] = ship.x;
      values[ship.pilotIndex] = ship.y;
      speeds[ship.pilotIndex].x = ship.speedX;
      speeds[ship.pilotIndex].y = ship.speedY;
    }
    
    // Draw spaceship with pilot (bigger)
    push();
    translate(ship.x, ship.y);
    scale(0.7);
    translate(-ship.x, -ship.y);
    drawSpaceship(ship.x, ship.y, ship.wobble, ship.lightPhase, ship.hasPilot);
    pop();
  }
}