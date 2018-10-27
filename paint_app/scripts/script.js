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
    
    const canvas1 = document.getElementById('canvas1');
    canvas1.width = document.getElementById('canvasWrapper').clientWidth;
    canvas1.height = document.getElementById('canvasWrapper').clientHeight;

    const canvas2 = document.getElementById('canvas2');
    canvas2.width = document.getElementById('canvasWrapper').clientWidth;
    canvas2.height = document.getElementById('canvasWrapper').clientHeight;
    setDisplayStatusCanvas2();

    setColor(globalColor);
    setSize(globalSize);
    setFigure(globalFigure);
    setIsBrushStatus(isBrushStatus);

    canvas1AddEventListeners(canvas1);
    canvas2AddEventListeners(canvas2);
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
    let color = document.getElementById('colorField').value;
    if (colorValidation(color)){
        setColor(color)
    }
}

function changeSize() {
    setSize(document.getElementById('size').value)
}

function changeFigure(figure){
    setFigure(figure);
}

function changeIsBrushStatus() {
    let status = (document.getElementById('isBrushStatus').checked);
    if (status) setIsBrushStatus(true);
    else setIsBrushStatus(false);

    setDisplayStatusCanvas2();
}

function setCurrentColor(color) {
    document.getElementById('currentColor').style.backgroundColor = color;
}

function setCurrentCoordinates(x, y) {
    document.getElementById('currentX').innerHTML = `x=${x}px`;
    document.getElementById('currentY').innerHTML = `y=${y}px`;
}

function canvas1AddEventListeners(canvas) {
    canvas.addEventListener('mousemove', mouserMoveHandler);
    canvas.addEventListener('mousedown', mouseDownHandler);
    canvas.addEventListener('mouseup', mouseUpHandler);
}

function canvas2AddEventListeners(canvas) {
    canvas.addEventListener('mousemove', mouserMoveHandlerCanvas2);
    canvas.addEventListener('click', mouseCLickHandlerCanvas2);
}



function mouserMoveHandler(event) {
    const canvas = event.target;

    if (canvas && canvas.getContext && paintingStatus && isBrushStatus) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = globalColor;
        ctx.beginPath();
        ctx.arc(event.offsetX, event.offsetY, globalSize/2, 50, Math.PI*2, true);
        ctx.fill();
    }
    if (canvas && canvas.getContext) {
        setCurrentCoordinates(event.offsetX, event.offsetY);
    };
}

function mouseDownHandler(event) {
    paintingStatus = true;
}

function mouseUpHandler(event) {
    paintingStatus = false;
}

function mouserMoveHandlerCanvas2(event) {
    const canvas1 = document.getElementById('canvas1')
    const canvas2 = event.target;

    if (canvas1 && canvas1.getContext && canvas2 && canvas2.getContext) {
        setCurrentCoordinates(event.offsetX, event.offsetY);

        if (!isBrushStatus) {
            const ctx2 = canvas2.getContext('2d');

            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            ctx2.fillStyle = globalColor;

            if (globalFigure === 'square') {
                ctx2.fillRect(event.offsetX-(globalSize/2), event.offsetY-(globalSize/2), globalSize, globalSize);
            }
            else if (globalFigure === 'hexagon') {
                let hexagonSize = globalSize/1.5;
                ctx2.beginPath();
                ctx2.moveTo(event.offsetX + hexagonSize * Math.cos(0), event.offsetY + hexagonSize * Math.sin(0));
                
                for (let side = 0; side < 7; side++) {
                    ctx2.lineTo(event.offsetX + hexagonSize * Math.cos(side * 2 * Math.PI / 6), event.offsetY + hexagonSize * Math.sin(side * 2 * Math.PI / 6));
                };
                
                ctx2.fill();
            }
            else if (globalFigure === 'circle') {
                ctx2.beginPath();
                ctx2.arc(event.offsetX, event.offsetY, globalSize/2, 50, Math.PI*2, true);
                ctx2.fill();
            }     
        }
    }
}

function mouseCLickHandlerCanvas2(event) {
    const canvas1 = document.getElementById('canvas1')
    const canvas2 = event.target;

    if (canvas1 && canvas1.getContext && canvas2 && canvas2.getContext) {
        const ctx1 = canvas1.getContext('2d');

        ctx1.fillStyle = globalColor;

        if (globalFigure === 'square') {
            ctx1.fillRect(event.offsetX-(globalSize/2), event.offsetY-(globalSize/2), globalSize, globalSize);
        }
        else if (globalFigure === 'hexagon') {
            let hexagonSize = globalSize/1.5;
            ctx1.beginPath();
            ctx1.moveTo(event.offsetX + hexagonSize * Math.cos(0), event.offsetY + hexagonSize * Math.sin(0));
            
            for (let side = 0; side < 7; side++) {
                ctx1.lineTo(event.offsetX + hexagonSize * Math.cos(side * 2 * Math.PI / 6), event.offsetY + hexagonSize * Math.sin(side * 2 * Math.PI / 6));
            };
            
            ctx1.fill();
        }
        else if (globalFigure === 'circle') {
            ctx1.beginPath();
            ctx1.arc(event.offsetX, event.offsetY, globalSize/2, 50, Math.PI*2, true);
            ctx1.fill();
        }        
    }
}

function colorValidation(string) {
    let divIndicator = document.getElementById('currentColor');
    divIndicator.style.backgroundColor = string;
    if (divIndicator.style.backgroundColor === string) return true;
    else return false;
}

function setDisplayStatusCanvas2() {
    (isBrushStatus)? document.getElementById('canvas2').style.display = 'none':
    document.getElementById('canvas2').style.display = 'block';
}