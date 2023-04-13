export type Member = {
  memberId: number;
  name: string;
  jobTitle: string;
  discord?: string;
  twitter?: string;
  github?: string;
  description: string;
  thumbnail: string;
};

export type GetResponse = Member[];

export type Methods = {
  get: {
    resBody: GetResponse;
  };
};
