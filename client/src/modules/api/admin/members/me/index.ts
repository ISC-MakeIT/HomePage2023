import { homePageClient } from 'src/apiClient/homePage';
import { type GetResponse } from '../../../../../api/homePage/api/admin/members/me';

export const apiMe = async (token: string) => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.members.me.$get({ headers: { Authorization: `Bearer ${token}` } });
};

export type { GetResponse };
