export type PutResponse = {
  message?: string;
  errors?: { [key: string]: string }[];
};

export type PutRequest = {
  memberId: number;
  isActive: boolean;
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
