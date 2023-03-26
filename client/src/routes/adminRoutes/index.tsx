import { Route, Routes } from 'react-router-dom';
import { MemberOfMembers } from 'src/components/pages/admin/members/memberId';
import { Home } from '../../components/pages/admin';
import { Login } from '../../components/pages/admin/login';
import { Logout } from '../../components/pages/admin/logout';
import { Members } from '../../components/pages/admin/members';
import { Notifications } from '../../components/pages/admin/notifications';
import { Works } from '../../components/pages/admin/works';
import { ADMIN_ROUTE_PATH_MAP } from '../routePath';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path={ADMIN_ROUTE_PATH_MAP.TOP} element={<Home />} />
      <Route path={ADMIN_ROUTE_PATH_MAP.LOGIN} element={<Login />} />
      <Route path={ADMIN_ROUTE_PATH_MAP.LOGOUT} element={<Logout />} />

      <Route path={ADMIN_ROUTE_PATH_MAP.WORKS} element={<Works />} />

      <Route path={ADMIN_ROUTE_PATH_MAP.NOTIFICATIONS} element={<Notifications />} />

      <Route path={ADMIN_ROUTE_PATH_MAP.MEMBERS} element={<Members />} />

      <Route path={`${ADMIN_ROUTE_PATH_MAP.MEMBERS}/:memberId`} element={<MemberOfMembers />} />
    </Routes>
  );
};
