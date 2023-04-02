import React from 'react';
import { css } from '@emotion/react';
import { Arrow } from 'src/components/atoms/Button/Icon/Arrow';

export const Notification = () => {
  return (
    <div>
      <div
        css={css`
          background-color: #f8f9f9;
          padding: 5rem;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            gap: 8rem;
          `}
        >
          <div>
            <div
              css={css`
                color: #5ba0f1;
                font-size: 2rem;
                margin-bottom: 1.5rem;
                font-weight: 700;
              `}
            >
              新着情報
            </div>
            <div
              css={css`
                color: #333333;
                font-size: 1rem;
                font-weight: 400;
              `}
            >
              サークルの活動に関することや、ブログ,リリース情報のお知らせです。
            </div>
          </div>
          <div>
            <div
              css={css`
                background-color: white;
                height: 2.5rem;
                border-radius: 1.25rem;
                padding: 1rem 3rem;
                display: flex;
                align-items: center;
                margin-bottom: 1.5rem;
              `}
            >
              <div
                css={css`
                  font-size: 1rem;
                  color: #333333;
                  margin-right: 2rem;
                  font-weight: 400;
                `}
              >
                2021.11.27
              </div>
              <div
                css={css`
                  background-color: #fa5d36;
                  height: 1.5rem;
                  border-radius: 1.25rem;
                  padding: 0.5rem 2rem;
                  font-weight: 400;
                  margin-right: 3rem;
                  flex-grow: 0;
                `}
              >
                <div
                  css={css`
                    font-size: 1rem;
                    color: #ffffff;
                    line-height: 1.5rem;
                    font-weight: 700;
                    white-space: nowrap;
                  `}
                >
                  お知らせ
                </div>
              </div>
              <div
                css={css`
                  font-size: 1rem;
                  line-height: 1.5rem;
                  font-weight: 700;
                  color: #ff8567;
                `}
              >
                サークルホームページを開設しましたaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </div>
            </div>
            <div
              css={css`
                display: flex;
                justify-content: right;
              `}
            >
              <a
                href='#temp'
                css={css`
                  font-size: 1rem;
                  line-height: 1.5rem;
                  font-weight: 700;
                  color: #ff8567;
                  display: flex;
                `}
              >
                一覧で見る
                <Arrow color='#ff8567' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
