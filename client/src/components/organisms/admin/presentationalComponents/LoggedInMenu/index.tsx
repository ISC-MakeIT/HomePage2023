import { Divider, ListItemText } from '@mui/material';
import { ADMIN_ROUTE_FULL_PATH_MAP } from '../../../../../routes/routePath';
import { MenuItemWrapper } from '../../../../molecules/admin/MenuItemWrapper';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LinkMenuItem } from '@src/components/atoms/LinkMuiItem';

export const LoggedInMenu = () => {
  const router = useRouter();

  return (
    <MenuItemWrapper sx={{ width: '100%', height: '100vh', position: 'sticky', top: 0, left: 0 }}>
      <LinkMenuItem selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.TOP} href={ADMIN_ROUTE_FULL_PATH_MAP.TOP}>
        <ListItemText>トップ</ListItemText>
      </LinkMenuItem>

      <LinkMenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.MYPAGE}
        href={ADMIN_ROUTE_FULL_PATH_MAP.MYPAGE}
      >
        <ListItemText>マイページ</ListItemText>
      </LinkMenuItem>

      <LinkMenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.WORKS}
        href={ADMIN_ROUTE_FULL_PATH_MAP.WORKS}
      >
        <ListItemText>活動実績 一覧</ListItemText>
      </LinkMenuItem>

      <LinkMenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.NOTIFICATIONS}
        href={ADMIN_ROUTE_FULL_PATH_MAP.NOTIFICATIONS}
      >
        <ListItemText>お知らせ 一覧</ListItemText>
      </LinkMenuItem>

      <LinkMenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.MEMBERS}
        href={ADMIN_ROUTE_FULL_PATH_MAP.MEMBERS}
      >
        <ListItemText>メンバー 一覧</ListItemText>
      </LinkMenuItem>

      <Divider />

      <LinkMenuItem
        selected={router.pathname === ADMIN_ROUTE_FULL_PATH_MAP.LOGOUT}
        href={ADMIN_ROUTE_FULL_PATH_MAP.LOGOUT}
      >
        <ListItemText>ログアウト</ListItemText>
      </LinkMenuItem>
    </MenuItemWrapper>
  );
};
