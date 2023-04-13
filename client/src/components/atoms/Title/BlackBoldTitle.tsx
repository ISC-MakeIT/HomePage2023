import { css } from '@emotion/react';

type BlackBoldTitleProps = {
  children: React.ReactNode;
};

export const BlackBoldTitle = ({ children }: BlackBoldTitleProps) => {
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
