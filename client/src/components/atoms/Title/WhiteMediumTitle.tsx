import { SerializedStyles, css } from '@emotion/react';

type WhiteLergeTitleProps = {
  children: React.ReactNode;
  style?: SerializedStyles;
};

export const WhiteMediumTitle = ({ children, style }: WhiteLergeTitleProps) => {
  return (
    <h3
      css={css`
        font-size: 1.5rem;
        color: #fff;
        line-height: 1.5;
        ${style}
      `}
    >
      {children}
    </h3>
  );
};
