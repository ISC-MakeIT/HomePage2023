import { useRouter } from 'next/router';
import { DeleteMemberModelContainer } from 'src/components/organisms/admin/containerComponents/DeleteMemberModelContainer';
import { EditMemberContainer } from 'src/components/organisms/admin/containerComponents/EditMemberContainer';
import { MemberContainer } from 'src/components/organisms/admin/containerComponents/MemberContainer';
import { NavigationWithHeader } from 'src/components/templates/admin/NavigraitonWithHeader';

type RouterParams = {
  memberId: string;
};

const Member = () => {
  const router = useRouter();
  const { memberId } = router.query as RouterParams;

  return (
    <NavigationWithHeader>
      <DeleteMemberModelContainer memberId={Number(memberId)} />
      <MemberContainer memberId={Number(memberId)} />
      <EditMemberContainer memberId={Number(memberId)} />
    </NavigationWithHeader>
  );
};

export default Member;
