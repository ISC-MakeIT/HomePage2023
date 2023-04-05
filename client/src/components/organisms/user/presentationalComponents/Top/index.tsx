import { css } from '@emotion/react';
import { MakeIT } from 'src/components/atoms/Logo/MakeIT';
import { CatchFrase } from 'src/components/atoms/TextCSV/CatchFrase';
import { Contact } from 'src/components/molecules/user/Contact';
import { Header } from '../Header';

export const Top = () => {
  return (
    <>
      <div
        css={css`
          z-index: 30;
          position: absolute;
          width: 100vw;
        `}
      >
        <Header />
      </div>
      <div
        css={css`
          width: 100vw;
          height: 0;
          background: url(/index_top_background.jpg) left top no-repeat;
          background-size: contain;
          padding-top: 63%; /* (img-height / img-width * container-width) */
          /* (853 / 1280 * 100) */
          overflow-x: hidden;
          z-index: 10;
          position: relative;
          filter: brightness(65%);
        `}
      ></div>
      <div
        css={css`
          z-index: 20;
          position: absolute;
          min-width: 72vw;
          min-height: 100vh;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          top: 27.5%;
          left: 14vw;
        `}
      >
        <div
          css={css`
            width: 42vw;
          `}
        >
          <MakeIT />
          <div
            css={css`
              margin-top: 24px;
            `}
          >
            <CatchFrase />
          </div>
        </div>
        <div
          css={css`
            text-align: center;
          `}
        >
          <p
            css={css`
              color: #ffffff;
              font-size: 1.38vw;
              font-weight: 700;
            `}
          >
            私達は、横浜でアプリ・サービス開発をメインに行う
            <span
              css={css`
                font-size: 2.1vw;
              `}
            >
              「ものづくり」
            </span>
            サークルです。
          </p>
        </div>
        <div
          css={css`
            margin-top: 64px;
          `}
        >
          <Contact />
        </div>
      </div>
    </>
  );
};
