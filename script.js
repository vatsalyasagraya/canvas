const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;   //remove stretching while resizing
canvas.height = window.innerHeight;  //remove stretching while resizing
const particlesArray = [];
let hue =0;

window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;   //remove stretching while resizing
    canvas.height = window.innerHeight;  //remove stretching while resizing    
})


console.log(ctx);


// ctx.fillStyle='white';       
// ctx.fillRect(10,30,150,50)rectangle

// ctx.fillStyle='pink';        
// ctx.strokeStyle='green'; 
// ctx.lineWidth=5;       
// ctx.beginPath();
// ctx.arc(100,100,50,0,Math.PI*2);
// ctx.fill();//for full circle
// ctx.stroke();

//mouse interactivity

const mouse={
    x : undefined,
    y : undefined,
}

canvas.addEventListener('click',function(event){
    mouse.x = event.x;
    // console.log(event);
    mouse.y = event.y;
    // drawCircle();
    for(let i=0;i<100;i++)
        particlesArray.push(new Particle);
})
canvas.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0;i<4;i++)
        particlesArray.push(new Particle);
    // drawCircle();
})

function drawCircle(){
    ctx.fillStyle='pink';
    ctx.beginPath();
    ctx.arc(mouse.x,mouse.y,20,0,Math.PI*2);
    ctx.fill();
}

//animation

class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random()*canvas.width;
        // this.y = Math.random()*canvas.height;
        this.size = Math.random()*15 + 1;   //random number b/w 0 to 6
        this.speedX = Math.random()*3 -1.5; // random no. b/w -1.5 to 1.5
        this.speedY = Math.random()*3 -1.5; // random no. b/w -1.5 to 1.5
        this.color = 'hsl('+hue+',100%,50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size>0.2) this.size-=0.01;
    }
    draw(){
        ctx.fillStyle=this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
}

// function init(){
//     for(let i = 0;i < 100; i++){
//         particlesArray.push(new Particle());

//     }
// }
// init();
// console.log(particlesArray);

function handleParticles(){
    for(let i=0; i<particlesArray.length;i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        for(let j=i;j<particlesArray.length;j++){
            const dx=particlesArray[i].x-particlesArray[j].x
            const dy=particlesArray[i].y-particlesArray[j].y
            const distance = Math.sqrt(dx*dx+dy*dy);
            if(distance<100){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particlesArray[i].x,particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x,particlesArray[j].y);
                ctx.stroke();
            }
        }

        if(particlesArray[i].size<=0.3){
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate(){
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.01)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    hue+=2;
    handleParticles();
    requestAnimationFrame(animate);
}
animate();