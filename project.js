// Pearicles and circle
let particles = [];
let cirkelx = 300;
let cirkely = 300;
let radie = 200;

//Flow Field
let field = [];
const fieldSize = 10;
const maxCols = 600 / fieldSize;
const maxRows = 600 / fieldSize;
const divider = 0;

//Flow Field
function generateField() {
  noiseSeed(Math.random() * 1000);
  for (let x = 0; x < maxCols; x++) {
    field.push([]);
    for (let y = 0; y < maxRows; y++) {
      const value = noise(x / divider, y / divider) * Math.PI * 2;
      field[x].push(createVector(cos(value), sin(value)));
    }
  }
}

function setup() {
  createCanvas(600, 600);
  generateField();
  // skapa partiklar i mitten
  for (let i = 0; i < 200; i++) {
    let angle = random(TWO_PI);
    let speed = random(1, 2);
    //creates a particle object
    particles.push({
      x: cirkelx,
      y: cirkely,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      state: "orbit", // "fly" = utåt, "orbit" = runt cirkeln
      orbitOffset: random(-100, 20),
    });
  }
}

function draw() {
  background(0, 25);

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
    stroke(255);
    line(p.x, p.y, p.x, p.y);
  }
}
