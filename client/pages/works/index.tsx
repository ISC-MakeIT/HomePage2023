import Head from 'next/head';
import { WorksContainer } from 'src/components/organisms/user/containerComponents/WorksContainer';
import { HeaderWithPage } from 'src/components/templates/user/HeaderWithPage';

const Works = () => {
  return (
    <HeaderWithPage>
      <Head>
        <title>実績一覧 | MakeIT</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='MakeITは、横浜でアプリ・サービス開発をメインに行う「ものづくり」サークルです。プログラミング初心者・デザイナー・開発を始めてみたい方など、年齢・性別・やりたいこと問わず、ものづくりに興味がある方なら誰でも歓迎しています。'
        />
        <meta
          name='keywords'
          content='MakeIT, ものづくり, 横浜, アプリ開発, サービス開発, プログラミング初心者, デザイナー, 開発'
        />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@isc_makeit' />
        <meta name='twitter:creator' content='@isc_makeit' />
        <meta name='twitter:domain' content='https://makeit.isc.ac.jp/' />
        <meta name='twitter:title' content='実績一覧 | MakeIT' />
        <meta
          name='twitter:description'
          content='MakeITは、横浜でアプリ・サービス開発をメインに行う「ものづくり」サークルです。プログラミング初心者・デザイナー・開発を始めてみたい方など、年齢・性別・やりたいこと問わず、ものづくりに興味がある方なら誰でも歓迎しています。'
        />
        <meta name='og:title' content='実績一覧 | MakeIT' />
        <meta property='og:type' content='website' />
        <meta name='og:site_name' content='【MakeIT】アプリ・サービス開発をメインに行う「ものづくり」サークル' />
        <meta name='og:url' content='https://makeit.isc.ac.jp/' />
        <meta name='og:image' content='/thumbnail.png' />
        <meta
          name='og:description'
          content='MakeITは、横浜でアプリ・サービス開発をメインに行う「ものづくり」サークルです。プログラミング初心者・デザイナー・開発を始めてみたい方など、年齢・性別・やりたいこと問わず、ものづくりに興味がある方なら誰でも歓迎しています。'
        />
        <meta name='theme-color' content='#f8f8f8' />

        <meta name='robots' content='index, follow' />
      </Head>

      <WorksContainer />
    </HeaderWithPage>
  );
};

export default Works;
