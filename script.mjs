import * as L from "./levelmanager.mjs";
import * as BG from "./backgrounds.mjs";
import * as DT from "./doubleTouch.mjs";
window.onload = () => {
    let canvas = document.getElementById('canvas');
    canvas.width = 500;
    canvas.height = 800;
    let B = BG.backgrounds();
    let doubleTouch = DT.doubleTouch(); 
    B.setCurrentBackground(canvas);
    let gameOverlay = document.getElementById('game-overlay');
    let ctx = canvas.getContext('2d');
    let level = L.levelmanager(ctx);
    let nextBgBtn = document.getElementById('switchbg-btn');
    let zoomBtn = document.getElementById('zoom-btn');

    let zoom = false;
    let pan = {x:0,y:0}

    function animate() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.resetTransform();
        
        if(zoom){
            ctx.scale(2,2);
            ctx.translate(pan.x,pan.y);
        }
        level.mainLoop(ctx);
        window.requestAnimationFrame(animate);
    }
    animate();

    nextBgBtn.addEventListener('click',()=>{
        B.setNextBackground(canvas);
    })

    let twoFingersMove = false;

    zoomBtn.addEventListener('click',()=>{
        zoom ? zoom=false:zoom=true;
        twoFingersMove = true;
    })

    let touches = 0;
    canvas.addEventListener('touchstart', (e) => {
        doubleTouch.addTouch(e.changedTouches[0]);
        touches++;
    })
    canvas.addEventListener('touchmove', (e) => {
        if (touches == 1) {
            level.singleTouchMove(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
        }
        if(touches==2){
            doubleTouch.setChangedCoord(e.changedTouches[0],pan);
            console.log(pan)
        }
    })
    canvas.addEventListener('touchend', (e) => {
        if (touches == 2) {
            doubleTouch.clearTouches();
            touches = 0;
        }
        if (touches == 1) {
            level.touchEnd(e.changedTouches[0])
            touches = 0;
        }
    })

    document.getElementById('next-level-button').addEventListener('click', (e) => {
        level.nextLevel();
        gameOverlay.classList.remove('show')
    })
    document.getElementById('retry-button').addEventListener('click', (e) => {
        level.retryLevel();
        gameOverlay.classList.remove('show')
    })
}