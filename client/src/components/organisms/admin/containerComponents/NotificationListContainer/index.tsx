import { apiNotifications } from '@api/admin/notifications';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { type GetResponse, type Notification } from 'src/api/homePage/api/admin/notifications';
import { useAlert } from 'src/modules/hooks/useAlert';
import { NotificationList } from '../../presentationalComponents/NotificationList';
import { useProcessingLine } from 'src/modules/hooks/useProcessingLine';

export const NotificationListContainer = () => {
  const [notificationList, setNotificationList] = useState<Notification[]>([]);

  const alert = useAlert();
  const userToken = useAppSelector(selectUserToken);
  const proccessingLine = useProcessingLine();

  useEffect(() => {
    const main = async () => {
      try {
        proccessingLine.show();

        const response = await apiNotifications(userToken);
        setNotificationList(response);

        proccessingLine.hide();
      } catch (e) {
        proccessingLine.hide();

        if (axios.isAxiosError(e)) {
          const status = e.response!.status;
          const responseData = e.response!.data as GetResponse;

          if (status === 401) {
            return;
          }

          if (status === 403) {
            alert.show({
              type: 'error',
              content: 'このページにアクセスするためには、MEMBER以上の権限がなければなりません。',
            });
            return;
          }

          alert.show({
            type: 'error',
            content: responseData.message!,
          });
          return;
        }

        alert.show({
          type: 'error',
          content:
            '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。',
        });
      }
    };

    main();
  }, []);

  return <NotificationList notificationList={notificationList} />;
};
