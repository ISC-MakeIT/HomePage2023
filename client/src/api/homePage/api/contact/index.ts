export interface PostRequest {
  email: string;
  name: string;
  category: string;
}

export interface PostResponse {
  message?: string;
  errors?: Array<Record<string, string>>;
}

export interface Methods {
  post: {
    reqBody: PostRequest;
    resBody: PostResponse;
  };
}
