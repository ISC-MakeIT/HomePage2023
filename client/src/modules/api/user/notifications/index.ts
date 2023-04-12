import { GetResponse } from 'src/api/homePage/api/notifications';
import { homePageClient } from 'src/apiClient/homePage';

export const apiNotifications = async (): Promise<GetResponse> => {
  return await homePageClient().api.notifications.$get();
};
