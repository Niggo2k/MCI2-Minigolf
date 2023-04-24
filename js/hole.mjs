import { drawCircle, distance } from "./graphics.mjs";

export function hole(radius) {

    function draw(ctx, x, y) {
        var grd = ctx.createRadialGradient(x, y, 32.5, x, y, radius);
        grd.addColorStop(0,"black");
        grd.addColorStop(1,"transparent");
        drawCircle(ctx, x, y, radius, grd, "#000");
    }

    function isInside(x,y,bx, by) {
        return (distance(x, y, bx, by) < radius);
    }

    return { draw, isInside };



}