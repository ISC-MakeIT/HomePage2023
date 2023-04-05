import { ReadStream } from 'fs';

export type PostResponse = {
  message?: string;
  errors?: { [key: string]: string }[];
};

export type PostRequest = {
  icon: File | ReadStream;
  _method: string;
};

export type Methods = {
  post: {
    reqFormat: FormData;

    reqHeaders: {
      Authorization: string;
    };
    reqBody: PostRequest;
    resBody: PostResponse;
  };
};
