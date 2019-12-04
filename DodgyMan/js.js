//player class
//player class
class Player{
    constructor(){
        this.x=Math.floor(Math.random() * 1000);
        this.y= Math.floor(Math.random() * 500);
        this.hasPowerUp = false;
        this.size = 30;
        this.speed = 5;
    }
    draw(){

        circle(this.x,this.y,this.size)
    }
}

//enemy class
class Enemy{
    constructor(){
       this.x = Math.floor(Math.random() * 1000);
       this.y = Math.floor(Math.random() * 500);
        this.speed=5;
        this.size=20;
    }
    move(){
        this.x+=this.speed;
        this.y+=1;
        square(this.x, this.y, this.size, 2);
    }
    remake(){
        
    }
    
}
//powerUp class
class Powerup{
    constructor(){
        this.x=30;
        this.color;
        this.y=30;
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
    draw(){
        var x = this.x;
         var y = this.y;
        triangle(x, y, x+20, y+20, x-20, y+20);
    }
    
}

function setup() {
    createCanvas(1040, 580);
    background('teals');
     enemys = [];
    Player = new Player();
    enemy = new Enemy();
    PU = new Powerup();
    for(var i=0;i<50;i++){
        enemys[i] = new Enemy();
    }
    
}
    
function draw() {
    background('teal'); // "clears" canvas
    enemy.move(); 
    PU.draw();
    console.log(enemys[2])
    for(var j = 0; j<enemys.length; j++){
        enemys[j].move();
    }
    //player controls
    //up
        if(keyIsDown (38 )){
       Player.y -=Player.speed;
       }
    //down
     if(keyIsDown (40 )){
            Player.y += Player.speed;
       }
    //left
     if(keyIsDown (37 )){
        Player.x -= Player.speed;
      }
    //right
     if(keyIsDown (39 ) ){
        Player.x += Player.speed;
    }
Player.draw();

}