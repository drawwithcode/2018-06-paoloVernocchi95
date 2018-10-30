var data;
var data2;

var balls = [];
var ballsz = [];


function preload() {
  // data = loadJSON('./assets/data.json');
  data = loadJSON('prova3virus.json');
  data2 = loadJSON('buoni.json');
   mirino = loadImage('mirino.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  noCursor();
  console.log(data);
  for (var i = 0; i < data.palline.length - 200; i++) {

    // properties
    var x = random(width);
    var y = random(height);
    var size = data.palline[i].palline_dimensione * 3;
    var name = data.palline[i].Palline_name;

    // create the ball object and add it to the array
    var myBall = new Ball(x, y, size, name);
    balls.push(myBall);
  }
  console.log(data2);
  for (var l = 0; l < 5; l++) {

    // properties
    var x1 = random(width);
    var y2 = random(height);
    var size2 = 50;
    var name2 = data2.salvare[l].buoninome;

    // create the ball object and add it to the array
    var goodBall = new Ballz(x1, y2, size2, name2);
    ballsz.push(goodBall);
  }
}

function mousePressed() {
  for (var j = 0; j < balls.length; j++){
    balls[j].click();
  }
  for (var a = 0; a < ballsz.length; a++){
    ballsz[a].click();
  }
  var diametro=30;
  balls.push(new Ball (mouseX,mouseY,diametro,"virus"))

}

function draw() {
  background(255);
  image(mirino, mouseX,mouseY,mirino.width/15, mirino.height/15);
  for (var j = 0; j < balls.length; j++) {
    balls[j].move();
    balls[j].display();
  }
  for (var a = 0; a < ballsz.length; a++) {
    ballsz[a].move();
    ballsz[a].display();
  }
}


function Ball(_x, _y, _diameter, _name) {
  // Properties defined by constructor
  this.size = _diameter;
  this.x = _x;
  this.y = _y;

  // Hardcoded properties
  this.speed = 2;
  this.yDir = random(1, 4);
  this.xDir = random(1, 4);

  // Methods
  this.move = function() {
    this.x += this.speed * this.xDir;
    this.y += this.speed * this.yDir;
    if (this.y >= height || this.y <= 0) {
      this.yDir *= -1;
    }
    if (this.x >= width || this.x <= 0) {
      this.xDir *= -1;
    }
  }
  this.display = function() {
    fill(0, 0, 255, 255);
    ellipse(this.x, this.y, this.size);
    textAlign(CENTER);
    fill(255);
    text(_name, this.x, this.y);
  }
  this.click = function() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 30) {
      this.display = function() {
        fill(0, 0, 255, 0);
      }
    }
  }

}

function Ballz(__x, __y, __diameter, __name) {
  // Properties defined by constructor
  this.size = __diameter;
  this.x = __x;
  this.y = __y;

  // Hardcoded properties
  this.speed = 2;
  this.yDir = random(1, 4);
  this.xDir = random(1, 4);

  // Methods
  this.move = function() {
    this.x += this.speed * this.xDir;
    this.y += this.speed * this.yDir;
    if (this.y >= height || this.y <= 0) {
      this.yDir *= -1;
    }
    if (this.x >= width || this.x <= 0) {
      this.xDir *= -1;
    }
  }
  this.display = function() {
    fill("red");
    ellipse(this.x, this.y, this.size);
    textAlign(CENTER);
    fill(255);
    text(__name, this.x, this.y);
  }
  this.click = function() {
    var d1 = dist(mouseX, mouseY, this.x, this.y);
    if (d1 < 30) {
      this.display = function() {
        fill(0, 0, 255, 0);
      }
    }
}
}
