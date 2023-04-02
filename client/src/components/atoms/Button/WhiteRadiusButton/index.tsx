import React from 'react';
import { css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

type buttonProps = {
  content: EmotionJSX.Element;
};

export const WhiteRadiusButton: React.FC<buttonProps> = (buttonContent) => {
  const { content } = buttonContent;
  return (
    <button
      css={css`
        box-sizing: border-box;
        width: 99px;
        height: 32px;
        border: 1px solid #ffffff;
        border-radius: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.01);
        color: #ffffff;
        :hover {
          cursor: pointer;
        }
      `}
    >
      {content}
    </button>
  );
};
