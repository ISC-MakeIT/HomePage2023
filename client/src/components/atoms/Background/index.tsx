import { css } from '@emotion/react';

export const Background = () => {
  return (
    <div
      css={css`
        z-index: 10;
        width: 100vw;
        height: 100vh;
        background: url(/index_top_background.jpg) left top no-repeat;
        background-size: 100% 100%;
        position: fixed;
        overflow: hidden;
      `}
    ></div>
  );
};
