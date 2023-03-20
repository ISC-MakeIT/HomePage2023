import { MakeIT } from '../atoms/Logo/MakeIT';
import { Github } from '../atoms/Button/Icon/Github';
import { Background } from '../atoms/Background';
import { css } from '@emotion/react';
import { GithubButton } from '../molecules/Github';

export const Home = () => {
  return (
    <div>
      <div
        css={css`
          z-index: 20;
          position: absolute;
        `}
      >
        <MakeIT />
        <div
          css={css`
            background-color: black;
            width: 19px;
            height: 19px;
          `}
        >
          <Github />
          <GithubButton/>
        </div>
      </div>
      <Background />
    </div>
  );
};
