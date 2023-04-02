import { apiNotification, GetResponse, Notification as APINotification } from '@api/notifications/notification';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useProcessingLine } from 'src/modules/hooks/useProcessingLine';
import { Notification } from '../../presentationalComponents/Notification';

type NotificationContainerProps = {
  notificationId: number;
};

export const NotificationContainer = ({ notificationId }: NotificationContainerProps) => {
  const [notification, setNotification] = useState<APINotification>();
  const [error, setError] = useState<string>();
  const userToken = useAppSelector(selectUserToken);
  const proccessingLine = useProcessingLine();

  useEffect(() => {
    const main = async () => {
      try {
        proccessingLine.show();

        const response = await apiNotification(userToken, notificationId);
        setNotification(response);

        proccessingLine.hide();
      } catch (e) {
        proccessingLine.hide();

        if (axios.isAxiosError(e)) {
          const status = e.response!.status;
          const responseData: GetResponse = e.request!.data;

          if (status === 400 && responseData.message) {
            setError(responseData.message);
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
            setError('このページにアクセスするためには、MEMBER以上の権限がなければなりません。');
            return;
          }

          if (status === 404) {
            setError('お知らせは存在しません。');
            return;
          }

          setError(responseData.message);
          return;
        }

        setError(
          '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。',
        );
        return;
      }
    };

    main();
  }, []);

  const proccessNotificationFrom = (preNotification: APINotification) => {
    const twoDigitZeroPaddingBy = (count: number) => {
      return String(count).padStart(2, '0');
    };

    const getDateFormatFrom = (isoDate: string) => {
      const date = new Date(isoDate);

      return `${date.getFullYear()} ${twoDigitZeroPaddingBy(date.getMonth() + 1)}/${twoDigitZeroPaddingBy(
        date.getDate(),
      )} ${twoDigitZeroPaddingBy(date.getHours())}:${twoDigitZeroPaddingBy(date.getMinutes())}`;
    };

    return {
      ...preNotification,
      createdAt: getDateFormatFrom(preNotification.createdAt),
      updatedAt: getDateFormatFrom(preNotification.updatedAt),
    };
  };

  if (!notification) {
    return <></>;
  }

  return <Notification notification={proccessNotificationFrom(notification)} error={error} />;
};
