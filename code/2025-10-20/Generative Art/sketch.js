// Post-Industrial Biomes Visualization

// Theme
// Interactive visualization exploring techno-ecological systems where machinery and nature have merged into luminous, vascular structures.

// Visual References
// Place reference images in `/references/inspiration/` showing:
// - Bioluminescent fungi networks
// - Circuit board patterns
// - Vascular systems
// - Industrial ruins with plant growth
// - Phosphorescent organisms
// - Neural networks

// Color Palette
// - Deep violets (280-300°)
// - Bioluminescent blues (220-240°)
// - Toxic reds (340-360°)

// Flowing points simulation with electromagnetic spectrum colors.
// Artistic choices: HSB color mapping for "invisible light" bands, fluid point movement influenced by Perlin noise,
// subtle user interaction via mouse (simulating human impact), and slow temporal evolution for a cosmic timescale feel.

let bioNodes = [];
let structures = [];
let buildings = [];
let dataStreams = [];
let numNodes = 12;
let energyField = 0;
let cameraAngle = 0;
let horizon;

// Scene constants
const SCENE = {
  DEPTH: 1200,
  STRUCTURES: 8,
  LAYERS: 4
};

// Load colors from palette
// Scene Configuration
const PALETTE = {
  neonRed: '#FF1E3C',
  neonCyan: '#18D7FF',
  deepBlue: '#0B1A25',
  charcoal: '#101114',
  accentPink: '#FF4D73'
};

const ASCII_CHARS = '.:-=+*#%@';
const CELL_SIZE = 15;
let cells = [];
let noiseOffset = 0;

const MANSION = {
  floors: 5,
  windowRows: 8,
  windowCols: 12
};

let neonLines = [];
let windows = [];
let particles = [];
let time = 0;

let isFullscreen = false;

// Add these new constants
const EFFECTS = {
  GLITCH_CHANCE: 0.2,
  STATIC_INTENSITY: 0.3,
  COLOR_SHIFT_SPEED: 0.01,
  WAVE_FREQUENCY: 0.02,
  MAX_DISTORTION: 50
};

// Add these new global variables
let glitchOffset = 0;
let colorShift = 0;
let waveTime = 0;
let staticNoise = [];
let glitchLines = [];
let vortexAngle = 0;

let scene = {
  structures: [],
  particles: []
};

// Clean, animated version that uses Perlin noise, layered ellipses and subtle mouse interaction.
// Artistic choices: HSB palette (mapping to "invisible light" bands), layered soft ellipses for organic fluid shapes,
// slow z-offset for cosmic timescale evolution, and tiny user influence via mouse (simulating small human impact).

let cols = 8;  // reduced grid density for minimalism
let rows = 8;
let zoff = 0;
let baseNoiseScale = 0.15;
let branches = [];
let wavelengths = [];
let paused = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  frameRate(60);
  
  // Remove margins and scrollbars
  document.body.style.margin = '0';
  document.body.style.overflow = 'hidden';
  
  // Reduced palette focusing on red/infrared spectrum only
  wavelengths = [
    color(0, 80, 40),    // Deep infrared (dark red)
    color(0, 85, 50),    // Mid infrared
    color(5, 90, 60),    // Near infrared
    color(10, 95, 70)    // Visible red edge
  ];
  
  initBranches();
}

function initBranches() {
  branches = [];
  let spacing = width / 6;  // wider spacing
  for(let x = spacing; x < width; x += spacing) {
    for(let y = spacing; y < height; y += spacing) {
      if(random(1) < 0.7) { // fewer initial branches
        branches.push({
          x: x + random(-spacing/3, spacing/3),
          y: y + random(-spacing/3, spacing/3),
          angle: random(TWO_PI),
          length: random(40, 100),  // longer branches
          generation: 0
        });
      }
    }
  }
}

