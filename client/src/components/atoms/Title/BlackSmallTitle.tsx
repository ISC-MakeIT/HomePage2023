import { css } from '@emotion/react';

type BlackSmallTitleProps = {
  children: React.ReactNode;
};

export const BlackSmallTitle = ({ children }: BlackSmallTitleProps) => {
  return (
    <h3
      css={css`
        font-size: 1.5rem;
        color: #000;
        margin: 0;
      `}
    >
      {children}
    </h3>
  );
};
