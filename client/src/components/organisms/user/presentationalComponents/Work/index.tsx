import { apiWork } from '@api/user/works';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Arrow } from 'src/components/atoms/Button/Icon/Arrow';
interface Work {
  workId: number;
  title: string;
  contents: string;
  createdAt: string;
}
export const Work = () => {
  const [works, setWorks] = useState<Work[]>([
    {
      workId: 0,
      title: '学生ITコンテスト2021 最優秀賞',
      contents:
        '新入部員達がグループを組んで初めて作成したサービス\n「CoreQue」でアイデアソン・ハッカソンで最優秀賞を取りました。 現在はビジネス化に向けて奮闘中です。',
      createdAt: '2023-04-10',
    },
  ]);
  useEffect(() => {
    (async () => {
      const data = await apiWork();
      setWorks(data);
    })();
  }, []);
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
              {works[0].title}
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
              {works[0].contents}
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
