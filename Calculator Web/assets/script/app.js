
const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};
 
const updateDisplay = () => {
    document.querySelector(".display-number").innerText = calculator.displayNumber;
} /* end updateDisplay() */
 
const clearCalculator = () => {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
} /* end clearCalculator() */
 
const inputDigit = digit => {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
} /* end inputDigit() */

 
const handleOperator = operator => {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
        calculator.displayNumber = '0';
    } else {
        alert('Operator already declare')
    }
} /* end handleOperator() */

const displayResult = document.querySelector('.display-result')
const clearResult = () => {
    displayResult.innerText = 'Your result show here..';
    displayResult.classList.toggle('dr-color');
} /* end clearResult() */
 
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', event => {
 
        
        const target = event.target;
 
                if (target.classList.contains('clear') || target.classList.contains('fs')) {
                    clearCalculator();
                    clearResult();
                    updateDisplay();
                    return;
                }
    
        
                if (target.classList.contains('equals')) {
                    performCalculation();
                    updateDisplay();
                    return;
                }
        
                if (target.classList.contains('operator')) {
                    handleOperator(target.innerText)
                    return;
                }
        
                inputDigit(target.innerText);
                updateDisplay()

    });
} /* end for */

const performCalculation = () => {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Operator not declare yet");
        return;
    }
    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else if (calculator.operator === "-") {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    } else if (calculator.operator === "%") {
        result = parseInt(calculator.firstNumber) % parseInt(calculator.displayNumber)
    } else if (calculator.operator === "÷") {
        result = parseInt(calculator.firstNumber) / parseInt(calculator.displayNumber)
    } else if (calculator.operator === "×") {
        result = parseInt(calculator.firstNumber) * parseInt(calculator.displayNumber)
    } else if (calculator.operator === "Χ²") {
        result = parseInt(calculator.firstNumber) * parseInt(calculator.firstNumber)
    } 
  
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
     
    const putResult = (history) => {
        document.querySelector('.display-result')
        .innerText = `${history.operator === "Χ²" ? 
            history.firstNumber + '²' :
            history.firstNumber + ' ' + history.operator + ' ' + history.secondNumber} = ${history.result}`;

    }

    putResult(history);
    calculator.displayNumber = result;
 } /*end performCalculation()*/

const span = document.createElement('span')
    span.textContent = 'C'
    span.setAttribute('class','icon-mini')

 function minimize() {
    const hiddenEl = document.querySelector('.cal')
    hiddenEl.setAttribute('hidden', true)

    document.body.appendChild(span)

    const icon = document.querySelector('.icon-mini')
    icon.addEventListener('click', () => {
        hiddenEl.removeAttribute('hidden')
        const spn = document.querySelector('.icon-mini')
        spn.parentNode.removeChild(spn)
    })
 }