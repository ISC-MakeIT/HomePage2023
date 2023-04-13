import { css } from '@emotion/react';
import { Twitter } from '../../Icon/Twitter';

export const TwitterLogo = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <div
        css={css`
          width: 30px;
          height: 23px;
          margin-right: 8px;
        `}
      >
        <Twitter />
      </div>
      <p
        css={css`
          color: #ffffff;
          font-size: 18px;
          font-weight: 700;
        `}
      >
        Twitter
      </p>
    </div>
  );
};
