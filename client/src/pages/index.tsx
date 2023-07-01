import { Footer } from '@components/organisms/user/presentationalComponents/Footer';
import { Top } from '@components/organisms/user/presentationalComponents/Top';
import { MembersContainer } from '@components/organisms/user/containerComponents/MembersContainer';
import { WorkContainer } from '@components/organisms/user/containerComponents/WorkContainer';
import { NotificationContainer } from '@components/organisms/user/containerComponents/NotificationContainer';
import { HeaderWithTopPage } from '@components/templates/user/HeaderWithTopPage';
import { ContactContainer } from '@components/organisms/user/containerComponents/ContactContainer';
import { Recruit } from '@components/organisms/user/presentationalComponents/Recruit';
import { HeadContainer } from '@components/organisms/user/containerComponents/HeadContainer';

const Home = () => {
  return (
    <HeaderWithTopPage>
      <HeadContainer
        title="MakeITトップページ | MakeIT"
        description="MakeITは、横浜でアプリ・サービス開発をメインに行う「ものづくり」サークルです。プログラミング初心者・デザイナー・開発を始めてみたい方など、年齢・性別・やりたいこと問わず、ものづくりに興味がある方なら誰でも歓迎しています。"
        keywords="MakeIT, ものづくり, 横浜, アプリ開発, サービス開発, プログラミング初心者, デザイナー, 開発"
        thumbnail="https://makeit-homepage-for-test.s3.ap-northeast-1.amazonaws.com/image/ogpThumbnails/uoMVzwH0oKJvkbGUVGl8VQTClLuGOa78vPKKwjI5.jpg"
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

export default Home;
