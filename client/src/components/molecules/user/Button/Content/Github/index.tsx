import { css } from '@emotion/react';
import { Github } from '../../../../../atoms/Button/Icon/Github';
import { GithubText } from '../../../../../atoms/Button/Text/Github';

export const GithubButtonContent = () => {
  return (
    <>
      <span
        css={css`
          width: 19px;
          height: 19px;
        `}
      >
        <Github />
      </span>
      <span
        css={css`
          width: auto;
          height: 15px;
          margin-left: 8px;
        `}
      >
        <GithubText />
      </span>
    </>
  );
};
