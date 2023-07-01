import { HeadContainer } from '@components/organisms/user/containerComponents/HeadContainer';
import { NotificationsContainer } from '@components/organisms/user/containerComponents/NotificationsContainer';
import { HeaderWithPage } from '@components/templates/user/HeaderWithPage';

const Notifications = () => {
  return (
    <HeaderWithPage>
      <HeadContainer
        title="お知らせ一覧 | MakeIT"
        description="MakeITサークルのお知らせ一覧ページです。日常的なお知らせを随時更新しています。"
        keywords="MakeITサークル, お知らせ一覧, 横浜, アプリ開発, サービス開発, プログラミング初心者, デザイナー, 開発, 日常的なお知らせ"
        thumbnail="https://makeit-homepage-for-prd.s3.ap-northeast-1.amazonaws.com/image/ogpThumbnails/Q3vx0Y6Xd1chLRl4jubPcPOnt8AWO4WumSXfzcJp.jpg"
      />

      <NotificationsContainer />
    </HeaderWithPage>
  );
};

export default Notifications;
