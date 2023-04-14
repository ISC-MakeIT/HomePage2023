import {
  DeleteResponse,
  GetResponse,
  Work,
  PostRequest,
  PostResponse,
  PutRequest,
  PutResponse,
} from 'src/api/homePage/api/admin/works';
import { homePageClient } from 'src/apiClient/homePage';

export const apiWorks = async (token: string): Promise<GetResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.works.$get({
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const apiCreateWork = async (token: string, work: PostRequest): Promise<PostResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.works.$post({
    headers: { Authorization: `Bearer ${token}` },
    body: work,
  });
};

export const apiEditWork = async (token: string, work: PutRequest): Promise<PutResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.works.$post({
    headers: { Authorization: `Bearer ${token}` },
    body: work,
  });
};

export const apiDeleteWork = async (token: string, workId: number): Promise<DeleteResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.works.$delete({
    headers: { Authorization: `Bearer ${token}` },
    body: { workId },
  });
};

export type { GetResponse, Work, PutResponse, DeleteResponse };
