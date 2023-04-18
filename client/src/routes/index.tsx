import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminRoutes } from './adminRoutes';
import { ADMIN_ROUTE_FULL_PATH_MAP, USER_ROUTE_PATH_MAP } from './routePath';
import { UserRoutes } from './userRoutes';

export const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/*`} element={<UserRoutes />} />

        <Route path={`${ADMIN_ROUTE_FULL_PATH_MAP.TOP}/*`} element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};
