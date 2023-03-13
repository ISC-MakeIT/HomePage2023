import { Divider, ListItemText, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { ADMIN_ROUTE_FULL_PATH_MAP } from '../../../../../routes/routePath';
import { MenuItemWrapper } from '../../../../molecules/admin/MenuItemWrapper';

export const LoggedInMenu = () => {
  const location = useLocation();

  return (
    <MenuItemWrapper width={320} height={'100vh'}>
      <MenuItem
        selected={location.pathname === ADMIN_ROUTE_FULL_PATH_MAP.TOP}
        component={Link}
        to={ADMIN_ROUTE_FULL_PATH_MAP.TOP}
      >
        <ListItemText>トップ</ListItemText>
      </MenuItem>

      <MenuItem
        selected={location.pathname === ADMIN_ROUTE_FULL_PATH_MAP.WORKS}
        component={Link}
        to={ADMIN_ROUTE_FULL_PATH_MAP.WORKS}
      >
        <ListItemText>活動実績 一覧</ListItemText>
      </MenuItem>

      <MenuItem
        selected={location.pathname === ADMIN_ROUTE_FULL_PATH_MAP.NOTIFICATIONS}
        component={Link}
        to={ADMIN_ROUTE_FULL_PATH_MAP.NOTIFICATIONS}
      >
        <ListItemText>お知らせ 一覧</ListItemText>
      </MenuItem>

      <MenuItem
        selected={location.pathname === ADMIN_ROUTE_FULL_PATH_MAP.MEMBERS}
        component={Link}
        to={ADMIN_ROUTE_FULL_PATH_MAP.MEMBERS}
      >
        <ListItemText>メンバー 一覧</ListItemText>
      </MenuItem>

      <Divider />

      <MenuItem
        selected={location.pathname === ADMIN_ROUTE_FULL_PATH_MAP.LOGOUT}
        component={Link}
        to={ADMIN_ROUTE_FULL_PATH_MAP.LOGOUT}
      >
        <ListItemText>ログアウト</ListItemText>
      </MenuItem>
    </MenuItemWrapper>
  );
};
