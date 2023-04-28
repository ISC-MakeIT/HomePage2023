import { apiNotifications, type Notification as APINotification } from '@api/user/notifications';
import { useEffect, useState } from 'react';
import { Notification } from '../../presentationalComponents/Notification';
import { cdate } from 'cdate';

const processNotification = (notification: APINotification): APINotification => {
  return {
    ...notification,
    createdAt: cdate(notification.createdAt).format('YYYY.MM.DD'),
  };
};

export const NotificationContainer = () => {
  const [notification, setNotification] = useState<APINotification>();

  useEffect(() => {
    const main = async () => {
      const response = await apiNotifications();

      if (response.length === 0) {
        return;
      }
      setNotification(processNotification(response[0]));
    };

    main();
  }, []);

  if (notification == null) {
    return <></>;
  }
  return <Notification {...notification} />;
};
