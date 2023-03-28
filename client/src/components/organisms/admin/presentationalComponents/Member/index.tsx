import { Member as APIMember } from '@api/member';
import { faDiscord, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, LinearProgress, Stack } from '@mui/joy';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';

type MemberProps = {
  member: APIMember | undefined;
  error?: string;
};

export const Member = ({ member, error }: MemberProps) => {
  const isFindingMember = () => !member && !error;
  const isFailedFindMember = () => !member && error;

  if (isFailedFindMember()) {
    return (
      <>
        <AlertForError error={error} />
      </>
    );
  }

  if (isFindingMember()) {
    return (
      <>
        <LinearProgress color='primary' size='md' sx={{ position: 'fixed', top: 2, left: 0, width: '100vw' }} />
      </>
    );
  }

  return (
    <Box>
      <Stack rowGap={4}>
        <AlertForError error={error} />

        <Stack columnGap={4} flexDirection={'row'}>
          <Box component='a' href={member!.thumbnail} target='_blank'>
            <Avatar src={member!.thumbnail} alt={`${member!.username}のアイコン`} sx={{ width: 300, height: 300 }} />
          </Box>

          <Stack spacing={2}>
            <Stack spacing={1}>
              <Box>
                <Typography component='p' variant='h5' color={grey.A700}>
                  {member!.jobTitle}
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }} component='h1' variant='h3'>
                  {member!.name}
                </Typography>
                <Typography component='p' color={grey.A700}>
                  @{member!.username}
                </Typography>
              </Box>
              <Typography component='p'>{member!.description}</Typography>
            </Stack>

            <Stack spacing={1}>
              <Stack columnGap={1} alignItems='center' flexDirection='row'>
                <FontAwesomeIcon fontSize={14} icon={faDiscord} />
                <Typography component='p'>{member!.discord}</Typography>
              </Stack>
              <Stack columnGap={1} alignItems='center' flexDirection='row'>
                <FontAwesomeIcon icon={faTwitter} />
                <Typography component='p'>{member!.twitter}</Typography>
              </Stack>
              <Stack columnGap={1} alignItems='center' flexDirection='row'>
                <FontAwesomeIcon icon={faGithub} />
                <Typography component='p'>{member!.github}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
