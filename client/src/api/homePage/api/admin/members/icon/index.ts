import { type ReadStream } from 'fs';

export interface PostResponse {
  message?: string;
  errors?: Array<Record<string, string>>;
}

export interface PostRequest {
  icon: File | ReadStream;
  _method: string;
}

export interface Methods {
  post: {
    reqFormat: FormData;

    reqHeaders: {
      Authorization: string;
    };
    reqBody: PostRequest;
    resBody: PostResponse;
  };
}
