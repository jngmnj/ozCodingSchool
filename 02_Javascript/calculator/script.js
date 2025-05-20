// 요구사항
// 1. 디스플레이에 숫자를 입력한 다음 연산기호를 누르면 디스플레이에 있는 숫자를 firstOperand로 저장하고 연산기호를 기억합니다.
// 2. 연산기호를 누른 후 디스플레이에 다른 숫자를 입력하면 새로운 숫자가 디스플레이에 입력되도록 합니다.
// 3. 매개 변수로 두 숫자를 입력 받아서 결과를 반환하는 `calculate` 함수를 만듭니다.
// 4. `=` 버튼을 누르면 `firstOperand`, `operator`, `secondOperand`를 전달하여 계산이 되도록 합니다.

// 도전미션
// 1. 연산자 버튼을 반복해서 눌렀을 때 이전 연산을 수행하고 새로운 연산을 시작할 수 있도록 구현하세요.
// 2. `=` 버튼을 눌러서 계산이 된 다음, 새로운 숫자를 입력하고 연산자 버튼을 누르면, 먼저 디스플레이에 있었던 값이 `firstOperand`, 새로운 숫자를 `secondOperand`로 해서 계산이 이루어지도록 합니다.

// const buttons = document.querySelectorAll(".button");
const displayNumber = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");
const functions = document.querySelectorAll(".function");
const numbers = document.querySelectorAll(".number");

const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const decimal = document.querySelector(".decimal");

let firstOperand = null;
let secondOperand = null;
let operator = null;
let isSecondStart = true;

// isSecondStart:  false되는시점이 있음 연산 여러개하다가
numbers.forEach((item) => {
  item.addEventListener("click", () => {
    const itemCont = item.textContent;
    // 연산기호 버튼이 클릭된 후 두 번째 숫자를 입력하면 디스플레이의 값이 새로 입력한 숫자로 바뀝니다.
    if (operator && isSecondStart) {
      displayNumber.textContent = itemCont;
      isSecondStart = false;
    } else {
      if (displayNumber.textContent === "0") {
        displayNumber.textContent = itemCont;
      } else {
        displayNumber.textContent += itemCont;
      }
    }
    if (displayNumber.textContent.length > 8) {
      displayNumber.style.fontSize = "1.5rem";
    }
  });
});

// 연산
const calculate = (firstOperand, operator, secondOperand) => {
  let result = 0;
  switch (operator) {
    case "+":
      result = parseFloat(firstOperand) + parseFloat(secondOperand);
      break;
    case "-":
      result = parseFloat(firstOperand) - parseFloat(secondOperand);
      break;
    case "*":
      result = parseFloat(firstOperand) * parseFloat(secondOperand);
      break;
    case "/":
      result = parseFloat(firstOperand) / parseFloat(secondOperand);
      break;
    default:
      break;
  }
  displayNumber.textContent = result;
  operator = null;
  firstOperand = result;
  isSecondStart = true;
  console.log(
    `계산후 초기화 operator: ${operator}, firstOperand: ${firstOperand}`,
    "isSecondStart: ",
    isSecondStart
  );
};

operators.forEach((item) => {
  item.addEventListener("click", () => {
    // 연산자 버튼이 클릭될 때 firstOperand와 operator가 이미 존재하면, ??
    // 현재 디스플레이 값을 secondOperand로 저장하고 calculate 함수를 호출하여 계산을 수행합니다.
    if (firstOperand && operator && !isSecondStart) {
      // console.log(displayNumber.textContent);
      calculate(firstOperand, operator, displayNumber.textContent);
    }
    firstOperand = displayNumber.textContent;
    operator = item.textContent;

    console.log(`First Operand: ${firstOperand}, Operator: ${operator}`);
  });
});

equal.addEventListener("click", () => {
  calculate(firstOperand, operator, displayNumber.textContent);
});
clear.addEventListener("click", () => {
  displayNumber.textContent = "0";
  firstOperand = null;
  operator = null;
  isSecondStart = true;
  displayNumber.style.fontSize = "3rem";
});
decimal.addEventListener("click", () => {
  if (!displayNumber.textContent.includes(".")) {
    displayNumber.textContent += ".";
  }
});

functions.forEach((item) => {});
