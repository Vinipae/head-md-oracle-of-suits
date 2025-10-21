// create an empty array
let values = [];
let xPositions = [];
let speeds = [];
let screams = [];
let trails = [];
let objects3D = [];
let backgroundBrightness = 0;

function preload() {
  // Load sound if needed
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Initialize spaceships FIRST
  setupSpaceships();
  
  // Initialize aliens - first 10 will be pilots, rest are free
  for (let i = 0; i < 50; i++) {
    values.push(random(height));
    xPositions.push(random(width));
    
    let angle = random(TWO_PI);
    let speed = random(0.5, 2);
    speeds.push({
      x: cos(angle) * speed,
      y: sin(angle) * speed
    });
    screams.push(0);
    
    // Each alien/ship has its own drawing color
    trails.push({
      color: color(random(100, 255), random(100, 255), random(150, 255)),
      history: [],
      maxHistory: 50
    });
  }
  
  userStartAudio();
}

function draw() {
  // Slowly brighten background as objects grow
  backgroundBrightness = min(backgroundBrightness + 0.05, 50);
  background(backgroundBrightness, backgroundBrightness * 0.3, backgroundBrightness * 0.5);
  
  // Reset to 2D for trails and sprites
  push();
  translate(-width/2, -height/2);
  
  // Draw trails from aliens and spaceships
  drawTrails();
  
  pop();
  
  // Draw 3D objects
  draw3DObjects();
  
  // Back to 2D for aliens and spaceships
  push();
  translate(-width/2, -height/2);
  
  // Check collisions between all aliens
  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) {
      if (checkCollision(i, j)) {
        if (screams[i] === 0 && screams[j] === 0) {
          playHugSound();
          
          // Create a 3D object at collision point
          let objX = (xPositions[i] + xPositions[j]) / 2 - width/2;
          let objY = (values[i] + values[j]) / 2 - height/2;
          
          objects3D.push({
            x: objX,
            y: objY,
            z: random(-200, 200),
            size: 0,
            targetSize: random(30, 100),
            type: floor(random(5)), // Different 3D shapes
            color1: trails[i].color,
            color2: trails[j].color,
            rotationX: random(TWO_PI),
            rotationY: random(TWO_PI),
            rotationZ: random(TWO_PI),
            rotSpeedX: random(-0.02, 0.02),
            rotSpeedY: random(-0.02, 0.02),
            rotSpeedZ: random(-0.02, 0.02),
            growSpeed: random(0.5, 2),
            floatPhase: random(TWO_PI),
            floatSpeed: random(0.01, 0.03)
          });
          
          // Increase background brightness with each object
          backgroundBrightness += 2;
        }
        
        // Bounce off each other
        let angle = atan2(values[j] - values[i], xPositions[j] - xPositions[i]);
        let speed1 = sqrt(speeds[i].x * speeds[i].x + speeds[i].y * speeds[i].y);
        let speed2 = sqrt(speeds[j].x * speeds[j].x + speeds[j].y * speeds[j].y);
        
        speeds[i].x = cos(angle + PI) * speed1;
        speeds[i].y = sin(angle + PI) * speed1;
        speeds[j].x = cos(angle) * speed2;
        speeds[j].y = sin(angle) * speed2;
        
        screams[i] = 30;
        screams[j] = 30;
      }
    }
  }
  
  // Update and draw free-floating aliens (not pilots)
  for (let i = 10; i < values.length; i++) {
    // Store position in history for trails
    trails[i].history.push({x: xPositions[i], y: values[i]});
    if (trails[i].history.length > trails[i].maxHistory) {
      trails[i].history.shift();
    }
    
    xPositions[i] += speeds[i].x;
    values[i] += speeds[i].y;
    
    // Wrap around screen edges
    if (xPositions[i] < -50) {
      xPositions[i] = width + 50;
      trails[i].history = [];
    }
    if (xPositions[i] > width + 50) {
      xPositions[i] = -50;
      trails[i].history = [];
    }
    if (values[i] < -50) {
      values[i] = height + 50;
      trails[i].history = [];
    }
    if (values[i] > height + 50) {
      values[i] = -50;
      trails[i].history = [];
    }
    
    if (screams[i] > 0) {
      screams[i]--;
    }
    
    push();
    translate(xPositions[i], values[i]);
    scale(0.6);
    translate(-xPositions[i], -values[i]);
    drawAlien(xPositions[i], values[i], screams[i] > 0);
    pop();
  }
  
  // Draw spaceships with pilots
  drawSpaceships();
  
  pop();
}

function drawTrails() {
  // Draw beautiful flowing trails
  for (let i = 0; i < trails.length; i++) {
    let trail = trails[i];
    
    if (trail.history.length > 1) {
      noFill();
      
      // Draw gradient trail
      for (let j = 0; j < trail.history.length - 1; j++) {
        let alpha = map(j, 0, trail.history.length, 0, 100);
        let thickness = map(j, 0, trail.history.length, 1, 4);
        
        stroke(red(trail.color), green(trail.color), blue(trail.color), alpha);
        strokeWeight(thickness);
        
        let p1 = trail.history[j];
        let p2 = trail.history[j + 1];
        line(p1.x, p1.y, p2.x, p2.y);
      }
      
      // Draw glowing dots along trail
      for (let j = 0; j < trail.history.length; j += 5) {
        let alpha = map(j, 0, trail.history.length, 50, 150);
        fill(red(trail.color), green(trail.color), blue(trail.color), alpha);
        noStroke();
        let p = trail.history[j];
        ellipse(p.x, p.y, 3, 3);
      }
    }
  }
}

function draw3DObjects() {
  // Enable lighting for 3D objects
  ambientLight(100);
  pointLight(255, 255, 255, 0, 0, 200);
  
  for (let i = objects3D.length - 1; i >= 0; i--) {
    let obj = objects3D[i];
    
    // Grow the object
    if (obj.size < obj.targetSize) {
      obj.size += obj.growSpeed;
    }
    
    // Float animation
    obj.floatPhase += obj.floatSpeed;
    let floatOffset = sin(obj.floatPhase) * 20;
    
    // Update rotation
    obj.rotationX += obj.rotSpeedX;
    obj.rotationY += obj.rotSpeedY;
    obj.rotationZ += obj.rotSpeedZ;
    
    push();
    translate(obj.x, obj.y, obj.z + floatOffset);
    rotateX(obj.rotationX);
    rotateY(obj.rotationY);
    rotateZ(obj.rotationZ);
    
    // Set material colors (alternate between two collision colors)
    if (frameCount % 60 < 30) {
      ambientMaterial(obj.color1);
    } else {
      ambientMaterial(obj.color2);
    }
    
    // Add emissive glow
    emissiveMaterial(
      red(obj.color1) * 0.3,
      green(obj.color1) * 0.3,
      blue(obj.color1) * 0.3
    );
    
    // Draw different 3D shapes
    switch(obj.type) {
      case 0: // Box
        box(obj.size);
        break;
      case 1: // Sphere
        sphere(obj.size / 2);
        break;
      case 2: // Torus
        torus(obj.size / 2, obj.size / 4);
        break;
      case 3: // Cone
        cone(obj.size / 2, obj.size);
        break;
      case 4: // Cylinder
        cylinder(obj.size / 2, obj.size);
        break;
    }
    
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
