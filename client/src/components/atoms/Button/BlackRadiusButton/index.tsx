import React from 'react';
import { css } from '@emotion/react';

interface BlackRadiusProps {
  content: JSX.Element;
}

export const BlackRadiusButton = ({ content }: BlackRadiusProps) => {
  return (
    <button
      css={css`
        box-sizing: border-box;
        width: 99px;
        height: 32px;
        border: 1px solid #333;
        border-radius: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.01);
        color: #333;
        :hover {
          cursor: pointer;
        }
      `}
    >
      {content}
    </button>
  );
};
