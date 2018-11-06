window.onload = function() {
    init();
};

function init() {    
    window.paintFactory = new PaintTabFactory();

    var addTabButton = document.getElementById('addTabButton');
    addTabButton.addEventListener('click', addTab);

    setColor(getColor());
    setSize(getSize());
    setFigure(getFigure());
    setIsBrushStatus(getIsBrushStatus());
}

function createTabElement(name) {
    var div = document.createElement("div");
    div.className = 'tab-wrapper';
    var input = document.createElement("input");
    input.type = 'button';
    input.className = 'tab';
    input.value = name;
    input.id = name;
    div.appendChild(input);
    var span = document.createElement("span");
    span.appendChild(document.createTextNode("\u00D7"));
    div.appendChild(span);
    document.getElementById("tabPanel").appendChild(div)
}

function addTab() {
    var wrapper = paintFactory.create(getColor(), getFigure(), getSize(), getIsBrushStatus());
    var paintPanel = document.getElementById("paintPanel");
    paintPanel.appendChild(wrapper.getWrapper());
    createTabElement(wrapper.name);
};

function activateTab(){
    var tab = event.target;
    var wrapperId = "paint" + tab.id;
    var paintPanel = document.getElementById("paintPanel");

    paintPanel.children.forEach(element => {
        if(element.id !== wrapperId) element.style.display = 'none'
        else element.style.display = 'block';
    });

    tab.style.backgroundColor = 'yellow';
    
}




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
    return status === ('true' || true);
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
    var wrapper = document.createElement('div');
    wrapper.style.width = "200px";
    wrapper.style.height = "300px";
    var canvas1 = document.createElement("canvas");
    var canvas2 = document.createElement("canvas");



    wrapper.id = "paint"+name;
    wrapper.className = 'paint-tab';

    this.name = name;
    this.color = color;
    this.figure = figure;
    this.size = size;
    this.isBrushStatus = isBrushStatus;

    if (this.isBrushStatus) canvas2.style.display = 'none';

    this.getWrapper = function() {
        return wrapper;
    };

    var paintingStatus = true;

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

    wrapper.appendChild(canvas1);
    wrapper.appendChild(canvas2);

    canvas1.width = parseInt(canvas1.parentElement.style.width);
    canvas1.height = parseInt(canvas1.parentElement.style.height);

    canvas2.width = parseInt(canvas2.parentElement.style.width);
    canvas2.height = parseInt(canvas2.parentElement.style.height);

    this.changeIsBrushStatus = function(status) {
        this.isBrushStatus = status;
        if (this.isBrushStatus) this.canvas2.style.display = 'none';
        else this.canvas1.style.display = 'block';
    };
};



function PaintTabFactory() {
    var tabCount = 0;

    getNewTabName = function() {
        return 'Tab' + (++tabCount);
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