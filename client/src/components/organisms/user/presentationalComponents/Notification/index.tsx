import { apiNotifications } from '@api/user/notifications';
import { css } from '@emotion/react';
import { cdate } from 'cdate';
import { useEffect, useState } from 'react';
import { Arrow } from 'src/components/atoms/Button/Icon/Arrow';

interface Notification {
  notificationId: number;
  title: string;
  contents: string;
  creator: number;
  createdAt: string;
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

export const Notification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      notificationId: 0,
      title: 'サークルホームページを開設しました',
      contents: '',
      createdAt: '2023-04-10',
      creator: 0,
    },
  ]);
  useEffect(() => {
    (async () => {
      const data = await apiNotifications();
      setNotifications(data);
    })();
  }, []);
  const formattedTitle = substrByte(notifications[0].title, 0, 48);
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
                {cdate(notifications[0].createdAt).format('YYYY.MM.DD')}
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
                  overflow-wrap: anywhere;
                `}
              >
                {formattedTitle === notifications[0].title ? notifications[0].title : formattedTitle + '...'}
              </div>
            </div>
            <div
              css={css`
                display: flex;
                justify-content: right;
              `}
            >
              <a
                href='/notifications'
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
