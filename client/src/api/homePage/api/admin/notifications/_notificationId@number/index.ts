export interface Notification {
  notificationId: number;
  title: string;
  contents: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  currentVersion: number;
}

export type GetResponse = {
  message?: string;
  errors?: Array<Record<string, string>>;
} & Notification;

export interface Methods {
  get: {
    reqHeaders: {
      Authorization: string;
    };
    resBody: GetResponse;
  };
}
