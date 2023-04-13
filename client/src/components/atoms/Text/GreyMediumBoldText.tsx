import { css } from '@emotion/react';

type GreyMediumBoldTextProps = {
  children: React.ReactNode;
};

export const GreyMediumBoldText = ({ children }: GreyMediumBoldTextProps) => {
  return (
    <p
      css={css`
        font-size: 1rem;
        font-weight: bold;
        color: #333;
      `}
    >
      {children}
    </p>
  );
};
