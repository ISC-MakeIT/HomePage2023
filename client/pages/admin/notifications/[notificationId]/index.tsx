import { Stack } from '@mui/system';
import { useRouter } from 'next/router';
import { DeleteNotificationModalContainer } from 'src/components/organisms/admin/containerComponents/DeleteNotificationModalContainer';
import { EditNotificationModalContainer } from 'src/components/organisms/admin/containerComponents/EditNotificationModalContainer';
import { NotificationContainer } from 'src/components/organisms/admin/containerComponents/NotificationContainer';
import { NavigationWithHeader } from 'src/components/templates/admin/NavigraitonWithHeader';

type RouterParams = {
  notificationId: string;
};

const Notification = () => {
  const router = useRouter();
  const { notificationId } = router.query as RouterParams;

  return (
    <NavigationWithHeader>
      <Stack flexDirection='row' columnGap={2}>
        <EditNotificationModalContainer notificationId={Number(notificationId)} />
        <DeleteNotificationModalContainer notificationId={Number(notificationId)} />
      </Stack>

      <NotificationContainer notificationId={Number(notificationId)} />
    </NavigationWithHeader>
  );
};

export default Notification;
