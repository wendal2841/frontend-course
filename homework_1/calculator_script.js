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
            case 'sin':
                this.field.value = '-';
                break;
            case 'cos':
                this.field.value = '+';
                break;
            case 'tan':
                this.field.value = '*';
                break;
            case 'log':
                this.field.value = '/';
                break;
            case 'ln':
                this.field.value = '-';
                break;
            case 'exp':
                this.field.value = '+';
                break;
            case 'sqr':
                this.field.value = '*';
                break;
            case 'pow':
                this.field.value = '-';
                break;
            case 'sqrt':
                this.field.value = '+';
                break;
            case 'percent':
                this.field.value = '*';
                break;
            case 'pi':
                this.field.value = '/';
                break;
        }
        this.x = this.result;
        this.y = null;
    }



}

const OPERATIONS_PRIORITY = {
    '(': 0,
    ')': 0,
    '+': 1,
    '-': 1,
    'sin': 2,
    'cos': 2,
    'tan': 2,
    'ln': 2,
    'log': 2,
    'pi': 2,
    '*': 2,
    '/': 2,
    '^':3,
    '√':3,
    '!':3
}

class Controller{
    constructor(){
        this.calculator = new Calculator();
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
            case 'sin':
                this.field.value = 'sin ';
                break;
            case 'cos':
                this.field.value = 'cos ';
                break;
            case 'tan':
                this.field.value = 'tan ';
                break;
            case 'log':
                this.field.value = 'log ';
                break;
            case 'ln':
                this.field.value = 'ln';
                break;
            case 'exp':
                this.field.value = 'exp ';
                break;
            case 'sqr':
                this.field.value = '^2';
                break;
            case 'pow':
                this.field.value = '^';
                break;
            case 'sqrt':
                this.field.value = '√';
                break;
            case 'percent':
                this.field.value = '%';
                break;
            case 'pi':
                this.field.value = 'pi';
                break;
        }
        this.curentOperation = action;
    }

    calculate(string) {
        let stack = [];
        let out = [];
        let arr = string.split(' ');
        for(let value in arr){
            if(!(value in OPERATIONS_PRIORITY)) {
                out.push(value);
            } else if(value === ')'){
                let tmp = arr.lastIndexOf('(');
                out = out.concat(arr.splice(tmp, arr.length-tmp));
            } else {
                if(value !== '(' && OPERATIONS_PRIORITY[arr[arr.length-1]]>OPERATIONS_PRIORITY[value]){
                    out.push(stack.pop());
                    stack.push(value);
                } else stack.push(value)
            }
        }
        return out.concat(stack)
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

let calcu = (string) => {
        let stack = [];
        let out = [];
        let arr = string.split(' ');
        for(let i=0; i<arr.length; i++){
            var value = arr[i];
            if(!(value in OPERATIONS_PRIORITY)) {
                out.push(value);
            } else if(value === ')'){
                let tmp = stack.lastIndexOf('(');
                for(let j=stack.length-1; j>tmp; j--){
                    out.push(stack.pop())
                }
                stack.pop();
            } else {

                if(value !== '(' && OPERATIONS_PRIORITY[stack[stack.length-1]]>=OPERATIONS_PRIORITY[value]){
                    out.push(stack.pop());
                    stack.push(value);
                } else stack.push(value)
            }
        }
        return out.concat(stack)
    }
let str = "3 + 4 * 2 / ( 1 − 5 ) ^ 2"
console.log(calcu(str));

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