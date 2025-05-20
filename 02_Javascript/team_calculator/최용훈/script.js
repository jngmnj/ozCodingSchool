const button = document.querySelectorAll(".button");
const operatorBtn = document.querySelectorAll(".operator");
const display = document.querySelector(".display");
const number = document.querySelectorAll(".number");
const point = document.querySelector(".point");
const clear = document.querySelector(".clear");
const equal = document.querySelector(".equal");

let firstOperand = null,
  operator = null,
  secondOperand = null,
  isoperatorCheck = false, // (* / + -) 클릭 후 숫자 버튼 작동 시 디스플레이 숫자 clear 여부 확인 용
  isequalCheck = false;

// 연산기호 버튼 클릭
operatorBtn.forEach((item) => {
  item.addEventListener("click", (e) => {
    // 조건 1 (연산 null  isequalCheck  null)
    if (operator === null && isequalCheck === false) {
      firstOperand = display.textContent; // 두번째 계산때는 적용이 안되게 해야함

      // 2 조건( 연산 null isequalCheck 있을때)
    } else if (operator === null && isequalCheck !== false) {
      // = 연산 후 결과값이 fist 로 받아짐 (완료)
      // 연산자 버튼 클릭 시 first  입력은 건너뛰어야함
      // 숫자 입력 (완료)
      // 3 조건(연산 있고 isequalCheck 있고))일 경우
    } else if (operator !== null && isequalCheck !== false) {
      secondOperand = display.textContent;
      display.textContent = calculate(firstOperand, operator, secondOperand);
      firstOperand = display.textContent;
      // second 에 디스플레이 값 저장 후 연산 시행
    }

    isoperatorCheck = true; // 숫자 버튼 클릭 시 연산 입력 내용 확인용
    operator = e.target.textContent;
    console.log("1번째값", firstOperand);
    console.log("연산자", operator);
    console.log("2번째값", secondOperand);
    // }
  });
});

// = 기호 버튼 클릭 시 계산
equal.addEventListener("click", (e) => {
  secondOperand = display.textContent;
  if (secondOperand === firstOperand && operator === null) {
    // "=" 연속 입력 시 디스플레이 값 삭제 방지
  } else {
    display.textContent = calculate(firstOperand, operator, secondOperand);
    firstOperand = display.textContent;
    operator = null;
    // secondOperand = null;
    isequalCheck = e.target.textContent;
  }
});

// calculate 함수
function calculate(firstOperand, operator, secondNumber) {
  num1 = Number(firstOperand);
  num2 = Number(secondNumber);
  if (operator === "/") {
    return num1 / num2;
  } else if (operator === "*") {
    return num1 * num2;
  } else if (operator === "-") {
    return num1 - num2;
  } else if (operator === "+") {
    return num1 + num2;
  }
}

// console 에 버튼값 표시
button.forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log(e.target.textContent);
  });
});

//display 에 number 버튼값 표시
number.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (display.textContent === "0" || isoperatorCheck !== false) {
      display.textContent = e.target.textContent;
      isoperatorCheck = false; // 숫자 입력 후 연산 입력 내용 해제
    } else {
      display.textContent += e.target.textContent;
    }
  });
});

// 도전 미션 소수점 추가
point.addEventListener("click", (e) => {
  if (!display.textContent.includes(".")) {
    display.textContent += e.target.textContent;
    return;
  }
});

//clear 기능 추가
clear.addEventListener("click", (e) => {
  display.textContent = 0;
  firstOperand = null;
  operator = null;
  secondOperand = null;
  isoperatorCheck = false;
  isequalCheck = false;
});

// 요구 사항
// 연산자 버튼을 반복해서 눌렀을 때 이전 연산을 수행하고 새로운 연산을 시작할 수 있도록 구현하세요.
// = 버튼을 눌러서 계산이 된 다음, 연사자1를 누르고 새로운 숫자를 입력하고 연산자2 버튼을 누르면, 먼저 디스플레이에 있었던 값(첫계산결과)이
// firstOperand, 새로운 숫자를 secondOperand로 해서 계산이 이루어지도록 합니다.

// 구현 단계
// = 버튼을 눌러서 첫계산이 완료된 후, 계산된 값을 firstOperand로 저장합니다.
// 연산자 버튼을 누르면 연산자를 operator로 저장합니다.
// 새로운 숫자를 입력하고 다시 연산자를 누르면, 현재디스플레이값을 secondOperand에 넣고 secondOperand과 operator로 계산을 합니다.
// 계산 결과를 디스플레이에 표시하고, firstOperand를 결과 값으로 업데이트합니다.
