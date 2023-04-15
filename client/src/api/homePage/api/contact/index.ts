export type PostRequest = {
  email: string;
  name: string;
  category: string;
};

export type PostResponse = {
  message?: string;
  errors?: { [key: string]: string }[];
};

export type Methods = {
  post: {
    reqBody: PostRequest;
    resBody: PostResponse;
  };
};
