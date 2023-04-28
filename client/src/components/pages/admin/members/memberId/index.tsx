import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { DeleteMemberModelContainer } from 'src/components/organisms/admin/containerComponents/DeleteMemberModelContainer';
import { EditMemberContainer } from 'src/components/organisms/admin/containerComponents/EditMemberContainer';
import { MemberContainer } from 'src/components/organisms/admin/containerComponents/MemberContainer';
import { NavigationWithHeader } from '../../../../templates/admin/NavigraitonWithHeader';

interface RouterParams {
  memberId: string;
}

export const Member = () => {
  const { memberId } = useParams<RouterParams>();

  return (
    <NavigationWithHeader>
      <Helmet>
        <title>メンバーID: {memberId} の詳細 | MakeIT</title>
      </Helmet>

      <DeleteMemberModelContainer memberId={Number(memberId)} />
      <MemberContainer memberId={Number(memberId)} />
      <EditMemberContainer memberId={Number(memberId)} />
    </NavigationWithHeader>
  );
};
