import * as L from "./levelmanager.mjs";

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let gameOverlay = document.getElementById('game-overlay');
    let ctx = canvas.getContext('2d');
    let level = L.levelmanager(ctx);
    let fingerup = true;
    let canvasClass = 0;
    canvas.width = 800;
    canvas.height = window.innerHeight-20;

    function animate() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.resetTransform();
        level.mainLoop(ctx);
        window.requestAnimationFrame(animate);
    }
    animate();

    canvas.addEventListener('touchmove', (e) => {
        if (e.changedTouches[0]&&!e.changedTouches[1]&&!e.changedTouches[2]) {
            level.touchMove(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
        } else if (e.changedTouches[0]&&e.changedTouches[1]&&!e.changedTouches[2]) {
            level.MoveField(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
        } else if (e.changedTouches[0]&&e.changedTouches[1]&&e.changedTouches[2] && fingerup) {
            canvas?.classList.remove(`bg-${canvasClass}`);
            canvas?.classList.add(`bg-${canvasClass>0 ? canvasClass=0 : canvasClass=1}`);
            fingerup = false;
        }
    })

    canvas.addEventListener('touchend', (e) => {
        if (e.changedTouches[0]&&!e.changedTouches[1]&&!e.changedTouches[2]) {
            level.touchEnd(e.changedTouches[0])
        }
        fingerup = true;
    })

    document.getElementById('next-level-button').addEventListener('click', (e) => {
        level.nextLevel();
        gameOverlay.classList.remove('show')
    })

    document.getElementById('retry-button').addEventListener('click', (e) => {
        level.restartLevel();
        gameOverlay.classList.remove('show')
    })
}

