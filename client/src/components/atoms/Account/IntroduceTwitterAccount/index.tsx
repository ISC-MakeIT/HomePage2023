import { css } from '@emotion/react';
import { TwitterLogo } from 'src/components/atoms/IconWithTitle/Twitter';
import { BlackMediumText } from '../../Text/BlackMediumText';

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
      <BlackMediumText>{children}</BlackMediumText>
    </div>
  );
};
