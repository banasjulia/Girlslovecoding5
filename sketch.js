let scene = 0;
let tloImg, kwiatekImg;
let startInput, dalejVisible = false;
let glitterParticles = [];

function preload() {
  tloImg = loadImage('loginpage.png');           // tło
  kwiatekImg = loadImage('FlowerMouse.png');     // kursor kwiatek
}

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  noCursor();

  // Input na imię
  startInput = createInput('');
  startInput.size(160, 32);
  startInput.style('font-size', '18px');
  startInput.style('border-radius', '16px');
  startInput.style('border', '2px solid #e1a4e9');
 // startInput.style('padding', '6px 12px');
  startInput.style('text-align', 'center');
  startInput.style('background', 'rgba(255,255,255,0.85)');
  startInput.style('z-index', '1');
  startInput.style('outline', 'none');
  startInput.style('caret-color', '#e1a4e9');
  startInput.input(() => {
    dalejVisible = startInput.value().trim() !== "";
  });
}

function draw() {
  background(255);
  image(tloImg, 0, 0, width, height);

  // Input wyśrodkowany i mniejszy
  const inputW = 160;
  const inputH = 32;
  const inputX = width/2 - inputW/2 -2;
  const inputY = height/2 - inputH - 8;
  startInput.position(inputX, inputY);
  startInput.size(inputW, inputH);

  // Przycisk DALEJ - tej samej szerokości co input, wyśrodkowany pod inputem
  const btnW = inputW+4;
  const btnH = 30;
  const btnX = inputX;
  const btnY = inputY + inputH + 20;

  if (dalejVisible) {
    // Rysuj prostokąt jako przycisk
    noStroke();
    fill('#ffc0fb');
    rect(btnX, btnY, btnW, btnH, 12);
    stroke('#e1a4e9');
    strokeWeight(2);
    noFill();
    rect(btnX, btnY, btnW, btnH, 12);
    noStroke();
    fill('#222');
    textSize(18);
    textAlign(CENTER, CENTER);
    text('Dalej', btnX + btnW/2, btnY + btnH/2);
  }

  // Glitter efekt
  for (let i = glitterParticles.length - 1; i >= 0; i--) {
    glitterParticles[i].update();
    glitterParticles[i].show();
    if (glitterParticles[i].finished()) {
      glitterParticles.splice(i, 1);
    }
  }

  // Kursor kwiatek
  imageMode(CENTER);
  image(kwiatekImg, mouseX, mouseY, 40, 40);
  imageMode(CORNER);
}

function mousePressed() {
  // Parametry przycisku jak w draw()
  const inputW = 164;
  const inputH = 30;
  const inputX = width/2 - inputW/2;
  const inputY = height/2 - inputH - 8;
  const btnW = inputW;
  const btnH = 30;
  const btnX = inputX;
  const btnY = inputY + inputH + 20;

  // Przycisk DALEJ
  if (
    dalejVisible &&
    mouseX > btnX && mouseX < btnX + btnW &&
    mouseY > btnY && mouseY < btnY + btnH
  ) {
    //startInput.hide();
    // Tu możesz dodać przejście do kolejnej sceny, np. scene = 1;
    
  }
  // Glitter w miejscu kliknięcia kursora kwiatka
  for (let i = 0; i < 18; i++) {
    glitterParticles.push(new Glitter(mouseX, mouseY));
  }
}

// Klasa do efektu glitter
class Glitter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = random(TWO_PI);
    this.radius = random(8, 32);
    this.life = 0;
    this.maxLife = random(20, 40);
    this.size = random(3, 7);
    this.color = color(random(180,255), random(120,200), random(200,255), 200);
  }
  update() {
    this.life++;
    this.x += cos(this.angle) * 1.5;
    this.y += sin(this.angle) * 1.5;
  }
  finished() {
    return this.life > this.maxLife;
  }
  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}
