import { Helmet } from 'react-helmet';
import { Contact } from '../organisms/user/presentationalComponents/Contact';
import { Footer } from '../organisms/user/presentationalComponents/Footer';
import { Top } from '../organisms/user/presentationalComponents/Top';
import { MembersContainer } from '../organisms/user/containerComponents/MembersContainer';
import { WorkContainer } from '../organisms/user/containerComponents/WorkContainer';
import { NotificationContainer } from '../organisms/user/containerComponents/NotificationContainer';
import { HeaderWithTopPage } from '../templates/user/HeaderWithTopPage';

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
      <Contact />
      <Footer />
    </HeaderWithTopPage>
  );
};
