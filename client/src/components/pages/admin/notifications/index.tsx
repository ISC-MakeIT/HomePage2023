import { Helmet } from 'react-helmet-async';
import { NavigationWithHeader } from '../../../templates/admin/NavigraitonWithHeader';

export const Notifications = () => {
  return (
    <NavigationWithHeader>
      <Helmet>
        <title>お知らせ | MakeIT</title>
      </Helmet>
    </NavigationWithHeader>
  );
};
