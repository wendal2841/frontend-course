"use strict";

const taskList = document.getElementById('taskList');
const taskCreateContainer = document.getElementById('taskCreateContainer');

function callFiedl() {
    taskCreateContainer.style.display = 'flex';
};

function callAddTask() {
    let field = document.getElementById('taskCreateField');
    if(field.value === '') {
        callTextFieldError(field);
     } else {
        addTask(field.value);
        taskCreateContainer.style.display = 'none';
        prepareField(field);
    };
}

function closeField() {
    let field = document.getElementById('taskCreateField');
    prepareField(field);
    taskCreateContainer.style.display = 'none';
}

function prepareField(field) {
    field.value = '';
    field.style.border = '1px solid black';
}

function callTextFieldError(field) {
    field.style.border = '1px solid red';
}


function setDeleteParentOnClick(element) {
    element.onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
      }
};

function createDeleteButton(parent) {
    let span = document.createElement("span");
    var text = document.createTextNode("\u00D7");
    span.className = "delete-task";
    span.appendChild(text);
    parent.appendChild(span);
    setDeleteParentOnClick(span);
}

for (let i = 0; i < taskList.children.length; i++){
    createDeleteButton(taskList.children[i]);
}

function addTask(string) {
    let task = document.createElement('li');
    let text = document.createTextNode(string);

    task.appendChild(text);
    createDeleteButton(task);
    
    taskList.appendChild(task);
};

var list = document.getElementById('taskList');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);















module.exports.default = {
    addTask: addTask,
}