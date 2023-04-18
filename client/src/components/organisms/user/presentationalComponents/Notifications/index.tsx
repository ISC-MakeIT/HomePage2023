import { type Notification as APINotification } from '@api/user/notifications';
import { css } from '@emotion/react';
import { Stack } from 'src/components/atoms/Layout/Stack';
import { Notification } from 'src/components/molecules/user/Notification';
import { SectionTitle } from 'src/components/molecules/user/SectionTitle';

interface NotificationsProps {
  notifications: APINotification[];
}

export const Notifications = ({ notifications }: NotificationsProps) => {
  const NotificationList = () => (
    <Stack spacing="1rem">
      {notifications.map((notification, index) => (
        <Notification key={index} {...notification} />
      ))}
    </Stack>
  );

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <Stack
        spacing="5rem"
        style={css`
          width: 90%;
          margin: 0 auto;
        `}
      >
        <SectionTitle
          title="新着情報"
          description="サークルの活動に関することや、ブログ,リリース情報のお知らせです。"
        />
        <NotificationList />
      </Stack>
    </div>
  );
};
