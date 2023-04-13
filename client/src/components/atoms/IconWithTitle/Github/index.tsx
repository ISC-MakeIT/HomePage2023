import { css } from '@emotion/react';
import { WhiteGithub } from '../../Button/Icon/WhiteGithub';

export const GithubLogo = () => {
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
        <WhiteGithub />
      </div>
      <p
        css={css`
          color: #ffffff;
          font-size: 18px;
          font-weight: 700;
        `}
      >
        Github
      </p>
    </div>
  );
};
