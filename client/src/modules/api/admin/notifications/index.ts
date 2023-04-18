import {
  type DeleteResponse,
  type GetResponse,
  type Notification,
  type PostRequest,
  type PostResponse,
  type PutRequest,
  type PutResponse,
} from 'src/api/homePage/api/admin/notifications';
import { homePageClient } from 'src/apiClient/homePage';

export const apiNotifications = async (token: string): Promise<GetResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.notifications.$get({
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const apiCreateNotification = async (token: string, notification: PostRequest): Promise<PostResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.notifications.$post({
    headers: { Authorization: `Bearer ${token}` },
    body: notification,
  });
};

export const apiEditNotification = async (token: string, notification: PutRequest): Promise<PutResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.notifications.$put({
    headers: { Authorization: `Bearer ${token}` },
    body: notification,
  });
};

export const apiDeleteNotification = async (token: string, notificationId: number): Promise<DeleteResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.notifications.$delete({
    headers: { Authorization: `Bearer ${token}` },
    body: { notificationId },
  });
};

export type { GetResponse, Notification, PostResponse, PutResponse, DeleteResponse };
