import { type Work as APIWork } from '@api/admin/works/work';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';

interface WorkProps {
  error?: string;
  work: APIWork;
}

export const Work = ({ work, error }: WorkProps) => {
  const isFailedFindNotification = () => Boolean(error);

  const getWorkActivityStateBy = (isActive: boolean) => {
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

  if (isFailedFindNotification()) {
    return (
      <>
        <AlertForError error={error} />
      </>
    );
  }

  return (
    <Stack flexDirection="row" columnGap={4}>
      <Link target="_blank" href={work.thumbnail}>
        <Box
          sx={{
            width: 300,
            height: 400,
            backgroundColor: colors.grey.A700,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: `url(${work.thumbnail})`,
          }}
        />
      </Link>

      <Stack spacing={3}>
        <Stack spacing={1.5}>
          <Typography
            component="p"
            sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '10rem' }}
          >
            {getWorkActivityStateBy(work.isActive)}
          </Typography>

          <Stack spacing={1}>
            <Typography sx={{ wordBreak: 'break-all', letterSpacing: '0.05rem' }} component="h1" variant="h4">
              {work.title}
            </Typography>
            <Typography sx={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap', letterSpacing: '0.05rem' }} component="p">
              {work.contents}
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={0.5}>
          <Typography color={colors.grey.A700} component="p">
            作成日時 : {work.createdAt}
          </Typography>
          <Typography color={colors.grey.A700} component="p">
            更新日時 : {work.updatedAt}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
