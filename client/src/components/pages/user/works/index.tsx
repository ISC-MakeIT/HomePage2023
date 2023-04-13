import { apiWorks } from '@api/user/works';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

interface Work {
  workId: number;
  title: string;
  contents: string;
  createdAt: string;
}

export const Works = () => {
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    (async () => {
      const data = await apiWorks();
      setWorks(data);
    })();
  }, []);

  return (
    <div
      css={css`
        width: 100vw;
      `}
    >
      {works.map((work) => {
        return (
          <div
            key={work.workId}
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
                  justify-content: space-around;
                  gap: 120px;
                `}
              >
                <div
                  css={css`
                    z-index: 2;
                    max-width: 100%;
                  `}
                >
                  <div
                    css={css`
                      max-width: 700px;
                      font-size: 2rem;
                      font-weight: 700;
                      color: #333333;
                      margin-bottom: 12px;
                      word-wrap: break-word;
                    `}
                  >
                    {work.title}
                  </div>
                  <div
                    css={css`
                      max-width: 700px;
                      font-size: 1rem;
                      font-weight: 700;
                      color: #333333;
                      margin-bottom: 64px;
                    `}
                  >
                    神奈川情報サービス産業協会 学生ITコンテスト2021で最優秀賞を取りました。
                  </div>
                  <div
                    css={css`
                      max-width: 700px;
                      word-wrap: break-word;
                      font-size: 1rem;
                      font-weight: 400;
                      color: #333333;
                    `}
                  >
                    {work.contents}
                  </div>
                </div>
                <img
                  src='/money_is_everything.png'
                  alt='活動実績画像'
                  css={css`
                    z-index: 2;
                  `}
                ></img>
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
      })}
    </div>
  );
};
