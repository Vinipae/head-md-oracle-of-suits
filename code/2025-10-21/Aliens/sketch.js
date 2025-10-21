// create an empty array
let aliens = [];
let spaceships = [];
let objects3D = [];
let cam;

// Audio
let reverb, delay, bassOsc, leadSynth, padOsc, kickOsc, snareOsc, hihatOsc, arpOsc;
let beatCounter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Setup camera
  cam = createCamera();
  cam.setPosition(0, 0, 1000);
  
  // Setup audio
  setupAudio();
  
  // Create 10 spaceships with pilots
  for (let i = 0; i < 10; i++) {
    spaceships.push(createSpaceship(true));
  }
  
  // Create 40 free aliens
  for (let i = 0; i < 40; i++) {
    aliens.push(createAlien());
  }
  
  userStartAudio();
}

function draw() {
  background(20);
  
  // Rotate camera
  let camX = sin(frameCount * 0.001) * 300;
  let camY = cos(frameCount * 0.0007) * 200;
  cam.setPosition(camX, camY, 1000);
  cam.lookAt(0, 0, 0);
  
  // Lighting
  ambientLight(100);
  pointLight(255, 255, 255, 300, -300, 400);
  pointLight(255, 200, 100, -300, 300, -400);
  
  // Update and draw spaceships
  for (let ship of spaceships) {
    updateSpaceship(ship);
    drawSpaceship(ship);
  }
  
  // Update and draw aliens
  for (let alien of aliens) {
    updateAlien(alien);
    drawAlien(alien);
  }
  
  // Check collisions and create objects
  checkCollisions();
  
  // Draw created big aliens
  for (let obj of objects3D) {
    updateObject(obj);
    drawBigAlien(obj);
  }
}

function createAlien() {
  return {
    x: random(-width/2, width/2),
    y: random(-height/2, height/2),
    z: random(-400, 400),
    vx: random(-2, 2),
    vy: random(-2, 2),
    vz: random(-2, 2),
    happy: false,
    happyTimer: 0
  };
}

function createSpaceship(hasPilot) {
  return {
    x: random(-width/2, width/2),
    y: random(-height/2, height/2),
    z: random(-400, 400),
    vx: random(-2, 2),
    vy: random(-2, 2),
    vz: random(-2, 2),
    rotation: 0,
    lightPhase: random(TWO_PI),
    hasPilot: hasPilot
  };
}

function updateAlien(alien) {
  // Move
  alien.x += alien.vx;
  alien.y += alien.vy;
  alien.z += alien.vz;
  
  // Wrap around
  if (alien.x < -width/2) alien.x = width/2;
  if (alien.x > width/2) alien.x = -width/2;
  if (alien.y < -height/2) alien.y = height/2;
  if (alien.y > height/2) alien.y = -height/2;
  if (alien.z < -500) alien.z = 500;
  if (alien.z > 500) alien.z = -500;
  
  // Update happiness
  if (alien.happyTimer > 0) alien.happyTimer--;
  else alien.happy = false;
}

function updateSpaceship(ship) {
  // Move
  ship.x += ship.vx;
  ship.y += ship.vy;
  ship.z += ship.vz;
  
  // Wrap around
  if (ship.x < -width/2) ship.x = width/2;
  if (ship.x > width/2) ship.x = -width/2;
  if (ship.y < -height/2) ship.y = height/2;
  if (ship.y > height/2) ship.y = -height/2;
  if (ship.z < -500) ship.z = 500;
  if (ship.z > 500) ship.z = -500;
  
  // Rotate
  ship.rotation += 0.02;
  ship.lightPhase += 0.05;
}

function drawAlien(alien) {
  push();
  translate(alien.x, alien.y, alien.z);
  
  // Body
  noStroke();
  ambientMaterial(0, 255, 80);
  sphere(8);
  
  // Head
  push();
  translate(0, -12, 0);
  sphere(10);
  
  // Eyes
  push();
  translate(-3, 0, 8);
  ambientMaterial(255);
  sphere(2.5);
  translate(0, 0, 2);
  ambientMaterial(0);
  sphere(1.5);
  pop();
  
  push();
  translate(3, 0, 8);
  ambientMaterial(255);
  sphere(2.5);
  translate(0, 0, 2);
  ambientMaterial(0);
  sphere(1.5);
  pop();
  
  // Mouth
  if (alien.happy) {
    push();
    translate(0, 3, 8);
    ambientMaterial(100, 50, 50);
    sphere(2);
    pop();
  }
  
  // Antennas
  stroke(0, 255, 80);
  strokeWeight(1.5);
  line(-2, -10, 0, -4, -18, 0);
  line(2, -10, 0, 4, -18, 0);
  
  noStroke();
  push();
  translate(-4, -18, 0);
  emissiveMaterial(0, 255, 100);
  sphere(2);
  pop();
  
  push();
  translate(4, -18, 0);
  emissiveMaterial(0, 255, 100);
  sphere(2);
  pop();
  
  pop();
  pop();
}

