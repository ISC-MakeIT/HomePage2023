export interface Work {
  workId: number;
  title: string;
  contents: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  currentVersion: number;
}

export type GetResponse = {
  message?: string;
  errors?: Array<Record<string, string>>;
} & Work;

export interface Methods {
  get: {
    reqHeaders: {
      Authorization: string;
    };
    resBody: GetResponse;
  };
}
