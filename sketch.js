var data;
var data2;

var balls = [];
var ballsz = [];


function preload() {
  // data = loadJSON('./assets/data.json');
  data = loadJSON('civili.json');
  data2 = loadJSON('cattivi.json');
   mirino = loadImage('mirino1.png');
   citta= loadImage('city.jpg');
   uomo= loadImage('man.png');
   donna= loadImage('woman.png');
   terr= loadImage('terrsfondo.png');
   sfondo = loadSound('crowd.mp3');
    pist = loadSound('gunshot.wav');
    fat = loadSound('Fatality.mp3');
    col = loadSound('menshot.mp3');
    myFont = loadFont('impact.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(myFont);
  sfondo.play();
  imageMode(CENTER);
  textAlign(CENTER);
  textSize(10);

  noCursor();
  console.log(data);
  for (var i = 0; i < data.palline.length ; i++) {

    // properties
    var x = random(width);
    var y = random(height);
    var size = data.palline[i].palline_dimensione * 3;
    var name = data.palline[i].palline_numero;
    var sex= data.palline[i].sesso;

    // create the ball object and add it to the array
    var myBall = new Ball(x, y, size, name,sex);
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
  var diametro=45;
  pist.play();
  balls.push(new Ball (mouseX,mouseY,diametro,"CRAZY"))

}

function draw() {
//image(citta, windowWidth/2,windowHeight/2,citta.width*1.65, citta.height*1.65);
background(15);
image(terr, windowWidth/2,windowHeight/2,terr.width/5, terr.height/5);
background(30,0,0,200);
  image(mirino, mouseX,mouseY,mirino.width/4, mirino.height/4);
  for (var j = 0; j < balls.length; j++) {
    balls[j].move();
    balls[j].display();
  }
  for (var a = 0; a < ballsz.length; a++) {
    ballsz[a].move();
    ballsz[a].display();
  }
  push();
  textSize(45);
  fill(190,22,34,100);
text("Shot the enemy and save the city!Don't Kill the civilian",windowWidth/2,windowHeight/8*7);
pop();
}


function Ball(_x, _y, _diameter, _name,_sex) {
  // Properties defined by constructor
  this.size = _diameter;
  this.x = _x;
  this.y = _y;

  // Hardcoded properties
  this.speed = 2;
  this.yDir = random(1, 8);
  this.xDir = random(1, 8);

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
    if (_sex == 'M') {
      fill(172,174,191);
    } else {
      fill(188,172,183);
    }
    noStroke();
    //fill(237, 237, 237, 255);
    ellipse(this.x, this.y, this.size);
    textAlign(CENTER);
    fill(50);
    text(_name, this.x, this.y);
  }
  this.click = function() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 30) {
      fat.play();
      this.display = function() {
        push();
        fill("red")
        textSize(60);
          text("X",this.x,this.y)
        fill(237, 237, 237, 100);

        pop();



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
  this.yDir = random(3, 5);
  this.xDir = random(3, 5);

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
    fill("#be1622");
  //  tint(255, 255);
    //image(terr, this.x,this.y,terr.width/4, terr.height/4);
    ellipse(this.x, this.y, this.size);
    textAlign(CENTER);
    fill(255);
    text(__name, this.x, this.y);
  }
  this.click = function() {
    var d1 = dist(mouseX, mouseY, this.x, this.y);
    if (d1 < 30) {
      col.play();
      this.display = function() {
        fill(0, 0, 255, 0);

      }
    }
}
}
