// 상수 단언
// const assertion을 사용하면 타입스크립트가 타입을 추론하는 방식을 변경할 수 있습니다.
// const assertion은 값이 변경되지 않는다는 것을 명시적으로 나타내는 방법입니다.

// const objName = {} as const; 
// const arrName = [] as const;

const book = {
    title: "타입스크립트 완벽 가이드",
    author: "john doe",
} as const; // 객체의 모든 프로퍼티를 읽기 전용으로 만듭니다.

// book.title = "타입스크립트 완벽 가이드2"; // 오류 발생: 읽기 전용 프로퍼티이므로 변경할 수 없습니다.

const config = {
    server: 'https://example.com',
    port: 8080,
} as const; // 객체의 모든 프로퍼티를 읽기 전용으로 만듭니다.

// config.server = 'https://new-example.com'; // 오류 발생: 읽기 전용 프로퍼티이므로 변경할 수 없습니다.

export const statusCodeMap = {
    101: "ordered",
    102: "shipped",
    103: "delivered",
} as const; // 객체의 모든 프로퍼티를 읽기 전용으로 만듭니다.

export type StatusCodeKeys = keyof typeof statusCodeMap; // "101" | "102" | "103"

function handleStatus(status: StatusCodeKeys) {
    const message = statusCodeMap[status];
    // 여기서 message는 "ordered" | "shipped" | "delivered" 타입이 됩니다.
    // 상태 처리 로직
}