'use strict';

const elementClasses = {
    'wrapperBlock': {},
};

class PaintTab {
    constructor(color, figure, brushSize, isBrushStatus, numId, parent){
        this.tabName = 'Tab ' + numId;
        this.brushColor = color;
        this.figure = figure;
        this.isBrushStatus = isBrushStatus;
        this.paintingStatus;

        this.wrapperBlock = PaintTab.createWrapper(parent);
        this.mainCanvas = PaintTab.createCanvas(this.wrapperBlock);
        this.secondCanvas = PaintTab.createCanvas(this.wrapperBlock);
        this.tab = PaintTab.createTab(this.tabName);

        this.addEventListeners();
    };

    static createWrapper(parent) {
        let element = document.createElement("DIV");
        element.style.width = parseInt(parent.clientWidth) + "px";
        element.style.height = parseInt(parent.clientHeight) + "px";
        return element;
    };

    static createCanvas (parent) {
        let element = document.createElement("CANVAS");
        element.width = parseInt(parent.style.width);
        element.height = parseInt(parent.style.height);
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
        document.getElementById("tabAggregator").appendChild(element);
    }

    deleteTab(){
        this.wrapperBlock.style.display = "none";
        this.tab.style = "none";
    };

    addEventListeners() {
        let mainCanvas = this.mainCanvas;
        let secondCanvas = this.secondCanvas;

        function mouserMoveHandler(event) {
            let canvas = event.target;

            if (canvas === this){
                if (canvas && canvas.getContext && paintingStatus) {

                    var ctx = canvas.getContext('2d');
                    ctx.fillStyle = getColor();

                    ctx.beginPath();
                    ctx.arc(event.offsetX, event.offsetY, this.size/2, 50, Math.PI*2, true);
                    ctx.fill();
                };
            }
            else if (canvas === canvas2) {
                if (canvas1 && canvas1.getContext && canvas2 && canvas2.getContext) {
                    // setCurrentCoordinates(event.offsetX, event.offsetY);

                    let ctx = canvas2.getContext('2d');
                    ctx.fillStyle = this.color();

                    ctx.clearRect(0, 0, canvas2.width, canvas2.height);

                    if (this.figure === 'square') {
                    }
                        ctx.fillRect(event.offsetX-(this.size/2), event.offsetY-(this.size/2), this.size, this.size);
                    }

                    else if (this.figure === 'hexagon') {
                        let hexagonSize = this.size()/1.5;
                        ctx.beginPath();
                        ctx.moveTo(event.offsetX + hexagonSize * Math.cos(0), event.offsetY + hexagonSize * Math.sin(0));

                        for (let side = 0; side < 7; side++) {
                            ctx.lineTo(event.offsetX + hexagonSize * Math.cos(side * 2 * Math.PI / 6), event.offsetY + hexagonSize * Math.sin(side * 2 * Math.PI / 6));
                        };

                        ctx.fill();
                    }

                    else if (this.figure === 'circle') {
                        ctx.beginPath();
                        ctx.arc(event.offsetX, event.offsetY, this.size/2, 50, Math.PI*2, true);
                        ctx.fill();
                    };
                };
            };

            mainCanvas.addEventListener("mousemove", mouseMoveHandler);
    }

