import { css } from '@emotion/react';
import { GithubLogo } from 'src/components/atoms/IconWithTitle/Github';
import { BlackMediumText } from '../../Text/BlackMediumText';

interface IntroduceGithubAccountProps {
  children?: React.ReactNode;
}

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
        grid-template-columns: 8.75rem 1fr;
      `}
    >
      <GithubLogo />
      <BlackMediumText>{children}</BlackMediumText>
    </div>
  );
};
