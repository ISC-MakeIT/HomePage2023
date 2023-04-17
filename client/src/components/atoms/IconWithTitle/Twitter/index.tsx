import { css } from '@emotion/react';
import { Twitter } from '../../Icon/Twitter';

export const TwitterLogo = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        color: #333;
      `}
    >
      <div
        css={css`
          width: 1.875rem;
          height: 1.4375rem;
          margin-right: 0.5rem;
        `}
      >
        <Twitter fill='#333' />
      </div>
      <p
        css={css`
          font-size: 1.125rem;
          font-weight: bold;
        `}
      >
        Twitter
      </p>
    </div>
  );
};
