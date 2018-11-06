'use strict';

const ls = require('localStorage');
const assert = require('chai').assert;
const JSDOM = require("jsdom").JSDOM;
const window = new JSDOM(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Painting</title>
    <script src="scripts/script.js"></script>
    <link href="styles/style.css" rel="stylesheet">
</head>
<body>
    <div class="title" id="title">
        <h1>Paint</h1>
    </div>
    <div class="control-panel">
        <input type="text" id="colorField" value="black">
    <br>
    <button type="button" onclick="changeColor()">Enter</button>
    <br>
    <input type="range" id="size" min="0" max="50" step="1" oninput="changeSize()"><br>
    <div class="dropdown-figures">
        <button type="button">Figure</button>
        <div class="dropdown-figures-content">
            <div class="dropdown-figures-content-item" onclick="changeFigure('square')">Square</div>
            <div class="dropdown-figures-content-item" onclick="changeFigure('circle')">Circle</div>
            <div class="dropdown-figures-content-item" onclick="changeFigure('hexagon')">Hexagon</div>
        </div>
    </div>
    <div>
        <input type="checkbox" name="Brush" id="isBrushStatus" onclick="changeIsBrushStatus()">Brush<br>
    </div>

    </div>
    <div class="canvas-wrapper" id="canvasWrapper">
        <div style="position: relative;">
            <canvas class="layer1" id="canvas1" width="100" height="100" 
              style="position: absolute; left: 0; top: 0; z-index: 0;"></canvas>
            <canvas class="layer2" id="canvas2" width="100" height="100" 
              style="position: absolute; left: 0; top: 0; z-index: 1;"></canvas>
           </div>
    </div>
    <div class="current-status">
        <div class="current-color" id="currentColor"></div>
        <p id="currentX"></p>
        <p id="currentY"></p>
    </div>

</body>
</html>`).window;


global.localStorage = ls;
global.window = window;
global.document = window.document;


console.log(document.querySelector("p").textContent);

const app = require('../src/script/script');

console.log(localStorage)


describe('Paint features test', function(){
    it('Get default figure.', function() {
        let result = app.default.getFigure();
        assert.deepEqual(result, 'circle');
    });

    it('Set figure hexagon to localStorage.', function(){
        let result = app.default.setFigure('hexagon');
        assert.equal(localStorage.getItem('figure'), 'hexagon');
    });

    it('Get changed figure.', function(){
        app.default.setFigure('hexagon');
        let result = app.default.getFigure();
        assert.equal(result, 'hexagon');
    });


})
