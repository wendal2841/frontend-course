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
        <script src="index.js" defer></script>
        <link href="index.css" rel="stylesheet">
</head>
<body>
    <div class="main-window">
        <div class="header">
            <h3>To Do List</h3>
            <input type="button" value="Add" id="addTaskButton">
        </div>
        <div class="task-list" id="taskList">
            <div class="task-item">Do todo list</div>
        </div>
    </div>
    <div class="task-create-container" id="taskCreateContainer">
        <div class="wrap">
            <textarea type="text" class="task-create-field" id="taskCreateField"></textarea>
            <div>
                <input type="button" value="Ok" class="task-create-ok-button">
                <input type="button" value="Cancel" class="task-create-cancel-button">
            </div>
        </div>
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
        let newTask = document.getElementById('taskList').children[1];
        assert.equal(newTask.textContent, 'New task text!');
    });

    it('Delete button to task creation test', function(){
        let task = document.getElementsByClassName('task-item')[0];
        let deleteBtn = task.children[0];
        assert.equal(deleteBtn.className, 'delete-task');
    });

    it('Delete button to task using test', function(){
        let task = document.getElementsByClassName('task-item')[0];
        let deleteBtn = task.children[0];
        deleteBtn.onclick();
        assert.equal(task.style.display, 'none');
    });

})