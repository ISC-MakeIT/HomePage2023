export interface OGP {
  url: string;
  title: string;
  description: string;
  thumbnail: string;
  keywords: string;
}

export interface GetRequest {
  url: string;
}

export type GetResponse = {
  message?: string;
  errors?: Array<Record<string, string>>;
} & OGP[];

export interface Methods {
  get: {
    reqHeaders: {
      Authorization: string;
    };
    reqBody: GetRequest;
    resBody: GetResponse;
  };
}
