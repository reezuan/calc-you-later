// Features to build:
//
// 1) Build in functionality for 'Clear' button
// 2) Build in functionality for 'Delete' button
// 3) Build in functionality for '=' button

const calculator = createCalculator();

function initialiseCalculator() {
    const lastOperationDisplay = document.querySelector(".last-operation");
    const currentOperationDisplay = document.querySelector(".current-operation");
    const topRowButtons = document.querySelectorAll(".top-row");
    const clearButton = document.querySelector(".clear-button");
    const deleteButton = document.querySelector(".delete-button");
    const numberButtons = document.querySelectorAll(".number");
    const decimalButton = document.querySelector(".decimal");
    const operatorButtons = document.querySelectorAll(".operator");

    topRowButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (lastOperationDisplay.classList.contains("initial")) {
                lastOperationDisplay.textContent = calculator.previousValue;
                lastOperationDisplay.classList.remove("initial");
                
                currentOperationDisplay.textContent = calculator.currentValue;
                currentOperationDisplay.classList.remove("initial");
            }
        });
    });

    clearButton.addEventListener("click", event => {
        calculator.resetValues();
        lastOperationDisplay.textContent = calculator.previousValue;
        currentOperationDisplay.textContent = calculator.currentValue;
    });

    numberButtons.forEach((button) => {
        button.addEventListener("click", event => {
            if (lastOperationDisplay.classList.contains("initial")) {
                lastOperationDisplay.textContent = calculator.previousValue;
                lastOperationDisplay.classList.remove("initial");
                currentOperationDisplay.classList.remove("initial");
            }
            
            currentOperationDisplay.textContent = calculator.appendNumber(event.target.id);
        });
    });

    decimalButton.addEventListener("click", event => {
        if (!calculator.currentValue.includes(".")) {
            currentOperationDisplay.textContent = calculator.appendNumber(".");
        }
    });

    operatorButtons.forEach((button) => {
        button.addEventListener("click", event => {
            lastOperationDisplay.textContent = calculator.chooseOperation(event.target.id);
        });
    });
}

function createCalculator() {
    let currValue = "0";
    let prevValue = "";
    let op = null;

    return {
        currentValue: currValue,
        previousValue: prevValue,
        operation: op,
        appendNumber: function(number) {
            if (currValue === "0") {
                currValue = number;
            } else {
                currValue += number;
            }
            
            this.currentValue = currValue;
            return currValue;
        },
        chooseOperation: function(operator) {
            if (prevValue === "") {
                prevValue = currValue;
                this.previousValue = prevValue;
            } else {
                prevValue = this.operate[operator](prevValue, currValue)
                this.previousValue = prevValue;
            }

            currValue = "0";
            this.currentValue = currValue;

            op = operator;
            this.operation = op;

            return `${this.previousValue} ${this.operation}`;
        },
        operate: {
            "+": (prev, current) => {return prev + current},
            "-": (prev, current) => {return prev - current},
            "×": (prev, current) => {return prev * current},
            "÷": (prev, current) => {return prev / current}
        },
        resetValues: function() {
            currValue = "0";
            this.currentValue = currValue;
            
            prevValue = "";
            this.previousValue = prevValue;

            op = null;
            this.operation = op;
        }
    }
}

function main() {
    initialiseCalculator();
}

main();