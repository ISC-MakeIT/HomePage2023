import { type GetResponse, type Role } from 'src/api/homePage/api/admin/members/roles';
import { type PutResponse } from 'src/api/homePage/api/admin/members/role';
import { homePageClient } from 'src/apiClient/homePage';

export const apiRoles = async (token: string): Promise<GetResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.members.roles.$get({ headers: { Authorization: `Bearer ${token}` } });
};

export const apiChangeRole = async (token: string, memberId: number, roleId: number): Promise<PutResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.members.role.$put({
    headers: { Authorization: `Bearer ${token}` },
    body: {
      memberId,
      roleId,
    },
  });
};

export type { GetResponse, PutResponse, Role };
