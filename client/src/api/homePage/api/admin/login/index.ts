export type Response = {
  message?: string;
  token?: string;
  errors?: { [key: string]: string };
};

export type Request = {
  username: string;
  password: string;
};

export type Methods = {
  post: {
    reqBody: Request;
    resBody: Response;
  };
};
