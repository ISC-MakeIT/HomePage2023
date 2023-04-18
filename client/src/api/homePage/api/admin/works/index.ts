export interface Work {
  workId: number;
  title: string;
  contents: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  currentVersion: number;
}

export type GetResponse = {
  message?: string;
  errors?: Array<Record<string, string>>;
} & Work[];

export interface PostRequest {
  title: string;
  contents: string;
  picture?: File;
}

export interface PostResponse {
  message?: string;
  errors?: Array<Record<string, string>>;
}

export interface PutRequest {
  _method: string;
  workId: number;
  title: string;
  contents: string;
  picture?: File;
  isActive: boolean;
  currentVersion: number;
}

export interface PutResponse {
  message?: string;
  errors?: Array<Record<string, string>>;
}

export interface DeleteRequest {
  workId: number;
}

export interface DeleteResponse {
  message?: string;
  errors?: Array<Record<string, string>>;
}

export interface Methods {
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
}
