window.onload = function() {
    init();
};

let globalColor = 'black';
let globalSize = 25;
let globalFigure = 'square';
let paintingStatus = false;
let mouseDownStatus = false;


function init() {
    globalColor = getLastColor();
    globalSize = getLastSize();
    globalFigure = getLastFigure();
    const canvas = document.getElementById('canvas1');
    addEventListeners(canvas);
}

function addEventListeners(canvas) {
    canvas.addEventListener('mousemove', mouserMoveHandler);
    canvas.addEventListener('click', mouseCLickHandler);
    canvas.addEventListener('mousedown', mouseDownHandler);
    canvas.addEventListener('mouseup', mouseUpHandler);

}

function mouserMoveHandler(event) {
    const canvas = event.target;
    if(canvas && canvas.getContext && paintingStatus) {
        const ctx = canvas.getContext('2d');
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.fillStyle = changeColor();
        ctx.fillStyle = globalColor;
        ctx.fillRect(event.offsetX-(globalSize/4), event.offsetY-(globalSize/4), globalSize/2, globalSize/2)
    }
}

function mouseCLickHandler(event) {
    const canvas = event.target;
    if(canvas && canvas.getContext && mouseDownStatus) {
        drawFigure(canvas);        
    }
}

function mouseDownHandler(event) {
    paintingStatus = true;
    // mouseDownStatus = true;
}

function mouseUpHandler(event) {
    paintingStatus = false;
}

function drawFigure(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = globalColor;
    if(globalFigure === 'square'){
        ctx.fillRect(event.offsetX-(globalSize/2), event.offsetY-(globalSize/2), globalSize, globalSize)
    }
    else if(globalFigure === 'hexagon'){
        let hexagonSize = globalSize/1.5;
        ctx.beginPath();
        ctx.moveTo(event.offsetX + hexagonSize * Math.cos(0), event.offsetY + hexagonSize * Math.sin(0));
        for (let side = 0; side < 7; side++) {
            ctx.lineTo(event.offsetX + hexagonSize * Math.cos(side * 2 * Math.PI / 6), event.offsetY + hexagonSize * Math.sin(side * 2 * Math.PI / 6));
        };
        ctx.fill();
    }
    else if(globalFigure === 'circle'){
        ctx.beginPath();
        ctx.arc(event.offsetX, event.offsetY, globalSize/2, 50, Math.PI*2, true)
        ctx.fill()
    }
}


function getLastColor() {
    let color = (window.localStorage.getItem('color') || globalColor);
    document.getElementById('colorField').value = color;
    return color;
}

function getLastSize() {
    let size = (window.localStorage.getItem('size') || globalSize);
    document.getElementById('size').value = size;
    return size;
}

function getLastFigure() {
    let figure = (window.localStorage.getItem('figure') || globalFigure);
    // document.getElementById('size').value = size;
    return figure;
}

function setColor() {
    let field = document.getElementById('colorField');
    globalColor = field.value;
    window.localStorage.setItem('color', globalColor);
}

function setSize() {
    let field = document.getElementById('size');
    globalSize = field.value;
    window.localStorage.setItem('size', globalSize);
}

function setFigure(figure) {
    globalFigure = figure;
    window.localStorage.setItem('figure', figure);
}

