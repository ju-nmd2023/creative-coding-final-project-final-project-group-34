// Pearicles and circle
let particles = [];
let cirkelx;
let cirkely;
let radie = 200;

//Flow Field
let field = [];
const fieldSize = 1.5;
const maxCols = 150;
const maxRows = 150;
let fieldSizeX;
let fieldSizeY;
const FlowDivider = 8;

// Perlin Noise background
const size = 80;
let numCols;
let numRows;
const bgDivider = 2;
let bgCounter = 2;

//Flow Field
function generateField() {
  noiseSeed(Math.random() * 10);
  for (let x = 0; x < maxCols; x++) {
    field.push([]);
    for (let y = 0; y < maxRows; y++) {
      const value = noise(x / FlowDivider, y / FlowDivider) * Math.PI * 6;
      field[x].push(createVector(cos(value), sin(value)));
    }
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);

  cirkelx = width / 2;
  cirkely = height / 2;
  numCols = Math.ceil(width / size);
  numRows = Math.ceil(height / size);
  fieldSizeX = width / maxCols;
  fieldSizeY = height / maxRows;
  generateField();

  // Create particles
  for (let i = 0; i < 2000; i++) {
    let angle = random(TWO_PI);
    let speed = random(3, 11);

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

function draw() {
  background(0, 50);

  // Background Perlin Noise + Vera Molnár inspired lines

  for (let x = 0; x < numCols; x++) {
    for (let y = 0; y < numRows; y++) {
      let angle = noise(x * 0.1, y * 0.1, frameCount * 0.01) * TWO_PI;
      push();
      translate(x * size + size / 2, y * size + size / 2);
      rotate(angle);
      stroke(255, 255, 255, 15);
      strokeWeight(2);
      line(-size / 2, 0, size / 2, 0);
      pop();
    }
  }

  push();
  // Draw circle
  noFill(0);
  noStroke(0);
  ellipse(cirkelx, cirkely, radie * 2, radie * 2);

  // Particles with Flow field
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
  bgCounter += 0.08;
}
