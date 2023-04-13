export type Work = {
  workId: number;
  title: string;
  contents: string;
  createdAt: string;
};

export type GetResponse = Work[];

export type Methods = {
  get: {
    resBody: GetResponse;
  };
};