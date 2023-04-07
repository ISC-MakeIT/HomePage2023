import { Route, Routes } from 'react-router-dom';
import { Home } from '../../components/pages';
import { USER_ROUTE_PATH_MAP } from '../routePath';
import { Works } from 'src/components/pages/user/works';

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path={USER_ROUTE_PATH_MAP.TOP} element={<Home />} />
      <Route path={USER_ROUTE_PATH_MAP.WORKS} element={<Works />} />
    </Routes>
  );
};
