import { HeadContainer } from 'src/components/organisms/user/containerComponents/HeadContainer';
import { NotificationsContainer } from 'src/components/organisms/user/containerComponents/NotificationsContainer';
import { HeaderWithPage } from 'src/components/templates/user/HeaderWithPage';

export const Notifications = () => {
  return (
    <HeaderWithPage>
      <HeadContainer
        title='お知らせ一覧 | MakeIT'
        description='MakeITは、横浜でアプリ・サービス開発をメインに行う「ものづくり」サークルです。プログラミング初心者・デザイナー・開発を始めてみたい方など、年齢・性別・やりたいこと問わず、ものづくりに興味がある方なら誰でも歓迎しています。'
        keywords='MakeIT, ものづくり, 横浜, アプリ開発, サービス開発, プログラミング初心者, デザイナー, 開発'
        thumbnail='https://makeit-homepage-for-prd.s3.ap-northeast-1.amazonaws.com/image/ogpThumbnails/index.png'
      />

      <NotificationsContainer />
    </HeaderWithPage>
  );
};
