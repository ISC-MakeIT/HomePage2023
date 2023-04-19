import { type Work } from '@api/admin/works';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';

interface WorkListProps {
  workList: Work[];
  error?: string;
}

export const WorkList = ({ workList, error }: WorkListProps) => {
  const WorkListForTableBody = () => {
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
        {workList.map((work) => (
          <TableRow
            component={Link}
            to={`${ADMIN_ROUTE_FULL_PATH_MAP.WORKS}/${work.workId}`}
            key={work.workId}
            sx={{
              backgroundColor: getRowBackgroudColorBy(work.isActive),
              textDecoration: 'none',
            }}
            hover
          >
            <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '10rem' }}>
              {getNotificationActivityStateBy(work.isActive)}
            </TableCell>
            <TableCell>{work.workId}</TableCell>
            <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '15rem' }}>
              {work.title}
            </TableCell>
            <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '15rem' }}>
              {work.contents}
            </TableCell>
            <TableCell>{getDateFormatFrom(work.createdAt)}</TableCell>
            <TableCell>{getDateFormatFrom(work.updatedAt)}</TableCell>
          </TableRow>
        ))}
      </>
    );
  };

  return (
    <Stack>
      <AlertForError error={error} />

      <TableContainer sx={{ minHeight: '90vh' }}>
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
            <WorkListForTableBody />
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
