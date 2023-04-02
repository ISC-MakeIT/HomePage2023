import { apiCreateNotification } from '@api/notifications';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import axios from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'src/modules/hooks/useAlert';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';
import { CreateNotificationModal } from '../../presentationalComponents/CreateNotificationModal';
import { CreateNotificationFormInput } from '../../types/CreateNotificationFormInput';

export const CreateNotificationModalContainer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateNotificationFormInput>();
  const [error, setError] = useState<string>();
  const [isActive, setIsActive] = useState(false);

  const alert = useAlert();
  const userToken = useSelector(selectUserToken);
  const navigate = useNavigate();

  const handleOpen = () => setIsActive(true);
  const handleClose = () => setIsActive(false);

  const handleCreateNotification: SubmitHandler<CreateNotificationFormInput> = async (createNotificationFormInput) => {
    try {
      const response = await apiCreateNotification(userToken, createNotificationFormInput);
      alert.show({ type: 'success', content: response.message! });
      reset();
      setIsActive(false);

      navigate(ADMIN_ROUTE_FULL_PATH_MAP.NOTIFICATIONS, {
        state: { refresh: true },
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const status = e.response!.status;
        const responseData = e.response!.data;

        if (status === 400 && responseData.message) {
          setError(responseData.message!);
          return;
        }

        if (status === 400) {
          setError(Object.values(responseData.errors!).join('\n'));
          return;
        }

        if (status === 401) {
          return;
        }

        if (status === 403) {
          setError('お知らせを作成する権限がありません。');
          return;
        }

        setError(responseData.message!);
        return;
      }

      setError(
        '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。',
      );
    }
  };

  return (
    <CreateNotificationModal
      handleOpen={handleOpen}
      handleClose={handleClose}
      isActive={isActive}
      handleCreateNotification={handleCreateNotification}
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      error={error}
    />
  );
};
