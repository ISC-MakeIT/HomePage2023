import { homePageClient } from 'src/apiClient/homePage';

export const apiMe = async (token: string) => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.members.me.$get({ headers: { Authorization: `Bearer ${token}` } });
};
