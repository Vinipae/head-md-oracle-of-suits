// create an array to hold bubbles
let bubbles = [];
let alienPlanets = [];
let glowingJellyfish = [];
let floatingRocks = [];
let stars = [];

function setup() {
  // full window canvas
  createCanvas(windowWidth, windowHeight);
  // initialize MediaPipe
  setupFace();
  setupVideo();
  
  // Create alien underwater elements
  for (let i = 0; i < 3; i++) {
    alienPlanets.push({
      x: random(width),
      y: random(height * 0.3, height * 0.7),
      size: random(80, 200),
      color: color(random(100, 255), random(50, 150), random(150, 255)),
      speed: random(0.2, 0.5)
    });
  }
  
  for (let i = 0; i < 15; i++) {
    glowingJellyfish.push({
      x: random(width),
      y: random(height),
      size: random(30, 80),
      speed: random(0.3, 1),
      phase: random(TWO_PI),
      color: color(random(150, 255), random(100, 200), random(200, 255))
    });
  }
  
  for (let i = 0; i < 50; i++) {
    floatingRocks.push({
      x: random(width),
      y: random(height),
      size: random(10, 40),
      speedX: random(-0.5, 0.5),
      speedY: random(-0.3, 0.3),
      rotation: random(TWO_PI)
    });
  }
  
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      brightness: random(100, 255)
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // get detected faces
  let faces = getFaceLandmarks();
  // see blendhapes.txt for full list of possible blendshapes
  let mouthPucker = getBlendshapeScore('mouthPucker');
  let mouthOpen = getBlendshapeScore('jawOpen'); // Get mouth opening

  // ALIEN UNDERWATER BACKGROUND (not camera!)
  drawAlienUnderwaterWorld();
  
  // Draw UI BEHIND everything (subtle)
  push();
  fill(150, 180, 200, 80); // Very transparent
  textSize(16);
  textAlign(LEFT, TOP);
  text('👽 Alien Explorer', 10, 10);
  fill(150, 180, 200, 60);
  textSize(12);
  text('Pucker: ' + nf(mouthPucker, 1, 2), 10, height - 30);
  text('Jaw Open: ' + nf(mouthOpen, 1, 2), 10, height - 50); // Show mouth opening
  pop();
  
  // Draw helmet with alien mask face
  if (faces && faces.length > 0) {
    drawHelmetAndAlienMask(faces[0], mouthOpen, mouthPucker);
  }

  // if mouthPucker is greater than 0.4, send bubbles
  if (mouthPucker > 0.4 && faces && faces.length > 0) {
    sendBubbles(faces);
  }

  // draw each bubble in order
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].display();
    
    // Remove bubbles that float off screen
    if (bubbles[i].y < -100) {
      bubbles.splice(i, 1);
    }
  }
}

