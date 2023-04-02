import { css } from '@emotion/react';
import { GradientRadiusButton } from 'src/components/molecules/Button/GradientRadiusButton';

export const Contact = () => {
  return (
    <div
      css={css`
        height: 80px;
        border-radius: 40px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-inline: 40px;
        background-color: #ffffff;
      `}
    >
      <p
        css={css`
          font-size: 1.6vw;
          color: #330000;
          font-weight: 700;
        `}
      >
        サークルへの連絡はこちら
      </p>

      <div
        css={css`
          margin-left: 32px;
        `}
      >
        <GradientRadiusButton purpose='experience' text='体験入部' />
      </div>

      <div
        css={css`
          width: 2px;
          height: 24px;
          background: #333333;
          margin-left: 24px;
        `}
      ></div>

      <div
        css={css`
          margin-left: 32px;
        `}
      >
        <GradientRadiusButton purpose='project' text='案件の依頼' />
      </div>
    </div>
  );
};
