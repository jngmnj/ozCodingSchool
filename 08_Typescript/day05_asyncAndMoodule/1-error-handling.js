"use strict";
// 에러 핸들링
// TypeScript에서 에러 핸들링을 위해 try-catch-finally 구문을 사용합니다.
function checkPositiveNumber(num) {
    if (num < 0) {
        throw new Error("Negative number is not allowed");
    }
    return num;
}
try {
    // 에러가 발생할 수 있는 코드
    // throw new Error("Something went wrong!");
    checkPositiveNumber(-3); // 에러를 발생시키는 호출
}
catch (error) {
    if (error instanceof Error) {
        console.error("Caught an error:", error.message);
    }
}
finally {
    // 항상 실행되는 로직
    console.log("This will always run, regardless of an error.");
}
// 사용자 정의 에러 클래스 생성
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "CustomError"; // 에러 이름 설정
    }
}
try {
    throw new CustomError("This is a custom error message.");
}
catch (error) {
    if (error instanceof CustomError) {
        console.error("Caught a custom error:", error.message);
    }
    else if (error instanceof Error) {
        console.error("Caught a general error:", error.message);
    }
}
