import { type GetRequest, type GetResponse } from 'src/api/homePage/api/admin/ogps/detail';
import { homePageClient } from 'src/apiClient/homePage';

export const apiOgp = async (token: string, request: GetRequest): Promise<GetResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.ogps.detail.$get({
    body: request,
    headers: { Authorization: `Bearer ${token}` },
  });
};
