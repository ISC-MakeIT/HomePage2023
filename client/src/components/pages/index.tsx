import { css } from '@emotion/react';
import { Helmet } from 'react-helmet';
import { Header } from '../organisms/Header';
import { Top } from '../organisms/Top';

export const Home = () => {
  return (
    <div>
      <Helmet>
        <title>MakeITトップページ | MakeIT</title>
      </Helmet>
      <div
        css={css`
          z-index: 10;
          position: absolute;
        `}
      >
        <Header />
        <Top />
      </div>
    </div>
  );
};
