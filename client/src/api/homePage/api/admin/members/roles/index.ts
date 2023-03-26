export type Role = {
  roleId: string;
  name: string;
};

export type GetResponse = {
  message?: string;
} & Role[];

export type Methods = {
  get: {
    reqHeaders: {
      Authorization: string;
    };
    resBody: GetResponse;
  };
};
