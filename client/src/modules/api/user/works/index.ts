import { GetResponse } from 'src/api/homePage/api/works';
import { homePageClient } from 'src/apiClient/homePage';

export const apiWork = async (): Promise<GetResponse> => {
  return await homePageClient().api.works.$get();
};
