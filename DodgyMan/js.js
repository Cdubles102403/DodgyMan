//player class
class Player{
    constructor(){
        this.x=mouseX;
        this.y=mouseY;
        this.hasPowerUp = false;
        this.size = 30;
    }
    draw(){
        circle(mouseX,mouseY,this.size)
    }
}

//enemy class
class Enemy{
    constructor(){
       this.x = 0;
       this.y = 0;
        this.speed=5;
        this.size=20;
    }
    move(){
        this.x+=this.speed;
        this.y+=1;
        square(this.x, this.y, this.size, 2);
    }
}
//powerUp class
class Powerup{
    constructor(){
        this.x=0;
        this.y=0;
        this.type = "string";
        this.isUsed = false;
    }
}

function setup() {
  createCanvas(1040, 580);
    background('red');
    Player = new Player();
    enemy = new Enemy();
}

function draw() {
    background('red');
    Player.draw();
    enemy.move()
}