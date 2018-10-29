'use strict';

// require('jsdom-global')()
const { assert } = require('chai');
const app = require('../scripts/script');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<p>Hello world</p>
</body>
</html>`, {
    url: "https://example.org/",
    referrer: "https://example.com/",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
  });
const { document } = (new JSDOM(`...`)).window;

global.window = window;
global.document = document;
console.log(window.document.querySelector("p").textContent);

// describe('Paint features test', function(){
//     it('Set figure hexagon to localStorage and as global variable.', function(){
//         let result = app.setFigure('hexagon');
//         assert.equal(global.window.localStorage.getItem('figure'), 'hexagon');
//     })
// })
