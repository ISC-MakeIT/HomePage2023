import { CreateMemberModalContainer } from '@components/organisms/admin/containerComponents/CreateMemberModalContainer';
import { MemberListContainer } from '@components/organisms/admin/containerComponents/MemberListContainer';
import { NavigationWithHeader } from '@components/templates/admin/NavigraitonWithHeader';
import Head from 'next/head';

const Members = () => {
  return (
    <NavigationWithHeader>
      <Head>
        <title>メンバー一覧 | MakeIT</title>
      </Head>

      <CreateMemberModalContainer />
      <MemberListContainer />
    </NavigationWithHeader>
  );
};

export default Members;
