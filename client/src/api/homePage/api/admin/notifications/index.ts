export type Notification = {
  notificationId: number;
  title: string;
  contents: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

export type GetResponse = {
  message?: string;
  errors?: { [key: string]: string }[];
} & Notification[];

export type PostRequest = {
  title: string;
  contents: string;
};

export type PostResponse = {
  message?: string;
  errors?: { [key: string]: string }[];
};

export type PutRequest = {
  notificationId: number;
  title: string;
  contents: string;
  isActive: boolean;
  currentVersion: number;
};

export type PutResponse = {
  message?: string;
  errors?: { [key: string]: string }[];
};

export type DeleteRequest = {
  notificationId: number;
};

export type DeleteResponse = {
  message?: string;
  errors?: { [key: string]: string }[];
};

export type Methods = {
  get: {
    reqHeaders: {
      Authorization: string;
    };
    resBody: GetResponse;
  };
  post: {
    reqHeaders: {
      Authorization: string;
    };
    reqBody: PostRequest;
    resBody: PostResponse;
  };
  put: {
    reqHeaders: {
      Authorization: string;
    };
    reqBody: PutRequest;
    resBody: PutResponse;
  };
  delete: {
    reqHeaders: {
      Authorization: string;
    };
    reqBody: DeleteRequest;
    resBody: DeleteResponse;
  };
};
