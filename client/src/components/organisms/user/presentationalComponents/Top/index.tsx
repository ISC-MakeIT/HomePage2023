import { css } from '@emotion/react';
import { WhiteMakeIT } from 'src/components/atoms/Logo/WhiteMakeIT';
import { CatchFrase } from 'src/components/atoms/TextCSV/CatchFrase';
import { Contact } from 'src/components/molecules/user/Contact';
import { maxScreen } from 'src/modules/helpers/mediaQueries';

export const Top = () => {
  return (
    <>
      <div
        id='about'
        css={css`
          width: 100%;
          height: 100vh;
          background: url(/index_top_background.jpg) left top no-repeat;
          background-size: cover;
          background-position: center;
          z-index: 10;
          position: absolute;
          filter: brightness(65%);

          ${maxScreen('md')} {
            background: url(/index_top_background_for_mobile.png);
            background-size: cover;
          }
        `}
      />

      <section
        css={css`
          width: 100%;
          height: 100vh;
          z-index: 20;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          css={css`
            width: 72%;
            display: flex;
            flex-direction: column;
            align-items: center;

            ${maxScreen('lg')} {
              width: 80%;
            }
            ${maxScreen('md')} {
              width: 90%;
            }
            ${maxScreen('sm')} {
              width: 95%;
            }
          `}
        >
          <div
            css={css`
              width: 50%;

              ${maxScreen('lg')} {
                width: 60%;
              }
              ${maxScreen('md')} {
                width: 70%;
              }
              ${maxScreen('sm')} {
                width: 80%;
              }
            `}
          >
            <WhiteMakeIT />
            <div
              css={css`
                margin-top: 1.5rem;
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
                font-size: 1.2rem;
                font-weight: bold;
                line-height: 1.75;
              `}
            >
              私達は、横浜でアプリ・サービス開発をメインに行う
              <span
                css={css`
                  font-size: 2rem;

                  ${maxScreen('md')} {
                    &:before {
                      white-space: pre;
                      content: '\\A';
                    }
                  }
                `}
              >
                「ものづくり」
              </span>
              サークルです。
            </p>
          </div>
          <div
            css={css`
              margin-top: 4rem;
            `}
          >
            <Contact />
          </div>
        </div>
      </section>
    </>
  );
};
