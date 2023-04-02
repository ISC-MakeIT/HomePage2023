import { css } from '@emotion/react';
import { Helmet } from 'react-helmet';
import { Contact } from '../organisms/user/presentationalComponents/Contact/Index';
import { Footer } from '../organisms/user/presentationalComponents/Footer/Index';
import { Top } from '../organisms/user/presentationalComponents/Top';

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>MakeITトップページ | MakeIT</title>
      </Helmet>
      <Top />
      <Contact />
      <Footer />
    </>
  );
};
