import { css } from '@emotion/react';
import { DiscordLogo } from 'src/components/atoms/IconWithTitle/Discord';
import { WhiteMediumText } from '../../Text/WhiteMediumText';

type IntroduceDiscordAccountProps = {
  children?: React.ReactNode;
};

export const IntroduceDiscordAccount = ({ children }: IntroduceDiscordAccountProps) => {
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
      <DiscordLogo />
      <WhiteMediumText>{children}</WhiteMediumText>
    </div>
  );
};
