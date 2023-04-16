import { ListItemText, MenuItem } from '@mui/material';
import { ADMIN_ROUTE_FULL_PATH_MAP } from '../../../../../routes/routePath';
import { MenuItemWrapper } from '../../../../molecules/admin/MenuItemWrapper';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const UnLoggedInMenu = () => {
  const router = useRouter();

  return (
    <MenuItemWrapper sx={{ width: '100%', height: '100vh' }}>
      <MenuItem
        selected={
          router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.TOP || router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.LOGIN
        }
        component={Link}
        href={ADMIN_ROUTE_FULL_PATH_MAP.TOP}
      >
        <a href={ADMIN_ROUTE_FULL_PATH_MAP.TOP}>
          <ListItemText>ログイン</ListItemText>
        </a>
      </MenuItem>
    </MenuItemWrapper>
  );
};
