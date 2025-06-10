// 인터페이스
interface MyApiHandler<T> {
  fetchData(endpoint: string): Promise<T>;
}
// 클래스
class ApiHandler<T> implements MyApiHandler<T> {
  // base url
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // endpoint: string;

  async fetchData(endpoint: string): Promise<T> {
    try {
      // endpoint가 '/'로 시작하지 않으면 baseUrl과 결합
      if (!endpoint.startsWith("/")) {
        endpoint = `/${endpoint}`;
      }
      // baseUrl과 endpoint를 결합
      const url = `${this.baseUrl}${endpoint}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: T = await response.json();

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Fetch error: ${error.message}`);
      }
      throw new Error("An unknown error occurred while fetching data.");
    }
  }
}

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};
// 메인함수
async function main() {
  // ApiHandler 인스턴스 생성
  const baseUrl = `https://jsonplaceholder.typicode.com`;
  const apiHandler = new ApiHandler<Post[]>(baseUrl);

  try {
    // 데이터 가져오기
    const posts: Post[] = await apiHandler.fetchData("/posts");

    posts.forEach((post) => {
      console.log(`Post ID: ${post.id}, Title: ${post.title}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching data:", error.message);
    } else {
      console.error("An unknown error occurred.");
    }
  }
}

main();
