import { useEffect } from 'react';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import { ADMIN_ROUTE_FULL_PATH_MAP } from '../../routes/routePath';
import { NavigationWithHeader } from '@components/templates/admin/NavigraitonWithHeader';
import { useRouter } from 'next/router';

const Home = () => {
  const userToken = useAppSelector(selectUserToken);
  const router = useRouter();

  useEffect(() => {
    if (userToken === '') {
      router.push(`${ADMIN_ROUTE_FULL_PATH_MAP.LOGIN}`);
    }
  });

  return (
    <NavigationWithHeader>
      <b>bタグで HELLO WORLD</b>
    </NavigationWithHeader>
  );
};

export default Home;
