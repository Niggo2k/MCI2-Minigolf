import { distance } from "./graphics.mjs";

export function collisionDetection() {

    function steigung(x1, y1, x2, y2) {
        let y = (y2 - y1);
        if (y == 0) { return 0; }
        return (x2 - x1) / y;
    }
    function yachsenabschnitt(x, y, m) {
        return y - (m * x)
    }
    function steigungderneuengerade(m1) {
        return m1 > 0 ? (1 / m1) : (-1 / m1);
    }
    function schnittpunktGerade(m1, m2, b1, b2) {
        let x = (b2 - b1) / (m1 - m2);
        let y = m1 * x + b1;
        return { x, y }
    }
    function isColliding(x1, y1, x2, y2, bx, by, rad) {

        //gerade mit länge 0
        if (x1 == x2 && y1 == y2) {
            return [0, false];
        }

        //senkrechte gerade
        else if (x1 == x2) {
            let dist = distance(x1, 0, bx, 0);
            //console.log(x1)
            if (dist < rad && by > y1 && by < y2) {
                return ['senkrecht', true];
            }
            return ['senkrecht', false];
        }

        //waagerechte gerade
        else if (y1 == y2) {
            let dist = distance(0, y1, 0, by);
            //console.log(x1)
            if (dist < rad && bx > x1 && bx < x2) {
                return ['waagerecht', true];
            }
            return ['waagerecht', false];
        }

        else {

            let m1 = steigung(x1, y1, x2, y2);
            let b1 = yachsenabschnitt(x1, y1, m1);
            let m2 = steigungderneuengerade(m1);
            let b2 = yachsenabschnitt(bx, by, m2);
            let S1 = schnittpunktGerade(m1, m2, b1, b2);
            let dist = distance(S1.x, S1.y, bx, by);
            //console.log(`m1: ${m1} b1: ${b1} m2: ${m1} b2: ${b1} distance: ${dist}`)
            //console.log(`s1x: ${S1.x} s1y: ${S1.y}`)
            if (dist < rad && bx > x1 && bx < x2) {
                return true;
            }
            return false;
        }





        //m > 0


    }

    return { isColliding };
}