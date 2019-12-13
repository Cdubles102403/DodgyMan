//  pick starting value for enemys and return them in array
function picker() {
    var rnd = Math.floor(Math.random() * 4) + 1;
    var rnd2 = Math.floor(Math.random() * 2) + 1;
    var rnd3 = Math.floor(Math.random() * 2) + 1;
    var mult = -1;
    var mult2 = -1;
    
    if(rnd2 == 1 || rnd3 == 1) {
       mult = 1;
    }
    
    //1040, 580
    if (rnd === 1) {
        //top
        var x = Math.floor(Math.random() * 580);
        var y = 0;
        mult2 = 1;
        return [x, y, mult, mult2];
    }
    
    else if (rnd === 2) {
        //left
        var x = 0;
        var y = Math.floor(Math.random() * 1040);
        return [x, y, mult, mult2];
    }
    
    else if(rnd === 3){
        //right
        var x = 1040;
        var y = Math.floor(Math.random() * 580);
        return [x, y, mult, mult2];
   }
    
    else if(rnd === 4){
        //bottom
        var x = Math.floor(Math.random() * 1040);
        var y = 580;
        mult2 = -1;
        return [x, y, mult, mult2];
    }
}

//function for clearing enemys off scren
function clearField(){
    for(var j = 0; j < enemys.length; j++){
        enemys[j].hit();
    }
}


    
//Player class
class Player {
    constructor() {
        this.x = Math.floor(Math.random() * 1000);
        this.y = Math.floor(Math.random() * 500);
        this.size = 30;
        this.pointMult = 1;
        this.speed = 5;
        this.lives = 5;
        this.points = 0;
        this.color =  color('white');
        this.killMode = false;
    }
    
    draw() {
        fill(this.color);
        noStroke();
        circle(this.x, this.y, this.size)
    }
    
    //function for when player hits enemy
    hitEnemy() {
        this.lives--;
    } 
    powerUp(PowerUp){
    this.points +=10;
     switch (PowerUp) {
                case "DoublePoints":
                    this.pointMult = 2;
                    break;
                case "ExtraLife":
                    this.lives+=1;
                    break;
                case "Clear":
                    clearField();
                    break;
                case "KillMode":
                    this.color = color('red');
                    this.killMode = true;
                    break;
                default:
                    console.log("error in powerup player function");
        }
    }
    clearPower(){
        this.pointMult =1;
        this.killMode = false;
    }
    checkDie(){
        if(this.lives<=0){
            //alert("game over");
            gameReset();
        }
    }
}
//enemy class
class Enemy {
    constructor() {
      this.values = picker();
      this.x = this.values[0];
      this.y = this.values[1];
      this.mult = this.values[2];
      this.mult2 = this.values[3];

      this.speed = Math.floor((Math.random() * 9) + 7);
        this.size = 10;
    }
    
    move() {
   //     console.log(this.mult+ this.mult2);
        this.x += 3 * this.mult;
        this.y += 3 * this.mult2;
        fill('hsl(160, 100%, 50%)');
        square(this.x, this.y, this.size, 2);
    }
    
    check() {
        if (this.x > 1050 || this.x < -20 || this.y > 590 || this.y < -20) {
            this.values = picker();
            this.x = this.values[0];
            this.y = this.values[1];
            this.mult = this.values[2];
            this.mult2 = this.values[3];
            this.speed = Math.floor((Math.random() * 9) + 7);
        }

    }

    //check for collisions with player
    collision(x, y, size) {
        var hit = false;
        hit = collideRectCircle(this.x, this.y, this.size, this.size, x, y, size);
        return hit;
        if (hit) {
            console.log("hit");
        }
    }
    hit(){
            this.values = picker();
            this.x = this.values[0];
            this.y = this.values[1];
            this.mult = this.values[2];
            this.mult2 = this.values[3];
            this.speed = Math.floor((Math.random() * 9) + 7);
    }

}

//powerUp class
class Powerup {
    constructor() {
        this.x = Math.floor(Math.random() * 1000);
        this.color;
        this.y = Math.floor(Math.random() * 500);
        this.type = "string";
        this.powerUp = Math.floor(Math.random() * 4) + 1;
        this.hitTime = 10;
        this.used= false;
        this.powerHit = false;

    }
    //set powerup type for powerup
    chooser() {
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
                case 4:
                    this.type = "KillMode"
                    break;
                default:
                    this.type = "DoublePoints"
        }
    }
    //draw power up
    draw() {
        if(time-10 >= this.hitTime  && this.powerHit){
        this.powerHit =false;
        this.hitTime  = frameCount / 60;
        this.x = Math.floor(Math.random() * 1000);
        this.y = Math.floor(Math.random() * 500);
        Player.clearPower();
        Player.color = color('white');
            }
        var x = this.x;
        var y = this.y;
        fill('rgb(0,255,0)');
        triangle(x, y, x + 20, y + 20, x - 20, y + 20);
        
    }
    //move poweup when hit
    hit(){
        this.powerHit = true;
        this.HitTime = frameCount / 60;
        console.log(this.HitTime);
        console.log(time);
        this.x = 1000;
        this.y = 1000;
        this.powerUp = Math.floor(Math.random() * 4) + 1;
        this.chooser();

    }

}

function setup() {
    createCanvas(1040, 580);
    background('black');
    enemys = [];
    Player = new Player();
    PU = new Powerup();
    for (var i = 0; i < 20; i++) {
        enemys[i] = new Enemy();
    }
}
var time;
var hits = false;
var poly = [];
function draw() {
    console.log(Player.points);
    document.getElementById("score").innerHTML = "score is: " + Player.points;
    document.getElementById("lives").innerHTML = "lives: " + Player.lives;

    time = frameCount / 60; // gets how many seconds the game has been running
    background('black'); // "clears" canvas
    PU.draw();
    
    //moves enemys around
    for (var j = 0; j < enemys.length; j++) {
        enemys[j].move();
        enemys[j].check();        
        hits = enemys[j].collision(Player.x, Player.y, Player.size);//checks for player - enemy collision
        if (hits) {
            //console.log("system works");
            //if player has kill mode on 
            if(Player.killMode){
                enemys[j].hit();
                Player.points+=5;
               }
            else{Player.hitEnemy();
                enemys[j].hit();
                }
        }
    }
    
    
    //player collision with power up
    poly[0] = createVector(PU.x, PU.y); //fills array with points of powerup
    poly[1] = createVector(PU.x+20, PU.y+20);
    poly[2] = createVector(PU.x-20, PU.y+20);
    hit = collideCirclePoly(Player.x,Player.y,Player.size,poly,false); //checks if power up and player are colliding 
    //if player hits powerup
    if(hit){
       console.log(PU.type);    
        Player.powerUp(PU.type);
        PU.hit();
      }

    //player controls
    //up
    if (keyIsDown(38)) {
        Player.y -= Player.speed;
    }
    
    //down
    if (keyIsDown(40)) {
        Player.y += Player.speed;
    }
    
    //left
    if (keyIsDown(37)) {
        Player.x -= Player.speed;
    }
    
    //right
    if (keyIsDown(39)) {
        Player.x += Player.speed;
    }
    Player.draw();
    Player.checkDie();
}

function gameReset(){ //called after player dies
    Player.points=0;
    Player.lives = 5;
    for(var j = 0; j < enemys.length; j++){
        enemys[j].hit();
    }
}