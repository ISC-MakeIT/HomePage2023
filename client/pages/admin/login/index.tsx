import { LoginFormContainer } from 'src/components/organisms/admin/containerComponents/LoginFormContainer';
import { NavigationWithHeader } from 'src/components/templates/admin/NavigraitonWithHeader';

const Login = () => {
  return (
    <NavigationWithHeader>
      <LoginFormContainer />
    </NavigationWithHeader>
  );
};

export default Login;
