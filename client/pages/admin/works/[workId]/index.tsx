import { Stack } from '@mui/material';
import { DeleteWorkModalContainer } from 'src/components/organisms/admin/containerComponents/DeleteWorkModalContainer';
import { EditWorkModalContainer } from 'src/components/organisms/admin/containerComponents/EditWorkModalContainer';
import { WorkContainer } from 'src/components/organisms/admin/containerComponents/WorkContainer';
import { NavigationWithHeader } from 'src/components/templates/admin/NavigraitonWithHeader';
import { useRouter } from 'next/router';

type RouterParams = {
  workId: string;
};

const Work = () => {
  const router = useRouter();
  const { workId } = router.query as RouterParams;

  return (
    <NavigationWithHeader>
      <Stack flexDirection='row' columnGap={2}>
        <EditWorkModalContainer workId={Number(workId)} />
        <DeleteWorkModalContainer workId={Number(workId)} />
      </Stack>

      <WorkContainer workId={Number(workId)} />
    </NavigationWithHeader>
  );
};

export default Work;
