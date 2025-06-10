"use strict";
// typescript module
Object.defineProperty(exports, "__esModule", { value: true });
// export, import 없으면 타입스크립트는 기본적으로 모듈로 인식하지 않음
// 모듈이 아닌 일반 스크립트는 같은 폴더에 있는 파일은 스코프를 공유함
// export default 
// import add from "./3-module-utils";
// console.log(add(1, 2)); // 3
const _3_module_utils_1 = require("./3-module-utils");
console.log(_3_module_utils_1.appName); // MyApp
const user = {
    id: 1,
    name: "John Doe",
    email: ""
};
console.log(user); // { id: 1, name: 'John Doe', email: '' }
