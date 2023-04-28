import { css } from '@emotion/react';

interface WhiteBoldTextProps {
  children: React.ReactNode;
}

export const WhiteMediumBoldText = ({ children }: WhiteBoldTextProps) => {
  return (
    <p
      css={css`
        font-weight: bold;
        font-size: 1rem;
        color: #fff;
        margin: 0;
      `}
    >
      {children}
    </p>
  );
};
