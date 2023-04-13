import { css } from '@emotion/react';

type GreyBoldTextProps = {
  children: React.ReactNode;
};

export const GreyBoldText = ({ children }: GreyBoldTextProps) => {
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
