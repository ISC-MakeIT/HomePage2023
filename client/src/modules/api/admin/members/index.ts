import { homePageClient } from 'src/apiClient/homePage';
import {
  DeleteResponse,
  GetResponse,
  Member,
  PostRequest,
  PostResponse,
  PutRequest,
  PutResponse,
} from '../../../../api/homePage/api/admin/members';

export const apiMembers = async (token: string): Promise<GetResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.members.$get({ headers: { Authorization: `Bearer ${token}` } });
};

export const apiCreateMember = async (token: string, member: PostRequest): Promise<PostResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.members.$post({
    body: member,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const apiEditMe = async (token: string, member: PutRequest): Promise<PutResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.members.$put({
    body: member,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const apiDeleteMember = async (token: string, memberId: number): Promise<DeleteResponse> => {
  await homePageClient().sanctum.csrf_cookie.$get();
  return await homePageClient().api.admin.members.$delete({
    body: { memberId },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export type { GetResponse, PostResponse, PutResponse, Member };
