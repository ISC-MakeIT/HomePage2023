import { css } from '@emotion/react';

interface GreyMediumTextProps {
  children: React.ReactNode;
}

export const GreyMediumText = ({ children }: GreyMediumTextProps) => {
  return (
    <p
      css={css`
        font-size: 1rem;
        color: #333;
      `}
    >
      {children}
    </p>
  );
};
