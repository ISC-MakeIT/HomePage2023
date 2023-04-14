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
} & Work[];

export type PostRequest = {
  title: string;
  contents: string;
  picture?: File;
};

export type PostResponse = {
  message?: string;
  errors?: { [key: string]: string }[];
};

export type PutRequest = {
  _method: string;
  workId: number;
  title: string;
  contents: string;
  picture?: File;
  isActive: boolean;
  currentVersion: number;
};

export type PutResponse = {
  message?: string;
  errors?: { [key: string]: string }[];
};

export type DeleteRequest = {
  workId: number;
};

export type DeleteResponse = {
  message?: string;
  errors?: { [key: string]: string }[];
};

export type Methods = {
  get: {
    reqHeaders: {
      Authorization: string;
    };
    resBody: GetResponse;
  };
  post: {
    reqFormat: FormData;

    reqHeaders: {
      Authorization: string;
    };
    reqBody: PostRequest | PutResponse;
    resBody: PostResponse | PutResponse;
  };
  delete: {
    reqHeaders: {
      Authorization: string;
    };
    reqBody: DeleteRequest;
    resBody: DeleteResponse;
  };
};
