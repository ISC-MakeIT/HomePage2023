import { useEffect } from 'react';
import { setToken } from '@redux/actions/user/userTokenReducer';
import { useAppDispatch } from '@redux/hooks';
import { ADMIN_ROUTE_FULL_PATH_MAP } from '../../../routes/routePath';
import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // TODO : Logout APIを叩く
    dispatch(setToken(''));
    router.push(ADMIN_ROUTE_FULL_PATH_MAP.LOGIN);
  });

  return <></>;
};

export default Logout;
