import { Box, Chip, Stack, Typography } from '@mui/material';
import { type OGP } from '@api/admin/ogps/detail';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';

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
    <Stack spacing={1}>
      <img src={ogp.thumbnail} alt="" width={500} height={261.7801} />
      <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }} component="h1" variant="h5">
        {ogp.title}
        <span>/</span>
      </Typography>
      <p>{ogp.description}</p>

      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        {keywordsToChips(ogp.keywords)}
      </Box>
    </Stack>
  );
};
