import { css } from '@emotion/react';
import { Helmet } from 'react-helmet';

export const Home = () => {
  return (
    <div
      css={css`
        background-color: black;
      `}
    >
      <Helmet>
        <title>MakeITトップページ | MakeIT</title>
      </Helmet>
    </div>
  );
};
