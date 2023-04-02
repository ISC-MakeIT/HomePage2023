import { css } from '@emotion/react';
import { Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { DeleteMemberModelContainer } from 'src/components/organisms/admin/containerComponents/DeleteMemberModelContainer';
import { MemberContainer } from 'src/components/organisms/admin/containerComponents/MemberContainer';
import { MemberEditContainer } from 'src/components/organisms/admin/containerComponents/MemberEditContainer';
import { NavigationWithHeader } from '../../../../templates/admin/NavigraitonWithHeader';

type RouterParams = {
  memberId: string;
};

export const MemberOfMembers = () => {
  const { memberId } = useParams<RouterParams>();

  return (
    <NavigationWithHeader>
      <Helmet>
        <title>メンバーID: {memberId} の詳細 | MakeIT</title>
      </Helmet>

      <DeleteMemberModelContainer memberId={Number(memberId)} />
      <MemberContainer memberId={Number(memberId)} />
      <MemberEditContainer memberId={Number(memberId)} />
    </NavigationWithHeader>
  );
};
