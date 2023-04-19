import { Box, Chip, Stack, Typography } from '@mui/material';
import { type OGP } from '@api/admin/ogps/detail';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

interface OGPDetailProps {
  ogp?: OGP;
  error?: string;
}

export const OGPDetail = ({ ogp, error }: OGPDetailProps) => {
  const keywordsToChips = (keywords: string) => {
    const splittedKeywords = keywords.split(',');
    return splittedKeywords.map((splittedKeyword, index) => (
      <Chip key={index} label={splittedKeyword} variant="outlined" />
    ));
  };

  if (!ogp || error) {
    return <AlertForError error={error} />;
  }

  return (
    <Stack spacing={4}>
      <Link to={ogp.thumbnail} target="_blank">
        <img src={ogp.thumbnail} alt="サムネイル" width={500} height={261.7801} />
      </Link>

      <Stack spacing={2}>
        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }} component="h1" variant="h5">
          {ogp.title}
          <span>/</span>
        </Typography>
        <p
          css={css`
            line-height: 1.75;
            white-space: pre-wrap;
          `}
        >
          {ogp.description}
        </p>

        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          {keywordsToChips(ogp.keywords)}
        </Box>
      </Stack>
    </Stack>
  );
};
