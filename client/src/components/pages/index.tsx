import { Helmet } from 'react-helmet';
import { Contact } from '../organisms/user/presentationalComponents/Contact';
import { Notification } from '../organisms/user/presentationalComponents/Notification';
import { Footer } from '../organisms/user/presentationalComponents/Footer';
import { Top } from '../organisms/user/presentationalComponents/Top';
import { Work } from '../organisms/user/presentationalComponents/Work';
import { Members } from '../organisms/user/presentationalComponents/Members';

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>MakeITトップページ | MakeIT</title>
      </Helmet>
      <Top />
      <Notification />
      <Work />
      <Members />
      <Contact />
      <Footer />
    </>
  );
};
