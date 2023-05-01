import { distance } from "./graphics.mjs";

export function collisionDetection(ctx) {

    function steigung(x1, y1, x2, y2) {
        let dy = (y2 - y1);
        let dx = (x2 - x1);
        if (dx == 0) { return 0; }
        return   dy/dx;
    }
    function yachsenabschnitt(x, y, m) {
        return y - (m * x)
    }
    function steigungderneuengerade(m1) {
        return (-1 / m1);
    }
    function schnittpunktGerade(m1, m2, b1, b2) {
        let x = (b2 - b1) / (m1 - m2);
        let y = m1 * x + b1;
        return { x, y }
    }

    function drawLine(fromx, fromy, tox, toy) {
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.stroke();
        ctx.strokeStyle = 'black';
    }

    function isColliding(x1, y1, x2, y2, bx, by, rad) {
        //gerade mit länge 0
        if (x1 == x2 && y1 == y2) {
            return [0, false];
        }

        //senkrechte gerade
        else if (x1 == x2) {
            let dist = distance(x1, 0, bx, 0);
            if (dist < rad && by > y1 && by < y2) {
                return ['senkrecht', true];
            }
            return ['senkrecht', false];
        }

        //waagerechte gerade
        else if (y1 == y2) {
            let dist = distance(0, y1, 0, by);
            if (dist < rad && bx > x1 && bx < x2) {
                return ['waagerecht', true];
            }
            return ['waagerecht', false];
        }

        //not working
        else {
            let m1 = steigung(x1, y1, x2, y2);
            let b1 = yachsenabschnitt(x1, y1, m1);
            let m2 = steigungderneuengerade(m1);
            let b2 = yachsenabschnitt(bx, by, m2);
            let S1 = schnittpunktGerade(m1, m2, b1, b2);
            let dist = distance(S1.x, S1.y, bx, by);
            drawLine(S1.x,S1.y,bx,by)
            if (dist < rad && (bx)>x1 && (bx)<x2) {
                return ['test', true];
            }
            return ['test', false];
        }
    }
    return { isColliding };
}