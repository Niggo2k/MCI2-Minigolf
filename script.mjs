import * as L from "./levelmanager.mjs"; 


let level = L.levelmanager();


window.onload = () => {
    window.scrollTo(0, 1);
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function animate() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.resetTransform();
        level.mainLoop();
        window.requestAnimationFrame(animate);
    }
    animate();

    canvas.addEventListener('touchmove', (e) => {
        if (!moved) {
            dy = e.changedTouches[0].pageY - circleSettings.y;
            dx = e.changedTouches[0].pageX - circleSettings.x;
            // Fixed Arrow Size
            circleSettings.vely = Math.sqrt(dy * dy + dx * dx) <= 60 ? circleSettings.y - dy * 2 : (dx >= 0 ? (circleSettings.y - Math.sin(Math.atan(dy / dx)) * 120) : (circleSettings.y + Math.sin(Math.atan(dy / dx)) * 120));
            circleSettings.velx = Math.sqrt(dy * dy + dx * dx) <= 60 ? circleSettings.x - dx * 2 : (dx >= 0 ? (circleSettings.x - Math.cos(Math.atan(dy / dx)) * 120) : (circleSettings.x + Math.cos(Math.atan(dy / dx)) * 120));
            // Outercircle Size
            circleSettings.velocityradius = Math.sqrt(dy * dy + dx * dx) <= 60 ? Math.sqrt(dy * dy + dx * dx) : 60;
        }
    })

    canvas.addEventListener('touchend', (e) => {
        if (e.changedTouches[0]) {
            radians = Math.atan(dy / dx),
                velx = dx >= 0 ? Math.cos(radians) * -5 : Math.cos(radians) * 5,
                vely = dx >= 0 ? Math.sin(radians) * -5 : Math.sin(radians) * 5;
            moved = true;
            circleSettings.velocityradius = 10;
        }
    })

}

