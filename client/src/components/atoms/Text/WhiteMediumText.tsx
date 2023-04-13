import { css } from '@emotion/react';

type GreyMediumTextProps = {
  children: React.ReactNode;
};

export const WhiteMediumText = ({ children }: GreyMediumTextProps) => {
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
