export function doubleTouch() {
    let starttouches = [];
    let changedTouches = [];

    function addTouch(touch) {
        starttouches.push({ id: touch.identifier, x: touch.pageX, y: touch.pageY });
        changedTouches = [...starttouches];
    }

    function setChangedCoord(touch, pan) {
        for (let i = 0; i < starttouches.length; i++) {
            if (starttouches[i].id == touch.identifier) {
                changedTouches[i] = { id: touch.identifier, x: touch.pageX, y: touch.pageY };
            }
        }
        let pantmp = calcMoveAmount();
        pan.x += pantmp.x;
        pan.y += pantmp.y;
        starttouches = [...changedTouches]

    }
    
    function clearTouches() {
        starttouches = changedTouches = [];
    }

    function calcMoveAmount() {
        let dx1 = changedTouches[0].x - starttouches[0].x;
        let dy1 = changedTouches[0].y - starttouches[0].y;

        let dx2 = changedTouches[1].x - starttouches[1].x;
        let dy2 = changedTouches[1].y - starttouches[1].y;

        let moveby = {
            x: (dx1 + dx2) / 2,
            y: (dy1 + dy2) / 2
        };

        return moveby;
    }

    return { addTouch, setChangedCoord, clearTouches };
}