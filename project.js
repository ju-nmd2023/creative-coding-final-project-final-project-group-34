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

// Vera Molnar background
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

/////////////////////////////////////////////////////////////////////////////

// SETUP

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
    let speeds = random(3, 11);

    particles.push({
      x: cirkelx,
      y: cirkely,
      vx: cos(angle) * speeds,
      vy: sin(angle) * speeds,
      state: "orbit",
      orbitOffset: random(-100, 20),
    });
  }
}

///////////////////////////////////////////////////////////////////////////////

// DRAW FUNCTION

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
      // particle movement
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

    // draws the particle
    strokeWeight(2);
    stroke(250);
    line(p.x, p.y, p.x, p.y);
  }

  pop();
  bgCounter += 0.08;
}

///////////////////////////////////////////////////////////////////////////////

// PLAYING SOUND

let synth;
let reverb;
let chorus;

const keyToNote = {
  a: "C3",
  s: "E3",
  d: "G3",
  f: "A3",
  g: "C4",
  h: "E4",
  j: "G4",
};

window.addEventListener("load", () => {
  reverb = new Tone.Reverb({ decay: 10, wet: 0.7 }).toDestination();
  chorus = new Tone.Chorus(1.5, 3.5, 0.5).connect(reverb).start();

  synth = new Tone.PolySynth(Tone.AMSynth, {
    oscillator: { type: "sine" },
    envelope: { attack: 3, decay: 1, sustain: 0.9, release: 6 },
    modulation: { type: "triangle" },
    modulationEnvelope: { attack: 2, decay: 1, sustain: 1, release: 4 },
  }).connect(chorus);

  synth.volume.value = 20;
});

window.addEventListener("click", () => {
  Tone.start();
});

window.addEventListener("keydown", (e) => {
  const note = keyToNote[e.key.toLowerCase()];
  if (note) {
    synth.triggerAttackRelease(note, "4n");
  }
});
