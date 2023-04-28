import { css } from '@emotion/react';
import { Arrow } from 'src/components/atoms/Button/Icon/Arrow';
import { WhiteButton } from 'src/components/atoms/Button/WhiteButton';
import { Flex } from 'src/components/atoms/Layout/Flex';
import { Stack } from 'src/components/atoms/Layout/Stack';
import { WhiteLergeText } from 'src/components/atoms/Text/WhiteLergeText';
import { WhiteMediumBoldText } from 'src/components/atoms/Text/WhiteMediumBoldText';
import { WhiteMediumText } from 'src/components/atoms/Text/WhiteMediumText';
import { maxScreen } from 'src/modules/helpers/mediaQueries';
import { USER_ROUTE_PATH_MAP } from 'src/routes/routePath';
import { CONSTANT_CONTACT_CATEGORIE } from '../../constants/ContactCategories';
import { NoDecorationLink } from 'src/components/atoms/Anchor/NoDecorationLink';

export const Footer = () => {
  return (
    <footer>
      <div
        css={css`
          background-image: url('/index_top_background.jpg');
          background-position: center;
          background-size: auto;
          background-repeat: no-repeat;
          background-position: center -100px;
          width: 100%;
          position: relative;
        `}
      >
        <div
          css={css`
            background-color: rgba(51, 51, 51, 0.8);
            padding: 0 0 120px 0;
          `}
        >
          <Flex
            spacing="3.125rem"
            style={css`
              padding: 3.125rem;

              ${maxScreen('lg')} {
                flex-direction: column;
              }
            `}
          >
            <div
              css={css`
                display: grid;
                grid-template-columns: 50% 1fr;
                align-items: center;
                width: 100%;
                row-gap: 1.75rem;
              `}
            >
              <NoDecorationLink to={`${USER_ROUTE_PATH_MAP.TOP}#about`}>
                <WhiteMediumText>MakeITについて</WhiteMediumText>
              </NoDecorationLink>
              <NoDecorationLink to={`${USER_ROUTE_PATH_MAP.TOP}#notification`}>
                <WhiteMediumText>新着情報</WhiteMediumText>
              </NoDecorationLink>
              <NoDecorationLink
                to={`${USER_ROUTE_PATH_MAP.TOP}?contactCategory=${CONSTANT_CONTACT_CATEGORIE.EXPERIENCE}#contact`}
              >
                <WhiteMediumText>体験入部</WhiteMediumText>
              </NoDecorationLink>

              <NoDecorationLink to={USER_ROUTE_PATH_MAP.WORKS}>
                <WhiteButton
                  style={css`
                    width: 9.5rem;
                  `}
                >
                  <WhiteMediumText>実績一覧</WhiteMediumText>
                  <Arrow color="#fff" />
                </WhiteButton>
              </NoDecorationLink>

              <NoDecorationLink
                to={`${USER_ROUTE_PATH_MAP.TOP}?contactCategory=${CONSTANT_CONTACT_CATEGORIE.PROJECT}#contact`}
              >
                <WhiteMediumText>案件依頼・お問い合わせ</WhiteMediumText>
              </NoDecorationLink>

              <NoDecorationLink to={`${USER_ROUTE_PATH_MAP.TOP}#members`}>
                <WhiteButton
                  style={css`
                    width: 12rem;
                  `}
                >
                  <WhiteMediumText>メンバー紹介</WhiteMediumText>
                  <Arrow color="#fff" />
                </WhiteButton>
              </NoDecorationLink>
            </div>

            <hr
              css={css`
                width: 1px;
                height: auto;
                background-color: white;
                border: none;
                margin: 0;

                ${maxScreen('lg')} {
                  height: 1px;
                  width: 100%;
                }
              `}
            />

            <Stack
              spacing={'1.5rem'}
              style={css`
                width: 100%;
              `}
            >
              <Stack spacing={'0.75rem'}>
                <WhiteLergeText>Contact</WhiteLergeText>
                <WhiteMediumText>Mail: makeit@gn.iwasaki.ac.jp</WhiteMediumText>
              </Stack>

              <Stack spacing={'0.75rem'}>
                <WhiteLergeText>Address</WhiteLergeText>
                <WhiteMediumText>
                  〒221-0835
                  <br />
                  神奈川県横浜市神奈川区鶴屋町2-17 相鉄岩崎学園ビル 情報科学専門学校
                </WhiteMediumText>
              </Stack>
            </Stack>
          </Flex>
        </div>

        <svg
          css={css`
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 120px;
          `}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,192L26.7,181.3C53.3,171,107,149,160,154.7C213.3,160,267,192,320,202.7C373.3,213,427,203,480,181.3C533.3,160,587,128,640,112C693.3,96,747,96,800,117.3C853.3,139,907,181,960,186.7C1013.3,192,1067,160,1120,133.3C1173.3,107,1227,85,1280,96C1333.3,107,1387,149,1413,170.7L1440,192L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
          />
        </svg>
      </div>

      <div
        css={css`
          padding: 1rem;
          width: calc(100% - 2rem);
          text-align: center;
          background-color: #f1915b;
        `}
      >
        <WhiteMediumBoldText>©ISCものづくりサークル 「MakeIT」</WhiteMediumBoldText>
      </div>
    </footer>
  );
};
