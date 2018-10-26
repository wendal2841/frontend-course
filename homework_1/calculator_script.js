'use strict';

let makeSum = (stack) => {
    stack.push(+stack.pop() + +stack.pop())
};

let makeDif = (stack) => {
    let [y, x] = [stack.pop(), stack.pop()];
    if(x === undefined) x = 0;
    stack.push(+x - +y);
};

let makeMult = (stack) => {
    stack.push(+stack.pop() * +stack.pop())
};

let makeDivis = (stack) => {
    let [y, x] = [stack.pop(), stack.pop()];
    (+y !== 0)? stack.push(+x / +y): stack.push('ERROR');
};

let makeSin = (stack) => {
    stack.push(Math.sin(+stack.pop()));
};

let makeCos = (stack) => {
    stack.push(Math.cos(+stack.pop()));
};

let makeTan = (stack) => {
    stack.push(Math.tan(+stack.pop()));
};

let makeLn = (stack) => {
    stack.push(Math.log10(+stack.pop()));
};

let makeLog = (stack) => {
    stack.push(Math.log(+stack.pop()));
};

let makePi = (stack) => {
    stack.push(Math.PI * +stack.pop());
};

let makePow = (stack) => {
    let [y, x] = [stack.pop(), stack.pop()];
    stack.push(Math.pow(+x, +y));
};

let makeSqrt = (stack) => {
    stack.push(Math.sqrt(+stack.pop()));
};

let makeFactorial = (stack) => {
    let value = +stack.pop();
    let result = 1;
    for (let i=value; i>1; i--){ result *= i; }
    stack.push(result);
};

const OPERATIONS_ACTION = {
    '+': makeSum,
    '-': makeDif,
    'sin': makeSin,
    'cos': makeCos,
    'tan': makeTan,
    'ln': makeLn,
    'log': makeLog,
    'pi': makePi,
    '*': makeMult,
    '/': makeDivis,
    '^': makePow,
    '√': makeSqrt,
    '!': makeFactorial
};

const OPERATIONS_PRIORITY = {
    '(': 1,
    ')': 1,
    '+': 2,
    '-': 2,
    '*': 3,
    '/': 3,
    '√': 4,
    '^' : 4,
    'sin': 10,
    'cos': 10,
    'tan': 10,
    'ln': 10,
    'log': 10,
    'pi': 10,
    '!': 10
};
const RIGHT_ASSOCIATIVITY = ['√', '^', 'sin', 'cos', 'tan', 'ln', 'log', 'abs', '!'];

let createRPN = (string) => {
        let stack = [];
        let out = [];
        stack.last = () => stack[stack.length - 1];
        let arr = string.split(' ');
        for(let i=0; i<arr.length; i++){
            let value = arr[i];
            if(!(value in OPERATIONS_PRIORITY)) {
                out.push(value);
            } else if(value === ')'){
                let tmp = stack.lastIndexOf('(');
                for(let j=stack.length-1; j>tmp; j--){
                    out.push(stack.pop())
                }
                stack.pop();
            } else if(value === '('){
                stack.push(value);
            } else if(OPERATIONS_PRIORITY[value]){
                let opCompare = RIGHT_ASSOCIATIVITY.indexOf(value) > -1 ?
                    () => OPERATIONS_PRIORITY[stack.last()] > OPERATIONS_PRIORITY[value] :
                    () => OPERATIONS_PRIORITY[stack.last()] >= OPERATIONS_PRIORITY[value];
                while (stack.length > 0 && opCompare())
                    out.push(stack.pop());
                stack.push(value);
            }
        }
        return out.concat(stack.reverse())
    };

let calculate = (arr) => {
    let stack = [];
    arr.forEach((value) => {
        if(!(value in OPERATIONS_PRIORITY)) stack.push(value);
        else {

            (OPERATIONS_ACTION[value])? OPERATIONS_ACTION[value](stack): stack.push('ERROR')
        }
    });
    if(stack.length === 1) return stack[0];
    else return "ERROR";
};

let str = '( 1 + 2 ) / 2 ^ 2';
console.log(createRPN(str))
console.log(calculate(createRPN(str)));

let addResultToLocalStorage = (value) => {
    let now = new Date();
    let key = 'value_'+now.getTime().toString();
    localStorage.setItem(key, value);
};

let addResultToSessionStorage = (value) => {
    let now = new Date();
    let key = 'value_'+now.getTime().toString();
    sessionStorage.setItem(key, value);
};

let clearIfBegining = () => {
    if ( document.getElementById("answer").innerHTML ===  "ERROR" || (document.getElementById("answer").innerHTML === "0"))
        document.getElementById("answer").innerHTML = "";
};

let numericButton = (arg) => {
    clearIfBegining();
    if (!(arg === ".")) {
        document.getElementById("answer").innerHTML += arg;
    }
};

let operatorButton = (arg) => {
    clearIfBegining();
    if(document.getElementById("answer").innerHTML[document.getElementById("answer").innerHTML.length - 1] !== ' ') {
        document.getElementById("answer").innerHTML += ' ' + arg + ' '
    } else {
        document.getElementById("answer").innerHTML += arg + ' '
    }
};

let functionButton = (arg) => {
    clearIfBegining();
    if(document.getElementById("answer").innerHTML[document.getElementById("answer").innerHTML.length - 1] !== ' ') {
        document.getElementById("answer").innerHTML += ' ' + arg + ' ( ';
    } else {
        document.getElementById("answer").innerHTML += arg + ' ( ';
    }
};

let dotButton = () => {
    if (document.getElementById("answer").innerHTML[document.getElementById("answer").innerHTML.length - 1] !== '.'){
        document.getElementById("answer").innerHTML += '.'
    };
};

let result = () => {
    let result = calculate(createRPN(document.getElementById('answer').innerHTML.trim()));
    document.getElementById('answer').innerHTML = result;
    addResultToLocalStorage(result);
    addResultToSessionStorage(result);

};

let backspaceAction = () => {
    if(document.getElementById('answer').innerHTML[document.getElementById('answer').innerHTML.length -1] === ' '){
        document.getElementById('answer').innerHTML = document.getElementById('answer').innerHTML.slice(0, -2)
    } else {
        document.getElementById('answer').innerHTML = document.getElementById('answer').innerHTML.slice(0, -1)
    }
};

let clearAll = () => {
    document.getElementById("answer").innerHTML = "0";
};