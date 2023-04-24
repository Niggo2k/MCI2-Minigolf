import * as G from "./js/ball.mjs";
import * as H from "./js/hole.mjs";

let levelSettings = [
{
    bx: 150,
    by: 800,
    velx: 150,
    vely: 800,
    hx: 1000,
    hy: 600,
    radius: 40,
    velocityradius: 40,
    objects:[
        { x:400, y: 0, w: 75, h: 400},
        { x:400, y: 800, w: 75, h: 400},
        { x:700, y: 400, w: 75, h: 400}
    ]
},
{
    bx: 200,
    by: 200,
    velx: 200,
    vely: 200,
    hx: 1250,
    hy: 600-20+250/2,
    radius: 40,
    velocityradius: 40,
    objects:[
        { x:500, y: 0, w: 75, h: 400},
        { x:1000, y: 850, w: 600, h: 75},
        { x:1000, y: 600, w: 75, h: 325},
        { x:400, y: 1000-75/2, w: 400, h: 75},
        { x:400, y: 800, w: 75, h: 400},
        { x:700, y: 400, w: 75, h: 350},
        { x:700, y: 400-75/2, w: 400, h: 75},
    ]
}
]

export function levelmanager(ctx) {
    let dx, dy, radians, velx, vely, moved=false;
    let currentLevel = 1;
    let tries = 0;
    let golf = G.golfball();
    let hole = H.hole(getSettings().radius);

    function getSettings() {
        return levelSettings[currentLevel];
    }

    function nextLevel() {
        currentLevel+1>levelSettings.length ? levelSettings.length : currentLevel++;
    }

    function restartLevel() {
       currentLevel++;
    }

    function mainLoop(ctx) {
        if (moved) {
            ctx.canvas.style.backgroundPositionX = -getSettings().bx*1.18 + "px";
/*
            if (hole.isInside(getSettings().hx - getSettings().bx,getSettings().hy, getSettings().bx, getSettings().by)) {
                let gameOverlay = document.getElementById('game-overlay');
                gameOverlay.querySelector('h2').innerHTML = `Level ${currentLevel + 1} completed!`;
                gameOverlay.querySelector('h3').innerHTML = `You had ${tries + 1} tries!`;
                gameOverlay.classList.add('show');
                getSettings().radius=15;
                getSettings().bx=getSettings().hx;
                getSettings().by=getSettings().hy;
                moved = false;
            }*/
            // Zeigt Controls wieder an -> funktioniert noch nicht ganz
            if (Math.round(velx) == 0 && Math.round(vely) == 0) {
                console.log("0");
                moved = false;
            }
            // y
            // ^
            // |
            // L->x
            // Objects Collision
            for (const key in getSettings().objects) {
                // Object collision
                // Left Collision
                if ((getSettings().bx + getSettings().radius + velx <= getSettings().objects[key].x - getSettings().bx + 5 
                && getSettings().bx + getSettings().radius + velx >= getSettings().objects[key].x - getSettings().bx - 5) 
                && (getSettings().by + vely >= getSettings().objects[key].y && getSettings().by + vely <= getSettings().objects[key].y + getSettings().objects[key].h)) {
                    //console.log("left");
                    velx *= -1;
                }
                // Right Collision
                if ((getSettings().bx - getSettings().radius + velx <= getSettings().objects[key].x - getSettings().bx + getSettings().objects[key].w + 5 
                && getSettings().bx - getSettings().radius + velx >= getSettings().objects[key].x  + getSettings().objects[key].w - getSettings().bx - 5) 
                && (getSettings().by + vely >= getSettings().objects[key].y && getSettings().by + vely <= getSettings().objects[key].y + getSettings().objects[key].h)) {
                    //console.log("right");
                    velx *= -1;
                }
                // Top Collision
                if ((getSettings().by - getSettings().radius + vely < getSettings().objects[key].y + 5  && getSettings().by - getSettings().radius + vely > getSettings().objects[key].y - 5)  
                && (getSettings().bx - getSettings().radius + velx > getSettings().objects[key].x  - getSettings().bx 
                && getSettings().bx + getSettings().radius + velx < getSettings().objects[key].x - getSettings().bx + getSettings().objects[key].w)) {
                    //console.log("top");
                    vely *= -1;
                }
                // Bottom Collision
                if ((getSettings().by - getSettings().radius + vely < getSettings().objects[key].y + getSettings().objects[key].h + 5
                && getSettings().by + getSettings().radius + vely > getSettings().objects[key].y + getSettings().objects[key].h - 5)
                && (getSettings().bx + getSettings().radius + velx > getSettings().objects[key].x  - getSettings().bx && getSettings().bx + getSettings().radius + velx < getSettings().objects[key].x - getSettings().bx + getSettings().objects[key].w)) {
                    //console.log("bottom");
                    vely *= -1;
                }
            }
            // Wall Collision
            if (getSettings().by + getSettings().radius + vely >= ctx.canvas.height || getSettings().by - getSettings().radius + vely <= 0) {
                vely *= -1;
            }
            if (getSettings().bx + getSettings().radius + velx >= ctx.canvas.width || getSettings().bx - getSettings().radius + velx <= 0) {
                velx *= -1;
            }
            velx = velx - (velx * 0.01);
            vely = vely - (vely * 0.01);
            getSettings().bx += velx;
            getSettings().by += vely;
            golf.move(ctx, getSettings());
        } else {
            golf.reset();
        }

        for (const key in getSettings().objects) {
            ctx.beginPath();
            ctx.fillStyle = "#DDDDDD";
            ctx.strokeStyle = "#DDDDDD";
            ctx.roundRect(getSettings().objects[key].x - getSettings().bx, getSettings().objects[key].y, getSettings().objects[key].w, getSettings().objects[key].h, 15);
            ctx.stroke();
            ctx.fill();
        }
        hole.draw(ctx, getSettings().hx - getSettings().bx, getSettings().hy);
        golf.draw(ctx, getSettings());
    }

    function touchMove(x, y) {
        if (moved===false) {
            dy = y - getSettings().by;
            dx = x - getSettings().bx;
            // Fixed Arrow Size
            getSettings().vely = Math.sqrt(dy * dy + dx * dx) <= 120 ? getSettings().by - dy * 1.5 : (dx >= 0 ? (getSettings().by - Math.sin(Math.atan(dy / dx)) * 180) : (getSettings().by + Math.sin(Math.atan(dy / dx)) * 180));
            getSettings().velx = Math.sqrt(dy * dy + dx * dx) <= 120 ? getSettings().bx - dx * 1.5 : (dx >= 0 ? (getSettings().bx - Math.cos(Math.atan(dy / dx)) * 180) : (getSettings().bx + Math.cos(Math.atan(dy / dx)) * 180));
            // Outercircle Size
            getSettings().velocityradius = Math.sqrt(dy * dy + dx * dx) <= 120 ? Math.sqrt(dy * dy + dx * dx) : 120;
        }
    }
    function MoveField(x, y) {
        if (moved==false) {
            getSettings().bx += 10;
        }
    }

    function touchEnd(touchReleased) {
        if (moved==false) {
            tries++;
            if (touchReleased) {
                radians = Math.atan(dy / dx),
                    velx = dx >= 0 ? Math.cos(radians) * -getSettings().velocityradius/15 : Math.cos(radians) * getSettings().velocityradius/15,
                    vely = dx >= 0 ? Math.sin(radians) * -getSettings().velocityradius/15 : Math.sin(radians) * getSettings().velocityradius/15;
                moved = true;
                getSettings().velocityradius = 10;
            }
        }
    }

    return { mainLoop, touchMove, MoveField, touchEnd, nextLevel, restartLevel };
}