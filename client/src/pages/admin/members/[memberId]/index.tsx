import { DeleteMemberModelContainer } from '@components/organisms/admin/containerComponents/DeleteMemberModelContainer';
import { EditMemberContainer } from '@components/organisms/admin/containerComponents/EditMemberContainer';
import { MemberContainer } from '@components/organisms/admin/containerComponents/MemberContainer';
import { NavigationWithHeader } from '@components/templates/admin/NavigraitonWithHeader';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Member = () => {
  const { memberId } = useRouter().query;

  return (
    <NavigationWithHeader>
      <Head>
        <title>メンバーID: {memberId} の詳細 | MakeIT</title>
      </Head>

      <DeleteMemberModelContainer memberId={Number(memberId)} />
      <MemberContainer memberId={Number(memberId)} />
      <EditMemberContainer memberId={Number(memberId)} />
    </NavigationWithHeader>
  );
};

export default Member;
