import { Stack } from '@mui/material';
import { selectUserId } from '@redux/actions/user/userIdReducer';
import { useAppSelector } from '@redux/hooks';
import { Helmet } from 'react-helmet-async';
import { ChangePasswordModalContainer } from 'src/components/organisms/admin/containerComponents/ChangePasswordModalContainer';
import { EditMeModalContainer } from 'src/components/organisms/admin/containerComponents/EditMeModalContainer';
import { MemberContainer } from 'src/components/organisms/admin/containerComponents/MemberContainer';
import { NavigationWithHeader } from 'src/components/templates/admin/NavigraitonWithHeader';

export const MyPage = () => {
  const userId = useAppSelector(selectUserId);

  return (
    <NavigationWithHeader spacing={4}>
      <Helmet>
        <title>マイページ | MakeIT</title>
      </Helmet>

      <Stack flexDirection={'row'} columnGap={1}>
        <ChangePasswordModalContainer />
        <EditMeModalContainer memberId={userId} />
      </Stack>

      <MemberContainer memberId={userId} />
    </NavigationWithHeader>
  );
};
