import { Work as APIWork } from '@api/user/works';
import { css } from '@emotion/react';

type WorkProps = {
  work: APIWork;
};

export const Work = ({ work }: WorkProps) => {

  return (
    <div
      id='work'
      css={css`
        background-image: url(/work_background.png);
      `}
    >
      <div
        css={css`
          position: relative;
          background-color: rgba(255, 255, 255, 0.95);
          padding: 7.5rem 7rem;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            gap: 120px;
          `}
        >
          <div
            css={css`
              z-index: 2;
              max-width: 700px;
            `}
          >
            <div
              css={css`
                font-size: 2rem;
                font-weight: 700;
                color: #333333;
                margin-bottom: 12px;
                overflow-wrap: anywhere;
              `}
            >
              {work.title}
            </div>
            {/* <div
              css={css`
                font-size: 1rem;
                font-weight: 700;
                color: #333333;
                margin-bottom: 64px;
                         overflow-wrap: anywhere;
              `}
            >
              神奈川情報サービス産業協会 学生ITコンテスト2021で最優秀賞を取りました。
            </div> */}
            <div
              css={css`
                font-size: 1rem;
                font-weight: 400;
                color: #333333;
                overflow-wrap: anywhere;
              `}
            >
              {work.contents}
            </div>
          </div>
          <div
            css={css`
              z-index: 2;
            `}
          >
            <img
              css={css`
                margin-bottom: 40px;
              `}
              src='/money_is_everything.png'
              alt='活動実績画像'
            ></img>
            <div
              css={css`
                display: flex;
                justify-content: right;
              `}
            >
              <a
                href='/works'
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
        {/* 以下図形 */}
        <div
          css={css`
            z-index: 1;
            position: absolute;
            left: -100px;
            top: 150px;
            background-color: #f1915b;
            opacity: 0.8;
            width: 340px;
            height: 340px;
            border-radius: 170px;
          `}
        ></div>
        <div
          css={css`
            z-index: 1;
            position: absolute;
            left: calc((100vw / 2) + 100px);
            background-color: #f15b5b;
            top: 40px;
            opacity: 0.8;
            width: 200px;
            height: 200px;
            border-radius: 100px;
          `}
        ></div>
        <div
          css={css`
            z-index: 1;
            position: absolute;
            left: calc((100vw / 2) + 50px);
            top: 600px;
            opacity: 0.8;
            border-bottom: 50px solid #c1f15b;
            border-right: 75px solid transparent;
            border-left: 75px solid transparent;
            transform: rotate(-7deg);
            ::before {
              content: '';
              position: absolute;
              left: -75px;
              border-bottom: 50px solid #c1f15b;
              border-right: 75px solid transparent;
              border-left: 75px solid transparent;
              transform: rotate(-71.5deg);
            }
            ::after {
              content: '';
              position: absolute;
              left: -75px;
              border-bottom: 50px solid #c1f15b;
              border-right: 75px solid transparent;
              border-left: 75px solid transparent;
              transform: rotate(71.5deg);
            }
          `}
        ></div>
        <div
          css={css`
            z-index: 1;
            position: absolute;
            top: 400px;
            left: calc(100vw - 300px);
            transform: rotate(71.5deg);
            width: 0px;
            border-right: calc(50px * 3) solid transparent;
            border-bottom: calc(86.6025px * 3) solid #5ba0f1;
            border-left: calc(50px * 3) solid transparent;
          `}
        ></div>
      </div>
    </div>
  );
};
