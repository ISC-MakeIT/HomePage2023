import { CreateNotificationModalContainer } from 'src/components/organisms/admin/containerComponents/CreateNotificationModalContainer';
import { NotificationListContainer } from 'src/components/organisms/admin/containerComponents/NotificationListContainer';
import { NavigationWithHeader } from '@components/templates/admin/NavigraitonWithHeader';
import Head from 'next/head';

const Notifications = () => {
  return (
    <NavigationWithHeader>
      <Head>
        <title>お知らせ一覧 | MakeIT</title>
      </Head>

      <CreateNotificationModalContainer />
      <NotificationListContainer />
    </NavigationWithHeader>
  );
};

export default Notifications;
