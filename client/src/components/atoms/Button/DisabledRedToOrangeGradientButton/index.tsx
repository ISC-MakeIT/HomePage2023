import { css } from '@emotion/react';

type DisabledRedToOrangeGradientButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

export const DisabledRedToOrangeGradientButton = ({ type, children }: DisabledRedToOrangeGradientButtonProps) => {
  return (
    <button
      disabled
      type={type ?? 'button'}
      css={css`
        padding: 0.625rem;
        background: linear-gradient(93.95deg, #fca996 0%, #ffefa3 100%);
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
