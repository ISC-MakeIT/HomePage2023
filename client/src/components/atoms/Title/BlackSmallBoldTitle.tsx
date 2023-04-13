import { css } from '@emotion/react';

type BlackSmallBoldTitleProps = {
  children: React.ReactNode;
};

export const BlackSmallBoldTitle = ({ children }: BlackSmallBoldTitleProps) => {
  return (
    <h3
      css={css`
        font-size: 1.5rem;
        color: #000;
      `}
    >
      {children}
    </h3>
  );
};
