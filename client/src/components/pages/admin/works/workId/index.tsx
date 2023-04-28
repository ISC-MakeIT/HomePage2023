import { Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { DeleteWorkModalContainer } from 'src/components/organisms/admin/containerComponents/DeleteWorkModalContainer';
import { EditWorkModalContainer } from 'src/components/organisms/admin/containerComponents/EditWorkModalContainer';
import { WorkContainer } from 'src/components/organisms/admin/containerComponents/WorkContainer';
import { NavigationWithHeader } from '../../../../templates/admin/NavigraitonWithHeader';

interface RouterParams {
  workId: string;
}

export const Work = () => {
  const { workId } = useParams<RouterParams>();

  return (
    <NavigationWithHeader>
      <Helmet>
        <title>活動実績ID: {workId} の詳細 | MakeIT</title>
      </Helmet>

      <Stack flexDirection="row" columnGap={2}>
        <EditWorkModalContainer workId={Number(workId)} />
        <DeleteWorkModalContainer workId={Number(workId)} />
      </Stack>

      <WorkContainer workId={Number(workId)} />
    </NavigationWithHeader>
  );
};
