import { drawCircle, distance } from "./graphics.mjs";

export function hole(x, y, radius) {


    function draw(ctx) {
        drawCircle(ctx, x, y, radius, "#000", "#000");
    }

    function isInside(bx, by) {
        return (distance(x, y, bx, by) < radius);
    }

    return {draw,isInside};



}