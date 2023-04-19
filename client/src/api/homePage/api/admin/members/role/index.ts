export interface PutResponse {
  message?: string;
  errors?: Array<Record<string, string>>;
}

export interface PutRequest {
  memberId: number;
  roleId: number;
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
