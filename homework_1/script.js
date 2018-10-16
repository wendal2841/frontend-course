'use strict';

let taskIdUserValue = {};
for (let i=1; i<=30; i++){
    taskIdUserValue[i] = ['task'+i+'_value1', 'task'+i+'_value2', 'task'+i+'_value3'];
}

let results = {};
for (let i=1; i<=30; i++){
    results[i] = 'task'+i+'Result';
}

class TaskExecutor {
    constructor(id){
        this.taskId = id;
    }

    getUserValueList () {
        let result = [];
        for(let i=0; i<taskIdUserValue[+this.taskId].length; i++){
            let value = this.getUserValue(taskIdUserValue[this.taskId][i]);
            if (value) result.push(value);
        }
        return result;
    }

    getUserValue(inputId) {
        try {
            return document.getElementById(inputId).value;
        } catch (TypeError) {
            return null;
        }
    }

    printResult(taskResult) {
        document.getElementById(results[this.taskId]).innerHTML = taskResult;
    }
};

let task1 = (taskId) => {
    let executor = new TaskExecutor(taskId);
    let userValues = executor.getUserValueList();
    let a = +userValues[0];
    let b = +userValues[1];
    let result = (a % 2 !== 0) ? a * b : a + b;
    executor.printResult(result.toString());
};

