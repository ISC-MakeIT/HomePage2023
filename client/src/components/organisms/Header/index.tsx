import { css } from '@emotion/react';
import { Navigation } from 'src/components/molecules/Navigation';
import { MakeIT } from 'src/components/atoms/Logo/MakeIT';
import { GithubButton } from 'src/components/molecules/Button/Github';
import { GradientRadiusButton } from 'src/components/molecules/Button/GradientRadiusButton';

export const Header = () => {
  return (
    <header
      css={css`
        width: 100%;
        z-index: 20;
        position: fixed;
        padding: 32px;
        display: flex;
        justify-content: space-around;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={css`
            width: 113px;
            margin-right: 24px;
          `}
        >
          <MakeIT />
        </div>
        <Navigation />
        <div
          css={css`
            margin-left: 24px;
          `}
        >
          <GithubButton />
        </div>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <GradientRadiusButton purpose={'experience'} text={'体験入部'} />
        <GradientRadiusButton purpose={'project'} text={'案件の依頼'} />
      </div>
    </header>
  );
};
