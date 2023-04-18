import { Alert, type SxProps, type Theme } from '@mui/material';

interface AlertForErrorProps {
  error?: string;
  sx?: SxProps<Theme>;
}

export const AlertForError = ({ error, sx }: AlertForErrorProps) =>
  error ? (
    <Alert sx={{ fontWeight: 'bold', ...sx }} severity="error">
      {error}
    </Alert>
  ) : (
    <></>
  );
