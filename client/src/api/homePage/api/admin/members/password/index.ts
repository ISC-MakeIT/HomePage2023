export interface PutResponse {
  message?: string;
  errors?: Array<Record<string, string>>;
}

export interface PutRequest {
  oldPassword: string;
  newPassword: string;
}

export interface Methods {
  put: {
    reqHeaders: {
      Authorization: string;
    };
    reqBody: PutRequest;
    resBody: PutResponse;
  };
}
