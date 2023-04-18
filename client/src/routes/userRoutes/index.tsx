import { Route, Routes } from 'react-router-dom';
import { Home } from '../../components/pages';
import { USER_ROUTE_PATH_MAP } from '../routePath';
import { Works } from 'src/components/pages/user/works';
import { Notifications } from 'src/components/pages/user/notifications';
import { EnableScrollToHashLinkMiddleware } from 'src/app/middlewares/EnableScrollToHashLinkMiddleware';

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EnableScrollToHashLinkMiddleware />}>
        <Route path={USER_ROUTE_PATH_MAP.TOP} element={<Home />} />
        <Route path={USER_ROUTE_PATH_MAP.WORKS} element={<Works />} />
        <Route path={USER_ROUTE_PATH_MAP.NOTIFICATIONS} element={<Notifications />} />
      </Route>
    </Routes>
  );
};
