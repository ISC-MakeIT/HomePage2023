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
          width: 1.875rem;
          height: 1.4375rem;
          margin-right: 0.5rem;
        `}
      >
        <Twitter />
      </div>
      <p
        css={css`
          color: #fff;
          font-size: 1.125rem;
          font-weight: bold;
        `}
      >
        Twitter
      </p>
    </div>
  );
};
