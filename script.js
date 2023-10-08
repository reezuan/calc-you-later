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

    numberButtons.forEach((button) => {
        button.addEventListener("click", event => {
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
            prevValue = currValue;
            this.previousValue = prevValue;

            currValue = "0";
            this.currentValue = currValue;

            op = operator;
            this.operation = op;

            return `${this.previousValue} ${this.operation}`;
        },
        operate: function() {
            
            
            currValue = "";
            prevValue = "";
            operation = null;
        }
    }
}



function main() {
    initialiseCalculator();
}

main();