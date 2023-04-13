import { ReadStream } from 'fs';

export type Member = {
  memberId: number;
  name: string;
  jobTitle: string;
  discord?: string;
  twitter?: string;
  github?: string;
  description: string;
  thumbnail: string;
  username: string;
  roleId: number;
  roleName: string;
  isActive: boolean;
};

export type GetResponse = {
  message?: string;
  errors?: { [key: string]: string }[];
} & Member[];

export type PostRequest = {
  name: string;
  jobTitle: string;
  roleId: number;
  discord?: string;
  twitter?: string;
  github?: string;
  description: string;
  icon: File | ReadStream;
  username: string;
  password: string;
};

export type PostResponse = {
  message?: string;
  errors?: { [key: string]: string }[];
};

export type PutRequest = {
  name: string;
  jobTitle: string;
  discord?: string;
  twitter?: string;
  github?: string;
  description: string;
  isActive: boolean;
};

export type PutResponse = {
  message?: string;
  errors?: { [key: string]: string }[];
};

export type DeleteRequest = {
  memberId: number;
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
    reqBody: PostRequest;
    resBody: PostResponse;
  };

  put: {
    reqHeaders: {
      Authorization: string;
    };
    reqBody: PutRequest;
    resBody: PutResponse;
  };

  delete: {
    reqHeaders: {
      Authorization: string;
    };
    reqBody: DeleteRequest;
    resBody: DeleteResponse;
  };
};
