let particles = [];
let cirkelx = 300;
let cirkely = 300;
let radie = 200;

function setup() {
  createCanvas(600, 600);

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
    });
  }
}

function draw() {
  background(220);

  // rita ramen (cirkeln)
  noFill();
  ellipse(cirkelx, cirkely, radie * 2, radie * 2);

  // uppdatera partiklar
  for (let p of particles) {
    if (p.state === "orbit") {
      // flyga utåt
      p.x += p.vx;
      p.y += p.vy;

      // kolla om partikeln når ramen
      let d = dist(p.x, p.y, cirkelx, cirkely);
      if (d >= radie) {
        p.state = "orbit"; // byt till nytt beteende
        // normalisera till exakt på ramen
        p.orbitOffset = random(-100, 20); // spara ett fast avstånd från cirkeln
        let angle = atan2(p.y - cirkely, p.x - cirkelx);
        p.x = cirkelx + (radie + p.orbitOffset) * cos(angle);
        p.y = cirkely + (radie + p.orbitOffset) * sin(angle);
        // ge en ny hastighet tangent mot cirkeln
        p.vx = -sin(angle);
        p.vy = cos(angle);
      }
    } else if (p.state === "orbit") {
      // rör sig runt cirkeln
      p.x += p.vx;
      p.y += p.vy;
      /* // justera så att partikeln inte glider ut/in
      let angle = atan2(p.y - cirkely, p.x - cirkelx);
      p.x = cirkelx + radie * cos(angle);
      p.y = cirkely + radie * sin(angle);*/
    }

    // rita partikeln
    noStroke();
    fill(50);
    circle(p.x, p.y, 5);
  }
}
