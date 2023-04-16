import { SerializedStyles, css } from '@emotion/react';

type WhiteButtonProps = {
  children?: React.ReactNode;
  style?: SerializedStyles;
};

export const WhiteButton = ({ children, style }: WhiteButtonProps) => {
  return (
    <button
      css={css`
        box-sizing: border-box;
        padding: 0.8rem 0.5rem;
        border: 1px solid #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.01);
        color: #ffffff;
        :hover {
          cursor: pointer;
        }

        ${style}
      `}
    >
      {children}
    </button>
  );
};
