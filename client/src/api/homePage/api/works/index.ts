export interface Work {
  workId: number;
  title: string;
  thumbnail: string;
  contents: string;
  createdAt: string;
}

export type GetResponse = Work[];

export interface Methods {
  get: {
    resBody: GetResponse;
  };
}
