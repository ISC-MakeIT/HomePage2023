import { css } from '@emotion/react';

type GreenToBlueGradientButtonProps = {
  children: React.ReactNode;
};

export const GreenToBlueGradientButton = ({ children }: GreenToBlueGradientButtonProps) => {
  return (
    <button
      type='button'
      css={css`
        padding: 0.625rem;
        background: linear-gradient(93.95deg, #58e4a8 0%, #5ba0f1 100%);
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
