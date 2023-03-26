export type Member = {
  memberId: number;
  name: string;
  jobTitle: string;
  discord?: string;
  twitter?: string;
  github?: string;
  description: string;
  thumbnail: string;
  username: string;
  roleId: number;
  roleName: string;
  isActive: boolean;
};

export type GetResponse = {
  message?: string;
  errors?: { [key: string]: string }[];
} & Member[];

export type DeleteRequest = {
  memberId: number;
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

  delete: {
    reqHeaders: {
      Authorization: string;
    };
    reqBody: DeleteRequest;
    resBody: DeleteResponse;
  };
};
