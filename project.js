// This code is adapted from https://codepen.io/pixelkind/pen/VwqKyoP
let particles = [];
class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    const a = Math.random() * Math.PI * 2;
    const v = 0.2 + Math.random();
    this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
  }

  update() {
    this.position.add(this.velocity);
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();
    fill(200, 200, 0, 150);
    ellipse(0, 0, 6);
    pop();
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  generateParticles(innerWidth / 2, innerHeight / 2);
}

function generateParticles(x, y) {
  for (let i = 0; i < 400; i++) {
    const px = x + random(-10, 10);
    const py = y + random(-10, 10);
    const particle = new Particle(px, py);
    particles.push(particle);
  }
}

function draw() {
  background(0, 0, 0);

  for (let particle of particles) {
    particle.update();
    particle.draw();
  }
}
