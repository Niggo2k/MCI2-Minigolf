export function stats() {
    let strokes = 0;

    function resetStrokes(){
        strokes = 0;
        updateHTML();
    }
    function incrementStrokes(){
        strokes++;
        updateHTML();
    }
    function updateHTML(){
        let hudText = `Strokes: ${strokes}`;
        let element = document.getElementById('ball-strokes');
        element.innerHTML = hudText;
    }


    return { resetStrokes,incrementStrokes };
}