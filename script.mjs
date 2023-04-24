import * as L from "./levelmanager.mjs";

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let gameOverlay = document.getElementById('game-overlay');
    let ctx = canvas.getContext('2d');
    let level = L.levelmanager(ctx);
    canvas.width = 800;
    canvas.height = window.innerHeight/1.2;

    function animate() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.resetTransform();
        level.mainLoop(ctx);
        window.requestAnimationFrame(animate);
    }
    animate();

    canvas.addEventListener('touchmove', (e) => {
        if (e.changedTouches[0]&&e.changedTouches[1]) {
            level.MoveField(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
        }
        if (e.changedTouches[0]&&!e.changedTouches[1]) {
            level.touchMove(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
        }
    })

    canvas.addEventListener('touchend', (e) => {
        if (e.changedTouches[0]&&!e.changedTouches[1]) {
            level.touchEnd(e.changedTouches[0])
        }
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

