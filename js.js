//  pick starting value for enemys and return them in array
function picker() {


    var rnd = Math.floor(Math.random() * 4) + 1;
    var rnd2 = Math.floor(Math.random() * 2) + 1;
    var rnd3 = Math.floor(Math.random() * 2) + 1;
    var mult = -1;
    var mult2 = -1;
    if(rnd2 == 1) {
       mult = 1;
    }
    if(rnd3 == 1){
       mult = 1;
       }
    //1040, 580
    if (rnd === 1) {
        //top
        var x = Math.floor(Math.random() * 580);
        var y = 0;
        mult2 = 1;
        return [x, y, mult, mult2];
    } else if (rnd === 2) {
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
//Player class
class Player {
    constructor() {
        this.x = Math.floor(Math.random() * 1000);
        this.y = Math.floor(Math.random() * 500);
        this.hasPowerUp = false;
        this.size = 30;
        this.speed = 5;
        this.lives = 3;
    }
    draw() {
        circle(this.x, this.y, this.size)
    }
    //function for when player hits enemy
    hitEnemy() {
        this.lives--;
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
}

//powerUp class
class Powerup {
    constructor() {
        this.x = 30;
        this.color;
        this.y = 30;
        this.type = "string";
        this.picked = false;
        this.isUsed = false;
        this.powerUp = Math.floor(Math.random() * 4) + 1;

    }
    //set powerup type for powerup
    chooser() {
        if (!this.isUsed) {
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
    draw() {
        var x = this.x;
        var y = this.y;
        triangle(x, y, x + 20, y + 20, x - 20, y + 20);
    }

}

function setup() {
    createCanvas(1040, 580);
    background('teals');
    enemys = [];
    Player = new Player();
    PU = new Powerup();
    for (var i = 0; i < 30; i++) {
        enemys[i] = new Enemy();
    }

}
var hits = false;

function draw() {
    background('teal'); // "clears" canvas
    PU.draw();
    //console.log(enemys[2])
    for (var j = 0; j < enemys.length; j++) {
        enemys[j].move();
        enemys[j].check();
        //checks for player - enemy collision
        hits = enemys[j].collision(Player.x, Player.y, Player.size);
        if (hits) {
            console.log("system works");
            Player.hitEnemy();
        }
    }
    //player collision with power up
    if(){
       
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
}