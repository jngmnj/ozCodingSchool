// draw 함수 따로 작성해서 재사용가능하게 하고
// drawBtn.addEventListener('click', draw);
// 공 그리는 부분 setInterval로 1초마다 그리기
// setInterval(drawBall, 1000);
// 리셋할때 화면에 있는 공들도 지우기

const dateEl = document.querySelector("#date");
const numbersEl = document.querySelector("#numbers");
const drawBtn = document.querySelector("#btn-draw");
const resetBtn = document.querySelector("#btn-reset");

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
dateEl.textContent = `${year}년 ${month}월 ${day}일`;

let numbers = [];
let index = 0;

const paintBall = (num) => {
  const ball = document.createElement("div");
  ball.className = "ball";
  ball.textContent = num;
  numbersEl.appendChild(ball);
};

const drawBall = () => {
  while (numbers.length < 6) {
    const number = Math.floor(Math.random() * 45) + 1;
    if (numbers.indexOf(number) === -1) {
      // includes()도 가능
      numbers.push(number);
    }
  }

  // 정렬
  numbers.sort((a, b) => a - b);

  // 1초마다 공 그리기
  const intervalId = setInterval(() => {
    if (numbers.length <= index) {
      clearInterval(intervalId);
      console.log("clearInterval");
      index = 0;
      return;
    }
    paintBall(numbers[index]);
    index++;
  }, 1000);
};

const resetBall = () => {  
    // numbers.splice(0, 6);
//   numbers.length = 0; // 배열 비움
    numbers = [];
  numbersEl.innerHTML = "";
  drawBall();
}


drawBtn.addEventListener("click", drawBall);

resetBtn.addEventListener("click", resetBall);
