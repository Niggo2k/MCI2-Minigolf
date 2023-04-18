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
    by: 200,
    velx: 200,
    vely: 200,
    hx: 500,
    hy: 500,
    radius: 20,
    velocityradius: 20
}]


export function levelmanager(ctx) {
    let dx, dy, moved, radians, velx, vely;
    let currentLevel = 0;
    let golf = G.golfball();
    let hole = H.hole(getSettings().radius);

    function getSettings() {
        return levelSettings[currentLevel];
    }

    function nextLevel() {
        currentLevel++;
    }


    function mainLoop(ctx) {
        if (moved) {

            if (hole.isInside(getSettings().hx,getSettings().hy, getSettings().bx, getSettings().by)) {
                let gameOverlay = document.getElementById('game-overlay');


                gameOverlay.querySelector('H2').innerHTML = `Level ${currentLevel + 1} completed!`;
                gameOverlay.classList.add('show');

                moved = false;
            }

            // Zeigt Controls wieder an -> funktioniert noch nicht ganz
            if (Math.round(velx) == 0 && Math.round(vely) == 0) {

                console.log("0");
                moved = false;
            }
            if (getSettings().by + vely > ctx.canvas.height || getSettings().by + vely < 0) {
                vely *= -1;
            }
            if (getSettings().bx + velx > ctx.canvas.width || getSettings().bx + velx < 0) {
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
        hole.draw(ctx, getSettings().hx, getSettings().hy);
    }

    function touchMove(x, y) {

        if (!moved) {
            dy = y - getSettings().by;
            dx = x - getSettings().bx;
            // Fixed Arrow Size
            getSettings().vely = Math.sqrt(dy * dy + dx * dx) <= 60 ? getSettings().by - dy * 2 : (dx >= 0 ? (getSettings().by - Math.sin(Math.atan(dy / dx)) * 120) : (getSettings().by + Math.sin(Math.atan(dy / dx)) * 120));
            getSettings().velx = Math.sqrt(dy * dy + dx * dx) <= 60 ? getSettings().bx - dx * 2 : (dx >= 0 ? (getSettings().bx - Math.cos(Math.atan(dy / dx)) * 120) : (getSettings().bx + Math.cos(Math.atan(dy / dx)) * 120));
            // Outercircle Size
            getSettings().velocityradius = Math.sqrt(dy * dy + dx * dx) <= 60 ? Math.sqrt(dy * dy + dx * dx) : 60;
        }
    }

    function touchEnd(touchReleased) {
        if (touchReleased) {
            radians = Math.atan(dy / dx),
                velx = dx >= 0 ? Math.cos(radians) * -5 : Math.cos(radians) * 5,
                vely = dx >= 0 ? Math.sin(radians) * -5 : Math.sin(radians) * 5;
            moved = true;
            getSettings().velocityradius = 10;
        }
    }



    return { mainLoop, touchMove, touchEnd, nextLevel };
}