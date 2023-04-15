import { css } from '@emotion/react';

type RedBoldTextProps = {
  children: React.ReactNode;
};

export const RedBoldText = ({ children }: RedBoldTextProps) => {
  return (
    <p
      css={css`
        font-size: 1rem;
        font-weight: bold;
        color: #ff8567;
        margin: 0;
      `}
    >
      {children}
    </p>
  );
};
