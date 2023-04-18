import * as G from "./js/ball.mjs";
import * as H from "./js/hole.mjs";

let levelSettings = [{
    bx: 200,
    by: 500,
    velx: 200,
    vely: 500,
    hx: 100,
    hy: 100,
    radius: 20,
    velocityradius: 20

},
{
    bx: 200,
    by: 500,
    velx: 200,
    vely: 500,
    hx: 100,
    hy: 100,
    radius: 20,
    velocityradius: 20
}]


export function levelmanager() {
    let dx, dy, moved, radians, velx, vely;
    let currentLevel = 0;
    let golf = G.golfball();
    let hole = H.hole(getSettings().hx,getSettings().hy, 100, getSettings().radius);




    function getSettings() {
        return levelSettings[currentLevel];
    }

    function mainLoop() {

        if (moved) {

            hole.isInside(getSettings().bx, getSettings().by);

            // Zeigt Controls wieder an -> funktioniert noch nicht ganz
            if (Math.round(velx) == 0 && Math.round(vely) == 0) {

                console.log("0");
                moved = false;
            }
            if (getSettings().by + vely > canvas.height || getSettings().by + vely < 0) {
                vely *= -1;
            }
            if (getSettings().bx + velx > canvas.width || getSettings().bx + velx < 0) {
                velx *= -1;
            }
            velx = velx - (velx * 0.008);
            vely = vely - (vely * 0.008);
            getSettings().bx += velx;
            getSettings().by += vely;
            golf.move(ctx, getSettings());
        } else {
            golf.reset();
        }


        golf.draw(ctx, getSettings());
        hole.draw(ctx);
    }

    return { mainLoop };



}