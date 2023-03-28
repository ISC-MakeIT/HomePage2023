import { Helmet } from 'react-helmet-async';
import { LoginFormContainer } from '../../../organisms/admin/containerComponents/LoginFormContainer';
import { NavigationWithHeader } from '../../../templates/admin/NavigraitonWithHeader';

export const Login = () => {
  return (
    <NavigationWithHeader>
      <Helmet>
        <title>ログイン | MakeIT</title>
      </Helmet>
      <LoginFormContainer />
    </NavigationWithHeader>
  );
};
