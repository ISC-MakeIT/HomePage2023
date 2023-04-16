import { Notification as APINotification } from '@api/user/notifications';
import { Notification as NotificationComponent } from 'src/components/molecules/user/Notification';
import { css } from '@emotion/react';
import { SectionTitle } from 'src/components/molecules/user/SectionTitle';
import { USER_ROUTE_PATH_MAP } from 'src/routes/routePath';
import { AccessToList } from 'src/components/molecules/user/Button/AccessToList';
import { maxScreen } from 'src/modules/helpers/mediaQueries';

type NotificationProps = APINotification;

export const Notification = ({ title, createdAt }: NotificationProps) => {
  return (
    <section id='notification'>
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

            ${maxScreen('lg')} {
              display: block;
            }
          `}
        >
          <SectionTitle
            title='新着情報'
            description='サークルの活動に関することや、ブログ,リリース情報のお知らせです。'
          />

          <div>
            <NotificationComponent title={title} createdAt={createdAt} />
            <AccessToList to={USER_ROUTE_PATH_MAP.NOTIFICATIONS} />
          </div>
        </div>
      </div>
    </section>
  );
};
