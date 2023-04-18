import { Helmet } from 'react-helmet-async';
import { Footer } from '../organisms/user/presentationalComponents/Footer';
import { Top } from '../organisms/user/presentationalComponents/Top';
import { MembersContainer } from '../organisms/user/containerComponents/MembersContainer';
import { WorkContainer } from '../organisms/user/containerComponents/WorkContainer';
import { NotificationContainer } from '../organisms/user/containerComponents/NotificationContainer';
import { HeaderWithTopPage } from '../templates/user/HeaderWithTopPage';
import { ContactContainer } from '../organisms/user/containerComponents/ContactContainer';
import { Recruit } from '../organisms/user/presentationalComponents/Recruit';
import { HeadContainer } from '../organisms/user/containerComponents/HeadContainer';

export const Home = () => {
  return (
    <HeaderWithTopPage>
      <HeadContainer
        title='MakeITトップページ | MakeIT'
        description='MakeITは、横浜でアプリ・サービス開発をメインに行う「ものづくり」サークルです。プログラミング初心者・デザイナー・開発を始めてみたい方など、年齢・性別・やりたいこと問わず、ものづくりに興味がある方なら誰でも歓迎しています。'
        keywords='MakeIT, ものづくり, 横浜, アプリ開発, サービス開発, プログラミング初心者, デザイナー, 開発'
        thumbnail='https://makeit-homepage-for-prd.s3.ap-northeast-1.amazonaws.com/image/ogpThumbnails/index.png'
      />

      <Top />
      <NotificationContainer />
      <WorkContainer />
      <MembersContainer />
      <Recruit />
      <ContactContainer />
      <Footer />
    </HeaderWithTopPage>
  );
};
