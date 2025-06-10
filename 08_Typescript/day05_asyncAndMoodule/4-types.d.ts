declare module "lodash" {
  // lodash의 타입 선언을 작성한다.
  export function max(array: number[]): number | undefined;
  export function shuffle<T>(array: T[]): T[];
  // 다른 lodash 함수들도 필요한 만큼 선언할 수 있다.
}
