import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '@redux/actions/user/userTokenReducer';
import { useAppDispatch } from '@redux/hooks';
import { ADMIN_ROUTE_FULL_PATH_MAP } from '../../../../routes/routePath';

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // TODO : Logout APIを叩く
    dispatch(setToken(''));
    navigate(ADMIN_ROUTE_FULL_PATH_MAP.LOGIN);
  });

  return <></>;
};