function drawSpaceship(ship) {
  push();
  translate(ship.x, ship.y, ship.z);
  rotateY(ship.rotation);
  
  noStroke();
  
  // Saucer body
  ambientMaterial(150, 150, 180);
  push();
  scale(1, 0.3, 1);
  sphere(25);
  pop();
  
  // Cockpit
  push();
  translate(0, -8, 0);
  ambientMaterial(120, 140, 160);
  sphere(12);
  
  // Pilot
  if (ship.hasPilot) {
    ambientMaterial(0, 255, 80);
    sphere(5);
  }
  pop();
  
  // Lights
  for (let i = 0; i < 8; i++) {
    let angle = (TWO_PI / 8) * i + ship.lightPhase;
    let glow = sin(ship.lightPhase + i) * 0.5 + 0.5;
    
    push();
    rotateY(angle);
    translate(22, 0, 0);
    emissiveMaterial(255 * glow, 50 * glow, 50 * glow);
    sphere(2);
    pop();
  }
  
  pop();
}

function checkCollisions() {
  // Check alien collisions
  for (let i = 0; i < aliens.length; i++) {
    for (let j = i + 1; j < aliens.length; j++) {
      let d = dist(aliens[i].x, aliens[i].y, aliens[i].z, 
                   aliens[j].x, aliens[j].y, aliens[j].z);
      
      if (d < 30 && !aliens[i].happy && !aliens[j].happy) {
        // Collision!
        aliens[i].happy = true;
        aliens[j].happy = true;
        aliens[i].happyTimer = 30;
        aliens[j].happyTimer = 30;
        
        // Bounce
        let temp = aliens[i].vx;
        aliens[i].vx = aliens[j].vx;
        aliens[j].vx = temp;
        
        temp = aliens[i].vy;
        aliens[i].vy = aliens[j].vy;
        aliens[j].vy = temp;
        
        temp = aliens[i].vz;
        aliens[i].vz = aliens[j].vz;
        aliens[j].vz = temp;
        
        // Create big alien
        createBigAlien(
          (aliens[i].x + aliens[j].x) / 2,
          (aliens[i].y + aliens[j].y) / 2,
          (aliens[i].z + aliens[j].z) / 2
        );
        
        playCollisionSound();
      }
    }
  }
}

function createBigAlien(x, y, z) {
  objects3D.push({
    x: x,
    y: y,
    z: z,
    vx: random(-0.3, 0.3), // Even slower movement to stay in view longer
    vy: random(-0.3, 0.3),
    vz: random(-0.2, 0.2), // Less z movement
    size: 0,
    targetSize: random(60, 100), // Slightly bigger
    rotation: random(TWO_PI),
    rotSpeed: random(0.005, 0.015),
    rotationY: random(TWO_PI),
    rotationX: 0, // Start upright
    rotationZ: 0,
    rotSpeedY: random(-0.008, 0.008), // Only rotate mostly on Y axis for simpler movement
    rotSpeedX: random(-0.002, 0.002), // Minimal X rotation
    rotSpeedZ: random(-0.002, 0.002), // Minimal Z rotation
    wobblePhase: random(TWO_PI),
    wobbleSpeed: random(0.04, 0.08),
    blinkPhase: random(100),
    dancePhase: random(TWO_PI), // Add dancing motion
    // More vibrant, crazy colors
    bodyColor: color(random([255, 0, 100]), random([255, 0, 150]), random([255, 0, 200])),
    headColor: color(random([255, 100, 0]), random([255, 150, 0]), random([255, 200, 0])),
    eyeColor: color(random([0, 255, 200]), random([0, 255, 150]), random([0, 255, 255])),
    glowColor: color(random(150, 255), random(0, 255), random(150, 255))
  });
}

