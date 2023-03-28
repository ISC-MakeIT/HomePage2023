import { PutResponse } from 'src/api/homePage/api/admin/members/active';
import { homePageClient } from '../../../../apiClient/homePage';

export const apiChangeActive = async (token: string, memberId: number, isActive: boolean): Promise<PutResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.members.active.$put({
    headers: { Authorization: `Bearer ${token}` },
    body: {
      memberId,
      isActive,
    },
  });
};

export type { PutResponse };
