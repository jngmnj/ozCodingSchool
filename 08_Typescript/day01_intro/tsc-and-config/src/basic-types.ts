// 1. 문자열
const a: string = "";
const b: string = "";
const c: string = ``; // 템플릿 리터럴

let myName: string = "Steve";
let message: string = `Hello, ${myName}`;

myName.toLocaleUpperCase();

mesasge = 123;


// 2. 숫자
let n: number = 100;

n = "100"; // 문자열로 할당하면 에러 발생
n.toUpperCase(); // 숫자에 문자열 메서드를 호출하면 에러 발생

let count: number = 10;
let price: number = 9.99;
let temperature: number = -10;
let distance:number = 3.4e-5; // 지수

let total: number = count * price; 
let average: number = total / count;

// 특수값
let infinity: number = Infinity; // 무한대
let minusInfinity: number = - Infinity; // 음의 무한대
let iAmNotANumber: number = NaN; // Not a Number


// 3. Boolean
let isOpen: boolean = true;
let isCompleted: boolean = false;

if(isOpen) {
    console.log("hello we are open");
}
if(!isCompleted) {
    console.log("we are not completed yet");
}

// boolean은 논리연산자와 함께 사용
let isAvailable: boolean = isOpen && !isCompleted;

// 4. null: 의도적으로 값이 없음을 나타내는 타입
// 주의 - undefined: 값이 할당되지 않았음을 나타내는 타입

let user: string | null = null; 

function login(userName: string) {
    user = userName;
}

function logout() {
    user = null; // 로그아웃 시 user를 null로 설정
}

login("Steve");
logout();

// 5. any: 모든 타입을 허용
// 타입스크립트의 타입 시스템을 우회할 때 사용
// 타입 안정성을 잃게 되므로 주의해서 사용해야 함. 최대한 사용X
// 잠시 타입을 우회하고 싶을 때 사용
let someValue: any;

someValue.toString();
someValue = false;
someValue.toFixed(); 

