export type PutResponse = {
  message?: string;
  errors?: { [key: string]: string }[];
};

export type PutRequest = {
  oldPassword: string;
  newPassword: string;
};

export type Methods = {
  put: {
    reqHeaders: {
      Authorization: string;
    };
    reqBody: PutRequest;
    resBody: PutResponse;
  };
};
