export interface Notification {
  notificationId: number;
  title: string;
  contents: string;
  creator: number;
  createdAt: string;
}

export type GetResponse = Notification[];

export interface Methods {
  get: {
    resBody: GetResponse;
  };
}
