"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// 클래스
class ApiHandler {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    // endpoint: string;
    fetchData(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // endpoint가 '/'로 시작하지 않으면 baseUrl과 결합
                if (!endpoint.startsWith("/")) {
                    endpoint = `/${endpoint}`;
                }
                // baseUrl과 endpoint를 결합
                const url = `${this.baseUrl}${endpoint}`;
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = yield response.json();
                return data;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Fetch error: ${error.message}`);
                }
                throw new Error("An unknown error occurred while fetching data.");
            }
        });
    }
}
// 메인함수
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // ApiHandler 인스턴스 생성
        const baseUrl = `https://jsonplaceholder.typicode.com`;
        const apiHandler = new ApiHandler(baseUrl);
        try {
            // 데이터 가져오기
            const posts = yield apiHandler.fetchData("/posts");
            posts.forEach((post) => {
                console.log(`Post ID: ${post.id}, Title: ${post.title}`);
            });
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error fetching data:", error.message);
            }
            else {
                console.error("An unknown error occurred.");
            }
        }
    });
}
main();
