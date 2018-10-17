'use strict';

let taskIdUserValue = {};
for (let i=1; i<=30; i++){
    taskIdUserValue[i] = ['task'+i+'_value1', 'task'+i+'_value2', 'task'+i+'_value3', 'task'+i+'_value4'];
}
let getUserValue = (taskId) => {
    try {
        return document.getElementById(taskId).value;
    } catch (TypeError) {
        return null;
    }
}

let results = {};
for (let i=1; i<=30; i++){
    results[i] = 'task'+i+'Result';
}

class TaskExecutor {
    constructor(id) {
        this.taskId = id;
    }

    getUserValueList() {
        let result = [];
        for (let i = 0; i < taskIdUserValue[+this.taskId].length; i++) {
            let value = getUserValue(taskIdUserValue[this.taskId][i]);
            if (value) result.push(value);
            else break;
        }
        return result;
    }

    changeDivColor(){
        let div = document.getElementsByClassName('task'+this.taskId)[0];
        let oldColor = div.style.backgroundColor;
        div.style.backgroundColor = '#ccffcc';
        setTimeout( () => {div.style.backgroundColor = oldColor}, 1000);

    };

    printResult(taskResult) {
        this.changeDivColor();
        document.getElementById(results[this.taskId]).innerHTML = taskResult;
    }
}

let task1 = () => {
    let executor = new TaskExecutor(1);
    let userValues = executor.getUserValueList();
    let a = +userValues[0];
    let b = +userValues[1];
    let result = ((a % 2 === 0) ? a * b : a + b || "Incorrect value!");
    executor.printResult(result.toString());
};

let task2 = () => {
    let executor = new TaskExecutor(2);
    let userValues = executor.getUserValueList();
    let x = +userValues[0];
    let y = +userValues[1];
    let result = "";
    (x>0 && y>0)? result ="first quarter":
        (x<0 && y>0)? result ="second quarter":
            (x<0 && y<0)? result ="third quarter":
                (x>0 && y<0)? result ="fourth quarter":
                    result = "None quarter";
    executor.printResult(result);
};

let task3 = () => {
    let executor = new TaskExecutor(3);
    let userValues = executor.getUserValueList();
    let  a = +userValues[0];
    let  b = +userValues[1];
    let  c = +userValues[2];
    let result = 0;
    if (a > 0) result += a;
    if (b > 0) result += b;
    if (c > 0) result += c;
    executor.printResult(result.toString());
};

let task4 = () => {
    let executor = new TaskExecutor(4);
    let userValues = executor.getUserValueList();
    let  a = +userValues[0];
    let  b = +userValues[1];
    let  c = +userValues[2];
    let result = 0;
    let sum = a+b+c;
    let comp = a*b*c;
    (sum>comp)? result = sum + 3: result = comp + 3;
    executor.printResult(result.toString());
};

let task5 = () => {
    let executor = new TaskExecutor(5);
    let userValues = executor.getUserValueList();
    let mark = +userValues[0];
    let result = "";
    (mark >= 0 && mark <= 19)? result = "F":
        (mark >= 20 && mark <= 39)? result = "E":
            (mark >= 40 && mark <= 59)? result = "D":
                (mark >= 60 && mark <= 74)? result = "C":
                    (mark >= 75 && mark <= 89)? result = "B":
                        (mark >= 90 && mark <= 100)? result = "A":
                            result = "No such mark!";
    executor.printResult(result);
};

let task6 = () => {
    let executor = new TaskExecutor(6);
    let sum = 0;
    let count = 0;
    for (let i = 1; i<=99; i++){
        if (i%2 === 0){
            sum += i;
            count += 1;
        }
    }
    let result = "Count = " + count + "; Sum = " + sum;
    executor.printResult(result);
};

let task7 = () => {
    let executor = new TaskExecutor(7);
    let userValues = executor.getUserValueList();
    let userValue = +userValues[0];
    let isPrime = true;
    for (let i = 2; i<userValue; i++) if (userValue % i === 0) {
        isPrime = false;
        break;
    }
    let result = "";
    (isPrime)? result = "Value is prime!": result = "Value is not prime!";
    executor.printResult(result);
};

let task8 = () => {
    let executor = new TaskExecutor(8);
    let userValues = executor.getUserValueList();
    let userValue = +userValues[0];
    let num = 1;
    let result = 0;
    while(userValue >0){
        userValue = userValue - num;
        num = num + 2;
        if (userValue>=0) result += 1;
    }
    executor.printResult(result.toString());
};

let task9 = () => {
    let executor = new TaskExecutor(9);
    let userValues = executor.getUserValueList();
    let userValue = +userValues[0];
    let result = 1;
    for (let i=userValue; i>1; i--){ result *= i; }
    executor.printResult(result.toString());
};

