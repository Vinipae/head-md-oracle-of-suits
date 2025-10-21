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
          
          // Random type: 0=planet, 1=plant, 2=building
          let objType = floor(random(3));
          
          objects3D.push({
            x: objX,
            y: objY,
            z: random(-300, 300),
            size: 0,
            targetSize: random(40, 120),
            type: objType,
            subType: floor(random(3)), // Variation within each type
            color1: trails[i].color,
            color2: trails[j].color,
            rotationX: random(TWO_PI),
            rotationY: random(TWO_PI),
            rotationZ: random(TWO_PI),
            rotSpeedX: random(-0.01, 0.01),
            rotSpeedY: random(-0.01, 0.01),
            rotSpeedZ: random(-0.01, 0.01),
            growSpeed: random(0.5, 2),
            floatPhase: random(TWO_PI),
            floatSpeed: random(0.01, 0.03),
            detail: floor(random(3, 8)) // For planet craters, plant details, etc
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
  ambientLight(80);
  pointLight(255, 255, 255, 200, -200, 300);
  pointLight(150, 150, 200, -200, 200, 200);
  
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
    
    // Draw based on type
    if (obj.type === 0) {
      drawPlanet(obj);
    } else if (obj.type === 1) {
      drawAlienPlant(obj);
    } else {
      drawBuilding(obj);
    }
    
    pop();
  }
}

function drawPlanet(obj) {
  // Main planet sphere
  push();
  
  // Alternate between colors
  if (frameCount % 60 < 30) {
    ambientMaterial(obj.color1);
  } else {
    ambientMaterial(obj.color2);
  }
  
  emissiveMaterial(
    red(obj.color1) * 0.2,
    green(obj.color1) * 0.2,
    blue(obj.color1) * 0.2
  );
  
  sphere(obj.size / 2, 24, 16);
  pop();
  
  // Add rings (like Saturn) for some planets
  if (obj.subType === 0) {
    push();
    rotateX(PI / 4);
    noFill();
    stroke(red(obj.color2), green(obj.color2), blue(obj.color2), 150);
    strokeWeight(3);
    ellipse(0, 0, obj.size * 1.5, obj.size * 0.3);
    strokeWeight(2);
    ellipse(0, 0, obj.size * 1.8, obj.size * 0.4);
    pop();
  }
  
  // Add moons
  if (obj.subType === 1) {
    for (let i = 0; i < 2; i++) {
      push();
      rotateY(frameCount * 0.01 + i * PI);
      translate(obj.size * 0.8, 0, 0);
      ambientMaterial(obj.color2);
      sphere(obj.size / 8);
      pop();
    }
  }
  
  // Add craters for rocky planets
  if (obj.subType === 2) {
    noStroke();
    fill(red(obj.color1) * 0.7, green(obj.color1) * 0.7, blue(obj.color1) * 0.7);
    for (let i = 0; i < obj.detail; i++) {
      push();
      rotateY(i * 0.7);
      rotateX(i * 0.5);
      translate(0, 0, obj.size / 2.2);
      sphere(obj.size / 10);
      pop();
    }
  }
}

