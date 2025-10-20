// Clean, animated version that uses Perlin noise, layered ellipses and subtle mouse interaction.
// Artistic choices: HSB palette (mapping to "invisible light" bands), layered soft ellipses for organic fluid shapes,
// slow z-offset for cosmic timescale evolution, and tiny user influence via mouse (simulating small human impact).

let cols = 10;
let rows = 10;
let zoff = 0;              // time axis for noise
let baseNoiseScale = 0.25; // base spatial frequency
let palette = [];
let paused = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  noStroke();
  frameRate(60);

  // Palette: suggestive bands from warm (IR) to energetic (X-ray-ish)
  palette = [
    color(20, 80, 80),   // IR-like (warm)
    color(40, 70, 90),   // near-IR / redder
    color(200, 60, 90),  // radio-like / deep cool
    color(260, 70, 90),  // UV-ish (violet)
    color(320, 60, 90)   // X-ray/energetic (magenta tint)
  ];
}

function draw() {
  // translucent background yields soft motion trails
  background(0, 0, 0, 0.08);

  // subtle mouse influence: smaller noiseScale -> smoother, larger -> more detail
  let mouseInfluenceX = map(constrain(mouseX, 0, width), 0, width, 0.6, 0.12);
  let noiseScale = baseNoiseScale * mouseInfluenceX;

  // vertical mouse shifts which palette bands dominate
  let colorShift = map(constrain(mouseY, 0, height), 0, height, -0.2, 0.6);

  let cellW = width / cols;
  let cellH = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // center of cell for organic blobs
      let cx = i * cellW + cellW * 0.5;
      let cy = j * cellH + cellH * 0.5;

      // 3D noise sample (x, y, time)
      let n = noise(i * noiseScale, j * noiseScale, zoff);

      // interpolate between two palette entries for smooth gradients
      let pi = floor(map(n + colorShift, 0, 1, 0, palette.length)) % palette.length;
      let next = (pi + 1) % palette.length;
      let t = map(n, 0, 1, 0, 1);
      let col = lerpColor(palette[pi], palette[next], t);

      // organic brightness / saturation variation
      let bright = map(noise(i * noiseScale * 1.3, j * noiseScale * 1.1, zoff + 5), 0, 1, 60, 100);
      let sat = map(noise(i * noiseScale * 0.9, j * noiseScale * 1.2, zoff + 10), 0, 1, 40, 100);

      let h = hue(col);

      // layered soft ellipses for fluid, metallic-like forms
      let maxR = min(cellW, cellH) * 0.9 * (0.6 + n * 0.8);
      for (let k = 0; k < 6; k++) {
        let layerT = k / 6;
        let r = maxR * (1 - layerT * 0.9);
        let jitter = map(noise(i * 10 + k, j * 10 + k, zoff + k * 0.1), 0, 1, -r * 0.08, r * 0.08);
        let dx = map(noise(i * 0.5 + k, j * 0.5 + k, zoff), 0, 1, -cellW * 0.03, cellW * 0.03);
        let dy = map(noise(i * 0.7 + k, j * 0.7 + k, zoff + 2), 0, 1, -cellH * 0.03, cellH * 0.03);

        let alpha = map(k, 0, 5, 0.95, 0.06);
        fill(h, sat * (1 - layerT * 0.5), bright * (1 - layerT * 0.4), alpha);

        ellipse(cx + dx + jitter * 0.2, cy + dy + jitter * 0.2, r, r * 0.75);
      }
    }
  }

  // slow time advance for "cosmic" pace
  zoff += 0.0025;

  // optional dev HUD (comment out for exhibition)
  // fill(0,0,100); textSize(12); text('noiseScale: ' + nf(noiseScale,1,3) + ' zoff: ' + nf(zoff,1,3), 10, height-10);
}

function keyPressed() {
  // Space toggles pause/resume
  if (key === ' ') {
    if (paused) {
      loop();
      paused = false;
    } else {
      noLoop();
      paused = true;
    }
  }
  // 's' saves a frame
  if (key === 's' || key === 'S') {
    saveFrame('frame-####.png');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
