"use strict";
// 타입스크립트와 비동기
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sync = () => {
    console.log("동기 함수 실행");
};
const asyncFunc = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("비동기 함수 실행");
            resolve("비동기 작업 완료");
        }, 1000);
    });
});
function main() {
    sync(); // 동기 함수 호출
    asyncFunc()
        .then((result) => {
        console.log(result); // 비동기 함수의 결과 처리
    })
        .catch((error) => {
        console.error("비동기 작업 중 에러 발생:", error);
    });
    sync();
    sync();
}
main(); // main 함수 호출
const fetchData = () => {
    return new Promise((resolve, reject) => {
        const success = true; // 성공 여부를 나타내는 변수
        if (success) {
            const data = {
                id: 1,
                name: "데이터가 성공적으로 로드되었습니다.",
            };
            resolve(data);
        }
        else {
            reject("fetchData: 데이터 로드 실패");
        }
    });
};
fetchData()
    .then((data) => {
    console.log(data); // "데이터가 성공적으로 로드되었습니다."
})
    .catch((error) => {
    console.error("데이터 로드 중 에러 발생:", error);
});
// async/await 구문을 사용하여 비동기 작업을 처리하는 예제입니다.
function fetchDataAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetchData(); // fetchData 함수 호출
        console.log("fetchDataAsync: 데이터가 성공적으로 로드되었습니다.");
        return data; // Promise<MyDataType>
    });
}
fetchDataAsync();
// {
//     "server": "httpsL//api.example.com",
//     "env": "production",
// }
//  => 이런 형태의 데이터를 다룰때 record를 사용합니다.
function loadConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("/api/config");
        const configData = yield response.json();
        return configData;
    });
}
// 예시2
function fetchData2(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        const data = yield response.json();
        //   return data as Promise<T>; // 함수는 async이므로 자동으로 Promise<T>로 감싸서 반환함
        return data;
    });
}
// 다양한 타입의 데이터를 처리할 수 있습니다.
