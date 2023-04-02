export type Work = {
  workId: number;
  title: string;
  contents: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  currentVersion: number;
};

export type GetResponse = {
  message?: string;
  errors?: { [key: string]: string }[];
} & Work;

export type Methods = {
  get: {
    reqHeaders: {
      Authorization: string;
    };
    resBody: GetResponse;
  };
};
