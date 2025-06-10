/*
 * DOM
 * JS에서 제공되는 모든 DOM API를 그대로 사용
 * 타입 정의 파일 제공     lib.dom.d.ts
 * HTMLElement, div, a, p, head
 */

const myDiv = document.getElementById("myDiv");

// e 마우스 이벤트 타입이 자동 지정
myDiv?.addEventListener("click", (e: MouseEvent | KeyboardEvent) => {
  //로직 구현
  if (e instanceof MouseEvent) {
    const x = e.clientX;
    const y = e.clientY;
    return;
  }
  if (e instanceof KeyboardEvent) {
    console.log(e.code); // 키보드 이벤트의 경우 코드 출력
    return;
  }
});
