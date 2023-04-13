import { css } from '@emotion/react';
import { Man } from 'src/components/atoms/Button/Icon/Man';
import { Woman } from 'src/components/atoms/Button/Icon/Woman';
import { GradientButtonWithIconAndArrow } from 'src/components/molecules/user/Button/GradientButtonWithIconAndArrow';

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
        <GradientButtonWithIconAndArrow
          to='#contact'
          icon={<Man width='1.5rem' height='1.5rem' />}
          gradientType='greenToBlue'
        >
          体験入部
        </GradientButtonWithIconAndArrow>
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
        <GradientButtonWithIconAndArrow
          to='#contact'
          icon={<Woman width='1.5rem' height='1.5rem' />}
          gradientType='redToOrange'
        >
          案件の依頼
        </GradientButtonWithIconAndArrow>
      </div>
    </div>
  );
};
