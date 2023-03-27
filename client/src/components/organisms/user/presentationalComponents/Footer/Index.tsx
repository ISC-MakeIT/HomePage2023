import { css } from '@emotion/react';
import React from 'react';

export const Footer = () => {
  return (
    <div>
      <div
        css={css`
          position: relative;
        `}
      >
        <div
          css={css`
            background-image: url('/index_footer_background.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 0 -100px;
            height: 600px;
            width: 100vw;
          `}
        >
          <div
            css={css`
              background-color: rgba(0, 0, 0, 0.8);
              height: 600px;
            `}
          ></div>
        </div>

        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
          css={css`
            position: absolute;
            bottom: 0;
            width: 100vw;
          `}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
            <path
              fill='#ffffff'
              fill-opacity='1'
              d='M0,224L40,229.3C80,235,160,245,240,245.3C320,245,400,235,480,234.7C560,235,640,245,720,240C800,235,880,213,960,213.3C1040,213,1120,235,1200,234.7C1280,235,1360,213,1400,202.7L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z'
            ></path>
          </svg>
        </svg>
      </div>
      <div
        css={css`
          padding: 1rem;
          width: calc(100vw - 2rem);
          text-align: center;
          background-color: #f1915b;
        `}
      >
        ©ISCものづくりサークル 「MakeIT」
      </div>
    </div>
  );
};
