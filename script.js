// function calc(a,b,c){
//     return eval?.(`"using strict";(${a}${b}${c})`)
// }

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

let valueA = parseInt(prompt(`Enter a value:`));
let operator = prompt(`Enter operation:`);
let valueB = parseInt(prompt(`Enter a value:`));
let finalResult = operate(valueA, valueB, operator);
alert(finalResult);

function operate(a, b, x) {
    let result = '';
    switch(x) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
    }
    return result;
}