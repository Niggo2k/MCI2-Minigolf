import * as G from "./js/ball.mjs";
import * as H from "./js/hole.mjs";
import * as S from "./js/stats.mjs";
import * as CS from "./js/collisionDetection.js";


let mapvertlen= 335

let levelSettings = [{
    bx: 50,
    by: 150,
    velx: 50,
    vely: 150,
    hx: 350,
    hy: 700,
    radius: 20,
    velocityradius: 20,
    
    mapLines: [
        //Map Border
        { start: { x: 20, y: 100 }, end: { x:750, y: 100 } },
        { start: { x: 20, y: 100 }, end: { x: 20, y: 750 } },
        { start: { x: 750, y: 100 }, end: { x: 750, y: 750 } },
        { start: { x: 20, y: 750 }, end: { x: 750, y: 750 } },

        { start: { x: 20, y: 200 }, end: { x: 450, y: 200 } },
        { start: { x: 250, y: 400 }, end: { x: 750, y: 400 } },

        { start: { x: 20, y: 600 }, end: { x: 450, y: 600 } }

    ]
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
    let ballSpeed = 15;
    let currentLevel = 0;
    let currentSettings = { ...levelSettings[currentLevel] }
    let dx, dy, moving = false, radians, velx, vely, movable;
    let golf = G.golfball();
    let hole = H.hole(getSettings().radius);
    let stats = S.stats();
    let col = CS.collisionDetection(ctx);

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

    function drawLine(fromx, fromy, tox, toy, lineWidth = 1.0) {
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.stroke();
        ctx.restore();
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

        for (let i = 0; i < getSettings().mapLines.length; i++) {
            let line = getSettings().mapLines[i];
            drawLine(line.start.x, line.start.y, line.end.x, line.end.y,3);
            let colinfo = col.isColliding(line.start.x, line.start.y, line.end.x, line.end.y, getSettings().bx, getSettings().by, getSettings().radius)
            if (colinfo[1] == true) {
                switch (colinfo[0]) {
                    case 0: break; //impossible
                    case 'senkrecht': velx *= -1; break;
                    case 'waagerecht': vely *= -1; break;
                    default: velx *= -1;
                }
            }
        }


        golf.draw(ctx, getSettings());
        hole.draw(ctx, getSettings().hx, getSettings().hy);
    }

    function singleTouchMove(x, y) {
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
            let t = dx >= 0 ? ballSpeed * -1 : ballSpeed;
            radians = Math.atan(dy / dx),
                velx = Math.cos(radians) * t;
            vely = Math.sin(radians) * t;
            moving = true;
            getSettings().velocityradius = 10;
            stats.incrementStrokes();
        }
    }



    return { mainLoop, singleTouchMove, touchEnd, retryLevel, nextLevel };
}