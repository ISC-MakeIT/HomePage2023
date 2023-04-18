export interface Response {
  message?: string;
  token?: string;
  memberId?: number;
  errors?: Array<Record<string, string>>;
}

export interface Request {
  username: string;
  password: string;
}

export interface Methods {
  post: {
    reqBody: Request;
    resBody: Response;
  };
}
