import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { type OGP } from 'src/api/homePage/api/admin/ogps';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';

interface OGPListProps {
  ogpList?: OGP[];
  error?: string;
}

export const OGPList = ({ ogpList, error }: OGPListProps) => {
  const keywordsToChips = (keywords: string) => {
    const splittedKeywords = keywords.split(',');
    return splittedKeywords.map((splittedKeyword, index) => (
      <Chip key={index} label={splittedKeyword} variant="outlined" />
    ));
  };

  const OGPListForTableBody = () => {
    return (
      <>
        {ogpList!.map((ogp) => (
          <TableRow
            component={Link}
            to={`${ADMIN_ROUTE_FULL_PATH_MAP.OGP_SETTING_DETAIL}?url=${encodeURIComponent(ogp.url)}`}
            key={ogp.url}
            sx={{
              textDecoration: 'none',
            }}
            hover
          >
            <TableCell>{ogp.url}</TableCell>
            <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '15rem' }}>
              {ogp.title}
            </TableCell>
            <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '15rem' }}>
              {ogp.description}
            </TableCell>
            <TableCell sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>{keywordsToChips(ogp.keywords)}</TableCell>
            <TableCell>{ogp.thumbnail}</TableCell>
          </TableRow>
        ))}
      </>
    );
  };

  if (!ogpList || error) {
    return <AlertForError error={error} />;
  }

  return (
    <>
      <TableContainer sx={{ minHeight: '95vh' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '12rem' }}>URL (pathname)</TableCell>
              <TableCell>タイトル</TableCell>
              <TableCell>説明</TableCell>
              <TableCell>キーワード</TableCell>
              <TableCell>サムネイル</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <OGPListForTableBody />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
