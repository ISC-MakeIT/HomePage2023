export interface Role {
  roleId: string;
  name: string;
}

export type GetResponse = {
  message?: string;
} & Role[];

export interface Methods {
  get: {
    reqHeaders: {
      Authorization: string;
    };
    resBody: GetResponse;
  };
}
