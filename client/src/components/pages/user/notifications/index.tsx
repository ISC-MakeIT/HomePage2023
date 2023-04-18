import { Helmet } from 'react-helmet-async';
import { NotificationsContainer } from 'src/components/organisms/user/containerComponents/NotificationsContainer';
import { HeaderWithPage } from 'src/components/templates/user/HeaderWithPage';

export const Notifications = () => {
  return (
    <HeaderWithPage>
      <Helmet>
        <title>お知らせ一覧 | MakeIT</title>
      </Helmet>
      <NotificationsContainer />
    </HeaderWithPage>
  );
};
