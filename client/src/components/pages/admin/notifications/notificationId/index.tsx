import { Stack } from '@mui/system';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { DeleteNotificationModalContainer } from 'src/components/organisms/admin/containerComponents/DeleteNotificationModalContainer';
import { EditNotificationModalContainer } from 'src/components/organisms/admin/containerComponents/EditNotificationModalContainer';
import { NotificationContainer } from 'src/components/organisms/admin/containerComponents/NotificationContainer';
import { NavigationWithHeader } from '../../../../templates/admin/NavigraitonWithHeader';

type RouterParams = {
  notificationId: string;
};

export const Notification = () => {
  const { notificationId } = useParams<RouterParams>();

  return (
    <NavigationWithHeader>
      <Helmet>
        <title>お知らせID: {notificationId} の詳細 | MakeIT</title>
      </Helmet>

      <Stack flexDirection='row' columnGap={2}>
        <EditNotificationModalContainer notificationId={Number(notificationId)} />
        <DeleteNotificationModalContainer notificationId={Number(notificationId)} />
      </Stack>

      <NotificationContainer notificationId={Number(notificationId)} />
    </NavigationWithHeader>
  );
};
