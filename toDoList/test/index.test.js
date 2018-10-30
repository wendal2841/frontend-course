'use strict';

const ls = require('localStorage');
const assert = require('chai').assert;
const JSDOM = require("jsdom").JSDOM;
const window = new JSDOM(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
<head>
        <title>To do list</title>
        <script src="index.js"></script>
        <link href="index.css" rel="stylesheet">
</head>
<body>
    <div class="main-window">
        <div class="header">
            <h3>To Do List</h3>
            <input type="button" value="Add" id="addTaskButton">
        </div>
        <div class="task-list" id="taskList">
            <div class="task-item" id="taskItem1">Do todo list</div>
        </div>
    </div>
    <div class="create-task-field">
        <input type="text" id="taskField">
    </div>
</body>
</html>`).window;

global.localStorage = ls;
global.window = window;
global.document = window.document;

const app = require('../app/index');

describe('To Do List tests.', function(){
    it('New task creation test.', function(){
        let text = 'New task text!';
        app.default.addTask(text);
        let newTask = document.getElementById('taskItem2');
        assert.equal(newTask.textContent, 'New task text!');
    });

    it('New task attributes check', function(){
        let text = 'New task text!';
        app.default.addTask(text);
        let newTask = document.getElementById('taskItem2');
        assert.equal(newTask.className, 'task-item');
    });

    it('Delete button to task creation test', function(){
        let task = document.getElementById('taskItem1');
        let deleteBtn = task.children[0];
        assert.equal(deleteBtn.className, 'delete-task');
    });

})