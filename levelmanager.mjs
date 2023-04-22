import * as G from "./js/ball.mjs";
import * as H from "./js/hole.mjs";
import * as S from "./js/stats.mjs";

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
    let currentLevel = 0;
    let currentSettings = { ...levelSettings[currentLevel] }
    let dx, dy, moving = false, radians, velx, vely, movable;
    let golf = G.golfball();
    let hole = H.hole(getSettings().radius);
    let stats = S.stats();

    function getSettings() {
        return currentSettings;
    }

    function retryLevel() {
        currentSettings = { ...levelSettings[currentLevel] };
        stats.resetStrokes();
    }

    function nextLevel() {
        currentLevel++;
        currentSettings = { ...levelSettings[currentLevel] };
        stats.resetStrokes();
    }


    function mainLoop(ctx) {
        if (moving) {
            if (hole.isInside(getSettings().hx, getSettings().hy, getSettings().bx, getSettings().by)) {
                let gameOverlay = document.getElementById('game-overlay');
                gameOverlay.querySelector('H2').innerHTML = `Level ${currentLevel + 1} completed!`;
                gameOverlay.classList.add('show');
                moving = false;
            }

            // Zeigt Controls wieder an -> funktioniert noch nicht ganz
            if (Math.round(velx) == 0 && Math.round(vely) == 0) {
                console.log("0");
                moving = false;
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
            movable = false;
        } else {
            golf.reset();
        }

        golf.draw(ctx, getSettings());
        hole.draw(ctx, getSettings().hx, getSettings().hy);
    }

    function touchMove(x, y) {

        if (!moving) {
            dy = y - getSettings().by;
            dx = x - getSettings().bx;
            // Fixed Arrow Size
            getSettings().vely = Math.sqrt(dy ** 2 + dx ** 2) <= 60 ? getSettings().by - dy * 2 : (dx >= 0 ? (getSettings().by - Math.sin(Math.atan(dy / dx)) * 120) : (getSettings().by + Math.sin(Math.atan(dy / dx)) * 120));
            getSettings().velx = Math.sqrt(dy ** 2 + dx ** 2) <= 60 ? getSettings().bx - dx * 2 : (dx >= 0 ? (getSettings().bx - Math.cos(Math.atan(dy / dx)) * 120) : (getSettings().bx + Math.cos(Math.atan(dy / dx)) * 120));
            // Outercircle Size
            getSettings().velocityradius = Math.sqrt(dy ** 2 + dx ** 2) <= 60 ? Math.sqrt(dy ** 2 + dx ** 2) : 60;
            movable = true;
        }
    }

    function touchEnd(touchReleased) {
        if (touchReleased && movable) {
            let t = dx >= 0 ? -5 : 5;
            radians = Math.atan(dy / dx),
            velx = Math.cos(radians) * t;
            vely = Math.sin(radians) * t;
            moving = true;
            getSettings().velocityradius = 10;
            stats.incrementStrokes();
        }
    }



    return { mainLoop, touchMove, touchEnd, retryLevel, nextLevel };
}