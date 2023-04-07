import { css } from '@emotion/react';
import axios from 'axios';
import { cdate } from 'cdate';
import { useEffect, useState } from 'react';
import { OrangeRadiusBox } from 'src/components/atoms/Box/OrangeRadius';
import { WhiteRadiusBox } from 'src/components/atoms/Box/WhiteRadius';

interface Notification {
  notification_id: number;
  title: string;
  contents: string;
  creator: number;
  created_at: string;
}

const isFullWidth = (src: string) => {
  return String(src).match(/[\x01-\x7E\uFF65-\uFF9F]/) ? false : true;
};
const substrByte = (src: string, start: number, size: number) => {
  let result = '';
  let count1 = 0;
  let count2 = 0;

  for (let i = 0; i < src.length; i++) {
    const c = src.charAt(i);
    const char_size = isFullWidth(c) ? 2 : 1;

    if (count1 >= start) {
      count2 += char_size;
      if (count2 <= size) {
        result += c;
      } else {
        break;
      }
    }
    count1 += char_size;
  }

  return result;
};

export const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get<Notification[]>('http://localhost:8000/api/notifications');
      setNotifications(data);
    })();
  }, []);
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
            flex-direction: column;
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
          <div
            css={css`
              max-width: 1000px;
            `}
          >
            {notifications.map((notification) => {
              return (
                <WhiteRadiusBox>
                  <div
                    css={css`
                      font-size: 1rem;
                      color: #333333;
                      margin-right: 2rem;
                      font-weight: 400;
                    `}
                  >
                    {cdate(notification.created_at).format('YYYY.MM.DD')}
                  </div>
                  <OrangeRadiusBox>
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
                  </OrangeRadiusBox>
                  <div
                    css={css`
                      font-size: 1rem;
                      line-height: 1.5rem;
                      font-weight: 700;
                      color: #ff8567;
                    `}
                  >
                    {substrByte(notification.title, 0, 40) === notification.title
                      ? notification.title
                      : substrByte(notification.title, 0, 40) + '...'}
                  </div>
                </WhiteRadiusBox>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
