// optional
// TypeScript에서 선택적 속성을 정의하는 방법
// 선택적 속성은 객체 타입에서 특정 속성이 있을 수도 있고 없을 수도 있음을 나타냅니다.
// 선택적 속성을 정의할 때는 속성 이름 뒤에 물음표(?)를 붙입니다.
type Book = {
  title: string;
  author: string;
  publishedYear?: number;
};

const book1: Book = {
  title: "TypeScript Basics",
  author: "Jane Doe",
  publishedYear: 2022,
};

const book2: Book = {
  title: "Learning JavaScript",
  author: "John Smith",
};

console.log(book1);
console.log(book2);

// 2

type UserProfile = {
  username: string;
  bio?: string;
  website?: string;
};

function displayUserInfo(user: UserProfile): void {
  console.log(`Username: ${user.username}`);

  if (user.bio) {
    console.log(`Bio: ${user.bio}`);
  }

  if (user.website) {
    console.log(`Website: ${user.website}`);
  }
}

const userA: UserProfile = {
  username: "devAlice",
  bio: "Frontend developer",
};

const userB: UserProfile = {
  username: "codeBob",
  website: "https://codebob.dev",
};

displayUserInfo(userA);
displayUserInfo(userB);

// Record: 키 및 값의 타입을 지정하는 유틸리티 타입
type SpecificRoles = Record<"admin" | "editor" | "viewer", string>;

const specificRoles: SpecificRoles = {
  admin: "Administrator with full access",
  editor: "Editor with content management access",
  viewer: "Viewer with read-only access",
};

// 올바르게 타입을 정의하세요
type UserStatusDescriptions = Record<"active" | "inactive" | "banned", string>;

const statusDescriptions: UserStatusDescriptions = {
  active: "User is currently active",
  inactive: "User is not active",
  banned: "User has been banned",
};

// Utility Types: Pick, Omit, Partial, Required
/*
 * Pick: 특정 속성만 선택하여 새로운 타입을 만듭니다.
 * Omit: 특정 속성을 제외한 새로운 타입을 만듭니다.
 * Partial: 모든 속성을 선택적으로 만듭니다.
 * Required: 모든 속성을 필수로 만듭니다.
 */

interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
}

// 1. Employee에서 "id"와 "name"만 포함하는 타입을 정의하세요.
type BasicEmployee = Pick<Employee, "id" | "name">;

// 2. Employee에서 "salary"를 제외한 타입을 정의하세요.
type EmployeeWithoutSalary = Omit<Employee, "salary">;

// 3. Employee의 모든 속성을 선택적으로 바꾸세요.
type OptionalEmployee = Partial<Employee>;

// 4. Employee의 모든 속성을 필수로 바꾸세요.
type FullRequiredEmployee = Required<Employee>;

/* Type Alias
 * Type Alias는 타입에 이름을 붙이는 방법으로, 인터페이스와 유사하지만 더 유연합니다.
 * 함수, 튜플, 유니언 타입 등 다양한 타입을 정의할 수 있습니다.
 */

// 1. Type Alias 사용하기
type User = {
  name: string;
  email: string;
  age?: number;
};

const user: User = {
  name: "Alice",
  email: "alice@example.com",
};

console.log(user);

// 2. Type Alias & 유니온 타입
type TrafficLight = "red" | "yellow" | "green";
function getNextLight(current: TrafficLight): string {
  switch (current) {
    case "red":
      return "green";
    case "yellow":
      return "red";
    case "green":
      return "yellow";
  }
}

console.log(getNextLight("red")); // "green"
console.log(getNextLight("yellow")); // "red"

// 3. 객체 타입 확장
type Person = {
  name: string;
  age: number;
};

type Student = Person & {
  school: string;
};

const student: Student = {
  name: "Bob",
  age: 20,
  school: "XYZ University",
};

console.log(student);

// 4. Type Alias 확장 및 조합
// Type Alias
type BaseUser = { id: number; name: string };
type Admin = BaseUser & { role: "admin" };
type Customer = BaseUser & { purchaseHistory: string[] };
type UserType = Admin | Customer;

// ✅ 아래 객체들이 위 타입 기반으로 유효해야 합니다.
const admin: Admin = { id: 1, name: "Alice", role: "admin" };
const customer: Customer = {
  id: 2,
  name: "Bob",
  purchaseHistory: ["Laptop", "Phone"],
};

const users: UserType[] = [admin, customer];
console.log(users);

// Literal Types
/*
 * Literal Types는 특정 값만을 허용하는 타입입니다.
 * 문자열, 숫자, 불리언 등에서 사용됩니다.
 */

//   문제 1: Literal Type을 포함한 객체 타입
// ❗ 아래의 User 타입을 완성하세요.
type User = {
  role: "admin" | "user"; // "admin" 또는 "user"만 가능
  isActive: true; // true만 가능
};

// ❗ 아래의 user1과 user2가 올바른 값인지 확인하세요.
const user1: User = { role: "admin", isActive: true }; // ✅ 올바른 값?
const user2: User = { role: "guest", isActive: false }; // ❌ 오류 발생? 그렇다면 이유는?

// 문제 2: Union Type과 객체 리터럴 타입 조합
// ❗ 아래의 Shape 타입을 완성하세요.
type Shape = { type: "circle"; radius: number } | { type: "rectangle"; width: number; height: number };

function getArea(shape: Shape): number {
  if (shape.type === "circle") {
    return Math.PI * shape.radius * shape.radius;
  } else if (shape.type === "rectangle") {
    return shape.width * shape.height;
  } else {
    return -1;
  }
}

// ❗ 올바른 값인지 확인하세요.
const myShape: Shape = { type: "circle", radius: 10 }; // ✅ 올바른가?
console.log(getArea(myShape)); // 결과: ?

const wrongShape: Shape = { type: "triangle", base: 10, height: 5 }; // ❌ 오류 발생? 그렇다면 이유는?
console.log(getArea(wrongShape)); // 결과: ?


const arr = [1, 2, 3, 4, 5];
if(arr.contains(3)) {
  console.log("Array contains 3");
}
// ❗ 위의 코드에서 arr.contains(3) 부분은 오류가 발생합니다.
// ❗ TypeScript에서는 배열에 contains 메서드가 없기 때문입니다.
// ❗ 올바른 방법은 arr.includes(3)입니다.

// contains 메서드는 JavaScript의 배열 메서드가 아니므로 TypeScript에서 오류가 발생합니다.