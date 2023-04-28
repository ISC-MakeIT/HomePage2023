import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import { ADMIN_ROUTE_FULL_PATH_MAP } from '../../../routes/routePath';
import { NavigationWithHeader } from '../../templates/admin/NavigraitonWithHeader';

export const Home = () => {
  const userToken = useAppSelector(selectUserToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken === '') {
      navigate(`${ADMIN_ROUTE_FULL_PATH_MAP.LOGIN}`);
    }
  });

  return (
    <NavigationWithHeader>
      <b>bタグで HELLO WORLD</b>
    </NavigationWithHeader>
  );
};
