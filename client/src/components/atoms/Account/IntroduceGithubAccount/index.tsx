import { css } from '@emotion/react';
import { GithubLogo } from 'src/components/atoms/Logo/Github';
import { WhiteMediumText } from '../../Text/WhiteMediumText';

type IntroduceGithubAccountProps = {
  children?: React.ReactNode;
};

export const IntroduceGithubAccount = ({ children }: IntroduceGithubAccountProps) => {
  if (!children) {
    return <></>;
  }

  return (
    <div
      css={css`
        display: grid;
        justify-content: flex-start;
        align-items: center;
        grid-template-columns: 140px 1fr;
      `}
    >
      <GithubLogo />
      <WhiteMediumText>{children}</WhiteMediumText>
    </div>
  );
};
