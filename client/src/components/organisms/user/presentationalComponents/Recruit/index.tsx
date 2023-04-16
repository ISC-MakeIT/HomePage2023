import { css } from '@emotion/react';
import { Man } from 'src/components/atoms/Button/Icon/Man';
import { WhiteMakeIT } from 'src/components/atoms/Logo/WhiteMakeIT';
import { GradientButtonWithIconAndArrow } from 'src/components/molecules/user/Button/GradientButtonWithIconAndArrow';

export const Recruit = () => {
  return (
    <div
      css={css`
        width: 90%;
        border-radius: 3.31rem;
        margin: 5rem auto;
        background-color: #333333;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: inline-block;
          width: 35%;
          padding: 0 5rem;
        `}
      >
        <WhiteMakeIT />
      </div>
      <div
        css={css`
          width: 0;
          height: 8.5rem;
          border: 0.125rem solid #ffffff;
          margin: 0;
        `}
      ></div>
      <div
        css={css`
          width: 65%;
          color: #ffffff;
          display: inline-block;
          padding: 4.375rem 2.5rem;
        `}
      >
        <h1
          css={css`
            font-size: 1.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 5rem;
          `}
        >
          「Make IT」 はサークルメンバーを随時募集しています
        </h1>
        <p
          css={css`
            font-size: 1rem;
            font-weight: 400;
            line-height: 2em;
          `}
        >
          コードが書けないプログラミング初心者・経験が無いけど実現したいことがあるデザイナー、
          具体的にやりたいことは決まってないけれど、開発を始めてみたい方などなど... Make ITは年齢 / 性別 /
          やりたいこと問わず「ものづくり」に興味がある方なら誰でも歓迎しています。
          <br />
          まずは体験入部からMake ITがどんなサークルか知って貰いたいので少しでも興味がある方は気楽に連絡ください。
          説明会のみも受け付けています。
        </p>
        <div
          css={css`
            width: fit-content;
            height: fit-content;
            margin: 1.5rem auto;
          `}
        >
          <GradientButtonWithIconAndArrow
            to='#'
            icon={<Man width='1.5rem' height='1.5rem' />}
            gradientType='greenToBlue'
          >
            まずは気楽に体験入部
          </GradientButtonWithIconAndArrow>
        </div>
      </div>
    </div>
  );
};
