"use strict";

const taskList = document.getElementById('taskList');
// const taskCreateContainer = document.getElementById('taskCreateContainer');

for (let i = 0; i < taskList.children.length; i++){
    let span = document.createElement("span");
    var text = document.createTextNode("\u00D7");
    span.className = "delete-task";
    span.appendChild(text);
    taskList.children[i].appendChild(span);
}

function addTask(string) {
    let task = document.createElement('div');
    let text = document.createTextNode(string);
    let taskId = "taskItem" + (Number(taskList.children.length) + 1);

    task.className = 'task-item';
    task.id = taskId;
    task.appendChild(text);
    
    taskList.appendChild(task);
};

















module.exports.default = {
    addTask: addTask,
}