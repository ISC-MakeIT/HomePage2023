import { CreateNotificationModalContainer } from 'src/components/organisms/admin/containerComponents/CreateNotificationModalContainer';
import { NotificationListContainer } from 'src/components/organisms/admin/containerComponents/NotificationListContainer';
import { NavigationWithHeader } from 'src/components/templates/admin/NavigraitonWithHeader';

const Notifications = () => {
  return (
    <NavigationWithHeader>
      <CreateNotificationModalContainer />
      <NotificationListContainer />
    </NavigationWithHeader>
  );
};

export default Notifications;
