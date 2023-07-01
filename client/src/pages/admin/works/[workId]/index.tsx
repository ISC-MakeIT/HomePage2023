import { Stack } from '@mui/material';
import { EditWorkModalContainer } from '@components/organisms/admin/containerComponents/EditWorkModalContainer';
import { WorkContainer } from '@components/organisms/admin/containerComponents/WorkContainer';
import { NavigationWithHeader } from '@components/templates/admin/NavigraitonWithHeader';
import { useRouter } from 'next/router';
import { DeleteWorkModalContainer } from '@components/organisms/admin/containerComponents/DeleteWorkModalContainer';
import Head from 'next/head';

const Work = () => {
  const { workId } = useRouter().query;

  return (
    <NavigationWithHeader>
      <Head>
        <title>活動実績ID: {workId} の詳細 | MakeIT</title>
      </Head>

      <Stack flexDirection="row" columnGap={2}>
        <EditWorkModalContainer workId={Number(workId)} />
        <DeleteWorkModalContainer workId={Number(workId)} />
      </Stack>

      <WorkContainer workId={Number(workId)} />
    </NavigationWithHeader>
  );
};

export default Work;
