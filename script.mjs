import * as G from "./js/ball.mjs";

let canvas, ctx, dx, dy, moved, radians, velx, vely;
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
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.resetTransform();
        if (moved) {
            // Zeigt Controls wieder an -> funktioniert noch nicht ganz
            if (parseFloat(velx).toFixed(1) == parseFloat("0").toFixed(1) && parseFloat(vely).toFixed(1) == parseFloat("0").toFixed(1)) {
                console.log("0");
                moved=false;
                golf.reset();
            }
            if (circleSettings.y + vely > canvas.height || circleSettings.y + vely < 0) {
                vely *= -1;
            }
            if (circleSettings.x + velx > canvas.width || circleSettings.x + velx < 0) {
                velx *= -1;
            }
            velx = velx-(velx*0.008);
            vely = vely-(vely*0.008);
            circleSettings.x += velx;
            circleSettings.y += vely;
            golf.move(ctx, circleSettings);
        }
        golf.draw(ctx, circleSettings);
        window.requestAnimationFrame(animate);
    }
    animate();

    canvas.addEventListener('touchmove', (e) => {
        //
        dy = e.changedTouches[0].pageY-circleSettings.y;
        dx = e.changedTouches[0].pageX-circleSettings.x;
        // Fixed Arrow Size
        circleSettings.vely = Math.sqrt(dy*dy+dx*dx)<=60 ? circleSettings.y - dy*2 : ( dx>=0 ? (circleSettings.y - Math.sin( Math.atan(dy/dx) )*120) : (circleSettings.y + Math.sin( Math.atan(dy/dx) )*120));
        circleSettings.velx = Math.sqrt(dy*dy+dx*dx)<=60 ? circleSettings.x - dx*2 : ( dx>=0 ? (circleSettings.x - Math.cos( Math.atan(dy/dx) )*120) : (circleSettings.x + Math.cos( Math.atan(dy/dx) )*120));
        // Outercircle Size
        circleSettings.velocityradius = Math.sqrt(dy*dy+dx*dx)<=60 ? Math.sqrt(dy*dy+dx*dx) : 60;
    })

    canvas.addEventListener('touchend', (e) => {
        if (e.changedTouches[0]) {
            radians = Math.atan(dy/dx),
            velx = dx>=0 ? Math.cos(radians) * -2 : Math.cos(radians) * 2,
            vely = dx>=0 ? Math.sin(radians) * -2 : Math.sin(radians) * 2;
            moved=true;
            circleSettings.velocityradius = 10;
        }
    })

}

