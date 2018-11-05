'use strict';

function PaintTab(color, figure, size, isBrushStatus, name) {
    wrapper = document.createElement('div');
    canvas1 = document.createElement("canvas");
    canvas2 = document.createElement("canvas");

    wrapper.appendChild(canvas1);
    wrapper.appendChild(canvas2);

    function constructor(){
        this.name = name;
        this.color = color;
        this.figure = figure;
        this.size = size;
        this.isBrushStatus = isBrushStatus;
    
        canvas1.width = canvas1.parentElement.clientWidth;
        canvas1.height = canvas1.parentElement.clientHeight;
    
        canvas2.width = canvas2.parentElement.clientWidth;
        canvas2.height = canvas2.parentElement.clientHeight;

        if (this.isBrushStatus) canvas2.style.display = 'none';
    };

    constructor();

    var paintingStatus;

    function mouserMoveHandler(event) {
        var canvas = event.target;
    
        if (canvas === canvas1){
            if (canvas && canvas.getContext && paintingStatus) {
                // setCurrentCoordinates(event.offsetX, event.offsetY);

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

                var ctx = canvas2.getContext('2d');
                ctx.fillStyle = this.color();
    
                ctx.clearRect(0, 0, canvas2.width, canvas2.height);
    
                if (this.figure === 'square') {
                    ctx.fillRect(event.offsetX-(this.size/2), event.offsetY-(this.size/2), this.size, this.size);
                }

                else if (this.figure === 'hexagon') {
                    var hexagonSize = this.size()/1.5;
                    ctx.beginPath();
                    ctx.moveTo(event.offsetX + hexagonSize * Math.cos(0), event.offsetY + hexagonSize * Math.sin(0));
                    
                    for (var side = 0; side < 7; side++) {
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
                var ctx = canvas1.getContext('2d');
        
                ctx.fillStyle = this.color;
        
                if (this.figure === 'square') {
                    ctx.fillRect(event.offsetX-(this.size/2), event.offsetY-(this.size/2), this.size, this.size);
                }

                else if (this.figure === 'hexagon') {
                    var hexagonSize = this.size()/1.5;
                    ctx.beginPath();
                    ctx.moveTo(event.offsetX + hexagonSize * Math.cos(0), event.offsetY + hexagonSize * Math.sin(0));
                    
                    for (var side = 0; side < 7; side++) {
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

    canvas1.addEventListener('mousemove', mouserMoveHandler);
    canvas1.addEventListener('mousedown', mouseDownHandler);
    canvas1.addEventListener('mouseup', mouseUpHandler);
    
    canvas2.addEventListener('mousemove', mouserMoveHandler);
    canvas2.addEventListener('click', mouseCLickHandler);
    
    this.changeIsBrushStatus = function(status) {
        this.isBrushStatus = status;
        if (this.isBrushStatus) this.canvas2.style.display = 'none';
        else this.canvas1.style.display = 'block';
    };

};



export function PaintTabFactory() {
    var tabCount = 0;

    getNewTabName = function() {
        return 'Tab ' + (++tabCount);
    };

    this.create = function(color, figure, size, isBrushStatus, name) {
        return new PaintTab(color, figure, size, isBrushStatus, getNewTabName());
    }
}

// module.exports = {
//     PaintTabFactory: PaintTabFactory
// }

// export {PaintTabFactory}