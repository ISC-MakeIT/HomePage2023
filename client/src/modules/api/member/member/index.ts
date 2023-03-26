import { homePageClient } from 'src/apiClient/homePage';

export const apiMember = async (token: string, memberId: number) => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient()
    .api.admin.members._memberId(memberId)
    .$get({ headers: { Authorization: `Bearer ${token}` } });
};
