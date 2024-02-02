export interface BaseResponse<T> {
  results: T;
  info: IInfo;
}

interface IInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}
