import * as G from "./js/ball.mjs";

let canvas,ctx;
let dx, dy;
let ballSpeed = 5;
let golf = G.golfball();

let circleSettings = {
    x: 200,
    y: 500,
    radius: 20,
    velocityradius: 20,
    velx: 200,
    vely: 500
}

window.onload = () => {
    window.scrollTo(0,1);
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function animate() {
        //console.log('Drawing Frame');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.resetTransform();
        golf.draw(ctx, circleSettings);
        window.requestAnimationFrame(animate);
    }
    animate();

    canvas.addEventListener('touchstart', (e) => { 
        
     })

    canvas.addEventListener('touchmove', (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (i==0) {
                dy = e.changedTouches[i].pageY-circleSettings.y;
                dx = e.changedTouches[i].pageX-circleSettings.x;
                circleSettings.vely = circleSettings.y - dy*2;
                circleSettings.velx = circleSettings.x - dx*2;
                circleSettings.velocityradius = Math.sqrt(dy*dy+dx*dx)<=60 ? Math.sqrt(dy*dy+dx*dx) : 60;
            }
        }
    })

    canvas.addEventListener('touchend', (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (i==0) {
                golf.move(ctx, circleSettings);
                circleSettings.velocityradius = 10;
            }
        }
    })

}

