import { CreateMemberModalContainer } from 'src/components/organisms/admin/containerComponents/CreateMemberModalContainer';
import { MemberListContainer } from 'src/components/organisms/admin/containerComponents/MemberListContainer';
import { NavigationWithHeader } from 'src/components/templates/admin/NavigraitonWithHeader';

const Members = () => {
  return (
    <NavigationWithHeader>
      <CreateMemberModalContainer />
      <MemberListContainer />
    </NavigationWithHeader>
  );
};

export default Members;
