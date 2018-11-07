'use strict';

const brashInput = document.getElementById('isBrushStatus');

class PaintTab {
    constructor({color, brushSize, isBrushStatus, figure, numId, parent}) {
        this.tabActiveClass = "tab_active";
        this.paintTabActiveClass = "canvas-wrapper_active";

        this.tabName = 'Tab ' + numId;
        this.brushColor = color;
        this.figure = figure;
        this.brushSize = brushSize;
        this.isBrushStatus = isBrushStatus;
        this.paintingStatus = true;

        this.wrapperBlock = PaintTab.createWrapper(parent);

        const sizes = {
            width: parseInt(this.wrapperBlock.style.width),
            height: parseInt(this.wrapperBlock.style.height)
        };

        this.mainCanvas = new Canvas(sizes);

        this.wrapperBlock.appendChild(this.mainCanvas.element);

        this.tab = PaintTab.createTab(this.tabName);
        document.getElementById("tabAggregator").appendChild(this.tab);

        this.setElementClasses();

        parent.appendChild(this.wrapperBlock);

        this.tab.onclick = this.hideTab.bind(this);
        brashInput.onchange = this.changeBrushStatusHandler.bind(this);
        this.wrapperBlock.onmousemove = this.mouseMoveHandler.bind(this);
        this.wrapperBlock.onmousedown = this.startPainting.bind(this);
        this.wrapperBlock.onmouseup = this.stopPainting.bind(this);
        this.wrapperBlock.onmouseleave = this.stopPainting.bind(this);
        this.wrapperBlock.onclick = this.mouseClickHandler.bind(this);
    };

    unActivateTab(){
        this.wrapperBlock.classList.remove(this.paintTabActiveClass);
        this.tab.classList.remove(this.tabActiveClass);
    }

    activateTab(){
        this.wrapperBlock.classList.add(this.paintTabActiveClass);
        this.tab.classList.add(this.tabActiveClass);
    }

    setBrushColor(color){
        this.brushColor = color;
    }

    setBrushSize(size){
        this.brushSize = size;
    }

    setIsBrushStatus(status){
        this.isBrushStatus = status;
    }

    setFigure(figure){
        this.figure = figure;
    }

    setElementClasses() {
        const elementClasses = {
            "wrapperBlock": "canvas-wrapper canvas-wrapper_default",
            "mainCanvas": "canvas-wrapper__main-canvas canvas-wrapper__main-canvas_default",
            "tab": "tab tab_default"
        };

        this.wrapperBlock.className = elementClasses.wrapperBlock;
        this.mainCanvas.element.className = elementClasses.mainCanvas;
        this.tab.className = elementClasses.tab;
    }

    changeBrushStatusHandler(event) {
        this.isBrushStatus = event.target.checked;
    }

    mouseMoveHandler(event) {
        const point = {
            left: event.offsetX,
            top: event.offsetY
        };

        if (this.isBrushStatus) {
            if (this.paintingStatus) {
                this.paintWithBrush(point, this.brushSize, this.brushColor);
            }
        }
    }

    mouseClickHandler(event) {
        const point = {
            left: event.offsetX,
            top: event.offsetY
        };

        if (!this.isBrushStatus) {
            this.paintWithFigure(point, this.brushSize, this.brushColor, this.figure);
        }

    }

    startPainting() {
        this.paintingStatus = true;
    }

    stopPainting() {
        this.paintingStatus = false;
    }

    paintWithBrush(point, size, color = '#000') {
        this.mainCanvas.paintPoint(point, size, color);
    }

    paintWithFigure(point, size, color = "#000", figure = "Hexagon") {
        (figure === "Circle")? this.mainCanvas.paintPoint(point, size, color):
            (figure === "Square")? this.mainCanvas.paintSquare(point, size, color):
                this.mainCanvas.paintHexagon(point, size, color);
    }

    static createWrapper(parent) {
        let element = document.createElement("DIV");
        element.style.width = parseInt(parent.clientWidth) + "px";
        element.style.height = parseInt(parent.clientHeight) + "px";
        return element;
    };


    static createTab(tabName) {
        let element = document.createElement("DIV");
        let button = document.createElement("INPUT");
        let span = document.createElement("SPAN");
        span.appendChild(document.createTextNode("\u00D7"));
        button.type = "button";
        button.value = tabName;
        button.classList.add("tab__btn");
        button.classList.add("tab__btn_default");
        span.classList.add("tab__closer");
        span.classList.add("tab__closer_default");
        element.classList.add("tab");
        element.classList.add("tab_default");
        element.appendChild(button);
        element.appendChild(span);
        return element;
    }

    hideTab() {
        this.wrapperBlock.style.display = "none";
        this.tab.style.display = "none";
    };
}

class Canvas{
    constructor(size){
        this.size    = size;
        this.element = document.createElement("CANVAS");
        this.ctx     = this.element.getContext('2d');
        this.setSize(size);
    }

    setSize(size){
        this.element.width  = size.width;
        this.element.height = size.height;
    }

    paintPoint(point, size, color) {
        this.ctx.fillStyle = color;

        this.ctx.beginPath();
        this.ctx.arc(point.left, point.top, size / 2, 50, Math.PI * 2, true);
        this.ctx.fill();
    }

    paintSquare(point, size, color) {
        this.ctx.fillStyle = color;

        this.ctx.fillRect(point.left, point.top, point.left+size, point.top+size)
    }

    paintHexagon(point, size, color){
        this.ctx.fillStyle = color;

        let hexagonSize = size/1.5;
        this.ctx.beginPath();
        this.ctx.moveTo(point.left + hexagonSize * Math.cos(0), point.top + hexagonSize * Math.sin(0));

        for (let side = 0; side < 7; side++) {
            this.ctx.lineTo(point.left + hexagonSize * Math.cos(side * 2 * Math.PI / 6), point.top + hexagonSize * Math.sin(side * 2 * Math.PI / 6));
        };

        this.ctx.fill();
    }

    clear(){
        this.ctx.clearRect(0, 0, this.element.width, this.element.height);
    }
}


const createTabBtn = document.getElementById('addTabButton');
const paintPanel = document.getElementById('paintPanel');

let i = 1;

createTabBtn.onclick = e => {
    const tab = new PaintTab({
        parent: paintPanel,
        numId: i++,
        isBrushStatus: brashInput.checked,
        brushSize: 10
    });
};