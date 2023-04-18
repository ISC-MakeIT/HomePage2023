import { Member } from '@api/admin/members';
import { css } from '@emotion/react';
import { faEye, faEyeSlash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';

type MemberListProps = {
  memberList: Member[];
  error?: string;
};

export const MemberList = ({ memberList, error }: MemberListProps) => {
  const getMemberActivityStateBy = (isActive: boolean) => {
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

  const getRowBackgroudColorBy = (isActive: boolean) => {
    if (isActive) {
      return undefined;
    }
    return colors.grey.A200;
  };

  const elseDefaultDisplayUnExist = (memberElement?: string) => {
    if (!memberElement || memberElement === '') {
      return '存在しません';
    }
    return memberElement;
  };

  const MemberListForTableBody = () => {
    return (
      <>
        {memberList.map((member) => (
          <TableRow
            component={Link}
            to={`${ADMIN_ROUTE_FULL_PATH_MAP.MEMBERS}/${member.memberId}`}
            key={member.memberId}
            css={css`
              background-color: ${getRowBackgroudColorBy(member.isActive)};
              text-decoration: none;
            `}
            hover
          >
            <TableCell sx={{ maxWidth: '15rem' }}>{getMemberActivityStateBy(member.isActive)}</TableCell>
            <TableCell>{member.roleName}</TableCell>
            <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '10rem' }}>
              {member.name}
            </TableCell>
            <TableCell>{member.memberId}</TableCell>
            <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '10rem' }}>
              {member.username}
            </TableCell>
            <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '10rem' }}>
              {member.jobTitle}
            </TableCell>
            <TableCell>{elseDefaultDisplayUnExist(member.discord)}</TableCell>
            <TableCell>{elseDefaultDisplayUnExist(member.twitter)}</TableCell>
            <TableCell>{elseDefaultDisplayUnExist(member.github)}</TableCell>
            <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '15rem' }}>
              {member.description}
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  };

  return (
    <div
      css={css`
        display: grid;
        row-gap: 1rem;
      `}
    >
      <AlertForError error={error} />

      <TableContainer sx={{ minHeight: '95vh' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>表示状態</TableCell>
              <TableCell>ロール</TableCell>
              <TableCell>名前</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>ユーザー名</TableCell>
              <TableCell>役割</TableCell>
              <TableCell>Discord URL</TableCell>
              <TableCell>Twitter URL</TableCell>
              <TableCell>GitHub URL</TableCell>
              <TableCell>自己紹介</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <MemberListForTableBody />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
