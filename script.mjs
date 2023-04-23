import * as L from "./levelmanager.mjs";
window.onload = () => {
    let canvas = document.getElementById('canvas');
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

    canvas.addEventListener('touchmove', (e) => {
        console.log(e)
        if(e.touches.length == 1){
            level.singleTouchMove(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
        }
        if(e.touches.length == 2 ){
            level.doubleTouchMove(e.touches[0].pageX, e.touches[0].pageY,e.touches[1].pageX, e.touches[1].pageY)
        }
    })

    canvas.addEventListener('touchend', (e) => {
        level.touchEnd(e.changedTouches[0])
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