let task10 = () => {
    let executor = new TaskExecutor(10);
    let userValues = executor.getUserValueList();
    let userValue = +userValues[0];
    let result = 0;
    while (userValue>=1){
        result += userValue%10;
        userValue = Math.floor(userValue/10);
    }
    executor.printResult(result.toString());
};

let task11 = () => {
    let executor = new TaskExecutor(11);
    let userValues = executor.getUserValueList();
    let userValue = +userValues[0];
    let result = 0;
    while (userValue>=1){
        result += userValue%10;
        if (userValue > 10) result *= 10;
        userValue = Math.floor(userValue/10);
    }
    executor.printResult(result.toString());
};

let task12 = () => {
    let executor = new TaskExecutor(12);
    let userValues = executor.getUserValueList();
    let userArray = userValues[0].split(' ');
    let result = +userArray[0];
    for (let i=0; i<userArray.length; i++) {
        if (+userArray[i] < result) result = +userArray[i];
    }
    executor.printResult(result.toString());
};

let task13 = () => {
    let executor = new TaskExecutor(13);
    let userValues = executor.getUserValueList();
    let userArray = userValues[0].split(' ');
    let result = +userArray[0];
    for (let i=0; i<userArray.length; i++) {
        if (+userArray[i] > result) result = +userArray[i];
    }
    executor.printResult(result.toString());
};

let task14 = () => {
    let executor = new TaskExecutor(14);
    let userValues = executor.getUserValueList();
    let userArray = userValues[0].split(' ');
    let result = 0;
    for (let i=0; i<userArray.length; i++){
        if (+userArray[i] < +userArray[result])  result = i;
    }
    executor.printResult(result.toString());
};

let task15 = () => {
    let executor = new TaskExecutor(15);
    let userValues = executor.getUserValueList();
    let userArray = userValues[0].split(' ');
    let result = 0;
    for (let i=0; i<userArray.length; i++){
        if (+userArray[i] > +userArray[result])  result = i;
    }
    executor.printResult(result.toString());
};

let task16 = () => {
    let executor = new TaskExecutor(16);
    let userValues = executor.getUserValueList();
    let userArray = userValues[0].split(' ');
    let result = 0;
    for (let i=1; i<userArray.length; i++){
        if (i%2 !== 0) result+= +userArray[i];
    }
    executor.printResult(result.toString());
};

let task17 = () => {
    let executor = new TaskExecutor(17);
    let userValues = executor.getUserValueList();
    let userArray = userValues[0].split(' ');
    for(let i=0; i<userArray.length; i++){
        let tmp = 0;
        for(let j=1; j<userArray.length; j++){
            if(+userArray[j] < +userArray[j-1]){
                tmp = +userArray[j];
                userArray[j] = +userArray[j-1];
                userArray[j-1] = tmp;
            }
        }
    }
    let result = userArray.join(' ');
    executor.printResult(result.toString());
};

let task18 = () => {
    let executor = new TaskExecutor(18);
    let userValues = executor.getUserValueList();
    let userArray = userValues[0].split(' ');
    for (let i=0; i<userArray.length; i++){
        let minIndex = i;
        let tmp = 0;
        for (let j=i+1; j<userArray.length; j++){
            if (+userArray[j] < +userArray[minIndex]){
                minIndex = j;
            }
        }
        if (minIndex !== i){
            tmp = +userArray[i];
            userArray[i] = +userArray[minIndex];
            userArray[minIndex] = tmp;
        }
    }
    let result = userArray.join(' ');
    executor.printResult(result.toString());
};

let task19 = () => {
    let executor = new TaskExecutor(19);
    let userValues = executor.getUserValueList();
    let userArray = userValues[0].split(' ');
    for(let i = 1; i<userArray.length; i++){
        let val = +userArray[i];
        let j = i;
        while(j>0 && +userArray[j-1]>val){
            userArray[j] = +userArray[j-1];
            j --;
        }
        userArray[j] = val;
    }
    let result = userArray.join(' ');
    executor.printResult(result.toString());
};

let task20 = () => {
    let executor = new TaskExecutor(20);
    let userValues = executor.getUserValueList();
    let userValue = +userValues[0];
    const WEEK_DICTIONARY ={
        1 : 'Понедельник',
        2 : 'Вторник',
        3 : 'Среда',
        4 : 'Четверг',
        5 : 'Пятница',
        6 : 'Суббота',
        7 : 'Воскресенье'
    };
    let result = (WEEK_DICTIONARY[userValue] || "No such day!");
    executor.printResult(result);
};

