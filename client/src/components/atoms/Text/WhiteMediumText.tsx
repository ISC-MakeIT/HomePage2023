import { css } from '@emotion/react';

interface WhiteMediumTextProps {
  children: React.ReactNode;
}

export const WhiteMediumText = ({ children }: WhiteMediumTextProps) => {
  return (
    <p
      css={css`
        font-size: 1rem;
        color: #fff;
        margin: 0;
        line-height: 2;
      `}
    >
      {children}
    </p>
  );
};
