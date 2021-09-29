import Particle from './classes/Particle.js';
import {random} from './functions/lib.js';
import Vector from './classes/Vector.js';


{
    const $canvas = document.querySelector(`.canvas`);
    const ctx = $canvas.getContext(`2d`);

    const balls = [];
    const balls2 = [];
    const balls3 = [];
    const balls4 = [];
    const balls5 = [];
    const place1 = new Vector(100,100);
    const place2 = new Vector(200,200);
    const place3 = new Vector(300,300);
    const place4 = new Vector(400,400);
    const place5 = new Vector(500,500);


    const drawBalls = () => {
        ctx.clearRect(0, 0, $canvas.width, $canvas.height);
        balls.forEach(ball => ball.draw());
        balls2.forEach(ball => ball.draw());
        balls3.forEach(ball => ball.draw());
        balls4.forEach(ball => ball.draw());
        balls5.forEach(ball => ball.draw());
        requestAnimationFrame(drawBalls);
        ctx.font = "20px Calibri";
        ctx.fillText("Hello World", 10, 50);
    }

    const init = () => {
        
        for (let i = 0; i < 100; i++) {
            balls.push(new Particle($canvas, place1, 100, 100, `#ff0000`));
        }
        for (let i = 0; i < 100; i++) {
            balls2.push(new Particle($canvas, place2, 200, 200, `#f8e7ee`));
        }
        for (let i = 0; i < 100; i++) {
            balls3.push(new Particle($canvas, place3, 300, 300, `#ff8e00`));
        }
        for (let i = 0; i < 100; i++) {
            balls4.push(new Particle($canvas, place4, 400, 400, `#0000ff`));
        }
        for (let i = 0; i < 100; i++) {
            balls4.push(new Particle($canvas, place5, 500, 500, `#0243ff`));
        }

        drawBalls();
 

    };

    init();
}