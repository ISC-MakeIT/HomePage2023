import { css } from '@emotion/react';
import { Man } from 'src/components/atoms/Button/Icon/Man';
import { Woman } from 'src/components/atoms/Button/Icon/Woman';
import { GradientButtonWithIconAndArrow } from 'src/components/molecules/user/Button/GradientButtonWithIconAndArrow';
import { CONSTANT_CONTACT_CATEGORIE } from 'src/components/organisms/user/constants/ContactCategories';
import { maxScreen } from 'src/modules/helpers/mediaQueries';
import { USER_ROUTE_PATH_MAP } from 'src/routes/routePath';

export const Contact = () => {
  return (
    <div
      css={css`
        border-radius: 40px;
        display: flex;
        align-items: center;
        padding: 1.25rem 2.5rem;
        background-color: #ffffff;
        column-gap: 2rem;

        ${maxScreen('md')} {
          row-gap: 1rem;
          flex-direction: column;
          border-radius: 0;
          padding: 4rem;
        }
      `}
    >
      <p
        css={css`
          font-size: 2rem;
          color: #330000;
          font-weight: bold;
          margin: 0;
          text-align: center;
        `}
      >
        サークルへの連絡はこちら
      </p>

      <div
        css={css`
          display: flex;
          justify-content: flex-start;
          align-items: center;
          column-gap: 1.5rem;
        `}
      >
        <GradientButtonWithIconAndArrow
          to={`${USER_ROUTE_PATH_MAP.TOP}?contactCategory=${CONSTANT_CONTACT_CATEGORIE.EXPERIENCE}#contact`}
          icon={<Man width="1.5rem" height="1.5rem" />}
          gradientType="greenToBlue"
        >
          体験入部
        </GradientButtonWithIconAndArrow>

        <div
          css={css`
            width: 2px;
            height: 24px;
            background: #333333;
          `}
        />

        <GradientButtonWithIconAndArrow
          to={`${USER_ROUTE_PATH_MAP.TOP}?contactCategory=${CONSTANT_CONTACT_CATEGORIE.PROJECT}#contact`}
          icon={<Woman width="1.5rem" height="1.5rem" />}
          gradientType="redToOrange"
        >
          案件の依頼
        </GradientButtonWithIconAndArrow>
      </div>
    </div>
  );
};
