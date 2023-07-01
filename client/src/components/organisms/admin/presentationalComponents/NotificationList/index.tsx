import { type Notification } from 'src/api/homePage/api/admin/notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { colors, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';

interface NotificaitonListProps {
  notificationList: Notification[];
}

export const NotificationList = ({ notificationList }: NotificaitonListProps) => {
  const NotificationListForTableBody = () => {
    const getRowBackgroudColorBy = (isActive: boolean) => {
      if (isActive) {
        return undefined;
      }
      return colors.grey.A200;
    };

    const getNotificationActivityStateBy = (isActive: boolean) => {
      if (isActive) {
        return (
          <Stack flexDirection="row" columnGap="0.5rem" alignItems="center">
            <FontAwesomeIcon color={colors.green[800]} icon={faEye} /> 公開
          </Stack>
        );
      }
      return (
        <Stack flexDirection="row" columnGap="0.5rem" alignItems="center">
          <FontAwesomeIcon color={colors.grey.A700} icon={faEyeSlash} /> 非公開
        </Stack>
      );
    };

    const getDateFormatFrom = (isoDate: string) => {
      const date = new Date(isoDate);

      return `${date.getFullYear()} ${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    };

    return (
      <>
        {notificationList.map((notification) => (
          <TableRow
            component={Link}
            href={`${ADMIN_ROUTE_FULL_PATH_MAP.NOTIFICATIONS}/${notification.notificationId}`}
            key={notification.notificationId}
            sx={{
              backgroundColor: getRowBackgroudColorBy(notification.isActive),
              textDecoration: 'none',
            }}
            hover
          >
            <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '10rem' }}>
              {getNotificationActivityStateBy(notification.isActive)}
            </TableCell>
            <TableCell>{notification.notificationId}</TableCell>
            <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '15rem' }}>
              {notification.title}
            </TableCell>
            <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '15rem' }}>
              {notification.contents}
            </TableCell>
            <TableCell>{getDateFormatFrom(notification.createdAt)}</TableCell>
            <TableCell>{getDateFormatFrom(notification.updatedAt)}</TableCell>
          </TableRow>
        ))}
      </>
    );
  };

  return (
    <>
      <TableContainer sx={{ minHeight: '95vh' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>表示状態</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>タイトル</TableCell>
              <TableCell>内容</TableCell>
              <TableCell>作成日時</TableCell>
              <TableCell>更新日時</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <NotificationListForTableBody />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
