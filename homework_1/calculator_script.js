'use strict';

class Calculator{
    constructor(){
        this.x =0;
        this.y = 0;
        this.result = 0
    }

    setX(value) {
        this.x = value;
    }
    setY(value) {
        this.y = value;
    }
    getResult(){
        this.setX(result);
        return this.result;
    }

    plus() {
        this.result = this.x + this.y;
    }
    minus() {
        this.result = this.x - this.y;
    }
    multiplication() {
        this.result = this.x * this.y;
    }
    division() {
        this.result = this.x/this.y;
    }

}

class Controller{
    constructor(){
        this.calculator = new Calculator();
    }

    getField() {
        this.field = document.getElementById('field');
    }

    getButtonValue(number) {
        return +document.getElementById('button_'+number).value;
    }

    printNumber(number) {
        this.field.value += number.toString();
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
    }
}

let controller = new Controller();

let numberAction = (number) => {
    controller.getField();
    controller.printNumber(number);
};

let operationAction = (action) => {
    controller.getField();
    controller.printOperation(action)

}