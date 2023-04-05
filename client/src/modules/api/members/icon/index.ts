import { ReadStream } from 'fs';
import { PostResponse } from 'src/api/homePage/api/admin/members/icon';
import { homePageClient } from 'src/apiClient/homePage';

export const apiChangeIcon = async (token: string, icon: File | ReadStream): Promise<PostResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.members.icon.$post({
    body: { icon, _method: 'PUT' },
    headers: { Authorization: `Bearer ${token}` },
  });
};
