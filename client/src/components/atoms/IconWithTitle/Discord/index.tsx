import { css } from '@emotion/react';
import { Discord } from '../../Icon/Discord';

export const DiscordLogo = () => {
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
        <Discord fill="#333" />
      </div>
      <p
        css={css`
          font-size: 1.125rem;
          font-weight: bold;
        `}
      >
        Discord
      </p>
    </div>
  );
};
