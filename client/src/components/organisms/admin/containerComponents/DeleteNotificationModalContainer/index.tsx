import { apiDeleteNotification, DeleteResponse } from '@api/notifications';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'src/modules/hooks/useAlert';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';
import { DeleteNotificationModel } from '../../presentationalComponents/DeleteNotificationModel';

type DeleteNotificationModalContainerProps = {
  notificationId: number;
};

export const DeleteNotificationModalContainer = ({ notificationId }: DeleteNotificationModalContainerProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const userToken = useAppSelector(selectUserToken);
  const alert = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken === '') {
      alert.show({
        type: 'error',
        content: 'ログインが必要です。',
      });
      navigate(ADMIN_ROUTE_FULL_PATH_MAP.LOGIN);
      return;
    }
  }, []);

  const handleDeleteNotification = async () => {
    try {
      const response = await apiDeleteNotification(userToken, notificationId);
      alert.show({
        type: 'success',
        content: response.message!,
      });
      navigate(ADMIN_ROUTE_FULL_PATH_MAP.NOTIFICATIONS);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const response = e.response!;
        const responseData: DeleteResponse = e.response!.data;

        if (response.status === 400) {
          setError(Object.values(responseData.errors!).join('\n'));
          return;
        }
        if (response.status === 404) {
          setError('既にお知らせが削除されています。');
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
    <DeleteNotificationModel
      isActive={isActive}
      handleOpen={() => setIsActive(true)}
      handleClose={() => setIsActive(false)}
      handleDeleteNotification={handleDeleteNotification}
      error={error}
    />
  );
};
