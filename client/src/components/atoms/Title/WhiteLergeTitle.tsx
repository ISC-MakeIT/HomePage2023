import { SerializedStyles, css } from '@emotion/react';

type WhiteLergeTitleProps = {
  children: React.ReactNode;
  style?: SerializedStyles;
};

export const WhiteLergeTitle = ({ children, style }: WhiteLergeTitleProps) => {
  return (
    <h3
      css={css`
        font-size: 2rem;
        color: #fff;
        ${style}
      `}
    >
      {children}
    </h3>
  );
};