        function mouserMoveHandler(event) {
        let canvas = event.target;

        if (canvas === this){
            if (canvas && canvas.getContext && paintingStatus) {

                var ctx = canvas.getContext('2d');
                ctx.fillStyle = getColor();

                ctx.beginPath();
                ctx.arc(event.offsetX, event.offsetY, this.size/2, 50, Math.PI*2, true);
                ctx.fill();
            };
        }
        else if (canvas === canvas2) {
            if (canvas1 && canvas1.getContext && canvas2 && canvas2.getContext) {
                // setCurrentCoordinates(event.offsetX, event.offsetY);

                let ctx = canvas2.getContext('2d');
                ctx.fillStyle = this.color();

                ctx.clearRect(0, 0, canvas2.width, canvas2.height);

                if (this.figure === 'square') {
                    ctx.fillRect(event.offsetX-(this.size/2), event.offsetY-(this.size/2), this.size, this.size);
                }

                else if (this.figure === 'hexagon') {
                    let hexagonSize = this.size()/1.5;
                    ctx.beginPath();
                    ctx.moveTo(event.offsetX + hexagonSize * Math.cos(0), event.offsetY + hexagonSize * Math.sin(0));

                    for (let side = 0; side < 7; side++) {
                        ctx.lineTo(event.offsetX + hexagonSize * Math.cos(side * 2 * Math.PI / 6), event.offsetY + hexagonSize * Math.sin(side * 2 * Math.PI / 6));
                    };

                    ctx.fill();
                }

                else if (this.figure === 'circle') {
                    ctx.beginPath();
                    ctx.arc(event.offsetX, event.offsetY, this.size/2, 50, Math.PI*2, true);
                    ctx.fill();
                };
            };
        };
    };

    function mouseDownHandler(event) {
        paintingStatus = true;
    };

    function mouseUpHandler(event) {
        paintingStatus = false;
    };

    function mouseCLickHandler(event) {
        var canvas = event.target;

        if (canvas === canvas2) {
            if (canvas1 && canvas1.getContext && canvas2 && canvas2.getContext) {
                let ctx = canvas1.getContext('2d');

                ctx.fillStyle = this.color;

                if (this.figure === 'square') {
                    ctx.fillRect(event.offsetX-(this.size/2), event.offsetY-(this.size/2), this.size, this.size);
                }

                else if (this.figure === 'hexagon') {
                    let hexagonSize = this.size()/1.5;
                    ctx.beginPath();
                    ctx.moveTo(event.offsetX + hexagonSize * Math.cos(0), event.offsetY + hexagonSize * Math.sin(0));

                    for (let side = 0; side < 7; side++) {
                        ctx.lineTo(event.offsetX + hexagonSize * Math.cos(side * 2 * Math.PI / 6), event.offsetY + hexagonSize * Math.sin(side * 2 * Math.PI / 6));
                    };

                    ctx.fill();
                }

                else if (this.figure === 'circle') {
                    ctx.beginPath();
                    ctx.arc(event.offsetX, event.offsetY, this.size/2, 50, Math.PI*2, true);
                    ctx.fill();
                };
            }
        }
    };

