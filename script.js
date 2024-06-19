// function calc(a,b,c){
//     return eval?.(`"using strict";(${a}${b}${c})`)
// }

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let result = '';
let pCounter = 0;

const displayContainer = document.querySelector('.display-container');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.querySelector('.btn-clr');
const equalButton = document.querySelector('.equalTo');
const point = document.querySelector('.pointBtn');
const bksp = document.querySelector('.btn-del');

numberButtons.forEach((button) => button.addEventListener('click', () => appendNumber(button.textContent), false));
operatorButtons.forEach((button) => button.addEventListener('click', () => addOperator(button.textContent)));

bksp.addEventListener('click', () => {
    displayContainer.textContent = displayContainer.textContent.slice(0, -1);
    if(firstOperand) {
        firstOperand = Number(firstOperand.toString().slice(0,-1));
    }
})

point.addEventListener('click', () => {
    // if(firstOperand == ''){
    //     firstOperand = 0+`${point.textContent}`;
    //     displayContainer.textContent = `${firstOperand}`;
    // }
    // else if(secondOperand == ''){
    //     secondOperand = 0+`${point.textContent}`;
    //     displayContainer.textContent = `${firstOperand}${currentOperation}${secondOperand}`;
    // }
    // else if(secondOperand) {
    //     secondOperand = secondOperand + '.';
    // }
    // else if(firstOperand) {
    //     firstOperand = firstOperand + '.';
    // }
    if(displayContainer.textContent === ''){
        displayContainer.textContent += 0;
    }

    if(pCounter === 1) return;
    
    displayContainer.textContent += '.';
    pCounter++;

});

clearButton.addEventListener('click', () => {
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
    displayContainer.textContent = null;
    pCounter = 0;
});

equalButton.addEventListener('click', () => {
    if(firstOperand && secondOperand){
        evaluate(firstOperand, secondOperand, currentOperation);
        return;
    }
    if(!firstOperand) {
        return;
    } 
    //secondOperand = parseInt(displayContainer.textContent.split(/(?:[+×÷-])/)[1]);
    secondOperand = displayContainer.textContent.split(/(?:[+×÷-])/)[1];
    if(secondOperand == 0 && currentOperation === '÷') {
        displayContainer.innerHTML = `${firstOperand}<span>${currentOperation}${secondOperand}</span>`;
        console.log(secondOperand);
        return;
    }
    if(secondOperand === undefined){
        displayContainer.textContent = firstOperand;
        return;
    }
    evaluate(firstOperand, secondOperand, currentOperation);
});

function appendNumber(number) {
    // if(firstOperand == '0.') firstOperand = parseFloat(`${firstOperand}${number}`);
    // else if(secondOperand == '0.'){
    //     secondOperand = parseFloat(`${secondOperand}${number}`);
    //     displayContainer.textContent += number;
    // }
    // else displayContainer.textContent += number;
    //console.log(currentOperation);
    if(result && currentOperation === null){
        displayContainer.textContent = number;
        firstOperand = '';
        result = '';
    }
    else if(result && currentOperation){
        displayContainer.textContent += number;
    }
    else {
        displayContainer.textContent += number;
    }
}

function addOperator(operator){
    if(firstOperand == '') firstOperand = displayContainer.textContent;
    //else firstOperand = displayContainer;
    //firstOperand = displayContainer.textContent;
    if(currentOperation === null){
        currentOperation = operator;
        pCounter = 0;
        displayContainer.textContent = `${firstOperand}${currentOperation}`;
    }
    else if(currentOperation){
        secondOperand = displayContainer.textContent.split(/(?:[+×÷-])/)[1];
        evaluate(firstOperand, secondOperand, currentOperation);
        currentOperation = operator;
        displayContainer.textContent += operator;
    }
}

function evaluate(first, second, operator) {
    // console.log(typeof first);
    // console.log(first);
    // console.log(typeof second);
    // console.log(second);
    // console.log(typeof operator);
    // console.log(operator);
    result = operate(first, second, operator);
    firstOperand = result;
    currentOperation = null;
    secondOperand = '';
    pCounter = 0;
    // console.log(result);
    displayContainer.textContent = result;
}


function add(a, b){
    return a + b;
}

function subtract(a, b) {
    return a - b ;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, x) {
    a = Number(a);
    b = Number(b);
    let result = '';
    switch(x) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '×':
            result = multiply(a, b);
            break;
        case '÷':
            result = divide(a, b);
            break;
    }
    return parseFloat(result.toFixed(4));
}