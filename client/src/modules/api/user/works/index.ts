import { GetResponse, Work } from 'src/api/homePage/api/works';
import { homePageClient } from 'src/apiClient/homePage';

export const apiWorks = async (): Promise<GetResponse> => {
  return await homePageClient().api.works.$get();
};

export type { Work };
