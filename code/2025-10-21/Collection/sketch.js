// Create a class called Planet
class Planet {
  // Create an x,y position
  constructor(x, y) {
    this.x = x;
    this.y = y;
  } 
  // Draw the planet as a circle
  draw() {
    ellipse(this.x, this.y, 50, 50);
    // wiggle the planet slightly
    this.x += random(-1, 1);
    this.y += random(-1, 1);  
  }
}

// create an array to hold multiple planets
let planets = [];
let kugu;
let toga;

function setup() {
  // Create a canvas that fills the entire window
  createCanvas(windowWidth, windowHeight);
  // position the planet in the center of the canvas
  kugu = new Planet(width * 0.5, height * 0.5);
  planets.push(kugu);
  toga = new Planet(width * 0.25, height * 0.25);
  planets.push(toga);
}

function draw() {
  // Set the background color to gray
  background(0);
  // Draw all planets
  for (let planet of planets) {
    planet.draw();
  }
}

// change colors of planets to red
function draw() {
  // Set the background color to black
  background(0);
  // Draw all planets
  for (let planet of planets) {
    fill(255, 0, 0);
    planet.draw();
  }
}

// when the mouse is pressed, add a new planet at the mouse position
function mousePressed() {
  let newPlanet = new Planet(mouseX, mouseY);
  planets.push(newPlanet);
}

// suppress planets when 's' key is pressed
function keyPressed() {
  if (key === 's' || key === 'S') {
    planets.pop();
  }
}

// create an array to hold alien monsters
let aliens = [];

class Alien {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    ellipse(this.x, this.y, 30, 30);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  kugu = new Planet(width * 0.5, height * 0.5);
  planets.push(kugu);
  toga = new Planet(width * 0.25, height * 0.25);
  planets.push(toga);

  // Create some aliens
  let alien1 = new Alien(width * 0.75, height * 0.5);
  aliens.push(alien1);
  let alien2 = new Alien(width * 0.5, height * 0.75);
  aliens.push(alien2);
} 

// make aliens appears when "a" key is pressed
function keyPressed() {
  if (key === 's' || key === 'S') {
    planets.pop();
  }
  if (key === 'a' || key === 'A') {
    let newAlien = new Alien(random(width), random(height));
    aliens.push(newAlien);
  }
}

// make aliens disappear when "d" key is pressed
function keyPressed() {
  if (key === 's' || key === 'S') {
    planets.pop();
  }
  if (key === 'a' || key === 'A') {
    let newAlien = new Alien(random(width), random(height));
    aliens.push(newAlien);
  }
  if (key === 'd' || key === 'D') {
    aliens.pop();
  }
}

// make aliens wiggle slightly
function draw() {
  for (let planet of planets) {
    fill(255, 0, 0);
    planet.x += random(-1, 1);
    planet.y += random(-1, 1);
    planet.draw();
  }
  
  // Draw all aliens with wiggle
  fill(0, 255, 0);
  for (let alien of aliens) {
    alien.x += random(-1, 1);
    alien.y += random(-1, 1);
    alien.draw();
  }
}

// make an array of eyes that follow the center of aliens
let eyes = [];
function createEyesForAlien(alien) {
  let eye1 = { x: alien.x - 5, y: alien.y - 5 };
  let eye2 = { x: alien.x + 5, y: alien.y - 5 };
  eyes.push(eye1, eye2);
} 

function setup() {
  createCanvas(windowWidth, windowHeight);
  kugu = new Planet(width * 0.5, height * 0.5);
  planets.push(kugu);
  toga = new Planet(width * 0.25, height * 0.25);
  planets.push(toga);

  // Create some aliens and their eyes
  let alien1 = new Alien(width * 0.75, height * 0.5);
  aliens.push(alien1);
  createEyesForAlien(alien1);
  let alien2 = new Alien(width * 0.5, height * 0.75);
  aliens.push(alien2);
  createEyesForAlien(alien2);
}

function draw() {
  background(0);
  for (let planet of planets) {
    fill(255, 0, 0);
    planet.x += random(-1, 1);
    planet.y += random(-1, 1);
    planet.draw();
  }
  
  // Draw all aliens with wiggle
  fill(0, 255, 0);
  for (let alien of aliens) {
    alien.x += random(-1, 1);
    alien.y += random(-1, 1);
    alien.draw();
  }

// draw antennas attached to aliens
  stroke(0, 255, 0);
  for (let alien of aliens) {
    line(alien.x, alien.y - 15, alien.x - 5, alien.y - 25);
    line(alien.x, alien.y - 15, alien.x + 5, alien.y - 25);
  }
  noStroke();

  // Draw eyes centered into aliens
  fill(255);
  for (let alien of aliens) {
    let eye1 = { x: alien.x - 5, y: alien.y - 5 };
    let eye2 = { x: alien.x + 5, y: alien.y - 5 };
    ellipse(eye1.x, eye1.y, 5, 5);
    ellipse(eye2.x, eye2.y, 5, 5);
  }

  // Draw mouths for aliens
  fill(255, 0, 0);
  for (let alien of aliens) {
    ellipse(alien.x, alien.y + 5, 10, 5);
  } 

  // Draw bodies for aliens
  fill(0, 200, 0);
  for (let alien of aliens) {
    ellipse(alien.x, alien.y + 15, 20, 15);
  }
  
  // Draw arms for aliens
  stroke(0, 200, 0);  
  for (let alien of aliens) {
    line(alien.x - 10, alien.y + 15, alien.x - 20, alien.y + 10);
    line(alien.x + 10, alien.y + 15, alien.x + 20, alien.y + 10);
  }
  noStroke();

} 