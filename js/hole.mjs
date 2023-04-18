import { drawCircle, distance } from "./graphics.mjs";

export function hole(radius) {

    function draw(ctx, x, y) {
        drawCircle(ctx, x, y, radius, "#000", "#000");
    }

    function isInside(x,y,bx, by) {
        return (distance(x, y, bx, by) < radius);
    }

    return { draw, isInside };



}