    // canvas1.addEventListener('mousemove', mouserMoveHandler);
    // canvas1.addEventListener('mousedown', mouseDownHandler);
    // canvas1.addEventListener('mouseup', mouseUpHandler);
    //
    // canvas2.addEventListener('mousemove', mouserMoveHandler);
    // canvas2.addEventListener('click', mouseCLickHandler);




//     wrapper.id = "paint"+name;
//     wrapper.className = 'paint-tab';
//
//     this.name = name;
//     this.color = color;
//     this.figure = figure;
//     this.size = size;
//     this.isBrushStatus = isBrushStatus;
//
//     if (this.isBrushStatus) canvas2.style.display = 'none';
//
//     this.getWrapper = function() {
//         return wrapper;
//     };
//
//     let paintingStatus = true;
//
//     function mouserMoveHandler(event) {
//         var canvas = event.target;
//
//         if (canvas === canvas1){
//             if (canvas && canvas.getContext && paintingStatus) {
//                 // setCurrentCoordinates(event.offsetX, event.offsetY);
//
//                 var ctx = canvas.getContext('2d');
//                 ctx.fillStyle = getColor();
//
//                 ctx.beginPath();
//                 ctx.arc(event.offsetX, event.offsetY, this.size/2, 50, Math.PI*2, true);
//                 ctx.fill();
//             };
//         }
//         else if (canvas === canvas2) {
//             if (canvas1 && canvas1.getContext && canvas2 && canvas2.getContext) {
//                 // setCurrentCoordinates(event.offsetX, event.offsetY);
//
//                 let ctx = canvas2.getContext('2d');
//                 ctx.fillStyle = this.color();
//
//                 ctx.clearRect(0, 0, canvas2.width, canvas2.height);
//
//                 if (this.figure === 'square') {
//                     ctx.fillRect(event.offsetX-(this.size/2), event.offsetY-(this.size/2), this.size, this.size);
//                 }
//
//                 else if (this.figure === 'hexagon') {
//                     let hexagonSize = this.size()/1.5;
//                     ctx.beginPath();
//                     ctx.moveTo(event.offsetX + hexagonSize * Math.cos(0), event.offsetY + hexagonSize * Math.sin(0));
//
//                     for (let side = 0; side < 7; side++) {
//                         ctx.lineTo(event.offsetX + hexagonSize * Math.cos(side * 2 * Math.PI / 6), event.offsetY + hexagonSize * Math.sin(side * 2 * Math.PI / 6));
//                     };
//
//                     ctx.fill();
//                 }
//
//                 else if (this.figure === 'circle') {
//                     ctx.beginPath();
//                     ctx.arc(event.offsetX, event.offsetY, this.size/2, 50, Math.PI*2, true);
//                     ctx.fill();
//                 };
//             };
//         };
//     };
//
//     function mouseDownHandler(event) {
//         paintingStatus = true;
//     };
//
//     function mouseUpHandler(event) {
//         paintingStatus = false;
//     };
//
//     function mouseCLickHandler(event) {
//         var canvas = event.target;
//
//         if (canvas === canvas2) {
//             if (canvas1 && canvas1.getContext && canvas2 && canvas2.getContext) {
//                 let ctx = canvas1.getContext('2d');
//
//                 ctx.fillStyle = this.color;
//
//                 if (this.figure === 'square') {
//                     ctx.fillRect(event.offsetX-(this.size/2), event.offsetY-(this.size/2), this.size, this.size);
//                 }
//
//                 else if (this.figure === 'hexagon') {
//                     let hexagonSize = this.size()/1.5;
//                     ctx.beginPath();
//                     ctx.moveTo(event.offsetX + hexagonSize * Math.cos(0), event.offsetY + hexagonSize * Math.sin(0));
//
//                     for (let side = 0; side < 7; side++) {
//                         ctx.lineTo(event.offsetX + hexagonSize * Math.cos(side * 2 * Math.PI / 6), event.offsetY + hexagonSize * Math.sin(side * 2 * Math.PI / 6));
//                     };
//
//                     ctx.fill();
//                 }
//
//                 else if (this.figure === 'circle') {
//                     ctx.beginPath();
//                     ctx.arc(event.offsetX, event.offsetY, this.size/2, 50, Math.PI*2, true);
//                     ctx.fill();
//                 };
//             }
//         }
//     };
//
//     canvas1.addEventListener('mousemove', mouserMoveHandler);
//     canvas1.addEventListener('mousedown', mouseDownHandler);
//     canvas1.addEventListener('mouseup', mouseUpHandler);
//
//     canvas2.addEventListener('mousemove', mouserMoveHandler);
//     canvas2.addEventListener('click', mouseCLickHandler);
//
//     wrapper.appendChild(canvas1);
//     wrapper.appendChild(canvas2);
//
//     canvas1.width = parseInt(canvas1.parentElement.style.width);
//     canvas1.height = parseInt(canvas1.parentElement.style.height);
//
//     canvas2.width = parseInt(canvas2.parentElement.style.width);
//     canvas2.height = parseInt(canvas2.parentElement.style.height);
//
//     this.changeIsBrushStatus = function(status) {
//         this.isBrushStatus = status;
//         if (this.isBrushStatus) this.canvas2.style.display = 'none';
//         else this.canvas1.style.display = 'block';
//     };
// };
//
//
//
// function PaintTabFactory() {
//     let tabCount = 0;
//
//     getNewTabName = function() {
//         return 'Tab' + (++tabCount);
//     };
//
//     this.create = function(color, figure, size, isBrushStatus, name) {
//         return new PaintTab(color, figure, size, isBrushStatus, getNewTabName());
//     }
}