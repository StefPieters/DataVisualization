import Particle from './classes/Particle.js';
import {random} from './functions/lib.js';
import Vector from './classes/Vector.js';

 //https://api.genderize.io/?name= API

{
    const $canvas = document.querySelector(`.canvas`);
    const ctx = $canvas.getContext(`2d`);

    let ballsblue = [];
    let ballspink = [];
    let size;
    //const balls2 = [];

    //const place2 = new Vector(200,200);

    let name;

    let color;

    const handleSubmitFilter = e => {
        e.preventDefault();
        ballsblue = [];
        ballspink = [];
        const $search = document.querySelector(`.search`);
        //console.log($search.value);
        getName($search.value);
      };

      const getName = async inputvalue => {
        const response = await fetch(`https://api.genderize.io/?name=${inputvalue}`);
        const names = await response.json();
        name = names;
        showName();
      }
    
    const showName = () =>{
        if (name.gender === "male"){
            color = "#88c6f1"
            document.querySelector("body").style.backgroundColor = "#88c6f1";
        }else{
            color = "pink"
            document.querySelector("body").style.backgroundColor = "pink";
        }

        if(name.count > 200000){
            size = 4;
        }else if(name.count < 200000 && name.count > 100000){
            size = 4;  
        }else if(name.count < 100000 && name.count > 50000){
            size = 6;  
        }else if(name.count < 50000 && name.count > 10000){
            size = 10;
        }else if(name.count < 10000 && name.count > 1000){
            size= 25;
        }else if(name.count < 1000){
            size= 50;
        }else{
            size= 10;
        }
        //console.log(name.count);
        //console.log(Math.round(name.probability*100)/100);
        if(name.count > 0){
            pushBalls();
        }else{
            for (let i = 0; i < 100; i++) {
                ballspink.push(new Particle($canvas, random(0,$canvas.width),random(0,$canvas.height), `red`, size));
            }
        }

        drawBalls();
        
    }

    const countBalls = () =>{
        if(name.count > 200000){
            return 100;
        }else if(name.count < 200000 && name.count > 100000){
            return 70;  
        }else if(name.count < 100000 && name.count > 50000){
            return 50;  
        }else if(name.count < 50000 && name.count > 10000){
            return 30;
        }else if(name.count < 10000 && name.count > 1000){
            return 25;
        }else if(name.count < 1000){
            return 20;
        }else{
            return 10;
        }
    }

    const pushBalls = () =>{
        if(name.gender === "female"){
            for (let i = 0; i < name.count/countBalls(); i++) {
                ballspink.push(new Particle($canvas, random(0,$canvas.width),random(0,$canvas.height), `pink`,size));
            }
            for (let i = 0; i < (name.count*(1-(Math.round(name.probability*100)/100)))/90; i++) {
                ballsblue.push(new Particle($canvas, random(0,$canvas.width),random(0,$canvas.height), `#88c6f1`,size));
            }
        }else if(name.gender ==="male"){
            for (let i = 0; i < name.count/countBalls(); i++) {
                ballsblue.push(new Particle($canvas, random(0,$canvas.width),random(0,$canvas.height), `#88c6f1`,size));
            }
            for (let i = 0; i < (name.count*(1-(Math.round(name.probability*100)/100)))/90; i++) {
                ballspink.push(new Particle($canvas, random(0,$canvas.width),random(0,$canvas.height), `pink`,size));
            }
        }
    }

    const drawBalls = () => {
        ctx.clearRect(0, 0, $canvas.width, $canvas.height);
        ballsblue.forEach(ball => ball.draw());
        ballspink.forEach(ball => ball.draw());
        //balls2.forEach(ball => ball.draw());
        drawText();
        drawProcent();
        requestAnimationFrame(drawBalls);  
       
    }

    const drawText = () => {
        if(name.count > 0){
            ctx.font = "50px arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(`${name.name.toUpperCase()}`, $canvas.width/2, $canvas.height/2-10);
            ctx.font = "20px Calibri";
            //console.log(name.count);
            ctx.fillText(`${name.count} in the database`, $canvas.width/2, $canvas.height/2+15); 
            ctx.font = "15px Calibri";
            //console.log(name.count);
            ctx.fillText(`Chance of being ${name.gender}: ${Math.round(name.probability*100)}%`, $canvas.width/2, $canvas.height/2+40); 
        } else{
            ctx.font = "40px Calibri";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(`No Data found`, $canvas.width/2, $canvas.height/2);
            document.querySelector("body").style.backgroundColor = "red";
       }
    }

    const drawProcent = () =>{
        //console.log(Math.round(name.probability*100)/100);
        //console.log(name.gender);
        if (name.gender === "female"){
        ctx.fillStyle = "#88c6f1";
        ctx.fillRect($canvas.width/2-95,$canvas.height/2+55, 200,15);
        ctx.fillStyle = "pink";
        ctx.fillRect($canvas.width/2-95,$canvas.height/2+55, 200*(Math.round(name.probability*100)/100),15);
        ctx.fillStyle = "black";
        ctx.strokeRect($canvas.width/2-95,$canvas.height/2+55, 200,15);
        }else if(name.gender ==="male"){
        ctx.fillStyle = "pink";
        ctx.fillRect($canvas.width/2-95,$canvas.height/2+55, 200,15);
        ctx.fillStyle = "#88c6f1";
        ctx.fillRect($canvas.width/2-95,$canvas.height/2+55, 200*(Math.round(name.probability*100)/100),15);
        ctx.fillStyle = "black";
        ctx.strokeRect($canvas.width/2-95,$canvas.height/2+55, 200,15);
        }else{
        ctx.fillStyle = "red";
        ctx.fillRect($canvas.width/2-95,$canvas.height/2+20, 200,15);
        ctx.fillStyle = "black";
        ctx.strokeRect($canvas.width/2-95,$canvas.height/2+20, 200,15);
        }
        /*if (name.gender === "female"){
            for (let j = 0; j < Math.round(name.probability*10); j++) {
                ctx.fillStyle = "pink";
                ctx.fillRect($canvas.width/2-95+(j*20),$canvas.height/2+55, 15,15);
                ctx.fillStyle = "black";
                ctx.strokeRect($canvas.width/2-95+(j*20),$canvas.height/2+55, 15,15);
            }
            for (let k = 0; k < 10-Math.round(name.probability*10); k++) {
                ctx.fillStyle = "#88c6f1";
                ctx.fillRect($canvas.width/2-95+(k*20),$canvas.height/2+55, 15,15);
                ctx.fillStyle = "black";
                ctx.strokeRect($canvas.width/2-95+(k*20),$canvas.height/2+55, 15,15);
            }
        }else(name.gender ==="male"){
            for (let o = 0; o < Math.round(name.probability*10); o++) {
                console.log('hey')
                ctx.fillStyle = "#88c6f1";
                ctx.fillRect($canvas.width/2-95+(o*20),$canvas.height/2+55, 15,15);
                ctx.fillStyle = "black";
                ctx.strokeRect($canvas.width/2-95+(o*20),$canvas.height/2+55, 15,15);
            }
            for (let p = 0; p < 10-Math.round(name.probability*10); p++) {
                ctx.fillStyle = "pink";
                ctx.fillRect($canvas.width/2-95+(o*20),$canvas.height/2+55, 15,15);
                ctx.fillStyle = "black";
                ctx.strokeRect($canvas.width/2-95+(o*20),$canvas.height/2+55, 15,15);
            }*/
        
            
     
    }

    const init = () => {

        document.querySelector(`.form-name`).addEventListener(`submit`, handleSubmitFilter);
        
       /* for (let i = 0; i < 100; i++) {
            balls2.push(new Particle($canvas, place2, 200, 200, `#f8e7ee`));
        }*/
        
    };

    init();
}