import { css } from '@emotion/react';
import { Discord } from '../../Icon/Discord';

export const DiscordLogo = () => {
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
        <Discord />
      </div>
      <p
        css={css`
          color: #ffffff;
          font-size: 18px;
          font-weight: 700;
        `}
      >
        Discord
      </p>
    </div>
  );
};
