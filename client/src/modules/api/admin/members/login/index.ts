import { type Request, type Response } from '../../../../../api/homePage/api/admin/login';
import { homePageClient } from 'src/apiClient/homePage';

export const apiLogin = async ({ username, password }: Request): Promise<Response> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.login.$post({
    body: { username, password },
  });
};

export type { Response, Request };
