function add(a, b, precision = 10) {
    // Elimina ceros adicionales antes de convertir a números
    aFloat = parseFloat(a);
    bFloat = parseFloat(b);
    let sum = aFloat + bFloat;
    let factor = Math.pow(10, precision);
    return Math.round(sum * factor) / factor;
}

function substract(a, b, precision = 10) {
    let aFloat = parseFloat(a);
    let bFloat = parseFloat(b);
    let subs = aFloat - bFloat;
    let factor = Math.pow(10, precision);
    return Math.round(subs * factor) / factor;
}

function multiply(a, b, precision = 10) {
    let aFloat = parseFloat(a);
    let bFloat = parseFloat(b);
    let mul = aFloat * bFloat;
    let factor = Math.pow(10, precision);
    return Math.round(mul * factor) / factor;
}

function divide(a, b, precision = 10) {
    if (b == "0") return "Error: You can't divide by 0!"
    let aFloat = parseFloat(a);
    let bFloat = parseFloat(b);
    let div = aFloat / bFloat;
    let factor = Math.pow(10, precision);
    return Math.round(div * factor) / factor;
}



function operate(a, b, op) {
    switch (op) {
        case "+": return add(a, b); break;
        case "-": return substract(a, b); break;
        case "*": return multiply(a, b); break;
        case "/": return divide(a, b); break;
    }
}

const input = document.querySelector("#input");
const result = document.querySelector("#result");
const equal = document.querySelector("#equal");
const pointButton = document.querySelector("#pointButton");
const clear = document.querySelector("#clearButton button");
const padButtons = document.querySelectorAll("#pad button");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let reset = 0;

clear.addEventListener('click', () => {
    clearVariables();
});


function clearVariables() {
    input.textContent = "";
    result.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    operator = "";
    pointButton.removeAttribute('disabled');
}

function clearOperands() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
}

function isOperator(value) {
    return ['+', '-', '*', '/'].includes(value);
}

padButtons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        // Button entered is an equal
        if (buttonText == "=") {
            handleEqual();
        } 
        // Button entered is an operator
        else if (isOperator(buttonText)) {
            handleOperator(buttonText);
        }
        // Button entered is a dot
        else if (buttonText == ".") {
            handleDot(buttonText);
        }   
        // Button entered is a 0  
        else if (buttonText == "0") {
            handleZero(buttonText);
        }
        // Button entered is a number  
        else {
            handleNumber(buttonText);
        }
    })
})


function handleEqual() {
    pointButton.removeAttribute('disabled');
    // Result defined:
    if (result.textContent != "0" && secondNumber == "") {
        result.textContent = result.textContent;
    }
    // Operator and second number entered
    else if (operator && secondNumber != "") {
        res = operate(firstNumber, secondNumber, operator);
        result.textContent = res;
        clearOperands();
    // Only first number entered
    } else {
        result.textContent = firstNumber;
    }
}

function handleOperator(content) {
        pointButton.removeAttribute('disabled');
        // Operator an result defined
        if (operator == "" && result.textContent == 0 && firstNumber != 0) {
            operator = content;
            input.textContent = firstNumber + ` ${operator} `;
            
        } else if (operator == "" && result.textContent != 0 && secondNumber != 0 && firstNumber == 0) {
            firstNumber = res;
            operator = content;
            input.textContent = firstNumber + ` ${operator} `;
            
        } else if (operator != "" && secondNumber != 0) {
            res = operate(firstNumber, secondNumber, operator);
            result.textContent = res;
            clearOperands();
            firstNumber = res;
            operator = content;
            input.textContent = firstNumber + ` ${operator} `;
            
        } else if (operator != "" && secondNumber == 0) {
            operator = content;
            input.textContent = firstNumber + ` ${operator} `;
            
        } else if (operator == "" && secondNumber == 0 && firstNumber != 0) {
            operator = content;
            input.textContent = firstNumber + ` ${operator} `;
            
        } else if (operator == "" && secondNumber == 0 && firstNumber == 0 && result.textContent == "0") {
            firstNumber = "0";
            operator = content;
            input.textContent = firstNumber + ` ${operator} `;
            
        } 
        else if (operator == "" && secondNumber == 0 && firstNumber == 0 && result.textContent != "0") {
            firstNumber = result.textContent;
            operator = content;
            input.textContent = firstNumber + ` ${operator} `;
            
        } else if (operator == "" && result.textContent != 0 && secondNumber == 0 && firstNumber == 0 && result.textContent != "Error: You can't divide by 0!") {
            firstNumber = res;
            operator = content;
            input.textContent = firstNumber + ` ${operator} `;
            
        } else if (result.textContent == "Error: You can't divide by 0!") {}
}

function handleDot(content) {
    if (!operator && result.textContent == 0) {
        if (firstNumber == "") {
            firstNumber += "0" + content;
            input.textContent += firstNumber;
        } else {
            input.textContent += content;
            firstNumber += content;
        }
        pointButton.setAttribute('disabled', 'true');
    } else if (!operator && result.textContent != 0) {

        if (firstNumber == "") {
            firstNumber += 0 + content;
            input.textContent = firstNumber;
            
        } else {
            firstNumber +=  content;
            input.textContent = firstNumber;
            
        }
        pointButton.setAttribute('disabled', 'true');
    } else {

        if (secondNumber == "") {
            input.textContent += 0 + content;
            
        } else {
            input.textContent += content;
            
        }
        secondNumber += content;
        pointButton.setAttribute('disabled', 'true');
    }
}

function handleZero(content) {
    if (!operator && result.textContent == 0) {
        if (firstNumber != "0") {
            firstNumber += content;
            input.textContent += content;
        } else {}
        
    } else if (!operator && result.textContent != 0) {
        input.textContent = firstNumber;
        firstNumber += content;
        input.textContent += content;
    } else {
        if (secondNumber == "0") {
            secondNumber = content;
            input.textContent = input.textContent.slice(0, -1);
            input.textContent += content;
        } else {
            secondNumber += content
            input.textContent += content;
        }
    }
}

function handleNumber(content) {
    if (!operator && result.textContent == 0) {
        if (firstNumber == "0") {
            firstNumber = content;
            input.textContent = content;
        } else {
            firstNumber += content;
            input.textContent += content;
        }
    } else if (!operator && result.textContent != 0) {
        if (firstNumber == "0") {
            input.textContent = firstNumber;
            firstNumber = content;
            input.textContent = content;
        } else {
            input.textContent = firstNumber;
            firstNumber += content;
            input.textContent += content;
        }


    } else {
        if (secondNumber == "0") {
            secondNumber = content;
            input.textContent = input.textContent.slice(0, -1);
            input.textContent += secondNumber;
        } else {
            secondNumber += content;
            input.textContent += content;
        }
    }
}