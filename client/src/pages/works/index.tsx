import { HeadContainer } from '@components/organisms/user/containerComponents/HeadContainer';
import { WorksContainer } from '@components/organisms/user/containerComponents/WorksContainer';
import { HeaderWithPage } from '@components/templates/user/HeaderWithPage';

const Works = () => {
  return (
    <HeaderWithPage>
      <HeadContainer
        title="実績一覧 | MakeIT"
        description="MakeITサークルは、神奈川県学生ITコンテスト優勝や、Icon銅賞など、数々の魅力的な実績を持っています。また、認定NPO法人 地球学校の教育ゲーム「漢字王決定戦」や、横浜fカレッジF&Bライブ投票アプリなど、多彩なプロジェクトにも取り組んでいます。"
        keywords="MakeITサークル, 実績一覧, 神奈川県学生ITコンテスト, Icon銅賞, 認定NPO法人, 地球学校, 教育ゲーム, 漢字王決定戦, 横浜fカレッジ, F&Bライブ投票アプリ, Wakamono Innovation Network, らっくる, 最優秀賞."
        thumbnail="https://makeit-homepage-for-prd.s3.ap-northeast-1.amazonaws.com/image/ogpThumbnails/ia8tJJBsrVpGSj1crcubyK67Dm6c9DSQtmxhYr30.jpg"
      />

      <WorksContainer />
    </HeaderWithPage>
  );
};

export default Works;
