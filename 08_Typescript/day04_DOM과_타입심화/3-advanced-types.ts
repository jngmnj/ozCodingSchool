// 고급타입

// 1. 교차 타입 (Intersection Types)
// 그때그때 필요한 타입을 조합하여 사용

type A = { name: string };
type B = { age: number };
type Person = A & B; // A와 B의 속성을 모두 포함하는 타입

const person: Person = {
  name: "Alice",
  age: 30,
};

type UserBase = { id: number };
type WithName = { name: string };
type WithEmail = { email: string };
type WithAge = { age: number };

type GuestUser = UserBase & WithName;
type User = UserBase & WithName & WithEmail & WithAge;

const guest: GuestUser = {
  id: 1,
  name: "Bob",
};
const user: User = {
  id: 2,
  name: "Charlie",
  email: "charlie1@example.com",
  age: 25,
};

// 2. 조건부 타입

// type ConditionalType<T> = T extends U ? X : Y;
// T가 U의 서브타입이면 X, 아니면 Y를 반환하는 타입

type IsNumber<T> = T extends number ? "Yes" : "No";

type Result1 = IsNumber<number>; // "Yes"
type Result2 = IsNumber<string>; // "No"

type JsonOrText<T extends "json" | "text"> = T extends "json" ? object : string;

type JsonData = JsonOrText<"json">; // object
type TextData = JsonOrText<"text">; // string

// 3. keyof 타입
// 객체의 키를 타입으로 추출
type MyObject = {
  name: string;
  age: number;
  isActive: boolean;
};
// MyObject의 키를 union 타입으로 추출하여 타입으로 사용
type MyObjectKeys = keyof MyObject; // "name" | "age" | "isActive"

// generic을 같이 사용 하는 경우
// 객체와 키를 받아 해당 키의 값을 반환하는 함수
// K가 T의 유효한 키임을 보장
function getProp<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const obj = { name: "Alice", age: 30, isActive: true };
const nameValue = getProp(obj, "name"); 
const ageValue = getProp(obj, "age"); 

const key: MyObjectKeys = "name"; // 유효한 키
type MyObjectValues = MyObject[MyObjectKeys]; // string | number | boolean
const value: MyObjectValues = "Alice"; // 유효한 값

// 4. 매핑타입 mapped types
// 기존 타입의 속성을 변형하여 새로운 타입 생성

type MappedType<T> = {
  [P in keyof T]: T[P];
}
// T: 원본타입
// [P in keyof T]: 각 타입의 키를 순회하며 새로운 타입을 생성
// P: 각 속성의 이름을 나타내는 타입 변수
// T[P]: 원본 타입의 각 키에 해당하는 값을 그대로 사용

type OptionalType<T> = {
  [P in keyof T]?: T[P]; // 모든 속성을 선택적으로 만듦
};

type ReadOnlyType<T> = {
  [P in keyof T]: Readonly<T[P]>; // 모든 속성을 읽기 전용으로 만듦
};

type PersonType = {
  name: string;
  age: number;
  isActive: boolean;
};
type OptionalPerson = OptionalType<PersonType>; // 모든 속성이 선택적
type ReadOnlyPerson = ReadOnlyType<PersonType>; // 모든 속성이 읽기 전용