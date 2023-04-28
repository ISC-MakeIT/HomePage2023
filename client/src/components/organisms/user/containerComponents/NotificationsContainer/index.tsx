import { apiNotifications, type Notification as APINotification } from '@api/user/notifications';
import { useEffect, useState } from 'react';
import { cdate } from 'cdate';
import { Notifications } from '../../presentationalComponents/Notifications';

const processNotification = (notification: APINotification): APINotification => {
  return {
    ...notification,
    createdAt: cdate(notification.createdAt).format('YYYY.MM.DD'),
  };
};

export const NotificationsContainer = () => {
  const [notifications, setNotifications] = useState<APINotification[]>();

  useEffect(() => {
    const main = async () => {
      const response = await apiNotifications();

      if (response.length === 0) {
        return;
      }
      setNotifications(response.map((notification) => processNotification(notification)));
    };

    main();
  }, []);

  if (notifications == null) {
    return <></>;
  }

  return <Notifications notifications={notifications} />;
};