function updateObject(obj) {
  if (obj.size < obj.targetSize) {
    obj.size += 2.5;
  }
  
  // Move slower
  obj.x += obj.vx;
  obj.y += obj.vy;
  obj.z += obj.vz;
  
  // Bounce back from edges instead of wrapping (keeps them visible longer)
  if (obj.x < -width/2 || obj.x > width/2) obj.vx *= -1;
  if (obj.y < -height/2 || obj.y > height/2) obj.vy *= -1;
  if (obj.z < -400 || obj.z > 400) obj.vz *= -1;
  
  // Keep them closer to center
  if (abs(obj.x) > width/3) obj.vx *= 0.98;
  if (abs(obj.y) > height/3) obj.vy *= 0.98;
  
  // Update rotations - simpler, mostly Y axis
  obj.rotation += obj.rotSpeed;
  obj.rotationY += obj.rotSpeedY;
  obj.rotationX += obj.rotSpeedX;
  obj.rotationZ += obj.rotSpeedZ;
  obj.wobblePhase += obj.wobbleSpeed;
  obj.blinkPhase += 0.5;
  obj.dancePhase += 0.06; // Dancing rhythm
}

function drawBigAlien(obj) {
  push();
  translate(obj.x, obj.y, obj.z);
  
  // Simpler rotation - mostly spinning on Y axis
  rotateY(obj.rotationY);
  rotateX(obj.rotationX * 0.3); // Reduced influence
  rotateZ(obj.rotationZ * 0.3); // Reduced influence
  
  // Dancing motion - bobbing up and down
  let danceY = sin(obj.dancePhase) * (obj.size / 10);
  translate(0, danceY, 0);
  
  // Wobble and wiggle
  let wobbleX = sin(obj.wobblePhase) * 0.1 + 1;
  let wobbleY = cos(obj.wobblePhase * 1.3) * 0.08 + 1;
  scale(wobbleX, wobbleY, 1);
  
  noStroke();
  
  // Big body with glow
  ambientMaterial(obj.bodyColor);
  emissiveMaterial(red(obj.bodyColor) * 0.5, green(obj.bodyColor) * 0.5, blue(obj.bodyColor) * 0.5);
  sphere(obj.size / 3);
  
  // Add a glowing aura around body
  push();
  ambientMaterial(obj.glowColor);
  emissiveMaterial(red(obj.glowColor) * 0.6, green(obj.glowColor) * 0.6, blue(obj.glowColor) * 0.6);
  scale(1.1, 1.1, 1.1);
  sphere(obj.size / 3.5);
  pop();
  
  // Big head
  push();
  translate(0, -obj.size / 2.5, 0);
  ambientMaterial(obj.headColor);
  emissiveMaterial(red(obj.headColor) * 0.6, green(obj.headColor) * 0.6, blue(obj.headColor) * 0.6);
  sphere(obj.size / 2.5);
  
  // Two big eyes with pupils
  let blink = sin(obj.blinkPhase * 0.1) > 0.85 ? 0.2 : 1;
  
  push();
  translate(-obj.size / 8, -obj.size / 12, obj.size / 3);
  ambientMaterial(255);
  emissiveMaterial(255, 255, 255);
  sphere(obj.size / 10 * blink);
  translate(0, 0, obj.size / 15);
  ambientMaterial(obj.eyeColor);
  emissiveMaterial(red(obj.eyeColor) * 0.8, green(obj.eyeColor) * 0.8, blue(obj.eyeColor) * 0.8);
  // Moving pupils
  let pupilX = sin(obj.rotation * 2) * (obj.size / 40);
  let pupilY = cos(obj.rotation * 3) * (obj.size / 40);
  translate(pupilX, pupilY, 0);
  sphere(obj.size / 16);
  pop();
  
  push();
  translate(obj.size / 8, -obj.size / 12, obj.size / 3);
  ambientMaterial(255);
  emissiveMaterial(255, 255, 255);
  sphere(obj.size / 10 * blink);
  translate(0, 0, obj.size / 15);
  ambientMaterial(obj.eyeColor);
  emissiveMaterial(red(obj.eyeColor) * 0.8, green(obj.eyeColor) * 0.8, blue(obj.eyeColor) * 0.8);
  translate(-pupilX, -pupilY, 0);
  sphere(obj.size / 16);
  pop();
  
  // Bigger, more visible smile
  push();
  translate(0, obj.size / 10, obj.size / 3);
  
  // Bright, colorful smile
  ambientMaterial(obj.glowColor);
  emissiveMaterial(red(obj.glowColor) * 0.7, green(obj.glowColor) * 0.7, blue(obj.glowColor) * 0.7);
  
  let smileRadius = obj.size / 5;
  let numPoints = 9; // More points for fuller smile
  for (let i = 0; i < numPoints; i++) {
    let angle = map(i, 0, numPoints - 1, PI + 0.2, TWO_PI - 0.2);
    let x = cos(angle) * smileRadius;
    let y = sin(angle) * smileRadius * 0.6;
    
    push();
    translate(x, -y, 0);
    sphere(obj.size / 35);
    pop();
  }
  
  pop();
  
  // Glowing antennas
  stroke(red(obj.glowColor), green(obj.glowColor), blue(obj.glowColor));
  strokeWeight(obj.size / 35);
  line(-obj.size / 10, -obj.size / 2.5, 0, -obj.size / 6, -obj.size / 1.5, 0);
  line(obj.size / 10, -obj.size / 2.5, 0, obj.size / 6, -obj.size / 1.5, 0);
  
  noStroke();
  push();
  translate(-obj.size / 6, -obj.size / 1.5, 0);
  emissiveMaterial(red(obj.eyeColor) * 1.2, green(obj.eyeColor) * 1.2, blue(obj.eyeColor) * 1.2);
  ambientMaterial(obj.eyeColor);
  sphere(obj.size / 18);
  pop();
  
  push();
  translate(obj.size / 6, -obj.size / 1.5, 0);
  emissiveMaterial(red(obj.eyeColor) * 1.2, green(obj.eyeColor) * 1.2, blue(obj.eyeColor) * 1.2);
  ambientMaterial(obj.eyeColor);
  sphere(obj.size / 18);
  pop();
  
  pop();
  
  // Waving arms with color
  stroke(red(obj.glowColor), green(obj.glowColor), blue(obj.glowColor));
  strokeWeight(obj.size / 25);
  let armWave = sin(obj.wobblePhase * 3) * (obj.size / 8); // More dramatic arm waving
  line(-obj.size / 3, 0, 0, -obj.size / 1.8, obj.size / 4 + armWave, 0);
  line(obj.size / 3, 0, 0, obj.size / 1.8, obj.size / 4 - armWave, 0);
  
  // Glowing hands
  noStroke();
  push();
  translate(-obj.size / 1.8, obj.size / 4 + armWave, 0);
  ambientMaterial(obj.glowColor);
  emissiveMaterial(red(obj.glowColor) * 0.6, green(obj.glowColor) * 0.6, blue(obj.glowColor) * 0.6);
  sphere(obj.size / 22);
  pop();
  
  push();
  translate(obj.size / 1.8, obj.size / 4 - armWave, 0);
  ambientMaterial(obj.glowColor);
  emissiveMaterial(red(obj.glowColor) * 0.6, green(obj.glowColor) * 0.6, blue(obj.glowColor) * 0.6);
  sphere(obj.size / 22);
  pop();
  
  // Colorful legs
  stroke(red(obj.bodyColor), green(obj.bodyColor), blue(obj.bodyColor));
  strokeWeight(obj.size / 28);
  line(-obj.size / 8, obj.size / 3, 0, -obj.size / 6, obj.size / 1.5, 0);
  line(obj.size / 8, obj.size / 3, 0, obj.size / 6, obj.size / 1.5, 0);
  
  // Glowing feet
  noStroke();
  push();
  translate(-obj.size / 6, obj.size / 1.5, 0);
  ambientMaterial(obj.glowColor);
  emissiveMaterial(red(obj.glowColor) * 0.5, green(obj.glowColor) * 0.5, blue(obj.glowColor) * 0.5);
  sphere(obj.size / 25);
  pop();
  
  push();
  translate(obj.size / 6, obj.size / 1.5, 0);
  ambientMaterial(obj.glowColor);
  emissiveMaterial(red(obj.glowColor) * 0.5, green(obj.glowColor) * 0.5, blue(obj.glowColor) * 0.5);
  sphere(obj.size / 25);
  pop();
  
  pop();
}

