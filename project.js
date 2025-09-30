// PARTICLES
// This code is adapted from https://codepen.io/pixelkind/pen/VwqKyoP

let particles = []; // Particle array

class Particle {
  // class for particle
  constructor(x, y) {
    // start position
    this.position = createVector(x, y);
    const a = Math.random() * Math.PI * 2;
    // angle and velocity
    const v = 0.2 + Math.random();
    this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
  }

  // Update particle position
  update() {
    this.position.add(this.velocity);
  }

  // draw particle
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
  // genereate particles
  generateParticles(innerWidth / 2, innerHeight / 2);
}

// create multiple particles from (x,y)
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
  // circle
  noFill();
  stroke(255);
  ellipse(innerWidth / 2, height / 2, 700);
  // update and draw all particles
  for (let particle of particles) {
    particle.update();
    particle.draw();
  }
}
