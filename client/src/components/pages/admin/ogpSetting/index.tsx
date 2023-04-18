import { Helmet } from 'react-helmet-async';
import { NavigationWithHeader } from '../../../templates/admin/NavigraitonWithHeader';

export const OGPSetting = () => {
  return (
    <NavigationWithHeader>
      <Helmet>
        <title>OGP設定 | MakeIT</title>
      </Helmet>
    </NavigationWithHeader>
  );
};
