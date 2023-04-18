import { Alert, type SxProps, type Theme } from '@mui/material';

interface AlertForSuccessProps {
  content?: string;
  sx?: SxProps<Theme>;
}

export const AlertForSuccess = ({ content, sx }: AlertForSuccessProps) =>
  content ? (
    <Alert sx={{ fontWeight: 'bold', ...sx }} severity="success">
      {content}
    </Alert>
  ) : (
    <></>
  );
