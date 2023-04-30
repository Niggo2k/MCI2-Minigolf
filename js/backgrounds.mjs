export function backgrounds() {
    let currentimage = 0;
    let images = [
        './backgrounds/grass.png',
        './backgrounds/dirt1.png',
        './backgrounds/grass2.png'
    ]

    function setNextBackgroundOn(element) {
        if(images[currentimage+1]){
        currentimage++;
        }else{
            currentimage=0;
        }
        setCurrentBackgroundOn(element);
    }
    function setCurrentBackgroundOn(element) {
        element.style.backgroundImage = `url('${getCurrentbackground()}')`;
    }
    function getCurrentbackground() {
        return images[currentimage];
    }

    return { setCurrentBackgroundOn, setNextBackgroundOn };
}