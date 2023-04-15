import { Helmet } from 'react-helmet';
import { Footer } from '../organisms/user/presentationalComponents/Footer';
import { Top } from '../organisms/user/presentationalComponents/Top';
import { MembersContainer } from '../organisms/user/containerComponents/MembersContainer';
import { WorkContainer } from '../organisms/user/containerComponents/WorkContainer';
import { NotificationContainer } from '../organisms/user/containerComponents/NotificationContainer';
import { HeaderWithTopPage } from '../templates/user/HeaderWithTopPage';
import { ContactContainer } from '../organisms/user/containerComponents/ContactContainer';
import { Recruit } from '../organisms/user/presentationalComponents/Recruit';

export const Home = () => {
  return (
    <HeaderWithTopPage>
      <Helmet>
        <title>MakeITトップページ | MakeIT</title>
      </Helmet>
      <Top />
      <NotificationContainer />
      <WorkContainer />
      <MembersContainer />
      <Recruit />
      <ContactContainer />
      <Footer />
    </HeaderWithTopPage>
  );
};
