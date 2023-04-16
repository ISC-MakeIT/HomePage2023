import { Divider, ListItemText, MenuItem } from '@mui/material';
import { ADMIN_ROUTE_FULL_PATH_MAP } from '../../../../../routes/routePath';
import { MenuItemWrapper } from '../../../../molecules/admin/MenuItemWrapper';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const LoggedInMenu = () => {
  const router = useRouter();

  return (
    <MenuItemWrapper sx={{ width: '100%', height: '100vh', position: 'sticky', top: 0, left: 0 }}>
      <MenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.TOP}
        component={Link}
        href={ADMIN_ROUTE_FULL_PATH_MAP.TOP}
      >
        <a href={ADMIN_ROUTE_FULL_PATH_MAP.TOP}>
          <ListItemText>トップ</ListItemText>
        </a>
      </MenuItem>

      <MenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.MYPAGE}
        component={Link}
        href={ADMIN_ROUTE_FULL_PATH_MAP.MYPAGE}
      >
        <a href={ADMIN_ROUTE_FULL_PATH_MAP.MYPAGE}>
          <ListItemText>トップ</ListItemText>
        </a>
      </MenuItem>

      <MenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.WORKS}
        component={Link}
        href={ADMIN_ROUTE_FULL_PATH_MAP.WORKS}
      >
        <a href={ADMIN_ROUTE_FULL_PATH_MAP.WORKS}>
          <ListItemText>活動実績 一覧</ListItemText>
        </a>
      </MenuItem>

      <MenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.NOTIFICATIONS}
        component={Link}
        href={ADMIN_ROUTE_FULL_PATH_MAP.NOTIFICATIONS}
      >
        <a href={ADMIN_ROUTE_FULL_PATH_MAP.NOTIFICATIONS}>
          <ListItemText>お知らせ 一覧</ListItemText>
        </a>
      </MenuItem>

      <MenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.MEMBERS}
        component={Link}
        href={ADMIN_ROUTE_FULL_PATH_MAP.MEMBERS}
      >
        <a href={ADMIN_ROUTE_FULL_PATH_MAP.MEMBERS}>
          <ListItemText>メンバー 一覧</ListItemText>
        </a>
      </MenuItem>

      <Divider />

      <MenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.LOGOUT}
        component={Link}
        href={ADMIN_ROUTE_FULL_PATH_MAP.LOGOUT}
      >
        <a href={ADMIN_ROUTE_FULL_PATH_MAP.LOGOUT}>
          <ListItemText>ログアウト</ListItemText>
        </a>
      </MenuItem>
    </MenuItemWrapper>
  );
};
