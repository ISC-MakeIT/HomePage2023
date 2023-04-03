import { css } from '@emotion/react';
import { Github } from '../../Button/Icon/Github';

export const GithubLogo = () => {
  return (
    <div
      css={css`
        width: 50%;
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
        <Github />
      </div>
      <p
        css={css`
          color: #ffffff;
          width: 60%;
          font-size: 18px;
          font-weight: 700;
        `}
      >Github</p>
    </div>
  );
};