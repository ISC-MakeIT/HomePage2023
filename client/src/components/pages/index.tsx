import { css } from '@emotion/react';
import { Helmet } from 'react-helmet';
import { Header } from '../organisms/Header';
import { Contact } from '../organisms/user/presentationalComponents/Contact/Index';
import { Top } from '../organisms/user/presentationalComponents/Top';

export const Home = () => {
  return (
    <div>
      <Helmet>
        <title>MakeITトップページ | MakeIT</title>
      </Helmet>
      <Top />
      <Contact />
    </div>
  );
};
