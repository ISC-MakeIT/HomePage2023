import { css } from '@emotion/react';
import { TwitterLogo } from 'src/components/atoms/IconWithTitle/Twitter';
import { WhiteMediumText } from '../../Text/WhiteMediumText';

type IntroduceTwitterAccountProps = {
  children?: React.ReactNode;
};

export const IntroduceTwitterAccount = ({ children }: IntroduceTwitterAccountProps) => {
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
      <TwitterLogo />
      <WhiteMediumText>{children}</WhiteMediumText>
    </div>
  );
};
