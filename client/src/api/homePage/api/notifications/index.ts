export type Notification = {
  notificationId: number;
  title: string;
  contents: string;
  creator: number;
  createdAt: string;
};

export type GetResponse = Notification[];

export type Methods = {
  get: {
    resBody: GetResponse;
  };
};
