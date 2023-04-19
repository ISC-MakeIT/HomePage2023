import { css } from '@emotion/react';
import { type ReactNode } from 'react';

export const WhiteRadiusBox = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <div
        css={css`
          background-color: white;
          height: 2.5rem;
          border-radius: 1.25rem;
          padding: 1rem 3rem;
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        `}
      >
        {children}
      </div>
    </div>
  );
};
