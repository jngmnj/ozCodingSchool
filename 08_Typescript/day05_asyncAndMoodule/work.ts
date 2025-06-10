import { User } from "./types";

// 사용자 목록을 저장할 배열
let users: User[] = [];

// 사용자 추가 함수
export function addUser(user: User): void {
  users.push(user);
}

// 모든 사용자를 출력하는 함수
export function printAllUsers(): void {
  console.log(users);
}

// 1초 지연 후 사용자가 추가되는 비동기 사용자 추가 함수인 addUserAsync함수를 작성해주세요. 힌트: setTimeout을 사용하세요.
/* 이 곳에 코드를 입력하세요.*/
async function addUserAsync(user: User): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      try {
        addUser(user); 
        resolve(); // 사용자 추가 성공
      } catch (error) {
        reject(new Error("사용자 추가 실패: " + error));
      }
    })
  })
}

//1초 지연 후 사용자가 추가되는 비동기 사용자 출력 함수인 printAllUsersAsync함수를 작성해주세요. 힌트: setTimeout을 사용하세요.
/* 이 곳에 코드를 입력하세요.*/
async function printAllUserAsync(): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        printAllUsers();
        resolve(); // 사용자 출력 성공
      } catch (error) {
        reject(new Error("사용자 출력 실패: " + error));
      }
    }, 1000);
  });
}
