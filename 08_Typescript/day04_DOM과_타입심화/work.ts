// [exercise 2. 타입 연산자 추론하기]
// 제공된 기본 타입 정보를 바탕으로 각 타입을 직접 추론해보세요.

// 🔥 기본 타입 정의
type Subject = "js" | "ts" | "react";

// 과목별 진도 정보를 담는 타입
type ProgressItem = {
  subject: Subject;
  chapter: number;
};

// 진도는 ProgressItem 배열
type Progress = ProgressItem[];

// 학생의 기본 정보
type Info = {
  name: string;
  age: number;
};

// 학생 타입은 Info + progress 필드
type Student = Info & {
  progress: Progress;
};

// 🔥 여기서부터 문제를 풀어보세요.
//타입 이름에 마우스 커서를 올려 예상결과대로 잘 나오는지 확인하세요.

// 1. Info 타입의 key를 타입으로 가지는 InfoKey 타입을 정의하세요
// 'name' | 'age'
export type InfoKey = keyof Info;

// 2. ProgressItem 타입의 key를 타입으로 가지는 ProgressKey 타입을 정의하세요
// 'subject' | 'chapter'
export type ProgressKey = keyof ProgressItem;

// 3. InfoKey 타입과 ProgressKey 타입을 조합하여 모든 key값을 가지는 타입을 정의하세요.
// 'name' | 'age' | 'subject' | 'chapter'
export type AllKeys = InfoKey | ProgressKey;

// 4. Info 타입을 부분적으로 가지는 OptionalInfo 타입을 정의하세요
// {
//   name?: string;
//   age?: number;
// }
export type OptionalInfo<T> = {
  [P in keyof T]?: T[P];
};
// export type OptionalInfo = Partial<Info>;

// 5. Info 타입 중에서 'name'만 추출하여 OnlyName 타입을 정의하세요
// {
//   name: string;
// }
export type OnlyName = Pick<Info, "name">;

// 6. Info 타입에서 'age'를 제외한 타입을 정의하세요
// {
//   name: string;
// }
export type InfoWithoutAge = Omit<Info, "age">;

// 7. 과목을 key로 하고, 각 진도(chapter 수)를 value로 가지는 객체 형태 타입을 정의하세요
// {
//   js: number;
//   ts: number;
//   react: number;
// }
type ChapterType = number;
export type ProgressMap = Record<Subject, ChapterType>;

// 8. 정의된 함수 시그니처를 참고하여 getStudentWithKey(student, key) 함수의 파라미터 타입을 추출하세요
// 결과: [student: Student, key: AllKeys]
export type GetStudentWithKeyParams = Parameters<typeof getStudentWithKey>;

function getStudentWithKey(student: Student, key: AllKeys) {
    //9. key가 'name' 또는 'age' 일 때 student[key]를 return 하도록 코드를 작성하세요 (type narrowing)
    if (key === "name" || key === "age") {
      return student[key];
    } else {
      return student.progress.map((p) => p[key]);
    }
  }
  export type getStudentKeyParams = Parameters<typeof getStudentWithKey>;  
  