function setupAudio() {
  // Create reverb and delay effects - shorter for techno
  reverb = new p5.Reverb();
  delay = new p5.Delay();
  reverb.process(delay, 2, 1.5);
  delay.process(reverb, 0.25, 0.4, 1800);
  
  // Techno bass - deeper and punchier
  bassOsc = new p5.Oscillator('sawtooth');
  bassOsc.amp(0);
  bassOsc.freq(55);
  bassOsc.start();
  
  // Techno pad - metallic sound
  padOsc = new p5.Oscillator('square');
  padOsc.amp(0);
  padOsc.freq(220);
  padOsc.start();
  reverb.process(padOsc, 3, 1.5);
  
  // Lead synth - sharper for techno
  leadSynth = new p5.Oscillator('sawtooth');
  leadSynth.amp(0);
  leadSynth.start();
  reverb.process(leadSynth, 2, 1.5);
  delay.process(leadSynth, 0.3, 0.5, 1800);
  
  // Arpeggiator synth
  arpOsc = new p5.Oscillator('square');
  arpOsc.amp(0);
  arpOsc.start();
  delay.process(arpOsc, 0.4, 0.6, 1500);
  
  // Kick drum - harder
  kickOsc = new p5.Oscillator('sine');
  kickOsc.amp(0);
  kickOsc.start();
  
  // Snare/clap - sharper
  snareOsc = new p5.Oscillator('noise');
  snareOsc.amp(0);
  snareOsc.start();
  
  // Hi-hat - faster
  hihatOsc = new p5.Oscillator('noise');
  hihatOsc.amp(0);
  hihatOsc.start();
  
  // Faster techno beat - 140 BPM (428ms per beat)
  setInterval(() => {
    playTechnoKick();
  }, 428);
  
  // Hi-hats (every 1/8 note)
  setInterval(() => {
    playTechnoHihat();
  }, 214);
  
  // Bassline (every beat)
  setInterval(() => {
    playTechnoBass();
  }, 428);
  
  // Arpeggiator (every 1/16 note)
  setInterval(() => {
    playArpeggio();
  }, 107);
  
  // Lead synth stabs (every 4 beats)
  setInterval(() => {
    playTechnoLead();
  }, 1712);
  
  // Pad swells (every 8 beats)
  setInterval(() => {
    playTechnoPad();
  }, 3424);
}

