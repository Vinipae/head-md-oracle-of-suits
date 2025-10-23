// create a bubble class for alien underwater world
class Bubble {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = random(2, 4);
    this.wobblePhase = random(TWO_PI);
    this.color = color(
      random(150, 255),
      random(200, 255),
      random(220, 255),
      180
    );
    this.glowColor = color(
      random(100, 200),
      random(180, 255),
      random(200, 255)
    );
  }

  update() {
    this.y -= this.speed;
    this.x += sin(frameCount * 0.05 + this.wobblePhase) * 2;
  }

  display() {
    push();
    
    // Outer glow
    for (let i = 0; i < 3; i++) {
      fill(
        red(this.glowColor),
        green(this.glowColor),
        blue(this.glowColor),
        60 - i * 20
      );
      noStroke();
      circle(this.x, this.y, this.size + i * 10);
    }
    
    // Main bubble
    fill(this.color);
    stroke(255, 255, 255, 150);
    strokeWeight(2);
    circle(this.x, this.y, this.size);
    
    // Bubble highlights
    fill(255, 255, 255, 200);
    noStroke();
    circle(this.x - this.size * 0.25, this.y - this.size * 0.25, this.size * 0.2);
    
    fill(255, 255, 255, 120);
    circle(this.x + this.size * 0.2, this.y - this.size * 0.15, this.size * 0.12);
    
    // Inner shimmer
    let shimmer = sin(frameCount * 0.1 + this.wobblePhase) * 50 + 100;
    fill(200, 240, 255, shimmer);
    noStroke();
    circle(this.x, this.y, this.size * 0.5);
    
    pop();
  }
}





