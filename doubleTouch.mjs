export function doubleTouch() {
    let touches = [];

    function addTouches(e){
        for(let i=0;i<e.changedTouches.length;i++){
            touches.push(e.changedTouches[i].identifier);
        }
    }

    function removeTouches(e){
        for(let i=0;i<e.changedTouches.length;i++){
            for(let j=0;j<touches.length;j++){
                if(touches[j] == e.changedTouches[i].identifier){
                    touches.splice(j,1);
                }
            }
        }
    }

    function doubleTouchReleased(){
        if(touches.length == 2){
            return true;
        }
        return false;
    }


    return { addTouches,removeTouches,doubleTouchReleased };
}