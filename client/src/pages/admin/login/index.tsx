import { LoginFormContainer } from '@components/organisms/admin/containerComponents/LoginFormContainer';
import { NavigationWithHeader } from '@components/templates/admin/NavigraitonWithHeader';
import Head from 'next/head';

const Login = () => {
  return (
    <NavigationWithHeader>
      <Head>
        <title>ログイン | MakeIT</title>
      </Head>
      <LoginFormContainer />
    </NavigationWithHeader>
  );
};

export default Login;
