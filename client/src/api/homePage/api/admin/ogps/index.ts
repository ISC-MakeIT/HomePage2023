export interface OGP {
  url: string;
  title: string;
  description: string;
  thumbnail: string;
  keywords: string;
}

export type GetResponse = {
  message?: string;
  errors?: Array<Record<string, string>>;
} & OGP[];

export interface PostRequest {
  url: string;
  title: string;
  description: string;
  thumbnail: File;
  keywords: string;
}

export interface PostResponse {
  message?: string;
  errors?: Array<Record<string, string>>;
}

export interface PutRequest {
  _method: string;
  url: string;
  title: string;
  description: string;
  thumbnail?: File;
  keywords: string;
}

export interface PutResponse {
  message?: string;
  errors?: Array<Record<string, string>>;
}

export interface DeleteRequest {
  url: string;
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
    reqBody: PostRequest | PutRequest;
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
