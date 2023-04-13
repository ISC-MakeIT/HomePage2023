import { css } from '@emotion/react';

export const ToyBackGround = () => {
  return (
    <div>
      <div
        css={css`
          position: absolute;
          left: -100px;
          top: 150px;
          background-color: #f1915b;
          opacity: 0.8;
          width: 340px;
          height: 340px;
          border-radius: 170px;
        `}
      />
      <div
        css={css`
          position: absolute;
          left: calc((100vw / 2) + 100px);
          background-color: #f15b5b;
          top: 40px;
          opacity: 0.8;
          width: 200px;
          height: 200px;
          border-radius: 100px;
        `}
      />
      <div
        css={css`
          position: absolute;
          left: calc((100vw / 2) + 50px);
          top: 600px;
          opacity: 0.8;
          border-bottom: 50px solid #c1f15b;
          border-right: 75px solid transparent;
          border-left: 75px solid transparent;
          transform: rotate(-7deg);
          ::before {
            content: '';
            position: absolute;
            left: -75px;
            border-bottom: 50px solid #c1f15b;
            border-right: 75px solid transparent;
            border-left: 75px solid transparent;
            transform: rotate(-71.5deg);
          }
          ::after {
            content: '';
            position: absolute;
            left: -75px;
            border-bottom: 50px solid #c1f15b;
            border-right: 75px solid transparent;
            border-left: 75px solid transparent;
            transform: rotate(71.5deg);
          }
        `}
      />
      <div
        css={css`
          position: absolute;
          top: 400px;
          left: calc(100vw - 300px);
          transform: rotate(71.5deg);
          width: 0px;
          border-right: calc(50px * 3) solid transparent;
          border-bottom: calc(86.6025px * 3) solid #5ba0f1;
          border-left: calc(50px * 3) solid transparent;
        `}
      />
    </div>
  );
};
