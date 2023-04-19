import { Helmet } from 'react-helmet-async';
import { NavigationWithHeader } from '../../../../templates/admin/NavigraitonWithHeader';
import { OGPDetailContainer } from 'src/components/organisms/admin/containerComponents/OGPDetailContainer';
import { useSearchParams } from 'react-router-dom';
import { EditOGPModalContainer } from 'src/components/organisms/admin/containerComponents/EditOGPModalContainer';
import { Stack } from '@mui/material';
import { DeleteOGPModalContainer } from 'src/components/organisms/admin/containerComponents/DeleteOGPModalContainer';

export const OGPDetail = () => {
  const [searchParams] = useSearchParams();

  return (
    <NavigationWithHeader>
      <Helmet>
        <title>OGP設定詳細 | MakeIT</title>
      </Helmet>

      <Stack flexDirection="row" columnGap={2}>
        <EditOGPModalContainer url={searchParams.get('url')} />
        <DeleteOGPModalContainer url={searchParams.get('url')} />
      </Stack>

      <OGPDetailContainer url={searchParams.get('url')} />
    </NavigationWithHeader>
  );
};
