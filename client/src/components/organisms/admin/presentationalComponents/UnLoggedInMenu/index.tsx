import { ListItemText, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { ADMIN_ROUTE_FULL_PATH_MAP } from '../../../../../routes/routePath';
import { MenuItemWrapper } from '../../../../molecules/admin/MenuItemWrapper';

export const UnLoggedInMenu = () => {
  const location = useLocation();

  return (
    <MenuItemWrapper width={320} height={'100vh'}>
      <MenuItem
        selected={
          location.pathname === ADMIN_ROUTE_FULL_PATH_MAP.TOP || location.pathname === ADMIN_ROUTE_FULL_PATH_MAP.LOGIN
        }
        component={Link}
        to={ADMIN_ROUTE_FULL_PATH_MAP.TOP}
      >
        <ListItemText>ログイン</ListItemText>
      </MenuItem>
    </MenuItemWrapper>
  );
};
