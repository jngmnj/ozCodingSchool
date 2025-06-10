// 타입스크립트와 비동기

const sync = () => {
  console.log("동기 함수 실행");
};
const asyncFunc = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("비동기 함수 실행");
      resolve("비동기 작업 완료");
    }, 1000);
  });
};

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

// TS => 제네릭 프로미스
// async/await 구문을 사용하여 비동기 작업을 처리할 수도 있습니다.

// Promise<string>: 제네릭을 사용하여 Promise가 문자열을 반환함을 명시합니다.

interface MyDataType {
  id: number;
  name: string;
}
const fetchData = (): Promise<MyDataType> => {
  return new Promise((resolve, reject) => {
    const success = true; // 성공 여부를 나타내는 변수
    if (success) {
      const data: MyDataType = {
        id: 1,
        name: "데이터가 성공적으로 로드되었습니다.",
      };
      resolve(data);
    } else {
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
// then 체이닝 잘 안씀 => async/await 구문을 사용하여 비동기 작업을 처리하는 것이 더 간결하고 가독성이 좋음.

// async/await 구문을 사용하여 비동기 작업을 처리하는 예제입니다.
async function fetchDataAsync(): Promise<MyDataType> {
  const data = await fetchData(); // fetchData 함수 호출
  console.log("fetchDataAsync: 데이터가 성공적으로 로드되었습니다.");
  return data; // Promise<MyDataType>
}

fetchDataAsync();

// Record 예시

type Config = Record<string, string>;

// {
//     "server": "httpsL//api.example.com",
//     "env": "production",
// }
//  => 이런 형태의 데이터를 다룰때 record를 사용합니다.

async function loadConfig(): Promise<Config> {
  const response = await fetch("/api/config");
  const configData: Config = await response.json();

  return configData;
}

// 예시2

async function fetchData2<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const data = await response.json();

  //   return data as Promise<T>; // 함수는 async이므로 자동으로 Promise<T>로 감싸서 반환함
  return data as T;
}
// 다양한 타입의 데이터를 처리할 수 있습니다.