import { css } from '@emotion/react';

type WhiteBoldTextProps = {
  children: React.ReactNode;
};

export const WhiteBoldText = ({ children }: WhiteBoldTextProps) => {
  return (
    <p
      css={css`
        font-weight: bold;
        font-size: 1rem;
        color: #fff;
      `}
    >
      {children}
    </p>
  );
};
