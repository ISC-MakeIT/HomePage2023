import { Route, Routes } from 'react-router-dom';
import { Member } from 'src/components/pages/admin/members/memberId';
import { Notification } from 'src/components/pages/admin/notifications/notificationId';
import { Home } from 'src/components/pages/admin';
import { Login } from 'src/components/pages/admin/login';
import { Logout } from 'src/components/pages/admin/logout';
import { Members } from 'src/components/pages/admin/members';
import { Notifications } from 'src/components/pages/admin/notifications';
import { Works } from 'src/components/pages/admin/works';
import { ADMIN_ROUTE_PATH_MAP } from '../routePath';
import { OnlyLoggedInMemberMiddleware } from 'src/app/middlewares/OnlyLoggedInMemberMiddleware';
import { Work } from 'src/components/pages/admin/works/workId';
import { MyPage } from 'src/components/pages/admin/mypage';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path={ADMIN_ROUTE_PATH_MAP.TOP} element={<Home />} />
      <Route path={ADMIN_ROUTE_PATH_MAP.LOGIN} element={<Login />} />

      <Route path="/" element={<OnlyLoggedInMemberMiddleware />}>
        <Route path={ADMIN_ROUTE_PATH_MAP.LOGOUT} element={<Logout />} />

        <Route path={ADMIN_ROUTE_PATH_MAP.WORKS} element={<Works />} />
        <Route path={`${ADMIN_ROUTE_PATH_MAP.WORKS}/:workId`} element={<Work />} />

        <Route path={ADMIN_ROUTE_PATH_MAP.NOTIFICATIONS} element={<Notifications />} />
        <Route path={`${ADMIN_ROUTE_PATH_MAP.NOTIFICATIONS}/:notificationId`} element={<Notification />} />

        <Route path={ADMIN_ROUTE_PATH_MAP.MEMBERS} element={<Members />} />
        <Route path={`${ADMIN_ROUTE_PATH_MAP.MEMBERS}/:memberId`} element={<Member />} />

        <Route path={`${ADMIN_ROUTE_PATH_MAP.MYPAGE}`} element={<MyPage />} />
      </Route>
    </Routes>
  );
};
