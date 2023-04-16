import { css } from '@emotion/react';
import { maxScreen } from 'src/modules/helpers/mediaQueries';

export const ToyBackGround = () => {
  return (
    <div>
      <div
        css={css`
          position: absolute;
          left: -100px;
          top: 150px;
          background-color: #f0a87e;
          opacity: 0.8;
          width: 340px;
          height: 340px;
          border-radius: 170px;

          ${maxScreen('md')} {
            display: none;
          }
        `}
      />
      <div
        css={css`
          position: absolute;
          left: calc((100% / 2) + 100px);
          background-color: #ec9d9d;
          top: 40px;
          opacity: 0.8;
          width: 200px;
          height: 200px;
          border-radius: 100px;

          ${maxScreen('md')} {
            display: none;
          }
        `}
      />
      <div
        css={css`
          position: absolute;
          left: calc((100% / 2) + 50px);
          top: 600px;
          opacity: 0.8;
          border-bottom: 50px solid #d4f195;
          border-right: 75px solid transparent;
          border-left: 75px solid transparent;
          transform: rotate(-7deg);
          ::before {
            content: '';
            position: absolute;
            left: -75px;
            border-bottom: 50px solid #d4f195;
            border-right: 75px solid transparent;
            border-left: 75px solid transparent;
            transform: rotate(-71.5deg);
          }
          ::after {
            content: '';
            position: absolute;
            left: -75px;
            border-bottom: 50px solid #d4f195;
            border-right: 75px solid transparent;
            border-left: 75px solid transparent;
            transform: rotate(71.5deg);
          }

          ${maxScreen('md')} {
            display: none;
          }
        `}
      />
      <div
        css={css`
          position: absolute;
          top: 400px;
          left: calc(100% - 300px);
          transform: rotate(71.5deg);
          width: 0px;
          border-right: calc(50px * 3) solid transparent;
          border-bottom: calc(86.6025px * 3) solid #8fbbed;
          border-left: calc(50px * 3) solid transparent;

          ${maxScreen('md')} {
            display: none;
          }
        `}
      />
    </div>
  );
};
