### JavaScript 배열 고차 함수 (Higher Order Functions)

배열 고차 함수는 다른 함수를 매개변수로 받거나 반환하는 함수로, 배열을 효과적으로 조작하는 데 사용됩니다. 대표적인 배열 고차 함수는 다음과 같습니다.



## 1. **forEach()**  
**배열의 각 요소를 순회하며 특정 작업을 수행할 때 사용**

```javascript
const arr = [1, 2, 3, 4, 5];

arr.forEach((num) => {
  console.log(num * 2);
});
```
**출력:**  
```
2
4
6
8
10
```
📌 *반환값이 없음 (`undefined`) -> 배열을 변경하지 않음*



## 2. **map()**  
**각 요소를 변환하여 새로운 배열을 생성할 때 사용**

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);

console.log(doubled);
```
**출력:**  
```javascript
[2, 4, 6, 8, 10]
```
📌 *새로운 배열을 반환, 원본 배열은 변경되지 않음*



## 3. **filter()**  
**조건을 만족하는 요소만 걸러내어 새로운 배열 생성**

```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(num => num % 2 === 0);

console.log(evenNumbers);
```
**출력:**  
```javascript
[2, 4, 6]
```
📌 *조건을 만족하는 요소만 남겨 새로운 배열을 반환*



## 4. **reduce()**  
**배열의 요소들을 누적하여 하나의 결과값을 반환**

```javascript
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

console.log(sum);
```
**출력:**  
```javascript
15
```
📌 *초기값(`0`)을 설정하고 각 요소를 누적하여 하나의 값으로 변환*



## 5. **some()**  
**배열 내 요소 중 하나라도 조건을 만족하면 `true` 반환**

```javascript
const numbers = [1, 3, 5, 7];

const hasEven = numbers.some(num => num % 2 === 0);

console.log(hasEven);
```
**출력:**  
```javascript
false
```
📌 *하나라도 조건을 만족하면 즉시 `true` 반환, 그렇지 않으면 `false`*



## 6. **every()**  
**모든 요소가 조건을 만족해야 `true` 반환**

```javascript
const numbers = [2, 4, 6, 8];

const allEven = numbers.every(num => num % 2 === 0);

console.log(allEven);
```
**출력:**  
```javascript
true
```
📌 *모든 요소가 조건을 만족해야 `true`, 하나라도 만족하지 않으면 `false`*



## 7. **find()**  
**조건을 만족하는 첫 번째 요소를 반환 (없으면 `undefined`)**

```javascript
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];

const user = users.find(user => user.age > 28);

console.log(user);
```
**출력:**  
```javascript
{ name: "Bob", age: 30 }
```
📌 *조건을 만족하는 첫 번째 요소만 반환*



## 8. **findIndex()**  
**조건을 만족하는 첫 번째 요소의 인덱스를 반환 (없으면 `-1`)**

```javascript
const numbers = [10, 20, 30, 40];

const index = numbers.findIndex(num => num > 25);

console.log(index);
```
**출력:**  
```javascript
2
```
📌 *조건을 만족하는 첫 번째 요소의 인덱스를 반환*



## 9. **sort()**  
**배열을 정렬 (기본적으로 유니코드 순서, 숫자 정렬 시 주의 필요)**

```javascript
const numbers = [5, 2, 9, 1, 7];

numbers.sort((a, b) => a - b);  // 오름차순 정렬

console.log(numbers);
```
**출력:**  
```javascript
[1, 2, 5, 7, 9]
```
📌 *주의: 원본 배열을 변경함*



## 10. **flat()**  
**중첩된 배열을 평탄화 (default depth: `1`)**

```javascript
const nestedArray = [1, [2, [3, 4]], 5];

const flatArray = nestedArray.flat(2);

console.log(flatArray);
```
**출력:**  
```javascript
[1, 2, 3, 4, 5]
```
📌 *숫자를 설정하여 특정 깊이까지 펼칠 수 있음*



### 💡 **정리**
| 함수명  | 설명 | 반환값 | 원본 변경 |
|--------|----|----|----|
| `forEach()`  | 각 요소에 대해 콜백 실행 | 없음 (`undefined`) | ❌ |
| `map()`  | 각 요소를 변환하여 새 배열 생성 | 새 배열 | ❌ |
| `filter()`  | 조건을 만족하는 요소만 남긴 새 배열 | 새 배열 | ❌ |
| `reduce()`  | 요소들을 누적하여 하나의 값 반환 | 단일 값 | ❌ |
| `some()`  | 하나라도 조건 만족하면 `true` | `true` or `false` | ❌ |
| `every()`  | 모든 요소가 조건 만족해야 `true` | `true` or `false` | ❌ |
| `find()`  | 조건 만족하는 첫 번째 요소 반환 | 요소 or `undefined` | ❌ |
| `findIndex()`  | 조건 만족하는 첫 번째 요소의 인덱스 반환 | 인덱스 or `-1` | ❌ |
| `sort()`  | 배열 정렬 | 정렬된 배열 | ✅ |
| `flat()`  | 중첩 배열 평탄화 | 평탄화된 배열 | ❌ |



이제 배열을 다룰 때 반복문 대신 **고차 함수**를 적극 활용하면 더 깔끔하고 가독성이 좋은 코드를 작성할 수 있습니다! 😊