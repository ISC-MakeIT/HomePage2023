import { Helmet } from 'react-helmet-async';
import { NavigationWithHeader } from '../../../templates/admin/NavigraitonWithHeader';
import { OGPListContainer } from 'src/components/organisms/admin/containerComponents/OGPListContainer';
import { CreateOGPModalContainer } from 'src/components/organisms/admin/containerComponents/CreateOGPModalContainer';

export const OGPSetting = () => {
  return (
    <NavigationWithHeader>
      <Helmet>
        <title>OGP設定 | MakeIT</title>
      </Helmet>

      <CreateOGPModalContainer />
      <OGPListContainer />
    </NavigationWithHeader>
  );
};
