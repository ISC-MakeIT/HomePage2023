import { type GetResponse, type Member } from 'src/api/homePage/api/members';
import { homePageClient } from 'src/apiClient/homePage';

export const apiMembers = async (): Promise<GetResponse> => {
  return await homePageClient().api.members.$get();
};

export type { GetResponse, Member };
