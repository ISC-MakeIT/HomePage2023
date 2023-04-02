import { Helmet } from 'react-helmet-async';
import { CreateNotificationModalContainer } from 'src/components/organisms/admin/containerComponents/CreateNotificationModalContainer';
import { NotificationListContainer } from 'src/components/organisms/admin/containerComponents/NotificationListContainer';
import { NavigationWithHeader } from '../../../templates/admin/NavigraitonWithHeader';

export const Notifications = () => {
  return (
    <NavigationWithHeader>
      <Helmet>
        <title>お知らせ一覧 | MakeIT</title>
      </Helmet>

      <CreateNotificationModalContainer />
      <NotificationListContainer />
    </NavigationWithHeader>
  );
};
