import { apiDeleteWork, DeleteResponse } from '@api/works';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'src/modules/hooks/useAlert';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';
import { DeleteWorkModel } from '../../presentationalComponents/DeleteWorkModel';

type DeleteWorkModalContainerProps = {
  workId: number;
};

export const DeleteWorkModalContainer = ({ workId }: DeleteWorkModalContainerProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const userToken = useAppSelector(selectUserToken);
  const alert = useAlert();
  const navigate = useNavigate();

  const handleDeleteWork = async () => {
    try {
      const response = await apiDeleteWork(userToken, workId);
      alert.show({
        type: 'success',
        content: response.message!,
      });
      navigate(ADMIN_ROUTE_FULL_PATH_MAP.WORKS);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const status = e.response!.status;
        const responseData: DeleteResponse = e.response!.data;

        if (status === 400) {
          setError(Object.values(responseData.errors!).join('\n'));
          return;
        }

        if (status === 401) {
          return;
        }

        if (status === 404) {
          setError('既に活動実績が削除されています。');
          return;
        }

        setError(responseData.message);
        return;
      }
      setError(
        '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。',
      );
    }
  };

  return (
    <DeleteWorkModel
      isActive={isActive}
      handleOpen={() => setIsActive(true)}
      handleClose={() => setIsActive(false)}
      handleDeleteWork={handleDeleteWork}
      error={error}
    />
  );
};
