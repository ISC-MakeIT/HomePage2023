import { type GetRequest, type GetResponse, type OGP } from 'src/api/homePage/api/admin/ogps/detail';
import { homePageClient } from 'src/apiClient/homePage';

export const apiOGP = async (token: string, request: GetRequest): Promise<GetResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.ogps.detail.$get({
    query: request,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export type { GetResponse, OGP };
