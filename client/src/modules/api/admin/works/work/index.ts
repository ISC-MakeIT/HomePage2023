import { type Work, type GetResponse } from 'src/api/homePage/api/admin/works/_workId@number';
import { homePageClient } from 'src/apiClient/homePage';

export const apiWork = async (token: string, workId: number) => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient()
    .api.admin.works._workId(workId)
    .$get({ headers: { Authorization: `Bearer ${token}` } });
};

export type { Work, GetResponse };
