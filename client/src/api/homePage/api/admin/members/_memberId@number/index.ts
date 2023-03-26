import { Member } from '..';

export type Response = {
  message?: string;
  errors?: { [key: string]: string }[];
} & Member;

export type Methods = {
  get: {
    reqHeaders: {
      Authorization: string;
    };
    resBody: Response;
  };
};
