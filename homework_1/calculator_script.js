'use strict';

class Calculator{
    constructor(){
        this.x = null;
        this.y = null;
        this.result = 0
    }

    clear(){
        this.x = null;
        this.y = null;
        this.result = 0;
    }

    action(operation, value){
        if(this.x === null){
            this.x = Math.abs(+value);
        } else if (this.x !== null && this.y === null && operation) {
            this.y = Math.abs(+value);
            this.calculate(operation)
        }
    }

    getResult(){
        this.x = null;
        this.y = null;
        return this.result;
    }

    calculate(action){
        switch (action) {
            case 'minus':
                this.result = this.x - this.y;
                break;
            case 'plus':
                this.result = this.x + this.y;
                break;
            case 'multiplication':
                this.result = this.x * this.y;
                break;
            case 'division':
                this.result = this.x / this.y;
                break;
        }
        this.x = this.result;
        this.y = null;
    }



}

class Controller{
    constructor(){
        this.calculator = new Calculator();
        this.curentOperation = null;
    }

    getField() {
        this.field = document.getElementById('field');
    }

    printDot(){
        if(this.field.value.indexOf('.') === -1) this.field.value += '.'
    }

    printNumber(number) {
        if(('*/').indexOf(this.field.value) !== -1) this.field.value = number.toString();
        else this.field.value += number.toString();
    }

    printResult(){
        this.field.value = this.calculator.getResult()
    }

    printOperation(action) {
        switch (action) {
            case 'minus':
                this.field.value = '-';
                break;
            case 'plus':
                this.field.value = '+';
                break;
            case 'multiplication':
                this.field.value = '*';
                break;
            case 'division':
                this.field.value = '/';
                break;
        }
        this.curentOperation = action;
    }

    calculate() {
        if (+this.field.value)
        this.calculator.action(this.curentOperation, this.field.value)
    }

    backspace(){
        this.field.value = this.field.value.slice(0, -1)
    }

    clear(){
        this.field.value = '';
        this.curentOperation = null;
        this.calculator.clear();
    }
}

let controller = new Controller();

let numberAction = (number) => {
    controller.getField();
    controller.printNumber(number);
};

let operationAction = (action) => {
    controller.getField();
    controller.calculate();
    controller.printOperation(action);

};

let dotAction = () => {
    controller.printDot()
};

let calculate = () => {
    controller.calculate();
    controller.printResult()
};

let backspaceAction = () => {
    controller.getField();
    controller.backspace();
};

let clearAll = () => {
    controller.getField();
    controller.clear();
};