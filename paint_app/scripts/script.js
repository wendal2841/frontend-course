window.onload = function() {
    init();
};

function init() {    
    // const paintingStatus = false;

    // const canvas1 = document.getElementById('canvas1');
    // canvas1.width = document.getElementById('canvasWrapper').clientWidth;
    // canvas1.height = document.getElementById('canvasWrapper').clientHeight;

    // const canvas2 = document.getElementById('canvas2');
    // canvas2.width = document.getElementById('canvasWrapper').clientWidth;
    // canvas2.height = document.getElementById('canvasWrapper').clientHeight;
    // setDisplayStatusCanvas2();

    window.paintFactory = new PaintTabFactory();

    var addTabButton = document.getElementById('addTabButton');
    addTabButton.addEventListener('click', addTab);

    setColor(getColor());
    setSize(getSize());
    setFigure(getFigure());
    setIsBrushStatus(getIsBrushStatus());

    // canvas1AddEventListeners(canvas1);
    // canvas2AddEventListeners(canvas2);
}

function addTab() {
    var wrapper = paintFactory.create(getColor(), getFigure(), getSize(), getIsBrushStatus());
    var paintPanel = document.getElementById("paintPanel");
    var tabPanel = document.getElementById("tabPanel");
    tabPanel.appendChild(document.createElement('div')).innerText = wrapper.name;
    paintPanel.appendChild(wrapper.getWrapper());
};


function getColor() {
    return (localStorage.getItem('color') || 'black');
}

function getSize() {
    return (localStorage.getItem('size') || 25);
}

function getFigure() {
    return (localStorage.getItem('figure') || 'circle');
}

function getIsBrushStatus() {
    let status = localStorage.getItem('isBrushStatus');
    if (status === ('true' || true)) return true
    else return false;
}

function setColor(color) {
    document.getElementById('colorField').value = color;
    
    localStorage.setItem('color', color);

    setCurrentColor(color);
}

function setSize(size) {
    document.getElementById('size').value = size;

    localStorage.setItem('size', size);
}

function setFigure(figure) {
    localStorage.setItem('figure', figure);
}

function setIsBrushStatus(status) {
    document.getElementById('isBrushStatus').checked = status;

    localStorage.setItem('isBrushStatus', status);
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

    if (canvas && canvas.getContext && paintingStatus && getIsBrushStatus()) {
        if (canvas && canvas.getContext) {
            setCurrentCoordinates(event.offsetX, event.offsetY);
            if (paintingStatus && getIsBrushStatus()){
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = getColor();
                ctx.beginPath();
                ctx.arc(event.offsetX, event.offsetY, getSize()/2, 50, Math.PI*2, true);
                ctx.fill();
            }
        }

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

        if (!getIsBrushStatus()) {
            const ctx2 = canvas2.getContext('2d');

            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            ctx2.fillStyle = getColor();

            if (getFigure() === 'square') {
                ctx2.fillRect(event.offsetX-(getSize()/2), event.offsetY-(getSize()/2), getSize(), getSize());
            }
            else if (getFigure() === 'hexagon') {
                let hexagonSize = getSize()/1.5;
                ctx2.beginPath();
                ctx2.moveTo(event.offsetX + hexagonSize * Math.cos(0), event.offsetY + hexagonSize * Math.sin(0));
                
                for (let side = 0; side < 7; side++) {
                    ctx2.lineTo(event.offsetX + hexagonSize * Math.cos(side * 2 * Math.PI / 6), event.offsetY + hexagonSize * Math.sin(side * 2 * Math.PI / 6));
                };
                
                ctx2.fill();
            }
            else if (getFigure() === 'circle') {
                ctx2.beginPath();
                ctx2.arc(event.offsetX, event.offsetY, getSize()/2, 50, Math.PI*2, true);
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

        ctx1.fillStyle = getColor();

        if (getFigure() === 'square') {
            ctx1.fillRect(event.offsetX-(getSize()/2), event.offsetY-(getSize()/2), getSize(), getSize());
        }
        else if (getFigure() === 'hexagon') {
            let hexagonSize = getSize()/1.5;
            ctx1.beginPath();
            ctx1.moveTo(event.offsetX + hexagonSize * Math.cos(0), event.offsetY + hexagonSize * Math.sin(0));
            
            for (let side = 0; side < 7; side++) {
                ctx1.lineTo(event.offsetX + hexagonSize * Math.cos(side * 2 * Math.PI / 6), event.offsetY + hexagonSize * Math.sin(side * 2 * Math.PI / 6));
            };
            
            ctx1.fill();
        }
        else if (getFigure() === 'circle') {
            ctx1.beginPath();
            ctx1.arc(event.offsetX, event.offsetY, getSize()/2, 50, Math.PI*2, true);
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
    (getIsBrushStatus())? document.getElementById('canvas2').style.display = 'none':
    document.getElementById('canvas2').style.display = 'block';
}


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

    this.getWrapper = function() {
        return wrapper;
    };

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



function PaintTabFactory() {
    var tabCount = 0;

    getNewTabName = function() {
        return 'Tab ' + (++tabCount);
    };

    this.create = function(color, figure, size, isBrushStatus, name) {
        return new PaintTab(color, figure, size, isBrushStatus, getNewTabName());
    }
}


module.exports.default = {
    getSize: getSize,
    setSize: setSize,
    getColor: getColor,
    getIsBrushStatus: getIsBrushStatus,
    setIsBrushStatus: setIsBrushStatus,
    getFigure: getFigure,
    setFigure: setFigure,
}