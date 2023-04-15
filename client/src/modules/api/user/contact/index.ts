import { PostResponse, PostRequest } from 'src/api/homePage/api/contact';
import { homePageClient } from 'src/apiClient/homePage';

export const apiContact = async (request: PostRequest): Promise<PostResponse> => {
  return await homePageClient().api.contact.$post({
    body: request,
  });
};
