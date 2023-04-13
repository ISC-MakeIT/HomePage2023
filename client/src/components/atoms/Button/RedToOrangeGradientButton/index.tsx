import { css } from '@emotion/react';

type RedToOrangeGradientButtonProps = {
  children: React.ReactNode;
};

export const RedToOrangeGradientButton = ({ children }: RedToOrangeGradientButtonProps) => {
  return (
    <button
      type='button'
      css={css`
        padding: 0.625rem;
        background: linear-gradient(93.95deg, #fa5d36 0%, #ffdf3f 100%);
        display: flex;
        align-items: center;
        color: #ffffff;
        border: none;
        border-radius: 1.5rem;
        font-size: 1rem;
        font-weight: bold;
        line-height: 0;
        &:hover {
          cursor: pointer;
        }
      `}
    >
      {children}
    </button>
  );
};
