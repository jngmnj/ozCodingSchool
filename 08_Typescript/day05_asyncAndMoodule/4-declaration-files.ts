// 타입선언/정의 파일
/*
 * 타입스크립트는 자바스크립트로 컴파일되기 때문에
 * 자바스크립트로 작성된 라이브러리들을 사용할 수 있다.
 * 하지만 자바스크립트로 작성된 라이브러리들은 타입 정보가 없기 때문에
 * 타입스크립트에서 사용할 수 없다.
 * 그래서 타입스크립트에서는 타입 선언 파일을 사용하여
 * 자바스크립트로 작성된 라이브러리의 타입 정보를 제공한다.
 * 타입 선언 파일은 .d.ts 확장자를 가진 파일로
 * 타입스크립트 컴파일러가 타입 정보를 알 수 있도록 도와준다.*
 */

console.log('타입 선언 파일 예제');
// 마우스 우클릭 => Go to definition => lib.dom.d.ts

import _ from "lodash";
// lodash는 자바스크립트로 작성된 라이브러리이지만
// 타입 선언 파일이 제공되기 때문에 타입스크립트에서 사용할 수 있다.

let max = _.max([1, 2, 3]); // 3
console.log(max);
let shuffledArray = _.shuffle([1, 2, 3, 4, 5]); 
console.log(shuffledArray);

// tsconfig.json 파일에 "esModuleInterop": true, 설정 해야한다. 
// 이 설정은 CommonJS 모듈을 ES6 모듈로 변환할 때
// import 문을 사용할 수 있도록 해준다.
// Deafult export가 없는 CommonJS 모듈을 import 할 때는 import * as _ from "lodash"; 와 같이 사용해야 한다.

