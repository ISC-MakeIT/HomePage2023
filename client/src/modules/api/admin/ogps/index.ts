import {
  type PostRequest,
  type GetResponse,
  type PostResponse,
  type PutRequest,
  type PutResponse,
  type DeleteRequest,
  type DeleteResponse,
} from 'src/api/homePage/api/admin/ogps';
import { homePageClient } from 'src/apiClient/homePage';

export const apiOgpList = async (token: string): Promise<GetResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.ogps.$get({ headers: { Authorization: `Bearer ${token}` } });
};

export const apiCreateOgp = async (token: string, request: PostRequest): Promise<PostResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.ogps.$post({ body: request, headers: { Authorization: `Bearer ${token}` } });
};

export const apiEditOgp = async (token: string, request: PutRequest): Promise<PutResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.ogps.$post({ body: request, headers: { Authorization: `Bearer ${token}` } });
};

export const apiDeleteOgp = async (token: string, request: DeleteRequest): Promise<DeleteResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.ogps.$delete({
    body: request,
    headers: { Authorization: `Bearer ${token}` },
  });
};
