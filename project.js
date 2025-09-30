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

//let myCircle;

function setup() {
  createCanvas(innerWidth, innerHeight);
  // genereate particles
  generateParticles(innerWidth / 2, innerHeight / 2);

 // myCircle = createObject(width / 2, height / 2, 600, 600);
}

/*function createObject(x, y, w, h) {
  return {
    x: x,
    y: y,
    w: w,
    h: h,
  };
}

function checkCollision(objectA, objectB) {
  if (
    objectA.x - objectA.w / 2 < objectB.x + objectB.w / 2 &&
    objectA.x + objectA.w / 2 > objectB.x - objectB.w / 2 &&
    objectA.y - objectA.h / 2 < objectB.y + objectB.h / 2 &&
    objectA.y + objectA.h / 2 > objectB.y - objectB.h / 2
  ) {
    return true;
  } else {
    return false;
  }
}

function ParticleAsObject(Particle) {
  return {
    x: Particle.position.x,
    y: Particle.position.y,
    w: 2,
    h: 2,
  };
}*/

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
  /* // circle
  noFill();
  stroke(255);
  ellipse(innerWidth / 2, height / 2, 700);*/
  // update and draw all particles
  for (let particle of particles) {
    particle.update();
    particle.draw();

   /* if (checkCollision(ParticleAsObject(particle), myCircle)) {
      particle.position.y = myCircle.y - myCircle.h / 2 - 1;
    }*/
  }

  /*noFill();
  stroke(255);
  ellipse(myCircle.x, myCircle.y, myCircle.w, myCircle.h);*/
}
