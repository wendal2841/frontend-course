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

module.exports.default = {
    getSize: getSize,
    setSize: setSize,
    getColor: getColor,
    getIsBrushStatus: getIsBrushStatus,
    setIsBrushStatus: setIsBrushStatus,
    getFigure: getFigure,
    setFigure: setFigure,
}