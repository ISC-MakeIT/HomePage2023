import { css } from '@emotion/react';
import { Helmet } from 'react-helmet';
import { Notification } from '../organisms/user/presentationalComponents/Notification';
import { Top } from '../organisms/user/presentationalComponents/Top';

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>MakeITトップページ | MakeIT</title>
      </Helmet>
      <Top />
      <Notification />
    </>
  );
};
