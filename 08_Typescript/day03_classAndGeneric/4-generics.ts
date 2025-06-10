/*
 * Generics in TypeScript
 * Generics는 타입을 매개변수로 받아 다양한 타입에 대해 재사용 가능한 코드를 작성할 수 있게 해줍니다.
 * 이를 통해 코드의 유연성과 재사용성을 높일 수 있습니다.
 */

// <T> : Generics
function genericFunction<T>(arg: T): T {
  return arg;
}
// Example usage
const numberResult = genericFunction<number>(42);

interface GenericInterface<T> {
  value: T;
}

class GenericClass<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

//  Array
let numbers: Array<number> = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

let div = document.querySelector<HTMLDivElement>("#myDiv");
let button = document.querySelector<HTMLButtonElement>("#myButton");
// let button = document.querySelector("#myButton"); // Element || null

// 만약 지정하지 않으면 button의 속성을 사용하지 못함
// button.click();
button?.click(); // Optional chaining을 사용하여 null 체크

// 전달하는 타입에 따라 함수가 동작
function getFirstElement<T>(arr: T[]): T | undefined {
    if(!arr.length) {
        return undefined; // 배열이 비어있을 경우 null 반환
    }
    return arr[0]; // 배열의 첫 번째 요소 반환
}

// 하나의 함수로 다양한 타입의 배열을 처리할 수 있다.
const firstNumber = getFirstElement(numbers);
const firstString = getFirstElement(strings); 


/*
* Generic Interface
* 인터페이스에서도 Generics를 사용할 수 있습니다.
* 이를 통해 다양한 타입의 객체를 정의할 수 있습니다.
*/

// interface strDict {
//     [key: string]: string;
// }

interface GenericInterface<T> {
    [key: string]: T;
}

let strObj: GenericInterface<string> = {
  value: "Hello, Generics!",
};
let numObj: GenericInterface<number> = {
  value: 42,
};

// 제네릭 장점: 하나이상의 파라미터를 지원한다. 
// 키와 값을 모두 제네릭으로 정의할 수 있다.  
interface Pair<K, V> {
  key: K;
  value: V;
}

let pair: Pair<string, number> = {
  key: "age",
  value: 30,
};

let pair2: Pair<number, string[]> = {
  key: 1,
  value: ["apple", "banana", "cherry"],
};