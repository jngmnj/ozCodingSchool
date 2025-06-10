// Type Narrowing
// Type Narrowing은 TypeScript에서 변수의 타입을 좁히는 기술로, 조건문이나 타입 가드를 사용하여 특정 타입으로 제한하는 방법입니다.
// 이를 통해 코드의 안정성과 가독성을 높일 수 있습니다.

// 1. typeof Narrowing
// typeof 연산자를 사용하여 변수의 타입을 좁힐 수 있습니다.
type Id = number | string;
let id: Id = 1;

function getId(id: Id) {
  if (typeof id === "number") {
    return id; // id가 number일 경우 그대로 반환
  }
  return Number(id); // id가 string일 경우에도 Number로 변환 가능
}

getId(1);
getId("2");

// 2. 동일성 좁히기
// 동일성 비교를 통해 변수의 타입을 좁힐 수 있습니다.

type Option = "on" | "off";

function power(option: Option) {
  if (option === "on") {
    // 값이 동일한지 확인
    console.log("Power is ON");
  } else if (option === "off") {
    console.log("Power is OFF");
  }
}

power("on");
power("off");

// 3. in Narrowing
// in 연산자를 사용하여 객체의 속성을 확인하고 타입을 좁힐 수 있습니다.

type iOS = { iMessage: () => void };
type Android = { message: () => void };

function sendMessage(os: iOS | Android) {
  if ("iMessage" in os) {
    // iOS의 경우
    os.iMessage();
  } else {
    os.message();
  }
}
sendMessage({
  iMessage: () => console.log("Sending iMessage"),
});
sendMessage({
  message: () => console.log("Sending Android message"),
});

// 4. instanceof Narrowing
// instanceof 연산자를 사용하여 객체의 타입을 좁힐 수 있습니다.

// let myObject = new MyObject();
// if (myObject instanceof MyObject) {
//   myObject.doSomething(); // MyObject의 메서드 호출
// }

class ApiResponse {
  data: any;
}

class ErrorResponse {
  message: string;
}

async function handleApiResponse(response: any) {
  if (response instanceof ApiResponse) {
    // 데이터 처리
    console.log("Data:", response.data); // ApiResponse의 data 속성 사용
  } else if (response instanceof ErrorResponse) {
    // 에러처리
    console.error("Error:", response.message); // ErrorResponse의 error 속성 사용
  }
}

const apiResponse = new ApiResponse();
const errorResponse = new ErrorResponse();

handleApiResponse(apiResponse);
handleApiResponse(errorResponse);

// 5. 사용자 정의 타입 가드
// 사용자 정의 타입 가드를 사용하여 타입을 좁힐 수 있습니다.

//  functino 이름: something is SomeType

// 반환 타입을 ErrorResponse와 일치하는지 판별하여 boolean으로 반환
function isErrorResponse(
  response: ApiResponse | ErrorResponse
): response is ErrorResponse {
  // ErrorResponse의 경우 message 속성이 존재
  return (response as ErrorResponse).message !== undefined; // true or false 반환
}

const respnose1 = { message: "error..." };
if (isErrorResponse(respnose1)) {
  console.error(respnose1.message);
}

const respnose2 = { data: "data..." };
if (isErrorResponse(respnose2)) {
  console.error(respnose2.message); // 이 부분은 실행되지 않음
}

// 6. 식별 가능한 유니언 타입(Discriminated Unions)

type SuccessResponse = {
  type: "success";
  data: any;
};
type FailureResponse = {
  type: "failure";
  error: string;
};
type ApiResponseType = SuccessResponse | FailureResponse;
function handleApiResponseType(response: ApiResponseType) {
  if (response.type === "success") {
    console.log("Data:", response.data); // SuccessResponse의 data 속성 사용
  } else {
    console.error("Error:", response.error); // FailureResponse의 error 속성 사용
  }
}

const successResponse: ApiResponseType = {
  type: "success",
  data: { id: 1, name: "Alice" },
};
const failureResponse: ApiResponseType = {
  type: "failure",
  error: "Something went wrong",
};

handleApiResponseType(successResponse);
handleApiResponseType(failureResponse);

// 7. null과 undefined Narrowing
// null과 undefined를 체크하여 타입을 좁힐 수 있습니다.
function processValue(value: string | null | undefined) {
  if (value === null) {
    console.log("Value is null");
  } else if (value === undefined) {
    console.log("Value is undefined");
  } else {
    console.log("Value:", value); // value는 이제 string 타입으로 좁혀짐
  }
}
processValue("Hello");
processValue(null);
processValue(undefined);
// 8. 배열의 타입 좁히기
