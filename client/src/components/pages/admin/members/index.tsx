import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CreateMemberModalContainer } from 'src/components/organisms/admin/containerComponents/CreateMemberModalContainer';
import { MemberListContainer } from 'src/components/organisms/admin/containerComponents/MemberListContainer';
import { NavigationWithHeader } from '../../../templates/admin/NavigraitonWithHeader';

export const Members = () => {
  return (
    <NavigationWithHeader>
      <Helmet>
        <title>メンバー一覧 | MakeIT</title>
      </Helmet>

      <CreateMemberModalContainer />
      <MemberListContainer />
    </NavigationWithHeader>
  );
};
