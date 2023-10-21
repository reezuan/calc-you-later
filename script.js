function initialiseCalculator() {
    document.addEventListener("click", event => {
        let keyPressed = event.target.getAttribute("data-key");
        callCalculatorFunction(keyPressed);
    });
    
    document.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
        
        let keyPressed = event.key;
        callCalculatorFunction(keyPressed);
    });
}

function callCalculatorFunction(keyPressed) {
    const numberButtons = Array
        .from(document.querySelectorAll(".number"))
        .reduce((arr, item) => {
            arr.push(item.getAttribute("data-key"));
            return arr;
        }, []);

    const operatorButtons = Array
        .from(document.querySelectorAll(".operator"))
        .reduce((arr, item) => {
            arr.push(item.getAttribute("data-key"));
            return arr;
        }, []);

    const decimalButton = ["."];
    const deleteButton = ["Backspace"];
    const clearButton = ["Escape"];
    const evaluateButtons = ["=", "Enter"];

    if (numberButtons.includes(keyPressed) || decimalButton.includes(keyPressed)) {
        calculator.appendNumber(keyPressed);
    } else if (operatorButtons.includes(keyPressed)) {
        switch (keyPressed) {
            case "*":
                calculator.chooseOperation("×");
                break;
            case "/":
                calculator.chooseOperation("÷");
                break;
            default:
                calculator.chooseOperation(keyPressed);
        }

        // calculator.chooseOperation(keyPressed);
    } else if (deleteButton.includes(keyPressed)) {
        calculator.deleteNumber();
    } else if (clearButton.includes(keyPressed)) {
        calculator.resetValues();
        calculator.resetDisplay();
    } else if (evaluateButtons.includes(keyPressed)) {
        calculator.evaluateExpression();
    }
}

function createCalculator() {
    const lastOperationDisplay = document.querySelector(".last-operation");
    const currentOperationDisplay = document.querySelector(".current-operation");
    
    let currValue = "0";
    let prevValue = "";
    let op = null;

    return {
        currentValue: currValue,
        previousValue: prevValue,
        operation: op,
        clearIntroMessage: function() {
            lastOperationDisplay.textContent = this.previousValue;
            lastOperationDisplay.classList.remove("initial");
                
            currentOperationDisplay.textContent = this.currentValue;
            currentOperationDisplay.classList.remove("initial");
        },
        appendNumber: function(number) {
            if (lastOperationDisplay.classList.contains("initial")) {
                this.clearIntroMessage();
            }

            if (number === "." && this.currentValue.includes(".")) {
                return;
            }
            
            if (currValue === "0" && number !== ".") {
                currValue = number;
            } else {
                currValue += number;
            }
            
            this.currentValue = currValue;
            currentOperationDisplay.textContent = this.currentValue;
            console.log(`Current value is ${this.currentValue}`);
            console.log(`Previous value is ${this.previousValue}`);
        },
        deleteNumber: function() {
            if (currValue == "0" || currValue.length == 1) {
                currValue = "0";
                this.currentValue = currValue;
            } else if (currValue.length > 1) {
                currValue = currValue.slice(0, currValue.length - 1);
                this.currentValue = currValue;
            }

            currentOperationDisplay.textContent = this.currentValue;
        },
        chooseOperation: function(operator) {
            if (prevValue === "") {
                prevValue = currValue;
                this.previousValue = prevValue;
            } else {
                prevValue = this.operate[this.operation](prevValue, currValue).toString();
                this.previousValue = prevValue;
            }

            currValue = "0";
            this.currentValue = currValue;

            op = operator;
            this.operation = op;
            
            lastOperationDisplay.textContent = this.getPreviousOperation();
        },
        getPreviousOperation: function() {
            return `${this.previousValue} ${this.operation}`;
        },
        getFinalExpression: function() {
            return `${this.previousValue} ${this.operation} ${this.currentValue} =`;
        },
        operate: {
            "+": (prev, current) => {return +prev + +current},
            "-": (prev, current) => {return +prev - +current},
            "×": (prev, current) => {return +prev * +current},
            "÷": (prev, current) => {return +prev / +current}
        },
        evaluateExpression: function() {
            if (this.previousValue === "") {
                return;
            }
            
            lastOperationDisplay.textContent = this.getFinalExpression();
            
            switch (this.operation) {
                case "+":
                    currValue = +this.previousValue + +this.currentValue;
                    break;
                case "-":
                    currValue = +this.previousValue - +this.currentValue;
                    break;
                case "×":
                    currValue = +this.previousValue * +this.currentValue;
                    break;
                case "÷":
                    currValue = +this.previousValue / +this.currentValue;
            }

            this.currentValue = currValue.toString();
            currentOperationDisplay.textContent = this.currentValue;
            this.resetValues(this.currentValue);
        },
        resetValues: function(current = "0") {
            currValue = current;
            this.currentValue = currValue;
            
            prevValue = "";
            this.previousValue = prevValue;

            op = null;
            this.operation = op;
        },
        resetDisplay: function() {
            lastOperationDisplay.textContent = this.previousValue;
            currentOperationDisplay.textContent = this.currentValue;
        }
    }
}

// window.onload = function() {
//     document.querySelector(".button-grid").focus();
// }

const calculator = createCalculator();

initialiseCalculator();