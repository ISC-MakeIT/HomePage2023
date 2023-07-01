import { apiDeleteMember } from '@api/admin/members';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import axios from 'axios';
import { useState } from 'react';
import { type DeleteResponse } from 'src/api/homePage/api/admin/members';
import { useAlert } from 'src/modules/hooks/useAlert';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';
import { DeleteMemberModel } from '../../presentationalComponents/DeleteMemberModel';
import { useRouter } from 'next/router';

interface DeleteMemberModelContainerProps {
  memberId: number;
}

export const DeleteMemberModelContainer = ({ memberId }: DeleteMemberModelContainerProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const userToken = useAppSelector(selectUserToken);
  const alert = useAlert();
  const router = useRouter();

  const handleDeleteMember = async () => {
    try {
      const response = await apiDeleteMember(userToken, memberId);
      alert.show({
        type: 'success',
        content: response.message!,
      });
      router.push(ADMIN_ROUTE_FULL_PATH_MAP.MEMBERS);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const status = e.response!.status;
        const responseData = e.response!.data as DeleteResponse;

        if (status === 400) {
          setError(Object.values(responseData.errors!).join('\n'));
          return;
        }

        if (status === 401) {
          return;
        }

        if (status === 404) {
          setError('既にメンバーが削除されています。');
          return;
        }

        setError(responseData.message);
        return;
      }
      setError(
        '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。'
      );
    }
  };

  return (
    <DeleteMemberModel
      isActive={isActive}
      handleOpen={() => {
        setIsActive(true);
      }}
      handleClose={() => {
        setIsActive(false);
      }}
      handleDeleteMember={handleDeleteMember}
      error={error}
    />
  );
};
