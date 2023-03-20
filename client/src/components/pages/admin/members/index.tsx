import { Helmet } from 'react-helmet';
import { NavigationWithHeader } from '../../../templates/admin/NavigraitonWithHeader';

export const Members = () => {
  return (
    <NavigationWithHeader>
      <Helmet>
        <title>メンバー一覧 | MakeIT</title>
      </Helmet>
    </NavigationWithHeader>
  );
};