function playTechnoKick() {
  beatCounter++;
  
  // Hard four-on-the-floor kick
  kickOsc.freq(180);
  kickOsc.amp(0.4, 0.005);
  kickOsc.freq(40, 0.08);
  kickOsc.amp(0, 0.25);
  
  // Extra kick on beat 2 and 4
  if (beatCounter % 4 === 2 || beatCounter % 4 === 0) {
    snareOsc.amp(0.18, 0.005);
    snareOsc.amp(0, 0.12);
  }
}

function playTechnoHihat() {
  // Fast hi-hats
  if (beatCounter % 2 === 0) {
    hihatOsc.amp(0.12, 0.005);
    hihatOsc.amp(0, 0.06);
  } else {
    hihatOsc.amp(0.06, 0.005);
    hihatOsc.amp(0, 0.04);
  }
}

function playTechnoBass() {
  // Rolling techno bassline - E minor
  let bassNotes = [82, 98, 110, 123, 110, 98, 82, 73]; // E2, G2, A2, B2, A2, G2, E2, D2
  let note = bassNotes[beatCounter % 8];
  
  bassOsc.freq(note);
  bassOsc.amp(0.35, 0.01);
  bassOsc.amp(0.25, 0.3);
}

function playArpeggio() {
  // Fast 16th note arpeggio - E minor scale
  let arpNotes = [330, 392, 440, 494, 523, 494, 440, 392]; // E4, G4, A4, B4, C5, B4, A4, G4
  let note = arpNotes[(beatCounter * 4) % 8];
  
  arpOsc.freq(note);
  arpOsc.amp(0.08, 0.005);
  arpOsc.amp(0, 0.08);
}

function playTechnoLead() {
  // Stabbing lead synth
  let leadNotes = [659, 784, 880, 988]; // E5, G5, A5, B5
  let note = leadNotes[floor(random(leadNotes.length))];
  
  leadSynth.freq(note);
  leadSynth.amp(0.15, 0.02);
  leadSynth.amp(0, 0.4);
}

function playTechnoPad() {
  // Dark techno pad chords - E minor
  let chordRoots = [165, 196, 220, 247]; // E3, G3, A3, B3
  let root = chordRoots[(beatCounter / 8) % 4];
  
  padOsc.freq(root);
  padOsc.amp(0.1, 1.5);
  padOsc.amp(0.05, 2);
}

function playCollisionSound() {
  // Techno zap/laser sound - sharper and faster
  let zap = new p5.Oscillator('square');
  zap.freq(random([523, 659, 784, 880]));
  
  reverb.process(zap, 1.5, 1.5);
  delay.process(zap, 0.25, 0.4, 1800);
  
  zap.start();
  zap.freq(random([262, 330, 392]), 0.15);
  zap.amp(0.25, 0.01);
  zap.amp(0, 0.25);
  
  setTimeout(() => zap.stop(), 300);
  
  // Add a punchy techno hit
  let hit = new p5.Oscillator('sine');
  hit.freq(120);
  hit.start();
  hit.amp(0.35, 0.005);
  hit.freq(30, 0.08);
  hit.amp(0, 0.15);
  
  setTimeout(() => hit.stop(), 200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
