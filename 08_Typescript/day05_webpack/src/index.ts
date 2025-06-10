import Dice from "./util/dice";

const labels = {
    button: "주사위를 굴려라!",
    result: "결과 : "
};
function main() {
  const button = document.createElement("button");
  button.textContent = labels.button;
  const resultDiv = document.createElement("div");

  document.body.append(button, resultDiv);
  const dice = new Dice();
  button.addEventListener("click", () => {
    const roll = dice.roll();
    resultDiv.textContent = `${labels.result} 당신은 ${roll}이(가) 나왔습니다! (주사위 면: ${dice.getSides()})`;
  });
}

main();