import { css } from '@emotion/react';

interface BlueMediumTitleProps {
  children: React.ReactNode;
}

export const BlueMediumTitle = ({ children }: BlueMediumTitleProps) => {
  return (
    <h3
      css={css`
        font-size: 2rem;
        color: #5ba0f1;
      `}
    >
      {children}
    </h3>
  );
};
