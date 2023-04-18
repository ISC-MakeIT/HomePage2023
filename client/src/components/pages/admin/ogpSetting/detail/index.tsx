import { Helmet } from 'react-helmet-async';
import { NavigationWithHeader } from '../../../../templates/admin/NavigraitonWithHeader';

export const OGPDetail = () => {
  return (
    <NavigationWithHeader>
      <Helmet>
        <title>OGP設定詳細 | MakeIT</title>
      </Helmet>
    </NavigationWithHeader>
  );
};
