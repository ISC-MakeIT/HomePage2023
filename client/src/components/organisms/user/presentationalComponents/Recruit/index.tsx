import { css } from '@emotion/react';
import { Man } from 'src/components/atoms/Button/Icon/Man';
import { WhiteMakeIT } from 'src/components/atoms/Logo/WhiteMakeIT';
import { GradientButtonWithIconAndArrow } from 'src/components/molecules/user/Button/GradientButtonWithIconAndArrow';
import { USER_ROUTE_PATH_MAP } from 'src/routes/routePath';
import { CONSTANT_CONTACT_CATEGORIE } from '../../constants/ContactCategories';
import { WhiteMediumTitle } from 'src/components/atoms/Title/WhiteMediumTitle';
import { WhiteMediumText } from 'src/components/atoms/Text/WhiteMediumText';
import { maxScreen } from 'src/modules/helpers/mediaQueries';

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
        padding: 4.375rem 2.5rem;
        gap: 2.5rem;

        ${maxScreen('md')} {
          flex-direction: column;
        }

        ${maxScreen('sm')} {
          padding: 4.375rem 0.5rem;
        }
      `}
    >
      <div
        css={css`
          width: 35%;
        `}
      >
        <WhiteMakeIT />
      </div>

      <hr
        css={css`
          width: 0;
          height: 8.5rem;
          border: 0.125rem solid #ffffff;
          margin: 0;

          ${maxScreen('md')} {
            flex-direction: column;
            width: 8.5rem;
            height: 0;
          }
        `}
      />

      <div
        css={css`
          color: #fff;
          width: 90%;
        `}
      >
        <div
          css={css`
            text-align: center;
          `}
        >
          <WhiteMediumTitle>「Make IT」 はサークルメンバーを随時募集しています</WhiteMediumTitle>
        </div>

        <WhiteMediumText>
          コードが書けないプログラミング初心者・経験が無いけど実現したいことがあるデザイナー、
          具体的にやりたいことは決まってないけれど、開発を始めてみたい方などなど... Make ITは年齢 / 性別 /
          やりたいこと問わず「ものづくり」に興味がある方なら誰でも歓迎しています。
          <br />
          まずは体験入部からMake ITがどんなサークルか知って貰いたいので少しでも興味がある方は気楽に連絡ください。
          説明会のみも受け付けています。
        </WhiteMediumText>

        <div
          css={css`
            width: fit-content;
            height: fit-content;
            margin: 1.5rem auto;
          `}
        >
          <GradientButtonWithIconAndArrow
            to={`${USER_ROUTE_PATH_MAP.TOP}?contactCategory=${CONSTANT_CONTACT_CATEGORIE.EXPERIENCE}#contact`}
            icon={<Man width="1.5rem" height="1.5rem" />}
            gradientType="greenToBlue"
          >
            まずは気楽に体験入部
          </GradientButtonWithIconAndArrow>
        </div>
      </div>
    </div>
  );
};
