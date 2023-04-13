import { css } from '@emotion/react';
import { WhiteGithub } from '../../../../../atoms/Button/Icon/WhiteGithub';

export const WhiteGithubButtonContent = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 0.5rem;
      `}
    >
      <span
        css={css`
          width: 1.25rem;
          height: 1.25rem;
        `}
      >
        <WhiteGithub />
      </span>
      <span
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        Github
      </span>
    </div>
  );
};
