let food;
let ray;
let liquid;

function setup() {
  createCanvas(400, 400);
  liquid = new Liquid(0, height/2, width, height/2, 0.1);
  food = new Food();
  ray = new Ray();
}

function draw() {
  background(180);
  liquid.contain();
  liquid.calculateDrag();
  liquid.display();
 // food.update();
  food.display();
  let gravity = createVector (0, 0.1*food.mass);
  food.applyForce(gravity);
  ray.exist();
}

class Liquid {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

// Mover가 액체인가요?
  contain(){
    let l = food.pos;
    return l.x > this.x && l.x < this.x + this.w &&
           l.y > this.y && l.y < this.y + this.h;
  }

// 항력 계산하기
  calculateDrag(){
    // Magnitue(크기) = 계수 * speed(속도)의 제곱
    let speed = food.vel.mag();
    let dragMagnitude = this.c * speed * speed;

    // 방향은 속도와 반대쪽으로
    let dragForce = food.vel.copy();
    dragForce.mult(-1);

    // 힘의 크기에 따라 조정하기
    // dragForce.setMag(dragMagnitude);
    dragForce.normalize();
    dragForce.mult(dragMagnitude);
    return dragForce;
  }

  display() {
    noStroke();
    fill(100);
    rect(this.x, this.y, this.w, this.h);
  }
}

class Food {
  constructor() {
    this.pos = createVector(random(0,width),0);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.mass = random(10, 50);
  }

  applyForce (force) {
    let f = force.copy();
   this.acc.add(f.div(this.mass));
  }
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display(){
     let d = dist(ray.pos.x, ray.pos.y, this.pos.x, this.pos.y);
     if (d < this.radius) {
       fill(255, 255, 255, 10);
       ellipse(this.pos.x , this.pos.y , this.mass , this.mass);
     }else{
       fill(255);
       ellipse(this.pos.x , this.pos.y , this.mass , this.mass);
  }
  // erase(){
  //   let d = dist(mouseX, mouseY, food.pos.x, food.pos.y);
  //   if (d < this.mass) {
  //     fill(255, 255, 255, 10);
  //     ellipse(this.pos.x , this.pos.y , this.mass , this.mass);
  //   }
  }
}

class Ray{
  constructor(){
    this.pos = createVector(180, 300);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
  }
  update(){
   this.vel.add(this.acc);
   this.pos.add(this.vel);
  }
  exist(){
   let n = 40;
   fill(255, 255, 255, 80);
   stroke(0);
   quad(mouseX, mouseY, mouseX+n, mouseY+n, mouseX, mouseY+2*n, mouseX-n, mouseY+n);
  }
}
// function mouseClicked() {
//   food.erase();
// }