function toggleFullscreen() {
  if (!isFullscreen) {
    fullscreen(true);
    isFullscreen = true;
  } else {
    fullscreen(false);
    isFullscreen = false;
  }
}

function initializeCells() {
  cells = [];
  for(let y = 0; y < height; y += CELL_SIZE) {
    for(let x = 0; x < width; x += CELL_SIZE) {
      cells.push({
        x: x,
        y: y,
        char: random(ASCII_CHARS),
        brightness: random(0.2, 1),
        pulseSpeed: random(0.02, 0.05),
        phase: random(TWO_PI)
      });
    }
  }
}

function initializeMansion() {
  windows = [];
  neonLines = [];
  
  // Initialize mansion windows
  for(let floor = 0; floor < MANSION.floors; floor++) {
    for(let col = 0; col < MANSION.windowCols; col++) {
      windows.push({
        x: map(col, 0, MANSION.windowCols-1, width*0.2, width*0.8),
        y: map(floor, 0, MANSION.floors-1, height*0.2, height*0.8),
        width: width * 0.02,  // Make windows scale with screen size
        height: height * 0.04,
        glow: random(0.3, 1),
        pulseSpeed: random(0.02, 0.05),
        state: random() > 0.3
      });
    }
  }
  
  // Create neon decorations
  for(let i = 0; i < 15; i++) {
    neonLines.push(createNeonLine());
  }
}

function draw() {
  background(0, 0, 0, 0.2);  // darker trails
  blendMode(ADD);

  let mouseInfluence = map(mouseX, 0, width, 0.1, 1.5);
  let energyLevel = map(mouseY, 0, height, 0.3, 1.2);

  for(let i = branches.length - 1; i >= 0; i--) {
    let b = branches[i];
    let n = noise(b.x * 0.002, b.y * 0.002, zoff);
    
    // Simpler color interpolation within red spectrum
    let wavelengthIndex = floor(map(n, 0, 1, 0, wavelengths.length - 1));
    let col = wavelengths[wavelengthIndex];
    
    let angleNoise = noise(b.x * 0.008, b.y * 0.008, zoff + 100) * PI * mouseInfluence;
    b.angle += angleNoise * 0.15;
    
    let len = b.length * map(noise(b.x * 0.015, b.y * 0.015, zoff), 0, 1, 0.6, 1.3) * energyLevel;
    let nextX = b.x + cos(b.angle) * len;
    let nextY = b.y + sin(b.angle) * len;
    
    // Thinner lines with stronger glow
    let alpha = map(b.generation, 0, 3, 0.5, 0.15);
    stroke(hue(col), saturation(col) * 0.9, brightness(col), alpha);
    strokeWeight(map(b.generation, 0, 3, 2, 0.5));
    line(b.x, b.y, nextX, nextY);
    
    // Less frequent branching
    if(random(1) < 0.02 && b.generation < 3) {
      branches.push({
        x: nextX,
        y: nextY,
        angle: b.angle + random(-PI/4, PI/4),
        length: b.length * 0.85,
        generation: b.generation + 1
      });
    }
    
    b.x = nextX;
    b.y = nextY;
    
    if(b.x < 0 || b.x > width || b.y < 0 || b.y > height || random(1) < 0.002) {
      branches.splice(i, 1);
    }
  }
  
  // Less frequent new branches
  if(branches.length < 50 && random(1) < 0.08) {
    let edge = floor(random(4));
    let x = (edge % 2) ? ((edge == 1) ? width : 0) : random(width);
    let y = (edge % 2) ? random(height) : ((edge == 0) ? 0 : height);
    branches.push({
      x: x,
      y: y,
      angle: random(TWO_PI),
      length: random(40, 100),
      generation: 0
    });
  }

  zoff += 0.001; // slower evolution
}

function keyPressed() {
  if(key === ' ') {
    paused = !paused;
    paused ? noLoop() : loop();
  }
  if(key === 'r') initBranches();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initBranches();
}
