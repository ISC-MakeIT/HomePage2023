import { Stack } from '@mui/material';
import { ChangePasswordModalContainer } from 'src/components/organisms/admin/containerComponents/ChangePasswordModalContainer';
import { EditMeModalContainer } from 'src/components/organisms/admin/containerComponents/EditMeModalContainer';
import { MeContainer } from 'src/components/organisms/admin/containerComponents/MeContainer';
import { NavigationWithHeader } from 'src/components/templates/admin/NavigraitonWithHeader';

const MyPage = () => {
  return (
    <NavigationWithHeader spacing={4}>
      <Stack flexDirection={'row'} columnGap={1}>
        <ChangePasswordModalContainer />
        <EditMeModalContainer />
      </Stack>

      <MeContainer />
    </NavigationWithHeader>
  );
};

export default MyPage;
