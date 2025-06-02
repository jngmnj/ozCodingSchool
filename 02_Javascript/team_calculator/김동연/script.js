const display = document.querySelector('.display')
const clear = document.querySelector(".clear")
const padsNum = document.querySelectorAll('.pads button')
const decimal = document.querySelector(".decimal")

let operator = null;
let firstOperand = null;
let secondOperand = null;

padsNum.forEach(function(bts){
    bts.addEventListener('click', function(e){
        const btEvent = e.target.textContent;

        if(e.target.classList.contains("number")) {
            if(display.textContent === "0") {
                display.textContent = btEvent;
            } else {
                display.textContent += btEvent;
            }
        } 
        //숫자 두개 출력
        if(firstOperand === null){
            if(e.target.classList.contains("operator")){
                firstOperand = display.textContent;
                operator = btEvent;
            console.log(`firstOperand: ${firstOperand}, operator: ${operator}`)
            }
        } else if(secondOperand === null){
            secondOperand = btEvent;
            display.textContent = secondOperand
        }   

        //소수점 중복 방지
        if(e.target.classList.contains("decimal")) {
            if (!display.textContent.includes(".")) {
                display.textContent += "."; 
            }
        }

        //equal 
        if(e.target.classList.contains("equal")) {
            if (firstOperand !== null && operator !== null && secondOperand !== null) {
                const result = calculate(Number(firstOperand), Number(secondOperand), operator);                
                display.textContent = result;
                resetCalc()
            }
        }

        //clear
        if(e.target.classList.contains("clear")) {
            display.textContent = "0";
            resetCalc()
        }
    });
});

//연산자 함수
function calculate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        default:
            return 0;
    }
}

//초기화 함수
function resetCalc() {
    firstOperand = null;
    secondOperand = null;
    operator = null;
}