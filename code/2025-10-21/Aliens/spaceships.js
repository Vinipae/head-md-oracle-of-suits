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
  
  reverb.process(delay, 5, 2);
  delay.process(reverb, 0.4, 0.6, 3000);
  
  padOsc = new p5.Oscillator('sine');
  padOsc.amp(0);
  padOsc.freq(110);
  padOsc.start();
  reverb.process(padOsc, 3, 2);
  
  bassOsc = new p5.Oscillator('triangle');
  bassOsc.amp(0);
  bassOsc.freq(55);
  bassOsc.start();
  
  // Create 10 spaceships in 3D space
  for (let i = 0; i < 10; i++) {
    let angle = random(TWO_PI);
    let angle2 = random(TWO_PI);
    let speed = random(1, 3);
    
    spaceships.push({
      x: random(-width/2, width/2),
      y: random(-height/2, height/2),
      z: random(-400, 400),
      speedX: cos(angle) * speed,
      speedY: sin(angle) * speed,
      speedZ: cos(angle2) * speed,
      wobble: random(TWO_PI),
      wobbleSpeed: random(0.02, 0.05),
      lightPhase: random(TWO_PI),
      pilotIndex: i,
      hasPilot: true
    });
  }
  
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

function draw3DSpaceships() {
  for (let i = 0; i < spaceships.length; i++) {
    let ship = spaceships[i];
    
    // Store position in history for trails
    if (ship.pilotIndex < trails.length) {
      trails[ship.pilotIndex].history.push({x: ship.x, y: ship.y, z: ship.z});
      if (trails[ship.pilotIndex].history.length > trails[ship.pilotIndex].maxHistory) {
        trails[ship.pilotIndex].history.shift();
      }
    }
    
    // Update position
    ship.x += ship.speedX;
    ship.y += ship.speedY;
    ship.z += ship.speedZ;
    ship.wobble += ship.wobbleSpeed;
    ship.lightPhase += 0.05;
    
    // Wrap around 3D space
    if (ship.x < -width/2 - 100) {
      ship.x = width/2 + 100;
      if (ship.pilotIndex < trails.length) trails[ship.pilotIndex].history = [];
    }
    if (ship.x > width/2 + 100) {
      ship.x = -width/2 - 100;
      if (ship.pilotIndex < trails.length) trails[ship.pilotIndex].history = [];
    }
    if (ship.y < -height/2 - 100) {
      ship.y = height/2 + 100;
      if (ship.pilotIndex < trails.length) trails[ship.pilotIndex].history = [];
    }
    if (ship.y > height/2 + 100) {
      ship.y = -height/2 - 100;
      if (ship.pilotIndex < trails.length) trails[ship.pilotIndex].history = [];
    }
    if (ship.z < -500) {
      ship.z = 500;
      if (ship.pilotIndex < trails.length) trails[ship.pilotIndex].history = [];
    }
    if (ship.z > 500) {
      ship.z = -500;
      if (ship.pilotIndex < trails.length) trails[ship.pilotIndex].history = [];
    }
    
    // Update the pilot alien's position to match ship
    if (ship.pilotIndex < values.length) {
      xPositions[ship.pilotIndex] = ship.x;
      values[ship.pilotIndex] = ship.y;
      zPositions[ship.pilotIndex] = ship.z;
      speeds[ship.pilotIndex].x = ship.speedX;
      speeds[ship.pilotIndex].y = ship.speedY;
      speeds[ship.pilotIndex].z = ship.speedZ;
    }
    
    // Draw 3D spaceship
    push();
    translate(ship.x, ship.y, ship.z);
    rotateY(ship.wobble);
    
    // Bottom dome shadow
    ambientMaterial(80, 80, 90);
    push();
    translate(0, 8, 0);
    scale(1, 0.3, 1);
    sphere(25);
    pop();
    
    // Main saucer body
    ambientMaterial(150, 150, 160);
    push();
    scale(1, 0.3, 1);
    sphere(30);
    pop();
    
    // Top dome (cockpit)
    push();
    translate(0, -8, 0);
    ambientMaterial(120, 120, 140);
    sphere(15);
    
    // Pilot visible in cockpit
    if (ship.hasPilot && ship.pilotIndex < trails.length) {
      push();
      scale(0.5);
      ambientMaterial(trails[ship.pilotIndex].color);
      sphere(8);
      pop();
    }
    pop();
    
    // Red bubble lights
    for (let j = 0; j < 8; j++) {
      let angle = (TWO_PI / 8) * j + ship.lightPhase;
      let glowIntensity = sin(ship.lightPhase + j) * 0.5 + 0.5;
      
      push();
      rotateY(angle);
      translate(28, 0, 0);
      emissiveMaterial(255 * glowIntensity, 50 * glowIntensity, 50 * glowIntensity);
      sphere(3);
      pop();
    }
    
    pop();
  }
}