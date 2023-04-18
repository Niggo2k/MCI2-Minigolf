import { drawCircle,distance } from "./graphics.mjs";

export function golfball() {
    let isTouched = false;
    let isMoving = false;
    let ctx = undefined;
    let identifier = undefined;  // kein Touch-Punkt
    let startTouchTime = undefined;

    function draw(ctx, settings) {
        this.ctx = ctx;
        if (isMoving==false) {
            drawCircle(ctx, settings.x , settings.y, settings.velocityradius, "#A8A8A88C", "#000");
            drawArrow(ctx, settings.x, settings.y, settings.velx, settings.vely, 7, 'white');
        }
        drawCircle(ctx, settings.x , settings.y, settings.radius, "#fff", "#000");
    }
    // isInside: bei TouchStart aufgerufen 
    // ti: identifier, tx/ty: Touch-Koodinaten
    function isInside(ctx, ti, tx, ty) {}

    function clicked() {
        isTouched=true;
    }

    function move(ctx, settings) {
        settings.vely = settings.y;
        settings.velx = settings.x;
        isMoving=true;
    }

    // reset: bei TouchEnd aufgerufen;
    // ti: identifier
    function reset() {
        isMoving=false;
    }
    return { draw, isInside, move, clicked, reset };
}


function drawArrow(ctx, fromx, fromy, tox, toy, arrowWidth, color){
    //variables to be used when creating the arrow
    var headlen = 10;
    var angle = Math.atan2(toy-fromy,tox-fromx);
 
    ctx.save();
    ctx.strokeStyle = color;
 
    //starting path of the arrow from the start square to the end square
    //and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineWidth = arrowWidth;
    ctx.stroke();
 
    //starting a new path from the head of the arrow to one of the sides of
    //the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
               toy-headlen*Math.sin(angle-Math.PI/7));
 
    //path from the side point of the arrow, to the other side point
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),
               toy-headlen*Math.sin(angle+Math.PI/7));
 
    //path from the side point back to the tip of the arrow, and then
    //again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
               toy-headlen*Math.sin(angle-Math.PI/7));
 
    //draws the paths created above
    ctx.stroke();
    ctx.restore();
}