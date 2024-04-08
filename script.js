document.addEventListener("DOMContentLoaded", function () {
  const display = document.querySelector("#display");
  const buttons = document.querySelectorAll("button");

  let currentExpression = "";

  buttons.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.id === "clear") {
        currentExpression = "";
        display.innerText = "";
      } else if (item.id === "backspace") {
        currentExpression = currentExpression.slice(0, -1);
        display.innerText = currentExpression;
      } else if (item.id === "equal") {
        try {
          const result = evaluateExpression(currentExpression);
          display.innerText = result.toFixed(5); // Round to 5 decimal places
          currentExpression = result.toString();
        } catch (error) {
          display.innerText = "Error";
          setTimeout(() => (display.innerText = ""), 2000);
        }
      } else {
        if (
          item.id === "*" ||
          item.id === "/" ||
          item.id === "%" ||
          item.id === "+"
        ) {
          currentExpression += item.id;
        } else {
          currentExpression += item.textContent;
        }
        display.innerText = currentExpression;
      }
    });
  });

  const themeToggleBtn = document.querySelector(".theme-toggler");
  const calculator = document.querySelector(".calculator");
  let isDark = true;
  themeToggleBtn.addEventListener("click", () => {
    calculator.classList.toggle("dark");
    themeToggleBtn.classList.toggle("active");
    isDark = !isDark;
  });

  function evaluateExpression(expression) {
    const operators = expression.match(/[+\-*/%]/g);
    const operands = expression.split(/[+\-*/%]/).map(parseFloat);

    let result = operands[0];
    for (let i = 1; i < operands.length; i++) {
      const operator = operators[i - 1];
      const operand = operands[i];
      switch (operator) {
        case "+":
          result += operand;
          break;
        case "-":
          result -= operand;
          break;
        case "*":
          result *= operand;
          break;
        case "/":
          if (operand === 0) {
            throw new Error("Division by zero");
          }
          result /= operand;
          break;
        case "%":
          result *= operand / 100;
          break;
        default:
          throw new Error("Invalid operator");
      }
    }
    return result;
  }
});
