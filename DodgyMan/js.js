//player class
class Player{
    constructor(){
        this.x=mouseX;
        this.y=mouseY;
        this.hasPowerUp = false;
        this.size = 30;
    }
    draw(){
      this.x = mouseX;
      this.y = mouseY;
        circle(this.x,this.y,this.size)
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
        this.color;
        this.y=0;
        this.type = "string";
        this.picked = false;
        this.isUsed = false;
        this.powerUp = Math.floor(Math.random() * 4)+1;

    }
    //set powerup type for powerup
    chooser(){
      if(!this.isUsed){
        this.isUsed = true;
        switch (this.powerUp) {
          case 1:
            this.type = "DoublePoints"
            break;
          case 2:
            this.type = "ExtraLife"
            break;
          case 3:
            this.type = "Clear"
            break;
          case 1:
            this.type = "KillMode"
            break;
          default:
            this.type = "DoublePoints"
        }
      }
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
