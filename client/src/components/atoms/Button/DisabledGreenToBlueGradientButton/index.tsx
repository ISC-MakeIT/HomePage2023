import { css } from '@emotion/react';

interface DisabledGreenToBlueGradientButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export const DisabledGreenToBlueGradientButton = ({ type, children }: DisabledGreenToBlueGradientButtonProps) => {
  return (
    <button
      disabled
      type={type ?? 'button'}
      css={css`
        padding: 0.625rem;
        background: linear-gradient(93.95deg, #abf1d3 0%, #b8d6f8 100%);
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
