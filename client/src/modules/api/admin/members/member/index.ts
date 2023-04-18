import { homePageClient } from 'src/apiClient/homePage';
import { type GetResponse } from '../../../../../api/homePage/api/admin/members/_memberId@number';

export const apiMember = async (token: string, memberId: number): Promise<GetResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient()
    .api.admin.members._memberId(memberId)
    .$get({ headers: { Authorization: `Bearer ${token}` } });
};

export type { GetResponse };
