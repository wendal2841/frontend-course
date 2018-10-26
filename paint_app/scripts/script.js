window.onload = function() {
    init();
};

let fillColor = 'black';

function init() {
    const canvas = document.getElementById('canvas1');
    addEventListeners(canvas);
}

function addEventListeners(canvas) {
    canvas.addEventListener('mousemove', mouserMoveHandler);

}

function mouserMoveHandler(event){
    const canvas = event.target;
    if(canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.fillStyle = changeColor();
        ctx.fillStyle = fillColor;
        ctx.fillRect(event.offsetX-20, event.offsetY-20, 10, 10)
    }
}

function changeColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for(var i=0; i<6; i++){
        color += letters[Math.floor(Math.random() * 16)]
    }
    // return color;
    fillColor = color;
}