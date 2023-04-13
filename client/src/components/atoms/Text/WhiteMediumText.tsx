import { css } from '@emotion/react';

type WhiteMediumTextProps = {
  children: React.ReactNode;
};

export const WhiteMediumText = ({ children }: WhiteMediumTextProps) => {
  return (
    <p
      css={css`
        font-size: 1rem;
        color: #fff;
      `}
    >
      {children}
    </p>
  );
};
