import {
  type PostRequest,
  type GetResponse,
  type PostResponse,
  type PutRequest,
  type PutResponse,
  type DeleteRequest,
  type DeleteResponse,
  type OGP,
} from 'src/api/homePage/api/admin/ogps';
import { homePageClient } from 'src/apiClient/homePage';

export const apiOGPList = async (token: string): Promise<GetResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.ogps.$get({ headers: { Authorization: `Bearer ${token}` } });
};

export const apiCreateOGP = async (token: string, request: PostRequest): Promise<PostResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.ogps.$post({ body: request, headers: { Authorization: `Bearer ${token}` } });
};

export const apiEditOGP = async (token: string, request: PutRequest): Promise<PutResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.ogps.$post({ body: request, headers: { Authorization: `Bearer ${token}` } });
};

export const apiDeleteOGP = async (token: string, request: DeleteRequest): Promise<DeleteResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.ogps.$delete({
    body: request,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export type { GetResponse, PostResponse, PutResponse, DeleteResponse, OGP };
