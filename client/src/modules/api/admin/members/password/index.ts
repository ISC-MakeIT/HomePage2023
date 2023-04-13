import { PutRequest, PutResponse } from 'src/api/homePage/api/admin/members/password';
import { homePageClient } from 'src/apiClient/homePage';

export const apiChangePassword = async (token: string, request: PutRequest): Promise<PutResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.members.password.$put({
    body: request,
    headers: { Authorization: `Bearer ${token}` },
  });
};