function drawAlienUnderwaterWorld() {
  // Deep space-water gradient
  for (let y = 0; y < height; y += 5) {
    let inter = map(y, 0, height, 0, 1);
    let c1 = color(10, 5, 40); // Deep purple-blue
    let c2 = color(5, 30, 60);  // Dark teal
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
  
  // Draw twinkling stars
  for (let star of stars) {
    let twinkle = sin(frameCount * 0.05 + star.x) * 50;
    fill(200, 220, 255, star.brightness + twinkle);
    noStroke();
    circle(star.x, star.y, star.size);
  }
  
  // Draw alien planets in background
  for (let planet of alienPlanets) {
    planet.x -= planet.speed;
    if (planet.x < -planet.size) planet.x = width + planet.size;
    
    // Planet glow
    for (let i = 0; i < 3; i++) {
      fill(red(planet.color), green(planet.color), blue(planet.color), 30 - i * 10);
      noStroke();
      circle(planet.x, planet.y, planet.size + i * 20);
    }
    
    // Planet body
    fill(planet.color);
    circle(planet.x, planet.y, planet.size);
    
    // Planet rings
    noFill();
    stroke(red(planet.color) * 1.2, green(planet.color) * 1.2, blue(planet.color) * 1.2, 150);
    strokeWeight(3);
    ellipse(planet.x, planet.y, planet.size * 1.5, planet.size * 0.4);
  }
  
  // Draw glowing jellyfish
  for (let jelly of glowingJellyfish) {
    jelly.y -= jelly.speed;
    if (jelly.y < -jelly.size) jelly.y = height + jelly.size;
    
    let wobble = sin(frameCount * 0.05 + jelly.phase) * 10;
    
    // Jellyfish glow
    fill(red(jelly.color), green(jelly.color), blue(jelly.color), 80);
    noStroke();
    circle(jelly.x + wobble, jelly.y, jelly.size + 20);
    
    // Jellyfish body
    fill(jelly.color);
    ellipse(jelly.x + wobble, jelly.y, jelly.size, jelly.size * 0.8);
    
    // Tentacles
    stroke(jelly.color);
    strokeWeight(2);
    for (let t = 0; t < 5; t++) {
      let tx = jelly.x + wobble + (t - 2) * 10;
      let wave = sin(frameCount * 0.1 + t + jelly.phase) * 15;
      line(tx, jelly.y + jelly.size/2, tx + wave, jelly.y + jelly.size + 30);
    }
  }
  
  // Draw floating rocks
  for (let rock of floatingRocks) {
    rock.x += rock.speedX;
    rock.y += rock.speedY;
    rock.rotation += 0.01;
    
    if (rock.x < -rock.size) rock.x = width + rock.size;
    if (rock.x > width + rock.size) rock.x = -rock.size;
    if (rock.y < -rock.size) rock.y = height + rock.size;
    if (rock.y > height + rock.size) rock.y = -rock.size;
    
    push();
    translate(rock.x, rock.y);
    rotate(rock.rotation);
    fill(80, 70, 100);
    stroke(60, 50, 80);
    strokeWeight(2);
    
    // Draw irregular rock shape
    beginShape();
    for (let a = 0; a < TWO_PI; a += PI/4) {
      let r = rock.size + random(-5, 5);
      let x = cos(a) * r;
      let y = sin(a) * r;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
  
  // Light rays from above
  noFill();
  for (let i = 0; i < 5; i++) {
    let x = width * 0.2 + i * width * 0.15;
    stroke(150, 200, 255, 20);
    strokeWeight(40);
    let sway = sin(frameCount * 0.01 + i) * 30;
    line(x + sway, 0, x + sway * 2, height);
  }
}

function drawHelmetAndAlienMask(face, mouthOpen, mouthPucker) {
  // Get face position and size
  let noseTip = face[1];
  let leftEye = face[33];
  let rightEye = face[263];
  
  // INVERT X coordinate so movement matches naturally (flip horizontally)
  let faceX = (1 - noseTip.x) * width; // INVERTED!
  let faceY = noseTip.y * height;
  
  // Make alien MUCH smaller
  let faceWidth = dist(leftEye.x * width, leftEye.y * height, rightEye.x * width, rightEye.y * height) * 1.5; // Reduced from 3
  let faceHeight = faceWidth * 1.2;
  
  // DRAW ALIEN MASK (instead of real face)
  push();
  translate(faceX, faceY);
  
  // Alien head - large and elongated
  let headPulse = sin(frameCount * 0.05) * 3;
  
  // Head glow
  for (let i = 0; i < 4; i++) {
    fill(100, 255, 150, 40 - i * 10);
    noStroke();
    ellipse(0, -faceHeight * 0.1, faceWidth * 0.9 + i * 15 + headPulse, faceHeight * 0.9 + i * 15 + headPulse);
  }
  
  // Main alien head
  fill(80, 200, 120);
  stroke(60, 150, 90);
  strokeWeight(2);
  ellipse(0, -faceHeight * 0.1, faceWidth * 0.9 + headPulse, faceHeight * 0.9 + headPulse);
  
  // Alien skin texture/spots
  noStroke();
  fill(60, 160, 100, 150);
  // Use fixed random seed for consistent spots
  randomSeed(12345);
  for (let i = 0; i < 8; i++) {
    let sx = random(-faceWidth * 0.3, faceWidth * 0.3);
    let sy = random(-faceHeight * 0.3, faceHeight * 0.1);
    circle(sx, sy, random(8, 15));
  }
  randomSeed(millis()); // Reset random seed
  
  // HUGE BLACK ALIEN EYES
  let eyeDistance = faceWidth * 0.25;
  let eyeW = faceWidth * 0.25;
  let eyeH = faceHeight * 0.35;
  let eyeBlink = sin(frameCount * 0.2) * eyeH * 0.05;
  
  fill(10, 10, 30, 250);
  noStroke();
  ellipse(-eyeDistance, -faceHeight * 0.1, eyeW, eyeH + eyeBlink);
  ellipse(eyeDistance, -faceHeight * 0.1, eyeW, eyeH + eyeBlink);
  
  // Eye shine/reflection
  fill(100, 255, 200, 200);
  circle(-eyeDistance - eyeW * 0.2, -faceHeight * 0.2, eyeW * 0.2);
  circle(eyeDistance - eyeW * 0.2, -faceHeight * 0.2, eyeW * 0.2);
  
  // Inner eye glow
  fill(50, 200, 150, 100);
  ellipse(-eyeDistance, -faceHeight * 0.1, eyeW * 0.5, eyeH * 0.5);
  ellipse(eyeDistance, -faceHeight * 0.1, eyeW * 0.5, eyeH * 0.5);
  
  // Small alien nose
  fill(70, 180, 110);
  stroke(60, 150, 90);
  strokeWeight(2);
  ellipse(0, faceHeight * 0.05, faceWidth * 0.08, faceHeight * 0.06);
  
  // ANIMATED ALIEN MOUTH - follows your mouth opening!
  let mouthY = faceHeight * 0.2;
  let mouthOpenAmount = mouthOpen || 0; // Use mouth open blendshape
  
  // Force mouth open when puckering (blowing bubbles)
  let isPuckering = (mouthPucker || 0) > 0.4;
  if (isPuckering) {
    mouthOpenAmount = max(mouthOpenAmount, 0.6); // Force mouth to be at least 60% open
  }
  
  noFill();
  stroke(40, 120, 80);
  strokeWeight(2);
  
  if (mouthOpenAmount > 0.15) { // More sensitive - was 0.3
    // Mouth open - draw oval
    fill(20, 80, 50);
    stroke(40, 120, 80);
    let mouthHeight = map(mouthOpenAmount, 0.15, 1, faceHeight * 0.05, faceHeight * 0.3); // Bigger range
    ellipse(0, mouthY, faceWidth * 0.25, mouthHeight);
    
    // Show alien teeth/tongue when mouth is open
    if (mouthOpenAmount > 0.3) { // Show tongue earlier - was 0.5
      fill(150, 255, 180);
      noStroke();
      ellipse(0, mouthY + mouthHeight * 0.2, faceWidth * 0.15, mouthHeight * 0.4);
    }
    
    // When puckering, add a round bubble-blowing shape
    if (isPuckering) {
      noFill();
      stroke(100, 220, 150, 150);
      strokeWeight(2);
      circle(0, mouthY, faceWidth * 0.2);
    }
  } else {
    // Mouth closed - draw arc
    arc(0, mouthY, faceWidth * 0.3, faceHeight * 0.15, 0, PI);
  }
  
  // Antennae
  stroke(80, 200, 120);
  strokeWeight(3);
  let antennaWave1 = sin(frameCount * 0.1) * 8;
  let antennaWave2 = cos(frameCount * 0.1) * 8;
  
  line(-faceWidth * 0.3, -faceHeight * 0.5, -faceWidth * 0.4 + antennaWave1, -faceHeight * 0.7);
  line(faceWidth * 0.3, -faceHeight * 0.5, faceWidth * 0.4 + antennaWave2, -faceHeight * 0.7);
  
  // Antennae bulbs
  fill(150, 255, 200);
  noStroke();
  circle(-faceWidth * 0.4 + antennaWave1, -faceHeight * 0.7, 12);
  circle(faceWidth * 0.4 + antennaWave2, -faceHeight * 0.7, 12);
  
  // Glowing aura around bulbs
  fill(150, 255, 200, 80);
  circle(-faceWidth * 0.4 + antennaWave1, -faceHeight * 0.7, 20);
  circle(faceWidth * 0.4 + antennaWave2, -faceHeight * 0.7, 20);
  
  pop();
  
  // DRAW UNDERWATER HELMET around the alien
  push();
  translate(faceX, faceY);
  
  // Helmet glass dome - larger than head
  let helmetSize = faceWidth * 1.3;
  
  // Glass outer glow
  noFill();
  stroke(150, 200, 255, 60);
  strokeWeight(6);
  circle(0, 0, helmetSize + 20);
  
  // Main glass dome
  fill(100, 180, 230, 60);
  stroke(180, 220, 255, 150);
  strokeWeight(3);
  circle(0, 0, helmetSize);
  
  // Glass highlights/reflections
  fill(255, 255, 255, 120);
  noStroke();
  circle(-helmetSize * 0.25, -helmetSize * 0.25, helmetSize * 0.15);
  circle(helmetSize * 0.3, -helmetSize * 0.2, helmetSize * 0.08);
  
  // Helmet metal rim/collar at bottom
  fill(120, 100, 80);
  stroke(90, 70, 60);
  strokeWeight(2);
  ellipse(0, helmetSize * 0.5, helmetSize * 1.1, helmetSize * 0.25);
  
  // Metal shine on rim
  fill(180, 160, 130);
  noStroke();
  ellipse(0, helmetSize * 0.48, helmetSize * 0.9, helmetSize * 0.15);
  
  // Bolts around the rim
  for (let i = 0; i < 12; i++) {
    let angle = (TWO_PI / 12) * i;
    let bx = cos(angle) * helmetSize * 0.5;
    let by = sin(angle) * helmetSize * 0.15 + helmetSize * 0.5;
    fill(80, 60, 50);
    stroke(60, 40, 30);
    strokeWeight(1.5);
    circle(bx, by, 10);
    
    // Bolt highlight
    fill(120, 100, 80);
    noStroke();
    circle(bx - 2, by - 2, 4);
  }
  
  // Air tubes coming from helmet
  stroke(100, 100, 120);
  strokeWeight(10);
  noFill();
  
  // Left tube
  beginShape();
  vertex(-helmetSize * 0.5, helmetSize * 0.3);
  vertex(-helmetSize * 0.6, helmetSize * 0.5);
  vertex(-helmetSize * 0.7, helmetSize * 0.7);
  endShape();
  
  // Right tube
  beginShape();
  vertex(helmetSize * 0.5, helmetSize * 0.3);
  vertex(helmetSize * 0.6, helmetSize * 0.5);
  vertex(helmetSize * 0.7, helmetSize * 0.7);
  endShape();
  
  // Breathing light indicator
  let breathGlow = sin(frameCount * 0.1) * 100 + 150;
  fill(100, 255, 100, breathGlow);
  noStroke();
  circle(0, helmetSize * 0.55, 16);
  
  // Outer glow of breathing light
  fill(100, 255, 100, breathGlow * 0.5);
  circle(0, helmetSize * 0.55, 28);
  
  pop();
}

function sendBubbles(faces) {
  // if mouthPucker is greater than 0.4, create a bubble at position of mouth
  if (faces.length > 0) {
    let face = faces[0];
    // landmark 13 is the mouth center
    let mouth = face[13];
    if (mouth) {
      let bubbleSize = random(15, 35);
      // INVERT X position to match alien position
      let bubbleX = (1 - mouth.x) * width;
      let bubbleY = mouth.y * height;
      let bubble = new Bubble(bubbleX, bubbleY, bubbleSize);
      bubbles.push(bubble);
    }
  }
}

