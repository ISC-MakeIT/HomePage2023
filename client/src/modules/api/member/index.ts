import { homePageClient } from '../../../apiClient/homePage';
import { DeleteResponse, GetResponse, Member } from '../../../api/homePage/api/admin/members';

export const apiMembers = async (token: string): Promise<GetResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.members.$get({ headers: { Authorization: `Bearer ${token}` } });
};

export const apiDeleteMember = async (token: string, memberId: number): Promise<DeleteResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.members.$delete({
    body: { memberId },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export type { GetResponse, Member };
