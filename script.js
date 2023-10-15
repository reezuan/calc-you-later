// Features to build:
//
// 1) Build in functionality for '=' button
// 2) Separate function for updating previous display & choosing operation

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
    const equalButton = document.querySelector("#equal");

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

    deleteButton.addEventListener("click", event => {
        calculator.deleteNumber();
        currentOperationDisplay.textContent = calculator.currentValue;
    });

    numberButtons.forEach((button) => {
        button.addEventListener("click", event => {
            if (lastOperationDisplay.classList.contains("initial")) {
                lastOperationDisplay.textContent = calculator.previousValue;
                lastOperationDisplay.classList.remove("initial");
                currentOperationDisplay.classList.remove("initial");
            }
            
            calculator.appendNumber(event.target.id);
            currentOperationDisplay.textContent = calculator.currentValue;
        });
    });

    decimalButton.addEventListener("click", event => {
        if (!calculator.currentValue.includes(".")) {
            calculator.appendNumber(".");
            currentOperationDisplay.textContent = calculator.currentValue;
        }
    });

    operatorButtons.forEach((button) => {
        button.addEventListener("click", event => {
            calculator.chooseOperation(event.target.id);
            lastOperationDisplay.textContent = calculator.updatePreviousOperation();
        });
    });

    equalButton.addEventListener("click", event => {
        // Update the previous operation display.
        // Change the current operation display to the final value.

        lastOperationDisplay.textContent = calculator.updateFinalExpression();
        currentOperationDisplay.textContent = calculator.evaluateExpression();
        calculator.resetValues(calculator.evaluateExpression().toString());
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
        },
        deleteNumber: function() {
            if (currValue == "0" || currValue.length == 1) {
                currValue = "0";
                this.currentValue = currValue;
            } else if (currValue.length > 1) {
                currValue = currValue.slice(0, currValue.length - 1);
                this.currentValue = currValue;
            }
        },
        chooseOperation: function(operator) {
            if (prevValue === "") {
                prevValue = currValue;
                this.previousValue = prevValue;
            } else {
                prevValue = this.operate[this.operation](prevValue, currValue);
                this.previousValue = prevValue;
            }

            currValue = "0";
            this.currentValue = currValue;

            op = operator;
            this.operation = op;
        },
        updatePreviousOperation: function() {
            return `${this.previousValue} ${this.operation}`;
        },
        updateFinalExpression: function() {
            return `${this.previousValue} ${this.operation} ${this.currentValue} =`;
        },
        operate: {
            "+": (prev, current) => {return +prev + +current},
            "-": (prev, current) => {return +prev - +current},
            "×": (prev, current) => {return +prev * +current},
            "÷": (prev, current) => {return +prev / +current}
        },
        evaluateExpression: function() {
            switch (this.operation) {
                case "+":
                    return +this.previousValue + +this.currentValue;
                case "-":
                    return +this.previousValue - +this.currentValue;
                case "×":
                    return +this.previousValue * +this.currentValue;
                case "÷":
                    return +this.previousValue / +this.currentValue;
            }
        },
        resetValues: function(current = "0") {
            currValue = current;
            this.currentValue = currValue;
            
            prevValue = "";
            this.previousValue = prevValue;

            op = null;
            this.operation = op;
        }
    }
}

initialiseCalculator();