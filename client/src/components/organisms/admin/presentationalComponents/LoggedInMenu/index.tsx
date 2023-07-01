import { Divider, ListItemText, MenuItem } from '@mui/material';
import { ADMIN_ROUTE_FULL_PATH_MAP } from '../../../../../routes/routePath';
import { MenuItemWrapper } from '../../../../molecules/admin/MenuItemWrapper';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const LoggedInMenu = () => {
  const router = useRouter();

  return (
    <MenuItemWrapper sx={{ width: '100%', height: '100vh', position: 'sticky', top: 0, left: 0 }}>
      <MenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.TOP}
        component={Link}
        href={ADMIN_ROUTE_FULL_PATH_MAP.TOP}
      >
        <ListItemText>トップ</ListItemText>
      </MenuItem>

      <MenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.MYPAGE}
        component={Link}
        href={ADMIN_ROUTE_FULL_PATH_MAP.MYPAGE}
      >
        <ListItemText>マイページ</ListItemText>
      </MenuItem>

      <MenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.WORKS}
        component={Link}
        href={ADMIN_ROUTE_FULL_PATH_MAP.WORKS}
      >
        <ListItemText>活動実績 一覧</ListItemText>
      </MenuItem>

      <MenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.NOTIFICATIONS}
        component={Link}
        href={ADMIN_ROUTE_FULL_PATH_MAP.NOTIFICATIONS}
      >
        <ListItemText>お知らせ 一覧</ListItemText>
      </MenuItem>

      <MenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.MEMBERS}
        component={Link}
        href={ADMIN_ROUTE_FULL_PATH_MAP.MEMBERS}
      >
        <ListItemText>メンバー 一覧</ListItemText>
      </MenuItem>

      <Divider />

      <MenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.LOGOUT}
        component={Link}
        href={ADMIN_ROUTE_FULL_PATH_MAP.LOGOUT}
      >
        <ListItemText>ログアウト</ListItemText>
      </MenuItem>
    </MenuItemWrapper>
  );
};
