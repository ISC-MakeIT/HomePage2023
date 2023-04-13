import { css } from '@emotion/react';
import { BlackGithub } from 'src/components/atoms/Button/Icon/BlackGithub';

export const BlackGithubButtonContent = () => {
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
        <BlackGithub />
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
