import { apiNotifications } from '@api/notifications';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetResponse, Notification } from 'src/api/homePage/api/admin/notifications';
import { useAlert } from 'src/modules/hooks/useAlert';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';
import { NotificationList } from '../../presentationalComponents/NotificationList';

export const NotificationListContainer = () => {
  const [notificationList, setNotificationList] = useState<Notification[]>([]);

  const alert = useAlert();
  const userToken = useAppSelector(selectUserToken);
  const navigate = useNavigate();
  const state: { refresh?: boolean } = useLocation().state;

  useEffect(() => {
    if (userToken === '') {
      alert.show({
        type: 'error',
        content: 'ログインが必要です。',
      });
      navigate(ADMIN_ROUTE_FULL_PATH_MAP.LOGIN);
      return;
    }

    const main = async () => {
      try {
        const response = await apiNotifications(userToken);
        setNotificationList(response);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const response = e.response!;
          const responseData: GetResponse = e.response!.data;

          if (response.status === 403) {
            alert.show({
              type: 'error',
              content: responseData.message!,
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
        return;
      }
    };

    main();
  }, [state]);

  return <NotificationList notificationList={notificationList} />;
};
