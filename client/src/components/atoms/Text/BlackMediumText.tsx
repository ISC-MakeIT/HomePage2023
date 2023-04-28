import { css } from '@emotion/react';

interface GreyMediumTextProps {
  children: React.ReactNode;
}

export const BlackMediumText = ({ children }: GreyMediumTextProps) => {
  return (
    <p
      css={css`
        font-size: 1rem;
        color: #000;
      `}
    >
      {children}
    </p>
  );
};
