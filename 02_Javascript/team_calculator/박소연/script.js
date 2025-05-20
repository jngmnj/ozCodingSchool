const display = document.querySelector('.display')
const numbers = document.querySelectorAll('.number')
const clear = document.querySelector(".clear")
const dot = document.querySelector(".dot")
const operators = document.querySelectorAll(".operator")
const equal = document.querySelector('.equal');

let firstOperand = null;
let operator = null;
let resetDisplay = false;

//숫자 입력
numbers.forEach(function(num){
    num.addEventListener('click', function(e){
        const numBtnEvent = e.target.textContent;
        
        if (resetDisplay) {
            display.textContent = numBtnEvent; //클릭한 숫자로 보이게
            resetDisplay = false; // 이후 숫자는 이어서 입력가능
        } else {
            if (display.textContent === "0") {
                display.textContent = numBtnEvent;
            } else {
                display.textContent += numBtnEvent;
            }
        }
        console.log(numBtnEvent);
    })
})

// 연산자 버튼 클릭 이벤트
operators.forEach(function(op){
    op.addEventListener('click', function(e){
        if (firstOperand === null) {
            firstOperand = parseFloat(display.textContent);
        } else if (operator) {
            // 연산자를 첫번째 계산 다음 연속으로 누르면 현재 연산을 먼저 수행
            firstOperand = calculate(firstOperand, parseFloat(display.textContent), operator);
            display.textContent = firstOperand;
        }
        operator = e.target.textContent;
        resetDisplay = true;
        console.log("firstOperand:", firstOperand, "operator:", operator);
    })
})

// = 버튼
equal.addEventListener('click', function() {
    if (firstOperand !== null && operator !== null) {
        const secondOperand = parseFloat(display.textContent);
        const result = calculate(firstOperand, secondOperand, operator);
        display.textContent = result; // 결과 표시
        firstOperand = result; // 연속 계산을 위해 결과값을 firstOperand로 저장
        operator = null; // 연산자 초기화
        resetDisplay = true;
    }
});

// calculate 함수 (연산 수행)
function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case "+":
            return firstOperand + secondOperand;
        case "-":
            return firstOperand - secondOperand;
        case "*":
            return firstOperand * secondOperand;
        case "÷":
            return secondOperand !== 0 ? firstOperand / secondOperand : "Error"; // 0으로 나누기 방지
        default:
            return secondOperand;
    }
}

// AC 버튼
clear.addEventListener('click', function(){
    display.textContent = "0";
    firstOperand = null;
    operator = null;
    resetDisplay = false;
})

// 소수점 중복 방지
dot.addEventListener('click', function(){
    if (!display.textContent.includes(".")) {
        display.textContent += "."; 
    }
});
