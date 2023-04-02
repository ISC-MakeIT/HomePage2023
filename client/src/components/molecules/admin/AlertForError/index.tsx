import { Alert, SxProps, Theme } from '@mui/material';

type AlertForErrorProps = {
  error?: string;
  sx?: SxProps<Theme>;
};

export const AlertForError = ({ error, sx }: AlertForErrorProps) =>
  error ? (
    <Alert sx={{ fontWeight: 'bold', ...sx }} severity='error'>
      {error}
    </Alert>
  ) : (
    <></>
  );
