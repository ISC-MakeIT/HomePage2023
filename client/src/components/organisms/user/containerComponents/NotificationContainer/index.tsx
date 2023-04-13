import { apiNotifications, Notification as APINotification } from '@api/user/notifications';
import { useEffect, useState } from 'react';
import { Notification } from '../../presentationalComponents/Notification';
import { cdate } from 'cdate';

const hasFullWidthChar = (str: string) => {
  return Boolean(str.match(/[\x01-\x7E\uFF65-\uFF9F]/));
};

const isWithinByteRange = (currentByte: number, startByte: number, byteLength: number, charByteSize: number) => {
  return currentByte >= startByte && currentByte + charByteSize <= startByte + byteLength;
};

const isByteLengthExceeded = (currentByte: number, startByte: number, byteLength: number) => {
  return currentByte > startByte + byteLength;
};

const getSubstringByByte = (str: string, startByte: number, byteLength: number) => {
  let result = '';
  let currentByte = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    const charByteSize = hasFullWidthChar(char) ? 2 : 1;

    if (isWithinByteRange(currentByte, startByte, byteLength, charByteSize)) {
      result += char;
    }

    currentByte += charByteSize;

    if (isByteLengthExceeded(currentByte, startByte, byteLength)) {
      break;
    }
  }

  return result;
};

const processNotification = (notification: APINotification): APINotification => {
  return {
    ...notification,
    title: getSubstringByByte(notification.title, 0, 48),
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

  if (!notification) {
    return <></>;
  }
  return <Notification {...notification} />;
};