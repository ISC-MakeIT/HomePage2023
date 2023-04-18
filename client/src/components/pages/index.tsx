import { Helmet } from 'react-helmet-async';
import { Footer } from '../organisms/user/presentationalComponents/Footer';
import { Top } from '../organisms/user/presentationalComponents/Top';
import { MembersContainer } from '../organisms/user/containerComponents/MembersContainer';
import { WorkContainer } from '../organisms/user/containerComponents/WorkContainer';
import { NotificationContainer } from '../organisms/user/containerComponents/NotificationContainer';
import { HeaderWithTopPage } from '../templates/user/HeaderWithTopPage';
import { ContactContainer } from '../organisms/user/containerComponents/ContactContainer';
import { Recruit } from '../organisms/user/presentationalComponents/Recruit';

export const Home = () => {
  return (
    <HeaderWithTopPage>
      <Helmet>
        <title>MakeITトップページ | MakeIT</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='MakeITは、横浜でアプリ・サービス開発をメインに行う「ものづくり」サークルです。プログラミング初心者・デザイナー・開発を始めてみたい方など、年齢・性別・やりたいこと問わず、ものづくりに興味がある方なら誰でも歓迎しています。'
        />
        <meta
          name='keywords'
          content='MakeIT, ものづくり, 横浜, アプリ開発, サービス開発, プログラミング初心者, デザイナー, 開発'
        />
        <meta name='robots' content='index, follow' />
      </Helmet>

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
