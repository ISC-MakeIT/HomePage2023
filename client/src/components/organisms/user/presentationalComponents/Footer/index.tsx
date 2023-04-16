import { css } from '@emotion/react';
import { Arrow } from 'src/components/atoms/Button/Icon/Arrow';
import { WhiteButton } from 'src/components/atoms/Button/WhiteButton';
import { Flex } from 'src/components/atoms/Layout/Flex';
import { Stack } from 'src/components/atoms/Layout/Stack';
import { WhiteLergeText } from 'src/components/atoms/Text/WhiteLergeText';
import { WhiteMediumBoldText } from 'src/components/atoms/Text/WhiteMediumBoldText';
import { WhiteMediumText } from 'src/components/atoms/Text/WhiteMediumText';
import { maxScreen } from 'src/modules/helpers/mediaQueries';

export const Footer = () => {
  const links = [
    {
      name: 'MakeITについて',
      border: false,
      icon: null,
    },
    {
      name: '案件依頼・お問い合わせ',
      border: false,
      icon: null,
    },
    {
      name: '新着情報',
      border: false,
      icon: null,
    },
    {
      name: '体験入部',
      border: false,
      icon: null,
    },
    {
      name: '実績',
      border: false,
      icon: null,
    },
    {
      name: 'ブログ',
      border: true,
      icon: null,
    },
    {
      name: 'メンバー紹介',
      border: false,
      icon: null,
    },
    {
      name: 'Github',
      border: true,
      icon: (
        <svg
          css={css`
            width: 20px;
          `}
          viewBox='0 0 19 19'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.50008 0C4.25402 0 0 4.36087 0 9.74051C0 14.0441 2.72206 17.6953 6.49673 18.9833C6.97152 19.0734 7.14582 18.772 7.14582 18.5147C7.14582 18.2824 7.13701 17.5151 7.13292 16.7012C4.48999 17.2904 3.9323 15.5519 3.9323 15.5519C3.50015 14.4261 2.87749 14.1267 2.87749 14.1267C2.01555 13.5222 2.94246 13.5346 2.94246 13.5346C3.89644 13.6033 4.39875 14.5383 4.39875 14.5383C5.24606 16.0275 6.62117 15.597 7.16329 15.3481C7.24855 14.7185 7.49475 14.2888 7.76644 14.0456C5.65634 13.7993 3.43817 12.9641 3.43817 9.23178C3.43817 8.16833 3.80928 7.29942 4.417 6.61728C4.31836 6.37195 3.99319 5.38125 4.50903 4.03957C4.50903 4.03957 5.30679 3.77778 7.12223 5.03801C7.88002 4.82219 8.69273 4.71396 9.50008 4.71025C10.3074 4.71396 11.1208 4.82219 11.88 5.03801C13.6932 3.77778 14.4899 4.03957 14.4899 4.03957C15.007 5.38125 14.6816 6.37195 14.583 6.61728C15.1921 7.29942 15.5607 8.16833 15.5607 9.23178C15.5607 12.9729 13.3383 13.7967 11.2229 14.0378C11.5636 14.3401 11.8672 14.9329 11.8672 15.8416C11.8672 17.1449 11.8562 18.1939 11.8562 18.5147C11.8562 18.7739 12.0272 19.0776 12.5088 18.982C16.2814 17.6925 19 14.0427 19 9.74051C19 4.36087 14.7466 0 9.50008 0ZM3.55809 13.8756C3.53717 13.924 3.46291 13.9385 3.39526 13.9052C3.32636 13.8735 3.28766 13.8075 3.31 13.7589C3.33045 13.7091 3.40486 13.6952 3.47361 13.7286C3.54267 13.7604 3.582 13.827 3.55809 13.8756ZM4.02539 14.3031C3.98008 14.3462 3.89151 14.3261 3.83141 14.2581C3.76927 14.1902 3.75763 14.0994 3.80357 14.0557C3.85029 14.0126 3.93619 14.0327 3.99849 14.1007C4.06063 14.1694 4.07274 14.2595 4.02539 14.3031ZM4.34597 14.8501C4.28776 14.8915 4.19259 14.8527 4.13375 14.766C4.07554 14.6794 4.07554 14.5755 4.13501 14.5339C4.194 14.4923 4.28776 14.5297 4.34739 14.6157C4.40544 14.7038 4.40544 14.8077 4.34597 14.8501ZM4.88815 15.4836C4.83608 15.5424 4.72517 15.5266 4.64399 15.4463C4.56093 15.3678 4.5378 15.2563 4.59003 15.1974C4.64273 15.1384 4.75427 15.155 4.83608 15.2347C4.91851 15.3131 4.94368 15.4253 4.88815 15.4836ZM5.58886 15.6974C5.56589 15.7737 5.45907 15.8084 5.35147 15.776C5.24402 15.7426 5.1737 15.6532 5.19541 15.5761C5.21775 15.4994 5.32504 15.4632 5.43343 15.4979C5.54072 15.5311 5.6112 15.6198 5.58886 15.6974ZM6.3863 15.7881C6.38897 15.8685 6.29773 15.9351 6.18477 15.9365C6.07119 15.9391 5.97932 15.8741 5.97806 15.7951C5.97806 15.714 6.06726 15.648 6.18084 15.646C6.29379 15.6438 6.3863 15.7083 6.3863 15.7881ZM7.16969 15.7574C7.18322 15.8357 7.10472 15.9162 6.99255 15.9377C6.88227 15.9583 6.78017 15.9099 6.76617 15.8322C6.75249 15.7519 6.8324 15.6714 6.94252 15.6506C7.05485 15.6306 7.15538 15.6777 7.16969 15.7574Z'
            fill='white'
          />
        </svg>
      ),
    },
  ];
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
            spacing='3.125rem'
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
              <WhiteMediumText>MakeITについて</WhiteMediumText>
              <WhiteMediumText>新着情報</WhiteMediumText>
              <WhiteMediumText>案件依頼・お問い合わせ</WhiteMediumText>
              <WhiteMediumText>体験入部</WhiteMediumText>
              <WhiteMediumText>実績</WhiteMediumText>
              <WhiteButton
                style={css`
                  width: 9.5rem;
                `}
              >
                <WhiteMediumText>実績一覧</WhiteMediumText>
                <Arrow color='#fff' />
              </WhiteButton>
              <WhiteMediumText>メンバー紹介</WhiteMediumText>
              <WhiteButton
                style={css`
                  width: 12rem;
                `}
              >
                <WhiteMediumText>メンバー 一覧</WhiteMediumText>
                <Arrow color='#fff' />
              </WhiteButton>
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
          xmlns='http://www.w3.org/2000/svg'
          preserveAspectRatio='none'
          viewBox='0 0 1440 320'
        >
          <path
            fill='#fff'
            fill-opacity='1'
            d='M0,192L26.7,181.3C53.3,171,107,149,160,154.7C213.3,160,267,192,320,202.7C373.3,213,427,203,480,181.3C533.3,160,587,128,640,112C693.3,96,747,96,800,117.3C853.3,139,907,181,960,186.7C1013.3,192,1067,160,1120,133.3C1173.3,107,1227,85,1280,96C1333.3,107,1387,149,1413,170.7L1440,192L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z'
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
