export type Response = {
  message?: string;
  token?: string;
  errors?: { [key: string]: string };
};

export type Methods = {
  post: {
    reqBody: {
      username: string;
      password: string;
    };
    resBody: Response;
  };
};
