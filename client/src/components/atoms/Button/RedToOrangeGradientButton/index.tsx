import { css } from '@emotion/react';

interface RedToOrangeGradientButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export const RedToOrangeGradientButton = ({ type, children }: RedToOrangeGradientButtonProps) => {
  return (
    <button
      type={type ?? 'button'}
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
