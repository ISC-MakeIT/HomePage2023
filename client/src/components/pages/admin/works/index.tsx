import { Helmet } from 'react-helmet-async';
import { NavigationWithHeader } from '../../../templates/admin/NavigraitonWithHeader';

export const Works = () => {
  return (
    <NavigationWithHeader>
      <Helmet>
        <title>活動実績 | MakeIT</title>
      </Helmet>
    </NavigationWithHeader>
  );
};
