import { ListItemText, MenuItem } from '@mui/material';
import { ADMIN_ROUTE_FULL_PATH_MAP } from '../../../../../routes/routePath';
import { MenuItemWrapper } from '../../../../molecules/admin/MenuItemWrapper';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const UnLoggedInMenu = () => {
  const pathname = useRouter().pathname;

  return (
    <MenuItemWrapper sx={{ width: '100%', height: '100vh' }}>
      <MenuItem
        selected={pathname === ADMIN_ROUTE_FULL_PATH_MAP.TOP || pathname === ADMIN_ROUTE_FULL_PATH_MAP.LOGIN}
        component={Link}
        href={ADMIN_ROUTE_FULL_PATH_MAP.TOP}
      >
        <ListItemText>ログイン</ListItemText>
      </MenuItem>
    </MenuItemWrapper>
  );
};
