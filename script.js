function round(num){
    let fractionalPart=num-parseInt(num)+"";
    if(fractionalPart.slice(2).length>5){
        return num.toFixed(5);
    }
    return num
}
function add(num1, num2) {
    return round(num1 + num2);
}
function subtract(num1, num2) {
    return round(num1 - num2);
}
function multiply(num1, num2) {
    return round(num1 * num2);
}
function divide(num1, num2) {
    if (num2 === 0) {
        alert("dude really 😑");
    }
    return round(num1 / num2);
}
function modulo(num1, num2) {
    return round(num1 % num2);
}

let number1;
let number2;
let operator;

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
        case 'x':
            return multiply(num1, num2);
        case '/':
        case '÷':
            return divide(num1, num2);
        default:
            return modulo(num1, num2);
    };
}

const currentDisplay = document.querySelector(".currentDisplay");
const previousResult = document.querySelector(".previousResult");
const numberAndScreenOperationsButtons = document.querySelector(".numbersAndOnscreenOperations");
let display = "";

numberAndScreenOperationsButtons.addEventListener("click", (e) => {
    if (e.target.className === "number") {
        display += e.target.id;
        currentDisplay.textContent = display;
    }
    if (e.target.className === "clear") {
        display = "";
        currentDisplay.textContent = "";
        previousResult.textContent = "";
        operatorFlag = false;
    }
    if (e.target.className == "modulo") {
        if (!operatorFlag) {
            previousResult.textContent = currentDisplay.textContent + e.target.id;
            display = "";
            currentDisplay.textContent = "";
            operatorFlag = true;
        }
        else if (display === "") {
            previousResult.textContent = prev.slice(0, prev.length - 1) + e.target.id;
        }
        else {
            let num1 = parseFloat(prev.slice(0, prev.length - 1));
            let operator = prev.at(prev.length - 1);
            let num2 = parseFloat(display);
            display = "";
            currentDisplay.textContent = "";
            let result = operate(num1, num2, operator) + e.target.id;
            console.log(result);
            previousResult.textContent = result;
        }
    }

});
let operatorFlag = false;
let mathOperations = document.querySelector(".mathOperations");
mathOperations.addEventListener("click", (e) => {
    let prev = previousResult.textContent;
    if (e.target.className.includes("operation")) {
        if(e.target.id==='-'&&display.length===0){
            display='-';
            currentDisplay.textContent=display;
            return;
        }
        if (!operatorFlag) {
            previousResult.textContent = currentDisplay.textContent + e.target.id;
            display = "";
            currentDisplay.textContent = "";
            operatorFlag = true;
            containsDot = false;
        }
        else if (display === "") {
            previousResult.textContent = prev.slice(0, prev.length - 1) + e.target.id;
        }
        else {
            let num1 = parseFloat(prev.slice(0, prev.length - 1));
            let operator = prev.at(prev.length - 1);
            let num2 = parseFloat(display);
            display = "";
            currentDisplay.textContent = "";
            let result = operate(num1, num2, operator) + e.target.id;
            console.log(result);
            previousResult.textContent = result;
            containsDot = false;
        }
    }
    else {
        let num1 = parseFloat(prev.slice(0, prev.length - 1));
        let operator = prev.at(prev.length - 1);
        let num2 = parseFloat(display);
        display = "";
        previousResult.textContent = "";
        currentDisplay.textContent = operate(num1, num2, operator);
        operatorFlag = false;
        containsDot = false;
    }
});


let containsDot = false;
let dot = document.querySelector(".dot");
dot.addEventListener("click", (e) => {
    if (!containsDot) {
        display += ".";
        currentDisplay.textContent = display;
        containsDot = true;
    }
})

let backspace = document.querySelector(".backspace");
backspace.addEventListener("click", () => {
    let lastChar = display.at(-1);
    if("123467890+-x%÷".includes(lastChar)){
        operatorFlag=false;
    }
    if(lastChar==="."){
        containsDot=false;
    }

    if(display.length===0){
        display=previousResult.textContent.slice(0,previousResult.textContent.length);
        currentDisplay.textContent=display;
        previousResult.textContent="";
        operatorFlag=false;
    }
    if (display.length ===1) {
        display = previousResult.textContent;
        currentDisplay.textContent = display;
        previousResult.textContent = "";
    }
    else {
        display = display.slice(0, display.length - 1);
        currentDisplay.textContent = display;
    }

    
    
});
