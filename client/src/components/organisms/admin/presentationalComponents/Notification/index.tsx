import { Notification as APINotification } from '@api/admin/notifications/notification';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';

type NotificationProps = {
  error?: string;
  notification: APINotification;
};

export const Notification = ({ notification, error }: NotificationProps) => {
  const isFailedFindNotification = () => Boolean(error);

  const getNotificationActivityStateBy = (isActive: boolean) => {
    if (isActive) {
      return (
        <Stack flexDirection='row' columnGap='0.5rem' alignItems='center'>
          <FontAwesomeIcon color={colors.green[800]} icon={faEye} /> 公開
        </Stack>
      );
    }
    return (
      <Stack flexDirection='row' columnGap='0.5rem' alignItems='center'>
        <FontAwesomeIcon color={colors.grey.A700} icon={faEyeSlash} /> 非公開
      </Stack>
    );
  };

  if (isFailedFindNotification()) {
    return (
      <>
        <AlertForError error={error} />
      </>
    );
  }

  return (
    <Stack spacing={3}>
      <Stack spacing={1.5}>
        <Typography
          component='p'
          sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '10rem' }}
        >
          {getNotificationActivityStateBy(notification.isActive)}
        </Typography>

        <Stack spacing={1}>
          <Typography
            sx={{ overflowWrap: 'break-word', width: '75rem', letterSpacing: '0.05rem' }}
            component='h1'
            variant='h4'
          >
            {notification.title}
          </Typography>
          <Typography
            sx={{ overflowWrap: 'break-word', width: '75rem', whiteSpace: 'pre-wrap', letterSpacing: '0.05rem' }}
            component='p'
          >
            {notification.contents}
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={0.5}>
        <Typography color={colors.grey.A700} component='p'>
          作成日時 : {notification.createdAt}
        </Typography>
        <Typography color={colors.grey.A700} component='p'>
          更新日時 : {notification.updatedAt}
        </Typography>
      </Stack>
    </Stack>
  );
};