let task21 = () => {
    let executor = new TaskExecutor(21);
    let userValues = executor.getUserValueList();
    let userValue = userValues[0];
    const HUNDREDS_DICTIONARY = {
        1: 'Сто',
        2: 'Двесте',
        3: 'Триста',
        4: 'Четыреста',
        5: 'Пятьсот',
        6: 'Шестьсот',
        7: 'Семьсот',
        8: 'Восемьсот',
        9: 'Девятьсот',
        0: ''
    };

    const TENS_DICTIONARY = {
        2: 'Двадцать',
        3: 'Тридцать',
        4: 'Сорок',
        5: 'Пятьдесят',
        6: 'Шестдесят',
        7: 'Семьдесят',
        8: 'Восемьдесят',
        9: 'Девяносто',
        0: ''
    };

    const ONES_DICTIONARY = {
        1: 'Один',
        2: 'Два',
        3: 'Три',
        4: 'Четыре',
        5: 'Пять',
        6: 'Шесть',
        7: 'Семь',
        8: 'Восемь',
        9: 'Девять',
        0: ''
    };

    const SPEC_DICTIONARY = {
        10: 'Десять',
        11: 'Одинадцать',
        12: 'Двенадцать',
        13: 'Тринадцать',
        14: 'Четрнадцать',
        15: 'Пятнадцать',
        16: 'Шестнадцать',
        17: 'Семнадцать',
        18: 'Восемнадцать',
        19: 'Девятнадцать',
    };

    let getNumString = (num) => {
        if(num === 0 || !+num) return "Ноль";
        if(num.toString().length>3) return "To long value!";
        let result = '';
        let [one, ten, hundred] = String(userValue).split('').reverse();

        if (hundred) {
            result = HUNDREDS_DICTIONARY[hundred] + ' ';
        }

        if (ten === '1') {
            result = result + SPEC_DICTIONARY[ten + one] + ' ';
        } else {
            if (ten) {
                result = result + TENS_DICTIONARY[ten] + ' ';
            }
            if (one) {
                result = result + ONES_DICTIONARY[one] + ' ';
            }
        }
        return result;
    };
    let result = getNumString(userValue);
    executor.printResult(result);
};

let task22 = () => {
    let executor = new TaskExecutor(22);
    let userValues = executor.getUserValueList();
    let userValue = userValues[0];
    const HUNDREDS_DICTIONARY = {
        'сто':          100,
        'двести':       200,
        'триста':       300,
        'четыреста':    400,
        'пятьсот':      500,
        'шестьсот':     600,
        'семьсот':      700,
        'восемьсот':    800,
        'девятьсот':    900
    };

    const TENS_DICTIONARY = {
        'двадцать':    20,
        'тридцать':    30,
        'сорок':       40,
        'пятьдесят':   50,
        'шестьдесят':   60,
        'семьдесят':   70,
        'восемьдесят': 80,
        'девяносто':   90
    };

    const ONES_DICTIONARY = {
        'один':           1,
        'два':            2,
        'три':            3,
        'четыре':         4,
        'пять':           5,
        'шесть':          6,
        'семь':           7,
        'восемь':         8,
        'девять':         9
    };

    const SPEC_DICTIONARY = {
        'десять':           10,
        'одинадцать':       11,
        'двенадцать':       12,
        'тринадцать':       13,
        'четырнадцать':      14,
        'пятнадцать':       15,
        'шестнадцать':      16,
        'семнадцать':       17,
        'восемнадцать':     18,
        'девятнадцать':     19
    };
    let getStringNum = (str) => {
        if(str === 'Ноль') return 0;
        let numList = str.toLowerCase().split(' ').reverse();
        if(numList.length>3) return "To long value!";
        let result = 0;
        let digit = [ONES_DICTIONARY, SPEC_DICTIONARY, TENS_DICTIONARY, HUNDREDS_DICTIONARY];
        for(let i=0; i<numList.length; i++){
            for(let j=0; j<digit.length; j++){
                if(digit[j][numList[i]]){
                    result += +digit[j][numList[i]];
                    break;
                }
            }
        }
        return result;
    };
    let result = getStringNum(userValue);
    executor.printResult(result.toString());
};

let task23 = () => {
    let executor = new TaskExecutor(23);
    let userValues = executor.getUserValueList();
    let x1 = +userValues[0];
    let y1 = +userValues[1];
    let x2 = +userValues[2];
    let y2 = +userValues[3];
    let getLength = (x1, y1, x2, y2) => {
        return Math.sqrt(Math.pow((x2-x1), 2) + Math.pow((y2-y1), 2)).toFixed(3);
    };
    let result = (getLength(x1, y1, x2, y2) || "Incorrect values!");
    executor.printResult(result);
};
