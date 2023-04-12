import { css } from '@emotion/react';
import { ReactNode } from 'react';

export const OrangeRadiusBox = ({ children }: { children?: ReactNode }) => {
  return (
    <div
      css={css`
        background-color: #fa5d36;
        height: 1.5rem;
        border-radius: 1.25rem;
        padding: 0.5rem 2rem;
        font-weight: 400;
        margin-right: 3rem;
        flex-grow: 0;
      `}
    >
      {children}
    </div>
  );
};
