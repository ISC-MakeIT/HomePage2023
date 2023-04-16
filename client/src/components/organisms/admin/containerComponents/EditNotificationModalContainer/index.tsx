import { apiEditNotification } from '@api/admin/notifications';
import { apiNotification, Notification } from '@api/admin/notifications/notification';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'src/modules/hooks/useAlert';
import { useProcessingLine } from 'src/modules/hooks/useProcessingLine';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';
import { EditNotificationModal } from '../../presentationalComponents/EditNotificationModal';
import { ACTIVITY_STATE_CONSTANT, EditNotificationFormInput } from '../../types/EditNotificationFormInput';
import { useRouter } from 'next/router';

type EditNotificationModalContainerProps = {
  notificationId: number;
};

export const EditNotificationModalContainer = ({ notificationId }: EditNotificationModalContainerProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [notification, setNotification] = useState<Notification>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditNotificationFormInput>();
  const userToken = useAppSelector(selectUserToken);
  const alert = useAlert();
  const processingLine = useProcessingLine();
  const router = useRouter();

  useEffect(() => {
    const main = async () => {
      try {
        processingLine.show();

        const response = await apiNotification(userToken, notificationId);
        setNotification(response);

        processingLine.hide();
      } catch (e) {
        processingLine.hide();

        const MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT = 1000 * 10;

        if (axios.isAxiosError(e)) {
          const responseData = e.response!.data;
          const status = e.response!.status;

          if (status === 400) {
            alert.show(
              {
                type: 'error',
                content: Object.values(responseData.errors!).join('\n'),
              },
              MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT,
            );
            return;
          }

          if (status === 401) {
            return;
          }

          if (status === 403) {
            alert.show(
              {
                type: 'error',
                content: 'このページにアクセスするためには、ADMIN以上の権限がなければなりません。',
              },
              MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT,
            );
            return;
          }

          if (status === 404) {
            alert.show(
              {
                type: 'error',
                content: '存在しないお知らせです。',
              },
              MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT,
            );
            return;
          }

          if (responseData.message) {
            alert.show(
              {
                type: 'error',
                content: responseData.message!,
              },
              MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT,
            );
            return;
          }
        }

        alert.show(
          {
            type: 'error',
            content: '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。',
          },
          MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT,
        );
      }
    };

    main();
  }, []);

  const handleEditNotification: SubmitHandler<EditNotificationFormInput> = async (editNotificationFormInput) => {
    try {
      const response = await apiEditNotification(userToken, {
        notificationId: notificationId,
        title: editNotificationFormInput.title,
        contents: editNotificationFormInput.contents,
        isActive: editNotificationFormInput.activityState === ACTIVITY_STATE_CONSTANT.ACTIVE,
        currentVersion: notification?.currentVersion!,
      });

      const milliSecondCountsToHide = 10000;

      alert.show(
        {
          type: 'success',
          content: response.message!,
        },
        milliSecondCountsToHide,
      );
      setIsActive(false);
      router.push(ADMIN_ROUTE_FULL_PATH_MAP.NOTIFICATIONS);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const responseData = e.response!.data;
        const status = e.response!.status;

        if (status === 400) {
          setError(Object.values(responseData.errors!).join('\n'));
          return;
        }

        if (status === 403) {
          setError('このページにアクセスするためには、ADMIN以上の権限がなければなりません。');
          return;
        }

        if (status === 404) {
          setError('存在しないお知らせです。');
          return;
        }

        if (responseData.message) {
          setError(responseData.message!);
          return;
        }
      }

      setError(
        '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。',
      );
    }
  };

  if (!notification) {
    return <></>;
  }

  return (
    <EditNotificationModal
      isActive={isActive}
      handleOpen={() => setIsActive(true)}
      handleClose={() => setIsActive(false)}
      notification={notification}
      register={register}
      handleSubmit={handleSubmit}
      handleEditNotification={handleEditNotification}
      errors={errors}
      error={error}
    />
  );
};
