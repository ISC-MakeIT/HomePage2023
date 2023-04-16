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
          width: 1.875rem;
          height: 1.4375rem;
          margin-right: 0.5rem;
        `}
      >
        <WhiteGithub />
      </div>
      <p
        css={css`
          color: #fff;
          font-size: 1.125rem;
          font-weight: bold;
        `}
      >
        Github
      </p>
    </div>
  );
};
