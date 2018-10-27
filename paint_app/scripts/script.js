'use strict';
window.onload = function() {
    init();
};

let globalColor = 'black';
let globalSize = 25;
let globalFigure = 'square';
let isBrushStatus = true;
let paintingStatus = false;


function init() {
    globalColor = getLastColor();
    globalSize = getLastSize();
    globalFigure = getLastFigure();
    isBrushStatus = getLastIsBrushStatus();
    
    const canvas = document.getElementById('canvas1');
    canvas.width = document.getElementById('canvasWrapper').clientWidth;
    canvas.height = document.getElementById('canvasWrapper').clientHeight;

    setColor(globalColor);
    setSize(globalSize);
    setFigure(globalFigure);
    setIsBrushStatus(isBrushStatus);

    addEventListeners(canvas);
}

function getLastColor() {
    return (window.localStorage.getItem('color') || globalColor);
}

function getLastSize() {
    return (window.localStorage.getItem('size') || globalSize);
}

function getLastFigure() {
    return (window.localStorage.getItem('figure') || globalFigure);
}

function getLastIsBrushStatus() {
    let status = (window.localStorage.getItem('isBrushStatus') || isBrushStatus);
    if (status === ('true' || true)) return true
    else return false;
}

function setColor(color) {
    globalColor = color;

    document.getElementById('colorField').value = color;
    
    window.localStorage.setItem('color', color);

    setCurrentColor(color);
}

function setSize(size) {
    globalSize = size;

    document.getElementById('size').value = size;

    window.localStorage.setItem('size', size);
}

function setFigure(figure) {
    globalFigure = figure;

    window.localStorage.setItem('figure', figure);
}

function setIsBrushStatus(status) {
    isBrushStatus = status;

    window.localStorage.setItem('isBrushStatus', status);
}

function changeColor() {
    setColor(document.getElementById('colorField').value);
}

function changeSize() {
    setSize(document.getElementById('size').value)
}

function changeFigure(figure){
    setFigure(figure);
}

function changeIsBrushStatus() {
    let status = (document.getElementById('isBrushStatus').checked);
    if (status) setIsBrushStatus(true)
    else setIsBrushStatus(false)
}

function setCurrentColor(color) {
    document.getElementById('currentColor').style.backgroundColor = color;
}

function setCurrentCoordinates(x, y) {
    document.getElementById('currentX').innerHTML = `x=${x}px`;
    document.getElementById('currentY').innerHTML = `y=${y}px`;
}

function addEventListeners(canvas) {
    canvas.addEventListener('mousemove', mouserMoveHandler);
    canvas.addEventListener('click', mouseCLickHandler);
    canvas.addEventListener('mousedown', mouseDownHandler);
    canvas.addEventListener('mouseup', mouseUpHandler);
}

function mouserMoveHandler(event) {
    const canvas = event.target;

    if (canvas && canvas.getContext && paintingStatus && isBrushStatus) {
        const ctx = canvas.getContext('2d');
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.fillStyle = changeColor();
        ctx.fillStyle = globalColor;
        ctx.beginPath();
        ctx.arc(event.offsetX, event.offsetY, globalSize/2, 50, Math.PI*2, true);
        ctx.fill();
    }
    if (canvas && canvas.getContext) {
        setCurrentCoordinates(event.offsetX, event.offsetY);
    };
}

function mouseCLickHandler(event) {
    event.preventDefault();

    const canvas = event.target;

    if (canvas && canvas.getContext && !isBrushStatus) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = globalColor;

        if (globalFigure === 'square') {
            ctx.fillRect(event.offsetX-(globalSize/2), event.offsetY-(globalSize/2), globalSize, globalSize);
        }
        else if (globalFigure === 'hexagon') {
            let hexagonSize = globalSize/1.5;
            ctx.beginPath();
            ctx.moveTo(event.offsetX + hexagonSize * Math.cos(0), event.offsetY + hexagonSize * Math.sin(0));
            
            for (let side = 0; side < 7; side++) {
                ctx.lineTo(event.offsetX + hexagonSize * Math.cos(side * 2 * Math.PI / 6), event.offsetY + hexagonSize * Math.sin(side * 2 * Math.PI / 6));
            };
            
            ctx.fill();
        }
        else if (globalFigure === 'circle') {
            ctx.beginPath();
            ctx.arc(event.offsetX, event.offsetY, globalSize/2, 50, Math.PI*2, true);
            ctx.fill();
        }        
    }
}

function mouseDownHandler(event) {
    paintingStatus = true;
}

function mouseUpHandler(event) {
    paintingStatus = false;
}