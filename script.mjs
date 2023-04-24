import * as L from "./levelmanager.mjs";
import * as BG from "./backgrounds.mjs";
window.onload = () => {
    let canvas = document.getElementById('canvas');
    let B = BG.backgrounds();
    B.setCurrentBackground(canvas);
    let gameOverlay = document.getElementById('game-overlay');
    let ctx = canvas.getContext('2d');
    let level = L.levelmanager(ctx);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function animate() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.resetTransform();
        level.mainLoop(ctx);
        window.requestAnimationFrame(animate);
    }
    animate();

    let touches = 0;
    canvas.addEventListener('touchstart', (e) => {
        touches++;
    })
    canvas.addEventListener('touchmove', (e) => {
        if (touches == 1) {
            level.singleTouchMove(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
        }
    })
    canvas.addEventListener('touchend', (e) => {
        if (touches == 2) {
            B.setNextBackground(canvas);
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