import { type ReadStream } from 'fs';

export interface Member {
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
}

export type GetResponse = {
  message?: string;
  errors?: Array<Record<string, string>>;
} & Member[];

export interface PostRequest {
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
}

export interface PostResponse {
  message?: string;
  errors?: Array<Record<string, string>>;
}

export interface PutRequest {
  name: string;
  jobTitle: string;
  discord?: string;
  twitter?: string;
  github?: string;
  description: string;
  isActive: boolean;
}

export interface PutResponse {
  message?: string;
  errors?: Array<Record<string, string>>;
}

export interface DeleteRequest {
  memberId: number;
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
}
