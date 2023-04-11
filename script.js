

let drawCircle = (ctx, settings) => {
    ctx.beginPath();
    ctx.arc(settings.x , settings.y, settings.radius, 0, 2 * Math.PI);
    ctx.fill()
}



let canvas,ctx;
let ballSpeed = 5;


let circleSettings = {
    x: 100,
    y: 100,
    radius: 10
}

let animate = () => {
    console.log('Drawing Frame');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.resetTransform();
    drawCircle(ctx, circleSettings);
    window.requestAnimationFrame(animate);
}




window.onload = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');


    animate();
    






    canvas.addEventListener('touchstart', () => { console.log('touchstart') })

    canvas.addEventListener('touchmove', (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            console.log(`move[${i}].pageX = ${e.changedTouches[i].pageX}`);
            console.log(`move[${i}].pageY = ${e.changedTouches[i].pageY}`);
        }
    })

    canvas.addEventListener('touchend', (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            console.log(`touchend[${i}].pageX = ${e.changedTouches[i].pageX}`);
            console.log(`touchend[${i}].pageY = ${e.changedTouches[i].pageY}`);
        }

        circleSettings.x += ballSpeed ;

    })

}