function drawAlienPlant(obj) {
  push();
  
  // Plant stem/trunk
  ambientMaterial(
    red(obj.color1) * 0.5 + 50,
    green(obj.color1) * 0.8 + 100,
    blue(obj.color1) * 0.5 + 50
  );
  
  if (obj.subType === 0) {
    // Spiral tendril plant
    noFill();
    stroke(obj.color1);
    strokeWeight(4);
    beginShape();
    for (let i = 0; i < 50; i++) {
      let angle = i * 0.3;
      let radius = i * 0.5;
      let x = cos(angle) * radius;
      let z = sin(angle) * radius;
      let y = -i * 2;
      vertex(x, y, z);
    }
    endShape();
    
    // Glowing bulbs at end
    for (let i = 0; i < 3; i++) {
      push();
      translate(cos(15 + i) * 25, -100 - i * 10, sin(15 + i) * 25);
      ambientMaterial(obj.color2);
      emissiveMaterial(red(obj.color2) * 0.5, green(obj.color2) * 0.5, blue(obj.color2) * 0.5);
      sphere(obj.size / 8);
      pop();
    }
    
  } else if (obj.subType === 1) {
    // Mushroom-like structure
    cylinder(obj.size / 8, obj.size);
    
    push();
    translate(0, -obj.size / 2, 0);
    ambientMaterial(obj.color2);
    emissiveMaterial(red(obj.color2) * 0.3, green(obj.color2) * 0.3, blue(obj.color2) * 0.3);
    cone(obj.size / 1.5, obj.size / 2);
    
    // Spots on mushroom cap
    for (let i = 0; i < obj.detail; i++) {
      push();
      rotateY(i * 0.8);
      translate(obj.size / 4, -obj.size / 6, 0);
      ambientMaterial(obj.color1);
      sphere(obj.size / 15);
      pop();
    }
    pop();
    
  } else {
    // Crystalline plant with multiple branches
    for (let i = 0; i < 5; i++) {
      push();
      rotateY((TWO_PI / 5) * i);
      rotateZ(PI / 6);
      ambientMaterial(obj.color2);
      emissiveMaterial(red(obj.color2) * 0.4, green(obj.color2) * 0.4, blue(obj.color2) * 0.4);
      cone(obj.size / 10, obj.size / 1.5);
      
      // Smaller crystals
      translate(0, -obj.size / 3, 0);
      rotateZ(PI / 4);
      cone(obj.size / 15, obj.size / 3);
      pop();
    }
  }
  
  pop();
}

function drawBuilding(obj) {
  push();
  
  ambientMaterial(obj.color1);
  
  if (obj.subType === 0) {
    // Skyscraper
    box(obj.size / 3, obj.size * 1.5, obj.size / 3);
    
    // Windows
    for (let i = 0; i < 8; i++) {
      push();
      translate(0, -obj.size * 0.7 + i * (obj.size * 0.2), obj.size / 3.1);
      emissiveMaterial(255, 255, 200);
      box(obj.size / 4, obj.size / 10, 1);
      pop();
    }
    
    // Antenna on top
    push();
    translate(0, -obj.size * 0.8, 0);
    ambientMaterial(obj.color2);
    cylinder(obj.size / 20, obj.size / 3);
    translate(0, -obj.size / 4, 0);
    emissiveMaterial(255, 0, 0);
    sphere(obj.size / 15);
    pop();
    
  } else if (obj.subType === 1) {
    // Dome structure
    ambientMaterial(obj.color2);
    emissiveMaterial(red(obj.color2) * 0.3, green(obj.color2) * 0.3, blue(obj.color2) * 0.3);
    sphere(obj.size / 2, 16, 8);
    
    // Base platform
    push();
    translate(0, obj.size / 4, 0);
    ambientMaterial(obj.color1);
    cylinder(obj.size / 1.5, obj.size / 8);
    pop();
    
    // Entry rings
    for (let i = 0; i < 3; i++) {
      push();
      rotateY((TWO_PI / 3) * i);
      translate(obj.size / 2, 0, 0);
      ambientMaterial(obj.color2);
      torus(obj.size / 10, obj.size / 30);
      pop();
    }
    
  } else {
    // Pyramid/Obelisk
    push();
    translate(0, obj.size / 3, 0);
    ambientMaterial(obj.color1);
    cone(obj.size / 1.5, obj.size * 1.2, 4);
    
    // Glowing top
    translate(0, -obj.size * 0.7, 0);
    emissiveMaterial(red(obj.color2), green(obj.color2), blue(obj.color2));
    sphere(obj.size / 8);
    
    // Energy beams
    stroke(obj.color2);
    strokeWeight(2);
    for (let i = 0; i < 4; i++) {
      push();
      rotateY((TWO_PI / 4) * i);
      line(0, 0, 0, 0, obj.size / 2, obj.size / 2);
      pop();
    }
    pop();
  }
  
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
