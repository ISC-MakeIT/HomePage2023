import { Notification, GetResponse } from 'src/api/homePage/api/admin/notifications/_notificationId@number';
import { homePageClient } from 'src/apiClient/homePage';

export const apiNotification = async (token: string, notificationId: number) => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient()
    .api.admin.notifications._notificationId(notificationId)
    .$get({ headers: { Authorization: `Bearer ${token}` } });
};

export type { Notification, GetResponse };
