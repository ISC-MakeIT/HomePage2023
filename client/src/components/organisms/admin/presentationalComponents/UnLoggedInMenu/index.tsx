import { ListItemText, MenuItem } from '@mui/material';
import { ADMIN_ROUTE_FULL_PATH_MAP } from '../../../../../routes/routePath';
import { MenuItemWrapper } from '../../../../molecules/admin/MenuItemWrapper';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LinkMenuItem } from '@src/components/atoms/LinkMuiItem';

export const UnLoggedInMenu = () => {
  const router = useRouter();

  return (
    <MenuItemWrapper sx={{ width: '100%', height: '100vh' }}>
      <LinkMenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.LOGIN}
        href={ADMIN_ROUTE_FULL_PATH_MAP.LOGIN}
      >
        <ListItemText>ログイン</ListItemText>
      </LinkMenuItem>
    </MenuItemWrapper>
  );
};
