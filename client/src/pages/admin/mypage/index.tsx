import { Stack } from '@mui/material';
import { ChangePasswordModalContainer } from '@components/organisms/admin/containerComponents/ChangePasswordModalContainer';
import { EditMeModalContainer } from '@components/organisms/admin/containerComponents/EditMeModalContainer';
import { MeContainer } from '@components/organisms/admin/containerComponents/MeContainer';
import { NavigationWithHeader } from '@components/templates/admin/NavigraitonWithHeader';
import Head from 'next/head';

const MyPage = () => {
  return (
    <NavigationWithHeader spacing={4}>
      <Head>
        <title>マイページ | MakeIT</title>
      </Head>

      <Stack flexDirection={'row'} columnGap={1}>
        <ChangePasswordModalContainer />
        <EditMeModalContainer />
      </Stack>

      <MeContainer />
    </NavigationWithHeader>
  );
};

export default MyPage;
