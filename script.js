// function calc(a,b,c){
//     return eval?.(`"using strict";(${a}${b}${c})`)
// }

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;

const displayContainer = document.querySelector('.display-container');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.querySelector('.btn-clr');
const equalButton = document.querySelector('.equalTo');
const point = document.querySelector('.pointBtn');

numberButtons.forEach((button) => button.addEventListener('click', () => appendNumber(button.textContent)));
operatorButtons.forEach((button) => button.addEventListener('click', () => addOperator(button.textContent)));

//console.log(point);

point.addEventListener('click', () => {
    if(firstOperand == ''){
        firstOperand = 0+`${point.textContent}`;
        displayContainer.textContent = `${firstOperand}`;
    }
    else if(secondOperand == ''){
        secondOperand = 0+`${point.textContent}`;
        displayContainer.textContent = `${firstOperand}${currentOperation}${secondOperand}`;
    }
});

clearButton.addEventListener('click', () => {
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
    displayContainer.textContent = null;
});

equalButton.addEventListener('click', () => {
    if(firstOperand && secondOperand){
        evaluate(firstOperand, secondOperand, currentOperation);
        return;
    } 
    secondOperand = parseInt(displayContainer.textContent.split(/(?:[+×÷-])/)[1]);
    if(secondOperand == 0) {
        displayContainer.innerHTML = `${firstOperand}<span>${currentOperation}${secondOperand}</span>`;
        return;
    }
    evaluate(firstOperand, secondOperand, currentOperation);
});

function appendNumber(number) {
    if(firstOperand == '0.') firstOperand = parseFloat(`${firstOperand}${number}`);
    else if(secondOperand == '0.'){
        secondOperand = parseFloat(`${secondOperand}${number}`);
        displayContainer.textContent += number;
    }
    else displayContainer.textContent += number;
}

function addOperator(operator){
    if (firstOperand == '') firstOperand = parseInt(displayContainer.textContent);
    currentOperation = operator;
    displayContainer.textContent = `${firstOperand}${currentOperation}`;
}

function evaluate(first, second, operator) {
    // console.log(typeof first);
    // console.log(first);
    // console.log(typeof second);
    // console.log(second);
    // console.log(typeof operator);
    // console.log(operator);
    firstOperand = operate(first, second, operator);
    //console.log(result);
    displayContainer.textContent = firstOperand;
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
    return result;
}