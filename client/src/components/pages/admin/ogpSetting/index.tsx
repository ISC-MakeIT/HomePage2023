import { Helmet } from 'react-helmet-async';
import { NavigationWithHeader } from '../../../templates/admin/NavigraitonWithHeader';
import { OGPListContainer } from 'src/components/organisms/admin/containerComponents/OGPListContainer';

export const OGPSetting = () => {
  return (
    <NavigationWithHeader>
      <Helmet>
        <title>OGP設定 | MakeIT</title>
      </Helmet>

      <OGPListContainer />
    </NavigationWithHeader>
  );
};
