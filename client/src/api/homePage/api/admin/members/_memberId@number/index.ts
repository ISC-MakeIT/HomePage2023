import { type Member } from '..';

export type GetResponse = {
  message?: string;
  errors?: Array<Record<string, string>>;
} & Member;

export interface Methods {
  get: {
    reqHeaders: {
      Authorization: string;
    };
    resBody: GetResponse;
  };
}
