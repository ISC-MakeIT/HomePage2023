import { Stack } from '@mui/system';
import { DeleteNotificationModalContainer } from 'src/components/organisms/admin/containerComponents/DeleteNotificationModalContainer';
import { EditNotificationModalContainer } from 'src/components/organisms/admin/containerComponents/EditNotificationModalContainer';
import { NotificationContainer } from 'src/components/organisms/admin/containerComponents/NotificationContainer';
import { NavigationWithHeader } from '@components/templates/admin/NavigraitonWithHeader';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Notification = () => {
  const { notificationId } = useRouter().query;

  return (
    <NavigationWithHeader>
      <Head>
        <title>お知らせID: {notificationId} の詳細 | MakeIT</title>
      </Head>

      <Stack flexDirection="row" columnGap={2}>
        <EditNotificationModalContainer notificationId={Number(notificationId)} />
        <DeleteNotificationModalContainer notificationId={Number(notificationId)} />
      </Stack>

      <NotificationContainer notificationId={Number(notificationId)} />
    </NavigationWithHeader>
  );
};

export default Notification;
