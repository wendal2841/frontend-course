'use strict'

let userValueId = {};
for (let i=1; i<=30; i++){
    userValueId[i] = ['task'+i+'_value1', 'task'+i+'_value2', 'task'+i+'_value3'];
}

let results = {};
for (let i=1; i<=30; i++){
    results[i] = 'task'+i+'Result';
}

let getUserValue = (inputId) => {
    return document.getElementById(inputId).value;
};

let taskFunctions = {};

let printResult = (taskId) => {
    let methodName = "task" + taskId;
    document.getElementById(results[taskId]).innerHTML = taskFunctions[methodName](taskId);
};

let taskFunctions[task1] = (taskId) => {
    a = getUserValue(userValueId[taskId][0]);
    b = getUserValue(userValueId[taskId][1]);
    return (a % 2 !== 0)? a*b: a+b;
};


