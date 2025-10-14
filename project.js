// Pearicles and circle
let particles = [];
let cirkelx = 300;
let cirkely = 300;
let radie = 200;

//Flow Field
let field = [];
const fieldSize = 5;
const maxCols = 150 / fieldSize;
const maxRows = 150 / fieldSize;
const divider = 8;

const size = 10;
const numCols = 30;
const numRows = 30;
let counter = 0;

//Flow Field
function generateField() {
  noiseSeed(Math.random() * 10);
  for (let x = 0; x < maxCols; x++) {
    field.push([]);
    for (let y = 0; y < maxRows; y++) {
      const value = noise(x / divider, y / divider) * Math.PI * 6;
      field[x].push(createVector(cos(value), sin(value)));
    }
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  generateField();

  // skapa partiklar i mitten
  for (let i = 0; i < 200; i++) {
    let angle = random(TWO_PI);
    let speed = random(3, 11);

    //creates a particle object
    particles.push({
      x: cirkelx,
      y: cirkely,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      state: "orbit",
      orbitOffset: random(-100, 20),
    });
  }
}
// hello

function draw() {
  background(25, 17, 34, 100);
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      const value = noise(x / divider, y / divider, counter) * size;
      fill(53, 38, 68, 30);
      noStroke();
      ellipse(size / 2 + x * size, size / 2 + y * size, value);
    }
  }
  push();
  // rita ramen (cirkeln)
  noFill(0);
  noStroke(0);
  ellipse(cirkelx, cirkely, radie * 2, radie * 2);

  // Following 11 lines are adapted from ChatGPT https://chatgpt.com/share/68e4fa5f-2780-8005-b5d7-90208144df5a
  for (let p of particles) {
    // Find flow field vector
    let col = floor(p.x / fieldSize);
    let row = floor(p.y / fieldSize);

    if (col >= 0 && col < maxCols && row >= 0 && row < maxRows) {
      let force = field[col][row];
      // small nudge from flow field
      p.vx += force.x * 0.05;
      p.vy += force.y * 0.05;
    }

    if (p.state === "orbit") {
      // Particle movement
      p.x += p.vx;
      p.y += p.vy;

      // COLLISSION
      let d = dist(p.x, p.y, cirkelx, cirkely);
      if (d >= radie) {
        let angle = atan2(p.y - cirkely, p.x - cirkelx);
        p.x = cirkelx + (radie + p.orbitOffset) * cos(angle);
        p.y = cirkely + (radie + p.orbitOffset) * sin(angle);
        // ge en ny hastighet tangent mot cirkeln
        p.vx = -sin(angle);
        p.vy = cos(angle);
      }
    }

    // rita partikeln
    strokeWeight(2);
    stroke(250);
    line(p.x, p.y, p.x, p.y);
  }

  pop();

  counter++;
}
