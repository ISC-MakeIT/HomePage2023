import { css } from '@emotion/react';

export const Arrow = () => {
  return (
    <div
      css={css`
        width: 22px;
        height: 22px;
      `}
    >
      <svg
        css={css`
          width: 100%;
          height: 100%;
        `}
        viewBox='0 0 22 22'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='11' cy='11' r='10' stroke='white' stroke-width='2' />
      </svg>

      <svg
        css={css`
          display: block;
          width: 50%;
          height: auto;
          margin: auto;
          position: relative;
          top: -69%;
        `}
        viewBox='0 0 10 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M6.59099 0.80974L5.95459 1.44614L8.05152 3.54306L0.675689 3.54306L0.675688 4.44038L8.05152 4.44038L5.95459 6.5373L6.59099 7.1737L9.77297 3.99172L6.59099 0.80974Z'
          fill='white'
        />
      </svg>
    </div>
  );
};
