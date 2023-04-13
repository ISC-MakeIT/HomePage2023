import { Helmet } from 'react-helmet';
import { Contact } from '../organisms/user/presentationalComponents/Contact';
import { Notification } from '../organisms/user/presentationalComponents/Notification';
import { Footer } from '../organisms/user/presentationalComponents/Footer';
import { Top } from '../organisms/user/presentationalComponents/Top';
import { MembersContainer } from '../organisms/user/containerComponents/MembersContainer';
import { WorkContainer } from '../organisms/user/containerComponents/WorkContainer';

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>MakeITトップページ | MakeIT</title>
      </Helmet>
      <Top />
      <Notification />
      <WorkContainer />
      <MembersContainer />
      <Contact />
      <Footer />
    </>
  );
};
