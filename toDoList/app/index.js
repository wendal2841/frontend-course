"use strict";

const taskList = document.getElementById('taskList');
const taskCreateContainer = document.getElementById('taskCreateContainer');

for (let i = 0; i < taskList.children.length; i++){
    let span = document.createElement("span");
    var text = document.createTextNode("\u00D7");
    span.className = "delete-task";
    span.appendChild(text);
    taskList.children[i].appendChild(span);
}

let deleteButtonList = document.getElementsByClassName('delete-task');
for (let i = 0; i<deleteButtonList.length; i++){
    deleteButtonList[i].onclick = function() {
        this.parentElement.style.display = 'none';
    }
}

function addTask(string) {
    let task = document.createElement('div');
    let text = document.createTextNode(string);

    task.className = 'task-item';
    task.appendChild(text);
    
    taskList.appendChild(task);
};

function deleteTask() {

}

















module.exports.default = {
    addTask: addTask,
}