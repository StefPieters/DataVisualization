import Vector from './Vector.js';
import {random} from '../functions/lib.js';

class Particle{
    constructor($canvas, x, y, color, size){
    this.$canvas = $canvas;
    this.ctx = $canvas.getContext('2d');
    this.color = color;
    this.size = size;

    // this.velocityX = 1;
    // this.velocityY = 1.3;
    // this.x = x;
    // this.y = y;

    this.location = new Vector(x,y);
    this.velocity = new Vector(1, 1);
    }
    

    draw(){
    
    this.location.add(this.velocity); //add a velocity to current location
    this.checkCollision(); //check if it hits the border
    //console.log(this.velocity);
    //console.log(this.location);
    //draws circle
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.location.x,this.location.y,this.size,0,Math.PI*2)
    this.ctx.fill();
    this.ctx.closePath();

    }
//changing the this.x to this.location.x (also this.y) and the this.velocityX to this.velocity.x because we added the vector    
    checkCollision(){
        if (this.location.x > this.$canvas.width) {
            this.location.x = 0;
        }
        if (this.location.x < 0) {
            this.location.x = this.$canvas.width;
        }

        if (this.location.y > this.$canvas.height) {
            this.location.y = 0;
        }
        if (this.location.y < 0) {
            this.location.y = this.$canvas.height;
        }
    }

    }

    

    export default Particle;