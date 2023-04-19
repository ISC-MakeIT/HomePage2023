import { css } from '@emotion/react';

interface WhiteLergeTextProps {
  children: React.ReactNode;
}

export const WhiteLergeText = ({ children }: WhiteLergeTextProps) => {
  return (
    <p
      css={css`
        font-size: 1.5rem;
        color: #fff;
        margin: 0;
        line-height: 1.5;
      `}
    >
      {children}
    </p>
  );
};
