import { css } from '@emotion/react';

type BlackLargeTitleProps = {
  children: React.ReactNode;
};

export const BlackLargeTitle = ({ children }: BlackLargeTitleProps) => {
  return (
    <h3
      css={css`
        font-size: 2rem;
        color: #000;
      `}
    >
      {children}
    </h3>
  );
};
