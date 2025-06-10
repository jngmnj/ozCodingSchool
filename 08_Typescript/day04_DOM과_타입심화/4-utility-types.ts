// 유틸리티 타입

// 1. // 1. Partial<T>
// Partial<T>는 객체의 모든 속성을 선택적으로 만드는 타입입니다.
export type User = {
  id: number;
  name: string;
  email: string;
};

type PartialUser = Partial<User>;

type Product = {
    id: number;
    name: string;
}
type PartialProduct = Partial<Product>;
const partialUser: PartialUser = {
    id: 1,
};
const partialProduct: PartialProduct = {
    id: 1,
    // name은 선택적
};

// 2. Readonly<T>
// Readonly<T>는 객체의 모든 속성을 읽기 전용으로 만드는 타입입니다.
const readonlyUser: Readonly<User> = {
    id: 1,
    name: "Alice",
    email: ""
};
// readonlyUser.id = 2; // 오류: 읽기 전용 속성은 수정할 수 없습니다.

// 3. Pick<T, K>
// Pick<T, K>는 객체 타입 T에서 속성 K만 선택하여 새로운 타입을 만드는 유틸리티 타입입니다.
type UserWithOnlyName = Pick<User, "name">;
const userWithOnlyName: UserWithOnlyName = {
    name: "Alice",
    // id와 email은 선택되지 않음
};

// 4. Omit<T, K>
// Omit<T, K>는 객체 타입 T에서 속성 K를 제외한 새로운 타입을 만드는 유틸리티 타입입니다.
type UserWithoutEmail = Omit<User, "email">;
const userWithoutEmail: UserWithoutEmail = {
    id: 1,
    name: "Alice",
    // email은 제외됨
};

// 5. Record<K, T>
// Record<K, T>는 키 K와 값 T로 이루어진 객체 타입을 생성하는 유틸리티 타입입니다.
// K는 문자열 리터럴 타입이어야 하며, T는 값의 타입입니다.

type UserRecord = Record<string, User>;
const userRecord: UserRecord = {
    "user1": {
        id: 1,
        name: "Alice",
        email: ""
    },
    "user2": {
        id: 2,
        name: "Bob",
        email: ""
    }
};

type Country = "USA" | "Canada" | "Mexico";
type Capital = string;

type CountryCapitals = Record<Country, Capital>;

const countryCapitals: CountryCapitals = {
    "USA": "Washington, D.C.",
    "Canada": "Ottawa",
    "Mexico": "Mexico City"
};

type CountryInfo = {
    name: string;
    population: number;
    area: number;
};

type CountryInfoRecord = Record<Country, CountryInfo>;
const countryInfoRecord: CountryInfoRecord = {
  USA: {
    name: "Washington, D.C.",
    population: 331002651,
    area: 9833517,
  },
  Canada: {
    name: "Ottawa",
    population: 37742154,
    area: 9984670,
  },
  Mexico: {
    name: "Mexico City",
    population: 128932753,
    area: 1964375,
  },
};
// api response다룰때 유용하게 사용됨


// 6. Prameters<T>
// Parameters<T>는 함수 타입 T의 매개변수 타입을 추출하는 유틸리티 타입입니다.

type MyFunction = (a: number, b: string) => void;
type MyFunctionParams = Parameters<MyFunction>; // MyFunction의 매개변수 타입을 tuple로 추출합니다.
// MyFunctionParams는 [number, string] 타입이 됩니다.

function myFunction(...param: MyFunctionParams): void {
  const [a, b] = param;
  console.log(a, b);
}
myFunction(100, "hello"); 

type SaveUser = (user: User) => void;
type Params = Parameters<SaveUser>; // Params는 [User] 타입이 됩니다.

function saveUser(...params: Params): void {
  const [user] = params;
  console.log(user);
}
saveUser({
  id: 1,
  name: "Alice",
  email: ""
});

